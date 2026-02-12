import AsyncStorage from '@react-native-async-storage/async-storage';
import { format, differenceInCalendarDays, parseISO, startOfDay } from 'date-fns';
import { StreakData } from '../types';

const STREAK_KEY = '@saint_match_streak';
const COMPLETIONS_KEY = '@saint_match_completions';

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

export async function useStreakFreeze(): Promise<boolean> {
  const current = await getStreakData();

  if (current.streakFreezesUsedThisWeek >= 1) {
    return false; // Already used this week
  }

  const updated: StreakData = {
    ...current,
    lastCompletionDate: format(new Date(), 'yyyy-MM-dd'),
    streakFreezesUsedThisWeek: current.streakFreezesUsedThisWeek + 1,
  };

  await AsyncStorage.setItem(STREAK_KEY, JSON.stringify(updated));
  return true;
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
  await AsyncStorage.multiRemove([STREAK_KEY, COMPLETIONS_KEY]);
}
