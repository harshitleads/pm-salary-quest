
-- Drop existing view and recreate
DROP VIEW IF EXISTS public.public_questions;

CREATE VIEW public.public_questions AS
SELECT id, category, "salaryTier", "salaryRange", question, options, "multipleCorrect", hint, explanation, active, difficulty, "flagCount", source, tier
FROM public.questions;

GRANT SELECT ON public.public_questions TO anon, authenticated;

-- RPC to fetch correct answers for a single question
CREATE OR REPLACE FUNCTION public.get_correct_answers(p_question_id bigint)
RETURNS jsonb
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT "correctAnswers"
  FROM public.questions
  WHERE id = p_question_id AND active = true
  LIMIT 1;
$$;
