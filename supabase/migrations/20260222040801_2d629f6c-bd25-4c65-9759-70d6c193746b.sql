
-- Create feedback table
CREATE TABLE public.feedback (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question_id INTEGER,
  feedback_type TEXT NOT NULL DEFAULT 'Bug Report',
  description TEXT NOT NULL,
  user_id UUID,
  resolved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Anyone can insert feedback (no auth required)
CREATE POLICY "Anyone can insert feedback"
  ON public.feedback FOR INSERT
  WITH CHECK (true);

-- Anyone can read feedback (for admin page - protected by app-level password)
CREATE POLICY "Anyone can read feedback"
  ON public.feedback FOR SELECT
  USING (true);

-- Anyone can update feedback (for marking resolved - protected by app-level password)
CREATE POLICY "Anyone can update feedback"
  ON public.feedback FOR UPDATE
  USING (true);
