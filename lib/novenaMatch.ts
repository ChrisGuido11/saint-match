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

export interface NovenaMatchResult {
  entry: NovenaEntry;
  patronSaint: string;
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

// Patron saint keyword map for custom intention matching
const PATRON_SAINT_MAP: Array<{
  keywords: string[];
  patronSaint: string;
  preferredSlugs: string[];
}> = [
  {
    keywords: ['boyfriend', 'girlfriend', 'relationship', 'dating', 'romance', 'romantic', 'partner', 'love life', 'crush', 'courtship'],
    patronSaint: 'St. Raphael the Archangel',
    preferredSlugs: ['st-raphael-novena', 'st-valentine-novena', 'st-anthony-novena'],
  },
  {
    keywords: ['husband', 'wife', 'marriage', 'married', 'spouse', 'wedding', 'fiancé', 'fiancée', 'fiance', 'engagement', 'family', 'children', 'fertility', 'pregnant', 'pregnancy', 'baby', 'conceive', 'infertility'],
    patronSaint: 'St. Joseph',
    preferredSlugs: ['st-joseph-novena', 'st-rita-novena', 'st-monica-novena'],
  },
  {
    keywords: ['impossible', 'hopeless', 'desperate', 'no hope', 'miracle', 'lost cause'],
    patronSaint: 'St. Rita of Cascia',
    preferredSlugs: ['st-rita-novena', 'st-jude-novena'],
  },
  {
    keywords: ['lost', 'find', 'finding', 'missing', 'search', 'searching'],
    patronSaint: 'St. Anthony of Padua',
    preferredSlugs: ['st-anthony-novena'],
  },
  {
    keywords: ['healing', 'sick', 'illness', 'disease', 'cancer', 'surgery', 'hospital', 'health', 'recovery', 'pain', 'suffering', 'diagnosis'],
    patronSaint: 'St. Padre Pio',
    preferredSlugs: ['st-padre-pio-novena', 'novena-for-healing', 'our-lady-of-lourdes-novena'],
  },
  {
    keywords: ['anxiety', 'anxious', 'worry', 'worried', 'fear', 'afraid', 'stress', 'stressed', 'depression', 'depressed', 'mental health', 'panic', 'overwhelmed'],
    patronSaint: 'St. Dymphna',
    preferredSlugs: ['st-dymphna-novena', 'sacred-heart-novena'],
  },
  {
    keywords: ['job', 'work', 'employment', 'career', 'unemployed', 'interview', 'promotion', 'fired', 'laid off', 'coworker', 'boss', 'workplace'],
    patronSaint: 'St. Joseph',
    preferredSlugs: ['st-joseph-novena', 'st-cajetan-novena'],
  },
  {
    keywords: ['money', 'financial', 'finances', 'debt', 'bills', 'poverty', 'income', 'rent', 'mortgage'],
    patronSaint: 'St. Matthew',
    preferredSlugs: ['st-jude-novena', 'st-joseph-novena'],
  },
  {
    keywords: ['exam', 'exams', 'school', 'college', 'university', 'studying', 'student', 'test', 'grades', 'graduation'],
    patronSaint: 'St. Thomas Aquinas',
    preferredSlugs: ['st-thomas-aquinas-novena', 'holy-spirit-novena'],
  },
  {
    keywords: ['grief', 'death', 'died', 'passed away', 'mourning', 'loss', 'funeral', 'bereaved', 'widow', 'widower'],
    patronSaint: 'Our Lady of Sorrows',
    preferredSlugs: ['our-lady-of-sorrows-novena', 'st-monica-novena'],
  },
  {
    keywords: ['conversion', 'convert', 'faith', 'unbelief', 'atheist', 'fallen away', 'prodigal', 'return to church', 'praying for son', 'praying for daughter'],
    patronSaint: 'St. Monica',
    preferredSlugs: ['st-monica-novena'],
  },
  {
    keywords: ['trust', 'surrender', 'let go', 'control', 'patience', 'waiting', 'uncertainty', "god's will", "god's plan"],
    patronSaint: 'St. Thérèse of Lisieux',
    preferredSlugs: ['st-therese-novena', 'sacred-heart-novena', 'divine-mercy-novena'],
  },
  {
    keywords: ['travel', 'traveling', 'journey', 'trip', 'safe travel', 'protection', 'safety', 'moving', 'relocation'],
    patronSaint: 'St. Christopher',
    preferredSlugs: ['st-christopher-novena', 'st-michael-novena'],
  },
  {
    keywords: ['addiction', 'addicted', 'alcohol', 'alcoholism', 'drugs', 'sobriety', 'sober', 'substance'],
    patronSaint: 'St. Maximilian Kolbe',
    preferredSlugs: ['st-maximilian-kolbe-novena', 'st-jude-novena'],
  },
  {
    keywords: ['peace', 'conflict', 'argument', 'fighting', 'reconciliation', 'forgiveness', 'forgive', 'grudge', 'resentment', 'anger'],
    patronSaint: 'St. Francis of Assisi',
    preferredSlugs: ['st-francis-novena', 'sacred-heart-novena'],
  },
];

// Preferred slugs and category filters for each preset intention
const INTENTION_CONFIG: Record<
  PresetIntention,
  { preferredSlugs: string[]; categories: NovenaEntry['category'][]; patronSaint?: string }
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
 * Resolve the correct saint name for a novena entry.
 * 1. Check NOVENA_SAINT_MAP for explicit mapping (thematic novenas)
 * 2. For marian category, use title as-is (e.g. "Our Lady of Guadalupe")
 * 3. For saint novenas, strip " Novena" suffix
 */
export function resolveSaintName(entry: NovenaEntry): string {
  // Explicit mapping takes priority
  if (NOVENA_SAINT_MAP[entry.slug]) {
    return NOVENA_SAINT_MAP[entry.slug];
  }

  // Marian novenas: strip " Novena" suffix (e.g. "Our Lady of Guadalupe Novena" → "Our Lady of Guadalupe")
  // Saint novenas: same logic works (e.g. "St. Jude Novena" → "St. Jude")
  const stripped = entry.title.replace(/ Novena$/i, '');
  if (stripped !== entry.title) {
    return stripped;
  }

  // Title doesn't end with " Novena" — strip "Novena " prefix or "Novena for " prefix
  return entry.title
    .replace(/^Novena\s+for\s+/i, '')
    .replace(/^Novena\s+/i, '');
}

/**
 * Find the best catalog entry from a list of preferred slugs.
 * Returns the first match found in the catalog.
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
 * Match a novena from the catalog based on the user's intention.
 * For presets: tries preferred slugs first, then filters by category.
 * For custom text: checks patron saint keyword map first, then falls back to title scoring.
 * Always returns a proper saint name — never a fabricated name from title manipulation.
 */
export function matchNovenaToIntention(
  intention: string,
  catalog: NovenaEntry[]
): NovenaMatchResult {
  if (catalog.length === 0) {
    const fallback: NovenaEntry = { slug: 'st-jude-novena', title: 'St. Jude Novena', category: 'saints' };
    return { entry: fallback, patronSaint: 'St. Jude' };
  }

  // Check if it's a preset intention
  const config = INTENTION_CONFIG[intention as PresetIntention];

  if (config) {
    // Try preferred slugs first
    const preferred = findPreferredEntry(config.preferredSlugs, catalog);
    if (preferred) {
      return { entry: preferred, patronSaint: resolveSaintName(preferred) };
    }

    // Fall back to category filter
    const categoryMatches = catalog.filter((n) => config.categories.includes(n.category));
    if (categoryMatches.length > 0) {
      const picked = categoryMatches[Math.floor(Math.random() * categoryMatches.length)];
      return { entry: picked, patronSaint: resolveSaintName(picked) };
    }
  } else {
    // Custom text — patron saint keyword matching
    const normalized = intention.toLowerCase();

    let bestGroup: (typeof PATRON_SAINT_MAP)[number] | null = null;
    let bestScore = 0;

    for (const group of PATRON_SAINT_MAP) {
      let score = 0;
      for (const keyword of group.keywords) {
        if (normalized.includes(keyword)) {
          score++;
          // Multi-word keywords get a bonus point
          if (keyword.includes(' ')) score++;
        }
      }
      if (score > bestScore) {
        bestScore = score;
        bestGroup = group;
      }
    }

    if (bestGroup) {
      // Found a matching patron saint group — find best novena from preferred slugs
      const preferred = findPreferredEntry(bestGroup.preferredSlugs, catalog);
      if (preferred) {
        return { entry: preferred, patronSaint: bestGroup.patronSaint };
      }

      // No preferred slug in catalog — find any saints-category novena
      const saintEntries = catalog.filter((n) => n.category === 'saints');
      if (saintEntries.length > 0) {
        const picked = saintEntries[Math.floor(Math.random() * saintEntries.length)];
        return { entry: picked, patronSaint: bestGroup.patronSaint };
      }
    }

    // No keyword group matched — fall back to title scoring
    const keywords = intention
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => w.length > 2);

    if (keywords.length > 0) {
      let bestMatch: NovenaEntry | null = null;
      let bestTitleScore = 0;

      for (const entry of catalog) {
        const haystack = `${entry.title} ${entry.category}`.toLowerCase();
        let score = 0;
        for (const kw of keywords) {
          if (haystack.includes(kw)) score++;
        }
        if (score > bestTitleScore) {
          bestTitleScore = score;
          bestMatch = entry;
        }
      }

      if (bestMatch) {
        return { entry: bestMatch, patronSaint: resolveSaintName(bestMatch) };
      }
    }
  }

  // Fallback: random from catalog
  const fallback = catalog[Math.floor(Math.random() * catalog.length)];
  return { entry: fallback, patronSaint: resolveSaintName(fallback) };
}
