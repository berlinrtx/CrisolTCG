-- Script para diagnosticar y corregir errores de autenticación en Supabase
-- Basado en: https://supabase.com/docs/guides/troubleshooting/resolving-500-status-authentication-errors

-- 1. Verificar triggers en auth.users que puedan estar causando problemas
SELECT 
  trigger_name,
  event_manipulation,
  event_object_table,
  action_statement
FROM information_schema.triggers
WHERE event_object_schema = 'auth'
  AND event_object_table = 'users';

-- 2. Eliminar el trigger problemático handle_new_user si existe
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- 3. Verificar constraints de foreign key en auth.users
SELECT
  tc.constraint_name,
  tc.table_name,
  kcu.column_name,
  ccu.table_name AS foreign_table_name,
  ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
WHERE tc.table_schema = 'auth'
  AND tc.table_name = 'users'
  AND tc.constraint_type = 'FOREIGN KEY';

-- 4. Verificar que supabase_auth_admin tenga los permisos correctos
SELECT 
  grantee,
  table_schema,
  table_name,
  privilege_type
FROM information_schema.role_table_grants
WHERE grantee = 'supabase_auth_admin'
  AND table_schema = 'auth'
  AND table_name = 'users';

-- 5. Eliminar cualquier foreign key constraint desde profiles hacia auth.users
-- (esto puede estar bloqueando el login)
DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 
    FROM information_schema.table_constraints 
    WHERE constraint_name = 'profiles_id_fkey' 
      AND table_name = 'profiles'
  ) THEN
    ALTER TABLE public.profiles DROP CONSTRAINT profiles_id_fkey;
    RAISE NOTICE 'Constraint profiles_id_fkey dropped';
  END IF;
END $$;

-- 6. Recrear la foreign key constraint de forma que no bloquee auth
ALTER TABLE public.profiles
ADD CONSTRAINT profiles_id_fkey 
FOREIGN KEY (id) 
REFERENCES auth.users(id) 
ON DELETE CASCADE;

-- 7. Verificar que el usuario test@crisol.com tenga email_confirmed_at
UPDATE auth.users
SET email_confirmed_at = COALESCE(email_confirmed_at, NOW())
WHERE email = 'test@crisol.com'
  AND email_confirmed_at IS NULL;

-- 8. Asegurar que el perfil del usuario existe
INSERT INTO public.profiles (
  id,
  email,
  first_name,
  last_name,
  username,
  role,
  seller_tier,
  email_verified
)
SELECT 
  u.id,
  u.email,
  'Usuario',
  'Prueba',
  'testuser',
  'buyer',
  'basic',
  true
FROM auth.users u
WHERE u.email = 'test@crisol.com'
  AND NOT EXISTS (
    SELECT 1 FROM public.profiles p WHERE p.id = u.id
  );

-- Mensaje final
SELECT 'Diagnóstico completado. Intenta hacer login nuevamente.' as message;
