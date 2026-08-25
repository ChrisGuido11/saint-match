import { Novena } from '../types';

/**
 * Traditional novenas are published prayers shipped verbatim so they work
 * offline and never go through the AI generation path. The same prayer is
 * prayed each of the nine days.
 *
 * Published text must not be edited (including its punctuation). Only the
 * placeholder below is swapped for the user's intention at render time.
 */

export const TRADITIONAL_ST_JUDE_ID = 'traditional-st-jude';
export const ST_JUDE_SAINT_ID = 'st-jude';
export const ST_JUDE_CATALOG_SLUG = 'st-jude-novena';

export const REQUEST_PLACEHOLDER = '(make your request here)';

export interface NovenaCalendar {
  startMonth: number;     // 1 to 12
  startDay: number;
  lastPrayerDay: number;  // same month as startMonth
  feastDay: number;       // same month as startMonth
}

export interface LabeledPrayer {
  label: string;
  text: string;
}

export interface TraditionalNovena extends Novena {
  source: 'traditional';
  /** The published novena prayer, containing REQUEST_PLACEHOLDER. */
  novenaPrayer: string;
  /** The published block that follows the novena prayer, verbatim. */
  prayerBlock: string;
  /** Standard prayers said after the published text, in order. */
  commons: LabeledPrayer[];
  calendar: NovenaCalendar;
  sourceName: string;
  sourceUrl: string;
  /** Catalog slugs that should resolve to this traditional novena. */
  catalogSlugs: string[];
}

const OUR_FATHER: LabeledPrayer = {
  label: 'Our Father',
  text: 'Our Father, who art in heaven, hallowed be thy name; thy kingdom come; thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.',
};

const HAIL_MARY: LabeledPrayer = {
  label: 'Hail Mary',
  text: 'Hail Mary, full of grace, the Lord is with thee; blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.',
};

const ST_JUDE_NOVENA_PRAYER =
  'Most holy Apostle, St. Jude, faithful servant and friend of Jesus, the Church honors and invokes you universally, as the patron of difficult cases, of things almost despaired of, Pray for me, I am so helpless and alone. Intercede with God for me that He bring visible and speedy help where help is almost despaired of. Come to my assistance in this great need that I may receive the consolation and help of heaven in all my necessities, tribulations, and sufferings, particularly - (make your request here) - and that I may praise God with you and all the saints forever. I promise, O Blessed St. Jude, to be ever mindful of this great favor granted me by God and to always honor you as my special and powerful patron, and to gratefully encourage devotion to you. Amen';

const ST_JUDE_PRAYER_BLOCK = [
  'May the Most Sacred Heart of Jesus be adored, and loved in all the tabernacles until the end of time. Amen.',
  'May the most Sacred Heart of Jesus be praised and glorified now and forever. Amen',
  'St. Jude pray for us and hear our prayers. Amen.',
  'Blessed be the Sacred Heart of Jesus',
  'Blessed be the Immaculate Heart of Mary',
  'Blessed be St. Jude Thaddeus, in all the world and for all Eternity.',
].join('\n');

export const TRADITIONAL_ST_JUDE: TraditionalNovena = {
  id: TRADITIONAL_ST_JUDE_ID,
  saintId: ST_JUDE_SAINT_ID,
  source: 'traditional',
  title: 'St. Jude Novena',
  description: 'The published novena to St. Jude, patron of difficult cases and things almost despaired of. Nine days of the same published prayer.',
  novenaPrayer: ST_JUDE_NOVENA_PRAYER,
  prayerBlock: ST_JUDE_PRAYER_BLOCK,
  commons: [OUR_FATHER, HAIL_MARY],
  calendar: { startMonth: 10, startDay: 19, lastPrayerDay: 27, feastDay: 28 },
  sourceName: 'EWTN',
  sourceUrl: 'https://www.ewtn.com/catholicism/devotions/novena-to-st-jude--desperate-situations-and-hopeless-cases-305',
  catalogSlugs: [ST_JUDE_CATALOG_SLUG],
  intentionSuggestions: [
    'A situation that feels hopeless',
    'Healing for someone I love',
    'Help with a difficult case',
    'Strength when I feel alone',
  ],
  // Generic Novena fields, kept so the type stays compatible with existing
  // callers. The prayer screen uses novenaPrayer / prayerBlock / commons.
  openingPrayer: '',
  dailyPrayers: Array(9).fill(ST_JUDE_NOVENA_PRAYER),
  closingPrayer: ST_JUDE_PRAYER_BLOCK,
};

export const TRADITIONAL_NOVENAS: TraditionalNovena[] = [TRADITIONAL_ST_JUDE];

export function listTraditionalNovenas(): TraditionalNovena[] {
  return TRADITIONAL_NOVENAS;
}

export function getTraditionalNovenaById(id: string): TraditionalNovena | undefined {
  return TRADITIONAL_NOVENAS.find((n) => n.id === id);
}

export function getTraditionalNovenaBySaintId(saintId: string): TraditionalNovena | undefined {
  return TRADITIONAL_NOVENAS.find((n) => n.saintId === saintId || n.catalogSlugs.includes(saintId));
}

export function isTraditionalNovenaId(id: string | undefined | null): boolean {
  return !!id && TRADITIONAL_NOVENAS.some((n) => n.id === id);
}

/** Splits the published prayer around the request placeholder, keeping the published punctuation. */
export function splitAtRequestPlaceholder(prayer: string): { before: string; after: string } | null {
  const index = prayer.indexOf(REQUEST_PLACEHOLDER);
  if (index === -1) return null;
  return {
    before: prayer.slice(0, index),
    after: prayer.slice(index + REQUEST_PLACEHOLDER.length),
  };
}

/** Year of the next start date (today counts as still upcoming). */
export function nextStartYear(calendar: NovenaCalendar, now: Date = new Date()): number {
  const year = now.getFullYear();
  const startThisYear = new Date(year, calendar.startMonth - 1, calendar.startDay);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return today <= startThisYear ? year : year + 1;
}

export function nextStartDate(calendar: NovenaCalendar, now: Date = new Date()): Date {
  return new Date(nextStartYear(calendar, now), calendar.startMonth - 1, calendar.startDay);
}

export function nextJudeStartYear(now: Date = new Date()): number {
  return nextStartYear(TRADITIONAL_ST_JUDE.calendar, now);
}

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function formatCalendarDay(month: number, day: number): string {
  return `${MONTH_NAMES[month - 1]} ${day}`;
}

/** Short window copy for cards, e.g. "Starts Oct 19. Last prayer day Oct 27. Feast day Oct 28." */
export function describeCalendar(calendar: NovenaCalendar): string {
  const m = calendar.startMonth;
  return `Starts ${formatCalendarDay(m, calendar.startDay)}. Last prayer day ${formatCalendarDay(m, calendar.lastPrayerDay)}. Feast day ${formatCalendarDay(m, calendar.feastDay)}.`;
}
