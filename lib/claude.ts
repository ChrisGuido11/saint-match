import { Emotion, Saint, SaintMatch } from '../types';
import { SAINTS } from '../constants/saints';
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

async function fetchFromEdgeFunction(payload: { emotion: Emotion; excludeSaints?: string[] } | { customMood: string; excludeSaints?: string[] }): Promise<EdgeFunctionResponse> {
  if (!isSupabaseConfigured() || !SUPABASE_URL) {
    throw new Error('MATCH_UNAVAILABLE');
  }

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    throw new Error('MATCH_UNAVAILABLE');
  }

  const doFetch = async (): Promise<EdgeFunctionResponse> => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    try {
      const response = await fetch(`${SUPABASE_URL}/functions/v1/saint-match`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
          'apikey': process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (response.status === 429) {
        throw new Error('USAGE_LIMIT_REACHED');
      }

      if (response.status === 503) {
        throw new Error('RETRYABLE');
      }

      if (!response.ok) {
        throw new Error('RETRYABLE');
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeout);
      throw error;
    }
  };

  try {
    return await doFetch();
  } catch (error) {
    if (error instanceof Error && error.message === 'USAGE_LIMIT_REACHED') {
      throw error;
    }

    // Retry once after 2s for transient failures
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      return await doFetch();
    } catch (retryError) {
      if (retryError instanceof Error && retryError.message === 'USAGE_LIMIT_REACHED') {
        throw retryError;
      }
      throw new Error('MATCH_UNAVAILABLE');
    }
  }
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

  const result = await fetchFromEdgeFunction({ emotion, excludeSaints });
  const match = buildSaintMatch(result, emotion);
  addToMatchHistory(match.saint.name).catch(() => {});
  return match;
}

export async function getSaintMatchCustom(moodText: string): Promise<SaintMatch> {
  const history = await getMatchHistory();
  const excludeSaints = history.slice(0, 30);

  const result = await fetchFromEdgeFunction({ customMood: moodText, excludeSaints });

  // Map custom mood to nearest emotion for display purposes
  const emotion = guessEmotion(moodText);
  const match = buildSaintMatch(result, emotion);
  addToMatchHistory(match.saint.name).catch(() => {});
  return match;
}

function guessEmotion(text: string): Emotion {
  const lower = text.toLowerCase();
  const map: [Emotion, string[]][] = [
    ['anxious', ['worry', 'anxious', 'anxiety', 'nervous', 'fear', 'stress', 'panic']],
    ['overwhelmed', ['overwhelm', 'exhausted', 'tired', 'burnout', 'too much', 'angry']],
    ['scattered', ['confused', 'lost', 'scattered', 'unfocused', 'distracted', 'stuck']],
    ['grateful', ['grateful', 'thankful', 'blessed', 'appreciate']],
    ['joyful', ['joy', 'excited', 'happy', 'hope', 'inspired', 'love']],
    ['peaceful', ['peace', 'calm', 'content', 'serene', 'quiet']],
  ];
  for (const [emotion, keywords] of map) {
    if (keywords.some((k) => lower.includes(k))) return emotion;
  }
  return 'anxious';
}
