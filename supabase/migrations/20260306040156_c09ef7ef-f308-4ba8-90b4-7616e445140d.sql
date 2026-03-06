
ALTER TABLE public.quiz_sessions
  ADD COLUMN IF NOT EXISTS category_scores jsonb,
  ADD COLUMN IF NOT EXISTS correct_by_question jsonb;

-- Update the record_quiz_session function to accept the new columns
CREATE OR REPLACE FUNCTION public.record_quiz_session(
  p_tier text,
  p_categories jsonb,
  p_score integer,
  p_total_questions integer,
  p_category_scores jsonb DEFAULT NULL,
  p_correct_by_question jsonb DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_user_id UUID := auth.uid();
  v_last_date DATE;
  v_today DATE := CURRENT_DATE;
BEGIN
  -- Insert session with new columns
  INSERT INTO public.quiz_sessions (user_id, tier, categories, score, total_questions, category_scores, correct_by_question)
  VALUES (v_user_id, p_tier, p_categories, p_score, p_total_questions, p_category_scores, p_correct_by_question);

  -- Get current last_session_date
  SELECT last_session_date INTO v_last_date FROM public.user_profiles WHERE id = v_user_id;

  -- Update stats
  UPDATE public.user_profiles SET
    total_questions_answered = total_questions_answered + p_total_questions,
    total_correct = total_correct + p_score,
    current_streak = CASE
      WHEN v_last_date = v_today THEN current_streak
      WHEN v_last_date = v_today - 1 THEN current_streak + 1
      ELSE 1
    END,
    last_session_date = v_today
  WHERE id = v_user_id;
END;
$$;
