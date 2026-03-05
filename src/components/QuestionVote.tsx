import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface QuestionVoteProps {
  questionId: number;
  tier: string;
  category: string;
}

function getSessionId(): string {
  const key = "quiz_session_id";
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}

const QuestionVote = ({ questionId, tier, category }: QuestionVoteProps) => {
  const [voted, setVoted] = useState<"up" | "down" | null>(null);
  const [showThanks, setShowThanks] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setVoted(null);
    setShowThanks(false);
  }, [questionId]);

  const handleVote = async (type: "up" | "down") => {
    if (loading) return;

    if (voted && voted !== type) {
      const sessionId = getSessionId();
      await (supabase.from("question_feedback" as any) as any)
        .delete()
        .eq("question_id", questionId)
        .eq("session_id", sessionId);
    }

    setLoading(true);
    const sessionId = getSessionId();

    await (supabase.from("question_feedback" as any) as any).upsert(
      {
        question_id: questionId,
        session_id: sessionId,
        feedback_type: type,
        tier,
        category,
        flagged_for_review: type === "down",
      } as any,
      { onConflict: "question_id,session_id" }
    );

    setVoted(type);
    setShowThanks(true);
    setLoading(false);

    setTimeout(() => setShowThanks(false), 2000);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <button
        onClick={() => handleVote("up")}
        disabled={loading}
        className={`flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 border ${
          voted === "up"
            ? "border-success/40 bg-success/15 text-success"
            : "border-border bg-muted/30 text-muted-foreground hover:text-success hover:border-success/30 hover:bg-success/10"
        }`}
      >
        <span className="text-lg">😎</span>
        Too Easy
      </button>
      <button
        onClick={() => handleVote("down")}
        disabled={loading}
        className={`flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 border ${
          voted === "down"
            ? "border-destructive/40 bg-destructive/15 text-destructive"
            : "border-border bg-muted/30 text-muted-foreground hover:text-destructive hover:border-destructive/30 hover:bg-destructive/10"
        }`}
      >
        <span className="text-lg">🤯</span>
        Too Hard
      </button>
      <span
        className={`text-xs text-muted-foreground text-center transition-opacity duration-500 ${
          showThanks ? "opacity-100" : "opacity-0"
        }`}
      >
        Thanks for the feedback
      </span>
    </div>
  );
};

export default QuestionVote;
