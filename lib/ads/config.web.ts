import { Platform } from 'react-native';

/**
 * Web build of the AdMob config layer.
 *
 * `react-native-google-mobile-ads` is native-only and cannot bundle for web,
 * so this platform variant mirrors the public surface of `config.ts` without
 * importing the native SDK. Ads never run on web (`adsEnabledForPlatform()`
 * always returns false here), so the unit IDs are inert placeholders — this
 * exists purely so the app bundles and runs in a browser during development.
 */

// Google's public sample test unit IDs, inlined to avoid the native import.
const TestIds = {
  ADAPTIVE_BANNER: 'ca-app-pub-3940256099942544/9214589741',
  INTERSTITIAL: 'ca-app-pub-3940256099942544/1033173712',
  REWARDED: 'ca-app-pub-3940256099942544/5224354917',
  APP_OPEN: 'ca-app-pub-3940256099942544/9257395921',
} as const;

// ── env helpers ─────────────────────────────────────────────────────────────

function envBool(value: string | undefined, fallback: boolean): boolean {
  if (value == null || value === '') return fallback;
  return value === 'true' || value === '1' || value.toLowerCase() === 'yes';
}

function envNum(value: string | undefined, fallback: number): number {
  if (value == null || value === '') return fallback;
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function envList(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

const ADS_MASTER_ENABLED = envBool(process.env.EXPO_PUBLIC_ADS_ENABLED, true);
const ADS_ENABLED_IOS = envBool(process.env.EXPO_PUBLIC_ADS_ENABLED_IOS, false);
const ADS_ENABLED_ANDROID = envBool(process.env.EXPO_PUBLIC_ADS_ENABLED_ANDROID, true);

export function adsEnabledForPlatform(): boolean {
  if (!ADS_MASTER_ENABLED) return false;
  if (Platform.OS === 'ios') return ADS_ENABLED_IOS;
  if (Platform.OS === 'android') return ADS_ENABLED_ANDROID;
  return false; // web / other
}

interface AdUnitSpec {
  test: string;
  prodAndroid?: string;
  prodIos?: string;
}

function isRealUnitId(id: string | undefined): id is string {
  return !!id && id.startsWith('ca-app-pub-');
}

function resolveUnitId(spec: AdUnitSpec): string {
  if (__DEV__) return spec.test;
  const prod = Platform.OS === 'ios' ? spec.prodIos : spec.prodAndroid;
  return isRealUnitId(prod) ? prod : spec.test;
}

export const AdUnitIds = {
  banner: resolveUnitId({
    test: TestIds.ADAPTIVE_BANNER,
    prodAndroid: process.env.EXPO_PUBLIC_ADMOB_BANNER_ANDROID,
    prodIos: process.env.EXPO_PUBLIC_ADMOB_BANNER_IOS,
  }),
  interstitial: resolveUnitId({
    test: TestIds.INTERSTITIAL,
    prodAndroid: process.env.EXPO_PUBLIC_ADMOB_INTERSTITIAL_ANDROID,
    prodIos: process.env.EXPO_PUBLIC_ADMOB_INTERSTITIAL_IOS,
  }),
  rewarded: resolveUnitId({
    test: TestIds.REWARDED,
    prodAndroid: process.env.EXPO_PUBLIC_ADMOB_REWARDED_ANDROID,
    prodIos: process.env.EXPO_PUBLIC_ADMOB_REWARDED_IOS,
  }),
  appOpen: resolveUnitId({
    test: TestIds.APP_OPEN,
    prodAndroid: process.env.EXPO_PUBLIC_ADMOB_APP_OPEN_ANDROID,
    prodIos: process.env.EXPO_PUBLIC_ADMOB_APP_OPEN_IOS,
  }),
} as const;

export const usingTestAdUnitIds =
  AdUnitIds.banner === TestIds.ADAPTIVE_BANNER &&
  AdUnitIds.interstitial === TestIds.INTERSTITIAL;

export const AdTuning = {
  interstitialMinGapMs: envNum(process.env.EXPO_PUBLIC_ADS_INTERSTITIAL_GAP_MS, 30_000),
  appOpenCooldownMs: envNum(process.env.EXPO_PUBLIC_ADS_APP_OPEN_COOLDOWN_MS, 15 * 60_000),
  appOpenOnWarmResume: envBool(process.env.EXPO_PUBLIC_ADS_APP_OPEN_WARM_RESUME, true),
  appOpenOnColdStart: envBool(process.env.EXPO_PUBLIC_ADS_APP_OPEN_COLD_START, false),
  appOpenMaxCacheMs: 4 * 60 * 60_000 - 60_000,
  bannerCollapsible: (process.env.EXPO_PUBLIC_ADS_BANNER_COLLAPSIBLE ?? 'bottom') as
    | 'bottom'
    | 'top'
    | 'none',
  fullScreenCooldownMs: 1_000,
} as const;

export const testDeviceIds = envList(process.env.EXPO_PUBLIC_ADMOB_TEST_DEVICE_IDS);

export const adKeywords = [
  'faith',
  'christian',
  'catholic',
  'wellness',
  'self improvement',
  'meditation',
  'mindfulness',
  'journaling',
];
