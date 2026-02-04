import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
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
import { checkProStatus } from '../lib/purchases';
import { addCompletionDate } from '../lib/streak';
import { format } from 'date-fns';

interface AppContextType {
  // State
  streak: StreakData;
  usage: UsageData;
  activeChallenge: ActiveChallenge | null;
  completions: Completion[];
  isPro: boolean;
  isOnboarded: boolean;
  isLoading: boolean;

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
  const [isPro, setIsPro] = useState(false);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const refreshStreak = useCallback(async () => {
    const data = await getStreakData();
    setStreak(data);
  }, []);

  const refreshUsage = useCallback(async () => {
    const data = await getUsageData();
    setUsage(data);
  }, []);

  const refreshAll = useCallback(async () => {
    const [streakData, usageData, challenge, comps, proStatus, onboarded] = await Promise.all([
      getStreakData(),
      getUsageData(),
      getActiveChallenge(),
      getCompletions(),
      checkProStatus(),
      hasCompletedOnboarding(),
    ]);
    setStreak(streakData);
    setUsage(usageData);
    setActiveChallenge(challenge);
    setCompletions(comps);
    setIsPro(proStatus);
    setIsOnboarded(onboarded);
  }, []);

  useEffect(() => {
    refreshAll().finally(() => setIsLoading(false));
  }, [refreshAll]);

  const acceptChallenge = useCallback(async (challenge: ActiveChallenge) => {
    await storeChallenge(challenge);
    setActiveChallenge(challenge);
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
    }

    setStreak(updatedStreak);
    return updatedStreak;
  }, [activeChallenge]);

  const consumeMatch = useCallback(async () => {
    if (isPro) return true;
    const data = await getUsageData();
    if (data.matchesUsedThisWeek >= data.weeklyLimit) return false;
    const updated = await incrementUsage();
    setUsage(updated);
    return true;
  }, [isPro]);

  const handleSetOnboardingComplete = useCallback(async () => {
    await storeOnboardingComplete();
    setIsOnboarded(true);
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
