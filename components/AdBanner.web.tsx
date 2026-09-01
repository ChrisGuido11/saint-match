import type { AdPlacement } from '../lib/ads/AdManager';

interface AdBannerProps {
  placement: Extract<AdPlacement, 'banner_home' | 'banner_portfolio' | 'banner_novenas'>;
  collapsible?: boolean;
}

/**
 * Web build of the anchored banner. `react-native-google-mobile-ads` is
 * native-only, and banners never serve on web, so this renders nothing.
 */
export function AdBanner(_props: AdBannerProps) {
  return null;
}
