
-- Fix feedback table: restrict SELECT and UPDATE to admins only
DROP POLICY "Anyone can read feedback" ON public.feedback;
DROP POLICY "Anyone can update feedback" ON public.feedback;

CREATE POLICY "Admins can read feedback"
  ON public.feedback FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update feedback"
  ON public.feedback FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Fix difficulty_survey table: restrict SELECT to admins only
DROP POLICY "Anyone can read survey responses" ON public.difficulty_survey;

CREATE POLICY "Admins can read survey responses"
  ON public.difficulty_survey FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
