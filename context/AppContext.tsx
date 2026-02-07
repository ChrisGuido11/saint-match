import React, { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from 'react';
import { StreakData, UsageData, ActiveChallenge, Completion } from '../types';
import { getStreakData, incrementStreak as incrementStreakData } from '../lib/streak';
import {
  getUsageData,
  incrementUsage,
  getActiveChallenge,
  setActiveChallenge as storeChallenge,
  clearActiveChallenge,
  addCompletion,
  getCompletions,
  hasCompletedOnboarding,
  setOnboardingComplete as storeOnboardingComplete,
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
} from '../lib/sync';
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

  // Actions
  refreshStreak: () => Promise<void>;
  refreshUsage: () => Promise<void>;
  acceptChallenge: (challenge: ActiveChallenge) => Promise<void>;
  completeChallenge: () => Promise<StreakData>;
  consumeMatch: () => Promise<boolean>;
  setOnboardingComplete: () => Promise<void>;
  setIsPro: (value: boolean) => void;
  refreshAll: () => Promise<void>;
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
    const [streakData, usageData, challenge, comps, onboarded] = await Promise.all([
      getStreakData(),
      getUsageData(),
      getActiveChallenge(),
      getCompletions(),
      hasCompletedOnboarding(),
    ]);
    setStreak(streakData);
    setUsage(usageData);
    setActiveChallenge(challenge);
    setCompletions(comps);
    // isPro stays true — free beta, no pro check needed
    setIsOnboarded(onboarded);

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
          }
        })
        .catch(() => {
          // Offline or sync error — local data is already loaded
        });
    }
  }, []);

  useEffect(() => {
    async function init() {
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
        refreshStreak,
        refreshUsage,
        acceptChallenge,
        completeChallenge,
        consumeMatch,
        setOnboardingComplete: handleSetOnboardingComplete,
        setIsPro,
        refreshAll,
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
