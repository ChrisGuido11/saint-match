import { NovenaEntry } from './novenaCatalog';
import { supabase, isSupabaseConfigured } from './supabase';

export const PRESET_INTENTIONS = [
  'Spiritual growth',
  'Peace and guidance',
  'Healing and strength',
  'For a loved one',
  "Mary's intercession",
  'Gratitude and praise',
] as const;

export type PresetIntention = (typeof PRESET_INTENTIONS)[number];

export interface NovenaMatchResult {
  entry: NovenaEntry;
  patronSaint: string;
  matchReason?: string;
}

// Maps thematic novena slugs to their actual patron saint
const NOVENA_SAINT_MAP: Record<string, string> = {
  'novena-for-the-impossible': 'St. Rita of Cascia',
  'novena-for-healing': 'Our Lady of Lourdes',
  'divine-mercy-novena': 'Divine Mercy (St. Faustina)',
  'holy-spirit-novena': 'The Holy Spirit',
  'sacred-heart-novena': 'The Sacred Heart of Jesus',
  'christmas-novena': 'The Christ Child',
  'immaculate-conception-novena': 'The Blessed Virgin Mary',
};

// Comprehensive saint reason lookup — covers every saint that can appear in the system
const SAINT_REASON_MAP: Record<string, string> = {
  // NOVENA_SAINT_MAP thematic saints
  'Our Lady of Lourdes': 'At Lourdes, Our Lady revealed a spring of healing waters, drawing millions who seek restoration of body and soul.',
  'St. Rita of Cascia': 'Patron of impossible causes, St. Rita received miraculous answers to prayers the world deemed hopeless.',
  'Divine Mercy (St. Faustina)': 'Through St. Faustina, Jesus revealed His infinite mercy, promising grace to all who trust in Him.',
  'The Holy Spirit': 'The Holy Spirit guides, strengthens, and illuminates — the original novena was prayed awaiting His descent at Pentecost.',
  'The Sacred Heart of Jesus': 'Devotion to the Sacred Heart honors Christ\'s boundless love and mercy for all humanity.',
  'The Christ Child': 'The Christ Child novena prepares hearts for the wonder of the Incarnation during the Advent season.',
  'The Blessed Virgin Mary': 'Conceived without sin, the Blessed Virgin Mary intercedes as the most powerful advocate before her Son.',

  // Common patron saints
  'St. Jude': 'Patron of desperate cases, St. Jude intercedes when all other hope seems lost.',
  'St. Therese': 'The Little Flower taught total surrender to God through small acts of trust and her "Little Way."',
  'St. Joseph': 'Guardian of the Holy Family, St. Joseph is patron of workers, fathers, and the universal Church.',
  'St. Anthony': 'Known worldwide as the patron of lost things, St. Anthony intercedes for all who seek what is missing.',
  'St. Francis of Assisi': 'St. Francis prayed "Lord, make me an instrument of your peace," becoming patron of peacemakers and nature.',
  'St. Michael': 'St. Michael the Archangel defends against evil and protects those who call on his powerful intercession.',
  'St. Benedict': 'Father of Western monasticism, St. Benedict guides those seeking spiritual discipline and growth.',
  'St. Rita': 'Patron of impossible causes, St. Rita received miraculous answers to prayers the world deemed hopeless.',
  'St. Padre Pio': 'St. Padre Pio bore the wounds of Christ and was gifted with healing, interceding for countless sick.',
  'St. Patrick': 'Apostle of Ireland, St. Patrick drove out spiritual darkness and brings the light of faith.',
  'Our Lady of Guadalupe': 'Patroness of the Americas, Our Lady of Guadalupe appeared to St. Juan Diego as a sign of God\'s love for all peoples.',
  'Our Lady of Fatima': 'At Fatima, Our Lady called the world to prayer, penance, and consecration to her Immaculate Heart.',
  'Our Lady of Sorrows': 'Our Lady stood at the foot of the Cross; she understands grief and holds the brokenhearted close.',
  'St. Raphael': 'Patron of happy meetings, St. Raphael guided Tobias to his future spouse in the Book of Tobit.',
  'St. Valentine': 'St. Valentine blessed marriages in secret and is invoked for faithful, loving relationships.',
  'St. Dymphna': 'Patron of those suffering from mental and emotional distress, St. Dymphna brings comfort to anxious hearts.',
  'St. Cajetan': 'Patron of the unemployed and job seekers, St. Cajetan trusted Divine Providence in times of need.',
  'St. Thomas Aquinas': 'The greatest theologian of the Church, St. Thomas Aquinas is patron of students and scholars.',
  'St. Christopher': 'Patron of travelers, St. Christopher carried the Christ Child across a river and protects all journeys.',
  'St. Maximilian Kolbe': 'St. Maximilian Kolbe chose sacrificial love over despair, offering hope to those struggling with addiction.',
  'St. Monica': 'St. Monica prayed for 17 years for her son Augustine\'s conversion, never losing faith in God\'s timing.',
  'St. Matthew': 'A former tax collector called by Christ, St. Matthew understands financial burdens and the freedom of grace.',
  'St. Raphael the Archangel': 'Patron of happy meetings, St. Raphael guided Tobias to his future spouse in the Book of Tobit.',
  'St. Anthony of Padua': 'Known worldwide as the patron of lost things, St. Anthony intercedes for all who seek what is missing.',
  'St. Thérèse of Lisieux': 'The Little Flower taught total surrender to God through small acts of trust and her "Little Way."',
  'Bl. Carlo Acutis': 'Blessed Carlo Acutis used technology to spread the faith, becoming patron of the internet and computer programmers.',
};

/**
 * Resolve the correct saint name for a novena entry.
 * 1. Check NOVENA_SAINT_MAP for explicit mapping (thematic novenas)
 * 2. For marian category, use title as-is (e.g. "Our Lady of Guadalupe")
 * 3. For saint novenas, strip " Novena" suffix
 */
export function resolveSaintName(entry: NovenaEntry): string {
  if (NOVENA_SAINT_MAP[entry.slug]) {
    return NOVENA_SAINT_MAP[entry.slug];
  }

  const stripped = entry.title.replace(/ Novena$/i, '');
  if (stripped !== entry.title) {
    return stripped;
  }

  return entry.title
    .replace(/^Novena\s+for\s+/i, '')
    .replace(/^Novena\s+/i, '');
}

/**
 * Find the best catalog entry from a list of preferred slugs.
 */
function findPreferredEntry(
  preferredSlugs: string[],
  catalog: NovenaEntry[]
): NovenaEntry | null {
  for (const slug of preferredSlugs) {
    const match = catalog.find((n) => n.slug === slug);
    if (match) return match;
  }
  return null;
}

/**
 * Look up a reason for a saint from the comprehensive map.
 */
function getReasonForSaint(saintName: string): string {
  if (SAINT_REASON_MAP[saintName]) {
    return SAINT_REASON_MAP[saintName];
  }
  return `${saintName} intercedes for those who seek their guidance through this novena.`;
}

/**
 * Call the novena-match edge function to get an AI-picked patron saint.
 * Retries once on transient failure.
 */
async function fetchAIMatch(intention: string): Promise<NovenaMatchResult | null> {
  if (!isSupabaseConfigured()) return null;

  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.access_token) return null;

  const url = `${process.env.EXPO_PUBLIC_SUPABASE_URL}/functions/v1/novena-match`;

  const doFetch = async (): Promise<NovenaMatchResult | null> => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
        apikey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '',
      },
      body: JSON.stringify({ intention }),
    });

    if (!response.ok) return null;

    const data = await response.json();
    if (!data.patronSaint || !data.novenaSlug || !data.novenaTitle) return null;

    // Enrich SAINT_REASON_MAP so getReasonForSaint works for this saint
    if (data.patronSaint && data.matchReason) {
      SAINT_REASON_MAP[data.patronSaint] = data.matchReason;
    }

    const entry: NovenaEntry = {
      slug: data.novenaSlug,
      title: data.novenaTitle,
      category: 'saints',
    };

    return {
      entry,
      patronSaint: data.patronSaint,
      matchReason: data.matchReason || undefined,
    };
  };

  try {
    const result = await doFetch();
    if (result) return result;

    // Retry once after 2s
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return await doFetch();
  } catch {
    // Retry once on network error
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return await doFetch();
    } catch {
      return null;
    }
  }
}

/**
 * Match a novena from the catalog based on the user's intention.
 * Always tries AI first, falls back to general novenas only if AI is unavailable.
 */
export async function matchNovenaToIntention(
  intention: string,
  catalog: NovenaEntry[]
): Promise<NovenaMatchResult> {
  if (catalog.length === 0) {
    const fallback: NovenaEntry = { slug: 'st-jude-novena', title: 'St. Jude Novena', category: 'saints' };
    return { entry: fallback, patronSaint: 'St. Jude', matchReason: 'Patron of desperate cases, St. Jude intercedes when all other hope is lost.' };
  }

  // Always try AI first — for both presets and custom text
  const aiMatch = await fetchAIMatch(intention);
  if (aiMatch) {
    return aiMatch;
  }

  // AI unavailable — fall back to general guidance novenas
  const generalFallback = findPreferredEntry(['holy-spirit-novena', 'sacred-heart-novena', 'st-jude-novena'], catalog);
  if (generalFallback) {
    const saint = resolveSaintName(generalFallback);
    return { entry: generalFallback, patronSaint: saint, matchReason: getReasonForSaint(saint) };
  }
  const fallback = catalog[0];
  const fallbackSaint = resolveSaintName(fallback);
  return { entry: fallback, patronSaint: fallbackSaint, matchReason: getReasonForSaint(fallbackSaint) };
}
