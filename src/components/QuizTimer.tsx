import { useState, useEffect, useRef } from "react";

interface QuizTimerProps {
  questionId: number;
  duration?: number;
  onTimerValue?: (seconds: number) => void;
}

const QuizTimer = ({ questionId, duration = 45, onTimerValue }: QuizTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setTimeLeft(duration);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev - 1;
        if (next <= 0) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return 0;
        }
        return next;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [questionId, duration]);

  useEffect(() => {
    onTimerValue?.(timeLeft);
  }, [timeLeft, onTimerValue]);

  const expired = timeLeft === 0;
  const pct = timeLeft / duration;
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - pct);

  // Color: green → yellow → red
  let strokeColor = "hsl(160, 84%, 39%)"; // green
  if (pct <= 0.22) strokeColor = "hsl(0, 84%, 60%)"; // red
  else if (pct <= 0.5) strokeColor = "hsl(45, 97%, 54%)"; // yellow

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const display = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  return (
    <div className="relative flex items-center justify-center" style={{ width: 52, height: 52 }}>
      <svg width="52" height="52" className="absolute inset-0 -rotate-90">
        <circle cx="26" cy="26" r={radius} fill="none" stroke="hsl(var(--border))" strokeWidth="3" />
        <circle
          cx="26"
          cy="26"
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: "stroke-dashoffset 1s linear, stroke 0.5s ease" }}
        />
      </svg>
      <span
        className={`relative z-10 font-body text-xs font-bold tabular-nums ${
          expired ? "text-destructive" : "text-foreground"
        }`}
      >
        {display}
      </span>
    </div>
  );
};

export default QuizTimer;
