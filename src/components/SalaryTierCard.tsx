import { useNavigate } from "react-router-dom";
import { salaryTiers } from "@/data/questions";
import { Lock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const tierButtonLabels: Record<string, string> = {
  Junior: "Practice Junior Questions →",
  "Mid": "Practice Mid-Level Questions →",
  Senior: "Practice Senior Questions →",
  "AI Frontier": "Practice AI Frontier Questions →",
  "Staff+": "Practice Staff+ Questions →",
};

const tierGlowColors: Record<string, string> = {
  Junior: "hsl(217 89% 56%)",
  Mid: "hsl(160 80% 55%)",
  Senior: "hsl(35 92% 60%)",
  "AI Frontier": "hsl(280 80% 65%)",
  "Staff+": "hsl(38 92% 50%)",
};

const lockedTiers = new Set(["AI Frontier", "Staff+"]);

interface SalaryTierCardProps {
  tier: typeof salaryTiers[number];
  onAuthRequired?: () => void;
}

const SalaryTierCard = ({ tier, onAuthRequired }: SalaryTierCardProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isStaff = tier.key === "Staff+";
  const isLocked = !user && lockedTiers.has(tier.key);
  const glowColor = tierGlowColors[tier.key] || "hsl(263 70% 50%)";

  const handleClick = () => {
    if (isLocked && onAuthRequired) {
      onAuthRequired();
      return;
    }
    navigate(`/quiz/${encodeURIComponent(tier.key)}`);
  };

  return (
    <button
      onClick={handleClick}
      className={`${tier.gradient} group relative w-full h-full overflow-hidden rounded-2xl p-6 text-left shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl active:scale-[0.98] flex flex-col ${
        isStaff ? "min-h-[200px] ring-2 ring-secondary/50" : "min-h-[200px]"
      }`}
      style={{ boxShadow: `0 0 0 1px transparent` }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${glowColor}40, 0 0 0 1px ${glowColor}60`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 1px transparent`;
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      {isLocked && (
        <div className="absolute top-3 right-3 z-20 rounded-full bg-black/30 p-1.5 backdrop-blur-sm">
          <Lock className="h-4 w-4 text-white/70" />
        </div>
      )}
      <div className="relative z-10 flex flex-col justify-between gap-3 flex-1">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-sm font-bold tracking-wide text-white backdrop-blur-sm">
          {tier.emoji} {tier.label}
        </span>
        <p className="text-[36px] min-[390px]:text-[42px] md:text-hero-title text-white drop-shadow-md whitespace-nowrap">{tier.salary}</p>
        <p className="text-base font-medium text-white/75">{tier.companies}</p>
        <span className="mt-auto inline-flex items-center gap-1 text-quiz-option font-semibold text-white/90 underline-offset-4 group-hover:underline">
          {isLocked ? "🔒 Sign in to access" : tierButtonLabels[tier.key]}
        </span>
      </div>
    </button>
  );
};

export default SalaryTierCard;
