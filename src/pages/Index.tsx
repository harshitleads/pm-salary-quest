import { useNavigate } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import SalaryTierCard from "@/components/SalaryTierCard";
import FeedbackModal from "@/components/FeedbackModal";
import { salaryTiers, questions } from "@/data/questions";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";

const Index = () => {
  const navigate = useNavigate();

  const categories = useMemo(() => {
    const cats = new Set(questions.map((q) => q.category));
    return Array.from(cats).sort();
  }, []);

  const shuffleAndGo = () => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    navigate("/quiz/shuffle", { state: { questions: shuffled, label: "🔀 Shuffle • All Tiers" } });
  };

  const categoryGo = (cat: string) => {
    const filtered = [...questions.filter((q) => q.category === cat)].sort(() => Math.random() - 0.5);
    navigate(`/quiz/category-${cat}`, { state: { questions: filtered, label: `📂 ${cat}` } });
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />

      <section className="mx-auto max-w-5xl px-4 py-12 md:py-16">
        <h2 className="mb-8 text-center text-quiz-heading text-foreground md:text-4xl">
          Choose Your Target Tier
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 justify-center">
          {salaryTiers.slice(0, 3).map((tier, i) => (
            <div key={tier.key} className="animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
              <SalaryTierCard tier={tier} />
            </div>
          ))}
        </div>
        <div className="mt-5 flex justify-center gap-5">
          {salaryTiers.slice(3).map((tier, i) => (
            <div key={tier.key} className="animate-fade-in-up w-full sm:w-auto sm:flex-1 lg:max-w-[calc(33.333%-0.42rem)]" style={{ animationDelay: `${(i + 3) * 80}ms` }}>
              <SalaryTierCard tier={tier} />
            </div>
          ))}
        </div>
      </section>

      {/* Shuffle & Category modes */}
      <section className="mx-auto max-w-5xl px-4 pb-12">
        <h2 className="mb-6 text-center text-quiz-heading text-foreground md:text-4xl">
          Or Practice By Mode
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          <Button
            size="lg"
            onClick={shuffleAndGo}
            className="text-quiz-option bg-secondary text-secondary-foreground hover:bg-secondary/90"
          >
            🔀 Shuffle All Questions
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat}
              size="lg"
              variant="outline"
              onClick={() => categoryGo(cat)}
              className="text-quiz-option"
            >
              📂 {cat}
            </Button>
          ))}
        </div>
      </section>

      <footer className="border-t border-border bg-muted/40 px-4 py-10 text-center">
        <div className="mx-auto flex max-w-md flex-col items-center gap-4">
          <FeedbackModal />
          <p className="text-sm text-muted-foreground">
            Built by <span className="font-semibold text-foreground">Harshit Sharma</span> | Berkeley MEng PM Club
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
