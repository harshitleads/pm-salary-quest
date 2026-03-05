
CREATE TABLE public.question_overrides (
  question_id integer PRIMARY KEY,
  active boolean NOT NULL DEFAULT true,
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.question_overrides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read question overrides"
ON public.question_overrides FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can insert question overrides"
ON public.question_overrides FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update question overrides"
ON public.question_overrides FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);
