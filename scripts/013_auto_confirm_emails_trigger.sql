-- Crear una función que automáticamente confirme emails al crear usuarios (para desarrollo)
CREATE OR REPLACE FUNCTION auto_confirm_email()
RETURNS TRIGGER AS $$
BEGIN
  -- Auto-confirmar el email inmediatamente
  NEW.email_confirmed_at := NOW();
  NEW.confirmation_token := '';
  NEW.email_change_token_new := '';
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Eliminar trigger si existe
DROP TRIGGER IF EXISTS on_auth_user_auto_confirm ON auth.users;

-- Crear trigger que auto-confirme emails al crear usuarios
CREATE TRIGGER on_auth_user_auto_confirm
  BEFORE INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION auto_confirm_email();

-- Confirmar el email del usuario existente
UPDATE auth.users
SET email_confirmed_at = NOW()
WHERE email = 'test@crisol.com'
AND email_confirmed_at IS NULL;

-- Mensaje de confirmación
DO $$
BEGIN
  RAISE NOTICE 'Auto-confirm email trigger created successfully';
  RAISE NOTICE 'Existing test user email confirmed';
END $$;
