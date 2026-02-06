-- Saint Match: Production Hardening Migration
-- Run in Supabase SQL Editor or via `supabase db push`

-- =============================================================
-- 1. Atomic usage increment (fixes TOCTOU race condition)
-- =============================================================
-- Two concurrent requests could both read count=2 and both increment to 3,
-- allowing 4 matches instead of 3. This RPC does INSERT ... ON CONFLICT
-- with a WHERE guard in a single atomic statement.

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
  -- Try to insert a new row for this user+week with count=1.
  -- If the row already exists, atomically increment only if under the limit.
  INSERT INTO usage (user_id, matches_used_this_week, weekly_limit, week_start, reset_at)
  VALUES (p_user_id, 1, p_weekly_limit, p_week_start, p_reset_at)
  ON CONFLICT (user_id, week_start)
  DO UPDATE SET matches_used_this_week = usage.matches_used_this_week + 1
  WHERE usage.matches_used_this_week < p_weekly_limit
  RETURNING matches_used_this_week INTO v_count;

  -- If FOUND is false, the WHERE clause prevented the update (limit reached)
  RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================================
-- 2. Missing indexes for query performance
-- =============================================================
-- completions and patience_scores are queried by user_id on every sync.
-- usage is queried by (user_id, week_start) but the UNIQUE constraint
-- already covers that — adding an explicit index for clarity.

CREATE INDEX IF NOT EXISTS idx_completions_user_id
  ON completions(user_id);

CREATE INDEX IF NOT EXISTS idx_patience_scores_user_id
  ON patience_scores(user_id);

CREATE INDEX IF NOT EXISTS idx_usage_user_week
  ON usage(user_id, week_start);

-- =============================================================
-- 3. Missing DELETE RLS policy on completions
-- =============================================================
-- deleteUserAccount() needs to delete completions via the client.
-- Without this policy, those deletes silently fail.

CREATE POLICY "Users can delete own completions"
  ON completions FOR DELETE USING (auth.uid() = user_id);

-- Also add DELETE policies for patience_scores and usage
-- (same reason — account deletion cleanup)

CREATE POLICY "Users can delete own patience_scores"
  ON patience_scores FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own usage"
  ON usage FOR DELETE USING (auth.uid() = user_id);

-- =============================================================
-- 4. Cache cleanup function for expired match_cache entries
-- =============================================================
-- The match_cache table grows indefinitely. This function purges
-- expired entries. Call it periodically via pg_cron or manually.

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

-- Optional: If pg_cron is enabled, schedule daily cleanup at 3 AM UTC
-- SELECT cron.schedule('cleanup-match-cache', '0 3 * * *', 'SELECT cleanup_expired_cache()');
