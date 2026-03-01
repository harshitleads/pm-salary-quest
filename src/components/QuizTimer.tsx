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

  const isNegative = timeLeft < 0;
  const absTime = Math.abs(timeLeft);
  const minutes = Math.floor(absTime / 60);
  const seconds = absTime % 60;
  const display = `${isNegative ? "-" : ""}${minutes}:${seconds.toString().padStart(2, "0")}`;

  const percentage = Math.max(0, (timeLeft / duration) * 100);

  return (
    <div className="flex items-center gap-1.5">
      <span className="text-muted-foreground text-lg md:text-xl">⏱</span>
      <span
        className={`font-display text-sm font-bold tabular-nums ${
          isNegative ? "text-destructive" : timeLeft <= 10 ? "text-secondary" : "text-muted-foreground"
        }`}
      >
        {display}
      </span>
    </div>
  );
};

export default QuizTimer;
