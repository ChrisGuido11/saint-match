-- Keyword cache for Claude-extracted semantic keywords
-- Enables cross-user intelligence: similar inputs get keyword hints

-- Create keyword_cache table
CREATE TABLE IF NOT EXISTS keyword_cache (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  input_hash      TEXT UNIQUE NOT NULL,          -- SHA-256 of normalized input
  input_text      TEXT NOT NULL,                  -- normalized input (for debugging)
  keywords        TEXT[] NOT NULL DEFAULT '{}',   -- 3-8 semantic keywords from Claude
  source          TEXT NOT NULL DEFAULT 'saint-match', -- 'saint-match' or 'novena'
  hit_count       INTEGER NOT NULL DEFAULT 1,     -- popularity counter
  last_hit_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- GIN index for array overlap queries (find similar inputs by shared keywords)
CREATE INDEX IF NOT EXISTS idx_keyword_cache_keywords ON keyword_cache USING GIN (keywords);

-- Index for cleanup (evict stale, low-value entries)
CREATE INDEX IF NOT EXISTS idx_keyword_cache_last_hit ON keyword_cache (last_hit_at);

-- Index for source filtering
CREATE INDEX IF NOT EXISTS idx_keyword_cache_source ON keyword_cache (source);

-- RLS: authenticated users can read, only service_role can write
ALTER TABLE keyword_cache ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'keyword_cache' AND policyname = 'keyword_cache_select'
  ) THEN
    CREATE POLICY keyword_cache_select ON keyword_cache FOR SELECT TO authenticated USING (true);
  END IF;
END$$;

-- Cleanup function: bound at 10,000 rows
-- Eviction priority: single-hit entries older than 30 days first, then lowest-value entries
CREATE OR REPLACE FUNCTION cleanup_keyword_cache()
RETURNS INTEGER AS $$
DECLARE
  row_count INTEGER;
  deleted INTEGER := 0;
BEGIN
  SELECT count(*) INTO row_count FROM keyword_cache;

  -- Only cleanup if over 10,000 rows
  IF row_count <= 10000 THEN
    RETURN 0;
  END IF;

  -- Phase 1: Delete single-hit entries older than 30 days
  DELETE FROM keyword_cache
  WHERE hit_count = 1
    AND last_hit_at < now() - INTERVAL '30 days';
  GET DIAGNOSTICS deleted = ROW_COUNT;

  -- Check if we're under the limit now
  SELECT count(*) INTO row_count FROM keyword_cache;
  IF row_count <= 10000 THEN
    RETURN deleted;
  END IF;

  -- Phase 2: Delete lowest-value entries (low hit_count, oldest last_hit)
  -- Keep the top 10,000 by value score
  WITH ranked AS (
    SELECT id,
           ROW_NUMBER() OVER (ORDER BY hit_count DESC, last_hit_at DESC) as rn
    FROM keyword_cache
  )
  DELETE FROM keyword_cache
  WHERE id IN (SELECT id FROM ranked WHERE rn > 10000);

  GET DIAGNOSTICS row_count = ROW_COUNT;
  RETURN deleted + row_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop the write-only match_cache table (never read, replaced by keyword_cache)
DROP TABLE IF EXISTS match_cache;

-- Remove the match_cache constraint fix from migration 010 (table no longer exists)
-- The completions constraint fix remains valid
