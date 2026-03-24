-- Remove the trigger that might be causing issues during sign in
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Verify the test user profile exists
DO $$
BEGIN
  -- Check if profile exists for test user
  IF NOT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE email = 'test@crisol.com'
  ) THEN
    -- Get the user ID from auth.users
    INSERT INTO public.profiles (
      id,
      email,
      first_name,
      last_name,
      username,
      role,
      seller_tier,
      email_verified,
      is_active
    )
    SELECT 
      id,
      email,
      'Usuario',
      'Prueba',
      'testuser',
      'buyer',
      'basic',
      true,
      true
    FROM auth.users
    WHERE email = 'test@crisol.com'
    ON CONFLICT (id) DO NOTHING;
  END IF;
END $$;
