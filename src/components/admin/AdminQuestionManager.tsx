import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { questions } from "@/data/questions";
import { Button } from "@/components/ui/button";

const TIERS = ["All", "Junior", "Mid", "Senior", "AI Frontier", "Staff+"];
const CATEGORIES = ["All", ...new Set(questions.map((q) => q.category))];
const STATUSES = ["All", "Active", "Disabled"];

const AdminQuestionManager = () => {
  const [overrides, setOverrides] = useState<Map<number, boolean>>(new Map());
  const [feedbackCounts, setFeedbackCounts] = useState<Map<number, { up: number; down: number }>>(new Map());
  const [filterTier, setFilterTier] = useState("All");
  const [filterCat, setFilterCat] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const [ovRes, fbRes] = await Promise.all([
        (supabase.from("question_overrides" as any) as any).select("question_id, active"),
        (supabase.from("question_feedback" as any) as any).select("question_id, feedback_type"),
      ]);

      const ovMap = new Map<number, boolean>();
      ((ovRes.data || []) as any[]).forEach((r: any) => ovMap.set(r.question_id, r.active));
      setOverrides(ovMap);

      const fbMap = new Map<number, { up: number; down: number }>();
      ((fbRes.data || []) as any[]).forEach((r: any) => {
        if (!fbMap.has(r.question_id)) fbMap.set(r.question_id, { up: 0, down: 0 });
        const c = fbMap.get(r.question_id)!;
        if (r.feedback_type === "up") c.up++;
        else c.down++;
      });
      setFeedbackCounts(fbMap);
      setLoading(false);
    };
    fetch();
  }, []);

  const filtered = useMemo(() => {
    return questions.filter((q) => {
      if (filterTier !== "All" && q.salaryTier !== filterTier) return false;
      if (filterCat !== "All" && q.category !== filterCat) return false;
      const active = overrides.has(q.id) ? overrides.get(q.id)! : true;
      if (filterStatus === "Active" && !active) return false;
      if (filterStatus === "Disabled" && active) return false;
      return true;
    });
  }, [filterTier, filterCat, filterStatus, overrides]);

  const toggleActive = async (questionId: number, currentActive: boolean) => {
    await (supabase.from("question_overrides" as any) as any).upsert(
      { question_id: questionId, active: !currentActive, updated_at: new Date().toISOString() } as any,
      { onConflict: "question_id" }
    );
    setOverrides((prev) => new Map(prev).set(questionId, !currentActive));
  };

  if (loading) return <p className="text-center text-muted-foreground py-8">Loading...</p>;

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <select
          value={filterTier}
          onChange={(e) => setFilterTier(e.target.value)}
          className="rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground [&>option]:bg-card [&>option]:text-foreground"
        >
          {TIERS.map((t) => <option key={t} value={t}>{t === "All" ? "All Tiers" : t}</option>)}
        </select>
        <select
          value={filterCat}
          onChange={(e) => setFilterCat(e.target.value)}
          className="rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground [&>option]:bg-card [&>option]:text-foreground"
        >
          {CATEGORIES.map((c) => <option key={c} value={c}>{c === "All" ? "All Categories" : c}</option>)}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground [&>option]:bg-card [&>option]:text-foreground"
        >
          {STATUSES.map((s) => <option key={s} value={s}>{s === "All" ? "All Statuses" : s}</option>)}
        </select>
        <span className="self-center text-sm text-muted-foreground">{filtered.length} questions</span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-muted/30">
            <tr>
              <th className="px-4 py-3 text-muted-foreground">ID</th>
              <th className="px-4 py-3 text-muted-foreground">Question</th>
              <th className="px-4 py-3 text-muted-foreground">Tier</th>
              <th className="px-4 py-3 text-muted-foreground">Category</th>
              <th className="px-4 py-3 text-muted-foreground text-center">👍</th>
              <th className="px-4 py-3 text-muted-foreground text-center">👎</th>
              <th className="px-4 py-3 text-muted-foreground">Status</th>
              <th className="px-4 py-3 text-muted-foreground">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((q) => {
              const active = overrides.has(q.id) ? overrides.get(q.id)! : true;
              const fb = feedbackCounts.get(q.id) || { up: 0, down: 0 };
              return (
                <tr key={q.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-2 font-mono text-foreground/60">{q.id}</td>
                  <td className="px-4 py-2 text-foreground max-w-[250px] truncate">{q.question}</td>
                  <td className="px-4 py-2 text-foreground/70">{q.salaryTier}</td>
                  <td className="px-4 py-2 text-foreground/70">{q.category}</td>
                  <td className="px-4 py-2 text-center text-green-400 font-bold">{fb.up}</td>
                  <td className="px-4 py-2 text-center text-red-400 font-bold">{fb.down}</td>
                  <td className="px-4 py-2">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                      active ? "bg-green-500/15 text-green-400" : "bg-red-500/15 text-red-400"
                    }`}>
                      {active ? "Active" : "Disabled"}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <Button
                      size="sm"
                      variant={active ? "destructive" : "default"}
                      onClick={() => toggleActive(q.id, active)}
                      className="text-xs"
                    >
                      {active ? "Disable" : "Enable"}
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminQuestionManager;
