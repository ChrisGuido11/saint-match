import React, { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from 'react';
import { Saint, StreakData, UsageData, ActiveChallenge, Completion, UserNovena } from '../types';
import { getStreakData, incrementStreak as incrementStreakData } from '../lib/streak';
import {
  getUsageData,
  getActiveChallenge,
  setActiveChallenge as storeChallenge,
  addCompletion,
  getCompletions,
  hasCompletedOnboarding,
  setOnboardingComplete as storeOnboardingComplete,
  getUserNovenas,
  saveUserNovena as storeUserNovena,
  deleteUserNovena as removeUserNovena,
  getDiscoveredSaints,
  saveDiscoveredSaint,
  migrateDiscoveredSaintsFromCompletions,
  migrateMatchHistoryFromCompletions,
} from '../lib/storage';
// RevenueCat kept dormant — re-enable for paid tiers later
// import { checkProStatus, initPurchases, loginRevenueCat } from '../lib/purchases';
import { addCompletionDate } from '../lib/streak';
import { format } from 'date-fns';
import { supabase, isSupabaseConfigured, ensureAnonymousSession } from '../lib/supabase';
import {
  syncAllData,
  syncCompletionToServer,
  syncStreakToServer,
  syncActiveChallengeToServer,
  syncOnboardingToServer,
  syncUserNovenaToServer,
} from '../lib/sync';
import { generateNovenaPrayers } from '../lib/novenaGenerate';
import { getNotificationPreferences } from '../lib/storage';
import { scheduleNovenaReminders, cancelNovenaNotifications } from '../lib/notifications';
import { loadHapticPreference } from '../lib/haptics';
import type { Session } from '@supabase/supabase-js';

interface AppContextType {
  // State
  streak: StreakData;
  usage: UsageData;
  activeChallenge: ActiveChallenge | null;
  completions: Completion[];
  isPro: boolean;
  isOnboarded: boolean;
  isLoading: boolean;
  session: Session | null;
  userNovenas: UserNovena[];
  discoveredSaints: Saint[];

  // Actions
  refreshStreak: () => Promise<void>;
  refreshUsage: () => Promise<void>;
  acceptChallenge: (challenge: ActiveChallenge) => Promise<void>;
  completeChallenge: () => Promise<StreakData>;
  consumeMatch: () => Promise<boolean>;
  setOnboardingComplete: () => Promise<void>;
  setIsPro: (value: boolean) => void;
  refreshAll: () => Promise<void>;
  startNovena: (novenaId: string, saintId: string, saintName: string, saintBio: string, personalIntention: string) => Promise<UserNovena>;
  markNovenaDayPrayed: (userNovenaId: string) => Promise<{ alreadyPrayed: boolean; completed: boolean }>;
  saveNovenaReflection: (userNovenaId: string, reflection: string) => Promise<void>;
  abandonNovena: (userNovenaId: string) => Promise<void>;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [streak, setStreak] = useState<StreakData>({
    currentStreak: 0,
    longestStreak: 0,
    lastCompletionDate: null,
    streakFreezesUsedThisWeek: 0,
  });
  const [usage, setUsage] = useState<UsageData>({
    matchesUsedThisWeek: 0,
    weeklyLimit: 3,
    resetAt: new Date().toISOString(),
  });
  const [activeChallenge, setActiveChallenge] = useState<ActiveChallenge | null>(null);
  const [completions, setCompletions] = useState<Completion[]>([]);
  const [isPro, setIsPro] = useState(true); // Free beta: everyone gets full access
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [userNovenas, setUserNovenas] = useState<UserNovena[]>([]);
  const [discoveredSaints, setDiscoveredSaints] = useState<Saint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const authListenerRef = useRef<{ subscription: { unsubscribe: () => void } } | null>(null);

  const refreshStreak = useCallback(async () => {
    const data = await getStreakData();
    setStreak(data);
  }, []);

  const refreshUsage = useCallback(async () => {
    const data = await getUsageData();
    setUsage(data);
  }, []);

  const refreshAll = useCallback(async () => {
    // Fast path: load from AsyncStorage
    const [streakData, usageData, challenge, comps, onboarded, novenas, discovered] = await Promise.all([
      getStreakData(),
      getUsageData(),
      getActiveChallenge(),
      getCompletions(),
      hasCompletedOnboarding(),
      getUserNovenas(),
      getDiscoveredSaints(),
    ]);
    setStreak(streakData);
    setUsage(usageData);
    setActiveChallenge(challenge);
    setCompletions(comps);
    // isPro stays true — free beta, no pro check needed
    setIsOnboarded(onboarded);
    setUserNovenas(novenas);

    // Migrate discovered saints from completions for existing users
    if (discovered.length === 0 && comps.length > 0) {
      const migrated = await migrateDiscoveredSaintsFromCompletions(comps);
      setDiscoveredSaints(migrated);
    } else {
      setDiscoveredSaints(discovered);
    }

    // Seed match history from completions for existing users
    migrateMatchHistoryFromCompletions().catch(() => {});

    // Slow path: background sync with Supabase
    if (isSupabaseConfigured()) {
      syncAllData()
        .then((serverData) => {
          if (serverData) {
            if (serverData.usage) setUsage(serverData.usage);
            if (serverData.streak) setStreak(serverData.streak);
            if (serverData.completions && serverData.completions.length > 0) {
              setCompletions(serverData.completions);
            }
            if (serverData.novenas && serverData.novenas.length > 0) {
              setUserNovenas(serverData.novenas);
            }
          }
        })
        .catch(() => {
          // Offline or sync error — local data is already loaded
        });
    }
  }, []);

  useEffect(() => {
    async function init() {
      // Load haptic preference into module cache
      loadHapticPreference().catch(() => {});

      // RevenueCat init skipped for free beta
      // await initPurchases();

      // Initialize anonymous auth if Supabase is configured
      if (isSupabaseConfigured()) {
        try {
          const sess = await ensureAnonymousSession();
          setSession(sess);
        } catch {
          // Auth failed — app still works offline with AsyncStorage
        }
      }

      await refreshAll();
      setIsLoading(false);
    }
    init();

    // Listen for auth state changes (token refresh, sign-out, email link)
    if (isSupabaseConfigured()) {
      const { data } = supabase.auth.onAuthStateChange((_event, sess) => {
        setSession(sess);
      });
      authListenerRef.current = data;
    }

    return () => {
      authListenerRef.current?.subscription.unsubscribe();
    };
  }, [refreshAll]);

  const acceptChallenge = useCallback(async (challenge: ActiveChallenge) => {
    await storeChallenge(challenge);
    setActiveChallenge(challenge);

    // Background sync to Supabase
    syncActiveChallengeToServer(challenge).catch(() => {});
  }, []);

  const completeChallenge = useCallback(async () => {
    const updatedStreak = await incrementStreakData();
    const today = format(new Date(), 'yyyy-MM-dd');
    await addCompletionDate(today);

    if (activeChallenge) {
      const completion: Completion = {
        id: `comp-${Date.now()}`,
        saintId: activeChallenge.match.saint.id,
        microActionId: activeChallenge.match.microAction.id,
        completedAt: new Date().toISOString(),
        dateCompleted: today,
        emotionSelected: activeChallenge.match.microAction.emotion,
        saintName: activeChallenge.match.saint.name,
        actionText: activeChallenge.match.microAction.actionText,
      };
      await addCompletion(completion);
      setCompletions((prev) => [completion, ...prev]);

      // Persist the full Saint object for the portfolio
      const saint = activeChallenge.match.saint;
      await saveDiscoveredSaint(saint);
      setDiscoveredSaints((prev) =>
        prev.some((s) => s.id === saint.id) ? prev : [...prev, saint]
      );

      const updated: ActiveChallenge = { ...activeChallenge, completed: true };
      await storeChallenge(updated);
      setActiveChallenge(updated);

      // Background sync to Supabase
      syncCompletionToServer(completion).catch(() => {});
      syncActiveChallengeToServer(updated).catch(() => {});
    }

    setStreak(updatedStreak);

    // Background sync streak to Supabase
    syncStreakToServer(updatedStreak).catch(() => {});

    return updatedStreak;
  }, [activeChallenge]);

  const consumeMatch = useCallback(async () => {
    // Free beta: always allow matches, no usage limit
    return true;
  }, []);

  const startNovena = useCallback(async (novenaId: string, saintId: string, saintName: string, saintBio: string, personalIntention: string): Promise<UserNovena> => {
    // Try to generate AI prayers
    const generatedPrayers = await generateNovenaPrayers(saintName, saintBio, personalIntention);

    const newNovena: UserNovena = {
      id: `un-${Date.now()}`,
      novenaId,
      saintId,
      saintName,
      currentDay: 1,
      completedDays: [false, false, false, false, false, false, false, false, false],
      personalIntention,
      startedAt: new Date().toISOString(),
      lastPrayerDate: null,
      completed: false,
      completedAt: null,
      reflection: null,
      generatedPrayers,
    };
    await storeUserNovena(newNovena);
    setUserNovenas((prev) => [newNovena, ...prev]);
    syncUserNovenaToServer(newNovena).catch(() => {});

    // Schedule novena reminders if enabled
    getNotificationPreferences()
      .then((prefs) => {
        if (prefs.novenaReminderEnabled) {
          scheduleNovenaReminders(newNovena, saintName).catch(() => {});
        }
      })
      .catch(() => {});

    return newNovena;
  }, []);

  const markNovenaDayPrayed = useCallback(async (userNovenaId: string): Promise<{ alreadyPrayed: boolean; completed: boolean }> => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const novena = userNovenas.find((n) => n.id === userNovenaId);
    if (!novena) return { alreadyPrayed: false, completed: false };

    if (novena.lastPrayerDate === today) {
      return { alreadyPrayed: true, completed: false };
    }

    const dayIndex = novena.currentDay - 1;
    const newCompletedDays = [...novena.completedDays];
    newCompletedDays[dayIndex] = true;

    const isComplete = novena.currentDay >= 9;
    const updated: UserNovena = {
      ...novena,
      completedDays: newCompletedDays,
      lastPrayerDate: today,
      currentDay: isComplete ? 9 : novena.currentDay + 1,
      completed: isComplete,
      completedAt: isComplete ? new Date().toISOString() : null,
    };

    await storeUserNovena(updated);
    setUserNovenas((prev) => prev.map((n) => (n.id === userNovenaId ? updated : n)));
    syncUserNovenaToServer(updated).catch(() => {});

    return { alreadyPrayed: false, completed: isComplete };
  }, [userNovenas]);

  const saveNovenaReflection = useCallback(async (userNovenaId: string, reflection: string) => {
    const novena = userNovenas.find((n) => n.id === userNovenaId);
    if (!novena) return;

    const updated: UserNovena = { ...novena, reflection };
    await storeUserNovena(updated);
    setUserNovenas((prev) => prev.map((n) => (n.id === userNovenaId ? updated : n)));
    syncUserNovenaToServer(updated).catch(() => {});
  }, [userNovenas]);

  const abandonNovena = useCallback(async (userNovenaId: string) => {
    cancelNovenaNotifications(userNovenaId).catch(() => {});
    await removeUserNovena(userNovenaId);
    setUserNovenas((prev) => prev.filter((n) => n.id !== userNovenaId));
  }, []);

  const handleSetOnboardingComplete = useCallback(async () => {
    await storeOnboardingComplete();
    setIsOnboarded(true);

    // Background sync to Supabase
    syncOnboardingToServer().catch(() => {});
  }, []);

  return (
    <AppContext.Provider
      value={{
        streak,
        usage,
        activeChallenge,
        completions,
        isPro,
        isOnboarded,
        isLoading,
        session,
        userNovenas,
        discoveredSaints,
        refreshStreak,
        refreshUsage,
        acceptChallenge,
        completeChallenge,
        consumeMatch,
        setOnboardingComplete: handleSetOnboardingComplete,
        setIsPro,
        refreshAll,
        startNovena,
        markNovenaDayPrayed,
        saveNovenaReflection,
        abandonNovena,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
