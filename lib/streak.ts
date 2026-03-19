import AsyncStorage from '@react-native-async-storage/async-storage';
import { format, differenceInCalendarDays, parseISO, startOfDay } from 'date-fns';
import { StreakData, StreakResetInfo } from '../types';

const STREAK_KEY = '@saint_match_streak';
const COMPLETIONS_KEY = '@saint_match_completions';
const RESET_ACKNOWLEDGED_KEY = '@saint_match_reset_acknowledged';

const DEFAULT_STREAK: StreakData = {
  currentStreak: 0,
  longestStreak: 0,
  lastCompletionDate: null,
  streakFreezesUsedThisWeek: 0,
};

export async function getStreakData(): Promise<StreakData> {
  try {
    const raw = await AsyncStorage.getItem(STREAK_KEY);
    if (!raw) return DEFAULT_STREAK;
    const data: StreakData = JSON.parse(raw);

    // Check if streak should be reset (missed a day)
    if (data.lastCompletionDate) {
      const lastDate = parseISO(data.lastCompletionDate);
      const today = startOfDay(new Date());
      const daysDiff = differenceInCalendarDays(today, lastDate);

      if (daysDiff > 1) {
        // Streak broken - reset streak and weekly freeze counter
        const resetData: StreakData = {
          ...data,
          currentStreak: 0,
          streakFreezesUsedThisWeek: 0,
        };
        await AsyncStorage.setItem(STREAK_KEY, JSON.stringify(resetData));
        return resetData;
      }
    }

    return data;
  } catch {
    return DEFAULT_STREAK;
  }
}

export async function getStreakDataWithResetCheck(): Promise<{
  streakData: StreakData;
  resetInfo: StreakResetInfo | null;
}> {
  try {
    const raw = await AsyncStorage.getItem(STREAK_KEY);
    if (!raw) return { streakData: DEFAULT_STREAK, resetInfo: null };
    const data: StreakData = JSON.parse(raw);

    if (data.lastCompletionDate && data.currentStreak > 0) {
      const lastDate = parseISO(data.lastCompletionDate);
      const today = startOfDay(new Date());
      const daysDiff = differenceInCalendarDays(today, lastDate);

      if (daysDiff > 1) {
        const previousStreak = data.currentStreak;

        // Check if user already acknowledged this reset today
        const ackRaw = await AsyncStorage.getItem(RESET_ACKNOWLEDGED_KEY);
        const alreadyAcknowledged = ackRaw === format(new Date(), 'yyyy-MM-dd');

        // Reset the streak
        const resetData: StreakData = {
          ...data,
          currentStreak: 0,
          streakFreezesUsedThisWeek: 0,
        };
        await AsyncStorage.setItem(STREAK_KEY, JSON.stringify(resetData));

        return {
          streakData: resetData,
          resetInfo: alreadyAcknowledged
            ? null
            : {
                wasReset: true,
                previousStreak,
                daysMissed: daysDiff - 1,
              },
        };
      }
    }

    return { streakData: data, resetInfo: null };
  } catch {
    return { streakData: DEFAULT_STREAK, resetInfo: null };
  }
}

export function canUseStreakFreeze(streakData: StreakData): boolean {
  return streakData.streakFreezesUsedThisWeek < 1;
}

export async function useStreakFreeze(previousStreak: number): Promise<boolean> {
  const raw = await AsyncStorage.getItem(STREAK_KEY);
  if (!raw) return false;
  const current: StreakData = JSON.parse(raw);

  if (current.streakFreezesUsedThisWeek >= 1) {
    return false; // Already used this week
  }

  const updated: StreakData = {
    ...current,
    currentStreak: previousStreak,
    longestStreak: Math.max(previousStreak, current.longestStreak),
    lastCompletionDate: format(new Date(), 'yyyy-MM-dd'),
    streakFreezesUsedThisWeek: current.streakFreezesUsedThisWeek + 1,
  };

  await AsyncStorage.setItem(STREAK_KEY, JSON.stringify(updated));
  // Clear the reset acknowledgment since streak is restored
  await AsyncStorage.removeItem(RESET_ACKNOWLEDGED_KEY);
  return true;
}

export async function acknowledgeStreakReset(): Promise<void> {
  await AsyncStorage.setItem(RESET_ACKNOWLEDGED_KEY, format(new Date(), 'yyyy-MM-dd'));
}

export async function incrementStreak(): Promise<StreakData> {
  const current = await getStreakData();
  const today = format(new Date(), 'yyyy-MM-dd');

  // Already completed today
  if (current.lastCompletionDate === today) {
    return current;
  }

  const newStreak = current.currentStreak + 1;
  const updated: StreakData = {
    currentStreak: newStreak,
    longestStreak: Math.max(newStreak, current.longestStreak),
    lastCompletionDate: today,
    streakFreezesUsedThisWeek: current.streakFreezesUsedThisWeek,
  };

  await AsyncStorage.setItem(STREAK_KEY, JSON.stringify(updated));
  return updated;
}

export async function getCompletionDates(): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(COMPLETIONS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function addCompletionDate(date: string): Promise<void> {
  const dates = await getCompletionDates();
  if (!dates.includes(date)) {
    dates.push(date);
    await AsyncStorage.setItem(COMPLETIONS_KEY, JSON.stringify(dates));
  }
}

export async function resetAllData(): Promise<void> {
  await AsyncStorage.multiRemove([STREAK_KEY, COMPLETIONS_KEY, RESET_ACKNOWLEDGED_KEY]);
}
