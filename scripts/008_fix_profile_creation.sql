-- Eliminar políticas RLS existentes problemáticas
DROP POLICY IF EXISTS "Service role can insert profiles" ON profiles;
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Public can read basic profile info" ON profiles;

-- Crear políticas RLS correctas para permitir a usuarios autenticados manejar sus propios perfiles
-- 1. Permitir a usuarios autenticados insertar su propio perfil
CREATE POLICY "Users can insert own profile"
ON profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- 2. Permitir a usuarios autenticados leer su propio perfil completo
CREATE POLICY "Users can read own profile"
ON profiles FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- 3. Permitir lectura pública de información básica de perfiles
CREATE POLICY "Public can read basic profile info"
ON profiles FOR SELECT
TO anon
USING (true);

-- 4. Permitir a usuarios actualizar su propio perfil
CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Recrear función para auto-crear perfil con valores válidos según el constraint
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    email,
    first_name,
    last_name,
    username,
    email_verified,
    role,
    seller_tier,
    is_active,
    max_active_listings,
    total_sales,
    seller_rating,
    total_reviews,
    trust_score,
    is_seller_verified,
    verified_id,
    phone_verified,
    created_at,
    updated_at,
    last_login_at
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    CASE WHEN NEW.email_confirmed_at IS NOT NULL THEN true ELSE false END,
    'buyer',
    'basic', -- Usar 'basic' en lugar de 'none' para cumplir con el constraint
    true,
    10, -- Valor por defecto de 10 listings según el esquema original
    0,
    0.00,
    0,
    0,
    false,
    false,
    false,
    NOW(),
    NOW(),
    NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recrear trigger que ejecuta la función cuando se crea un nuevo usuario
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Asegurar que el usuario de prueba existente tenga un perfil válido
INSERT INTO public.profiles (
  id,
  email,
  first_name,
  last_name,
  username,
  email_verified,
  role,
  seller_tier,
  is_active,
  max_active_listings,
  total_sales,
  seller_rating,
  total_reviews,
  trust_score,
  is_seller_verified,
  verified_id,
  phone_verified,
  created_at,
  updated_at,
  last_login_at
)
SELECT 
  u.id,
  u.email,
  'Usuario',
  'Prueba',
  'testuser',
  true,
  'buyer',
  'basic', -- Usar 'basic' en lugar de 'none'
  true,
  10,
  0,
  0.00,
  0,
  0,
  false,
  false,
  false,
  NOW(),
  NOW(),
  NOW()
FROM auth.users u
WHERE u.email = 'test@crisol.com'
ON CONFLICT (id) DO UPDATE SET
  first_name = 'Usuario',
  last_name = 'Prueba',
  username = 'testuser',
  email_verified = true,
  seller_tier = 'basic',
  updated_at = NOW();
