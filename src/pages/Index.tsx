import HeroSection from "@/components/HeroSection";
import SalaryTierCard from "@/components/SalaryTierCard";
import FeedbackModal from "@/components/FeedbackModal";
import { salaryTiers } from "@/data/questions";

const Index = () => (
  <div className="min-h-screen bg-background">
    <HeroSection />

    <section className="mx-auto max-w-5xl px-4 py-12 md:py-16">
      <h2 className="mb-8 text-center text-quiz-heading text-foreground md:text-4xl">
        Choose Your Target Tier
      </h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {salaryTiers.map((tier, i) => (
          <div key={tier.key} className="animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
            <SalaryTierCard tier={tier} />
          </div>
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

export default Index;
