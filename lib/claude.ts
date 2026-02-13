import { Emotion, Saint, SaintMatch } from '../types';
import { SAINTS, getMicroActionsForEmotion } from '../constants/saints';
import { supabase, isSupabaseConfigured } from './supabase';
import { getMatchHistory, addToMatchHistory } from './storage';

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;

interface EdgeFunctionResponse {
  saint_name: string;
  feast_day: string;
  bio: string;
  virtues?: string[];
  micro_action: string;
  estimated_minutes: number;
  match_reason?: string;
  source: 'claude' | 'cache' | 'local';
}

// Call the Supabase Edge Function (handles cache, Claude API, and usage server-side)
async function fetchFromEdgeFunction(payload: { emotion: Emotion; excludeSaints?: string[] } | { customMood: string; excludeSaints?: string[] }): Promise<EdgeFunctionResponse | null> {
  if (!isSupabaseConfigured() || !SUPABASE_URL) return null;

  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return null;

    const response = await fetch(`${SUPABASE_URL}/functions/v1/saint-match`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`,
        'apikey': process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
      },
      body: JSON.stringify(payload),
    });

    if (response.status === 429) {
      throw new Error('USAGE_LIMIT_REACHED');
    }

    if (!response.ok) return null;

    return await response.json();
  } catch (error) {
    if (error instanceof Error && error.message === 'USAGE_LIMIT_REACHED') {
      throw error; // Re-throw so UI can show paywall
    }
    return null;
  }
}

function mapCustomMoodToEmotion(text: string): Emotion {
  const lower = text.toLowerCase();
  const KEYWORD_MAP: Record<Emotion, string[]> = {
    anxious: ['worry', 'worried', 'anxious', 'anxiety', 'nervous', 'fear', 'scared', 'afraid', 'stress', 'stressed', 'panic', 'money', 'finances', 'financial', 'job', 'health', 'future', 'uncertain', 'dread'],
    overwhelmed: ['overwhelm', 'too much', 'exhausted', 'tired', 'burnout', 'busy', 'swamped', 'drowning', 'pressure', 'overload', 'broken', 'falling apart'],
    scattered: ['confused', 'lost', 'direction', 'purpose', 'scattered', 'unfocused', 'distracted', 'restless', 'stuck', 'don\'t know'],
    grateful: ['grateful', 'thankful', 'blessed', 'appreciate', 'gratitude', 'thank'],
    joyful: ['joy', 'joyful', 'excited', 'celebration', 'love', 'loving', 'hopeful', 'hope', 'inspired', 'happy', 'wonderful', 'amazing'],
    peaceful: ['peace', 'peaceful', 'calm', 'content', 'serene', 'quiet', 'still', 'relaxed'],
  };

  for (const [emotion, keywords] of Object.entries(KEYWORD_MAP)) {
    if (keywords.some((k) => lower.includes(k))) return emotion as Emotion;
  }
  return 'anxious';
}

// Fallback: local saint matching using curated data
function matchLocally(emotion: Emotion, excludeSaints: string[] = []): SaintMatch {
  let matchingSaints = SAINTS.filter((s) => s.emotions.includes(emotion));

  if (excludeSaints.length > 0) {
    const excludeSet = new Set(excludeSaints.map((n) => n.toLowerCase()));
    const filtered = matchingSaints.filter((s) => !excludeSet.has(s.name.toLowerCase()));
    if (filtered.length > 0) matchingSaints = filtered;
  }

  const saint = matchingSaints[Math.floor(Math.random() * matchingSaints.length)] ?? SAINTS[0];
  const actions = getMicroActionsForEmotion(saint.id, emotion);
  const microAction = actions[Math.floor(Math.random() * actions.length)] ?? actions[0];

  return {
    saint,
    microAction,
    matchedAt: new Date().toISOString(),
  };
}

function buildSaintMatch(result: EdgeFunctionResponse, emotion: Emotion): SaintMatch {
  const localSaint = SAINTS.find(
    (s) => s.name.toLowerCase() === result.saint_name.toLowerCase()
  );

  const saint: Saint = localSaint ?? {
    id: `ai-${result.saint_name.toLowerCase().replace(/[^a-z]/g, '-')}`,
    name: result.saint_name,
    feastDay: result.feast_day,
    bio: result.bio,
    virtues: result.virtues ?? [],
    emotions: [emotion],
    initials: result.saint_name
      .split(' ')
      .filter((w) => w.length > 0 && w[0] === w[0].toUpperCase())
      .map((w) => w[0])
      .slice(0, 2)
      .join(''),
  };

  return {
    saint,
    microAction: {
      id: `match-${Date.now()}`,
      saintId: saint.id,
      emotion,
      actionText: result.micro_action,
      estimatedMinutes: result.estimated_minutes,
    },
    matchedAt: new Date().toISOString(),
    matchReason: result.match_reason || undefined,
  };
}

export async function getSaintMatch(emotion: Emotion): Promise<SaintMatch> {
  const history = await getMatchHistory();
  const excludeSaints = history.slice(0, 30);

  // Try Edge Function first (handles cache + Claude + usage)
  const result = await fetchFromEdgeFunction({ emotion, excludeSaints });

  if (result) {
    const match = buildSaintMatch(result, emotion);
    addToMatchHistory(match.saint.name).catch(() => {});
    return match;
  }

  // Fallback to local matching (offline or unknown saint name)
  const match = matchLocally(emotion, excludeSaints);
  addToMatchHistory(match.saint.name).catch(() => {});
  return match;
}

export async function getSaintMatchCustom(moodText: string): Promise<SaintMatch> {
  const history = await getMatchHistory();
  const excludeSaints = history.slice(0, 30);

  const result = await fetchFromEdgeFunction({ customMood: moodText, excludeSaints });

  if (result) {
    const match = buildSaintMatch(result, mapCustomMoodToEmotion(moodText));
    addToMatchHistory(match.saint.name).catch(() => {});
    return match;
  }

  // Local fallback: map custom text to nearest emotion via keywords
  const mappedEmotion = mapCustomMoodToEmotion(moodText);
  const match = matchLocally(mappedEmotion, excludeSaints);
  addToMatchHistory(match.saint.name).catch(() => {});
  return match;
}
