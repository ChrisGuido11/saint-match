import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders, getCorsHeaders } from '../_shared/cors.ts';

// ── Env vars ──────────────────────────────────────────────────────────

const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

const MISSING_VARS = ['SUPABASE_URL', 'SUPABASE_ANON_KEY', 'SUPABASE_SERVICE_ROLE_KEY']
  .filter((v) => !Deno.env.get(v));

if (MISSING_VARS.length > 0) {
  console.error(`Missing required env vars: ${MISSING_VARS.join(', ')}`);
}

const CATALOG_MAX_AGE_DAYS = 7;

// ── Categorization ───────────────────────────────────────────────────

function categorize(title: string): string {
  const lower = title.toLowerCase();

  // Marian
  if (
    lower.includes('our lady') ||
    lower.includes('mary') ||
    lower.includes('immaculate') ||
    lower.includes('marian') ||
    lower.includes('blessed mother') ||
    lower.includes('blessed virgin') ||
    lower.includes('rosary') ||
    lower.includes('magnificat') ||
    lower.includes('assumption') ||
    lower.includes('annunciation')
  ) {
    return 'marian';
  }

  // Holy days / liturgical
  if (
    lower.includes('christmas') ||
    lower.includes('easter') ||
    lower.includes('lent') ||
    lower.includes('advent') ||
    lower.includes('corpus christi') ||
    lower.includes('pentecost') ||
    lower.includes('holy spirit') ||
    lower.includes('divine mercy') ||
    lower.includes('sacred heart') ||
    lower.includes('holy week') ||
    lower.includes('ascension')
  ) {
    return 'holy-days';
  }

  // Intentions — "Novena for ..." patterns
  if (
    lower.includes('novena for ') ||
    lower.includes('healing') ||
    lower.includes('impossible') ||
    lower.includes('marriage') ||
    lower.includes('employment') ||
    lower.includes('financial') ||
    lower.includes('anxiety') ||
    lower.includes('depression') ||
    lower.includes('peace')
  ) {
    return 'intentions';
  }

  // Saints
  if (lower.includes('st.') || lower.includes('saint') || lower.includes('bl.') || lower.includes('blessed')) {
    return 'saints';
  }

  return 'other';
}

// ── HTML parsing ─────────────────────────────────────────────────────

interface ParsedNovena {
  slug: string;
  title: string;
  category: string;
  source_url: string;
}

function parseNovenasFromHtml(html: string): ParsedNovena[] {
  const novenas: ParsedNovena[] = [];
  const seen = new Set<string>();

  // Match links that look like novena pages
  // Pattern: <a href="/some-novena-slug">Title Text</a>
  // Also handles: <a href="https://www.praymorenovenas.com/some-slug">
  const linkRegex = /<a[^>]*href=["'](?:https?:\/\/(?:www\.)?praymorenovenas\.com)?\/([a-z0-9-]+(?:-novena[a-z0-9-]*|novena-[a-z0-9-]*))["'][^>]*>([\s\S]*?)<\/a>/gi;

  let match;
  while ((match = linkRegex.exec(html)) !== null) {
    const slug = match[1].replace(/^\/+/, '');
    // Strip HTML tags from title
    const title = match[2].replace(/<[^>]+>/g, '').trim();

    if (!title || seen.has(slug)) continue;
    // Skip non-novena pages
    if (slug === 'novenas' || slug === 'novena-prayers') continue;

    seen.add(slug);
    novenas.push({
      slug,
      title,
      category: categorize(title),
      source_url: `https://www.praymorenovenas.com/${slug}`,
    });
  }

  // Also try a broader pattern for links within novena listing pages
  // These often have simpler paths like /st-jude-novena
  const broadRegex = /<a[^>]*href=["'](?:https?:\/\/(?:www\.)?praymorenovenas\.com)?\/([a-z0-9][a-z0-9-]*novena[a-z0-9-]*)["'][^>]*>([\s\S]*?)<\/a>/gi;

  while ((match = broadRegex.exec(html)) !== null) {
    const slug = match[1].replace(/^\/+/, '');
    const title = match[2].replace(/<[^>]+>/g, '').trim();

    if (!title || seen.has(slug)) continue;
    if (slug === 'novenas' || slug === 'novena-prayers') continue;

    seen.add(slug);
    novenas.push({
      slug,
      title,
      category: categorize(title),
      source_url: `https://www.praymorenovenas.com/${slug}`,
    });
  }

  return novenas;
}

// ── Helpers ──────────────────────────────────────────────────────────

function jsonResponse(data: unknown, status: number, headers: Record<string, string>) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...headers, 'Content-Type': 'application/json' },
  });
}

// ── Main handler ────────────────────────────────────────────────────

Deno.serve(async (req) => {
  const origin = req.headers.get('Origin');
  const headers = getCorsHeaders(origin);

  // CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers });
  }

  // Only accept GET
  if (req.method !== 'GET') {
    return jsonResponse({ error: 'Method not allowed' }, 405, headers);
  }

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
      return jsonResponse({ error: 'Unauthorized', code: 'UNAUTHORIZED' }, 401, headers);
    }

    const supabaseUser = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user }, error: userError } = await supabaseUser.auth.getUser();
    if (userError || !user) {
      return jsonResponse({ error: 'Unauthorized', code: 'UNAUTHORIZED' }, 401, headers);
    }

    const supabaseAdmin = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    // 2. Check if catalog is fresh (updated within CATALOG_MAX_AGE_DAYS)
    const { data: existing, error: fetchError } = await supabaseAdmin
      .from('novena_catalog')
      .select('slug, title, category, updated_at')
      .order('title', { ascending: true });

    if (!fetchError && existing && existing.length > 0) {
      const mostRecent = existing.reduce((latest, row) =>
        new Date(row.updated_at) > new Date(latest.updated_at) ? row : latest
      );
      const ageMs = Date.now() - new Date(mostRecent.updated_at).getTime();
      const ageDays = ageMs / (1000 * 60 * 60 * 24);

      if (ageDays < CATALOG_MAX_AGE_DAYS) {
        // Cache is fresh — return it
        const catalog = existing.map(({ slug, title, category }) => ({ slug, title, category }));
        return jsonResponse(catalog, 200, headers);
      }
    }

    // 3. Fetch from praymorenovenas.com
    let parsed: ParsedNovena[] = [];
    try {
      const response = await fetch('https://www.praymorenovenas.com/novenas', {
        headers: { 'User-Agent': 'SaintMatch/1.0 (Catholic prayer app)' },
      });
      if (response.ok) {
        const html = await response.text();
        parsed = parseNovenasFromHtml(html);
      }
    } catch (fetchErr) {
      console.error('Failed to fetch praymorenovenas.com:', fetchErr);
    }

    // 4. If we got new data, upsert it
    if (parsed.length > 0) {
      const rows = parsed.map((n) => ({
        slug: n.slug,
        title: n.title,
        category: n.category,
        source_url: n.source_url,
        updated_at: new Date().toISOString(),
      }));

      const { error: upsertError } = await supabaseAdmin
        .from('novena_catalog')
        .upsert(rows, { onConflict: 'slug' });

      if (upsertError) {
        console.error('Upsert error:', upsertError);
      }

      return jsonResponse(
        parsed.map(({ slug, title, category }) => ({ slug, title, category })),
        200,
        headers
      );
    }

    // 5. Fallback: return whatever is in DB (stale data better than no data)
    if (existing && existing.length > 0) {
      const catalog = existing.map(({ slug, title, category }) => ({ slug, title, category }));
      return jsonResponse(catalog, 200, headers);
    }

    // 6. Nothing in DB and fetch failed — return empty
    return jsonResponse([], 200, headers);
  } catch (error) {
    console.error('novena-catalog error:', error);
    return jsonResponse({ error: 'Internal error', code: 'INTERNAL_ERROR' }, 500, headers);
  }
});
