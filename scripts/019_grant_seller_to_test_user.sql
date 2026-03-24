-- Grant seller permissions to test@crisol.com
-- This script updates the profile to give seller access

-- Update the profile for test@crisol.com
UPDATE public.profiles
SET 
  role = 'seller',
  is_seller_verified = true,
  seller_tier = 'verified',
  max_active_listings = 100,
  store_name = 'Tienda de Prueba',
  store_description = 'Tienda de prueba para desarrollo',
  updated_at = now()
WHERE email = 'test@crisol.com';

-- Verify the update
SELECT 
  id,
  email,
  username,
  role,
  is_seller_verified,
  seller_tier,
  max_active_listings,
  store_name
FROM public.profiles
WHERE email = 'test@crisol.com';
