import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase, isSupabaseConfigured } from './supabase';
import { getCompletions, getUsageData } from './storage';
import { getStreakData, getCompletionDates } from './streak';
import { hasCompletedOnboarding } from './storage';
import {
  Completion,
  StreakData,
  UsageData,
  ActiveChallenge,
  UserNovena,
} from '../types';
import { format, startOfWeek, addDays } from 'date-fns';

const MIGRATION_KEY = '@saint_match_supabase_migrated_v2';
const SYNC_QUEUE_KEY = '@saint_match_sync_queue';

// ── Sync retry queue ─────────────────────────────────────────────────

interface SyncQueueItem {
  type: 'completion' | 'streak' | 'challenge' | 'onboarding' | 'user_novena';
  payload: unknown;
  createdAt: string;
}

async function getSyncQueue(): Promise<SyncQueueItem[]> {
  try {
    const raw = await AsyncStorage.getItem(SYNC_QUEUE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

async function addToSyncQueue(item: SyncQueueItem): Promise<void> {
  const queue = await getSyncQueue();
  queue.push(item);
  await AsyncStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(queue));
}

async function clearSyncQueue(): Promise<void> {
  await AsyncStorage.removeItem(SYNC_QUEUE_KEY);
}

async function replaySyncQueue(): Promise<void> {
  const queue = await getSyncQueue();
  if (queue.length === 0) return;

  const failedItems: SyncQueueItem[] = [];

  for (const item of queue) {
    try {
      switch (item.type) {
        case 'completion':
          await syncCompletionToServer(item.payload as Completion);
          break;
        case 'streak':
          await syncStreakToServer(item.payload as StreakData);
          break;
        case 'challenge':
          await syncActiveChallengeToServer(item.payload as ActiveChallenge | null);
          break;
        case 'onboarding':
          await syncOnboardingToServer();
          break;
        case 'user_novena':
          await syncUserNovenaToServer(item.payload as UserNovena);
          break;
      }
    } catch {
      failedItems.push(item);
    }
  }

  // Replace queue with only the items that failed again
  if (failedItems.length > 0) {
    await AsyncStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(failedItems));
  } else {
    await clearSyncQueue();
  }
}

// ── Helper: Ensure profile exists ──────────────────────────────────────

async function ensureProfileExists(userId: string, email: string | undefined): Promise<void> {
  try {
    // Try to fetch the profile first
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .single();

    if (!existingProfile) {
      // Profile doesn't exist, create it
      await supabase.from('profiles').insert({
        id: userId,
        email: email || null,
      });

      // Also create the streak record
      await supabase.from('streaks').insert({
        user_id: userId,
      });
    }
  } catch (err) {
    console.error('ensureProfileExists error:', err);
  }
}

// ── Sync result type ───────────────────────────────────────────────────

export interface SyncedData {
  streak: StreakData | null;
  usage: UsageData | null;
  completions: Completion[] | null;
  novenas: UserNovena[] | null;
}

// ── Main sync function ─────────────────────────────────────────────────

export async function syncAllData(): Promise<SyncedData | null> {
  if (!isSupabaseConfigured()) return null;

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return null;

  const userId = session.user.id;

  // Replay any queued operations from previous failed syncs
  await replaySyncQueue();

  // Run one-time migration if needed
  await migrateLocalDataToServer(userId);

  // Pull data from server in parallel
  const [streak, usage, completions, novenas] = await Promise.all([
    fetchServerStreak(userId),
    fetchServerUsage(userId),
    fetchServerCompletions(userId),
    fetchServerNovenas(userId),
  ]);

  return { streak, usage, completions, novenas };
}

// ── Push functions (client → server) ───────────────────────────────────

export async function syncCompletionToServer(completion: Completion): Promise<void> {
  if (!isSupabaseConfigured()) return;

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    console.warn('syncCompletionToServer: No session available');
    return;
  }

  try {
    // Ensure profile exists first
    await ensureProfileExists(session.user.id, session.user.email);

    const result = await supabase.from('completions').upsert(
      {
        user_id: session.user.id,
        saint_id: completion.saintId,
        micro_action_id: completion.microActionId,
        emotion_selected: completion.emotionSelected,
        saint_name: completion.saintName,
        action_text: completion.actionText,
        date_completed: completion.dateCompleted,
        completed_at: completion.completedAt,
      },
      { onConflict: 'user_id,date_completed' }
    );

    if (result.error) {
      console.error('syncCompletionToServer error:', result.error);
      throw result.error;
    } else {
      console.log('syncCompletionToServer success');
    }
  } catch (err) {
    console.error('syncCompletionToServer exception:', err);
    await addToSyncQueue({
      type: 'completion',
      payload: completion,
      createdAt: new Date().toISOString(),
    });
  }
}

export async function syncStreakToServer(streak: StreakData): Promise<void> {
  if (!isSupabaseConfigured()) return;

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    console.warn('syncStreakToServer: No session available');
    return;
  }

  try {
    // Ensure profile exists first
    await ensureProfileExists(session.user.id, session.user.email);

    const result = await supabase.from('streaks').upsert({
      user_id: session.user.id,
      current_streak: streak.currentStreak,
      longest_streak: streak.longestStreak,
      last_completion_date: streak.lastCompletionDate,
      streak_freezes_used_this_week: streak.streakFreezesUsedThisWeek,
    });

    if (result.error) {
      console.error('syncStreakToServer error:', result.error);
      throw result.error;
    } else {
      console.log('syncStreakToServer success');
    }
  } catch (err) {
    console.error('syncStreakToServer exception:', err);
    await addToSyncQueue({
      type: 'streak',
      payload: streak,
      createdAt: new Date().toISOString(),
    });
  }
}

export async function syncActiveChallengeToServer(
  challenge: ActiveChallenge | null
): Promise<void> {
  if (!isSupabaseConfigured()) return;

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return;

  const userId = session.user.id;

  try {
    if (!challenge) {
      await supabase.from('active_challenges').delete().eq('user_id', userId);
      return;
    }

    const result = await supabase.from('active_challenges').upsert({
      user_id: userId,
      match_data: challenge.match,
      accepted_at: challenge.acceptedAt,
      completed: challenge.completed,
      date_for: new Date().toISOString().slice(0, 10),
    });

    if (result.error) throw result.error;
  } catch (err) {
    console.error('syncActiveChallengeToServer exception:', err);
    await addToSyncQueue({
      type: 'challenge',
      payload: challenge,
      createdAt: new Date().toISOString(),
    });
  }
}

export async function syncOnboardingToServer(): Promise<void> {
  if (!isSupabaseConfigured()) return;

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return;

  try {
    const result = await supabase
      .from('profiles')
      .update({ is_onboarded: true })
      .eq('id', session.user.id);

    if (result.error) throw result.error;
  } catch (err) {
    console.error('syncOnboardingToServer exception:', err);
    await addToSyncQueue({
      type: 'onboarding',
      payload: null,
      createdAt: new Date().toISOString(),
    });
  }
}

// ── Fetch functions (server → client) ──────────────────────────────────

async function fetchServerStreak(userId: string): Promise<StreakData | null> {
  const { data } = await supabase
    .from('streaks')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (!data) return null;

  return {
    currentStreak: data.current_streak,
    longestStreak: data.longest_streak,
    lastCompletionDate: data.last_completion_date,
    streakFreezesUsedThisWeek: data.streak_freezes_used_this_week,
  };
}

export async function fetchServerUsage(userId: string): Promise<UsageData | null> {
  const now = new Date();
  const dayOfWeek = now.getUTCDay();
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const weekStart = new Date(now);
  weekStart.setUTCDate(now.getUTCDate() + mondayOffset);
  weekStart.setUTCHours(0, 0, 0, 0);
  const weekStartStr = weekStart.toISOString().slice(0, 10);

  const { data } = await supabase
    .from('usage')
    .select('*')
    .eq('user_id', userId)
    .eq('week_start', weekStartStr)
    .maybeSingle();

  if (!data) return null;

  return {
    matchesUsedThisWeek: data.matches_used_this_week,
    weeklyLimit: data.weekly_limit,
    resetAt: data.reset_at,
  };
}

async function fetchServerCompletions(userId: string): Promise<Completion[] | null> {
  const { data } = await supabase
    .from('completions')
    .select('*')
    .eq('user_id', userId)
    .order('completed_at', { ascending: false })
    .limit(100);

  if (!data) return null;

  return data.map((row) => ({
    id: row.id,
    saintId: row.saint_id,
    microActionId: row.micro_action_id,
    completedAt: row.completed_at,
    dateCompleted: row.date_completed,
    emotionSelected: row.emotion_selected,
    saintName: row.saint_name,
    actionText: row.action_text,
  }));
}

// ── Novena sync functions ────────────────────────────────────────────

export async function syncUserNovenaToServer(novena: UserNovena): Promise<void> {
  if (!isSupabaseConfigured()) return;

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return;

  try {
    await ensureProfileExists(session.user.id, session.user.email);

    const result = await supabase.from('user_novenas').upsert({
      id: novena.id,
      user_id: session.user.id,
      novena_id: novena.novenaId,
      saint_id: novena.saintId,
      saint_name: novena.saintName,
      current_day: novena.currentDay,
      completed_days: novena.completedDays,
      personal_intention: novena.personalIntention,
      started_at: novena.startedAt,
      last_prayer_date: novena.lastPrayerDate,
      completed: novena.completed,
      completed_at: novena.completedAt,
      reflection: novena.reflection,
      generated_prayers: novena.generatedPrayers,
    });

    if (result.error) throw result.error;
  } catch (err) {
    console.error('syncUserNovenaToServer exception:', err);
    await addToSyncQueue({
      type: 'user_novena',
      payload: novena,
      createdAt: new Date().toISOString(),
    });
  }
}

export async function fetchServerNovenas(userId: string): Promise<UserNovena[] | null> {
  const { data } = await supabase
    .from('user_novenas')
    .select('*')
    .eq('user_id', userId)
    .order('started_at', { ascending: false });

  if (!data) return null;

  return data.map((row) => ({
    id: row.id,
    novenaId: row.novena_id,
    saintId: row.saint_id,
    saintName: row.saint_name ?? '',
    currentDay: row.current_day,
    completedDays: row.completed_days,
    personalIntention: row.personal_intention,
    startedAt: row.started_at,
    lastPrayerDate: row.last_prayer_date,
    completed: row.completed,
    completedAt: row.completed_at,
    reflection: row.reflection,
    generatedPrayers: row.generated_prayers ?? null,
  }));
}

// ── One-time migration ─────────────────────────────────────────────────

async function migrateLocalDataToServer(userId: string): Promise<void> {
  const alreadyMigrated = await AsyncStorage.getItem(MIGRATION_KEY);
  if (alreadyMigrated === 'true') return;

  // Track each step independently so partial failures can be retried
  const STEP_KEYS = {
    onboarding: '@saint_match_migrated_onboarding_v2',
    completions: '@saint_match_migrated_completions_v2',
    streaks: '@saint_match_migrated_streaks_v2',
  };

  let allSucceeded = true;

  // 1. Migrate onboarding status
  try {
    if ((await AsyncStorage.getItem(STEP_KEYS.onboarding)) !== 'true') {
      const isOnboarded = await hasCompletedOnboarding();
      if (isOnboarded) {
        await supabase
          .from('profiles')
          .update({ is_onboarded: true })
          .eq('id', userId);
      }
      await AsyncStorage.setItem(STEP_KEYS.onboarding, 'true');
    }
  } catch {
    allSucceeded = false;
  }

  // 2. Migrate completions
  try {
    if ((await AsyncStorage.getItem(STEP_KEYS.completions)) !== 'true') {
      const completions = await getCompletions();
      if (completions.length > 0) {
        const rows = completions.map((c) => ({
          user_id: userId,
          saint_id: c.saintId,
          micro_action_id: c.microActionId,
          emotion_selected: c.emotionSelected,
          saint_name: c.saintName,
          action_text: c.actionText,
          date_completed: c.dateCompleted,
          completed_at: c.completedAt,
        }));
        const { error } = await supabase
          .from('completions')
          .upsert(rows, { onConflict: 'user_id,date_completed' });
        if (error) throw error;
      }
      await AsyncStorage.setItem(STEP_KEYS.completions, 'true');
    }
  } catch {
    allSucceeded = false;
  }

  // 3. Migrate streak data
  try {
    if ((await AsyncStorage.getItem(STEP_KEYS.streaks)) !== 'true') {
      const streakData = await getStreakData();
      const { error } = await supabase.from('streaks').upsert({
        user_id: userId,
        current_streak: streakData.currentStreak,
        longest_streak: streakData.longestStreak,
        last_completion_date: streakData.lastCompletionDate,
        streak_freezes_used_this_week: streakData.streakFreezesUsedThisWeek,
      });
      if (error) throw error;
      await AsyncStorage.setItem(STEP_KEYS.streaks, 'true');
    }
  } catch {
    allSucceeded = false;
  }

  // 4. Only mark overall migration complete if all steps succeeded
  if (allSucceeded) {
    await AsyncStorage.setItem(MIGRATION_KEY, 'true');
  }
}
