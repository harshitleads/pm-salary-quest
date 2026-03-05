import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ThumbsUp, ThumbsDown } from "lucide-react";

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

  // Reset per question
  useEffect(() => {
    setVoted(null);
    setShowThanks(false);
  }, [questionId]);

  const handleVote = async (type: "up" | "down") => {
    if (voted || loading) return;
    setLoading(true);

    const sessionId = getSessionId();
    await supabase.from("question_feedback" as any).insert({
      question_id: questionId,
      session_id: sessionId,
      feedback_type: type,
      tier,
      category,
      flagged_for_review: type === "down",
    } as any);

    setVoted(type);
    setShowThanks(true);
    setLoading(false);

    setTimeout(() => setShowThanks(false), 2000);
  };

  return (
    <div className="flex items-center gap-2 mt-3">
      <button
        onClick={() => handleVote("up")}
        disabled={voted !== null || loading}
        className={`p-1.5 rounded-md transition-all duration-200 ${
          voted === "up"
            ? "text-green-400 bg-green-400/15"
            : voted !== null
            ? "text-muted-foreground/30 cursor-not-allowed"
            : "text-muted-foreground hover:text-green-400 hover:bg-green-400/10"
        }`}
        aria-label="Thumbs up"
      >
        <ThumbsUp className="h-4 w-4" fill={voted === "up" ? "currentColor" : "none"} />
      </button>
      <button
        onClick={() => handleVote("down")}
        disabled={voted !== null || loading}
        className={`p-1.5 rounded-md transition-all duration-200 ${
          voted === "down"
            ? "text-red-400 bg-red-400/15"
            : voted !== null
            ? "text-muted-foreground/30 cursor-not-allowed"
            : "text-muted-foreground hover:text-red-400 hover:bg-red-400/10"
        }`}
        aria-label="Thumbs down"
      >
        <ThumbsDown className="h-4 w-4" fill={voted === "down" ? "currentColor" : "none"} />
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
