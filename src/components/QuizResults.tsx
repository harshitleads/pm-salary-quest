import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DifficultySurvey from "@/components/DifficultySurvey";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/AuthModal";
import { supabase } from "@/integrations/supabase/client";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import type { QuestionResult } from "@/pages/Quiz";

interface QuizResultsProps {
  results: QuestionResult[];
  totalPoints: number;
  tierLabel: string;
  onRetry: () => void;
}

const CATEGORIES = ["Product Sense", "Product Design", "Metrics", "Behavioral"];

const CustomAngleTick = ({ payload, x, y, cx, cy }: any) => {
  const label = payload.value;
  const dx = x - cx;
  const dy = y - cy;
  const len = Math.sqrt(dx * dx + dy * dy);
  const offset = 12;
  const nx = x + (dx / len) * offset;
  const ny = y + (dy / len) * offset;
  const anchor = Math.abs(dx) < 5 ? "middle" : dx > 0 ? "start" : "end";
  return (
    <text x={nx} y={ny} textAnchor={anchor} dominantBaseline="central" fill="hsl(215, 20%, 65%)" fontSize={11} fontWeight={600}>
      {label}
    </text>
  );
};

const QuizResults = ({ results, totalPoints, tierLabel, onRetry }: QuizResultsProps) => {
  const navigate = useNavigate();
  const { user, refreshProfile } = useAuth();
  const [surveyDone, setSurveyDone] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [sessionSaved, setSessionSaved] = useState(false);

  const categoryStats = useMemo(() => {
    return CATEGORIES.map((cat) => {
      const catQuestions = results.filter((r) => r.category === cat);
      const correct = catQuestions.filter((r) => r.correct).length;
      const total = catQuestions.length;
      const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
      return { category: cat, correct, total, pct };
    });
  }, [results]);

  const radarData = useMemo(() => {
    return categoryStats.map((s) => ({
      subject: s.category,
      score: s.pct,
      fullMark: 100,
    }));
  }, [categoryStats]);

  const totalCorrect = results.filter((r) => r.correct).length;
  const overallPct = results.length > 0 ? Math.round((totalCorrect / results.length) * 100) : 0;

  // Build enriched data for saving
  const categoryScores = useMemo(() => {
    const scores: Record<string, { correct: number; total: number }> = {};
    results.forEach((r) => {
      if (!scores[r.category]) scores[r.category] = { correct: 0, total: 0 };
      scores[r.category].total += 1;
      if (r.correct) scores[r.category].correct += 1;
    });
    return scores;
  }, [results]);

  const correctByQuestion = useMemo(() => {
    return results.map((r) => ({
      question_id: r.id,
      category: r.category,
      correct: r.correct,
      tier: r.tier,
      time_taken: r.time_taken,
    }));
  }, [results]);

  // Auto-save session for authenticated users
  useEffect(() => {
    if (!user || sessionSaved) return;
    const saveSession = async () => {
      const categories = [...new Set(results.map((r) => r.category))];
      await (supabase.rpc as any)("record_quiz_session", {
        p_tier: tierLabel,
        p_categories: categories,
        p_score: totalCorrect,
        p_total_questions: results.length,
        p_category_scores: categoryScores,
        p_correct_by_question: correctByQuestion,
      });
      setSessionSaved(true);
      refreshProfile();
    };
    saveSession();
  }, [user, sessionSaved, results, totalCorrect, tierLabel, refreshProfile, categoryScores, correctByQuestion]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-center px-4 py-4">
          <h1 className="text-quiz-heading text-foreground">Quiz Complete!</h1>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 space-y-8">
        {/* Summary */}
        <div className="animate-scale-pop rounded-2xl border border-border bg-card p-6 shadow-xl text-center space-y-2">
          <p className="text-muted-foreground text-sm font-semibold">{tierLabel}</p>
          <p className="text-4xl font-bold text-foreground">{totalPoints} pts</p>
          <p className="text-lg text-muted-foreground">
            {totalCorrect} / {results.length} correct ({overallPct}%)
          </p>
        </div>

        {/* Sign-in prompt for unauthenticated */}
        {!user && (
          <div className="animate-fade-in-up rounded-2xl border border-primary/30 bg-primary/5 p-6 shadow-xl text-center space-y-3">
            <h3 className="text-lg font-bold text-foreground">Save Your Results</h3>
            <p className="text-sm text-muted-foreground">
              You scored {totalCorrect}/{results.length}. Sign in to track this session and see your improvement over time.
            </p>
            <Button
              onClick={() => setAuthOpen(true)}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Save My Progress
            </Button>
            <button className="text-xs text-muted-foreground/60 hover:text-muted-foreground">
              Continue without saving →
            </button>
          </div>
        )}

        {/* Difficulty Survey */}
        {!surveyDone && (
          <DifficultySurvey
            salaryTier={tierLabel}
            score={totalCorrect}
            totalQuestions={results.length}
            onComplete={() => setSurveyDone(true)}
          />
        )}

        {/* Spider Chart */}
        <div className="animate-fade-in-up rounded-2xl border border-border bg-card p-6 shadow-xl">
          <h2 className="text-quiz-question text-foreground mb-4 text-center">Performance by Category</h2>
          <div className="h-72 sm:h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="50%" data={radarData}>
                <PolarGrid stroke="hsl(240, 12%, 20%)" />
                <PolarAngleAxis dataKey="subject" tick={<CustomAngleTick />} tickLine={false} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: "hsl(215, 20%, 65%)", fontSize: 10 }} />
                <Radar name="Score" dataKey="score" stroke="hsl(263, 70%, 50%)" fill="hsl(263, 70%, 50%)" fillOpacity={0.25} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown Table */}
        <div className="animate-fade-in-up rounded-2xl border border-border bg-card p-6 shadow-xl">
          <h2 className="text-quiz-question text-foreground mb-4">Score Breakdown</h2>
          <div className="space-y-3">
            {categoryStats.map((s) => (
              <div key={s.category} className="flex items-center justify-between">
                <span className="text-quiz-option text-foreground">{s.category}</span>
                <div className="flex items-center gap-3">
                  <div className="relative h-2.5 w-32 overflow-hidden rounded-full bg-muted">
                    <div className="absolute left-0 top-0 h-full rounded-full bg-primary transition-all" style={{ width: `${s.pct}%` }} />
                  </div>
                  <span className="text-sm font-bold text-foreground/70 w-20 text-right">
                    {s.correct}/{s.total} ({s.pct}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-center pb-8">
          <Button variant="outline" size="lg" onClick={() => navigate("/")} className="text-quiz-option">
            Go Home
          </Button>
          <Button size="lg" onClick={onRetry} className="text-quiz-option bg-primary text-primary-foreground hover:bg-primary/90">
            Try Again
          </Button>
        </div>
      </main>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
};

export default QuizResults;
