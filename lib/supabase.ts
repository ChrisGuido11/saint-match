import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL ?? 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Helper to check if Supabase is configured
export const isSupabaseConfigured = (): boolean => {
  return (
    supabaseUrl !== 'https://placeholder.supabase.co' &&
    supabaseAnonKey !== 'placeholder-key'
  );
};

// Email scoping — prevents collisions across apps sharing the same Supabase project
export function scopeEmail(email: string): string {
  const [local, domain] = email.split('@');
  return `${local}+saintmatch@${domain}`;
}

export function unscopeEmail(scopedEmail: string): string {
  return scopedEmail.replace('+saintmatch', '');
}

// Auth helpers

export async function ensureAnonymousSession() {
  if (!isSupabaseConfigured()) {
    console.warn('ensureAnonymousSession: Supabase not configured, skipping');
    return null;
  }

  const { data: { session } } = await supabase.auth.getSession();
  if (session) return session;

  const { data, error } = await supabase.auth.signInAnonymously();
  if (error) throw error;
  return data.session;
}

export async function linkEmailToAccount(email: string, password: string) {
  const scopedEmail = scopeEmail(email);
  const { data, error } = await supabase.auth.updateUser({
    email: scopedEmail,
    password,
    data: { app: 'saintmatch' },
  });
  if (error) throw error;

  // Store the raw (unscoped) email in profiles for display
  if (data.user?.id) {
    await supabase
      .from('profiles')
      .update({ email })
      .eq('id', data.user.id);

    // Transfer RevenueCat identity to the permanent user ID
    const { transferPurchasesToUser } = require('./purchases');
    transferPurchasesToUser(data.user.id).catch(() => {});
  }

  return data;
}

export async function signInWithEmail(email: string, password: string) {
  // Try scoped email first (new users)
  const scopedEmail = scopeEmail(email);
  const { data, error } = await supabase.auth.signInWithPassword({
    email: scopedEmail,
    password,
  });

  if (!error && data.session) {
    // Store the raw (unscoped) email in profiles for display
    if (data.user?.id) {
      await supabase.from('profiles').update({ email }).eq('id', data.user.id);
    }
    // Link RevenueCat to the authenticated user
    const { loginRevenueCat } = require('./purchases');
    loginRevenueCat(data.user.id).catch(() => {});
    return data;
  }

  // Fallback: try raw email for pre-scoping users
  const { data: rawData, error: rawError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (rawError) throw rawError;

  if (rawData.user?.id) {
    // Store the raw email in profiles for display
    await supabase.from('profiles').update({ email }).eq('id', rawData.user.id);
    const { loginRevenueCat } = require('./purchases');
    loginRevenueCat(rawData.user.id).catch(() => {});
  }

  return rawData;
}

export async function getDisplayEmail(userId: string): Promise<string | null> {
  // Primary: read raw email from profiles
  const { data } = await supabase
    .from('profiles')
    .select('email')
    .eq('id', userId)
    .single();
  if (data?.email) return data.email;

  // Fallback: derive from auth session's scoped email
  const { data: { session } } = await supabase.auth.getSession();
  if (session?.user?.email) {
    return unscopeEmail(session.user.email);
  }
  return null;
}

export async function signOut() {
  await supabase.auth.signOut();
  // Create a fresh anonymous session so the app continues to work
  return supabase.auth.signInAnonymously();
}

export async function deleteUserAccount() {
  // Edge Function handles deleting public table data + auth.users record (requires service_role)
  const { error } = await supabase.functions.invoke('delete-account');
  if (error) {
    let detail = error.message;
    try {
      const context = (error as Record<string, unknown>).context;
      if (context && typeof (context as Record<string, unknown>).json === 'function') {
        const body = await (context as { json: () => Promise<Record<string, unknown>> }).json();
        detail = (body?.error as string) ?? JSON.stringify(body);
      }
    } catch {}
    if (__DEV__) console.error('Delete account error:', detail);
    throw new Error(detail || 'Failed to delete account');
  }

  // Clear local session and create fresh anonymous session
  await supabase.auth.signOut({ scope: 'local' });
  await supabase.auth.signInAnonymously();
}
