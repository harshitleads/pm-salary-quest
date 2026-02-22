import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import type { User } from "@supabase/supabase-js";

interface FeedbackRow {
  id: string;
  question_id: number | null;
  feedback_type: string;
  description: string;
  resolved: boolean;
  created_at: string;
}

const ALLOWED_DOMAIN = "@berkeley.edu";

const Admin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackRow[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Listen for auth state changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  const isAuthorized = user?.email?.endsWith(ALLOWED_DOMAIN) ?? false;

  const handleAuth = async () => {
    setAuthError("");
    if (!email.endsWith(ALLOWED_DOMAIN)) {
      setAuthError(`Only ${ALLOWED_DOMAIN} emails are allowed.`);
      return;
    }
    if (password.length < 6) {
      setAuthError("Password must be at least 6 characters.");
      return;
    }

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin + "/admin" },
      });
      if (error) {
        setAuthError(error.message);
      } else {
        setAuthError("");
        setIsSignUp(false);
        alert("Check your email for a confirmation link, then log in.");
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setAuthError(error.message);
      }
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  // Fetch feedback when authorized
  useEffect(() => {
    if (!isAuthorized) return;
    setLoading(true);
    supabase
      .from("feedback")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setFeedback((data as any as FeedbackRow[]) || []);
        setLoading(false);
      });
  }, [isAuthorized]);

  const toggleResolved = async (id: string, current: boolean) => {
    await (supabase.from("feedback") as any).update({ resolved: !current }).eq("id", id);
    setFeedback((prev) =>
      prev.map((f) => (f.id === id ? { ...f, resolved: !current } : f))
    );
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  // Not logged in — show login form
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-xl">
          <h1 className="mb-2 text-center text-quiz-heading text-foreground">
            Admin {isSignUp ? "Sign Up" : "Login"}
          </h1>
          <p className="mb-6 text-center text-sm text-muted-foreground">
            Restricted to {ALLOWED_DOMAIN} emails
          </p>

          {authError && (
            <p className="mb-4 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {authError}
            </p>
          )}

          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@berkeley.edu"
            className="mb-3"
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAuth()}
            placeholder="Password (min 6 chars)"
            className="mb-4"
          />

          <Button onClick={handleAuth} size="lg" className="w-full">
            {isSignUp ? "Sign Up" : "Login"}
          </Button>

          <button
            onClick={() => { setIsSignUp(!isSignUp); setAuthError(""); }}
            className="mt-3 block w-full text-center text-sm text-muted-foreground hover:text-foreground"
          >
            {isSignUp ? "Already have an account? Login" : "Need an account? Sign Up"}
          </button>

          <button
            onClick={() => navigate("/")}
            className="mt-2 block w-full text-center text-sm text-muted-foreground hover:text-foreground"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Logged in but wrong domain
  if (!isAuthorized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-xl text-center">
          <h1 className="mb-4 text-quiz-heading text-foreground">Unauthorized</h1>
          <p className="mb-6 text-muted-foreground">
            Only {ALLOWED_DOMAIN} accounts can access this page.
          </p>
          <Button onClick={handleLogout} variant="outline" className="w-full">
            Sign Out
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <h1 className="text-quiz-heading text-foreground">Feedback Admin</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">{user.email}</span>
            <Button size="sm" variant="outline" onClick={handleLogout}>
              Sign Out
            </Button>
            <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground">
              ← Back
            </button>
          </div>
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
