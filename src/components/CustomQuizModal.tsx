import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Question } from "@/hooks/useQuestions";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/AuthModal";
import { Button } from "@/components/ui/button";
import { Loader2, X, Lock } from "lucide-react";

const TIERS = ["Junior", "Mid", "Senior", "AI Frontier", "Staff+"];
const LOCKED_TIERS = new Set(["AI Frontier", "Staff+"]);
const CATEGORIES = ["Product Sense", "Metrics", "Product Design", "Behavioral"];
const QUESTION_COUNTS = [5, 10, 20, 30];
const DIFFICULTIES = [
  { label: "Any", min: 1, max: 5 },
  { label: "Easy (1-2)", min: 1, max: 2 },
  { label: "Medium (3)", min: 3, max: 3 },
  { label: "Hard (4-5)", min: 4, max: 5 },
];

interface CustomQuizModalProps {
  open: boolean;
  onClose: () => void;
}

const pillBase =
  "rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-150 cursor-pointer border";
const pillActive =
  "border-primary bg-primary/15 text-primary";
const pillInactive =
  "border-border bg-muted/50 text-foreground/60 hover:border-primary/40 hover:text-foreground/80";

const CustomQuizModal = ({ open, onClose }: CustomQuizModalProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [count, setCount] = useState(10);
  const [selectedTiers, setSelectedTiers] = useState<string[]>([...TIERS]);
  const [selectedCats, setSelectedCats] = useState<string[]>([...CATEGORIES]);
  const [difficulty, setDifficulty] = useState(0); // index into DIFFICULTIES
  const [matchCount, setMatchCount] = useState<number | null>(null);
  const [loadingCount, setLoadingCount] = useState(false);
  const [starting, setStarting] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const pendingStartRef = useRef(false);

  // Check if current selections require auth
  const requiresAuth = !user && (
    selectedTiers.some((t) => LOCKED_TIERS.has(t)) ||
    difficulty === 3 // Hard (4-5)
  );

  const toggleMulti = (arr: string[], val: string, setter: (v: string[]) => void) => {
    setter(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
  };

  // Live count of matching questions
  useEffect(() => {
    if (!open) return;
    const fetchCount = async () => {
      setLoadingCount(true);
      let query = (supabase.from("questions") as any)
        .select("id", { count: "exact", head: true })
        .eq("active", true);

      if (selectedTiers.length > 0 && selectedTiers.length < TIERS.length) {
        query = query.in("salaryTier", selectedTiers);
      }
      if (selectedCats.length > 0 && selectedCats.length < CATEGORIES.length) {
        query = query.in("category", selectedCats);
      }
      const d = DIFFICULTIES[difficulty];
      if (difficulty > 0) {
        query = query.gte("difficulty", d.min).lte("difficulty", d.max);
      }

      const { count: c } = await query;
      setMatchCount(c ?? 0);
      setLoadingCount(false);
    };
    fetchCount();
  }, [open, selectedTiers, selectedCats, difficulty]);

  const canStart = selectedTiers.length > 0 && selectedCats.length > 0;

  const executeStart = async () => {
    setStarting(true);

    let query = (supabase.from("questions") as any)
      .select("id, category, \"salaryTier\", \"salaryRange\", question, options, \"correctAnswers\", \"multipleCorrect\", hint, explanation")
      .eq("active", true);

    if (selectedTiers.length < TIERS.length) {
      query = query.in("salaryTier", selectedTiers);
    }
    if (selectedCats.length < CATEGORIES.length) {
      query = query.in("category", selectedCats);
    }
    const d = DIFFICULTIES[difficulty];
    if (difficulty > 0) {
      query = query.gte("difficulty", d.min).lte("difficulty", d.max);
    }
    query = query.limit(count);

    const { data } = await query;
    const questions = ((data || []) as Question[]).sort(() => Math.random() - 0.5);

    setStarting(false);
    onClose();
    navigate("/quiz/custom", {
      state: { questions, label: "⚙️ Custom Quiz" },
    });
  };

  // After auth succeeds, auto-start the quiz
  useEffect(() => {
    if (user && pendingStartRef.current) {
      pendingStartRef.current = false;
      executeStart();
    }
  }, [user]);

  const handleStart = () => {
    if (!canStart) return;
    if (requiresAuth) {
      pendingStartRef.current = true;
      setAuthOpen(true);
      return;
    }
    executeStart();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold text-foreground mb-6">⚙️ Build Custom Quiz</h2>

        {/* Section 1 — Number of Questions */}
        <div className="mb-5">
          <p className="text-sm font-semibold text-foreground/70 mb-2">Number of Questions</p>
          <div className="flex flex-wrap gap-2">
            {QUESTION_COUNTS.map((n) => (
              <button
                key={n}
                onClick={() => setCount(n)}
                className={`${pillBase} ${count === n ? pillActive : pillInactive}`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Section 2 — Tiers */}
        <div className="mb-5">
          <p className="text-sm font-semibold text-foreground/70 mb-2">Salary Tiers</p>
          <div className="flex flex-wrap gap-2">
            {TIERS.map((t) => (
              <button
                key={t}
                onClick={() => toggleMulti(selectedTiers, t, setSelectedTiers)}
                className={`${pillBase} ${selectedTiers.includes(t) ? pillActive : pillInactive}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Section 3 — Skills */}
        <div className="mb-5">
          <p className="text-sm font-semibold text-foreground/70 mb-2">Skill Focus</p>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => toggleMulti(selectedCats, c, setSelectedCats)}
                className={`${pillBase} ${selectedCats.includes(c) ? pillActive : pillInactive}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Section 4 — Difficulty */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-foreground/70 mb-2">Difficulty</p>
          <div className="flex flex-wrap gap-2">
            {DIFFICULTIES.map((d, i) => (
              <button
                key={d.label}
                onClick={() => setDifficulty(i)}
                className={`${pillBase} ${difficulty === i ? pillActive : pillInactive}`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Match count */}
        <p className="text-xs text-muted-foreground mb-4">
          {loadingCount ? (
            <span className="flex items-center gap-1"><Loader2 className="w-3 h-3 animate-spin" /> Counting...</span>
          ) : matchCount !== null ? (
            `${matchCount} question${matchCount !== 1 ? "s" : ""} match your filters`
          ) : null}
        </p>

        {/* Auth requirement notice */}
        {requiresAuth && (
          <p className="text-xs text-amber-500 mb-3 flex items-center gap-1">
            <Lock className="w-3 h-3" /> Sign in required for selected tiers/difficulty
          </p>
        )}

        {/* Start */}
        <Button
          onClick={handleStart}
          disabled={!canStart || starting}
          className="w-full text-base font-semibold h-12"
          style={{
            backgroundColor: canStart ? "hsl(263, 70%, 50%)" : "hsl(220, 13%, 31%)",
            color: "white",
          }}
        >
          {starting ? (
            <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Loading...</span>
          ) : requiresAuth ? (
            <span className="flex items-center gap-2"><Lock className="w-4 h-4" /> Sign In & Start Quiz</span>
          ) : (
            "Start Custom Quiz"
          )}
        </Button>
      </div>

      <AuthModal
        open={authOpen}
        onClose={() => {
          setAuthOpen(false);
          pendingStartRef.current = false;
        }}
        heading="Sign In to Start This Quiz"
      />
    </div>
  );
};

export default CustomQuizModal;
