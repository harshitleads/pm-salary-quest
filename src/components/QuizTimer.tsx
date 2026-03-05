import { useState, useEffect, useRef, useImperativeHandle, forwardRef } from "react";

export interface QuizTimerHandle {
  reset: () => void;
  stop: () => void;
}

interface QuizTimerProps {
  questionId: number;
  duration?: number;
  onTimerValue?: (seconds: number) => void;
  size?: number;
  fontSize?: number;
}

const QuizTimer = forwardRef<QuizTimerHandle, QuizTimerProps>(
  ({ questionId, duration = 45, onTimerValue, size = 52, fontSize = 13 }, ref) => {
    const [timeLeft, setTimeLeft] = useState(duration);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const startTimer = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setTimeLeft(duration);
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
    };

    useImperativeHandle(ref, () => ({
      reset: () => startTimer(),
      stop: () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      },
    }));

    useEffect(() => {
      setTimeLeft(duration);
      startTimer();
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }, [questionId, duration]);

    useEffect(() => {
      onTimerValue?.(timeLeft);
    }, [timeLeft, onTimerValue]);

    const expired = timeLeft === 0;
    const pct = timeLeft / duration;
    const radius = (size - 8) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = expired ? 0 : circumference * (1 - pct);

    let strokeColor = "hsl(160, 84%, 39%)";
    if (expired || pct <= 0.22) strokeColor = "hsl(0, 84%, 60%)";
    else if (pct <= 0.5) strokeColor = "hsl(45, 97%, 54%)";

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const display = `${minutes}:${seconds.toString().padStart(2, "0")}`;
    const center = size / 2;

    return (
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="absolute inset-0 -rotate-90">
          <circle cx={center} cy={center} r={radius} fill="none" stroke="hsl(var(--border))" strokeWidth="3" />
          <circle
            cx={center}
            cy={center}
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
          className={`relative z-10 font-body font-bold tabular-nums ${expired ? "text-destructive" : "text-foreground"}`}
          style={{ fontSize }}
        >
          {display}
        </span>
      </div>
    );
  }
);

QuizTimer.displayName = "QuizTimer";
export default QuizTimer;
