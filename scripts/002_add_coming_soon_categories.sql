-- Add coming_soon field to categories table
ALTER TABLE public.categories ADD COLUMN IF NOT EXISTS coming_soon BOOLEAN DEFAULT false;

-- Insert Digimon category with coming_soon flag
INSERT INTO public.categories (name, slug, icon, color, display_order, coming_soon) VALUES
  ('Digimon', 'digimon', 'Zap', 'bg-cyan-500', 6, true),
  ('Riftbound', 'riftbound', 'Sparkles', 'bg-indigo-500', 7, true)
ON CONFLICT (slug) DO UPDATE SET coming_soon = true;
