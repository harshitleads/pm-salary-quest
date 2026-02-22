import { useState, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { questions, salaryTiers } from "@/data/questions";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";

const Quiz = () => {
  const { tier } = useParams<{ tier: string }>();
  const navigate = useNavigate();
  const decodedTier = decodeURIComponent(tier || "");

  const tierInfo = salaryTiers.find((t) => t.key === decodedTier);
  const tierQuestions = useMemo(
    () => questions.filter((q) => q.salaryTier === decodedTier),
    [decodedTier]
  );

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [points, setPoints] = useState(0);
  const [pointsBump, setPointsBump] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [attemptedFirst, setAttemptedFirst] = useState<Record<number, boolean>>({});

  const q = tierQuestions[currentIdx];

  const toggleSelect = (idx: number) => {
    if (submitted) return;
    if (q.multipleCorrect) {
      setSelected((prev) => (prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]));
    } else {
      setSelected([idx]);
    }
  };

  const handleSubmit = useCallback(() => {
    if (selected.length === 0 || submitted) return;
    setSubmitted(true);

    const correct =
      selected.length === q.correctAnswers.length &&
      selected.every((s) => q.correctAnswers.includes(s));

    if (correct && !attemptedFirst[q.id]) {
      setPoints((p) => p + 10);
      setPointsBump(true);
      setTimeout(() => setPointsBump(false), 400);
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.7 } });
    }

    setAttemptedFirst((prev) => ({ ...prev, [q.id]: true }));
  }, [selected, submitted, q, attemptedFirst]);

  const goTo = (dir: number) => {
    const next = currentIdx + dir;
    if (next < 0 || next >= tierQuestions.length) return;
    setCurrentIdx(next);
    setSelected([]);
    setSubmitted(false);
    setShowHint(false);
    setShowExplanation(false);
  };

  if (!tierInfo || tierQuestions.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-quiz-heading text-foreground">Tier not found</p>
          <Button className="mt-4" onClick={() => navigate("/")}>Go Home</Button>
        </div>
      </div>
    );
  }

  const optionLabel = (i: number) => String.fromCharCode(65 + i);

  const optionClass = (i: number) => {
    const base =
      "flex w-full items-start gap-3 rounded-xl border-2 px-5 py-4 text-left text-quiz-option transition-all duration-200";
    if (!submitted) {
      return `${base} ${
        selected.includes(i)
          ? "border-primary bg-primary/5 shadow-md"
          : "border-border bg-card hover:border-primary/40 hover:shadow-sm"
      } cursor-pointer`;
    }
    const isCorrect = q.correctAnswers.includes(i);
    const wasSelected = selected.includes(i);
    if (isCorrect) return `${base} border-success bg-success/10 text-foreground`;
    if (wasSelected && !isCorrect) return `${base} border-destructive bg-destructive/10 text-foreground`;
    return `${base} border-border bg-card opacity-60`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/")} className="text-muted-foreground transition-colors hover:text-foreground">
              ← Back
            </button>
            <span className={`${tierInfo.gradient} rounded-full px-3 py-1 text-xs font-bold tracking-wide text-white`}>
              {tierInfo.label} • {tierInfo.salary.replace(" ", "")}
            </span>
          </div>
          <span className={`text-quiz-option font-bold text-points ${pointsBump ? "animate-points-bump" : ""}`}>
            Points: {points}
          </span>
        </div>
      </header>

      {/* Question area */}
      <main className="mx-auto max-w-3xl px-4 py-8">
        <div className="animate-scale-pop rounded-2xl border border-border bg-card p-6 shadow-xl md:p-8" key={q.id}>
          {/* Meta */}
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-muted-foreground">
              Question {currentIdx + 1} of {tierQuestions.length}
            </span>
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
              {q.category}
            </span>
            {q.multipleCorrect && (
              <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-bold text-secondary-foreground">
                SELECT ALL THAT APPLY
              </span>
            )}
          </div>

          {/* Question */}
          <h2 className="mb-6 text-quiz-question text-foreground">{q.question}</h2>

          {/* Options */}
          <div className="flex flex-col gap-3">
            {q.options.map((opt, i) => (
              <button key={i} onClick={() => toggleSelect(i)} className={optionClass(i)}>
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-muted text-sm font-bold text-muted-foreground">
                  {optionLabel(i)}
                </span>
                <span>{opt}</span>
              </button>
            ))}
          </div>

          {/* Hint */}
          <div className="mt-5">
            <button
              onClick={() => setShowHint((v) => !v)}
              className="text-sm font-semibold text-secondary-foreground transition-colors hover:text-primary"
            >
              {showHint ? "Hide Hint" : "Show Hint 💡"}
            </button>
            {showHint && (
              <div className="mt-2 rounded-lg border border-[hsl(var(--hint-border))] bg-[hsl(var(--hint-bg))] px-4 py-3 text-base italic text-foreground/80">
                💡 {q.hint}
              </div>
            )}
          </div>

          {/* Submit */}
          {!submitted && (
            <Button
              onClick={handleSubmit}
              disabled={selected.length === 0}
              size="lg"
              className="mt-6 w-full text-quiz-option"
            >
              Submit Answer
            </Button>
          )}

          {/* Feedback */}
          {submitted && (
            <div className="mt-6 space-y-3">
              <p className="text-base font-semibold">
                {selected.every((s) => q.correctAnswers.includes(s)) &&
                selected.length === q.correctAnswers.length
                  ? "✅ Correct!"
                  : `❌ Not quite. Correct: ${q.correctAnswers.map((c) => optionLabel(c)).join(", ")}`}
              </p>
              {!showExplanation && (
                <Button variant="outline" onClick={() => setShowExplanation(true)} className="text-base">
                  View Explanation 📚
                </Button>
              )}
              {showExplanation && (
                <div className="rounded-lg border border-border bg-muted/50 p-4 text-base text-foreground/90">
                  <p className="mb-1 font-semibold">
                    Correct Answer{q.correctAnswers.length > 1 ? "s" : ""}:{" "}
                    {q.correctAnswers.map((c) => optionLabel(c)).join(", ")}
                  </p>
                  <p>{q.explanation}</p>
                </div>
              )}

              {/* Retry */}
              {!(
                selected.every((s) => q.correctAnswers.includes(s)) &&
                selected.length === q.correctAnswers.length
              ) && (
                <Button
                  variant="secondary"
                  onClick={() => {
                    setSubmitted(false);
                    setSelected([]);
                    setShowExplanation(false);
                  }}
                  className="text-base"
                >
                  Retry Question
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-6 flex justify-between gap-4">
          <Button variant="outline" size="lg" disabled={currentIdx === 0} onClick={() => goTo(-1)} className="text-quiz-option">
            ← Previous
          </Button>
          <Button variant="outline" size="lg" disabled={currentIdx === tierQuestions.length - 1} onClick={() => goTo(1)} className="text-quiz-option">
            Next →
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Quiz;
