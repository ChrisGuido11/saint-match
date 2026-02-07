import AsyncStorage from '@react-native-async-storage/async-storage';
import Purchases, {
  PurchasesPackage,
  LOG_LEVEL,
} from 'react-native-purchases';
import RevenueCatUI from 'react-native-purchases-ui';
import { Platform } from 'react-native';

const PRO_STATUS_KEY = '@saint_match_pro_status';
const PRO_CACHE_TIMESTAMP_KEY = '@saint_match_pro_cache_ts';
const PRO_CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

const REVENUECAT_IOS_KEY = process.env.EXPO_PUBLIC_REVENUECAT_IOS_KEY ?? '';
const ENTITLEMENT_ID = 'Saint Match Pro';

export interface Package {
  identifier: string;
  product: {
    title: string;
    priceString: string;
    description: string;
  };
}

// Fallback packages shown when RevenueCat is unreachable
const FALLBACK_PACKAGES: Package[] = [
  {
    identifier: 'monthly',
    product: {
      title: 'Pro Monthly',
      priceString: '$7.99/mo',
      description: 'Unlimited daily saint matches, full Virtue Portfolio analytics, and streak protection.',
    },
  },
  {
    identifier: 'yearly',
    product: {
      title: 'Pro Annual',
      priceString: '$79/yr',
      description: 'Save 17%! All Pro features for one year.',
    },
  },
];

let isConfigured = false;

export function isRevenueCatConfigured(): boolean {
  return isConfigured;
}

export async function initPurchases(): Promise<void> {
  if (isConfigured) return;

  const apiKey = Platform.OS === 'ios' ? REVENUECAT_IOS_KEY : '';
  if (!apiKey) {
    console.warn('RevenueCat API key not set — purchases will use fallback mode');
    return;
  }

  if (__DEV__) {
    Purchases.setLogLevel(LOG_LEVEL.DEBUG);
  }

  Purchases.configure({ apiKey });
  isConfigured = true;
}

/**
 * Link RevenueCat anonymous user to Supabase user ID.
 * Call after anonymous auth is established.
 */
export async function loginRevenueCat(supabaseUserId: string): Promise<void> {
  if (!isConfigured) return;

  try {
    await Purchases.logIn(supabaseUserId);
  } catch (err) {
    console.warn('RevenueCat logIn failed:', err);
  }
}

export async function getOfferings(): Promise<Package[]> {
  if (!isConfigured) return FALLBACK_PACKAGES;

  try {
    const offerings = await Purchases.getOfferings();
    const current = offerings.current;
    if (!current || current.availablePackages.length === 0) {
      return FALLBACK_PACKAGES;
    }

    return current.availablePackages.map(mapPackage);
  } catch (err) {
    console.warn('Failed to fetch offerings:', err);
    return FALLBACK_PACKAGES;
  }
}

export async function purchasePro(packageIdentifier: string): Promise<boolean> {
  if (!isConfigured) {
    // Fallback: mock purchase for development without RevenueCat key
    await AsyncStorage.setItem(PRO_STATUS_KEY, 'true');
    await AsyncStorage.setItem(PRO_CACHE_TIMESTAMP_KEY, Date.now().toString());
    return true;
  }

  try {
    const offerings = await Purchases.getOfferings();
    const pkg = offerings.current?.availablePackages.find(
      (p: PurchasesPackage) => p.identifier === packageIdentifier ||
        p.product.identifier === packageIdentifier
    );

    if (!pkg) {
      console.error(`Package "${packageIdentifier}" not found in offerings`);
      return false;
    }

    const { customerInfo } = await Purchases.purchasePackage(pkg);
    const isPro = customerInfo.entitlements.active[ENTITLEMENT_ID] !== undefined;

    if (isPro) {
      await cacheProStatus(true);
      syncProToSupabase(true).catch(() => {});
    }

    return isPro;
  } catch (err: any) {
    if (err.userCancelled) return false;
    console.error('Purchase failed:', err);
    return false;
  }
}

export async function restorePurchases(): Promise<boolean> {
  if (!isConfigured) {
    const status = await AsyncStorage.getItem(PRO_STATUS_KEY);
    return status === 'true';
  }

  try {
    const customerInfo = await Purchases.restorePurchases();
    const isPro = customerInfo.entitlements.active[ENTITLEMENT_ID] !== undefined;

    await cacheProStatus(isPro);

    if (isPro) {
      syncProToSupabase(true).catch(() => {});
    }

    return isPro;
  } catch (err) {
    console.error('Restore failed:', err);
    return false;
  }
}

/**
 * 3-tier pro status check:
 * 1. AsyncStorage cache (5min TTL) — instant
 * 2. RevenueCat SDK — authoritative
 * 3. Supabase profiles.is_pro — server fallback
 */
export async function checkProStatus(): Promise<boolean> {
  // Tier 1: AsyncStorage cache with TTL
  const [cachedStatus, cachedTs] = await Promise.all([
    AsyncStorage.getItem(PRO_STATUS_KEY),
    AsyncStorage.getItem(PRO_CACHE_TIMESTAMP_KEY),
  ]);

  if (cachedStatus !== null && cachedTs) {
    const age = Date.now() - parseInt(cachedTs, 10);
    if (age < PRO_CACHE_TTL_MS) {
      return cachedStatus === 'true';
    }
  }

  // Tier 2: RevenueCat SDK
  if (isConfigured) {
    try {
      const customerInfo = await Purchases.getCustomerInfo();
      const isPro = customerInfo.entitlements.active[ENTITLEMENT_ID] !== undefined;
      await cacheProStatus(isPro);
      return isPro;
    } catch {
      // RevenueCat unreachable — fall through to Supabase
    }
  }

  // Tier 3: Supabase fallback
  try {
    const { supabase, isSupabaseConfigured } = require('./supabase');
    if (!isSupabaseConfigured()) return cachedStatus === 'true';

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return cachedStatus === 'true';

    const { data: profile } = await supabase
      .from('profiles')
      .select('is_pro')
      .eq('id', session.user.id)
      .single();

    if (profile?.is_pro != null) {
      const isPro = !!profile.is_pro;
      await cacheProStatus(isPro);
      return isPro;
    }
  } catch {
    // Offline — use cached status
  }

  return cachedStatus === 'true';
}

export async function resetProStatus(): Promise<void> {
  await AsyncStorage.multiRemove([PRO_STATUS_KEY, PRO_CACHE_TIMESTAMP_KEY]);
}

/**
 * Transfer RevenueCat identity when user links email.
 * Ensures subscription follows the permanent user ID.
 */
export async function transferPurchasesToUser(userId: string): Promise<void> {
  if (!isConfigured) return;

  try {
    await Purchases.logIn(userId);
    const customerInfo = await Purchases.getCustomerInfo();
    const isPro = customerInfo.entitlements.active[ENTITLEMENT_ID] !== undefined;
    await cacheProStatus(isPro);
  } catch (err) {
    console.warn('transferPurchasesToUser failed:', err);
  }
}

// ── RevenueCat UI ────────────────────────────────────────────────────────

/**
 * Present RevenueCat's Customer Center for subscription management.
 * Allows users to manage, cancel, or request refunds for their subscription.
 */
export async function showCustomerCenter(): Promise<void> {
  if (!isConfigured) return;

  try {
    await RevenueCatUI.presentCustomerCenter({
      callbacks: {
        onRestoreCompleted: async ({ customerInfo }) => {
          const isPro = customerInfo.entitlements.active[ENTITLEMENT_ID] !== undefined;
          await cacheProStatus(isPro);
        },
        onRestoreFailed: ({ error }) => {
          console.warn('Customer Center restore failed:', error);
        },
      },
    });
  } catch (err) {
    console.error('showCustomerCenter error:', err);
  }
}

// ── Helpers ──────────────────────────────────────────────────────────────

function mapPackage(pkg: PurchasesPackage): Package {
  return {
    identifier: pkg.identifier,
    product: {
      title: pkg.product.title,
      priceString: pkg.product.priceString,
      description: pkg.product.description,
    },
  };
}

async function cacheProStatus(isPro: boolean): Promise<void> {
  await AsyncStorage.setItem(PRO_STATUS_KEY, isPro ? 'true' : 'false');
  await AsyncStorage.setItem(PRO_CACHE_TIMESTAMP_KEY, Date.now().toString());
}

async function syncProToSupabase(isPro: boolean): Promise<void> {
  const { supabase, isSupabaseConfigured } = require('./supabase');
  if (!isSupabaseConfigured()) return;

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return;

  await supabase
    .from('profiles')
    .update({ is_pro: isPro, subscription_status: isPro ? 'active' : 'expired' })
    .eq('id', session.user.id);
}
