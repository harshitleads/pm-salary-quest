import { useNavigate } from "react-router-dom";
import { salaryTiers } from "@/data/questions";
import { Target } from "lucide-react";

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

interface SalaryTierCardProps {
  tier: typeof salaryTiers[number];
  onAuthRequired?: () => void;
}

const SalaryTierCard = ({ tier }: SalaryTierCardProps) => {
  const navigate = useNavigate();
  const isStaff = tier.key === "Staff+";
  const glowColor = tierGlowColors[tier.key] || "hsl(263 70% 50%)";

  const handleClick = () => {
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
      <div className="relative z-10 flex flex-col justify-between gap-3 flex-1">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-black/25 px-3 py-1 text-sm font-bold tracking-wide text-white backdrop-blur-sm">
          <Target size={12} /> {tier.label}
        </span>
        <p className="text-hero-title text-white drop-shadow-md">{tier.salary}</p>
        <p className="text-base font-medium text-white/75">{tier.companies}</p>
        <span className="mt-auto inline-flex items-center gap-1 text-[15px] font-semibold text-white/90 underline-offset-4 group-hover:underline whitespace-nowrap">
          {tierButtonLabels[tier.key]}
        </span>
      </div>
    </button>
  );
};

export default SalaryTierCard;
