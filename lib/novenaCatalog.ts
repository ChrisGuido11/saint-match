import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase, isSupabaseConfigured } from './supabase';

export interface NovenaEntry {
  slug: string;
  title: string;
  category: 'saints' | 'marian' | 'holy-days' | 'intentions' | 'other';
}

const CACHE_KEY = '@saint_match_novena_catalog';

// Hardcoded fallback — popular novenas if both edge function and cache fail
const FALLBACK_CATALOG: NovenaEntry[] = [
  { slug: 'st-jude-novena', title: 'St. Jude Novena', category: 'saints' },
  { slug: 'st-therese-novena', title: 'St. Therese Novena', category: 'saints' },
  { slug: 'st-joseph-novena', title: 'St. Joseph Novena', category: 'saints' },
  { slug: 'st-anthony-novena', title: 'St. Anthony Novena', category: 'saints' },
  { slug: 'st-francis-novena', title: 'St. Francis of Assisi Novena', category: 'saints' },
  { slug: 'st-michael-novena', title: 'St. Michael Novena', category: 'saints' },
  { slug: 'st-benedict-novena', title: 'St. Benedict Novena', category: 'saints' },
  { slug: 'st-rita-novena', title: 'St. Rita Novena', category: 'saints' },
  { slug: 'st-padre-pio-novena', title: 'St. Padre Pio Novena', category: 'saints' },
  { slug: 'st-patrick-novena', title: 'St. Patrick Novena', category: 'saints' },
  { slug: 'our-lady-of-guadalupe-novena', title: 'Our Lady of Guadalupe Novena', category: 'marian' },
  { slug: 'our-lady-of-lourdes-novena', title: 'Our Lady of Lourdes Novena', category: 'marian' },
  { slug: 'our-lady-of-fatima-novena', title: 'Our Lady of Fatima Novena', category: 'marian' },
  { slug: 'immaculate-conception-novena', title: 'Immaculate Conception Novena', category: 'marian' },
  { slug: 'divine-mercy-novena', title: 'Divine Mercy Novena', category: 'holy-days' },
  { slug: 'holy-spirit-novena', title: 'Holy Spirit Novena', category: 'holy-days' },
  { slug: 'sacred-heart-novena', title: 'Sacred Heart Novena', category: 'holy-days' },
  { slug: 'christmas-novena', title: 'Christmas Novena', category: 'holy-days' },
  { slug: 'novena-for-the-impossible', title: 'Novena for the Impossible', category: 'intentions' },
  { slug: 'novena-for-healing', title: 'Novena for Healing', category: 'intentions' },
];

async function loadFromCache(): Promise<NovenaEntry[] | null> {
  try {
    const raw = await AsyncStorage.getItem(CACHE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

async function saveToCache(catalog: NovenaEntry[]): Promise<void> {
  try {
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(catalog));
  } catch {}
}

async function fetchFromEdgeFunction(): Promise<NovenaEntry[] | null> {
  if (!isSupabaseConfigured()) return null;

  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.access_token) return null;

    const url = `${process.env.EXPO_PUBLIC_SUPABASE_URL}/functions/v1/novena-catalog`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
        apikey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '',
      },
    });

    if (!response.ok) return null;

    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) return data;
  } catch {}

  return null;
}

/**
 * Fetch the novena catalog. Reads from local cache first for instant UI,
 * then refreshes from edge function in background.
 */
export async function fetchNovenaCatalog(): Promise<NovenaEntry[]> {
  // 1. Try local cache first (instant)
  const cached = await loadFromCache();

  // 2. Fetch from edge function
  const fresh = await fetchFromEdgeFunction();

  if (fresh && fresh.length > 0) {
    // Save to cache for next time
    saveToCache(fresh).catch(() => {});
    return fresh;
  }

  // 3. Return cached if edge function failed
  if (cached && cached.length > 0) return cached;

  // 4. Fallback to hardcoded list
  return FALLBACK_CATALOG;
}

/**
 * Get cached catalog instantly (no network). Returns fallback if nothing cached.
 */
export async function getCachedCatalog(): Promise<NovenaEntry[]> {
  const cached = await loadFromCache();
  return cached && cached.length > 0 ? cached : FALLBACK_CATALOG;
}
