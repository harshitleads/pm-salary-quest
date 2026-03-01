import { useNavigate } from "react-router-dom";
import { salaryTiers } from "@/data/questions";

const tierButtonLabels: Record<string, string> = {
  Junior: "Practice Junior Questions →",
  "Mid": "Practice Mid-Level Questions →",
  Senior: "Practice Senior Questions →",
  "AI Frontier": "Practice AI Frontier Questions →",
  "Staff+": "Practice Staff+ Questions →",
};

const SalaryTierCard = ({ tier }: { tier: typeof salaryTiers[number] }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/quiz/${encodeURIComponent(tier.key)}`)}
      className={`${tier.gradient} group relative w-full h-full overflow-hidden rounded-2xl p-6 text-left shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl active:scale-[0.98] flex flex-col`}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="relative z-10 flex flex-col gap-3 flex-1">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-sm font-bold tracking-wide text-white backdrop-blur-sm">
          {tier.emoji} {tier.label}
        </span>
        <p className="text-hero-title text-white drop-shadow-md">{tier.salary}</p>
        <p className="text-base font-medium text-white/80">{tier.companies}</p>
        <span className="mt-auto inline-flex items-center gap-1 text-quiz-option font-semibold text-white underline-offset-4 group-hover:underline">
          {tierButtonLabels[tier.key]}
        </span>
      </div>
    </button>
  );
};

export default SalaryTierCard;
