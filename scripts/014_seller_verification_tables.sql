-- Create tables for seller verification system
-- This includes phone verification, document uploads, and geographic data

-- Table for seller verification documents (DPI, NIT, RTU, bank statements, etc.)
CREATE TABLE IF NOT EXISTS public.seller_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL CHECK (document_type IN ('dpi_front', 'dpi_back', 'selfie', 'nit', 'rtu_sat', 'bank_statement', 'address_proof')),
  file_url TEXT NOT NULL,
  file_name TEXT,
  file_size INTEGER,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  rejection_reason TEXT,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by UUID REFERENCES public.profiles(id)
);

-- Table for phone verification OTP
CREATE TABLE IF NOT EXISTS public.seller_otp_verification (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  phone_number TEXT NOT NULL,
  otp_code TEXT NOT NULL,
  verified BOOLEAN DEFAULT false,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  attempts INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Table for seller geographic and legal information
CREATE TABLE IF NOT EXISTS public.seller_verification_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
  
  -- Personal Information
  legal_first_name TEXT NOT NULL,
  legal_last_name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  is_over_18 BOOLEAN DEFAULT false,
  
  -- Geographic Information (Guatemala only for now)
  country TEXT DEFAULT 'Guatemala' NOT NULL,
  department TEXT NOT NULL CHECK (department IN (
    'Guatemala'
  )),
  municipality TEXT NOT NULL,
  address TEXT NOT NULL,
  
  -- Business Information
  store_name_public TEXT NOT NULL,
  
  -- Legal Documents
  dpi_number TEXT NOT NULL,
  nit_number TEXT NOT NULL,
  
  -- Banking Information
  bank_name TEXT NOT NULL,
  bank_account_type TEXT CHECK (bank_account_type IN ('ahorros', 'monetaria')),
  bank_account_number TEXT NOT NULL,
  bank_account_holder TEXT NOT NULL,
  
  -- Terms Acceptance
  accepted_terms_vendor BOOLEAN DEFAULT false,
  accepted_privacy_policy BOOLEAN DEFAULT false,
  accepted_anti_counterfeit_policy BOOLEAN DEFAULT false,
  terms_accepted_at TIMESTAMP WITH TIME ZONE,
  
  -- Verification Status
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'under_review', 'approved', 'rejected')),
  verification_notes TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  approved_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_seller_documents_seller_id ON public.seller_documents(seller_id);
CREATE INDEX IF NOT EXISTS idx_seller_documents_status ON public.seller_documents(status);
CREATE INDEX IF NOT EXISTS idx_seller_otp_seller_id ON public.seller_otp_verification(seller_id);
CREATE INDEX IF NOT EXISTS idx_seller_otp_phone ON public.seller_otp_verification(phone_number);
CREATE INDEX IF NOT EXISTS idx_seller_verification_data_seller_id ON public.seller_verification_data(seller_id);
CREATE INDEX IF NOT EXISTS idx_seller_verification_status ON public.seller_verification_data(verification_status);

-- Enable RLS on new tables
ALTER TABLE public.seller_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seller_otp_verification ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seller_verification_data ENABLE ROW LEVEL SECURITY;

-- RLS Policies for seller_documents
CREATE POLICY "Users can view own documents"
  ON public.seller_documents
  FOR SELECT
  USING (auth.uid() = seller_id);

CREATE POLICY "Users can insert own documents"
  ON public.seller_documents
  FOR INSERT
  WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "Users can update own documents"
  ON public.seller_documents
  FOR UPDATE
  USING (auth.uid() = seller_id);

-- RLS Policies for seller_otp_verification
CREATE POLICY "Users can view own OTP"
  ON public.seller_otp_verification
  FOR SELECT
  USING (auth.uid() = seller_id);

CREATE POLICY "Users can insert own OTP"
  ON public.seller_otp_verification
  FOR INSERT
  WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "Users can update own OTP"
  ON public.seller_otp_verification
  FOR UPDATE
  USING (auth.uid() = seller_id);

-- RLS Policies for seller_verification_data
CREATE POLICY "Users can view own verification data"
  ON public.seller_verification_data
  FOR SELECT
  USING (auth.uid() = seller_id);

CREATE POLICY "Users can insert own verification data"
  ON public.seller_verification_data
  FOR INSERT
  WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "Users can update own verification data"
  ON public.seller_verification_data
  FOR UPDATE
  USING (auth.uid() = seller_id);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_seller_verification_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Fixed syntax error in DROP TRIGGER statement
DROP TRIGGER IF EXISTS on_seller_verification_updated ON public.seller_verification_data;
CREATE TRIGGER on_seller_verification_updated
  BEFORE UPDATE ON public.seller_verification_data
  FOR EACH ROW EXECUTE FUNCTION public.update_seller_verification_updated_at();

-- Add columns to profiles table for seller application tracking
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS seller_application_status TEXT DEFAULT 'not_started' CHECK (seller_application_status IN ('not_started', 'in_progress', 'pending_review', 'approved', 'rejected'));

ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS seller_application_submitted_at TIMESTAMP WITH TIME ZONE;
