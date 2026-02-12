import { supabase, isSupabaseConfigured } from './supabase';

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;

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
  if (!isSupabaseConfigured() || !SUPABASE_URL) return null;

  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return null;

    const response = await fetch(`${SUPABASE_URL}/functions/v1/novena-generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`,
        'apikey': process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
      },
      body: JSON.stringify({ saintName, saintBio, personalIntention }),
    });

    if (!response.ok) {
      const errorBody = await response.text().catch(() => 'Unknown error');
      throw new Error(`Prayer generation failed (${response.status}): ${errorBody}`);
    }

    const data = await response.json();

    if (
      data.openingPrayer &&
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
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('Prayer generation failed')) throw error;
    if (error instanceof Error && error.message.startsWith('Invalid response')) throw error;
    // Network errors or other unexpected failures
    throw new Error(`Prayer generation error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
