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

    // If switching vote, delete old one first
    if (voted && voted !== type) {
      const sessionId = getSessionId();
      await (supabase.from("question_feedback" as any) as any)
        .delete()
        .eq("question_id", questionId)
        .eq("session_id", sessionId);
    }

    setLoading(true);
    const sessionId = getSessionId();

    // Upsert the vote
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
    <div className="flex items-center gap-3 mt-3">
      <button
        onClick={() => handleVote("up")}
        disabled={loading}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border ${
          voted === "up"
            ? "border-green-500/40 bg-green-500/15 text-green-400"
            : "border-border text-muted-foreground hover:text-green-400 hover:border-green-500/30 hover:bg-green-500/10"
        }`}
      >
        <span className="text-sm">😎</span>
        Too Easy
      </button>
      <button
        onClick={() => handleVote("down")}
        disabled={loading}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border ${
          voted === "down"
            ? "border-red-500/40 bg-red-500/15 text-red-400"
            : "border-border text-muted-foreground hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/10"
        }`}
      >
        <span className="text-sm">🤯</span>
        Too Hard
      </button>
      <span
        className={`text-xs text-muted-foreground transition-opacity duration-500 ${
          showThanks ? "opacity-100" : "opacity-0"
        }`}
      >
        Thanks for the feedback
      </span>
    </div>
  );
};

export default QuestionVote;
