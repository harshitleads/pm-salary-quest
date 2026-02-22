import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";

interface QuestionResult {
  id: number;
  category: string;
  correct: boolean;
}

interface QuizResultsProps {
  results: QuestionResult[];
  totalPoints: number;
  tierLabel: string;
  onRetry: () => void;
}

const CATEGORIES = ["Product Sense", "Product Design", "Metrics", "Behavioral"];

const QuizResults = ({ results, totalPoints, tierLabel, onRetry }: QuizResultsProps) => {
  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-center px-4 py-4">
          <h1 className="text-quiz-heading text-foreground">Quiz Complete!</h1>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 space-y-8">
        {/* Summary */}
        <div className="animate-scale-pop rounded-2xl border border-border bg-card p-6 shadow-xl text-center space-y-2">
          <p className="text-muted-foreground text-sm font-semibold">{tierLabel}</p>
          <p className="text-4xl font-bold font-display text-foreground">{totalPoints} pts</p>
          <p className="text-lg text-muted-foreground">
            {totalCorrect} / {results.length} correct ({overallPct}%)
          </p>
        </div>

        {/* Spider Chart */}
        <div className="animate-fade-in-up rounded-2xl border border-border bg-card p-6 shadow-xl">
          <h2 className="text-quiz-question text-foreground mb-4 text-center">Performance by Category</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="55%" data={radarData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12, fontWeight: 600 }}
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.25}
                  strokeWidth={2}
                />
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
                    <div
                      className="absolute left-0 top-0 h-full rounded-full bg-primary transition-all"
                      style={{ width: `${s.pct}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-muted-foreground w-20 text-right">
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
          <Button size="lg" onClick={onRetry} className="text-quiz-option bg-secondary text-secondary-foreground hover:bg-secondary/90">
            Try Again
          </Button>
        </div>
      </main>
    </div>
  );
};

export default QuizResults;
