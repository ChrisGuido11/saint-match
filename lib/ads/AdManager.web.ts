// Minimal shape of the native PaidEvent — inlined so the web build avoids the
// native `react-native-google-mobile-ads` import entirely.
type PaidEvent = { currency: string; precision: number; value: number };

/**
 * Web build of the AdManager singleton.
 *
 * The AdMob SDK is native-only, so on web every method is an inert no-op and
 * `adsEnabled()` is always false. This keeps the ad-consuming screens and the
 * headless `<AdsController/>` working in a browser during development without
 * pulling in the native module.
 */

export type AdPlacement =
  | 'accept_challenge'
  | 'celebration'
  | 'app_open'
  | 'bonus_match'
  | 'banner_home'
  | 'banner_portfolio'
  | 'banner_novenas';

type RevenueListener = (placement: AdPlacement | 'unknown', event: PaidEvent) => void;

class AdManagerWebStub {
  setEntitlement(_isPro: boolean): void {}
  setOnboarded(_isOnboarded: boolean): void {}
  setRevenueListener(_listener: RevenueListener | null): void {}
  adsEnabled(): boolean {
    return false;
  }
  isShowingFullScreenAd(): boolean {
    return false;
  }
  async init(): Promise<void> {}
  showInterstitial(_placement: AdPlacement): boolean {
    return false;
  }
  showAppOpenIfAvailable(): boolean {
    return false;
  }
  reportRevenue(_placement: AdPlacement | 'unknown', _event: PaidEvent): void {}
}

export const AdManager = new AdManagerWebStub();
