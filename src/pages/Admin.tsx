import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface FeedbackRow {
  id: string;
  question_id: number | null;
  feedback_type: string;
  description: string;
  resolved: boolean;
  created_at: string;
}

const Admin = () => {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackRow[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password === "berkeley2026") {
      setAuthed(true);
    }
  };

  useEffect(() => {
    if (!authed) return;
    setLoading(true);
    supabase
      .from("feedback")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setFeedback((data as any as FeedbackRow[]) || []);
        setLoading(false);
      });
  }, [authed]);

  const toggleResolved = async (id: string, current: boolean) => {
    await (supabase.from("feedback") as any).update({ resolved: !current }).eq("id", id);
    setFeedback((prev) =>
      prev.map((f) => (f.id === id ? { ...f, resolved: !current } : f))
    );
  };

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-xl">
          <h1 className="mb-6 text-center text-quiz-heading text-foreground">Admin Login</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="Enter password"
            className="mb-4 w-full rounded-lg border border-border bg-background px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <Button onClick={handleLogin} size="lg" className="w-full">
            Login
          </Button>
          <button onClick={() => navigate("/")} className="mt-4 block w-full text-center text-sm text-muted-foreground hover:text-foreground">
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <h1 className="text-quiz-heading text-foreground">Feedback Admin</h1>
          <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground">
            ← Back
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        {loading ? (
          <p className="text-center text-muted-foreground">Loading...</p>
        ) : feedback.length === 0 ? (
          <p className="text-center text-muted-foreground">No feedback yet.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border bg-muted/50">
                <tr>
                  <th className="px-4 py-3 font-semibold text-muted-foreground">Question ID</th>
                  <th className="px-4 py-3 font-semibold text-muted-foreground">Type</th>
                  <th className="px-4 py-3 font-semibold text-muted-foreground">Description</th>
                  <th className="px-4 py-3 font-semibold text-muted-foreground">Timestamp</th>
                  <th className="px-4 py-3 font-semibold text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {feedback.map((f) => (
                  <tr key={f.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 font-mono text-foreground">{f.question_id ?? "—"}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
                        {f.feedback_type}
                      </span>
                    </td>
                    <td className="max-w-xs truncate px-4 py-3 text-foreground">{f.description}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(f.created_at).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <Button
                        size="sm"
                        variant={f.resolved ? "default" : "outline"}
                        onClick={() => toggleResolved(f.id, f.resolved)}
                      >
                        {f.resolved ? "✅ Resolved" : "Mark Resolved"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
