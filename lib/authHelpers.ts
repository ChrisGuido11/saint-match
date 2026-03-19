import { supabase } from './supabase';

/**
 * Get a valid access token, proactively refreshing if it expires within 60 seconds.
 * Falls back to creating an anonymous session if refresh fails.
 */
export async function getValidAccessToken(): Promise<string> {
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    const { data: { session: refreshed } } = await supabase.auth.refreshSession();
    if (refreshed) return refreshed.access_token;

    const { data: { session: anonSession } } = await supabase.auth.signInAnonymously();
    if (anonSession) return anonSession.access_token;

    throw new Error('AUTH_SESSION_EXPIRED');
  }

  // Proactively refresh if token expires within 60 seconds
  const expiresAt = session.expires_at ?? 0;
  const nowSecs = Math.floor(Date.now() / 1000);
  if (expiresAt - nowSecs < 60) {
    const { data: { session: refreshed } } = await supabase.auth.refreshSession();
    if (refreshed) return refreshed.access_token;

    const { data: { session: anonSession } } = await supabase.auth.signInAnonymously();
    if (anonSession) return anonSession.access_token;

    throw new Error('AUTH_SESSION_EXPIRED');
  }

  return session.access_token;
}

/**
 * Force-refresh the access token. Used after a 401 response.
 * Falls back to creating an anonymous session if refresh fails.
 */
export async function refreshAccessToken(): Promise<string> {
  const { data: { session: refreshed } } = await supabase.auth.refreshSession();
  if (refreshed) return refreshed.access_token;

  const { data: { session: anonSession } } = await supabase.auth.signInAnonymously();
  if (anonSession) return anonSession.access_token;

  throw new Error('AUTH_SESSION_EXPIRED');
}
