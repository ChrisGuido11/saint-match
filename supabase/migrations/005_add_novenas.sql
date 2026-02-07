-- 005: Add user_novenas table for novena tracking
-- Run this in Supabase SQL Editor after previous migrations

CREATE TABLE IF NOT EXISTS user_novenas (
  id TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  novena_id TEXT NOT NULL,
  saint_id TEXT NOT NULL,
  current_day INTEGER DEFAULT 1 CHECK (current_day >= 1 AND current_day <= 9),
  completed_days BOOLEAN[] DEFAULT ARRAY[false,false,false,false,false,false,false,false,false],
  personal_intention TEXT,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  last_prayer_date DATE,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  reflection TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE user_novenas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own novenas" ON user_novenas
  FOR ALL USING (auth.uid() = user_id);

CREATE INDEX idx_user_novenas_active ON user_novenas(user_id) WHERE completed = false;
CREATE INDEX idx_user_novenas_user ON user_novenas(user_id);
