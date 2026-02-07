import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActiveChallenge, Completion, PatienceScore, UsageData, UserNovena } from '../types';
import { format, startOfWeek, addDays } from 'date-fns';

const KEYS = {
  onboarding: '@saint_match_onboarding',
  activeChallenge: '@saint_match_active_challenge',
  completions: '@saint_match_completions_log',
  usage: '@saint_match_usage',
  patienceScores: '@saint_match_patience_scores',
  isPro: '@saint_match_pro_status',
  userNovenas: '@saint_match_user_novenas',
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

// Patience scores
export async function getPatienceScores(): Promise<PatienceScore[]> {
  try {
    const raw = await AsyncStorage.getItem(KEYS.patienceScores);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function addPatienceScore(score: number): Promise<void> {
  const scores = await getPatienceScores();
  const weekEnding = format(
    addDays(startOfWeek(new Date(), { weekStartsOn: 1 }), 6),
    'yyyy-MM-dd'
  );

  // Replace score for this week if exists
  const existingIndex = scores.findIndex((s) => s.weekEnding === weekEnding);
  const newScore: PatienceScore = {
    id: `ps-${Date.now()}`,
    score,
    weekEnding,
    createdAt: new Date().toISOString(),
  };

  if (existingIndex >= 0) {
    scores[existingIndex] = newScore;
  } else {
    scores.push(newScore);
  }

  await AsyncStorage.setItem(KEYS.patienceScores, JSON.stringify(scores));
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

// Full data export
export async function exportAllData(): Promise<Record<string, unknown>> {
  const [completions, patienceScores, usage] = await Promise.all([
    getCompletions(),
    getPatienceScores(),
    getUsageData(),
  ]);

  return {
    exportedAt: new Date().toISOString(),
    completions,
    patienceScores,
    usage,
  };
}

// Clear all data
export async function clearAllData(): Promise<void> {
  await AsyncStorage.multiRemove(Object.values(KEYS));
}
