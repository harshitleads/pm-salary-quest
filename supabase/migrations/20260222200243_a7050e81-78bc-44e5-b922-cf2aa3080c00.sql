
CREATE TABLE public.difficulty_survey (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  difficulty_rating TEXT NOT NULL CHECK (difficulty_rating IN ('too_easy', 'just_right', 'too_hard')),
  salary_tier TEXT,
  score INTEGER,
  total_questions INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.difficulty_survey ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert survey responses"
ON public.difficulty_survey
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can read survey responses"
ON public.difficulty_survey
FOR SELECT
USING (true);
