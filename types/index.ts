export type Emotion =
  | 'anxious'
  | 'overwhelmed'
  | 'scattered'
  | 'impatient'
  | 'frustrated'
  | 'peaceful';

export interface EmotionOption {
  id: Emotion;
  label: string;
  emoji: string;
  color: string;
}

export interface Saint {
  id: string;
  name: string;
  feastDay: string;
  bio: string;
  virtues: string[];
  emotions: Emotion[];
  imageUrl?: string;
  initials: string;
}

export interface MicroAction {
  id: string;
  saintId: string;
  emotion: Emotion;
  actionText: string;
  estimatedMinutes: number;
}

export interface SaintMatch {
  saint: Saint;
  microAction: MicroAction;
  matchedAt: string;
}

export interface Completion {
  id: string;
  saintId: string;
  microActionId: string;
  completedAt: string;
  dateCompleted: string;
  emotionSelected: Emotion;
  saintName: string;
  actionText: string;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastCompletionDate: string | null;
  streakFreezesUsedThisWeek: number;
}

export interface UsageData {
  matchesUsedThisWeek: number;
  weeklyLimit: number;
  resetAt: string;
}

export interface PatienceScore {
  id: string;
  score: number;
  weekEnding: string;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  email: string;
  onboardingCompleted: boolean;
  notificationTime: string;
  isPro: boolean;
  subscriptionStatus: 'free' | 'pro_monthly' | 'pro_annual';
}

export interface ActiveChallenge {
  match: SaintMatch;
  acceptedAt: string;
  completed: boolean;
}
