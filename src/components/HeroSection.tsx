import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/AuthModal";
import { ChevronDown } from "lucide-react";

const HeroSection = () => {
  const { user, profile, signOut, loading } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <section className="relative overflow-hidden px-4 py-20 text-center md:py-28">
      {/* Aurora shimmer background */}
      <div className="aurora-shimmer pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(263_70%_50%_/_0.08)_0%,_transparent_60%)]" />

      {/* Auth button - top right */}
      <div className="absolute right-4 top-4 z-20">
        {!loading && !user && (
          <button
            onClick={() => setAuthOpen(true)}
            className="rounded-lg border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/20"
          >
            Sign In
          </button>
        )}
        {!loading && user && profile && (
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setDropdownOpen((v) => !v)}
              className="flex items-center gap-2"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {profile.display_name?.charAt(0)?.toUpperCase() || "?"}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold text-foreground leading-tight">{profile.display_name}</p>
                <p className="text-xs text-muted-foreground">
                  🔥 {profile.current_streak} day streak • {profile.total_questions_answered} answered
                </p>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-border bg-card p-2 shadow-xl z-30">
                <button className="w-full rounded-lg px-3 py-2 text-left text-sm text-muted-foreground hover:bg-muted/50 hover:text-foreground">
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
      </div>

      <div className="relative z-10 mx-auto max-w-3xl">
        <h1 className="animate-fade-in-up text-hero-title text-foreground md:text-6xl md:leading-[1.08]">
          Master PM Interviews.{" "}
          <span className="text-secondary">Land Top Salaries.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl animate-fade-in-up text-hero-subtitle text-muted-foreground [animation-delay:150ms]">
          Practice real interview questions mapped to actual PM compensation tiers
        </p>
      </div>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </section>
  );
};

export default HeroSection;
