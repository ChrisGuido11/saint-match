import { supabase, isSupabaseConfigured } from './supabase';

export interface GeneratedPrayers {
  openingPrayer: string;
  dailyPrayers: string[];
  closingPrayer: string;
}

export async function generateNovenaPrayers(
  saintName: string,
  saintBio: string,
  personalIntention: string
): Promise<GeneratedPrayers | null> {
  if (!isSupabaseConfigured()) return null;

  const { data, error } = await supabase.functions.invoke('novena-generate', {
    body: { saintName, saintBio, personalIntention },
  });

  if (error) {
    // Try to get the actual error body from the edge function response
    let detail = error.message;
    try {
      const context = (error as any).context;
      if (context && typeof context.json === 'function') {
        const body = await context.json();
        detail = body?.error ?? JSON.stringify(body);
      }
    } catch {}
    throw new Error(`Prayer generation failed: ${detail}`);
  }

  if (
    data?.openingPrayer &&
    Array.isArray(data.dailyPrayers) &&
    data.dailyPrayers.length === 9 &&
    data.closingPrayer
  ) {
    return {
      openingPrayer: data.openingPrayer,
      dailyPrayers: data.dailyPrayers,
      closingPrayer: data.closingPrayer,
    };
  }

  throw new Error('Invalid response: missing or malformed prayer data');
}
