import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/AuthModal";
import { ChevronDown, BarChart2, Flame } from "lucide-react";

const AppHeader = () => {
  const navigate = useNavigate();
  const { user, profile, signOut, loading } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [authHeading, setAuthHeading] = useState<string | undefined>();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const displayName = profile?.display_name || user?.user_metadata?.name || user?.email?.split("@")[0] || "User";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 flex h-14 items-center justify-end px-4 bg-[hsl(240,20%,5%,0.95)] backdrop-blur-md">
        {!loading && !user && (
          <div className="flex items-center gap-3">
            <button
              onClick={() => { setAuthHeading("Sign in to track your progress"); setAuthOpen(true); }}
              className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              Progress
            </button>
            <button
              onClick={() => { setAuthHeading(undefined); setAuthOpen(true); }}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Sign In
            </button>
          </div>
        )}
        {!loading && user && (
          <div ref={dropdownRef} className="relative flex items-center gap-3">
            <button
              onClick={() => navigate("/progress")}
              className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
            >
              <BarChart2 size={14} /> Progress
            </button>
            <button
              onClick={() => setDropdownOpen((v) => !v)}
              className="flex items-center gap-2"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {initial}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold text-foreground leading-tight">{displayName}</p>
                {profile && (
                  <p className="text-xs text-muted-foreground inline-flex items-center gap-1">
                    <Flame size={12} className="text-[#7C3AED]" /> {profile.current_streak} day streak • {profile.total_questions_answered} answered
                  </p>
                )}
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-border bg-card p-2 shadow-xl z-30">
                <button
                  onClick={() => { navigate("/progress"); setDropdownOpen(false); }}
                  className="w-full rounded-lg px-3 py-2 text-left text-sm text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                >
                  My Progress
                </button>
                <button
                  onClick={() => { signOut(); setDropdownOpen(false); }}
                  className="w-full rounded-lg px-3 py-2 text-left text-sm text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )}
      </header>

      <AuthModal open={authOpen} onClose={() => { setAuthOpen(false); setAuthHeading(undefined); }} heading={authHeading} />
    </>
  );
};

export default AppHeader;
