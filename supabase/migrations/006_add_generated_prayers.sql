-- Add generated_prayers column to store AI-generated novena prayers
ALTER TABLE user_novenas ADD COLUMN IF NOT EXISTS generated_prayers JSONB;

-- Add saint_name column for AI-only saints that aren't in the static library
ALTER TABLE user_novenas ADD COLUMN IF NOT EXISTS saint_name TEXT;
