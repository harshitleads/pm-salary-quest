import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/AuthModal";
import { ChevronDown } from "lucide-react";

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

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-40 flex h-14 items-center backdrop-blur-md"
        style={{ backgroundColor: "rgba(13, 13, 20, 0.95)" }}
      >
        <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-6">
          {/* Left: Logo */}
          <button
            onClick={() => navigate("/")}
            className="text-base font-semibold text-white hover:opacity-90 transition-opacity"
          >
            PM Salary Ace
          </button>

          {/* Right: Auth controls */}
          <div className="flex items-center gap-3">
            {!loading && !user && (
              <>
                <button
                  onClick={() => { setAuthHeading("Sign in to track your progress"); setAuthOpen(true); }}
                  className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
                >
                  Progress
                </button>
                <button
                  onClick={() => { setAuthHeading(undefined); setAuthOpen(true); }}
                  className="rounded-lg text-sm font-medium text-white transition-colors hover:opacity-90"
                  style={{ backgroundColor: "#7C3AED", padding: "8px 20px" }}
                >
                  Sign In
                </button>
              </>
            )}
            {!loading && user && profile && (
              <div ref={dropdownRef} className="relative flex items-center">
                <button
                  onClick={() => navigate("/progress")}
                  className="mr-4 text-xs font-semibold transition-colors hover:text-foreground"
                  style={{ color: "#94A3B8" }}
                >
                  📊 Progress
                </button>
                <button
                  onClick={() => setDropdownOpen((v) => !v)}
                  className="flex items-center gap-2"
                >
                  <div
                    className="flex items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{ width: 36, height: 36, backgroundColor: "#7C3AED" }}
                  >
                    {profile.display_name?.charAt(0)?.toUpperCase() || "?"}
                  </div>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-border bg-card p-2 shadow-xl z-50">
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
          </div>
        </div>
      </header>

      <AuthModal open={authOpen} onClose={() => { setAuthOpen(false); setAuthHeading(undefined); }} heading={authHeading} />
    </>
  );
};

export default AppHeader;
