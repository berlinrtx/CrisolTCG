DO $$
BEGIN
  -- Confirmar email del usuario test@crisol.com
  UPDATE auth.users
  SET email_confirmed_at = NOW()
  WHERE email = 'test@crisol.com'
  AND email_confirmed_at IS NULL;
  
  RAISE NOTICE 'Email confirmed for test@crisol.com';
END $$;
