-- Repair migration: Add missing trigger for anonymous user creation
-- This creates the trigger if it doesn't exist

-- First, ensure the function exists
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email)
  VALUES (NEW.id, NEW.email)
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO streaks (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop and recreate the trigger to ensure it's attached
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Ensure streaks table exists
CREATE TABLE IF NOT EXISTS streaks (
  user_id                       UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  current_streak                INTEGER NOT NULL DEFAULT 0,
  longest_streak                INTEGER NOT NULL DEFAULT 0,
  last_completion_date          DATE,
  streak_freezes_used_this_week INTEGER NOT NULL DEFAULT 0,
  updated_at                    TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE streaks ENABLE ROW LEVEL SECURITY;

-- Ensure RLS policies exist
DO $$
BEGIN
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
