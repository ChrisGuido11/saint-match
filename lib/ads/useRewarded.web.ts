/**
 * Web build of the rewarded-ad hook.
 *
 * Rewarded ads are native-only, so on web this hook reports "never ready" and
 * its `show()` is a no-op. Callers already treat rewarded ads as optional
 * (the bonus is simply unavailable when no ad can load).
 */

interface UseRewardedResult {
  isReady: boolean;
  show: () => void;
}

export function useRewarded(_onEarnedReward?: () => void): UseRewardedResult {
  return {
    isReady: false,
    show: () => {},
  };
}
