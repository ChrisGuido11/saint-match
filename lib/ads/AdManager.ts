import { Platform } from 'react-native';
import mobileAds, {
  AppOpenAd,
  InterstitialAd,
  AdEventType,
  MaxAdContentRating,
  AdsConsent,
  RequestOptions,
  PaidEvent,
} from 'react-native-google-mobile-ads';
import { AdUnitIds, AdTuning, adsEnabledForPlatform, testDeviceIds, adKeywords } from './config';

/**
 * AdManager — the single owner of the AdMob lifecycle.
 *
 * Responsibilities:
 *  - One-time init: UMP consent → (iOS) ATT → request config → SDK initialize.
 *  - Preloading + frequency-capping of interstitial and app-open ads (so an ad
 *    is ready the instant a slot opens, without over-saturating).
 *  - Entitlement / onboarding gating (no ads for Pro users or pre-onboarding).
 *  - Impression-level ad revenue (ILRD) capture, tagged by placement.
 *
 * Rewarded ads are user-initiated and component-scoped, so they live in the
 * `useRewarded` hook; banners live in `<AdBanner/>`. Everything funnels its
 * "is an ad allowed right now?" decision through `adsEnabled()` here.
 *
 * All public methods are safe to call regardless of state — they no-op when ads
 * are disabled, consent is missing, or the SDK isn't initialized. Failures never
 * throw to callers.
 */

const baseRequestOptions: RequestOptions = {
  keywords: adKeywords,
};

function adLog(...args: unknown[]): void {
  // No logging in production builds (keeps release logs clean).
  if (__DEV__) {
    // eslint-disable-next-line no-console
    console.log('[Ads]', ...args);
  }
}

export type AdPlacement =
  | 'accept_challenge'
  | 'celebration'
  | 'app_open'
  | 'bonus_match'
  | 'banner_home'
  | 'banner_portfolio'
  | 'banner_novenas';

type RevenueListener = (placement: AdPlacement | 'unknown', event: PaidEvent) => void;

class AdManagerImpl {
  private initialized = false;
  private initInFlight: Promise<void> | null = null;
  private canRequestAds = false;

  private isPro = false;
  private isOnboarded = false;

  /** True while ANY full-screen ad (interstitial / app-open) is on screen. */
  private showingFullScreenAd = false;

  private interstitial: InterstitialAd | null = null;
  private interstitialLoaded = false;
  private lastInterstitialAt = 0;
  private interstitialRetry = 0;

  private appOpen: AppOpenAd | null = null;
  private appOpenLoaded = false;
  private appOpenLoadedAt = 0;
  private lastAppOpenAt = 0;

  private lastFullScreenAt = 0;
  private revenueListener: RevenueListener | null = null;

  // ── entitlement / state sync (called from React) ────────────────────────────

  setEntitlement(isPro: boolean): void {
    this.isPro = isPro;
  }

  setOnboarded(isOnboarded: boolean): void {
    this.isOnboarded = isOnboarded;
  }

  setRevenueListener(listener: RevenueListener | null): void {
    this.revenueListener = listener;
  }

  /** The single gate every ad surface consults. */
  adsEnabled(): boolean {
    return (
      adsEnabledForPlatform() &&
      this.initialized &&
      this.canRequestAds &&
      this.isOnboarded &&
      !this.isPro
    );
  }

  isShowingFullScreenAd(): boolean {
    return this.showingFullScreenAd;
  }

  // ── init: consent → ATT → request config → initialize → preload ─────────────

  async init(): Promise<void> {
    if (this.initialized) return;
    if (this.initInFlight) return this.initInFlight;
    if (!adsEnabledForPlatform()) {
      adLog('disabled for platform — skipping init');
      return;
    }

    this.initInFlight = this.doInit();
    try {
      await this.initInFlight;
    } finally {
      this.initInFlight = null;
    }
  }

  private async doInit(): Promise<void> {
    // 1) Request configuration MUST be set before initialize().
    try {
      await mobileAds().setRequestConfiguration({
        // Brand safety for a faith app — never serve mature content.
        maxAdContentRating: MaxAdContentRating.PG,
        tagForChildDirectedTreatment: false,
        tagForUnderAgeOfConsent: false,
        testDeviceIdentifiers: testDeviceIds,
      });
    } catch (e) {
      adLog('setRequestConfiguration failed', e);
    }

    // 2) Gather UMP consent (GDPR/EEA). On error we still try to request ads
    //    using consent from a previous session (per Google guidance).
    try {
      await AdsConsent.gatherConsent();
    } catch (e) {
      adLog('gatherConsent failed (continuing)', e);
    }
    try {
      const info = await AdsConsent.getConsentInfo();
      this.canRequestAds = info.canRequestAds;
    } catch (e) {
      adLog('getConsentInfo failed — assuming ads allowed', e);
      this.canRequestAds = true;
    }

    // 3) iOS App Tracking Transparency. No-op on Android. Lazy-required so the
    //    native module is only touched on iOS.
    if (Platform.OS === 'ios') {
      try {
        const att = await import('expo-tracking-transparency');
        const { status } = await att.getTrackingPermissionsAsync();
        if (status === att.PermissionStatus.UNDETERMINED) {
          await att.requestTrackingPermissionsAsync();
        }
      } catch (e) {
        adLog('ATT request failed (continuing)', e);
      }
    }

    // 4) Initialize the SDK.
    try {
      await mobileAds().initialize();
      this.initialized = true;
      adLog('initialized', { canRequestAds: this.canRequestAds });
    } catch (e) {
      adLog('initialize failed', e);
      return;
    }

    // 5) Preload full-screen formats so a slot never opens empty.
    if (this.canRequestAds) {
      this.loadInterstitial();
      this.loadAppOpen();
    }
  }

  // ── interstitial ────────────────────────────────────────────────────────────

  private loadInterstitial(): void {
    if (!adsEnabledForPlatform() || !this.canRequestAds) return;

    // Reuse a single instance; (re)attach listeners only on first creation.
    if (!this.interstitial) {
      const ad = InterstitialAd.createForAdRequest(AdUnitIds.interstitial, baseRequestOptions);
      ad.addAdEventListener(AdEventType.LOADED, () => {
        this.interstitialLoaded = true;
        this.interstitialRetry = 0;
        adLog('interstitial loaded');
      });
      ad.addAdEventListener(AdEventType.CLOSED, () => {
        this.interstitialLoaded = false;
        this.showingFullScreenAd = false;
        // Preload the next one immediately.
        this.interstitial?.load();
      });
      ad.addAdEventListener(AdEventType.ERROR, (error) => {
        this.interstitialLoaded = false;
        this.showingFullScreenAd = false;
        this.scheduleInterstitialRetry();
        adLog('interstitial error', error);
      });
      ad.addAdEventListener(AdEventType.PAID, (event) => {
        this.reportRevenue('unknown', event as unknown as PaidEvent);
      });
      this.interstitial = ad;
    }

    if (!this.interstitialLoaded) {
      this.interstitial.load();
    }
  }

  private scheduleInterstitialRetry(): void {
    // Exponential backoff capped at ~1 min so a temporarily empty network or
    // offline state doesn't hammer the SDK.
    const delay = Math.min(60_000, 2_000 * 2 ** this.interstitialRetry);
    this.interstitialRetry += 1;
    setTimeout(() => this.loadInterstitial(), delay);
  }

  /**
   * Show an interstitial at a transition point. Returns true if shown.
   * No-ops (returns false) when ads are disabled, an ad is already showing,
   * the frequency cap hasn't elapsed, or no ad is preloaded (and triggers a
   * load for next time).
   */
  showInterstitial(placement: AdPlacement): boolean {
    if (!this.adsEnabled()) return false;
    if (this.showingFullScreenAd) return false;

    const now = Date.now();
    if (now - this.lastInterstitialAt < AdTuning.interstitialMinGapMs) return false;
    if (now - this.lastFullScreenAt < AdTuning.fullScreenCooldownMs) return false;

    if (!this.interstitial || !this.interstitialLoaded) {
      this.loadInterstitial();
      return false;
    }

    try {
      this.showingFullScreenAd = true;
      this.lastInterstitialAt = now;
      this.lastFullScreenAt = now;
      // Re-tag revenue with the real placement for this show.
      this.pendingInterstitialPlacement = placement;
      this.interstitial.show();
      return true;
    } catch (e) {
      this.showingFullScreenAd = false;
      adLog('interstitial show failed', e);
      return false;
    }
  }

  private pendingInterstitialPlacement: AdPlacement | 'unknown' = 'unknown';

  // ── app open ──────────────────────────────────────────────────────────────

  private loadAppOpen(): void {
    if (!adsEnabledForPlatform() || !this.canRequestAds) return;

    const ad = AppOpenAd.createForAdRequest(AdUnitIds.appOpen, baseRequestOptions);
    ad.addAdEventListener(AdEventType.LOADED, () => {
      this.appOpenLoaded = true;
      this.appOpenLoadedAt = Date.now();
      adLog('app-open loaded');
    });
    ad.addAdEventListener(AdEventType.CLOSED, () => {
      this.appOpenLoaded = false;
      this.showingFullScreenAd = false;
      this.loadAppOpen(); // preload next
    });
    ad.addAdEventListener(AdEventType.ERROR, (error) => {
      this.appOpenLoaded = false;
      this.showingFullScreenAd = false;
      adLog('app-open error', error);
    });
    ad.addAdEventListener(AdEventType.PAID, (event) => {
      this.reportRevenue('app_open', event as unknown as PaidEvent);
    });
    this.appOpen = ad;
    ad.load();
  }

  private appOpenIsFresh(): boolean {
    return (
      this.appOpenLoaded && Date.now() - this.appOpenLoadedAt < AdTuning.appOpenMaxCacheMs
    );
  }

  /**
   * Show an app-open ad if one is ready and the cooldown has elapsed. Used for
   * warm resume (and optionally cold start). Returns true if shown.
   */
  showAppOpenIfAvailable(): boolean {
    if (!this.adsEnabled()) return false;
    if (this.showingFullScreenAd) return false;

    const now = Date.now();
    if (now - this.lastAppOpenAt < AdTuning.appOpenCooldownMs) return false;
    if (now - this.lastFullScreenAt < AdTuning.fullScreenCooldownMs) return false;

    if (!this.appOpen || !this.appOpenIsFresh()) {
      // Expired or not ready — refresh for next time.
      if (!this.appOpenIsFresh()) this.loadAppOpen();
      return false;
    }

    try {
      this.showingFullScreenAd = true;
      this.lastAppOpenAt = now;
      this.lastFullScreenAt = now;
      this.appOpen.show();
      return true;
    } catch (e) {
      this.showingFullScreenAd = false;
      adLog('app-open show failed', e);
      return false;
    }
  }

  // ── impression-level ad revenue ─────────────────────────────────────────────

  reportRevenue(placement: AdPlacement | 'unknown', event: PaidEvent): void {
    const tagged =
      placement === 'unknown' ? this.pendingInterstitialPlacement : placement;
    adLog('paid', tagged, event);
    this.revenueListener?.(tagged, event);
  }
}

export const AdManager = new AdManagerImpl();
