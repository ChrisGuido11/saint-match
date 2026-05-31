import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import {
  BannerAd,
  BannerAdSize,
  useForeground,
  PaidEvent,
} from 'react-native-google-mobile-ads';
import { useApp } from '../context/AppContext';
import { AdManager, AdPlacement } from '../lib/ads/AdManager';
import { AdUnitIds, AdTuning, adsEnabledForPlatform, adKeywords } from '../lib/ads/config';
import { Colors } from '../constants/colors';

interface AdBannerProps {
  /** Placement tag for impression-level revenue analytics. */
  placement: Extract<AdPlacement, 'banner_home' | 'banner_portfolio' | 'banner_novenas'>;
  /** Use a collapsible anchored banner (higher eCPM). Defaults to true. */
  collapsible?: boolean;
}

/**
 * Anchored adaptive (optionally collapsible) banner.
 *
 * - Renders nothing for Pro users, on disabled platforms, before the SDK is
 *   ready, or if the ad fails to load — so it never breaks layout or sits as an
 *   empty box.
 * - Reserves a stable slot height to avoid layout shift while loading.
 * - Place at the bottom of a screen, clear of tap targets — accidental clicks
 *   count as invalid traffic and risk the AdMob account.
 */
export function AdBanner({ placement, collapsible = true }: AdBannerProps) {
  const { isPro } = useApp();
  const bannerRef = useRef<BannerAd>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  // Ensure the SDK is initialized before mounting the native banner.
  useEffect(() => {
    let active = true;
    AdManager.init().finally(() => {
      if (active) setReady(true);
    });
    return () => {
      active = false;
    };
  }, []);

  // (iOS) WKWebView can be reclaimed while backgrounded — reload on foreground.
  useForeground(() => {
    if (Platform.OS === 'ios') bannerRef.current?.load();
  });

  if (isPro || failed || !ready || !adsEnabledForPlatform() || !AdManager.adsEnabled()) {
    return null;
  }

  const collapsiblePlacement = AdTuning.bannerCollapsible;
  const useCollapsible = collapsible && collapsiblePlacement !== 'none';
  const requestOptions = useCollapsible
    ? {
        keywords: adKeywords,
        // Safe cast: the `!== 'none'` guard narrows this to 'top' | 'bottom'.
        networkExtras: { collapsible: collapsiblePlacement as 'top' | 'bottom' },
      }
    : { keywords: adKeywords };

  return (
    <View style={styles.container} pointerEvents="box-none">
      <BannerAd
        ref={bannerRef}
        unitId={AdUnitIds.banner}
        size={BannerAdSize.LARGE_ANCHORED_ADAPTIVE_BANNER}
        requestOptions={requestOptions}
        onAdFailedToLoad={() => setFailed(true)}
        onPaid={(event: PaidEvent) => AdManager.reportRevenue(placement, event)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.cream,
  },
});
