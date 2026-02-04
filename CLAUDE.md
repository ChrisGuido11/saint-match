# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm start          # Start Expo dev server (pick iOS/Android/Web from menu)
npm run android    # Run on Android emulator
npm run ios        # Run on iOS simulator
npm run web        # Run in web browser
```

Production builds use EAS CLI: `eas build --platform android|ios`

No test suite is configured yet.

## Architecture

Saint Match is a React Native app built with **Expo 54 + Expo Router + TypeScript**. It helps Catholics practice daily virtue through personalized challenges inspired by Catholic saints — "Duolingo for becoming a better person."

### Routing (File-based via Expo Router)

```
app/
├── _layout.tsx              # Root layout (fonts, splash, AppProvider)
├── index.tsx                # Splash → routes to welcome or home
├── (public)/                # Unauthenticated group
│   ├── welcome.tsx          # Onboarding intro
│   └── onboarding.tsx       # Full onboarding flow
└── (auth)/                  # Protected group (post-onboarding)
    ├── saint-match.tsx      # View matched saint + accept challenge
    ├── celebration.tsx      # Post-completion celebration
    ├── weekly-checkin.tsx   # Rate weekly patience score (1-5)
    └── (tabs)/              # Bottom tab navigation
        ├── index.tsx        # Home (main UX: emotion select → match)
        ├── calendar.tsx     # Streak calendar view
        ├── portfolio.tsx    # Virtue portfolio + completions log
        └── settings.tsx     # Settings & account
```

Auth routing is onboarding-based (no user accounts) — `isOnboarded` in AppContext controls public vs auth flow.

### State Management

Single React Context (`context/AppContext.tsx`) exposed via `useApp()` hook. All state persists to AsyncStorage (offline-first, no backend). Key state: streak data, active challenge, completions log, usage limits, pro status.

### Core User Flow

1. User selects one of 6 emotions on Home screen
2. `lib/claude.ts` calls Claude API (Sonnet 4) for a personalized saint match, falls back to local saint database (`constants/saints.ts`) if API key missing or request fails
3. Saint match screen shows saint + 5-15 minute micro-action
4. User accepts challenge → stored as `activeChallenge`
5. Home screen shows ChallengeCard until completed
6. Completion updates streak, logs to completions, shows celebration

### Key Modules

- **`lib/storage.ts`** — AsyncStorage CRUD for all persisted data. Keys prefixed `@saint_match_*`. Usage data auto-resets weekly on Monday. Active challenges auto-clear if from a previous day.
- **`lib/streak.ts`** — Streak calculation with auto-reset if >1 day gap. Supports 1 free streak freeze per week.
- **`lib/claude.ts`** — Anthropic API integration. Requires `EXPO_PUBLIC_ANTHROPIC_API_KEY` env var. Falls back to local matching from curated saints data.
- **`lib/notifications.ts`** — Daily reminders (8:30 AM) and streak alerts (8:00 PM) via expo-notifications.
- **`lib/purchases.ts`** — Mock RevenueCat implementation (not yet integrated). Free tier: 3 matches/week. Pro: unlimited + analytics + data export.

### Design System

All design tokens live in `constants/`:
- **`colors.ts`** — Sage green (#8B9D83) primary, terracotta (#D4735E) accent, cream (#FAF8F5) background
- **`typography.ts`** — Cormorant Garamond (serif, for titles/saint names) + Inter (sans, for body/UI). 13 named text styles.
- **`spacing.ts`** — 4px base unit scale, border radii, shadow presets

### Type Definitions

All domain types in `types/index.ts`: `Saint`, `Emotion` (6 values), `MicroAction`, `SaintMatch`, `ActiveChallenge`, `Completion`, `StreakData`, `UsageData`, `PatienceScore`.

### Patterns

- Functional components with hooks only (no class components)
- `StyleSheet.create()` at bottom of each file
- react-native-reanimated for entrance animations (`FadeIn`, `FadeInDown`) and spring-based press interactions
- expo-haptics for tactile feedback on key actions
- `@/` path alias maps to project root (configured in tsconfig.json)
