export type Mood =
  | 'seeking-peace'
  | 'need-focus'
  | 'want-to-grow'
  | 'feeling-grateful'
  | 'full-of-joy'
  | 'ready-to-serve';

// Legacy type for backward compatibility with data
export type Emotion = 'anxious' | 'overwhelmed' | 'scattered' | 'grateful' | 'joyful' | 'peaceful';

export interface MoodOption {
  id: Mood;
  label: string;
  subtitle: string;
  emoji: string;
  color: string;
  category: 'support' | 'growth';
  legacyEmotion: Emotion; // Maps to existing emotion for saint matching
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

// Achievement/Milestone types for enhanced gamification
export type MilestoneType = 
  | 'first-challenge'
  | 'streak-3'
  | 'streak-7'
  | 'streak-14'
  | 'streak-30'
  | 'streak-50'
  | 'streak-100'
  | 'virtue-seeker'
  | 'saint-friend'
  | 'consistent-soul';

export interface Milestone {
  id: MilestoneType;
  title: string;
  description: string;
  emoji: string;
  color: string;
}
