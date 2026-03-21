import React, { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from 'react';
import { Saint, StreakData, StreakResetInfo, UsageData, ActiveChallenge, Completion, UserNovena, ChallengeLogEntry } from '../types';
import { getStreakData, getStreakDataWithResetCheck, incrementStreak as incrementStreakData, useStreakFreeze as applyStreakFreezeStorage, acknowledgeStreakReset, canUseStreakFreeze } from '../lib/streak';
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
  getChallengeLog,
  addChallengeLogEntry,
  markChallengeLogCompleted,
} from '../lib/storage';
import { checkProStatus, initPurchases, loginRevenueCat } from '../lib/purchases';
import { incrementUsage } from '../lib/storage';
import { addCompletionDate } from '../lib/streak';
import { format } from 'date-fns';
import { supabase, isSupabaseConfigured, ensureAnonymousSession, getDisplayEmail } from '../lib/supabase';
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
  displayEmail: string | null;
  userNovenas: UserNovena[];
  discoveredSaints: Saint[];
  challengeLog: ChallengeLogEntry[];
  streakResetInfo: StreakResetInfo | null;
  freezeAvailable: boolean;

  // Actions
  refreshStreak: () => Promise<void>;
  refreshUsage: () => Promise<void>;
  acceptChallenge: (challenge: ActiveChallenge, moodText?: string) => Promise<void>;
  completeChallenge: () => Promise<StreakData>;
  consumeMatch: () => Promise<boolean>;
  setOnboardingComplete: () => Promise<void>;
  setIsPro: (value: boolean) => void;
  refreshAll: () => Promise<void>;
  dismissStreakReset: () => Promise<void>;
  applyStreakFreeze: () => Promise<boolean>;
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
  const [isPro, setIsPro] = useState(false);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [userNovenas, setUserNovenas] = useState<UserNovena[]>([]);
  const [discoveredSaints, setDiscoveredSaints] = useState<Saint[]>([]);
  const [challengeLog, setChallengeLog] = useState<ChallengeLogEntry[]>([]);
  const [streakResetInfo, setStreakResetInfo] = useState<StreakResetInfo | null>(null);
  const [freezeAvailable, setFreezeAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [displayEmail, setDisplayEmail] = useState<string | null>(null);
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
    const [streakResult, usageData, challenge, comps, onboarded, novenas, discovered, logEntries, proStatus] = await Promise.all([
      getStreakDataWithResetCheck(),
      getUsageData(),
      getActiveChallenge(),
      getCompletions(),
      hasCompletedOnboarding(),
      getUserNovenas(),
      getDiscoveredSaints(),
      getChallengeLog(),
      checkProStatus().catch(() => false),
    ]);
    setIsPro(proStatus);
    const { streakData, resetInfo } = streakResult;
    setStreak(streakData);
    setStreakResetInfo(resetInfo);
    setFreezeAvailable(canUseStreakFreeze(streakData));
    setUsage(usageData);
    setActiveChallenge(challenge);
    setCompletions(comps);
    setIsOnboarded(onboarded);
    setUserNovenas(novenas);
    setChallengeLog(logEntries);

    // Migrate discovered saints from completions for existing users
    if (discovered.length === 0 && comps.length > 0) {
      const migrated = await migrateDiscoveredSaintsFromCompletions(comps);
      setDiscoveredSaints(migrated);
    } else {
      setDiscoveredSaints(discovered);
    }

    // Seed match history from completions for existing users
    migrateMatchHistoryFromCompletions().catch(() => {});

    // Refresh display email from current session
    const { data: { session: currentSession } } = await supabase.auth.getSession();
    if (currentSession?.user?.id) {
      getDisplayEmail(currentSession.user.id)
        .then((email) => setDisplayEmail(email))
        .catch(() => {});
    }

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

      // Initialize RevenueCat (safe no-op if API key missing or in Expo Go)
      try {
        await initPurchases();
      } catch {
        // RevenueCat unavailable — purchases will use fallback mode
      }

      // Initialize anonymous auth if Supabase is configured
      if (isSupabaseConfigured()) {
        try {
          const sess = await ensureAnonymousSession();
          setSession(sess);

          // Link RevenueCat to Supabase user for subscription tracking
          if (sess?.user?.id) {
            loginRevenueCat(sess.user.id).catch(() => {});
            // Fetch raw display email from profiles
            getDisplayEmail(sess.user.id)
              .then((email) => setDisplayEmail(email))
              .catch(() => {});
          }
        } catch {
          // Auth failed — app still works offline with AsyncStorage
        }
      }

      // Check pro status before rendering UI (prevents flicker)
      try {
        const pro = await checkProStatus();
        setIsPro(pro);
      } catch {
        // Offline or error — defaults to free
      }

      await refreshAll();
      setIsLoading(false);
    }
    init();

    // Listen for auth state changes (token refresh, sign-out, email link)
    if (isSupabaseConfigured()) {
      const { data } = supabase.auth.onAuthStateChange((_event, sess) => {
        setSession(sess);
        if (sess?.user?.id) {
          getDisplayEmail(sess.user.id)
            .then((email) => setDisplayEmail(email))
            .catch(() => {});
        } else {
          setDisplayEmail(null);
        }
      });
      authListenerRef.current = data;
    }

    return () => {
      authListenerRef.current?.subscription.unsubscribe();
    };
  }, [refreshAll]);

  const acceptChallenge = useCallback(async (challenge: ActiveChallenge, moodText?: string) => {
    await storeChallenge(challenge);
    setActiveChallenge(challenge);

    // Write to challenge log for persistent tracking
    const logEntry: ChallengeLogEntry = {
      id: `cl-${Date.now()}`,
      saintId: challenge.match.saint.id,
      saintName: challenge.match.saint.name,
      actionText: challenge.match.microAction.actionText,
      emotionSelected: moodText || challenge.match.microAction.emotion,
      dateAccepted: format(new Date(), 'yyyy-MM-dd'),
      acceptedAt: challenge.acceptedAt,
      completed: false,
      completedAt: null,
    };
    await addChallengeLogEntry(logEntry);
    setChallengeLog((prev) => [logEntry, ...prev]);

    // Background sync to Supabase
    syncActiveChallengeToServer(challenge).catch(() => {});
  }, []);

  const completeChallenge = useCallback(async () => {
    // Idempotency guard: prevent double-completion
    if (!activeChallenge || activeChallenge.completed) {
      return streak;
    }

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
      setDiscoveredSaints((prev) => {
        if (prev.some((s) => s.id === saint.id)) return prev;
        return [...prev, saint];
      });

      const updated: ActiveChallenge = { ...activeChallenge, completed: true };
      await storeChallenge(updated);
      setActiveChallenge(updated);

      // Mark matching challenge log entry as completed
      const logEntry = challengeLog.find(
        (e) => e.dateAccepted === today && e.saintId === activeChallenge.match.saint.id && !e.completed
      );
      if (logEntry) {
        await markChallengeLogCompleted(logEntry.id);
        setChallengeLog((prev) =>
          prev.map((e) => e.id === logEntry.id ? { ...e, completed: true, completedAt: new Date().toISOString() } : e)
        );
      }

      // Background sync to Supabase
      syncCompletionToServer(completion).catch(() => {});
      syncActiveChallengeToServer(updated).catch(() => {});
    }

    setStreak(updatedStreak);

    // Background sync streak to Supabase
    syncStreakToServer(updatedStreak).catch(() => {});

    return updatedStreak;
  }, [activeChallenge, challengeLog]);

  const consumeMatch = useCallback(async () => {
    if (isPro) return true;
    try {
      const updated = await incrementUsage();
      setUsage(updated);
      return true;
    } catch {
      return false;
    }
  }, [isPro]);

  const startNovena = useCallback(async (novenaId: string, saintId: string, saintName: string, saintBio: string, personalIntention: string): Promise<UserNovena> => {
    // Gate: free users limited to 1 active novena
    if (!isPro) {
      const activeCount = userNovenas.filter((n) => !n.completed).length;
      if (activeCount >= 1) {
        throw new Error('NOVENA_LIMIT_REACHED');
      }
    }

    // Generate AI prayers — thrown error means API failure (propagates to UI)
    const generatedPrayers = await generateNovenaPrayers(saintName, saintBio, personalIntention);
    if (!generatedPrayers) {
      throw new Error('PRAYER_GENERATION_FAILED');
    }

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
  }, [isPro, userNovenas]);

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
    try {
      await cancelNovenaNotifications(userNovenaId);
    } catch {
      // Notification cancellation failed — proceed with removal anyway
    }
    await removeUserNovena(userNovenaId);
    setUserNovenas((prev) => prev.filter((n) => n.id !== userNovenaId));
  }, []);

  const dismissStreakReset = useCallback(async () => {
    await acknowledgeStreakReset();
    setStreakResetInfo(null);
  }, []);

  const applyStreakFreeze = useCallback(async (): Promise<boolean> => {
    if (!streakResetInfo) return false;
    const success = await applyStreakFreezeStorage(streakResetInfo.previousStreak);
    if (success) {
      const updatedStreak = await getStreakData();
      setStreak(updatedStreak);
      setStreakResetInfo(null);
      setFreezeAvailable(false);
      // Background sync streak to Supabase
      syncStreakToServer(updatedStreak).catch(() => {});
    }
    return success;
  }, [streakResetInfo]);

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
        displayEmail,
        userNovenas,
        discoveredSaints,
        challengeLog,
        streakResetInfo,
        freezeAvailable,
        refreshStreak,
        refreshUsage,
        acceptChallenge,
        completeChallenge,
        consumeMatch,
        setOnboardingComplete: handleSetOnboardingComplete,
        setIsPro,
        refreshAll,
        dismissStreakReset,
        applyStreakFreeze,
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
