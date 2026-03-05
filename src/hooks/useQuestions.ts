import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Question {
  id: number;
  category: string;
  salaryTier: string;
  salaryRange: string;
  question: string;
  options: string[];
  correctAnswers: number[];
  multipleCorrect: boolean;
  hint: string;
  explanation: string;
}

interface UseQuestionsOptions {
  salaryTier?: string;
  category?: string;
  limit?: number;
  shuffle?: boolean;
  enabled?: boolean;
}

export function useQuestions(opts: UseQuestionsOptions = {}) {
  const { salaryTier, category, limit, shuffle = true, enabled = true } = opts;
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return;
    }

    const fetch = async () => {
      setLoading(true);
      setError(null);

      let query = (supabase.from("questions") as any).select("id, category, \"salaryTier\", \"salaryRange\", question, options, \"correctAnswers\", \"multipleCorrect\", hint, explanation");

      if (salaryTier) {
        query = query.eq("salaryTier", salaryTier);
      }
      if (category) {
        query = query.eq("category", category);
      }

      // active = true is enforced by RLS, but we add it for clarity
      query = query.eq("active", true);

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error: err } = await query;

      if (err) {
        setError(err.message);
        setQuestions([]);
      } else {
        let result = (data || []) as Question[];
        if (shuffle) {
          result = result.sort(() => Math.random() - 0.5);
        }
        if (limit && result.length > limit) {
          result = result.slice(0, limit);
        }
        setQuestions(result);
      }
      setLoading(false);
    };

    fetch();
  }, [salaryTier, category, limit, shuffle, enabled]);

  return { questions, loading, error };
}

/** Fetch all questions (for admin views) */
export function useAllQuestions() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await (supabase.from("questions") as any).select("*");
      setQuestions((data || []) as Question[]);
      setLoading(false);
    };
    fetch();
  }, []);

  return { questions, loading };
}
