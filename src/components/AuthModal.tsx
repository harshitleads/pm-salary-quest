import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Loader2 } from "lucide-react";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  heading?: string;
}

const AuthModal = ({ open, onClose, heading }: AuthModalProps) => {
  const { user, profile, signOut } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);

  if (!open) return null;

  // Signed-in state
  if (user && profile) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
        <div className="relative w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-2xl text-center">
          <button onClick={onClose} className="absolute right-4 top-4 text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
            {profile.display_name?.charAt(0)?.toUpperCase() || "?"}
          </div>
          <p className="text-lg font-bold text-foreground">{profile.display_name}</p>
          <div className="mt-2 flex justify-center gap-4 text-sm text-muted-foreground">
            <span>🔥 {profile.current_streak} day streak</span>
            <span>✅ {profile.total_correct}/{profile.total_questions_answered}</span>
          </div>
          <Button onClick={onClose} className="mt-5 w-full bg-primary text-primary-foreground hover:bg-primary/90">
            Continue Practicing
          </Button>
          <button onClick={signOut} className="mt-3 text-sm text-muted-foreground hover:text-foreground">
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  const handleGoogle = async () => {
    setError("");
    setLoading(true);
    const { error: err } = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (err) setError(err.message || "Google sign-in failed");
    setLoading(false);
  };

  const handleForgotPassword = async () => {
    if (!email) { setError("Enter your email first"); return; }
    setLoading(true);
    setError("");
    const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (err) setError(err.message);
    else setForgotSent(true);
    setLoading(false);
  };

  const handleSubmit = async () => {
    setError("");
    if (!email || !password) { setError("Email and password are required"); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters"); return; }

    if (isSignUp) {
      if (password !== confirmPassword) { setError("Passwords do not match"); return; }
      setLoading(true);
      const { error: err } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name || email.split("@")[0] },
          emailRedirectTo: window.location.origin,
        },
      });
      if (err) setError(err.message);
      else onClose();
    } else {
      setLoading(true);
      const { error: err } = await supabase.auth.signInWithPassword({ email, password });
      if (err) setError(err.message);
      else onClose();
    }
    setLoading(false);
  };

  if (forgotMode) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
        <div className="relative w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-2xl">
          <button onClick={onClose} className="absolute right-4 top-4 text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-bold text-foreground mb-2">Reset Password</h2>
          {forgotSent ? (
            <p className="text-sm text-muted-foreground">Check your email for a reset link.</p>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-4">Enter your email and we'll send a reset link.</p>
              {error && <p className="mb-3 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>}
              <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-3" />
              <Button onClick={handleForgotPassword} disabled={loading} className="w-full bg-primary text-primary-foreground">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send Reset Link"}
              </Button>
            </>
          )}
          <button onClick={() => { setForgotMode(false); setForgotSent(false); setError(""); }} className="mt-3 block text-sm text-muted-foreground hover:text-foreground">
            ← Back to sign in
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-2xl">
        <button onClick={onClose} className="absolute right-4 top-4 text-muted-foreground hover:text-foreground">
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold text-foreground text-center">{heading || "Unlock Your Full Potential"}</h2>
        <p className="text-sm text-muted-foreground text-center mt-1 mb-4">
          Track your progress, access all 5 tiers, and see how you improve over time.
        </p>

        {/* Incentive pills */}
        <div className="flex justify-center gap-3 mb-5 flex-wrap">
          {[
            { icon: "📈", label: "Track Progress" },
            { icon: "🔓", label: "All 5 Tiers" },
            { icon: "🏆", label: "Streaks" },
          ].map((item) => (
            <span key={item.label} className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-foreground/80">
              {item.icon} {item.label}
            </span>
          ))}
        </div>

        {error && <p className="mb-3 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>}

        {/* Google */}
        <button
          onClick={handleGoogle}
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-white px-4 py-2.5 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-50 disabled:opacity-50"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Continue with Google
        </button>

        {/* Divider */}
        <div className="my-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">or</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Form */}
        {isSignUp && (
          <Input
            type="text"
            placeholder="Display name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-3"
          />
        )}
        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-3" />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !isSignUp && handleSubmit()}
          className="mb-3"
        />
        {isSignUp && (
          <Input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className="mb-3"
          />
        )}

        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : isSignUp ? "Sign Up" : "Sign In"}
        </Button>

        {!isSignUp && (
          <button onClick={() => { setForgotMode(true); setError(""); }} className="mt-2 block w-full text-center text-xs text-muted-foreground hover:text-foreground">
            Forgot password?
          </button>
        )}

        <button
          onClick={() => { setIsSignUp(!isSignUp); setError(""); }}
          className="mt-3 block w-full text-center text-sm text-muted-foreground hover:text-foreground"
        >
          {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
        </button>

        <button onClick={onClose} className="mt-4 block w-full text-center text-xs text-muted-foreground/60 hover:text-muted-foreground">
          Skip for now →
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
