
-- Fix question_overrides: restrict INSERT/UPDATE to admins only
DROP POLICY "Authenticated users can insert question overrides" ON public.question_overrides;
DROP POLICY "Authenticated users can update question overrides" ON public.question_overrides;

CREATE POLICY "Admins can insert question overrides"
  ON public.question_overrides FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update question overrides"
  ON public.question_overrides FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Fix question_feedback: restrict DELETE/UPDATE to admins only
DROP POLICY "Authenticated users can delete question feedback" ON public.question_feedback;
DROP POLICY "Authenticated users can update question feedback" ON public.question_feedback;

CREATE POLICY "Admins can delete question feedback"
  ON public.question_feedback FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update question feedback"
  ON public.question_feedback FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
