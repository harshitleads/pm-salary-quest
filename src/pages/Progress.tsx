import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import { Loader2, ArrowLeft } from "lucide-react";

const CATEGORIES = ["Product Sense", "Product Design", "Metrics", "Behavioral"];
const MIN_QUESTIONS_THRESHOLD = 5;

interface CategoryScores {
  [category: string]: { correct: number; total: number };
}

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

const Progress = () => {
  const navigate = useNavigate();
  const { user, profile, loading: authLoading } = useAuth();
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchSessions = async () => {
      const { data } = await (supabase.from("quiz_sessions") as any)
        .select("category_scores, score, total_questions, completed_at, tier")
        .eq("user_id", user.id)
        .not("category_scores", "is", null)
        .order("completed_at", { ascending: false });
      setSessions(data || []);
      setLoading(false);
    };
    fetchSessions();
  }, [user]);

  const aggregated = useMemo(() => {
    const totals: Record<string, { correct: number; total: number }> = {};
    CATEGORIES.forEach((cat) => {
      totals[cat] = { correct: 0, total: 0 };
    });

    sessions.forEach((s) => {
      const cs = s.category_scores as CategoryScores | null;
      if (!cs) return;
      Object.entries(cs).forEach(([cat, vals]) => {
        if (totals[cat]) {
          totals[cat].correct += vals.correct;
          totals[cat].total += vals.total;
        }
      });
    });

    return CATEGORIES.map((cat) => {
      const t = totals[cat];
      const pct = t.total > 0 ? Math.round((t.correct / t.total) * 100) : 0;
      const lowData = t.total < MIN_QUESTIONS_THRESHOLD;
      return { category: cat, correct: t.correct, total: t.total, pct, lowData };
    });
  }, [sessions]);

  const radarData = useMemo(() => {
    return aggregated.map((a) => ({
      subject: a.lowData ? `${a.category}*` : a.category,
      score: a.pct,
      fullMark: 100,
    }));
  }, [aggregated]);

  const hasAnyData = aggregated.some((a) => a.total > 0);
  const hasLowDataCategories = aggregated.some((a) => a.lowData && a.total > 0);

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <p className="text-lg font-semibold text-foreground">Sign in to view your progress</p>
          <Button onClick={() => navigate("/")}>Go Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center gap-4 px-4 py-4">
          <button onClick={() => navigate("/")} className="text-foreground/70 hover:text-foreground transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-bold text-foreground">Your Progress</h1>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 space-y-8">
        {/* Stats summary */}
        {profile && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Questions", value: profile.total_questions_answered },
              { label: "Correct", value: profile.total_correct },
              { label: "Accuracy", value: profile.total_questions_answered > 0 ? `${Math.round((profile.total_correct / profile.total_questions_answered) * 100)}%` : "—" },
              { label: "Streak", value: `${profile.current_streak}🔥` },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border border-border bg-card p-4 text-center">
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground font-semibold mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Radar chart */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-xl">
          <h2 className="text-lg font-bold text-foreground mb-4 text-center">Skill Accuracy by Category</h2>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : !hasAnyData ? (
            <p className="text-center text-muted-foreground py-12">Complete some quizzes to see your skill breakdown here.</p>
          ) : (
            <>
              <div className="h-72 sm:h-96 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="50%" data={radarData}>
                    <PolarGrid stroke="hsl(240, 12%, 20%)" />
                    <PolarAngleAxis dataKey="subject" tick={<CustomAngleTick />} tickLine={false} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: "hsl(215, 20%, 65%)", fontSize: 10 }} />
                    <Radar name="Accuracy" dataKey="score" stroke="hsl(263, 70%, 50%)" fill="hsl(263, 70%, 50%)" fillOpacity={0.25} strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              {hasLowDataCategories && (
                <p className="text-xs text-muted-foreground text-center mt-2">* Not enough data (fewer than {MIN_QUESTIONS_THRESHOLD} questions attempted)</p>
              )}
            </>
          )}
        </div>

        {/* Category breakdown */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-xl">
          <h2 className="text-lg font-bold text-foreground mb-4">Category Breakdown</h2>
          <div className="space-y-3">
            {aggregated.map((s) => (
              <div key={s.category} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">{s.category}</span>
                  {s.lowData && s.total > 0 && (
                    <span className="text-[10px] text-muted-foreground/60 font-semibold">Low data</span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative h-2.5 w-32 overflow-hidden rounded-full bg-muted">
                    <div className="absolute left-0 top-0 h-full rounded-full bg-primary transition-all" style={{ width: `${s.pct}%` }} />
                  </div>
                  <span className="text-sm font-bold text-foreground/70 w-24 text-right">
                    {s.total > 0 ? `${s.correct}/${s.total} (${s.pct}%)` : "—"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sessions count */}
        <p className="text-center text-xs text-muted-foreground">
          Based on {sessions.length} tracked session{sessions.length !== 1 ? "s" : ""} with detailed category data.
        </p>

        <div className="flex justify-center pb-8">
          <Button variant="outline" size="lg" onClick={() => navigate("/")}>
            Go Home
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Progress;
