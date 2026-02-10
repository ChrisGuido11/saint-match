import { Emotion, Saint, SaintMatch } from '../types';
import { SAINTS, getMicroActionsForEmotion } from '../constants/saints';
import { supabase, isSupabaseConfigured } from './supabase';

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;

interface EdgeFunctionResponse {
  saint_name: string;
  feast_day: string;
  bio: string;
  virtues?: string[];
  micro_action: string;
  estimated_minutes: number;
  source: 'claude' | 'cache' | 'local';
}

// Call the Supabase Edge Function (handles cache, Claude API, and usage server-side)
async function fetchFromEdgeFunction(payload: { emotion: Emotion } | { customMood: string }): Promise<EdgeFunctionResponse | null> {
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

// Fallback: local saint matching using curated data
function matchLocally(emotion: Emotion): SaintMatch {
  const matchingSaints = SAINTS.filter((s) => s.emotions.includes(emotion));
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
      .filter((w) => w[0] === w[0].toUpperCase())
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
  };
}

export async function getSaintMatch(emotion: Emotion): Promise<SaintMatch> {
  // Try Edge Function first (handles cache + Claude + usage)
  const result = await fetchFromEdgeFunction({ emotion });

  if (result) {
    return buildSaintMatch(result, emotion);
  }

  // Fallback to local matching (offline or unknown saint name)
  return matchLocally(emotion);
}

export async function getSaintMatchCustom(moodText: string): Promise<SaintMatch> {
  const result = await fetchFromEdgeFunction({ customMood: moodText });

  if (result) {
    // Use a generic emotion for the MicroAction field since custom moods don't map to one
    const fallbackEmotion: Emotion = 'peaceful';
    return buildSaintMatch(result, fallbackEmotion);
  }

  // Local fallback: pick a random emotion and match locally
  const emotions: Emotion[] = ['anxious', 'overwhelmed', 'scattered', 'grateful', 'joyful', 'peaceful'];
  const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
  return matchLocally(randomEmotion);
}
