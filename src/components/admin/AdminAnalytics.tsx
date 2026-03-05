import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAllQuestions } from "@/hooks/useQuestions";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

const COLORS = ["#7C3AED", "#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

const AdminAnalytics = () => {
  const { questions, loading: questionsLoading } = useAllQuestions();
  const [feedback, setFeedback] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      const { data } = await (supabase.from("question_feedback" as any) as any).select("*");
      setFeedback(data || []);
      setLoading(false);
    };
    fetchAll();
  }, []);

  if (loading || questionsLoading) return <p className="text-center text-muted-foreground py-8">Loading analytics...</p>;

  const tiers = ["Junior", "Mid", "Senior", "AI Frontier", "Staff+"];
  const downRateByTier = tiers.map((tier) => {
    const tierFb = feedback.filter((f: any) => f.tier === tier);
    const downs = tierFb.filter((f: any) => f.feedback_type === "down").length;
    const total = tierFb.length;
    return { tier, rate: total ? Math.round((downs / total) * 100) : 0, total };
  });

  const categories = [...new Set(questions.map((q) => q.category))];
  const downRateByCat = categories.map((cat) => {
    const catFb = feedback.filter((f: any) => f.category === cat);
    const downs = catFb.filter((f: any) => f.feedback_type === "down").length;
    const total = catFb.length;
    return { category: cat, rate: total ? Math.round((downs / total) * 100) : 0, total };
  }).sort((a, b) => b.rate - a.rate);

  const flagCounts: Record<number, { down: number; up: number }> = {};
  feedback.forEach((f: any) => {
    if (!flagCounts[f.question_id]) flagCounts[f.question_id] = { down: 0, up: 0 };
    if (f.feedback_type === "down") flagCounts[f.question_id].down++;
    else flagCounts[f.question_id].up++;
  });

  const topFlagged = Object.entries(flagCounts)
    .sort(([, a], [, b]) => b.down - a.down)
    .slice(0, 10)
    .map(([id, counts]) => {
      const q = questions.find((qq) => qq.id === Number(id));
      return { id: Number(id), ...counts, question: q?.question?.slice(0, 60) || `Q#${id}`, tier: q?.salaryTier || "—" };
    });

  const topRated = Object.entries(flagCounts)
    .sort(([, a], [, b]) => b.up - a.up)
    .slice(0, 10)
    .map(([id, counts]) => {
      const q = questions.find((qq) => qq.id === Number(id));
      return { id: Number(id), ...counts, question: q?.question?.slice(0, 60) || `Q#${id}`, tier: q?.salaryTier || "—" };
    });

  const questionsPerTier = tiers.map((tier) => ({
    tier,
    count: questions.filter((q) => q.salaryTier === tier).length,
  }));

  const chartStyle = { fontSize: 11, fill: "#94A3B8" };

  return (
    <div className="space-y-10">
      <section>
        <h3 className="text-lg font-semibold text-foreground mb-4">👎 "Too Hard" Rate by Tier</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer>
            <BarChart data={downRateByTier}>
              <XAxis dataKey="tier" tick={chartStyle} />
              <YAxis tick={chartStyle} unit="%" />
              <Tooltip contentStyle={{ backgroundColor: "#16161F", border: "1px solid #2D2D3A", color: "#F1F5F9" }} />
              <Bar dataKey="rate" fill="#EF4444" radius={[4, 4, 0, 0]} name="Too Hard %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-foreground mb-4">👎 "Too Hard" Rate by Category</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer>
            <BarChart data={downRateByCat} layout="vertical">
              <XAxis type="number" tick={chartStyle} unit="%" />
              <YAxis type="category" dataKey="category" tick={chartStyle} width={120} />
              <Tooltip contentStyle={{ backgroundColor: "#16161F", border: "1px solid #2D2D3A", color: "#F1F5F9" }} />
              <Bar dataKey="rate" fill="#F59E0B" radius={[0, 4, 4, 0]} name="Too Hard %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-foreground mb-4">📊 Questions per Tier</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={questionsPerTier} dataKey="count" nameKey="tier" cx="50%" cy="50%" outerRadius={100} label>
                {questionsPerTier.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: "#16161F", border: "1px solid #2D2D3A", color: "#F1F5F9" }} />
              <Legend wrapperStyle={{ color: "#94A3B8" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-foreground mb-4">🚩 Top 10 Most Flagged Questions</h3>
        {topFlagged.length === 0 ? (
          <p className="text-muted-foreground">No feedback data yet.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border bg-muted/30">
                <tr>
                  <th className="px-4 py-2 text-muted-foreground">Question</th>
                  <th className="px-4 py-2 text-muted-foreground">Tier</th>
                  <th className="px-4 py-2 text-muted-foreground text-center">👎</th>
                  <th className="px-4 py-2 text-muted-foreground text-center">👍</th>
                </tr>
              </thead>
              <tbody>
                {topFlagged.map((q) => (
                  <tr key={q.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-2 text-foreground max-w-xs truncate">{q.question}…</td>
                    <td className="px-4 py-2 text-foreground/70">{q.tier}</td>
                    <td className="px-4 py-2 text-center font-bold text-red-400">{q.down}</td>
                    <td className="px-4 py-2 text-center font-bold text-green-400">{q.up}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section>
        <h3 className="text-lg font-semibold text-foreground mb-4">⭐ Top 10 Highest Rated Questions</h3>
        {topRated.length === 0 ? (
          <p className="text-muted-foreground">No feedback data yet.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border bg-muted/30">
                <tr>
                  <th className="px-4 py-2 text-muted-foreground">Question</th>
                  <th className="px-4 py-2 text-muted-foreground">Tier</th>
                  <th className="px-4 py-2 text-muted-foreground text-center">👍</th>
                  <th className="px-4 py-2 text-muted-foreground text-center">👎</th>
                </tr>
              </thead>
              <tbody>
                {topRated.map((q) => (
                  <tr key={q.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-2 text-foreground max-w-xs truncate">{q.question}…</td>
                    <td className="px-4 py-2 text-foreground/70">{q.tier}</td>
                    <td className="px-4 py-2 text-center font-bold text-green-400">{q.up}</td>
                    <td className="px-4 py-2 text-center font-bold text-red-400">{q.down}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminAnalytics;
