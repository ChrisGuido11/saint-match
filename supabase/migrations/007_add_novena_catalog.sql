-- Novena catalog table for browseable novena metadata
CREATE TABLE IF NOT EXISTS novena_catalog (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,           -- e.g. "st-jude-novena"
  title TEXT NOT NULL,                  -- e.g. "St. Jude Novena"
  category TEXT NOT NULL DEFAULT 'saints', -- saints | marian | holy-days | intentions | other
  source_url TEXT,                      -- full URL on praymorenovenas.com
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_novena_catalog_category ON novena_catalog(category);
CREATE INDEX idx_novena_catalog_title ON novena_catalog USING gin(to_tsvector('english', title));

-- Allow all authenticated users to read
ALTER TABLE novena_catalog ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read catalog" ON novena_catalog FOR SELECT USING (true);
-- Only service_role can write (edge function uses service_role)
CREATE POLICY "Service role can manage catalog" ON novena_catalog FOR ALL USING (auth.role() = 'service_role');
