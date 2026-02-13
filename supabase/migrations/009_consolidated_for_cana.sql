  -- =============================================================
  -- Saint Match: Consolidated Schema for Cana-Covenant Project
  -- Combines migrations 001-008 into a single idempotent script.
  -- Run in Supabase SQL Editor on zeskhorwddxyjhhnpgsa.
  -- =============================================================

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
  CREATE TABLE IF NOT EXISTS profiles (
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

  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can view own profile') THEN
      CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can update own profile') THEN
      CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can insert own profile') THEN
      CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
    END IF;
  END$$;

  CREATE TRIGGER profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

  -- =============================================================
  -- 3. usage (weekly match count, one row per user per week)
  -- =============================================================
  CREATE TABLE IF NOT EXISTS usage (
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

  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'usage' AND policyname = 'Users can view own usage') THEN
      CREATE POLICY "Users can view own usage" ON usage FOR SELECT USING (auth.uid() = user_id);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'usage' AND policyname = 'Users can insert own usage') THEN
      CREATE POLICY "Users can insert own usage" ON usage FOR INSERT WITH CHECK (auth.uid() = user_id);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'usage' AND policyname = 'Users can update own usage') THEN
      CREATE POLICY "Users can update own usage" ON usage FOR UPDATE USING (auth.uid() = user_id);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'usage' AND policyname = 'Users can delete own usage') THEN
      CREATE POLICY "Users can delete own usage" ON usage FOR DELETE USING (auth.uid() = user_id);
    END IF;
  END$$;

  -- =============================================================
  -- 4. match_cache (Claude API response cache, 6hr TTL)
  --    Writable only by service_role (Edge Functions).
  --    Readable by authenticated users.
  -- =============================================================
  CREATE TABLE IF NOT EXISTS match_cache (
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

  CREATE INDEX IF NOT EXISTS idx_match_cache_emotion_expires
    ON match_cache (emotion, expires_at DESC);

  ALTER TABLE match_cache ENABLE ROW LEVEL SECURITY;

  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'match_cache' AND policyname = 'Authenticated users can read cache') THEN
      CREATE POLICY "Authenticated users can read cache" ON match_cache FOR SELECT USING (auth.role() = 'authenticated');
    END IF;
  END$$;

  -- =============================================================
  -- 5. completions (challenge completion log)
  -- =============================================================
  CREATE TABLE IF NOT EXISTS completions (
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

  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'completions' AND policyname = 'Users can view own completions') THEN
      CREATE POLICY "Users can view own completions" ON completions FOR SELECT USING (auth.uid() = user_id);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'completions' AND policyname = 'Users can insert own completions') THEN
      CREATE POLICY "Users can insert own completions" ON completions FOR INSERT WITH CHECK (auth.uid() = user_id);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'completions' AND policyname = 'Users can delete own completions') THEN
      CREATE POLICY "Users can delete own completions" ON completions FOR DELETE USING (auth.uid() = user_id);
    END IF;
  END$$;

  -- =============================================================
  -- 6. streaks (one row per user)
  -- =============================================================
  CREATE TABLE IF NOT EXISTS streaks (
    user_id                       UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    current_streak                INTEGER NOT NULL DEFAULT 0,
    longest_streak                INTEGER NOT NULL DEFAULT 0,
    last_completion_date          DATE,
    streak_freezes_used_this_week INTEGER NOT NULL DEFAULT 0,
    updated_at                    TIMESTAMPTZ NOT NULL DEFAULT now()
  );

  ALTER TABLE streaks ENABLE ROW LEVEL SECURITY;

  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'streaks' AND policyname = 'Users can view own streak') THEN
      CREATE POLICY "Users can view own streak" ON streaks FOR SELECT USING (auth.uid() = user_id);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'streaks' AND policyname = 'Users can insert own streak') THEN
      CREATE POLICY "Users can insert own streak" ON streaks FOR INSERT WITH CHECK (auth.uid() = user_id);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'streaks' AND policyname = 'Users can update own streak') THEN
      CREATE POLICY "Users can update own streak" ON streaks FOR UPDATE USING (auth.uid() = user_id);
    END IF;
  END$$;

  CREATE TRIGGER streaks_updated_at
    BEFORE UPDATE ON streaks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

  -- =============================================================
  -- 7. active_challenges (one row per user, replaced daily)
  -- =============================================================
  CREATE TABLE IF NOT EXISTS active_challenges (
    user_id     UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    match_data  JSONB NOT NULL,
    accepted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    completed   BOOLEAN NOT NULL DEFAULT false,
    date_for    DATE NOT NULL DEFAULT CURRENT_DATE,
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
  );

  ALTER TABLE active_challenges ENABLE ROW LEVEL SECURITY;

  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'active_challenges' AND policyname = 'Users can view own challenge') THEN
      CREATE POLICY "Users can view own challenge" ON active_challenges FOR SELECT USING (auth.uid() = user_id);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'active_challenges' AND policyname = 'Users can insert own challenge') THEN
      CREATE POLICY "Users can insert own challenge" ON active_challenges FOR INSERT WITH CHECK (auth.uid() = user_id);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'active_challenges' AND policyname = 'Users can update own challenge') THEN
      CREATE POLICY "Users can update own challenge" ON active_challenges FOR UPDATE USING (auth.uid() = user_id);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'active_challenges' AND policyname = 'Users can delete own challenge') THEN
      CREATE POLICY "Users can delete own challenge" ON active_challenges FOR DELETE USING (auth.uid() = user_id);
    END IF;
  END$$;

  CREATE TRIGGER active_challenges_updated_at
    BEFORE UPDATE ON active_challenges
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

  -- =============================================================
  -- 8. patience_scores (weekly self-assessment)
  -- =============================================================
  CREATE TABLE IF NOT EXISTS patience_scores (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    score       INTEGER NOT NULL CHECK (score >= 1 AND score <= 5),
    week_ending DATE NOT NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),

    UNIQUE(user_id, week_ending)
  );

  ALTER TABLE patience_scores ENABLE ROW LEVEL SECURITY;

  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'patience_scores' AND policyname = 'Users can view own scores') THEN
      CREATE POLICY "Users can view own scores" ON patience_scores FOR SELECT USING (auth.uid() = user_id);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'patience_scores' AND policyname = 'Users can insert own scores') THEN
      CREATE POLICY "Users can insert own scores" ON patience_scores FOR INSERT WITH CHECK (auth.uid() = user_id);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'patience_scores' AND policyname = 'Users can update own scores') THEN
      CREATE POLICY "Users can update own scores" ON patience_scores FOR UPDATE USING (auth.uid() = user_id);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'patience_scores' AND policyname = 'Users can delete own patience_scores') THEN
      CREATE POLICY "Users can delete own patience_scores" ON patience_scores FOR DELETE USING (auth.uid() = user_id);
    END IF;
  END$$;

  -- =============================================================
  -- 9. user_novenas (novena tracking, with generated_prayers + saint_name inline)
  -- =============================================================
  CREATE TABLE IF NOT EXISTS user_novenas (
    id TEXT PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    novena_id TEXT NOT NULL,
    saint_id TEXT NOT NULL,
    saint_name TEXT,
    current_day INTEGER DEFAULT 1 CHECK (current_day >= 1 AND current_day <= 9),
    completed_days BOOLEAN[] DEFAULT ARRAY[false,false,false,false,false,false,false,false,false],
    personal_intention TEXT,
    started_at TIMESTAMPTZ DEFAULT NOW(),
    last_prayer_date DATE,
    completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMPTZ,
    reflection TEXT,
    generated_prayers JSONB,
    updated_at TIMESTAMPTZ DEFAULT NOW()
  );

  ALTER TABLE user_novenas ENABLE ROW LEVEL SECURITY;

  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'user_novenas' AND policyname = 'Users can manage own novenas') THEN
      CREATE POLICY "Users can manage own novenas" ON user_novenas FOR ALL USING (auth.uid() = user_id);
    END IF;
  END$$;

  CREATE INDEX IF NOT EXISTS idx_user_novenas_active ON user_novenas(user_id) WHERE completed = false;
  CREATE INDEX IF NOT EXISTS idx_user_novenas_user ON user_novenas(user_id);

  -- =============================================================
  -- 10. novena_catalog (browseable novena metadata)
  -- =============================================================
  CREATE TABLE IF NOT EXISTS novena_catalog (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'saints',
    source_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
  );

  CREATE INDEX IF NOT EXISTS idx_novena_catalog_category ON novena_catalog(category);
  CREATE INDEX IF NOT EXISTS idx_novena_catalog_title ON novena_catalog USING gin(to_tsvector('english', title));

  ALTER TABLE novena_catalog ENABLE ROW LEVEL SECURITY;

  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'novena_catalog' AND policyname = 'Anyone can read catalog') THEN
      CREATE POLICY "Anyone can read catalog" ON novena_catalog FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'novena_catalog' AND policyname = 'Service role can manage catalog') THEN
      CREATE POLICY "Service role can manage catalog" ON novena_catalog FOR ALL USING (auth.role() = 'service_role');
    END IF;
  END$$;

  -- =============================================================
  -- 11. novena_intent_matches (AI patron saint matching cache)
  -- =============================================================
  CREATE TABLE IF NOT EXISTS novena_intent_matches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    intention_normalized TEXT UNIQUE NOT NULL,
    patron_saint TEXT NOT NULL,
    saint_bio TEXT,
    match_reason TEXT,
    novena_slug TEXT,
    novena_title TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
  );

  ALTER TABLE novena_intent_matches ENABLE ROW LEVEL SECURITY;

  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'novena_intent_matches' AND policyname = 'Anyone can read intent matches') THEN
      CREATE POLICY "Anyone can read intent matches" ON novena_intent_matches FOR SELECT USING (true);
    END IF;
  END$$;

  -- =============================================================
  -- 12. Performance indexes (from production hardening)
  -- =============================================================
  CREATE INDEX IF NOT EXISTS idx_completions_user_id ON completions(user_id);
  CREATE INDEX IF NOT EXISTS idx_patience_scores_user_id ON patience_scores(user_id);
  CREATE INDEX IF NOT EXISTS idx_usage_user_week ON usage(user_id, week_start);

  -- =============================================================
  -- 13. Atomic usage increment RPC (fixes TOCTOU race condition)
  -- =============================================================
  CREATE OR REPLACE FUNCTION increment_usage(
    p_user_id UUID,
    p_week_start DATE,
    p_reset_at TIMESTAMPTZ,
    p_weekly_limit INTEGER DEFAULT 3
  )
  RETURNS BOOLEAN AS $$
  DECLARE
    v_count INTEGER;
  BEGIN
    INSERT INTO usage (user_id, matches_used_this_week, weekly_limit, week_start, reset_at)
    VALUES (p_user_id, 1, p_weekly_limit, p_week_start, p_reset_at)
    ON CONFLICT (user_id, week_start)
    DO UPDATE SET matches_used_this_week = usage.matches_used_this_week + 1
    WHERE usage.matches_used_this_week < p_weekly_limit
    RETURNING matches_used_this_week INTO v_count;

    RETURN FOUND;
  END;
  $$ LANGUAGE plpgsql SECURITY DEFINER;

  -- =============================================================
  -- 14. Cache cleanup function
  -- =============================================================
  CREATE OR REPLACE FUNCTION cleanup_expired_cache()
  RETURNS INTEGER AS $$
  DECLARE
    deleted_count INTEGER;
  BEGIN
    DELETE FROM match_cache
    WHERE expires_at < now();

    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RETURN deleted_count;
  END;
  $$ LANGUAGE plpgsql SECURITY DEFINER;

  -- =============================================================
  -- 15. Trigger: auto-create profile + streak on user signup
  --     Uses ON CONFLICT to handle edge cases gracefully.
  -- =============================================================
  CREATE OR REPLACE FUNCTION handle_new_user()
  RETURNS TRIGGER AS $$
  BEGIN
    INSERT INTO profiles (id, email)
    VALUES (NEW.id, NEW.email)
    ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email;

    INSERT INTO streaks (user_id)
    VALUES (NEW.id)
    ON CONFLICT (user_id) DO NOTHING;

    RETURN NEW;
  EXCEPTION
    WHEN OTHERS THEN
      RAISE WARNING 'handle_new_user trigger error: %', SQLERRM;
      RETURN NEW;
  END;
  $$ LANGUAGE plpgsql SECURITY DEFINER;

  DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

  CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

  -- =============================================================
  -- 16. Grant permissions
  -- =============================================================
  GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;
  GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres, anon, authenticated, service_role;
  GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO postgres, anon, authenticated, service_role;
