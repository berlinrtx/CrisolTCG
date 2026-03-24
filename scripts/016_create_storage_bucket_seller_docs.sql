-- Create storage bucket for seller documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('seller-documents', 'seller-documents', false)
ON CONFLICT (id) DO NOTHING;

-- RLS Policies for storage bucket
CREATE POLICY "Users can upload own seller documents"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'seller-documents' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can view own seller documents"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'seller-documents' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can update own seller documents"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'seller-documents' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can delete own seller documents"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'seller-documents' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);
