import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAllQuestions } from "@/hooks/useQuestions";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, CheckCircle } from "lucide-react";

interface FeedbackAgg {
  question_id: number;
  up: number;
  down: number;
}

interface OverrideRow {
  question_id: number;
  active: boolean;
}

const AdminFlaggedQuestions = () => {
  const { questions, loading: questionsLoading } = useAllQuestions();
  const [feedbackAgg, setFeedbackAgg] = useState<FeedbackAgg[]>([]);
  const [overrides, setOverrides] = useState<Map<number, boolean>>(new Map());
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const [fbRes, ovRes] = await Promise.all([
      (supabase.from("question_feedback" as any) as any).select("question_id, feedback_type"),
      (supabase.from("question_overrides" as any) as any).select("question_id, active"),
    ]);

    const agg: Record<number, { up: number; down: number }> = {};
    ((fbRes.data || []) as any[]).forEach((row: any) => {
      if (!agg[row.question_id]) agg[row.question_id] = { up: 0, down: 0 };
      if (row.feedback_type === "up") agg[row.question_id].up++;
      else agg[row.question_id].down++;
    });
    setFeedbackAgg(
      Object.entries(agg).map(([id, counts]) => ({ question_id: Number(id), ...counts }))
    );

    const ovMap = new Map<number, boolean>();
    ((ovRes.data || []) as OverrideRow[]).forEach((r) => ovMap.set(r.question_id, r.active));
    setOverrides(ovMap);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const flaggedQuestions = feedbackAgg
    .filter((f) => f.down > 0)
    .sort((a, b) => b.down - a.down)
    .map((f) => {
      const q = questions.find((qq) => qq.id === f.question_id);
      const active = overrides.has(f.question_id) ? overrides.get(f.question_id)! : true;
      return { ...f, question: q, active };
    });

  const toggleActive = async (questionId: number, currentActive: boolean) => {
    await (supabase.from("question_overrides" as any) as any).upsert(
      { question_id: questionId, active: !currentActive, updated_at: new Date().toISOString() } as any,
      { onConflict: "question_id" }
    );
    setOverrides((prev) => new Map(prev).set(questionId, !currentActive));
  };

  const clearFlags = async (questionId: number) => {
    await (supabase.from("question_feedback" as any) as any)
      .delete()
      .eq("question_id", questionId)
      .eq("feedback_type", "down");
    fetchData();
  };

  if (loading || questionsLoading) return <p className="text-center text-muted-foreground py-8">Loading...</p>;

  if (flaggedQuestions.length === 0) {
    return <p className="text-center text-muted-foreground py-8 inline-flex items-center justify-center gap-2 w-full"><CheckCircle size={18} /> No flagged questions</p>;
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-border bg-muted/30">
          <tr>
            <th className="px-4 py-3 font-semibold text-muted-foreground">Question</th>
            <th className="px-4 py-3 font-semibold text-muted-foreground">Tier</th>
            <th className="px-4 py-3 font-semibold text-muted-foreground">Category</th>
            <th className="px-4 py-3 font-semibold text-muted-foreground text-center">👎</th>
            <th className="px-4 py-3 font-semibold text-muted-foreground text-center">👍</th>
            <th className="px-4 py-3 font-semibold text-muted-foreground">Status</th>
            <th className="px-4 py-3 font-semibold text-muted-foreground">Actions</th>
          </tr>
        </thead>
        <tbody>
          {flaggedQuestions.map((f) => (
            <>
              <tr
                key={f.question_id}
                className={`border-b border-border last:border-0 ${f.down >= 3 ? "bg-red-500/10" : ""}`}
              >
                <td className="max-w-[200px] truncate px-4 py-3 text-foreground">
                  <button
                    onClick={() => setExpandedId(expandedId === f.question_id ? null : f.question_id)}
                    className="flex items-center gap-1 text-left hover:text-primary transition-colors"
                  >
                    {expandedId === f.question_id ? <ChevronUp className="h-3 w-3 shrink-0" /> : <ChevronDown className="h-3 w-3 shrink-0" />}
                    <span className="truncate">{f.question?.question || `Q#${f.question_id}`}</span>
                  </button>
                </td>
                <td className="px-4 py-3 text-foreground/70">{f.question?.salaryTier || "—"}</td>
                <td className="px-4 py-3 text-foreground/70">{f.question?.category || "—"}</td>
                <td className="px-4 py-3 text-center font-bold text-red-400">{f.down}</td>
                <td className="px-4 py-3 text-center font-bold text-green-400">{f.up}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${f.active ? "bg-green-500/15 text-green-400" : "bg-red-500/15 text-red-400"}`}>
                    {f.active ? "Active" : "Disabled"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Button size="sm" variant={f.active ? "destructive" : "default"} onClick={() => toggleActive(f.question_id, f.active)} className="text-xs">
                      {f.active ? "Disable" : "Enable"}
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => clearFlags(f.question_id)} className="text-xs">
                      Clear Flags
                    </Button>
                  </div>
                </td>
              </tr>
              {expandedId === f.question_id && f.question && (
                <tr key={`${f.question_id}-expanded`} className="border-b border-border bg-muted/20">
                  <td colSpan={7} className="px-6 py-4">
                    <p className="text-foreground mb-2"><strong>Full Question:</strong> {f.question.question}</p>
                    <p className="text-foreground/70 text-sm mb-1"><strong>Options:</strong></p>
                    <ul className="list-disc pl-5 text-foreground/70 text-sm space-y-0.5">
                      {f.question.options.map((o, i) => (
                        <li key={i} className={f.question!.correctAnswers.includes(i) ? "text-green-400 font-semibold" : ""}>
                          {o}
                        </li>
                      ))}
                    </ul>
                    <p className="text-foreground/60 text-sm mt-2"><strong>Explanation:</strong> {f.question.explanation}</p>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminFlaggedQuestions;
