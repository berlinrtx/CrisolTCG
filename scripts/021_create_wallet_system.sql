-- Add wallet balance to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS wallet_balance NUMERIC(12, 2) DEFAULT 0.00;

-- Create wallet transactions table
CREATE TABLE IF NOT EXISTS public.wallet_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id),
    amount NUMERIC(12, 2) NOT NULL,
    transaction_type TEXT NOT NULL CHECK (transaction_type IN ('deposit', 'withdrawal', 'purchase', 'sale', 'refund', 'fee')),
    description TEXT,
    reference_id UUID, -- Can reference an order_id or other entity
    status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.wallet_transactions ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own transactions" 
ON public.wallet_transactions FOR SELECT 
USING (auth.uid() = user_id);

-- Only system can insert transactions (for now, or via specific functions)
-- We'll allow users to insert 'deposit' requests if we implement a payment gateway later, 
-- but for now, let's keep it restricted or allow insert for testing if needed.
-- Ideally, wallet updates happen via secure server-side functions.

-- Grant permissions
GRANT SELECT ON public.wallet_transactions TO authenticated;
