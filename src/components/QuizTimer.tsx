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
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const display = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  return (
    <div className="flex items-center gap-1.5">
      <span className="text-muted-foreground text-2xl leading-none">⏱</span>
      <span
        className={`font-display text-base font-bold tabular-nums ${
          expired ? "text-destructive" : timeLeft <= 10 ? "text-secondary" : "text-muted-foreground"
        }`}
      >
        {display}
      </span>
    </div>
  );
};

export default QuizTimer;
