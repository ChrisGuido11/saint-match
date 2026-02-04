-- Saint Match: Initial Supabase Schema
-- Run this in the Supabase SQL Editor or via `supabase db push`

-- =============================================================
-- 1. Utility: updated_at trigger function
-- =============================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =============================================================
-- 2. profiles (auto-created on user signup via trigger)
-- =============================================================
CREATE TABLE profiles (
  id                  UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email               TEXT,
  is_pro              BOOLEAN NOT NULL DEFAULT false,
  subscription_status TEXT NOT NULL DEFAULT 'free'
                      CHECK (subscription_status IN ('free', 'pro_monthly', 'pro_annual')),
  is_onboarded        BOOLEAN NOT NULL DEFAULT false,
  notification_time   TEXT DEFAULT '08:30',
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================================
-- 3. usage (weekly match count, one row per user per week)
-- =============================================================
CREATE TABLE usage (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                 UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  matches_used_this_week  INTEGER NOT NULL DEFAULT 0,
  weekly_limit            INTEGER NOT NULL DEFAULT 3,
  week_start              DATE NOT NULL,
  reset_at                TIMESTAMPTZ NOT NULL,
  created_at              TIMESTAMPTZ NOT NULL DEFAULT now(),

  UNIQUE(user_id, week_start)
);

ALTER TABLE usage ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own usage"
  ON usage FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own usage"
  ON usage FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own usage"
  ON usage FOR UPDATE USING (auth.uid() = user_id);

-- =============================================================
-- 4. match_cache (Claude API response cache, 6hr TTL)
--    Writable only by service_role (Edge Functions).
--    Readable by authenticated users.
-- =============================================================
CREATE TABLE match_cache (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  emotion           TEXT NOT NULL
                    CHECK (emotion IN ('anxious','overwhelmed','scattered','impatient','frustrated','peaceful')),
  saint_name        TEXT NOT NULL,
  feast_day         TEXT NOT NULL,
  bio               TEXT NOT NULL,
  micro_action      TEXT NOT NULL,
  estimated_minutes INTEGER NOT NULL DEFAULT 10,
  source            TEXT NOT NULL DEFAULT 'claude'
                    CHECK (source IN ('claude', 'local')),
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at        TIMESTAMPTZ NOT NULL
);

CREATE INDEX idx_match_cache_emotion_expires
  ON match_cache (emotion, expires_at DESC);

ALTER TABLE match_cache ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read cache"
  ON match_cache FOR SELECT
  USING (auth.role() = 'authenticated');

-- No insert/update/delete policies = only service_role can write

-- =============================================================
-- 5. completions (challenge completion log)
-- =============================================================
CREATE TABLE completions (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  saint_id          TEXT NOT NULL,
  micro_action_id   TEXT NOT NULL,
  emotion_selected  TEXT NOT NULL
                    CHECK (emotion_selected IN ('anxious','overwhelmed','scattered','impatient','frustrated','peaceful')),
  saint_name        TEXT NOT NULL,
  action_text       TEXT NOT NULL,
  date_completed    DATE NOT NULL,
  completed_at      TIMESTAMPTZ NOT NULL DEFAULT now(),

  UNIQUE(user_id, date_completed)
);

ALTER TABLE completions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own completions"
  ON completions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own completions"
  ON completions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- =============================================================
-- 6. streaks (one row per user)
-- =============================================================
CREATE TABLE streaks (
  user_id                       UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  current_streak                INTEGER NOT NULL DEFAULT 0,
  longest_streak                INTEGER NOT NULL DEFAULT 0,
  last_completion_date          DATE,
  streak_freezes_used_this_week INTEGER NOT NULL DEFAULT 0,
  updated_at                    TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE streaks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own streak"
  ON streaks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own streak"
  ON streaks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own streak"
  ON streaks FOR UPDATE USING (auth.uid() = user_id);

CREATE TRIGGER streaks_updated_at
  BEFORE UPDATE ON streaks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================================
-- 7. active_challenges (one row per user, replaced daily)
-- =============================================================
CREATE TABLE active_challenges (
  user_id     UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  match_data  JSONB NOT NULL,
  accepted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed   BOOLEAN NOT NULL DEFAULT false,
  date_for    DATE NOT NULL DEFAULT CURRENT_DATE,
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE active_challenges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own challenge"
  ON active_challenges FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own challenge"
  ON active_challenges FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own challenge"
  ON active_challenges FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own challenge"
  ON active_challenges FOR DELETE USING (auth.uid() = user_id);

CREATE TRIGGER active_challenges_updated_at
  BEFORE UPDATE ON active_challenges
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================================
-- 8. patience_scores (weekly self-assessment)
-- =============================================================
CREATE TABLE patience_scores (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  score       INTEGER NOT NULL CHECK (score >= 1 AND score <= 5),
  week_ending DATE NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),

  UNIQUE(user_id, week_ending)
);

ALTER TABLE patience_scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own scores"
  ON patience_scores FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own scores"
  ON patience_scores FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own scores"
  ON patience_scores FOR UPDATE USING (auth.uid() = user_id);

-- =============================================================
-- 9. Trigger: auto-create profile + streak on user signup
-- =============================================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email)
  VALUES (NEW.id, NEW.email);

  INSERT INTO streaks (user_id)
  VALUES (NEW.id);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
