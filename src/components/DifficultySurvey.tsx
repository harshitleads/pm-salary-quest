import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface DifficultySurveyProps {
  salaryTier: string;
  score: number;
  totalQuestions: number;
  onComplete: () => void;
}

const options = [
  { value: "too_easy", label: "Too easy", emoji: "😴" },
  { value: "just_right", label: "Just right", emoji: "👌" },
  { value: "too_hard", label: "Too hard", emoji: "🤯" },
] as const;

const DifficultySurvey = ({ salaryTier, score, totalQuestions, onComplete }: DifficultySurveyProps) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSelect = async (value: string) => {
    setSelected(value);
    setSubmitting(true);
    await supabase.from("difficulty_survey" as any).insert({
      difficulty_rating: value,
      salary_tier: salaryTier,
      score,
      total_questions: totalQuestions,
    } as any);
    setTimeout(onComplete, 800);
  };

  return (
    <div className="animate-scale-pop rounded-2xl border border-border bg-card p-6 shadow-xl text-center space-y-4">
      <p className="text-lg font-semibold text-foreground">How was the difficulty?</p>
      <div className="flex justify-center gap-3">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => !submitting && handleSelect(opt.value)}
            disabled={submitting}
            className={`flex flex-col items-center gap-1.5 rounded-xl border-2 px-5 py-3 transition-all duration-200 ${
              selected === opt.value
                ? "border-primary bg-primary/10 scale-105"
                : "border-border bg-background hover:border-primary/40 hover:shadow-sm"
            } ${submitting && selected !== opt.value ? "opacity-40" : ""}`}
          >
            <span className="text-2xl">{opt.emoji}</span>
            <span className="text-sm font-medium text-foreground">{opt.label}</span>
          </button>
        ))}
      </div>
      {selected && (
        <p className="text-sm text-muted-foreground animate-fade-in-up">Thanks for your feedback!</p>
      )}
    </div>
  );
};

export default DifficultySurvey;
