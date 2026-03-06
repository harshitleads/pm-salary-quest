
-- Fix security definer view by setting it to SECURITY INVOKER
ALTER VIEW public.public_questions SET (security_invoker = on);
