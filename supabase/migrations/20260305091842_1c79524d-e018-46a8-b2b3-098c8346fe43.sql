
CREATE TABLE public.question_feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id integer NOT NULL,
  session_id text NOT NULL,
  feedback_type text NOT NULL CHECK (feedback_type IN ('up', 'down')),
  tier text,
  category text,
  flagged_for_review boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE (question_id, session_id)
);

ALTER TABLE public.question_feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert question feedback"
ON public.question_feedback FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can read question feedback"
ON public.question_feedback FOR SELECT
USING (true);
