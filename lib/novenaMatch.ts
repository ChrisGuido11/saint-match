import { NovenaEntry } from './novenaCatalog';

export const PRESET_INTENTIONS = [
  'Spiritual growth',
  'Peace and guidance',
  'Healing and strength',
  'For a loved one',
  "Mary's intercession",
  'Gratitude and praise',
] as const;

export type PresetIntention = (typeof PRESET_INTENTIONS)[number];

// Preferred slugs and category filters for each preset intention
const INTENTION_CONFIG: Record<
  PresetIntention,
  { preferredSlugs: string[]; categories: NovenaEntry['category'][] }
> = {
  'Spiritual growth': {
    preferredSlugs: ['st-therese-novena', 'st-benedict-novena'],
    categories: ['saints'],
  },
  'Peace and guidance': {
    preferredSlugs: ['holy-spirit-novena', 'sacred-heart-novena'],
    categories: ['holy-days'],
  },
  'Healing and strength': {
    preferredSlugs: ['novena-for-healing', 'novena-for-the-impossible'],
    categories: ['intentions'],
  },
  'For a loved one': {
    preferredSlugs: ['st-jude-novena', 'st-monica-novena'],
    categories: ['saints', 'intentions'],
  },
  "Mary's intercession": {
    preferredSlugs: ['our-lady-of-guadalupe-novena', 'our-lady-of-fatima-novena'],
    categories: ['marian'],
  },
  'Gratitude and praise': {
    preferredSlugs: ['divine-mercy-novena', 'christmas-novena'],
    categories: ['holy-days'],
  },
};

/**
 * Match a novena from the catalog based on the user's intention.
 * For presets: tries preferred slugs first, then filters by category.
 * For custom text: tokenizes into keywords and scores against titles + categories.
 * Falls back to a random popular novena.
 */
export function matchNovenaToIntention(
  intention: string,
  catalog: NovenaEntry[]
): NovenaEntry {
  if (catalog.length === 0) {
    // Shouldn't happen — getCachedCatalog returns fallback — but handle it
    return { slug: 'st-jude-novena', title: 'St. Jude Novena', category: 'saints' };
  }

  // Check if it's a preset intention
  const config = INTENTION_CONFIG[intention as PresetIntention];

  if (config) {
    // Try preferred slugs first
    for (const slug of config.preferredSlugs) {
      const match = catalog.find((n) => n.slug === slug);
      if (match) return match;
    }

    // Fall back to category filter
    const categoryMatches = catalog.filter((n) => config.categories.includes(n.category));
    if (categoryMatches.length > 0) {
      return categoryMatches[Math.floor(Math.random() * categoryMatches.length)];
    }
  } else {
    // Custom text — keyword scoring
    const keywords = intention
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => w.length > 2);

    if (keywords.length > 0) {
      let bestMatch: NovenaEntry | null = null;
      let bestScore = 0;

      for (const entry of catalog) {
        const haystack = `${entry.title} ${entry.category}`.toLowerCase();
        let score = 0;
        for (const kw of keywords) {
          if (haystack.includes(kw)) score++;
        }
        if (score > bestScore) {
          bestScore = score;
          bestMatch = entry;
        }
      }

      if (bestMatch) return bestMatch;
    }
  }

  // Fallback: random from catalog
  return catalog[Math.floor(Math.random() * catalog.length)];
}
