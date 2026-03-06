// Questions are now stored in Supabase. Use useQuestions() hook from src/hooks/useQuestions.ts
// This file only exports salaryTiers (UI config) and the Question interface for backward compat.

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

export const salaryTiers = [
  { key: "Junior", label: "JUNIOR PM", salary: "$130K - $170K", companies: "AI Startups, Series A/B", gradient: "gradient-tier-junior" },
  { key: "Mid", label: "MID-LEVEL PM", salary: "$170K - $220K", companies: "Scale AI, Notion, Figma", gradient: "gradient-tier-mid" },
  { key: "Senior", label: "SENIOR PM", salary: "$220K - $280K", companies: "Meta, Google", gradient: "gradient-tier-senior" },
  { key: "AI Frontier", label: "AI PM (FRONTIER)", salary: "$280K - $350K", companies: "OpenAI, Anthropic, DeepMind", gradient: "gradient-tier-ai" },
  { key: "Staff+", label: "STAFF+ PM", salary: "$350K+", companies: "Top Companies, IC Leadership", gradient: "gradient-tier-staff" },
];
