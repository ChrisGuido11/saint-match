import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActiveChallenge, ChallengeLogEntry, Completion, NotificationPreferences, Saint, UsageData, UserNovena } from '../types';
import { format, startOfWeek, addDays } from 'date-fns';
import { SAINTS } from '../constants/saints';

const KEYS = {
  onboarding: '@saint_match_onboarding',
  activeChallenge: '@saint_match_active_challenge',
  completions: '@saint_match_completions_log',
  usage: '@saint_match_usage',
  isPro: '@saint_match_pro_status',
  userNovenas: '@saint_match_user_novenas',
  discoveredSaints: '@saint_match_discovered_saints',
  matchHistory: '@saint_match_match_history',
  notificationPrefs: '@saint_match_notification_prefs',
  hapticEnabled: '@saint_match_haptic_enabled',
  // Keys from other modules — included so clearAllData() wipes everything
  streak: '@saint_match_streak',
  completionDates: '@saint_match_completions',
  supabaseMigrated: '@saint_match_supabase_migrated',
  syncQueue: '@saint_match_sync_queue',
  proCacheTs: '@saint_match_pro_cache_ts',
  novenaCatalog: '@saint_match_novena_catalog',
  challengeLog: '@saint_match_challenge_log',
  migratedOnboarding: '@saint_match_migrated_onboarding',
  migratedCompletions: '@saint_match_migrated_completions',
  migratedStreaks: '@saint_match_migrated_streaks',
} as const;

// Onboarding
export async function hasCompletedOnboarding(): Promise<boolean> {
  return (await AsyncStorage.getItem(KEYS.onboarding)) === 'true';
}

export async function setOnboardingComplete(): Promise<void> {
  await AsyncStorage.setItem(KEYS.onboarding, 'true');
}

// Active Challenge
export async function getActiveChallenge(): Promise<ActiveChallenge | null> {
  try {
    const raw = await AsyncStorage.getItem(KEYS.activeChallenge);
    if (!raw) return null;
    const challenge: ActiveChallenge = JSON.parse(raw);

    // Check if it's from today
    const today = format(new Date(), 'yyyy-MM-dd');
    const acceptedDate = format(new Date(challenge.acceptedAt), 'yyyy-MM-dd');
    if (acceptedDate !== today) {
      await AsyncStorage.removeItem(KEYS.activeChallenge);
      return null;
    }

    return challenge;
  } catch {
    return null;
  }
}

export async function setActiveChallenge(challenge: ActiveChallenge): Promise<void> {
  await AsyncStorage.setItem(KEYS.activeChallenge, JSON.stringify(challenge));
}

export async function clearActiveChallenge(): Promise<void> {
  await AsyncStorage.removeItem(KEYS.activeChallenge);
}

// Completions log
export async function getCompletions(): Promise<Completion[]> {
  try {
    const raw = await AsyncStorage.getItem(KEYS.completions);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function addCompletion(completion: Completion): Promise<void> {
  const completions = await getCompletions();
  completions.unshift(completion);
  await AsyncStorage.setItem(KEYS.completions, JSON.stringify(completions));
}

// Weekly usage tracking
export async function getUsageData(): Promise<UsageData> {
  try {
    const raw = await AsyncStorage.getItem(KEYS.usage);
    if (!raw) return getDefaultUsage();

    const data: UsageData = JSON.parse(raw);
    const now = new Date();

    // Reset if past reset date
    if (new Date(data.resetAt) <= now) {
      const fresh = getDefaultUsage();
      await AsyncStorage.setItem(KEYS.usage, JSON.stringify(fresh));
      return fresh;
    }

    return data;
  } catch {
    return getDefaultUsage();
  }
}

export async function incrementUsage(): Promise<UsageData> {
  const data = await getUsageData();
  data.matchesUsedThisWeek += 1;
  await AsyncStorage.setItem(KEYS.usage, JSON.stringify(data));
  return data;
}

function getDefaultUsage(): UsageData {
  const nextMonday = addDays(startOfWeek(new Date(), { weekStartsOn: 1 }), 7);
  return {
    matchesUsedThisWeek: 0,
    weeklyLimit: 3,
    resetAt: nextMonday.toISOString(),
  };
}

// User Novenas
export async function getUserNovenas(): Promise<UserNovena[]> {
  try {
    const raw = await AsyncStorage.getItem(KEYS.userNovenas);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function getActiveUserNovenas(): Promise<UserNovena[]> {
  const all = await getUserNovenas();
  return all.filter((n) => !n.completed);
}

export async function getCompletedUserNovenas(): Promise<UserNovena[]> {
  const all = await getUserNovenas();
  return all.filter((n) => n.completed);
}

export async function saveUserNovena(novena: UserNovena): Promise<void> {
  const all = await getUserNovenas();
  const index = all.findIndex((n) => n.id === novena.id);
  if (index >= 0) {
    all[index] = novena;
  } else {
    all.unshift(novena);
  }
  await AsyncStorage.setItem(KEYS.userNovenas, JSON.stringify(all));
}

export async function deleteUserNovena(id: string): Promise<void> {
  const all = await getUserNovenas();
  const filtered = all.filter((n) => n.id !== id);
  await AsyncStorage.setItem(KEYS.userNovenas, JSON.stringify(filtered));
}

// Discovered Saints
export async function getDiscoveredSaints(): Promise<Saint[]> {
  try {
    const raw = await AsyncStorage.getItem(KEYS.discoveredSaints);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function saveDiscoveredSaint(saint: Saint): Promise<void> {
  const all = await getDiscoveredSaints();
  const index = all.findIndex((s) => s.id === saint.id);
  if (index >= 0) {
    all[index] = saint;
  } else {
    all.push(saint);
  }
  await AsyncStorage.setItem(KEYS.discoveredSaints, JSON.stringify(all));
}

export async function migrateDiscoveredSaintsFromCompletions(completions: Completion[]): Promise<Saint[]> {
  const uniqueMap = new Map<string, Completion>();
  for (const c of completions) {
    if (!uniqueMap.has(c.saintId)) {
      uniqueMap.set(c.saintId, c);
    }
  }

  const saints: Saint[] = [];
  for (const [saintId, comp] of uniqueMap) {
    const local = SAINTS.find((s) => s.id === saintId);
    if (local) {
      saints.push(local);
    } else {
      saints.push({
        id: saintId,
        name: comp.saintName,
        feastDay: '',
        bio: '',
        virtues: [],
        emotions: [comp.emotionSelected],
        initials: comp.saintName
          .split(' ')
          .filter((w) => w.length > 0 && w[0] === w[0].toUpperCase())
          .map((w) => w[0])
          .slice(0, 2)
          .join(''),
      });
    }
  }

  await AsyncStorage.setItem(KEYS.discoveredSaints, JSON.stringify(saints));
  return saints;
}

// Match History (for deduplication)
export async function getMatchHistory(): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(KEYS.matchHistory);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function addToMatchHistory(saintName: string): Promise<void> {
  const history = await getMatchHistory();
  const filtered = history.filter((n) => n.toLowerCase() !== saintName.toLowerCase());
  filtered.unshift(saintName);
  await AsyncStorage.setItem(KEYS.matchHistory, JSON.stringify(filtered.slice(0, 50)));
}

export async function migrateMatchHistoryFromCompletions(): Promise<void> {
  const existing = await getMatchHistory();
  if (existing.length > 0) return; // Already migrated

  const completions = await getCompletions();
  if (completions.length === 0) return;

  const seen = new Set<string>();
  const names: string[] = [];
  for (const c of completions) {
    const lower = c.saintName.toLowerCase();
    if (!seen.has(lower)) {
      seen.add(lower);
      names.push(c.saintName);
    }
  }

  await AsyncStorage.setItem(KEYS.matchHistory, JSON.stringify(names.slice(0, 50)));
}

// Challenge Log
export async function getChallengeLog(): Promise<ChallengeLogEntry[]> {
  try {
    const raw = await AsyncStorage.getItem(KEYS.challengeLog);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function addChallengeLogEntry(entry: ChallengeLogEntry): Promise<void> {
  const log = await getChallengeLog();
  log.unshift(entry);
  await AsyncStorage.setItem(KEYS.challengeLog, JSON.stringify(log));
}

export async function markChallengeLogCompleted(id: string): Promise<void> {
  const log = await getChallengeLog();
  const entry = log.find((e) => e.id === id);
  if (entry) {
    entry.completed = true;
    entry.completedAt = new Date().toISOString();
    await AsyncStorage.setItem(KEYS.challengeLog, JSON.stringify(log));
  }
}

export async function getChallengeLogDates(): Promise<{ accepted: string[]; completed: string[] }> {
  const log = await getChallengeLog();
  const accepted: string[] = [];
  const completed: string[] = [];
  for (const entry of log) {
    accepted.push(entry.dateAccepted);
    if (entry.completed) {
      completed.push(entry.dateAccepted);
    }
  }
  return { accepted, completed };
}

// Notification preferences
export async function getNotificationPreferences(): Promise<NotificationPreferences> {
  try {
    const raw = await AsyncStorage.getItem(KEYS.notificationPrefs);
    return raw ? JSON.parse(raw) : {
      dailyReminderEnabled: true,
      dailyReminderHour: 8,
      dailyReminderMinute: 30,
      novenaReminderEnabled: false,
    };
  } catch {
    return {
      dailyReminderEnabled: true,
      dailyReminderHour: 8,
      dailyReminderMinute: 30,
      novenaReminderEnabled: false,
    };
  }
}

export async function setNotificationPreferences(prefs: NotificationPreferences): Promise<void> {
  await AsyncStorage.setItem(KEYS.notificationPrefs, JSON.stringify(prefs));
}

// Full data export
export async function exportAllData(): Promise<Record<string, unknown>> {
  const [completions, usage] = await Promise.all([
    getCompletions(),
    getUsageData(),
  ]);

  return {
    exportedAt: new Date().toISOString(),
    completions,
    usage,
  };
}

// Clear all data
export async function clearAllData(): Promise<void> {
  await AsyncStorage.multiRemove(Object.values(KEYS));
}
