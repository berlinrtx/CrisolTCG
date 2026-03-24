-- Create categories (main menu) table
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  icon TEXT,
  color TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create subcategories (submenu) table
CREATE TABLE IF NOT EXISTS public.subcategories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(category_id, slug)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_categories_slug ON public.categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_display_order ON public.categories(display_order);
CREATE INDEX IF NOT EXISTS idx_subcategories_category_id ON public.subcategories(category_id);
CREATE INDEX IF NOT EXISTS idx_subcategories_display_order ON public.subcategories(display_order);

-- Enable RLS for security
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subcategories ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (anyone can view menus)
CREATE POLICY "Allow public read access to categories"
  ON public.categories FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access to subcategories"
  ON public.subcategories FOR SELECT
  USING (true);

-- Insert initial data (migrating from lib/categories.ts)
INSERT INTO public.categories (name, slug, icon, color, display_order) VALUES
  ('Yu-Gi-Oh!', 'yugioh', 'Flame', 'bg-red-500', 1),
  ('Magic: The Gathering', 'magic', 'Sparkles', 'bg-purple-500', 2),
  ('Pokémon', 'pokemon', 'Zap', 'bg-yellow-500', 3),
  ('One Peace', 'onepeace', 'Anchor', 'bg-blue-500', 4),
  ('Accesorios', 'accesorios', 'ShoppingBag', 'bg-green-500', 5)
ON CONFLICT (slug) DO NOTHING;

-- Insert subcategories for Yu-Gi-Oh!
INSERT INTO public.subcategories (category_id, name, slug, display_order)
SELECT id, 'Singles', 'singles', 1 FROM public.categories WHERE slug = 'yugioh'
UNION ALL
SELECT id, 'Sellado', 'sellado', 2 FROM public.categories WHERE slug = 'yugioh'
UNION ALL
SELECT id, 'Accesorios', 'accesorios', 3 FROM public.categories WHERE slug = 'yugioh'
ON CONFLICT (category_id, slug) DO NOTHING;

-- Insert subcategories for Magic
INSERT INTO public.subcategories (category_id, name, slug, display_order)
SELECT id, 'Singles', 'singles', 1 FROM public.categories WHERE slug = 'magic'
UNION ALL
SELECT id, 'Sellado', 'sellado', 2 FROM public.categories WHERE slug = 'magic'
UNION ALL
SELECT id, 'Accesorios', 'accesorios', 3 FROM public.categories WHERE slug = 'magic'
ON CONFLICT (category_id, slug) DO NOTHING;

-- Insert subcategories for Pokémon
INSERT INTO public.subcategories (category_id, name, slug, display_order)
SELECT id, 'Singles', 'singles', 1 FROM public.categories WHERE slug = 'pokemon'
UNION ALL
SELECT id, 'Sellado', 'sellado', 2 FROM public.categories WHERE slug = 'pokemon'
UNION ALL
SELECT id, 'Accesorios', 'accesorios', 3 FROM public.categories WHERE slug = 'pokemon'
ON CONFLICT (category_id, slug) DO NOTHING;

-- Insert subcategories for One Peace
INSERT INTO public.subcategories (category_id, name, slug, display_order)
SELECT id, 'Singles', 'singles', 1 FROM public.categories WHERE slug = 'onepeace'
UNION ALL
SELECT id, 'Sellado', 'sellado', 2 FROM public.categories WHERE slug = 'onepeace'
UNION ALL
SELECT id, 'Accesorios', 'accesorios', 3 FROM public.categories WHERE slug = 'onepeace'
ON CONFLICT (category_id, slug) DO NOTHING;

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to auto-update updated_at
CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON public.categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subcategories_updated_at
  BEFORE UPDATE ON public.subcategories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
