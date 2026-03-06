import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AppHeader from "@/components/AppHeader";
import HeroSection from "@/components/HeroSection";
import SalaryTierCard from "@/components/SalaryTierCard";
import FeedbackModal from "@/components/FeedbackModal";
import CustomQuizModal from "@/components/CustomQuizModal";
import AuthModal from "@/components/AuthModal";
import { salaryTiers } from "@/data/questions";
import { Button } from "@/components/ui/button";
import { useQuestions } from "@/hooks/useQuestions";
import { useAuth } from "@/contexts/AuthContext";
import { useMemo } from "react";
import { Shuffle, SlidersHorizontal, Lightbulb, BarChart2, Palette, Users } from "lucide-react";

const categoryIcons: Record<string, React.ReactNode> = {
  "Product Sense": <Lightbulb size={16} />,
  "Metrics": <BarChart2 size={16} />,
  "Product Design": <Palette size={16} />,
  "Behavioral": <Users size={16} />,
};

const Index = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { questions, loading } = useQuestions({ shuffle: false });
  const [customOpen, setCustomOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authHeading, setAuthHeading] = useState<string | undefined>();
  const dismissedRef = useRef(false);

  // Trigger 1: show auth modal after 1.5s for unauthenticated users
  useEffect(() => {
    if (authLoading || user || dismissedRef.current) return;
    const timer = setTimeout(() => {
      if (!dismissedRef.current) setAuthOpen(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, [authLoading, user]);

  const handleAuthClose = () => {
    setAuthOpen(false);
    setAuthHeading(undefined);
    dismissedRef.current = true;
  };

  const handleTierAuthRequired = () => {
    setAuthHeading("Sign In to Access This Tier");
    setAuthOpen(true);
  };

  const categories = useMemo(() => {
    const cats = new Set(questions.map((q) => q.category));
    return Array.from(cats).sort();
  }, [questions]);

  const shuffleAndGo = () => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5).slice(0, 10);
    navigate("/quiz/shuffle", { state: { questions: shuffled, label: "Shuffle \u2022 All Tiers" } });
  };

  const categoryGo = (cat: string) => {
    const filtered = [...questions.filter((q) => q.category === cat)].sort(() => Math.random() - 0.5).slice(0, 10);
    navigate(`/quiz/category-${cat}`, { state: { questions: filtered, label: cat } });
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <HeroSection />

      <section className="mx-auto max-w-5xl px-4 py-12 md:py-16">
        <h2 className="mb-8 text-center text-quiz-heading text-foreground md:text-4xl">
          Choose Your Target Tier
        </h2>
        <div className="tier-grid grid gap-5 grid-cols-1 sm:grid-cols-2 items-stretch">
          {salaryTiers.map((tier, i) => (
            <div
              key={tier.key}
              className={`animate-fade-in-up w-full h-full ${
                i === salaryTiers.length - 1 ? "sm:col-span-2" : ""
              }`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <SalaryTierCard tier={tier} onAuthRequired={handleTierAuthRequired} />
            </div>
          ))}
        </div>

        {/* Custom Quiz Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setCustomOpen(true)}
            className="w-full max-w-[480px] rounded-xl border px-6 py-3.5 text-base font-semibold transition-all duration-200 hover:bg-primary/5 inline-flex items-center justify-center gap-2"
            style={{ borderColor: "hsl(263, 70%, 50%)", color: "hsl(263, 70%, 50%)" }}
          >
            <SlidersHorizontal size={16} /> Build Custom Quiz
          </button>
        </div>
      </section>

      {/* Shuffle & Category modes */}
      <section className="mx-auto max-w-5xl px-4 pb-12">
        <h2 className="mb-6 text-center text-quiz-heading text-foreground md:text-4xl">
          Or Practice By Mode
        </h2>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
          <Button
            size="lg"
            onClick={shuffleAndGo}
            disabled={loading || questions.length === 0}
            className="w-full sm:w-auto text-quiz-option bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2"
          >
            <Shuffle size={16} /> Shuffle All Questions
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat}
              size="lg"
              variant="outline"
              onClick={() => categoryGo(cat)}
              className="w-full sm:w-auto text-quiz-option inline-flex items-center gap-2"
            >
              {categoryIcons[cat] || <Lightbulb size={16} />} {cat}
            </Button>
          ))}
        </div>
      </section>

      <footer className="border-t border-border bg-card/50 px-4 py-10 text-center">
        <div className="mx-auto flex max-w-md flex-col items-center gap-4">
          <FeedbackModal />
          <p className="text-sm text-muted-foreground">
            Built by <span className="font-semibold text-foreground">Harshit Sharma</span> | Berkeley MEng PM Club
          </p>
        </div>
      </footer>

      <CustomQuizModal open={customOpen} onClose={() => setCustomOpen(false)} />
      <AuthModal open={authOpen} onClose={handleAuthClose} heading={authHeading} />
    </div>
  );
};

export default Index;
