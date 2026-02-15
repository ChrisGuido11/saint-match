import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders, getCorsHeaders } from '../_shared/cors.ts';

// ── Env var validation ──────────────────────────────────────────────────

const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

const MISSING_VARS = ['SUPABASE_URL', 'SUPABASE_ANON_KEY', 'SUPABASE_SERVICE_ROLE_KEY']
  .filter((v) => !Deno.env.get(v));

if (MISSING_VARS.length > 0) {
  console.error(`Missing required env vars: ${MISSING_VARS.join(', ')}`);
}

const VALID_EMOTIONS = [
  'anxious',
  'overwhelmed',
  'scattered',
  'impatient',
  'frustrated',
  'peaceful',
  'grateful',
  'joyful',
] as const;

// ── Helpers ──────────────────────────────────────────────────────────────

async function sha256(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

function normalizeInput(text: string): string {
  return text.trim().toLowerCase().replace(/\s+/g, ' ');
}

interface ClaudeResponse {
  saintName: string;
  feastDay: string;
  bio: string;
  virtues?: string[];
  microAction: string;
  estimatedMinutes: number;
  matchReason?: string;
  keywords?: string[];
}

function isValidClaudeResponse(obj: unknown): obj is ClaudeResponse {
  if (!obj || typeof obj !== 'object') return false;
  const r = obj as Record<string, unknown>;
  return (
    typeof r.saintName === 'string' && r.saintName.length > 0 &&
    typeof r.feastDay === 'string' &&
    typeof r.bio === 'string' &&
    typeof r.microAction === 'string' && r.microAction.length > 0 &&
    typeof r.estimatedMinutes === 'number' && r.estimatedMinutes > 0
  );
}

function buildPrompt(
  input: { emotion?: string; customMood?: string; excludeSaints?: string[] },
  keywordHints?: string[]
): string {
  const excludeClause = input.excludeSaints && input.excludeSaints.length > 0
    ? `\n\nIMPORTANT: Do NOT recommend any of these saints (the user has seen them recently): ${input.excludeSaints.join(', ')}. Choose someone completely different.`
    : '';

  const keywordClause = keywordHints && keywordHints.length > 0
    ? `\n\nContext from similar past requests (use these as hints for relevance, not as constraints): ${keywordHints.join(', ')}`
    : '';

  if (input.customMood) {
    return `You are a Catholic spiritual director. The user describes what's on their heart:

"${input.customMood}"

Your job: recommend ONE saint whose life DIRECTLY relates to this specific concern. The connection must be obvious and immediate — not a loose thematic link.

Examples of GOOD matching:
- "worried about money" → St. Homobonus (patron of business/finances) or St. Joseph (provider for his family in poverty)
- "struggling with anger" → St. Francis de Sales (conquered violent temper)
- "grieving a loss" → St. Elizabeth Ann Seton (lost husband and children)

Examples of BAD matching:
- "worried about money" → a saint known only for humility or prayer (too generic)
- "lonely" → a saint known only for courage (wrong theme)

Pick a saint whose life story, patronage, or personal struggles speak DIRECTLY to the user's words. Then suggest ONE concrete 5-15 minute micro-action inspired by how that saint handled a similar situation.

Draw from the full calendar of Catholic saints across all centuries and cultures.${excludeClause}${keywordClause}
Respond ONLY in JSON: {"saintName": "", "feastDay": "", "bio": "50 words max connecting the saint to the user's concern", "virtues": ["keyword1", "keyword2", "keyword3"], "microAction": "a concrete action referencing both the saint and the user's concern", "estimatedMinutes": 10, "matchReason": "1 sentence: why this saint fits their specific situation", "keywords": ["3-8 semantic keywords describing the user's core concern"]}`;
  }

  return `You are a Catholic spiritual director. The user is feeling ${input.emotion}. Recommend ONE saint who overcame this struggle and ONE specific 5-15 minute micro-action they can do today inspired by this saint's virtue. The action should be concrete and modern (actual behavioral action, not just prayer). Draw from the FULL calendar of Catholic saints — canonized saints, blesseds, venerables, and servants of God across all centuries and cultures. Surprise the user with lesser-known holy men and women from any era or region, not just the famous ones.${excludeClause}${keywordClause}
Respond ONLY in JSON: {"saintName": "", "feastDay": "", "bio": "50 words max", "virtues": ["keyword1", "keyword2", "keyword3"], "microAction": "", "estimatedMinutes": 10, "matchReason": "1 sentence: why this saint fits their emotion", "keywords": ["3-8 semantic keywords describing the user's emotional state and needs"]}`;
}

async function callClaude(
  input: { emotion?: string; customMood?: string; excludeSaints?: string[] },
  keywordHints?: string[]
): Promise<ClaudeResponse | null> {
  if (!ANTHROPIC_API_KEY) {
    console.error('ANTHROPIC_API_KEY is not set');
    return null;
  }

  try {
    console.log('Calling Claude API with model claude-haiku-4-5-20251001...');
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 500,
        temperature: 0.7,
        messages: [
          {
            role: 'user',
            content: buildPrompt(input, keywordHints),
          },
        ],
      }),
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.error(`Claude API ${response.status}: ${errBody.slice(0, 200)}`);
      return null;
    }

    const data = await response.json();
    let text = data.content?.[0]?.text;
    if (!text) {
      console.error('Empty response text from Claude');
      return null;
    }

    // Strip markdown code fences and extra whitespace that Haiku may add
    text = text.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
    // Extract JSON object if there's surrounding text
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error(`No JSON in response: ${text.slice(0, 200)}`);
      return null;
    }

    const parsed = JSON.parse(jsonMatch[0]);
    if (!isValidClaudeResponse(parsed)) {
      console.error(`Invalid structure: ${JSON.stringify(parsed).slice(0, 200)}`);
      return null;
    }

    return parsed;
  } catch (err) {
    console.error('Claude API call exception:', err);
    return null;
  }
}

// ── Keyword cache helpers ────────────────────────────────────────────────

interface KeywordCacheRow {
  input_hash: string;
  keywords: string[];
  hit_count: number;
}

async function lookupKeywordCache(
  supabase: ReturnType<typeof createClient>,
  inputHash: string,
  inputKeywords?: string[]
): Promise<{ exactHit: KeywordCacheRow | null; similarKeywords: string[] }> {
  // 1. Exact hash match
  const { data: exact } = await supabase
    .from('keyword_cache')
    .select('input_hash, keywords, hit_count')
    .eq('input_hash', inputHash)
    .single();

  if (exact) {
    // Bump hit count and last_hit_at (fire-and-forget)
    supabase
      .from('keyword_cache')
      .update({ hit_count: exact.hit_count + 1, last_hit_at: new Date().toISOString() })
      .eq('input_hash', inputHash)
      .then(() => {});

    return { exactHit: exact as KeywordCacheRow, similarKeywords: exact.keywords };
  }

  // 2. If no exact match, try keyword overlap (GIN array overlap)
  if (inputKeywords && inputKeywords.length > 0) {
    const { data: similar } = await supabase
      .from('keyword_cache')
      .select('keywords')
      .filter('keywords', 'ov', `{${inputKeywords.join(',')}}`)
      .eq('source', 'saint-match')
      .order('hit_count', { ascending: false })
      .limit(3);

    if (similar && similar.length > 0) {
      // Collect unique keywords from similar entries
      const allKeywords = new Set<string>();
      for (const row of similar) {
        for (const kw of row.keywords) {
          allKeywords.add(kw);
        }
      }
      return { exactHit: null, similarKeywords: Array.from(allKeywords).slice(0, 10) };
    }
  }

  return { exactHit: null, similarKeywords: [] };
}

async function cacheKeywords(
  supabase: ReturnType<typeof createClient>,
  inputHash: string,
  inputText: string,
  keywords: string[],
  source: string = 'saint-match'
): Promise<void> {
  if (!keywords || keywords.length === 0) return;

  try {
    await supabase
      .from('keyword_cache')
      .upsert({
        input_hash: inputHash,
        input_text: inputText,
        keywords,
        source,
        hit_count: 1,
        last_hit_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
      }, { onConflict: 'input_hash' });
  } catch (err) {
    console.error('Failed to cache keywords:', err);
  }
}

// ── Usage limits ─────────────────────────────────────────────────────────

function getWeekStart(): { weekStartStr: string; nextMonday: Date } {
  const now = new Date();
  const dayOfWeek = now.getUTCDay(); // 0=Sun, 1=Mon
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const weekStart = new Date(now);
  weekStart.setUTCDate(now.getUTCDate() + mondayOffset);
  weekStart.setUTCHours(0, 0, 0, 0);

  const nextMonday = new Date(weekStart);
  nextMonday.setUTCDate(nextMonday.getUTCDate() + 7);

  return { weekStartStr: weekStart.toISOString().slice(0, 10), nextMonday };
}

async function checkAndIncrementUsage(
  supabase: ReturnType<typeof createClient>,
  userId: string
): Promise<boolean> {
  const { weekStartStr, nextMonday } = getWeekStart();

  const { data, error } = await supabase.rpc('increment_usage', {
    p_user_id: userId,
    p_week_start: weekStartStr,
    p_reset_at: nextMonday.toISOString(),
    p_weekly_limit: 3,
  });

  if (error) {
    console.error('increment_usage RPC error:', error);
    return true;
  }

  return data === true;
}

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

// ── Main handler ───────────────────────────────────────────────────────

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

    const supabaseAdmin = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);
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
    let emotion: string | undefined;
    let customMood: string | undefined;
    let excludeSaints: string[] = [];
    try {
      const body = await req.json();
      emotion = body.emotion;
      customMood = body.customMood;
      if (Array.isArray(body.excludeSaints)) {
        excludeSaints = body.excludeSaints
          .filter((s: unknown) => typeof s === 'string')
          .slice(0, 30);
      }
    } catch {
      return jsonResponse(
        { error: 'Invalid request body', code: 'BAD_REQUEST' },
        400,
        headers
      );
    }

    const hasValidEmotion = emotion && VALID_EMOTIONS.includes(emotion as typeof VALID_EMOTIONS[number]);
    const hasValidCustomMood = typeof customMood === 'string' && customMood.trim().length > 0 && customMood.trim().length <= 120;

    if (!hasValidEmotion && !hasValidCustomMood) {
      return jsonResponse(
        { error: 'Invalid emotion or customMood', code: 'BAD_REQUEST' },
        400,
        headers
      );
    }

    if (hasValidCustomMood) {
      customMood = customMood!.trim();
    }

    // 3. Usage limits disabled for free beta
    // const { data: profile } = await supabaseAdmin
    //   .from('profiles')
    //   .select('is_pro')
    //   .eq('id', user.id)
    //   .single();
    //
    // if (!profile?.is_pro) {
    //   const canUse = await checkAndIncrementUsage(supabaseAdmin, user.id);
    //   if (!canUse) {
    //     return jsonResponse(
    //       { error: 'Weekly limit reached', code: 'USAGE_LIMIT_REACHED' },
    //       429,
    //       headers
    //     );
    //   }
    // }

    // 4. Normalize input and check keyword cache
    const rawInput = hasValidCustomMood ? customMood! : emotion!;
    const normalized = normalizeInput(rawInput);
    const inputHash = await sha256(normalized);

    // Extract simple words from input for keyword overlap search
    const inputWords = normalized.split(/\s+/).filter((w: string) => w.length > 3);

    const { similarKeywords } = await lookupKeywordCache(
      supabaseAdmin,
      inputHash,
      inputWords
    );

    // 5. Always call Claude API (with keyword hints if available)
    const claudeInput = hasValidCustomMood
      ? { customMood: customMood!, excludeSaints }
      : { emotion: emotion!, excludeSaints };

    const claudeResult = await callClaude(
      claudeInput,
      similarKeywords.length > 0 ? similarKeywords : undefined
    );

    if (claudeResult) {
      // Cache keywords from Claude's response (fire-and-forget)
      const keywords = claudeResult.keywords ?? claudeResult.virtues ?? [];
      if (keywords.length > 0) {
        cacheKeywords(supabaseAdmin, inputHash, normalized, keywords, 'saint-match')
          .catch((err: unknown) => console.error('Keyword cache write failed:', err));
      }

      return jsonResponse({
        saint_name: claudeResult.saintName,
        feast_day: claudeResult.feastDay,
        bio: claudeResult.bio,
        virtues: claudeResult.virtues ?? [],
        micro_action: claudeResult.microAction,
        estimated_minutes: claudeResult.estimatedMinutes,
        match_reason: claudeResult.matchReason ?? '',
        source: 'claude',
      }, 200, headers);
    }

    // 6. Claude failed — return 503 (no local fallback)
    return jsonResponse(
      { error: 'Saint matching service temporarily unavailable', code: 'MATCH_UNAVAILABLE' },
      503,
      headers
    );
  } catch (error) {
    console.error('saint-match error:', error);
    return jsonResponse(
      { error: 'Internal error', code: 'INTERNAL_ERROR' },
      500,
      headers
    );
  }
});
