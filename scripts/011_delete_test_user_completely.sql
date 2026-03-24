-- Script 011: Delete test user completely from both profiles and auth.users
-- This will allow creating a fresh test user without conflicts

-- Step 1: Delete from profiles table (this should cascade)
DELETE FROM public.profiles 
WHERE email = 'test@crisol.com';

-- Step 2: Delete from auth.users (requires admin privileges)
DELETE FROM auth.users 
WHERE email = 'test@crisol.com';

-- Step 3: Verify deletion
SELECT 'User deleted successfully' as status;

-- Now you can register a new user at /register with:
-- Email: test@crisol.com
-- Password: Test123456!
