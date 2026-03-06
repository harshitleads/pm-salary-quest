import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Question {
  id: number;
  category: string;
  salaryTier: string;
  salaryRange: string;
  question: string;
  options: string[];
  correctAnswers?: number[];
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

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      // Query from the public_questions view (no correctAnswers)
      let query = (supabase.from("public_questions") as any).select("id, category, \"salaryTier\", \"salaryRange\", question, options, \"multipleCorrect\", hint, explanation");

      if (salaryTier) {
        query = query.eq("salaryTier", salaryTier);
      }
      if (category) {
        query = query.eq("category", category);
      }

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

    fetchData();
  }, [salaryTier, category, limit, shuffle, enabled]);

  return { questions, loading, error };
}

/** Fetch correct answers for a specific question via RPC */
export async function fetchCorrectAnswers(questionId: number): Promise<number[]> {
  const { data, error } = await (supabase.rpc as any)("get_correct_answers", {
    p_question_id: questionId,
  });
  if (error) {
    console.error("Failed to fetch correct answers:", error.message);
    return [];
  }
  return (data as number[]) || [];
}

/** Fetch all questions (for admin views) — uses the full questions table */
export function useAllQuestions() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await (supabase.from("questions") as any).select("*");
      setQuestions((data || []) as Question[]);
      setLoading(false);
    };
    fetchData();
  }, []);

  return { questions, loading };
}
