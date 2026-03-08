-- Drop the broad public SELECT policies that expose correctAnswers
DROP POLICY IF EXISTS "Anyone can read active questions" ON public.questions;
DROP POLICY IF EXISTS "Public can read active questions" ON public.questions;

-- Revoke direct SELECT on questions table from anon/authenticated
-- They should use the public_questions VIEW instead
REVOKE SELECT ON public.questions FROM anon, authenticated;