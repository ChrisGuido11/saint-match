import { useEffect, useRef } from 'react';
import { useRewardedAd } from 'react-native-google-mobile-ads';
import { useApp } from '../../context/AppContext';
import { AdUnitIds, adsEnabledForPlatform, adKeywords } from './config';

interface UseRewardedResult {
  /** True when a rewarded ad is preloaded and the CTA can be enabled. */
  isReady: boolean;
  /** Present the loaded rewarded ad. Safe to call; no-ops if not ready. */
  show: () => void;
}

/**
 * Rewarded-ad primitive. Highest-eCPM format, user-initiated.
 *
 * The reward is granted via `onEarnedReward`, fired exactly once per show and
 * ONLY after BOTH (a) the SDK reported the earned-reward callback and (b) the
 * ad was dismissed — so the reward can't be spoofed and the unlock UI appears
 * after the ad closes, not over it. Auto-suppressed for Pro users and on
 * platforms where ads are disabled (passes `null` to destroy the instance).
 *
 * @param onEarnedReward Called once when the user has genuinely earned a reward.
 */
export function useRewarded(onEarnedReward?: () => void): UseRewardedResult {
  const { isPro } = useApp();
  const adsAllowed = adsEnabledForPlatform() && !isPro;
  const unitId = adsAllowed ? AdUnitIds.rewarded : null;

  const { isLoaded, isEarnedReward, isClosed, load, show } = useRewardedAd(unitId, {
    keywords: adKeywords,
  });

  const callbackRef = useRef(onEarnedReward);
  callbackRef.current = onEarnedReward;
  const earnedRef = useRef(false);

  // Preload as soon as the ad is allowed.
  useEffect(() => {
    if (unitId) load();
  }, [unitId, load]);

  // Record that the reward was earned (fired while the ad is still showing).
  useEffect(() => {
    if (isEarnedReward) earnedRef.current = true;
  }, [isEarnedReward]);

  // After the ad is dismissed: grant the reward (if earned), then preload next.
  useEffect(() => {
    if (!isClosed) return;
    const didEarn = earnedRef.current;
    earnedRef.current = false;
    if (didEarn) callbackRef.current?.();
    if (unitId) load();
  }, [isClosed, unitId, load]);

  return {
    isReady: !!unitId && isLoaded,
    show: () => {
      if (unitId && isLoaded) show();
    },
  };
}
