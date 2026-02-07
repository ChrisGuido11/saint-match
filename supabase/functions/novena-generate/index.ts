import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders, getCorsHeaders } from '../_shared/cors.ts';

// ── Env var validation ──────────────────────────────────────────────────

const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY');

const MISSING_VARS = ['SUPABASE_URL', 'SUPABASE_ANON_KEY']
  .filter((v) => !Deno.env.get(v));

if (MISSING_VARS.length > 0) {
  console.error(`Missing required env vars: ${MISSING_VARS.join(', ')}`);
}

// ── Types ────────────────────────────────────────────────────────────────

interface GeneratedPrayers {
  openingPrayer: string;
  dailyPrayers: string[];
  closingPrayer: string;
}

function isValidGeneratedPrayers(obj: unknown): obj is GeneratedPrayers {
  if (!obj || typeof obj !== 'object') return false;
  const r = obj as Record<string, unknown>;
  return (
    typeof r.openingPrayer === 'string' && r.openingPrayer.length > 0 &&
    Array.isArray(r.dailyPrayers) && r.dailyPrayers.length === 9 &&
    r.dailyPrayers.every((p: unknown) => typeof p === 'string' && (p as string).length > 0) &&
    typeof r.closingPrayer === 'string' && r.closingPrayer.length > 0
  );
}

// ── Claude API call ──────────────────────────────────────────────────────

async function generatePrayers(
  saintName: string,
  saintBio: string,
  personalIntention: string
): Promise<GeneratedPrayers | null> {
  if (!ANTHROPIC_API_KEY) {
    console.error('ANTHROPIC_API_KEY is not set');
    return null;
  }

  try {
    console.log(`Generating novena prayers for ${saintName}...`);
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 4000,
        temperature: 0.9,
        messages: [
          {
            role: 'user',
            content: `You are a Catholic spiritual director composing a novena (9-day prayer).

Saint: ${saintName}
About this saint: ${saintBio}
User's prayer intention: ${personalIntention}

Generate a complete novena with:
1. An opening prayer (3-4 sentences invoking this saint's intercession, referencing the user's intention)
2. Nine daily prayers (each 3-5 sentences, each day exploring a different virtue or aspect of this saint's life, weaving in the user's intention; label each "Day 1:" through "Day 9:")
3. A closing prayer (3-4 sentences of thanksgiving and petition)

Make each daily prayer unique — draw from different episodes, virtues, or teachings of this saint's life. The prayers should feel warm, personal, and accessible (not overly formal).

Respond ONLY in JSON:
{"openingPrayer":"...","dailyPrayers":["Day 1: ...","Day 2: ...","Day 3: ...","Day 4: ...","Day 5: ...","Day 6: ...","Day 7: ...","Day 8: ...","Day 9: ..."],"closingPrayer":"..."}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.error(`Claude API error ${response.status}: ${errBody}`);
      return null;
    }

    const data = await response.json();
    console.log('Claude API response received for novena generation');
    let text = data.content?.[0]?.text;
    if (!text) return null;

    // Strip markdown code fences and extra whitespace
    text = text.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
    // Extract JSON object if there's surrounding text
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('No JSON object found in Claude response:', text.slice(0, 200));
      return null;
    }

    const parsed = JSON.parse(jsonMatch[0]);
    if (!isValidGeneratedPrayers(parsed)) {
      console.error('Invalid novena response structure:', JSON.stringify(parsed).slice(0, 200));
      return null;
    }

    return parsed;
  } catch (err) {
    console.error('Claude API call exception:', err);
    return null;
  }
}

// ── Helpers ──────────────────────────────────────────────────────────────

function jsonResponse(
  body: Record<string, unknown>,
  status = 200,
  headers: Record<string, string> = corsHeaders
) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...headers, 'Content-Type': 'application/json' },
  });
}

// ── Main handler ─────────────────────────────────────────────────────────

Deno.serve(async (req) => {
  const origin = req.headers.get('Origin');
  const headers = getCorsHeaders(origin);

  // CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers });
  }

  // Early exit if required env vars are missing
  if (MISSING_VARS.length > 0) {
    return jsonResponse(
      { error: `Server misconfigured: missing ${MISSING_VARS.join(', ')}`, code: 'SERVER_ERROR' },
      500,
      headers
    );
  }

  try {
    // 1. Auth
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return jsonResponse(
        { error: 'Unauthorized', code: 'UNAUTHORIZED' },
        401,
        headers
      );
    }

    const supabaseUser = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
      global: { headers: { Authorization: authHeader } },
    });

    const {
      data: { user },
      error: userError,
    } = await supabaseUser.auth.getUser();

    if (userError || !user) {
      return jsonResponse(
        { error: 'Unauthorized', code: 'UNAUTHORIZED' },
        401,
        headers
      );
    }

    // 2. Validate input
    let saintName: string;
    let saintBio: string;
    let personalIntention: string;
    try {
      const body = await req.json();
      saintName = body.saintName;
      saintBio = body.saintBio;
      personalIntention = body.personalIntention;
    } catch {
      return jsonResponse(
        { error: 'Invalid request body', code: 'BAD_REQUEST' },
        400,
        headers
      );
    }

    if (!saintName || typeof saintName !== 'string') {
      return jsonResponse(
        { error: 'saintName is required', code: 'BAD_REQUEST' },
        400,
        headers
      );
    }

    if (!personalIntention || typeof personalIntention !== 'string') {
      return jsonResponse(
        { error: 'personalIntention is required', code: 'BAD_REQUEST' },
        400,
        headers
      );
    }

    // Default bio if not provided
    if (!saintBio || typeof saintBio !== 'string') {
      saintBio = '';
    }

    // 3. Generate prayers via Claude
    const prayers = await generatePrayers(saintName, saintBio, personalIntention);

    if (!prayers) {
      return jsonResponse(
        { error: 'Failed to generate prayers', code: 'GENERATION_FAILED' },
        500,
        headers
      );
    }

    return jsonResponse({
      openingPrayer: prayers.openingPrayer,
      dailyPrayers: prayers.dailyPrayers,
      closingPrayer: prayers.closingPrayer,
    }, 200, headers);
  } catch (error) {
    console.error('novena-generate error:', error);
    return jsonResponse(
      { error: 'Internal error', code: 'INTERNAL_ERROR' },
      500,
      headers
    );
  }
});
