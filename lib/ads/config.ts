import { Platform } from 'react-native';
import { TestIds } from 'react-native-google-mobile-ads';

/**
 * Central, config-driven settings for the AdMob layer.
 *
 * Everything monetization-related (which platforms run ads, which ad unit IDs,
 * frequency caps, cooldowns, collapsible placement) lives here so it can be
 * tuned without touching feature code — and most values can be overridden at
 * build time via `EXPO_PUBLIC_*` env vars (set them in the EAS dashboard).
 *
 * Test ad unit IDs are used automatically in development (`__DEV__`) and as a
 * safe fallback whenever a production ID is not configured. Real ad unit IDs
 * NEVER ship without being explicitly set — protecting the AdMob account from
 * invalid-traffic strikes.
 *
 * NOTE: The AdMob *App ID* (not the unit IDs) is baked natively at build time
 * via the `react-native-google-mobile-ads` config plugin in `app.json`. Swap
 * the Google sample App IDs there for your real ones before a production build.
 * See ADMOB_SETUP.md.
 */

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

// ── platform enablement ───────────────────────────────────────────────────────

/**
 * Master kill-switch for the whole ad layer. Defaults on; flip to disable ads
 * everywhere without a code change.
 */
const ADS_MASTER_ENABLED = envBool(process.env.EXPO_PUBLIC_ADS_ENABLED, true);

/**
 * Per-platform enablement.
 *
 * Saint Match's iOS app is live and monetizes via subscriptions, so iOS ads are
 * OFF by default — the ad code is fully cross-platform but only Android serves
 * ads until iOS is explicitly opted in (set EXPO_PUBLIC_ADS_ENABLED_IOS=true and
 * complete the iOS ATT / privacy submission).
 */
const ADS_ENABLED_IOS = envBool(process.env.EXPO_PUBLIC_ADS_ENABLED_IOS, false);
const ADS_ENABLED_ANDROID = envBool(process.env.EXPO_PUBLIC_ADS_ENABLED_ANDROID, true);

export function adsEnabledForPlatform(): boolean {
  if (!ADS_MASTER_ENABLED) return false;
  if (Platform.OS === 'ios') return ADS_ENABLED_IOS;
  if (Platform.OS === 'android') return ADS_ENABLED_ANDROID;
  return false; // web / other
}

// ── ad unit IDs ───────────────────────────────────────────────────────────────

interface AdUnitSpec {
  test: string;
  prodAndroid?: string;
  prodIos?: string;
}

function isRealUnitId(id: string | undefined): id is string {
  return !!id && id.startsWith('ca-app-pub-');
}

/**
 * Resolve the ad unit ID for the current platform.
 * - In development: always the Google test ID.
 * - In production: the configured real ID, falling back to the test ID if one
 *   was never set (so a misconfigured build shows safe test ads, never the
 *   wrong account's live ads).
 */
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

/** True when every full-screen/banner unit is still a Google test ID. */
export const usingTestAdUnitIds =
  AdUnitIds.banner === TestIds.ADAPTIVE_BANNER &&
  AdUnitIds.interstitial === TestIds.INTERSTITIAL;

// ── tuning (frequency, cooldowns, placement) ───────────────────────────────────
// Starting points tuned for yield; A/B every dial upward from here. All
// overridable via env so they can change without shipping a build.

export const AdTuning = {
  /** Minimum gap between interstitials (ms). Lower = more impressions. */
  interstitialMinGapMs: envNum(process.env.EXPO_PUBLIC_ADS_INTERSTITIAL_GAP_MS, 30_000),

  /** Cooldown between app-open ads on warm resume (ms). */
  appOpenCooldownMs: envNum(process.env.EXPO_PUBLIC_ADS_APP_OPEN_COOLDOWN_MS, 15 * 60_000),

  /** Show an app-open ad on warm resume (background → foreground). */
  appOpenOnWarmResume: envBool(process.env.EXPO_PUBLIC_ADS_APP_OPEN_WARM_RESUME, true),

  /**
   * Show an app-open ad on cold start (after splash). OFF by default: cold-start
   * app-open risks appearing before content is ready (a UX/policy pitfall Google
   * polices hard). Enable once the loading-screen sequencing is validated.
   */
  appOpenOnColdStart: envBool(process.env.EXPO_PUBLIC_ADS_APP_OPEN_COLD_START, false),

  /** App-open ad references expire 4h after load (Google limit). */
  appOpenMaxCacheMs: 4 * 60 * 60_000 - 60_000, // 4h minus 1m safety margin

  /** Collapsible anchored-banner placement, or null to disable collapsible. */
  bannerCollapsible: (process.env.EXPO_PUBLIC_ADS_BANNER_COLLAPSIBLE ?? 'bottom') as
    | 'bottom'
    | 'top'
    | 'none',

  /** Don't show interstitial within this window after another full-screen ad. */
  fullScreenCooldownMs: 1_000,
} as const;

/**
 * Test device IDs (from native logs) allowed to receive real ads safely during
 * QA. Comma-separated via env. Emulators/simulators are auto-whitelisted.
 */
export const testDeviceIds = envList(process.env.EXPO_PUBLIC_ADMOB_TEST_DEVICE_IDS);

/**
 * App-theme keywords sent with every ad request to improve relevance / eCPM.
 * No user data — just the app's subject matter.
 */
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
