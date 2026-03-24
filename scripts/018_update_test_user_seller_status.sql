-- Update test@crisol.com to be a verified seller
-- Run this script to grant seller permissions

-- Update the profile directly by email
UPDATE profiles
SET 
  role = 'seller',
  is_seller_verified = true,
  seller_tier = 'verified',
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
  max_active_listings
FROM profiles
WHERE email = 'test@crisol.com';
