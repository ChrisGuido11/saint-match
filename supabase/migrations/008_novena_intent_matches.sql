-- AI-powered novena intent matching cache
-- Stores Claude's patron saint picks so each unique intention only calls AI once

CREATE TABLE novena_intent_matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  intention_normalized TEXT UNIQUE NOT NULL,  -- lowercased, trimmed
  patron_saint TEXT NOT NULL,
  saint_bio TEXT,
  match_reason TEXT,
  novena_slug TEXT,
  novena_title TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Public read, service_role write (same pattern as novena_catalog)
ALTER TABLE novena_intent_matches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read intent matches"
  ON novena_intent_matches FOR SELECT USING (true);
