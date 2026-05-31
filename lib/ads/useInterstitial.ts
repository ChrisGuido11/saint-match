import { useCallback } from 'react';
import { AdManager, AdPlacement } from './AdManager';

/**
 * Ergonomic accessor for interstitial ads. The actual preloading, frequency
 * capping, and entitlement gating live in the AdManager singleton (so a fresh
 * ad survives navigation); this hook just exposes a stable show function.
 *
 * @example
 * const { showInterstitial } = useInterstitial();
 * // at a transition point:
 * showInterstitial('accept_challenge'); // returns true if an ad was shown
 */
export function useInterstitial() {
  const showInterstitial = useCallback(
    (placement: AdPlacement): boolean => AdManager.showInterstitial(placement),
    [],
  );
  return { showInterstitial };
}
