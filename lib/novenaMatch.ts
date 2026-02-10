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

// Patron saint keyword map for custom intention matching
const PATRON_SAINT_MAP: Array<{
  keywords: string[];
  patronSaint: string;
  reason: string;
  preferredSlugs: string[];
}> = [
  {
    keywords: ['boyfriend', 'girlfriend', 'relationship', 'dating', 'romance', 'romantic', 'partner', 'love life', 'crush', 'courtship'],
    patronSaint: 'St. Raphael the Archangel',
    reason: 'Patron of happy meetings, St. Raphael guided Tobias to his future spouse in the Book of Tobit.',
    preferredSlugs: ['st-raphael-novena', 'st-valentine-novena', 'st-anthony-novena'],
  },
  {
    keywords: ['husband', 'wife', 'marriage', 'married', 'spouse', 'wedding', 'fiancé', 'fiancée', 'fiance', 'engagement', 'family', 'children', 'fertility', 'pregnant', 'pregnancy', 'baby', 'conceive', 'infertility'],
    patronSaint: 'St. Joseph',
    reason: 'As guardian of the Holy Family, St. Joseph is patron of families, fathers, and expectant mothers.',
    preferredSlugs: ['st-joseph-novena', 'st-rita-novena', 'st-monica-novena'],
  },
  {
    keywords: ['impossible', 'hopeless', 'desperate', 'no hope', 'miracle', 'lost cause'],
    patronSaint: 'St. Rita of Cascia',
    reason: 'Patron of impossible causes, St. Rita received miraculous answers to prayers the world deemed hopeless.',
    preferredSlugs: ['st-rita-novena', 'st-jude-novena'],
  },
  {
    keywords: ['lost', 'find', 'finding', 'missing', 'search', 'searching'],
    patronSaint: 'St. Anthony of Padua',
    reason: 'Known worldwide as the patron of lost things, St. Anthony intercedes for all who seek what is missing.',
    preferredSlugs: ['st-anthony-novena'],
  },
  {
    keywords: ['healing', 'sick', 'illness', 'disease', 'cancer', 'surgery', 'hospital', 'health', 'recovery', 'pain', 'suffering', 'diagnosis'],
    patronSaint: 'St. Padre Pio',
    reason: 'St. Padre Pio bore the wounds of Christ and was gifted with healing, interceding for countless sick.',
    preferredSlugs: ['st-padre-pio-novena', 'novena-for-healing', 'our-lady-of-lourdes-novena'],
  },
  {
    keywords: ['anxiety', 'anxious', 'worry', 'worried', 'fear', 'afraid', 'stress', 'stressed', 'depression', 'depressed', 'mental health', 'panic', 'overwhelmed'],
    patronSaint: 'St. Dymphna',
    reason: 'Patron of those suffering from mental and emotional distress, St. Dymphna brings comfort to anxious hearts.',
    preferredSlugs: ['st-dymphna-novena', 'sacred-heart-novena'],
  },
  {
    keywords: ['job', 'work', 'employment', 'career', 'unemployed', 'interview', 'promotion', 'fired', 'laid off', 'coworker', 'boss', 'workplace'],
    patronSaint: 'St. Joseph',
    reason: 'Patron of workers, St. Joseph sanctified daily labor as a carpenter and provider for the Holy Family.',
    preferredSlugs: ['st-joseph-novena', 'st-cajetan-novena'],
  },
  {
    keywords: ['money', 'financial', 'finances', 'debt', 'bills', 'poverty', 'income', 'rent', 'mortgage'],
    patronSaint: 'St. Matthew',
    reason: 'A former tax collector called by Christ, St. Matthew understands financial burdens and the freedom of grace.',
    preferredSlugs: ['st-jude-novena', 'st-joseph-novena'],
  },
  {
    keywords: ['exam', 'exams', 'school', 'college', 'university', 'studying', 'student', 'test', 'grades', 'graduation'],
    patronSaint: 'St. Thomas Aquinas',
    reason: 'The greatest theologian of the Church, St. Thomas Aquinas is patron of students and scholars.',
    preferredSlugs: ['st-thomas-aquinas-novena', 'holy-spirit-novena'],
  },
  {
    keywords: ['grief', 'death', 'died', 'passed away', 'mourning', 'loss', 'funeral', 'bereaved', 'widow', 'widower'],
    patronSaint: 'Our Lady of Sorrows',
    reason: 'Our Lady stood at the foot of the Cross; she understands grief and holds the brokenhearted close.',
    preferredSlugs: ['our-lady-of-sorrows-novena', 'st-monica-novena'],
  },
  {
    keywords: ['conversion', 'convert', 'faith', 'unbelief', 'atheist', 'fallen away', 'prodigal', 'return to church', 'praying for son', 'praying for daughter'],
    patronSaint: 'St. Monica',
    reason: 'St. Monica prayed for 17 years for her son Augustine\'s conversion, never losing faith in God\'s timing.',
    preferredSlugs: ['st-monica-novena'],
  },
  {
    keywords: ['trust', 'surrender', 'let go', 'control', 'patience', 'waiting', 'uncertainty', "god's will", "god's plan"],
    patronSaint: 'St. Thérèse of Lisieux',
    reason: 'The Little Flower taught total surrender to God through small acts of trust and her "Little Way."',
    preferredSlugs: ['st-therese-novena', 'sacred-heart-novena', 'divine-mercy-novena'],
  },
  {
    keywords: ['travel', 'traveling', 'journey', 'trip', 'safe travel', 'protection', 'safety', 'moving', 'relocation'],
    patronSaint: 'St. Christopher',
    reason: 'Patron of travelers, St. Christopher carried the Christ Child across a river and protects all journeys.',
    preferredSlugs: ['st-christopher-novena', 'st-michael-novena'],
  },
  {
    keywords: ['addiction', 'addicted', 'alcohol', 'alcoholism', 'drugs', 'sobriety', 'sober', 'substance'],
    patronSaint: 'St. Maximilian Kolbe',
    reason: 'St. Maximilian Kolbe chose sacrificial love over despair, offering hope to those struggling with addiction.',
    preferredSlugs: ['st-maximilian-kolbe-novena', 'st-jude-novena'],
  },
  {
    keywords: ['peace', 'conflict', 'argument', 'fighting', 'reconciliation', 'forgiveness', 'forgive', 'grudge', 'resentment', 'anger'],
    patronSaint: 'St. Francis of Assisi',
    reason: 'St. Francis prayed "Lord, make me an instrument of your peace," becoming patron of peacemakers.',
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
 * Look up a reason for a saint from the PATRON_SAINT_MAP, or return a generic fallback.
 */
function getReasonForSaint(saintName: string): string {
  for (const group of PATRON_SAINT_MAP) {
    if (group.patronSaint === saintName) {
      return group.reason;
    }
  }
  return `${saintName} intercedes for those who seek their guidance through this novena.`;
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
    return { entry: fallback, patronSaint: 'St. Jude', matchReason: 'Patron of desperate cases, St. Jude intercedes when all other hope is lost.' };
  }

  // Check if it's a preset intention
  const config = INTENTION_CONFIG[intention as PresetIntention];

  if (config) {
    // Try preferred slugs first
    const preferred = findPreferredEntry(config.preferredSlugs, catalog);
    if (preferred) {
      const saint = resolveSaintName(preferred);
      return { entry: preferred, patronSaint: saint, matchReason: getReasonForSaint(saint) };
    }

    // Fall back to category filter
    const categoryMatches = catalog.filter((n) => config.categories.includes(n.category));
    if (categoryMatches.length > 0) {
      const picked = categoryMatches[Math.floor(Math.random() * categoryMatches.length)];
      const saint = resolveSaintName(picked);
      return { entry: picked, patronSaint: saint, matchReason: getReasonForSaint(saint) };
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
        return { entry: preferred, patronSaint: bestGroup.patronSaint, matchReason: bestGroup.reason };
      }

      // No preferred slug in catalog — find any saints-category novena
      const saintEntries = catalog.filter((n) => n.category === 'saints');
      if (saintEntries.length > 0) {
        const picked = saintEntries[Math.floor(Math.random() * saintEntries.length)];
        return { entry: picked, patronSaint: bestGroup.patronSaint, matchReason: bestGroup.reason };
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
        const saint = resolveSaintName(bestMatch);
        return { entry: bestMatch, patronSaint: saint, matchReason: getReasonForSaint(saint) };
      }
    }
  }

  // Fallback: random from catalog
  const fallback = catalog[Math.floor(Math.random() * catalog.length)];
  const fallbackSaint = resolveSaintName(fallback);
  return { entry: fallback, patronSaint: fallbackSaint, matchReason: getReasonForSaint(fallbackSaint) };
}
