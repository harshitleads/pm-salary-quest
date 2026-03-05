
CREATE POLICY "Authenticated users can delete question feedback"
ON public.question_feedback FOR DELETE
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can update question feedback"
ON public.question_feedback FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);
