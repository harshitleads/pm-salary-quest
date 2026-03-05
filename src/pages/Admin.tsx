import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import type { User } from "@supabase/supabase-js";
import AdminFlaggedQuestions from "@/components/admin/AdminFlaggedQuestions";
import AdminAnalytics from "@/components/admin/AdminAnalytics";
import AdminQuestionManager from "@/components/admin/AdminQuestionManager";

const ALLOWED_EMAILS = ["harshitsharma@berkeley.edu"];

type Panel = "flagged" | "analytics" | "manager";

const Admin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState("");
  const [activePanel, setActivePanel] = useState<Panel>("flagged");
  const navigate = useNavigate();

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

  const isAuthorized = user?.email ? ALLOWED_EMAILS.includes(user.email) : false;

  const handleAuth = async () => {
    setAuthError("");
    if (!ALLOWED_EMAILS.includes(email.toLowerCase())) {
      setAuthError("Admin access restricted. Contact Harshit for access.");
      return;
    }
    if (password.length < 6) {
      setAuthError("Password must be at least 6 characters.");
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setAuthError(error.message);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-xl">
          <h1 className="mb-2 text-center text-quiz-heading text-foreground">Admin Login</h1>
          <p className="mb-6 text-center text-sm text-muted-foreground">Authorized admins only</p>
          {authError && (
            <p className="mb-4 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{authError}</p>
          )}
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@berkeley.edu" className="mb-3" />
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleAuth()} placeholder="Password (min 6 chars)" className="mb-4" />
          <Button onClick={handleAuth} size="lg" className="w-full">Login</Button>
          <p className="mt-4 text-center text-sm text-muted-foreground">Need access? Contact Harshit.</p>
          <button onClick={() => navigate("/")} className="mt-2 block w-full text-center text-sm text-muted-foreground hover:text-foreground">← Back to Home</button>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-xl text-center">
          <h1 className="mb-4 text-quiz-heading text-foreground">Unauthorized</h1>
          <p className="mb-6 text-muted-foreground">Admin access restricted. Contact Harshit for access.</p>
          <Button onClick={handleLogout} variant="outline" className="w-full">Sign Out</Button>
        </div>
      </div>
    );
  }

  const navItems: { key: Panel; label: string; icon: string }[] = [
    { key: "flagged", label: "Flagged Questions", icon: "🚩" },
    { key: "analytics", label: "Analytics", icon: "📊" },
    { key: "manager", label: "Question Manager", icon: "📋" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <h1 className="text-quiz-heading text-foreground">Admin Dashboard</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">{user.email}</span>
            <Button size="sm" variant="outline" onClick={handleLogout}>Sign Out</Button>
            <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground text-sm">← Home</button>
          </div>
        </div>
        {/* Panel nav */}
        <div className="mx-auto max-w-7xl px-4 pb-3">
          <div className="flex gap-1 rounded-lg bg-muted/30 p-1">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setActivePanel(item.key)}
                className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all ${
                  activePanel === item.key
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {item.icon} {item.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        {activePanel === "flagged" && <AdminFlaggedQuestions />}
        {activePanel === "analytics" && <AdminAnalytics />}
        {activePanel === "manager" && <AdminQuestionManager />}
      </main>
    </div>
  );
};

export default Admin;
