import { Emotion, SaintMatch } from '../types';
import { SAINTS, getMicroActionsForEmotion } from '../constants/saints';

const ANTHROPIC_API_KEY = process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY;

interface ClaudeResponse {
  saintName: string;
  feastDay: string;
  bio: string;
  microAction: string;
  estimatedMinutes: number;
}

// Use Claude API for saint matching when configured
async function fetchFromClaude(emotion: Emotion): Promise<ClaudeResponse | null> {
  if (!ANTHROPIC_API_KEY) return null;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 300,
        messages: [
          {
            role: 'user',
            content: `You are a Catholic spiritual director. The user is feeling ${emotion}. Recommend ONE saint who overcame this struggle and ONE specific 5-15 minute micro-action they can do today inspired by this saint's virtue. The action should be concrete and modern (actual behavioral action, not just prayer). Respond ONLY in JSON: {"saintName": "", "feastDay": "", "bio": "50 words max", "microAction": "", "estimatedMinutes": 10}`,
          },
        ],
      }),
    });

    if (!response.ok) return null;

    const data = await response.json();
    const text = data.content?.[0]?.text;
    if (!text) return null;

    return JSON.parse(text);
  } catch {
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

export async function getSaintMatch(emotion: Emotion): Promise<SaintMatch> {
  // Try Claude API first
  const claudeResult = await fetchFromClaude(emotion);

  if (claudeResult) {
    // Map Claude response to our types
    const saint = SAINTS.find(
      (s) => s.name.toLowerCase() === claudeResult.saintName.toLowerCase()
    );

    if (saint) {
      return {
        saint,
        microAction: {
          id: `claude-${Date.now()}`,
          saintId: saint.id,
          emotion,
          actionText: claudeResult.microAction,
          estimatedMinutes: claudeResult.estimatedMinutes,
        },
        matchedAt: new Date().toISOString(),
      };
    }
  }

  // Fallback to local matching
  return matchLocally(emotion);
}
