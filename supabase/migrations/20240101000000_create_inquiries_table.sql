CREATE TABLE IF NOT EXISTS inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  pickup_location TEXT,
  pickup_date TEXT,
  service_type TEXT,
  travel_date TEXT,
  passengers INTEGER,
  trip_details TEXT,
  form_source TEXT CHECK (form_source IN ('quick_booking', 'contact_us')) NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'closed')) NOT NULL
);

ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_insert" ON inquiries
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "admin_select" ON inquiries
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "admin_update" ON inquiries
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE INDEX IF NOT EXISTS inquiries_created_at_idx ON inquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS inquiries_status_idx ON inquiries (status);
CREATE INDEX IF NOT EXISTS inquiries_source_idx ON inquiries (form_source);
