import { useState, useCallback, useMemo, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { questions, salaryTiers } from "@/data/questions";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import confetti from "canvas-confetti";
import QuizTimer from "@/components/QuizTimer";
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
    if (!submitted && !timeExpired) {
      return `${base} ${
        selected.includes(i)
          ? "border-primary bg-primary/10 shadow-md"
          : "border-border bg-muted/50 hover:bg-primary/5 hover:border-primary/30"
      } cursor-pointer`;
    }
    if (submitted && isCorrect) {
      const isCorrectAnswer = q.correctAnswers.includes(i);
      if (isCorrectAnswer) return `${base} border-success bg-success/10 text-foreground`;
      return `${base} border-border bg-muted/30 opacity-60`;
    }
    if (submitted && !isCorrect) {
      const wasSelected = selected.includes(i);
      if (wasSelected) return `${base} border-destructive bg-destructive/10 text-foreground`;
      return `${base} border-border bg-muted/30 opacity-60`;
    }
    // timeExpired
    return `${base} border-border bg-muted/30 opacity-60 pointer-events-none`;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-border bg-card/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl px-4 py-3">
          <div className="flex w-full items-center justify-between">
            <button onClick={() => navigate("/")} className="text-foreground/70 transition-colors hover:text-foreground text-sm font-medium shrink-0">
              ← Back
            </button>
            <span className={`${headerGradient} rounded-full px-4 py-1.5 text-xs font-bold tracking-wide text-white max-w-[200px] truncate md:max-w-none md:whitespace-nowrap md:overflow-visible`}>
              {headerLabel}
            </span>
            <div className="flex items-center gap-3">
              <span className={`text-sm font-bold text-points ${pointsBump ? "animate-points-bump" : ""}`}>
                {points} pts
              </span>
              {/* Mobile timer */}
              <div className="md:hidden">
                <QuizTimer questionId={q.id} duration={45} onTimerValue={handleTimerValue} size={40} />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content — vertically centered */}
      <main className="flex-1 flex items-start md:items-center justify-center px-4 py-6">
        <div className="w-full max-w-5xl">
          {/* Question card */}
          <div className="animate-scale-pop rounded-2xl border border-border bg-card shadow-xl relative min-h-[520px]" key={q.id}>
            {/* Flag icon — top right corner */}
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={() => setFlagOpen((v) => !v)}
                className={`p-2 rounded-lg transition-colors ${flagOpen ? "text-destructive bg-destructive/10" : "text-muted-foreground/50 hover:text-muted-foreground hover:bg-muted/50"}`}
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

            {/* Two-column layout */}
            <div className="flex flex-col md:flex-row min-h-[520px]">
              {/* LEFT COLUMN — Question + Options (65%) */}
              <div className="flex-1 md:w-[65%] p-6 md:p-8 md:pr-6">
                {/* Meta */}
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-foreground/70">
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

                {/* Question text */}
                <h2 className="mb-6 text-quiz-question text-foreground">{q.question}</h2>

                {/* Options */}
                <div className="flex flex-col gap-3">
                  {q.options.map((opt, i) => (
                    <button key={i} onClick={() => toggleSelect(i)} className={optionClass(i)}>
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-muted/80 text-sm font-bold text-foreground/70">
                        {optionLabel(i)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  ))}
                </div>

                {/* Submit button — left column */}
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

                {/* Time's Up — left column */}
                {timeExpired && !submitted && (
                  <div className="mt-6 space-y-3">
                    <div className="rounded-lg bg-destructive px-4 py-3 text-center text-base font-bold text-destructive-foreground">
                      ⏰ Time's Up!
                    </div>
                    <Button
                      size="lg"
                      className="w-full text-quiz-option bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={() => {
                        if (currentIdx < tierQuestions.length - 1) goTo(1);
                        else handleEndQuiz();
                      }}
                    >
                      {currentIdx < tierQuestions.length - 1 ? "Continue →" : "See Results"}
                    </Button>
                  </div>
                )}
              </div>

              {/* RIGHT COLUMN — Actions/Feedback (35%) */}
              <div className="md:w-[35%] border-t md:border-t-0 md:border-l border-border p-6 md:pl-6 flex flex-col gap-5">
                {/* 1. Timer — hidden on mobile (shown in header instead) */}
                <div className="hidden md:flex items-center justify-center">
                  <QuizTimer questionId={q.id} duration={45} onTimerValue={handleTimerValue} />
                </div>

                {/* 2. Hint */}
                <div>
                  <button
                    onClick={() => setShowHint((v) => !v)}
                    className="flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary w-full justify-center md:justify-start"
                  >
                    💡 {showHint ? "Hide Hint" : "Hint"}
                  </button>
                  <div className={`mt-2 rounded-lg border border-border bg-muted/50 px-3 py-2.5 text-sm italic text-foreground/70 transition-opacity duration-200 ${showHint ? "visible opacity-100" : "invisible h-0 mt-0 overflow-hidden"}`}>
                    {q.hint}
                  </div>
                </div>

                {/* 3. Feedback zone — fixed height, visibility-controlled */}
                <div className="min-h-[60px] flex flex-col justify-center">
                  <p className={`text-base font-semibold text-success text-center md:text-left transition-opacity duration-200 ${submitted && isCorrect ? "visible opacity-100" : "invisible h-0 overflow-hidden"}`}>
                    ✅ Correct! {earnedPoints ? "+10 pts" : "+0 pts"}
                  </p>
                  <p className={`text-base font-semibold text-destructive text-center md:text-left transition-opacity duration-200 ${submitted && !isCorrect ? "visible opacity-100" : "invisible h-0 overflow-hidden"}`}>
                    ❌ Not quite!
                  </p>
                  <p className={`text-sm text-muted-foreground/50 text-center md:text-left transition-opacity duration-200 ${!submitted && !timeExpired ? "visible opacity-100" : "invisible h-0 overflow-hidden"}`}>
                    Submit to see result
                  </p>
                  <p className={`text-base font-semibold text-destructive text-center md:text-left transition-opacity duration-200 ${timeExpired && !submitted ? "visible opacity-100" : "invisible h-0 overflow-hidden"}`}>
                    ⏰ Time expired
                  </p>
                </div>

                {/* 4. Retry + Show Answer + Explanation — visibility-controlled */}
                <div className="space-y-2">
                  <div className={`flex flex-col gap-2 ${submitted && !isCorrect ? "visible" : "invisible h-0 overflow-hidden"}`}>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        setSubmitted(false);
                        setSelected([]);
                        setIsCorrect(false);
                        setShowExplanation(false);
                      }}
                      className="w-full text-sm"
                    >
                      Retry Question
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowExplanation(true)}
                      className={`w-full text-sm ${submitted && !isCorrect && attemptedFirst[q.id] ? "visible" : "invisible h-0 overflow-hidden"}`}
                    >
                      Show Answer 📚
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowExplanation(true)}
                    className={`w-full text-sm ${submitted && isCorrect && !showExplanation ? "visible" : "invisible h-0 overflow-hidden"}`}
                  >
                    View Explanation 📚
                  </Button>
                  <div className={`max-h-[160px] overflow-y-auto rounded-lg border border-border bg-muted/30 p-3 text-sm text-foreground/80 ${showExplanation ? "visible opacity-100" : "invisible h-0 overflow-hidden"}`}>
                    <p className="mb-1 font-semibold text-foreground">
                      Answer: {q.correctAnswers.map((c) => optionLabel(c)).join(", ")}
                    </p>
                    <p>{q.explanation}</p>
                  </div>
                </div>

                {/* 5. Difficulty feedback — visibility-controlled */}
                <div className={`mt-auto ${submitted ? "visible" : "invisible"}`}>
                  <QuestionVote questionId={q.id} tier={decodedTier} category={q.category} />
                </div>
              </div>
            </div>
          </div>

          {/* Navigation — directly below card, 16px gap */}
          <div className="flex items-center justify-between gap-3 mt-4">
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

          {/* Progress bar — thin, below nav */}
          <div className="mt-3 space-y-1">
            <div className="flex items-center justify-between text-xs text-muted-foreground/60">
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
