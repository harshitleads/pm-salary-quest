import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { questions, salaryTiers } from "@/data/questions";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import confetti from "canvas-confetti";
import QuizTimer, { QuizTimerHandle } from "@/components/QuizTimer";
import QuizResults from "@/components/QuizResults";
import QuestionVote from "@/components/QuestionVote";
import { Flag } from "lucide-react";

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
  const timerRef = useRef<QuizTimerHandle>(null);

  const customQuestions = (location.state as any)?.questions as typeof questions | undefined;
  const customLabel = (location.state as any)?.label as string | undefined;

  const tierInfo = salaryTiers.find((t) => t.key === decodedTier);
  const tierQuestions = useMemo(() => {
    if (customQuestions) return customQuestions;
    return [...questions.filter((q) => q.salaryTier === decodedTier)].sort(() => Math.random() - 0.5);
  }, [decodedTier, customQuestions]);

  const [currentIdx, setCurrentIdx] = useState(0);
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    timerRef.current?.stop();

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

  const resetQuestionState = () => {
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

  const goTo = (dir: number) => {
    const next = currentIdx + dir;
    if (next < 0 || next >= tierQuestions.length) return;
    setCurrentIdx(next);
    resetQuestionState();
  };

  const handleRetry = () => {
    setSubmitted(false);
    setSelected([]);
    setIsCorrect(false);
    setShowExplanation(false);
    timerRef.current?.reset();
  };

  const handleContinueAfterTimeout = () => {
    if (currentIdx < tierQuestions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      resetQuestionState();
    } else {
      handleEndQuiz();
    }
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

  const handleRetryQuiz = () => {
    setCurrentIdx(0);
    resetQuestionState();
    setPoints(0);
    setAttemptedFirst({});
    setQuestionResults([]);
    setShowResults(false);
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
          <p className="text-lg font-semibold text-foreground">No questions found</p>
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
        onRetry={handleRetryQuiz}
      />
    );
  }

  const optionLabel = (i: number) => String.fromCharCode(65 + i);
  const progressPct = ((currentIdx + 1) / tierQuestions.length) * 100;

  const optionClass = (i: number) => {
    const base = "flex w-full items-start gap-3 rounded-xl border px-5 py-4 text-left transition-all duration-200";
    if (!submitted && !timeExpired) {
      return `${base} ${
        selected.includes(i)
          ? "border-primary bg-primary/10 shadow-md"
          : "border-border bg-muted/50 hover:bg-primary/5 hover:border-primary/30"
      } cursor-pointer`;
    }
    if (submitted && isCorrect && q.correctAnswers.includes(i))
      return `${base} border-success bg-success/10 text-foreground`;
    if (submitted && !isCorrect && selected.includes(i))
      return `${base} border-destructive bg-destructive/10 text-foreground`;
    if (timeExpired)
      return `${base} border-border bg-muted/30 opacity-60 pointer-events-none`;
    return `${base} border-border bg-muted/30 opacity-60`;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* HEADER BAR — fixed */}
      <header className="fixed top-0 left-0 right-0 z-30 border-b border-border bg-card/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[680px] items-center justify-between px-5 py-3">
          <button
            onClick={() => navigate("/")}
            className="text-foreground/70 transition-colors hover:text-foreground text-sm font-medium shrink-0"
          >
            ← Back
          </button>
          <span className={`${headerGradient} rounded-full px-4 py-1.5 font-bold tracking-wide text-white whitespace-nowrap`} style={{ fontSize: 11 }}>
            {headerLabel}
          </span>
          <div className="flex items-center gap-3">
            <span className={`text-sm font-bold text-points ${pointsBump ? "animate-points-bump" : ""}`}>
              {points} pts
            </span>
            <QuizTimer
              ref={timerRef}
              questionId={currentIdx}
              duration={45}
              onTimerValue={handleTimerValue}
              size={48}
              fontSize={13}
            />
          </div>
        </div>
      </header>

      {/* SCROLLABLE CONTENT */}
      <main className="flex-1 pt-[72px] pb-8">
        <div className="mx-auto max-w-[680px] px-5" key={q.id}>
          {/* BLOCK 1 — Question + Options */}
          <div className="space-y-6 pt-6">
            {/* Meta row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground/70">
                  Question {currentIdx + 1} of {tierQuestions.length}
                </span>
                <span
                  className="rounded-full px-2.5 py-0.5 text-xs font-bold"
                  style={{
                    backgroundColor:
                      q.category === "Product Sense" ? "hsla(263, 70%, 50%, 0.2)" :
                      q.category === "Metrics" ? "hsla(199, 89%, 48%, 0.2)" :
                      q.category === "Product Design" ? "hsla(38, 92%, 50%, 0.2)" :
                      q.category === "Behavioral" ? "hsla(160, 84%, 39%, 0.2)" :
                      "hsla(263, 70%, 50%, 0.2)",
                    color:
                      q.category === "Product Sense" ? "#7C3AED" :
                      q.category === "Metrics" ? "#0EA5E9" :
                      q.category === "Product Design" ? "#F59E0B" :
                      q.category === "Behavioral" ? "#10B981" :
                      "#7C3AED",
                  }}
                >
                  {q.category}
                </span>
                {q.multipleCorrect && (
                  <span className="rounded-full bg-secondary/20 px-2.5 py-0.5 text-xs font-bold text-secondary">
                    SELECT ALL
                  </span>
                )}
              </div>
              {/* Flag */}
              <div className="relative">
                <button
                  onClick={() => setFlagOpen((v) => !v)}
                  className={`p-2 rounded-lg transition-colors ${
                    flagOpen
                      ? "text-destructive bg-destructive/10"
                      : "text-muted-foreground/40 hover:text-muted-foreground hover:bg-muted/50"
                  }`}
                  title="Flag this question"
                >
                  <Flag className="w-4 h-4" />
                </button>
                {flagOpen && (
                  <div className="absolute right-0 top-10 w-72 rounded-xl border border-border bg-card p-4 shadow-2xl z-20">
                    {flagSubmitted ? (
                      <p className="text-sm font-semibold text-success">Thanks! Flag recorded.</p>
                    ) : (
                      <div className="space-y-2">
                        <textarea
                          value={flagText}
                          onChange={(e) => setFlagText(e.target.value)}
                          rows={3}
                          placeholder="What's wrong with this question?"
                          className="w-full resize-none rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                        <Button size="sm" variant="destructive" onClick={handleFlag} disabled={!flagText.trim()} className="w-full">
                          Submit Flag
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Question text */}
            <h2 className="text-foreground font-bold" style={{ fontSize: 22, lineHeight: 1.4 }}>
              {q.question}
            </h2>

            {/* Options */}
            <div className="flex flex-col gap-3">
              {q.options.map((opt, i) => (
                <button key={i} onClick={() => toggleSelect(i)} className={optionClass(i)} style={{ fontSize: 16 }}>
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-muted/80 text-sm font-bold text-foreground/70">
                    {optionLabel(i)}
                  </span>
                  <span>{opt}</span>
                </button>
              ))}
            </div>

            {/* Hint button */}
            <button
              onClick={() => setShowHint((v) => !v)}
              className="flex items-center gap-2 w-full text-left text-sm font-medium transition-colors hover:text-foreground rounded-xl"
              style={{
                height: 44,
                paddingLeft: 20,
                paddingRight: 20,
                border: "1px solid hsl(220, 13%, 31%)",
                color: "hsl(215, 20%, 65%)",
                backgroundColor: "transparent",
              }}
            >
              <span className="text-base">💡</span>
              <span>{showHint ? "Hide Hint" : "Show Hint"}</span>
            </button>
            {showHint && (
              <p className="rounded-lg border border-border bg-muted/50 px-4 py-3 text-sm italic text-foreground/70" style={{ lineHeight: 1.6 }}>
                {q.hint}
              </p>
            )}

            {/* Submit button */}
            {!submitted && !timeExpired && (
              <Button
                onClick={handleSubmit}
                disabled={selected.length === 0}
                size="lg"
                className="w-full text-base font-semibold h-12"
                style={{
                  backgroundColor: selected.length === 0 ? "hsl(220, 13%, 31%)" : "hsl(263, 70%, 50%)",
                  color: "white",
                  boxShadow: selected.length > 0 ? "0 0 20px hsl(263 70% 50% / 0.3)" : "none",
                }}
              >
                Submit Answer
              </Button>
            )}

            {/* Time's Up banner */}
            {timeExpired && !submitted && (
              <div className="space-y-3">
                <div className="rounded-lg bg-destructive px-4 py-3 text-center text-base font-bold text-destructive-foreground">
                  Time's Up!
                </div>
                <Button
                  size="lg"
                  className="w-full text-base font-semibold h-12 bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={handleContinueAfterTimeout}
                >
                  {currentIdx < tierQuestions.length - 1 ? "Continue" : "See Results"}
                </Button>
              </div>
            )}
          </div>

          {/* BLOCK 2 — Post-submission content, appended below */}
          {submitted && (
            <div className="mt-6 space-y-4">
              {/* Feedback line */}
              <p className="font-semibold" style={{ fontSize: 15 }}>
                {isCorrect ? (
                  <span className="text-success">✓ Correct! {earnedPoints ? "+10 pts" : "+0 pts"}</span>
                ) : (
                  <span className="text-destructive">✗ Not quite!</span>
                )}
              </p>

              {/* Wrong answer actions */}
              {!isCorrect && (
                <div className="space-y-3">
                  <Button
                    onClick={handleRetry}
                    size="lg"
                    className="w-full text-base font-semibold h-12"
                    style={{ backgroundColor: "hsl(45, 97%, 54%)", color: "hsl(230, 25%, 5%)" }}
                  >
                    Retry Question
                  </Button>
                  {attemptedFirst[q.id] && !showExplanation && (
                    <Button
                      onClick={() => setShowExplanation(true)}
                      variant="outline"
                      size="lg"
                      className="w-full text-base font-semibold h-12 bg-muted/50 border-border"
                    >
                      Show Answer
                    </Button>
                  )}
                </div>
              )}

              {/* Correct — view explanation */}
              {isCorrect && !showExplanation && (
                <Button
                  onClick={() => setShowExplanation(true)}
                  variant="outline"
                  size="lg"
                  className="w-full text-base font-semibold h-12 bg-muted/50 border-border"
                >
                  View Explanation
                </Button>
              )}

              {/* Explanation text — natural height, no scroll box */}
              {showExplanation && (
                <div className="space-y-2">
                  <p className="font-semibold text-foreground" style={{ fontSize: 15 }}>
                    Answer: {q.correctAnswers.map((c) => optionLabel(c)).join(", ")}
                  </p>
                  <p className="text-foreground/80" style={{ fontSize: 15, lineHeight: 1.6 }}>
                    {q.explanation}
                  </p>
                </div>
              )}

              {/* Too Easy / Too Hard */}
              <div className="pt-2">
                <QuestionVote questionId={q.id} tier={decodedTier} category={q.category} />
              </div>
            </div>
          )}

          {/* NAVIGATION — 16px below last content */}
          <div className="flex items-center justify-between gap-3 mt-4">
            <Button
              variant="outline"
              size="lg"
              disabled={currentIdx === 0}
              onClick={() => goTo(-1)}
              className="flex-1 text-base"
            >
              Previous
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleEndQuiz}
              className="text-sm shrink-0"
            >
              End Quiz
            </Button>
            <Button
              variant="outline"
              size="lg"
              disabled={currentIdx === tierQuestions.length - 1}
              onClick={() => goTo(1)}
              className="flex-1 text-base"
            >
              Next
            </Button>
          </div>

          {/* PROGRESS BAR */}
          <div className="mt-3 space-y-1 pb-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground/50">
              <span>{currentIdx + 1} / {tierQuestions.length}</span>
              <span>{Math.round(progressPct)}%</span>
            </div>
            <div className="relative h-1 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Quiz;
