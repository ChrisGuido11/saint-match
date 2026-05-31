import { useEffect } from 'react';
import { AdManager } from '../lib/ads/AdManager';
import { useAppOpenAds } from '../lib/ads/useAppOpenAds';
import { adsEnabledForPlatform } from '../lib/ads/config';
import { useApp } from '../context/AppContext';

/**
 * Headless controller wiring the ad layer to app state. Mount once inside
 * <AppProvider> (it needs `useApp()`).
 *
 *  - Keeps AdManager's entitlement/onboarding flags in sync with context so
 *    ads suppress instantly when a user is Pro or hasn't onboarded.
 *  - Initializes the SDK (consent → ATT → init → preload) once the user is
 *    onboarded and not Pro — so the UMP consent form never interrupts the
 *    onboarding flow and Pro users are never asked.
 *  - Drives App Open ads via AppState.
 */
export function AdsController() {
  const { isPro, isOnboarded } = useApp();

  useEffect(() => {
    AdManager.setEntitlement(isPro);
  }, [isPro]);

  useEffect(() => {
    AdManager.setOnboarded(isOnboarded);
  }, [isOnboarded]);

  useEffect(() => {
    if (isOnboarded && !isPro && adsEnabledForPlatform()) {
      AdManager.init();
    }
  }, [isOnboarded, isPro]);

  useAppOpenAds();

  return null;
}
