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
  const { data, error } = await supabase.auth.updateUser({ email, password });
  if (error) throw error;

  // Transfer RevenueCat identity to the permanent user ID
  if (data.user?.id) {
    const { transferPurchasesToUser } = require('./purchases');
    transferPurchasesToUser(data.user.id).catch(() => {});
  }

  return data;
}

export async function signOut() {
  return supabase.auth.signOut();
}

export async function deleteUserAccount() {
  // First, delete all user data from public tables (RLS will ensure only own data is deleted)
  const { data: { user } } = await supabase.auth.getUser();
  
  if (user) {
    // Delete user data from all tables (cascade will handle related data)
    // The profiles table has ON DELETE CASCADE, so deleting the auth user will clean up
    await supabase.from('active_challenges').delete().eq('user_id', user.id);
    await supabase.from('completions').delete().eq('user_id', user.id);
    await supabase.from('patience_scores').delete().eq('user_id', user.id);
    await supabase.from('usage').delete().eq('user_id', user.id);
    await supabase.from('streaks').delete().eq('user_id', user.id);
    await supabase.from('profiles').delete().eq('id', user.id);
  }
  
  // Sign out the user (the auth.users record requires admin/service role to delete)
  await supabase.auth.signOut();
}
