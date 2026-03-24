-- Create storage bucket for seller documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('seller-documents', 'seller-documents', false)
ON CONFLICT (id) DO NOTHING;

-- RLS policies for seller-documents bucket
-- Allow authenticated users to upload their own documents
CREATE POLICY "Users can upload their own documents"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'seller-documents' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow authenticated users to read their own documents
CREATE POLICY "Users can view their own documents"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'seller-documents' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow admins to view all documents
CREATE POLICY "Admins can view all documents"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'seller-documents'
  AND EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin' -- Fixed column name from is_admin to role
  )
);

-- Allow users to delete their own documents
CREATE POLICY "Users can delete their own documents"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'seller-documents'
  AND (storage.foldername(name))[1] = auth.uid()::text
);
