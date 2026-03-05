import { useState, useCallback, useMemo, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { questions, salaryTiers } from "@/data/questions";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import confetti from "canvas-confetti";
import QuizTimer from "@/components/QuizTimer";
import QuizResults from "@/components/QuizResults";
import QuestionVote from "@/components/QuestionVote";

interface QuestionResult {
  id: number;
  category: string;
  correct: boolean;
}

const Quiz = () => {
  const { tier } = useParams<{ tier: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const decodedTier = decodeURIComponent(tier || "");

  const customQuestions = (location.state as any)?.questions as typeof questions | undefined;
  const customLabel = (location.state as any)?.label as string | undefined;

  const tierInfo = salaryTiers.find((t) => t.key === decodedTier);
  const tierQuestions = useMemo(() => {
    if (customQuestions) return customQuestions;
    return [...questions.filter((q) => q.salaryTier === decodedTier)].sort(() => Math.random() - 0.5);
  }, [decodedTier, customQuestions]);

  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [selected, setSelected] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(false);
  const [points, setPoints] = useState(0);
  const [pointsBump, setPointsBump] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [attemptedFirst, setAttemptedFirst] = useState<Record<number, boolean>>({});
  const [timeExpired, setTimeExpired] = useState(false);
  const [flagOpen, setFlagOpen] = useState(false);
  const [flagText, setFlagText] = useState("");
  const [flagSubmitted, setFlagSubmitted] = useState(false);

  const [questionResults, setQuestionResults] = useState<QuestionResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  const q = tierQuestions[currentIdx];

  const toggleSelect = (idx: number) => {
    if (submitted || timeExpired) return;
    if (q.multipleCorrect) {
      setSelected((prev) => (prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]));
    } else {
      setSelected([idx]);
    }
  };

  const handleTimerValue = useCallback((seconds: number) => {
    if (seconds === 0 && !submitted) {
      setTimeExpired(true);
      setQuestionResults((prev) => {
        const existing = prev.find((r) => r.id === q.id);
        if (existing) return prev;
        return [...prev, { id: q.id, category: q.category, correct: false }];
      });
    }
  }, [submitted, q]);

  const recordResult = useCallback(
    (correct: boolean) => {
      setQuestionResults((prev) => {
        const existing = prev.find((r) => r.id === q.id);
        if (existing) return prev;
        return [...prev, { id: q.id, category: q.category, correct }];
      });
    },
    [q]
  );

  const handleSubmit = useCallback(() => {
    if (selected.length === 0 || submitted) return;
    setSubmitted(true);
    setEarnedPoints(false);

    const correct =
      selected.length === q.correctAnswers.length &&
      selected.every((s) => q.correctAnswers.includes(s));

    setIsCorrect(correct);
    recordResult(correct);

    const firstAttempt = !attemptedFirst[q.id];
    if (correct && firstAttempt) {
      setPoints((p) => p + 10);
      setEarnedPoints(true);
      setPointsBump(true);
      setTimeout(() => setPointsBump(false), 400);
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.7 } });
    }

    setAttemptedFirst((prev) => ({ ...prev, [q.id]: true }));
  }, [selected, submitted, q, attemptedFirst, recordResult]);

  const goTo = (dir: number) => {
    const next = currentIdx + dir;
    if (next < 0 || next >= tierQuestions.length) return;
    setCurrentIdx(next);
    setSelected([]);
    setSubmitted(false);
    setIsCorrect(false);
    setShowHint(false);
    setShowExplanation(false);
    setTimeExpired(false);
    setFlagOpen(false);
    setFlagText("");
    setFlagSubmitted(false);
  };

  const handleEndQuiz = () => {
    tierQuestions.forEach((tq) => {
      const alreadyRecorded = questionResults.find((r) => r.id === tq.id);
      if (!alreadyRecorded) {
        setQuestionResults((prev) => [...prev, { id: tq.id, category: tq.category, correct: false }]);
      }
    });
    setShowResults(true);
  };

  const handleRetry = () => {
    setCurrentIdx(0);
    setSelected([]);
    setSubmitted(false);
    setIsCorrect(false);
    setPoints(0);
    setShowHint(false);
    setShowExplanation(false);
    setAttemptedFirst({});
    setQuestionResults([]);
    setShowResults(false);
    setTimeExpired(false);
    setFlagOpen(false);
    setFlagText("");
    setFlagSubmitted(false);
  };

  const handleFlag = async () => {
    if (!flagText.trim()) return;
    await supabase.from("feedback").insert({
      question_id: q.id,
      feedback_type: "Question Flag",
      description: flagText.trim(),
    } as any);
    setFlagSubmitted(true);
    setTimeout(() => {
      setFlagOpen(false);
      setFlagSubmitted(false);
      setFlagText("");
    }, 1500);
  };

  if (!tierQuestions || tierQuestions.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-quiz-heading text-foreground">No questions found</p>
          <Button className="mt-4" onClick={() => navigate("/")}>Go Home</Button>
        </div>
      </div>
    );
  }

  const headerLabel = customLabel || (tierInfo ? `${tierInfo.label} • ${tierInfo.salary.replace(" ", "")}` : decodedTier);
  const headerGradient = tierInfo?.gradient || "gradient-tier-junior";

  if (showResults) {
    return (
      <QuizResults
        results={questionResults}
        totalPoints={points}
        tierLabel={headerLabel}
        onRetry={handleRetry}
      />
    );
  }

  const optionLabel = (i: number) => String.fromCharCode(65 + i);

  const progressPct = ((currentIdx + 1) / tierQuestions.length) * 100;

  const optionClass = (i: number) => {
    const base =
      "flex w-full items-start gap-3 rounded-xl border px-5 py-4 text-left text-quiz-option transition-all duration-200";
    if (!submitted) {
      return `${base} ${
        selected.includes(i)
          ? "border-primary bg-primary/10 shadow-md"
          : "border-border bg-muted/50 hover:bg-primary/5 hover:border-primary/30"
      } cursor-pointer`;
    }
    if (isCorrect) {
      const isCorrectAnswer = q.correctAnswers.includes(i);
      if (isCorrectAnswer) return `${base} border-success bg-success/10 text-foreground`;
      return `${base} border-border bg-muted/30 opacity-60`;
    }
    const wasSelected = selected.includes(i);
    if (wasSelected) return `${base} border-destructive bg-destructive/10 text-foreground`;
    return `${base} border-border bg-muted/30 opacity-60`;
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-border bg-card/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl px-4 py-3">
          <div className="flex w-full items-center justify-between">
            <button onClick={() => navigate("/")} className="text-foreground/70 transition-colors hover:text-foreground text-sm font-medium shrink-0">
              ← Back
            </button>
            <span className={`${headerGradient} rounded-full px-4 py-1.5 text-xs font-bold tracking-wide text-white max-w-[200px] truncate md:max-w-none md:whitespace-nowrap md:overflow-visible`}>
              {headerLabel}
            </span>
            <div className="flex items-center gap-3 shrink-0">
              <QuizTimer questionId={q.id} duration={45} onTimerValue={handleTimerValue} />
              <span className={`text-sm font-bold text-points ${pointsBump ? "animate-points-bump" : ""}`}>
                {points} pts
              </span>
            </div>
          </div>
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
            <span className="rounded-full bg-primary/25 px-2.5 py-0.5 text-xs font-bold text-primary-foreground">
              {q.category}
            </span>
            {q.multipleCorrect && (
              <span className="rounded-full bg-secondary/20 px-2.5 py-0.5 text-xs font-bold text-secondary">
                SELECT ALL THAT APPLY
              </span>
            )}
          </div>

          {/* Question */}
          <h2 className="mb-6 text-quiz-question text-foreground">{q.question}</h2>

          {/* Options */}
          <div className="flex flex-col gap-3">
            {q.options.map((opt, i) => (
              <button key={i} onClick={() => toggleSelect(i)} className={`${optionClass(i)} ${timeExpired ? "opacity-60 pointer-events-none" : ""}`}>
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-muted/80 text-sm font-bold text-foreground/70">
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
              className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
            >
              {showHint ? "Hide Hint" : "Show Hint 💡"}
            </button>
            {showHint && (
              <div className="mt-2 rounded-lg border border-border bg-muted/50 px-4 py-3 text-base italic text-muted-foreground">
                💡 {q.hint}
              </div>
            )}
          </div>

          {/* Time's Up Banner */}
          {timeExpired && !submitted && (
            <div className="mt-6 space-y-3">
              <div className="rounded-lg bg-destructive px-4 py-3 text-center text-base font-bold text-destructive-foreground">
                ⏰ Time's Up!
              </div>
              <Button
                size="lg"
                className="w-full text-quiz-option bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => {
                  if (currentIdx < tierQuestions.length - 1) {
                    goTo(1);
                  } else {
                    handleEndQuiz();
                  }
                }}
              >
                {currentIdx < tierQuestions.length - 1 ? "Continue →" : "See Results"}
              </Button>
            </div>
          )}

          {/* Submit */}
          {!submitted && !timeExpired && (
            <Button
              onClick={handleSubmit}
              disabled={selected.length === 0}
              size="lg"
              className="mt-6 w-full text-quiz-option bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Submit Answer
            </Button>
          )}

          {/* Feedback */}
          {submitted && (
            <div className="mt-6 space-y-3">
              {isCorrect ? (
                <>
                  <p className="text-base font-semibold text-success">✅ Correct! {earnedPoints ? "+10 points" : "+0 points"}</p>
                  {!showExplanation && (
                    <Button variant="outline" onClick={() => setShowExplanation(true)} className="text-base">
                      View Explanation 📚
                    </Button>
                  )}
                  {showExplanation && (
                     <div className="rounded-lg border border-border bg-muted/30 p-4 text-base text-foreground/80">
                      <p className="mb-1 font-semibold text-foreground">
                        Correct Answer{q.correctAnswers.length > 1 ? "s" : ""}:{" "}
                        {q.correctAnswers.map((c) => optionLabel(c)).join(", ")}
                      </p>
                      <p>{q.explanation}</p>
                    </div>
                  )}
                </>
              ) : (
              <>
                  <p className="text-base font-semibold text-destructive">❌ Not quite. Try again!</p>
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setSubmitted(false);
                        setSelected([]);
                        setIsCorrect(false);
                        setShowExplanation(false);
                      }}
                      className="text-base"
                    >
                      Retry Question
                    </Button>
                    {attemptedFirst[q.id] && (
                      <Button
                        variant="outline"
                        onClick={() => setShowExplanation(true)}
                        className="text-base"
                      >
                        Show Answer 📚
                      </Button>
                    )}
                  </div>
                  {showExplanation && (
                    <div className="rounded-lg border border-border bg-muted/30 p-4 text-base text-foreground/80">
                      <p className="mb-1 font-semibold text-foreground">
                        Correct Answer{q.correctAnswers.length > 1 ? "s" : ""}:{" "}
                        {q.correctAnswers.map((c) => optionLabel(c)).join(", ")}
                      </p>
                      <p>{q.explanation}</p>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* Flag question */}
          <div className="mt-5 border-t border-border pt-4">
            <button
              onClick={() => setFlagOpen((v) => !v)}
              className="text-sm font-semibold text-muted-foreground transition-colors hover:text-destructive"
            >
              🚩 {flagOpen ? "Cancel" : "Flag this question"}
            </button>
            {flagOpen && (
              <div className="mt-2 space-y-2">
                {flagSubmitted ? (
                  <p className="text-sm font-semibold text-success">Thanks! Flag recorded locally.</p>
                ) : (
                  <>
                    <textarea
                      value={flagText}
                      onChange={(e) => setFlagText(e.target.value)}
                      rows={3}
                      placeholder="What's wrong? (e.g., answer is incorrect, question is unclear...)"
                      className="w-full resize-none rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    <Button size="sm" variant="destructive" onClick={handleFlag} disabled={!flagText.trim()}>
                      Submit Flag
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Thumbs up/down vote */}
          {submitted && (
            <QuestionVote questionId={q.id} tier={decodedTier} category={q.category} />
          )}
        </div>

        {/* XP Progress Bar */}
        <div className="mt-6 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
            <span>Question {currentIdx + 1} of {tierQuestions.length}</span>
            <span>{Math.round(progressPct)}%</span>
          </div>
          <div className="relative h-3 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </main>

      {/* Navigation - fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-card/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3">
          <Button variant="outline" size="lg" disabled={currentIdx === 0} onClick={() => goTo(-1)} className="flex-1 text-quiz-option">
            ← Previous
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleEndQuiz}
            className="text-sm shrink-0"
          >
            End Quiz
          </Button>
          <Button variant="outline" size="lg" disabled={currentIdx === tierQuestions.length - 1} onClick={() => goTo(1)} className="flex-1 text-quiz-option">
            Next →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
