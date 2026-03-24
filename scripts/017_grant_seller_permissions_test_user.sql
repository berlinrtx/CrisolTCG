-- Grant seller permissions to test@crisol.com

-- Update the profile to be a verified seller
UPDATE public.profiles
SET 
  role = 'seller',
  is_seller_verified = true,
  seller_tier = 'verified',
  seller_application_status = 'approved',
  seller_application_submitted_at = NOW(),
  max_active_listings = 100,
  updated_at = NOW()
WHERE email = 'test@crisol.com';

-- Verify the update
SELECT 
  id,
  email,
  role,
  is_seller_verified,
  seller_tier,
  seller_application_status,
  max_active_listings
FROM public.profiles
WHERE email = 'test@crisol.com';
