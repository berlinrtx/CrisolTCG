-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. GAMES (Juegos)
-- Tabla maestra de juegos (Magic, Pokemon, Yugioh, etc.)
CREATE TABLE IF NOT EXISTS games (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE, -- 'Magic: The Gathering', 'Pokémon TCG'
    slug TEXT NOT NULL UNIQUE, -- 'mtg', 'pokemon'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. SETS (Expansiones)
-- Vinculado a un juego específico
CREATE TABLE IF NOT EXISTS sets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    game_id UUID REFERENCES games(id) ON DELETE CASCADE NOT NULL,
    code TEXT NOT NULL, -- 'LOB', 'PFL'
    name TEXT NOT NULL, -- 'Legend of Blue Eyes', 'Paldea Evolved'
    release_date DATE,
    total_cards INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(game_id, code)
);

-- 3. GAME RARITIES (Rarezas del Juego)
-- Específico por juego (Mythic Rare es de Magic, Secret Rare es de Yugioh)
CREATE TABLE IF NOT EXISTS game_rarities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    game_id UUID REFERENCES games(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL, -- 'Common', 'Rare', 'Secret Rare'
    slug TEXT NOT NULL,
    ranking INTEGER DEFAULT 0, -- Para ordenar por importancia
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(game_id, name)
);

-- 4. FINISHES (Acabados) - AHORA ESPECÍFICO POR JUEGO
-- El brillo físico (Foil, Reverse Holo, Ghost Rare)
CREATE TABLE IF NOT EXISTS finishes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    game_id UUID REFERENCES games(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL, -- 'Foil', 'Non-Foil', 'Reverse Holo'
    slug TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(game_id, name)
);

-- 5. TREATMENTS (Tratamientos) - AHORA ESPECÍFICO POR JUEGO
-- El estilo visual (Borderless, Showcase, Full Art)
CREATE TABLE IF NOT EXISTS treatments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    game_id UUID REFERENCES games(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL, -- 'Standard', 'Borderless', 'Showcase'
    slug TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(game_id, name)
);

-- 6. LANGUAGES (Idiomas)
-- Esto SÍ puede ser global (Inglés es Inglés en todos lados)
CREATE TABLE IF NOT EXISTS languages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT NOT NULL UNIQUE, -- 'en', 'es', 'jp'
    name TEXT NOT NULL
);

-- 7. CARDS (Cartas - Información Base)
-- La información abstracta de la carta (Nombre, Texto, Tipo)
CREATE TABLE IF NOT EXISTS cards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    set_id UUID REFERENCES sets(id) ON DELETE CASCADE NOT NULL,
    game_id UUID REFERENCES games(id) ON DELETE CASCADE NOT NULL, -- Redundante pero útil para queries rápidos
    
    name TEXT NOT NULL, -- 'Charizard', 'Black Lotus'
    card_number TEXT NOT NULL, -- '001/102', 'LOB-001'
    
    -- Datos flexibles por juego (Fase, Energía, Atributo, Tipo de Monstruo)
    -- Ejemplo Pokemon: {"stage": "Stage 2", "hp": 120, "types": ["Fire"]}
    -- Ejemplo Yugioh: {"level": 8, "attribute": "LIGHT", "monster_type": "Dragon"}
    metadata JSONB DEFAULT '{}'::jsonb,
    
    image_url TEXT, -- Imagen base (opcional)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(set_id, card_number)
);

-- 8. CARD PRINTINGS (Variantes Físicas - SKU)
-- La combinación exacta que se vende: Carta + Rareza + Acabado + Tratamiento + Idioma
CREATE TABLE IF NOT EXISTS card_printings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    card_id UUID REFERENCES cards(id) ON DELETE CASCADE NOT NULL,
    
    rarity_id UUID REFERENCES game_rarities(id) ON DELETE RESTRICT NOT NULL,
    finish_id UUID REFERENCES finishes(id) ON DELETE RESTRICT NOT NULL,
    treatment_id UUID REFERENCES treatments(id) ON DELETE RESTRICT NOT NULL,
    language_id UUID REFERENCES languages(id) ON DELETE RESTRICT NOT NULL,
    
    image_url TEXT, -- Imagen específica de esta variante (ej. Charizard Foil se ve diferente)
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(card_id, rarity_id, finish_id, treatment_id, language_id)
);

-- 9. LISTINGS (Inventario de Vendedores)
-- Lo que realmente se vende en el marketplace
CREATE TABLE IF NOT EXISTS listings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    seller_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    printing_id UUID REFERENCES card_printings(id) ON DELETE RESTRICT NOT NULL,
    
    condition TEXT NOT NULL CHECK (condition IN ('NM', 'LP', 'MP', 'HP', 'DMG')),
    price DECIMAL(10, 2) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    
    images TEXT[], -- Fotos reales del vendedor (opcional)
    description TEXT,
    
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'sold', 'inactive')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- DATA SEEDING (Datos Iniciales)

-- 1. Insertar Juegos
INSERT INTO games (name, slug) VALUES 
('Magic: The Gathering', 'mtg'),
('Pokémon TCG', 'pokemon'),
('Yu-Gi-Oh!', 'yugioh'),
('One Piece TCG', 'one-piece')
ON CONFLICT (slug) DO NOTHING;

-- 2. Insertar Idiomas
INSERT INTO languages (code, name) VALUES 
('en', 'English'),
('es', 'Español'),
('jp', 'Japanese')
ON CONFLICT (code) DO NOTHING;

-- 3. Insertar Rarezas, Acabados y Tratamientos (Ejemplos por juego)
DO $$
DECLARE
    mtg_id UUID;
    pkm_id UUID;
    ygo_id UUID;
BEGIN
    SELECT id INTO mtg_id FROM games WHERE slug = 'mtg';
    SELECT id INTO pkm_id FROM games WHERE slug = 'pokemon';
    SELECT id INTO ygo_id FROM games WHERE slug = 'yugioh';

    -- MAGIC
    INSERT INTO game_rarities (game_id, name, slug, ranking) VALUES 
    (mtg_id, 'Common', 'common', 1),
    (mtg_id, 'Uncommon', 'uncommon', 2),
    (mtg_id, 'Rare', 'rare', 3),
    (mtg_id, 'Mythic Rare', 'mythic', 4)
    ON CONFLICT DO NOTHING;

    INSERT INTO finishes (game_id, name, slug) VALUES 
    (mtg_id, 'Non-Foil', 'non-foil'),
    (mtg_id, 'Foil', 'foil'),
    (mtg_id, 'Etched Foil', 'etched-foil')
    ON CONFLICT DO NOTHING;

    INSERT INTO treatments (game_id, name, slug) VALUES 
    (mtg_id, 'Standard', 'standard'),
    (mtg_id, 'Borderless', 'borderless'),
    (mtg_id, 'Showcase', 'showcase')
    ON CONFLICT DO NOTHING;

    -- POKEMON
    INSERT INTO game_rarities (game_id, name, slug, ranking) VALUES 
    (pkm_id, 'Common', 'common', 1),
    (pkm_id, 'Uncommon', 'uncommon', 2),
    (pkm_id, 'Rare', 'rare', 3),
    (pkm_id, 'Double Rare', 'double-rare', 4),
    (pkm_id, 'Illustration Rare', 'illustration-rare', 5)
    ON CONFLICT DO NOTHING;

    INSERT INTO finishes (game_id, name, slug) VALUES 
    (pkm_id, 'Normal', 'normal'),
    (pkm_id, 'Holo', 'holo'),
    (pkm_id, 'Reverse Holo', 'reverse-holo')
    ON CONFLICT DO NOTHING;

    INSERT INTO treatments (game_id, name, slug) VALUES 
    (pkm_id, 'Standard', 'standard'),
    (pkm_id, 'Full Art', 'full-art'),
    (pkm_id, 'Galarian Gallery', 'galarian-gallery')
    ON CONFLICT DO NOTHING;

    -- YUGIOH
    INSERT INTO game_rarities (game_id, name, slug, ranking) VALUES 
    (ygo_id, 'Common', 'common', 1),
    (ygo_id, 'Super Rare', 'super-rare', 2),
    (ygo_id, 'Ultra Rare', 'ultra-rare', 3),
    (ygo_id, 'Secret Rare', 'secret-rare', 4)
    ON CONFLICT DO NOTHING;

    INSERT INTO finishes (game_id, name, slug) VALUES 
    (ygo_id, 'Standard', 'standard'),
    (ygo_id, 'Foil', 'foil') -- Yugioh suele manejar el brillo en la rareza, pero a veces hay variantes
    ON CONFLICT DO NOTHING;

    INSERT INTO treatments (game_id, name, slug) VALUES 
    (ygo_id, 'Standard', 'standard'),
    (ygo_id, 'Alternative Art', 'alt-art')
    ON CONFLICT DO NOTHING;

END $$;
