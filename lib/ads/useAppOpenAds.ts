import { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { AdManager } from './AdManager';
import { AdTuning } from './config';

/**
 * Drives App Open ads from the app root.
 *
 * - Warm resume (background → foreground): shows an app-open ad subject to the
 *   cooldown. This is the primary, least-intrusive app-open revenue moment.
 * - Cold start (optional, off by default): shows shortly after launch once the
 *   first ad is preloaded. Disabled by default to avoid an ad appearing before
 *   content is ready (a UX/policy pitfall). Enable via config when sequencing
 *   is validated.
 *
 * AdManager handles all gating (entitlement, cooldown, expiry, not-while-
 * another-ad-is-showing), so this hook only translates AppState transitions
 * into "try to show" calls. Mount it exactly once near the app root.
 */
export function useAppOpenAds(): void {
  const appState = useRef<AppStateStatus>(AppState.currentState);

  useEffect(() => {
    let coldStartTimer: ReturnType<typeof setTimeout> | undefined;

    if (AdTuning.appOpenOnColdStart) {
      // Give content a beat to settle before a cold-start app-open.
      coldStartTimer = setTimeout(() => {
        AdManager.showAppOpenIfAvailable();
      }, 1500);
    }

    const subscription = AppState.addEventListener('change', (nextState) => {
      const prevState = appState.current;
      appState.current = nextState;

      const cameToForeground =
        /inactive|background/.test(prevState) && nextState === 'active';

      if (cameToForeground && AdTuning.appOpenOnWarmResume) {
        AdManager.showAppOpenIfAvailable();
      }
    });

    return () => {
      subscription.remove();
      if (coldStartTimer) clearTimeout(coldStartTimer);
    };
  }, []);
}
