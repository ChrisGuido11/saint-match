# AdMob Setup & Tuning — Saint Match

A complete Google AdMob layer (App Open + Banner + Interstitial + Rewarded) wired
into Saint Match. **Android-only by default** (the iOS app stays subscription-only;
the code is cross-platform and iOS can be enabled later). Ships with **Google test
ad IDs** — swap in real IDs before going live.

> ⚠️ **The one non-negotiable rule:** never click your own live ads, and never ship
> real ad unit IDs you'll tap during testing. Invalid traffic permanently
> terminates the entire AdMob account across every app. Use test IDs (the default)
> until you're ready, and add your device to `EXPO_PUBLIC_ADMOB_TEST_DEVICE_IDS`.

---

## What's installed

| Package | Version | Purpose |
| --- | --- | --- |
| `react-native-google-mobile-ads` | `^16.3.3` | AdMob SDK + Expo config plugin |
| `expo-build-properties` | `~1.0.10` | Keeps the UMP consent SDK from being stripped by R8/ProGuard |
| `expo-tracking-transparency` | `~6.0.8` | iOS ATT prompt (no-op on Android) |

> Requires a **custom dev/EAS build** — none of this runs in Expo Go.

## Architecture

```
lib/ads/
  config.ts        # single source of truth: unit IDs, enablement, tuning (env-overridable)
  AdManager.ts     # singleton: consent → ATT → init → preload; interstitial + app-open + caps + ILRD
  useInterstitial  # show an interstitial at a transition point
  useRewarded      # rewarded ad, reward granted only on earned-callback + after dismissal
  useAppOpenAds    # AppState-driven app-open (mounted once at root)
  index.ts         # barrel
components/
  AdBanner.tsx     # anchored adaptive + collapsible banner; suppressed for Pro/disabled; fails silently
  AdsController.tsx# headless: syncs entitlement/onboarding to AdManager, inits SDK, drives app-open
```

Every surface funnels its "is an ad allowed right now?" decision through
`AdManager.adsEnabled()` → `platform enabled && initialized && consent ok &&
onboarded && !isPro`. **Pro users and pre-onboarding users never see ads.**

## Placements (current)

| Format | Where | Notes |
| --- | --- | --- |
| **App Open** | Warm resume (background→foreground) | 15-min cooldown; cold-start off by default (flag) |
| **Banner** | Home, Portfolio, Novenas (anchored, above tab bar) | Large anchored adaptive + collapsible; clear of tap targets |
| **Interstitial** | After *Accept Challenge*, after *Celebration → Continue* | 30s min-gap; preloads next on close |
| **Rewarded** | At the weekly match limit (paywall) → "Watch a video for a bonus match" | Grants a **locally-generated** bonus match so it bypasses the server's 3/week cap |

### Why the rewarded reward is a *local* match

The free match limit (3/week) is enforced **server-side** by the `saint-match`
Edge Function (HTTP 429). A rewarded bonus therefore can't just bump a client
counter — the server would still reject it. Instead, `getBonusSaintMatch()` in
`lib/claude.ts` builds a real match from the embedded `SAINTS` + `MICRO_ACTIONS`
data (curated content, no network call), so the reward works end-to-end with
**zero backend changes**. If you later add a server-side bonus grant, you can
swap the bonus path to a personalized AI match.

---

## Going live — swap test IDs for real IDs

### 1. AdMob App ID (native, build-time) — `app.json`

In `app.json` under the `react-native-google-mobile-ads` plugin, replace the
Google sample App IDs:

```jsonc
"androidAppId": "ca-app-pub-3940256099942544~3347511713",  // ← your Android App ID
"iosAppId":     "ca-app-pub-3940256099942544~1458002511"   // ← your iOS App ID (only if enabling iOS)
```

Changing the App ID requires a **new native build** (it's baked into the manifest/Info.plist).

### 2. Ad unit IDs (runtime) — EAS env vars

Create your 4 ad units in the AdMob console, then set them as **Plain text**
`EXPO_PUBLIC_*` vars in the EAS dashboard (see `.env.example`):

```
EXPO_PUBLIC_ADMOB_BANNER_ANDROID=ca-app-pub-XXXX/XXXX
EXPO_PUBLIC_ADMOB_INTERSTITIAL_ANDROID=ca-app-pub-XXXX/XXXX
EXPO_PUBLIC_ADMOB_REWARDED_ANDROID=ca-app-pub-XXXX/XXXX
EXPO_PUBLIC_ADMOB_APP_OPEN_ANDROID=ca-app-pub-XXXX/XXXX
```

Test IDs are used automatically in `__DEV__` and as a safe fallback if a prod ID
is missing — so a misconfigured release shows test ads, never the wrong live ads.

### 3. Android Play Console

Before release: **App content → "Yes, my app contains ads"**.

### 4. Build

```bash
eas build --profile production --platform android
```

(Adding native modules means OTA updates can't deliver this — a full build is required.)

---

## Revenue optimization (console-side)

These maximize yield and are configured in the AdMob web console, not code:

1. **Mediation** (biggest lever at scale). Add networks in the console and install
   their adapter packages, then rebuild:
   - Meta Audience Network — `react-native-google-mobile-ads` + Meta adapter
   - AppLovin — AppLovin adapter
   - Unity Ads — Unity adapter
   - Liftoff/Vungle — Vungle adapter

   Search the AdMob mediation docs for the exact current adapter package names
   and any extra SKAdNetwork IDs / Android manifest entries they require, then
   add those to the config plugin in `app.json`.
2. **eCPM floors** — set per ad unit in the console.
3. **Privacy & messaging** — configure the GDPR + ATT (IDFA) messages so the UMP
   SDK shows them automatically. (`AdsConsent.gatherConsent()` is already wired.)
4. **Impression-level ad revenue (ILRD)** — enable it in the console. The client
   already captures `onPaid` / paid events, tagged by placement, via
   `AdManager.setRevenueListener(...)`. Wire that to your analytics to prune low
   performers and A/B placements.

---

## Tuning (start aggressive, A/B upward)

All dials are config-driven via env (`.env.example`) — change them without shipping:

| Env var | Default | Lever |
| --- | --- | --- |
| `EXPO_PUBLIC_ADS_INTERSTITIAL_GAP_MS` | `30000` | Lower → more interstitial impressions |
| `EXPO_PUBLIC_ADS_APP_OPEN_COOLDOWN_MS` | `900000` (15m) | Lower → more app-open impressions |
| `EXPO_PUBLIC_ADS_APP_OPEN_COLD_START` | `false` | Enable cold-start app-open once sequencing is validated |
| `EXPO_PUBLIC_ADS_BANNER_COLLAPSIBLE` | `bottom` | `bottom` / `top` / `none` |
| `EXPO_PUBLIC_ADS_ENABLED` | `true` | Master kill-switch |
| `EXPO_PUBLIC_ADS_ENABLED_IOS` | `false` | Enable iOS ads (also needs ATT/privacy submission) |

## Enabling iOS later

1. Set `EXPO_PUBLIC_ADS_ENABLED_IOS=true`.
2. Provide real iOS ad unit IDs + iOS App ID.
3. The ATT prompt + `NSUserTrackingUsageDescription` are already wired; submit the
   iOS app with the updated privacy/tracking disclosures.
4. Decide product-wise whether free iOS users should see ads alongside subscriptions.

## Verify before finishing

- [ ] Dev client build (not Expo Go) on Android.
- [ ] All four formats render **test** ads.
- [ ] Pro users / pre-onboarding users see **no** ads.
- [ ] No ad sits in a tap path (accidental clicks = invalid traffic).
- [ ] Rewarded "bonus match" grants exactly one match after the ad completes.
