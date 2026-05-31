/**
 * AdMob layer — public surface.
 *
 * Architecture:
 *  - `config`      — single source of truth for unit IDs, enablement, tuning.
 *  - `AdManager`   — singleton owning init/consent/preload/caps/ILRD.
 *  - `useInterstitial` / `useRewarded` — full-screen ad primitives.
 *  - `useAppOpenAds` — App Open via AppState (mount once at root).
 *  - `<AdBanner/>` (in components/) — anchored adaptive/collapsible banner.
 *  - `<AdsController/>` (in components/) — wires the layer to app state.
 */
export { AdManager } from './AdManager';
export type { AdPlacement } from './AdManager';
export { useInterstitial } from './useInterstitial';
export { useRewarded } from './useRewarded';
export { useAppOpenAds } from './useAppOpenAds';
export {
  AdUnitIds,
  AdTuning,
  adsEnabledForPlatform,
  usingTestAdUnitIds,
  adKeywords,
} from './config';
