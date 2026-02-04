import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase, isSupabaseConfigured } from './supabase';
import { getCompletions, getPatienceScores, getUsageData } from './storage';
import { getStreakData, getCompletionDates } from './streak';
import { hasCompletedOnboarding } from './storage';
import {
  Completion,
  StreakData,
  UsageData,
  ActiveChallenge,
  PatienceScore,
} from '../types';
import { format, startOfWeek, addDays } from 'date-fns';

const MIGRATION_KEY = '@saint_match_supabase_migrated';

// ── Sync result type ───────────────────────────────────────────────────

export interface SyncedData {
  streak: StreakData | null;
  usage: UsageData | null;
  completions: Completion[] | null;
}

// ── Main sync function ─────────────────────────────────────────────────

export async function syncAllData(): Promise<SyncedData | null> {
  if (!isSupabaseConfigured()) return null;

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return null;

  const userId = session.user.id;

  // Run one-time migration if needed
  await migrateLocalDataToServer(userId);

  // Pull data from server in parallel
  const [streak, usage, completions] = await Promise.all([
    fetchServerStreak(userId),
    fetchServerUsage(userId),
    fetchServerCompletions(userId),
  ]);

  return { streak, usage, completions };
}

// ── Push functions (client → server) ───────────────────────────────────

export async function syncCompletionToServer(completion: Completion): Promise<void> {
  if (!isSupabaseConfigured()) return;

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return;

  await supabase.from('completions').upsert(
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
}

export async function syncStreakToServer(streak: StreakData): Promise<void> {
  if (!isSupabaseConfigured()) return;

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return;

  await supabase.from('streaks').upsert({
    user_id: session.user.id,
    current_streak: streak.currentStreak,
    longest_streak: streak.longestStreak,
    last_completion_date: streak.lastCompletionDate,
    streak_freezes_used_this_week: streak.streakFreezesUsedThisWeek,
  });
}

export async function syncActiveChallengeToServer(
  challenge: ActiveChallenge | null
): Promise<void> {
  if (!isSupabaseConfigured()) return;

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return;

  const userId = session.user.id;

  if (!challenge) {
    await supabase.from('active_challenges').delete().eq('user_id', userId);
    return;
  }

  await supabase.from('active_challenges').upsert({
    user_id: userId,
    match_data: challenge.match,
    accepted_at: challenge.acceptedAt,
    completed: challenge.completed,
    date_for: new Date().toISOString().slice(0, 10),
  });
}

export async function syncPatienceScoreToServer(
  score: number,
  weekEnding: string
): Promise<void> {
  if (!isSupabaseConfigured()) return;

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return;

  await supabase.from('patience_scores').upsert(
    {
      user_id: session.user.id,
      score,
      week_ending: weekEnding,
    },
    { onConflict: 'user_id,week_ending' }
  );
}

export async function syncOnboardingToServer(): Promise<void> {
  if (!isSupabaseConfigured()) return;

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return;

  await supabase
    .from('profiles')
    .update({ is_onboarded: true })
    .eq('id', session.user.id);
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

// ── One-time migration ─────────────────────────────────────────────────

async function migrateLocalDataToServer(userId: string): Promise<void> {
  const alreadyMigrated = await AsyncStorage.getItem(MIGRATION_KEY);
  if (alreadyMigrated === 'true') return;

  try {
    // 1. Migrate onboarding status
    const isOnboarded = await hasCompletedOnboarding();
    if (isOnboarded) {
      await supabase
        .from('profiles')
        .update({ is_onboarded: true })
        .eq('id', userId);
    }

    // 2. Migrate completions
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
      await supabase
        .from('completions')
        .upsert(rows, { onConflict: 'user_id,date_completed' });
    }

    // 3. Migrate streak data
    const streakData = await getStreakData();
    await supabase.from('streaks').upsert({
      user_id: userId,
      current_streak: streakData.currentStreak,
      longest_streak: streakData.longestStreak,
      last_completion_date: streakData.lastCompletionDate,
      streak_freezes_used_this_week: streakData.streakFreezesUsedThisWeek,
    });

    // 4. Migrate patience scores
    const patienceScores = await getPatienceScores();
    if (patienceScores.length > 0) {
      const scoreRows = patienceScores.map((s) => ({
        user_id: userId,
        score: s.score,
        week_ending: s.weekEnding,
        created_at: s.createdAt,
      }));
      await supabase
        .from('patience_scores')
        .upsert(scoreRows, { onConflict: 'user_id,week_ending' });
    }

    // 5. Mark migration complete
    await AsyncStorage.setItem(MIGRATION_KEY, 'true');
  } catch {
    // Migration failed — will retry on next app launch
  }
}
