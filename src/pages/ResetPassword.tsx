import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isRecovery, setIsRecovery] = useState(false);

  useEffect(() => {
    // Check for recovery event
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setIsRecovery(true);
    });

    // Also check hash for type=recovery
    if (window.location.hash.includes("type=recovery")) setIsRecovery(true);

    return () => subscription.unsubscribe();
  }, []);

  const handleReset = async () => {
    setError("");
    if (password.length < 6) { setError("Password must be at least 6 characters"); return; }
    if (password !== confirm) { setError("Passwords do not match"); return; }

    const { error: err } = await supabase.auth.updateUser({ password });
    if (err) setError(err.message);
    else setSuccess(true);
  };

  if (!isRecovery) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="text-center">
          <p className="text-lg text-foreground">Invalid or expired reset link.</p>
          <Button className="mt-4" onClick={() => navigate("/")}>Go Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-xl">
        <h1 className="mb-2 text-center text-xl font-bold text-foreground">Set New Password</h1>
        {success ? (
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">Password updated successfully!</p>
            <Button onClick={() => navigate("/")} className="w-full">Go Home</Button>
          </div>
        ) : (
          <>
            {error && <p className="mb-3 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>}
            <Input type="password" placeholder="New password" value={password} onChange={(e) => setPassword(e.target.value)} className="mb-3" />
            <Input type="password" placeholder="Confirm password" value={confirm} onChange={(e) => setConfirm(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleReset()} className="mb-4" />
            <Button onClick={handleReset} className="w-full bg-primary text-primary-foreground">Update Password</Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
