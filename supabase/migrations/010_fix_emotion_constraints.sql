-- Fix CHECK constraints: replace 'impatient'/'frustrated' with 'grateful'/'joyful'
-- to match the client-side Emotion type definition.
-- The original 009 migration has been corrected, but the live database
-- was deployed with the wrong values.

-- Fix match_cache.emotion CHECK constraint
ALTER TABLE match_cache DROP CONSTRAINT IF EXISTS match_cache_emotion_check;
ALTER TABLE match_cache ADD CONSTRAINT match_cache_emotion_check
CHECK (emotion IN ('anxious', 'overwhelmed', 'scattered', 'grateful', 'joyful', 'peaceful'));

-- Fix completions.emotion_selected CHECK constraint
ALTER TABLE completions DROP CONSTRAINT IF EXISTS completions_emotion_selected_check;
ALTER TABLE completions ADD CONSTRAINT completions_emotion_selected_check
CHECK (emotion_selected IN ('anxious', 'overwhelmed', 'scattered', 'grateful', 'joyful', 'peaceful'));
