-- ==============================================================================
-- VALLE SILENS ATELIER — SUPABASE POSTGRESQL SCHEMA & RLS POLICIES
-- ==============================================================================

-- 1. Create Properties Table
CREATE TABLE IF NOT EXISTS public.properties (
  id TEXT PRIMARY KEY,
  ref_code TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  tagline TEXT,
  category TEXT NOT NULL CHECK (category IN ('residential', 'land', 'commercial')),
  subcategory TEXT NOT NULL,
  listing_type TEXT NOT NULL CHECK (listing_type IN ('sale', 'rent', 'lease')),
  status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'under_offer', 'sold', 'rented', 'reserved', 'off_market')),
  is_published BOOLEAN NOT NULL DEFAULT true,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  price NUMERIC NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'EUR',
  price_guide TEXT NOT NULL,
  price_per_sq_ft NUMERIC,
  location TEXT NOT NULL,
  city TEXT NOT NULL,
  country TEXT NOT NULL,
  address TEXT,
  location_details JSONB NOT NULL DEFAULT '{}'::jsonb,
  year_built TEXT,
  architect TEXT,
  materials TEXT[] DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  amenities TEXT[] DEFAULT '{}',
  description TEXT NOT NULL,
  long_description TEXT,
  neighborhood_insights TEXT,
  residential_specs JSONB,
  land_specs JSONB,
  commercial_specs JSONB,
  media JSONB NOT NULL DEFAULT '{"gallery": []}'::jsonb,
  views_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Create Inquiries Table
CREATE TABLE IF NOT EXISTS public.inquiries (
  id TEXT PRIMARY KEY,
  ref_number TEXT NOT NULL UNIQUE,
  patron_name TEXT NOT NULL,
  email TEXT NOT NULL,
  country_code TEXT DEFAULT '+41',
  phone TEXT,
  preferred_contact_method TEXT NOT NULL DEFAULT 'Private Call',
  property_id TEXT REFERENCES public.properties(id) ON DELETE SET NULL,
  property_title TEXT,
  property_category TEXT,
  desired_location TEXT,
  budget_range TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'contacted', 'closed')),
  admin_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Optimized Indices for High-Speed Filtering & Search
CREATE INDEX IF NOT EXISTS idx_properties_category ON public.properties (category);
CREATE INDEX IF NOT EXISTS idx_properties_status ON public.properties (status);
CREATE INDEX IF NOT EXISTS idx_properties_city ON public.properties (city);
CREATE INDEX IF NOT EXISTS idx_properties_published ON public.properties (is_published);
CREATE INDEX IF NOT EXISTS idx_properties_featured ON public.properties (is_featured);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON public.inquiries (status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON public.inquiries (created_at DESC);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies for Properties
-- Public can read all published properties
CREATE POLICY "Public can view published properties"
  ON public.properties FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

-- Allow authenticated users or full access for management
CREATE POLICY "Service and authenticated users have full access to properties"
  ON public.properties FOR ALL
  TO authenticated, service_role
  USING (true)
  WITH CHECK (true);

-- 6. RLS Policies for Inquiries
-- Public visitors can submit private inquiries
CREATE POLICY "Public can submit inquiries"
  ON public.inquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Authenticated managers can view and update inquiries
CREATE POLICY "Authenticated users can view and manage inquiries"
  ON public.inquiries FOR ALL
  TO authenticated, service_role
  USING (true)
  WITH CHECK (true);
