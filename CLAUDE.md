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

Edge Function deployment: `supabase functions deploy saint-match`

No test suite is configured yet.

## Architecture

Saint Match is a React Native app built with **Expo 54 + Expo Router + TypeScript**. It helps Catholics practice daily virtue through personalized challenges inspired by Catholic saints — "Duolingo for becoming a better person."

### System Architecture

```
Client → Supabase Auth (anonymous-first)
Client → Supabase Edge Function (saint-match) → Claude API (key server-side)
Client → AsyncStorage (offline cache) ↔ Supabase DB (cloud source of truth)
```

- **Auth:** Anonymous sign-in on first open via Supabase Auth. Users can optionally link an email in Settings for cross-device sync.
- **AI:** Claude API (Sonnet 4) calls go through a Supabase Edge Function that handles caching, usage limits, and local fallback — the API key never touches the client.
- **Offline-first:** AsyncStorage is read first for instant UI, then Supabase syncs in the background. App works fully offline.

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
    └── (tabs)/              # Bottom tab navigation
        ├── index.tsx        # Home (main UX: emotion select → match)
        ├── calendar.tsx     # Streak calendar view
        ├── portfolio.tsx    # Virtue portfolio: saints collection, stats, challenge history
        └── settings.tsx     # Settings, account linking
```

Auth routing is onboarding-based — `isOnboarded` in AppContext controls public vs auth flow. Anonymous Supabase auth happens transparently during init.

### State Management

Single React Context (`context/AppContext.tsx`) exposed via `useApp()` hook. Key state: streak data, active challenge, completions log, usage limits, pro status, Supabase session.

Initialization flow in `AppProvider`:
1. `ensureAnonymousSession()` — creates or restores Supabase auth
2. `refreshAll()` — loads all data from AsyncStorage (fast)
3. `syncAllData()` — background sync with Supabase (slow, non-blocking)

### Core User Flow

1. User selects one of 6 emotions on Home screen
2. `lib/claude.ts` calls Edge Function → checks cache → calls Claude API → falls back to local saints data
3. Edge Function enforces usage limits server-side (3/week free, unlimited pro)
4. Saint match screen shows saint + 5-15 minute micro-action
5. User accepts challenge → stored locally + synced to Supabase
6. Completion updates streak, logs to completions, shows celebration, syncs to server

### Key Modules

- **`lib/supabase.ts`** — Supabase client (AsyncStorage session persistence) + auth helpers: `ensureAnonymousSession()`, `linkEmailToAccount()`, `signOut()`.
- **`lib/claude.ts`** — Calls the `saint-match` Edge Function with JWT. Falls back to local matching if offline. Throws `USAGE_LIMIT_REACHED` on 429.
- **`lib/sync.ts`** — Bridge between AsyncStorage and Supabase. Push functions for completions, streaks, challenges. Pull for server-authoritative usage data. One-time migration of existing local data.
- **`lib/storage.ts`** — AsyncStorage CRUD (local offline layer). Keys prefixed `@saint_match_*`. Usage auto-resets weekly. Challenges auto-clear if from previous day.
- **`lib/streak.ts`** — Streak calculation with auto-reset if >1 day gap. 1 free streak freeze per week.
- **`lib/notifications.ts`** — Daily reminders (8:30 AM) and streak alerts (8:00 PM) via expo-notifications.
- **`lib/purchases.ts`** — Mock RevenueCat. Checks `profiles.is_pro` from Supabase when online. Free tier: 3 matches/week.

### Supabase Backend

**Edge Function** (`supabase/functions/saint-match/`): Single endpoint that validates JWT, checks usage, queries match cache (6hr TTL), calls Claude API, stores cached responses, falls back to embedded local saints data.

**Database tables** (schema in `supabase/migrations/001_initial_schema.sql`):
- `profiles` — auto-created on signup, stores `is_pro`, `is_onboarded`, `email`
- `usage` — weekly match count per user (server-side limit enforcement)
- `match_cache` — cached Claude responses with TTL (writable only by service_role)
- `completions` — challenge completion log (unique per user+date)
- `streaks` — one row per user with current/longest streak
- `active_challenges` — today's challenge as JSONB
RLS enabled on all tables. `handle_new_user()` trigger auto-creates profile + streak rows.

### Environment Variables

Client-side (`.env`):
- `EXPO_PUBLIC_SUPABASE_URL` — Supabase project URL
- `EXPO_PUBLIC_SUPABASE_ANON_KEY` — Supabase anon/public key

Server-side (Edge Function secrets):
- `ANTHROPIC_API_KEY` — Claude API key (set via `supabase secrets set`)
- `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` — auto-provided by Supabase runtime

### Design System

All design tokens live in `constants/`:
- **`colors.ts`** — Sage green (#8B9D83) primary, terracotta (#D4735E) accent, cream (#FAF8F5) background
- **`typography.ts`** — Cormorant Garamond (serif, for titles/saint names) + Inter (sans, for body/UI). 13 named text styles.
- **`spacing.ts`** — 4px base unit scale, border radii, shadow presets

### Type Definitions

All domain types in `types/index.ts`: `Saint`, `Emotion` (6 values), `MicroAction`, `SaintMatch`, `ActiveChallenge`, `Completion`, `StreakData`, `UsageData`.

### Database Migrations

Schema lives in `supabase/migrations/`. Key files:
- `001_initial_schema.sql` — Core tables, RLS policies, `handle_new_user()` trigger
- `004_production_hardening.sql` — Atomic usage RPC, performance indexes, DELETE RLS policies, cache cleanup

### Patterns

- Functional components with hooks only (no class components)
- `StyleSheet.create()` at bottom of each file
- react-native-reanimated for entrance animations (`FadeIn`, `FadeInDown`) and spring-based press interactions
- expo-haptics for tactile feedback on key actions
- `@/` path alias maps to project root (configured in tsconfig.json)
- Background sync: write to AsyncStorage first (instant UI), then fire-and-forget `.catch(() => {})` sync to Supabase
- Sync retry queue: failed push operations are queued in AsyncStorage (`@saint_match_sync_queue`) and replayed on next `syncAllData()`

## Production Deployment Checklist

### Supabase Setup

1. **Run migrations** in order in the Supabase SQL Editor:
   - `001_initial_schema.sql` (if fresh project)
   - `004_production_hardening.sql` (indexes, atomic usage RPC, DELETE policies)

2. **Enable Anonymous Sign-Ins** in Supabase Dashboard → Authentication → Settings

3. **Set Edge Function secrets:**
   ```bash
   supabase secrets set ANTHROPIC_API_KEY=sk-ant-...
   # SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY are auto-provided
   ```

4. **Deploy Edge Function:**
   ```bash
   supabase functions deploy saint-match
   ```

5. **Verify** the Edge Function:
   - Send malformed JSON body → expect 400 (not 500)
   - Send without auth header → expect 401
   - Send valid request → expect saint match response

### Client Setup

1. Copy `.env.example` to `.env` and fill in your Supabase project URL and anon key
2. Run `npm install`
3. Run `npm start` to verify
