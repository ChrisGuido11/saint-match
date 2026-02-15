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

// ── Types ────────────────────────────────────────────────────────────────

interface AIMatchResult {
  patronSaint: string;
  saintBio: string;
  matchReason: string;
  novenaSlug: string;
  novenaTitle: string;
}

function isValidAIMatch(obj: unknown): obj is AIMatchResult {
  if (!obj || typeof obj !== 'object') return false;
  const r = obj as Record<string, unknown>;
  return (
    typeof r.patronSaint === 'string' && r.patronSaint.length > 0 &&
    typeof r.saintBio === 'string' &&
    typeof r.matchReason === 'string' &&
    typeof r.novenaSlug === 'string' && r.novenaSlug.length > 0 &&
    typeof r.novenaTitle === 'string' && r.novenaTitle.length > 0
  );
}

// ── Keyword cache helpers ─────────────────────────────────────────────────

async function sha256(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function cacheKeywords(
  supabase: ReturnType<typeof createClient>,
  inputText: string,
  keywords: string[]
): Promise<void> {
  if (!keywords || keywords.length === 0) return;

  try {
    const inputHash = await sha256(inputText.trim().toLowerCase());
    await supabase
      .from('keyword_cache')
      .upsert({
        input_hash: inputHash,
        input_text: inputText.trim().toLowerCase(),
        keywords,
        source: 'novena',
        hit_count: 1,
        last_hit_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
      }, { onConflict: 'input_hash' });
  } catch (err) {
    console.error('Failed to cache novena keywords:', err);
  }
}

// ── Claude API call ──────────────────────────────────────────────────────

async function pickPatronSaint(intention: string): Promise<AIMatchResult | null> {
  if (!ANTHROPIC_API_KEY) {
    console.error('ANTHROPIC_API_KEY is not set');
    return null;
  }

  try {
    console.log(`Picking patron saint for intention: "${intention}"`);
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
        temperature: 0.3,
        messages: [
          {
            role: 'user',
            content: `Given this prayer intention: "${intention}"

Pick the single most appropriate Catholic patron saint (or Blessed/Venerable).
Consider traditional patronages, the saint's life story, and relevance to this specific need.

Respond ONLY in JSON:
{
  "patronSaint": "Full name (e.g. Bl. Carlo Acutis)",
  "saintBio": "2-3 sentences about this saint, focused on why they relate to this intention",
  "matchReason": "1-2 sentences explaining why this saint is the perfect intercessor for this intention",
  "novenaSlug": "kebab-case-novena-slug (e.g. bl-carlo-acutis-novena)",
  "novenaTitle": "Display title (e.g. Bl. Carlo Acutis Novena)"
}`,
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
    if (!isValidAIMatch(parsed)) {
      console.error('Invalid match response structure:', JSON.stringify(parsed).slice(0, 200));
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
    let intention: string;
    try {
      const body = await req.json();
      intention = body.intention;
    } catch {
      return jsonResponse(
        { error: 'Invalid request body', code: 'BAD_REQUEST' },
        400,
        headers
      );
    }

    if (!intention || typeof intention !== 'string' || intention.trim().length === 0) {
      return jsonResponse(
        { error: 'intention is required', code: 'BAD_REQUEST' },
        400,
        headers
      );
    }

    const normalized = intention.trim().toLowerCase();

    // 3. Check cache first
    const serviceClient = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    const { data: cached } = await serviceClient
      .from('novena_intent_matches')
      .select('patron_saint, saint_bio, match_reason, novena_slug, novena_title')
      .eq('intention_normalized', normalized)
      .single();

    if (cached) {
      console.log(`Cache hit for intention: "${normalized}"`);
      return jsonResponse({
        patronSaint: cached.patron_saint,
        saintBio: cached.saint_bio,
        matchReason: cached.match_reason,
        novenaSlug: cached.novena_slug,
        novenaTitle: cached.novena_title,
      }, 200, headers);
    }

    // 4. AI pick
    const aiResult = await pickPatronSaint(intention);
    if (!aiResult) {
      return jsonResponse(
        { error: 'Failed to match patron saint', code: 'AI_MATCH_FAILED' },
        500,
        headers
      );
    }

    // 5. Cache the result
    const { error: cacheError } = await serviceClient
      .from('novena_intent_matches')
      .upsert({
        intention_normalized: normalized,
        patron_saint: aiResult.patronSaint,
        saint_bio: aiResult.saintBio,
        match_reason: aiResult.matchReason,
        novena_slug: aiResult.novenaSlug,
        novena_title: aiResult.novenaTitle,
      }, { onConflict: 'intention_normalized' });

    if (cacheError) {
      console.error('Failed to cache intent match:', cacheError);
      // Non-fatal — still return the result
    }

    // 5b. Cache keywords for cross-system intelligence (fire-and-forget)
    const keywords = normalized.split(/\s+/).filter((w: string) => w.length > 3);
    // Add saint name and key terms from match reason as keywords
    const enrichedKeywords = [
      ...keywords,
      ...aiResult.patronSaint.toLowerCase().split(/\s+/).filter((w: string) => w.length > 2),
    ].slice(0, 8);
    cacheKeywords(serviceClient, normalized, enrichedKeywords)
      .catch((err: unknown) => console.error('Keyword cache write failed:', err));

    // 6. Enrich novena_catalog with this saint (if new)
    const { error: catalogError } = await serviceClient
      .from('novena_catalog')
      .upsert({
        slug: aiResult.novenaSlug,
        title: aiResult.novenaTitle,
        category: 'saints',
      }, { onConflict: 'slug' });

    if (catalogError) {
      console.error('Failed to upsert novena_catalog:', catalogError);
      // Non-fatal
    }

    return jsonResponse({
      patronSaint: aiResult.patronSaint,
      saintBio: aiResult.saintBio,
      matchReason: aiResult.matchReason,
      novenaSlug: aiResult.novenaSlug,
      novenaTitle: aiResult.novenaTitle,
    }, 200, headers);
  } catch (error) {
    console.error('novena-match error:', error);
    return jsonResponse(
      { error: 'Internal error', code: 'INTERNAL_ERROR' },
      500,
      headers
    );
  }
});
