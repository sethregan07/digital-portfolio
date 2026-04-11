"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronRight, Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";

const editorialSerif = {
  fontFamily: "var(--font-serif), Georgia, serif",
};

const questions = [
  {
    id: 1,
    question: "When someone challenges a belief you hold strongly, your first instinct is to:",
    options: [
      { label: "Defend it immediately — the belief feels like part of who you are.", score: 0 },
      { label: "Feel uncomfortable, but eventually engage with their argument.", score: 1 },
      { label: "Ask them what evidence they have — and mean it.", score: 2 },
      { label: "Get genuinely curious. A challenge is data.", score: 3 },
    ],
  },
  {
    id: 2,
    question: "Can you trace your most important political or social beliefs back to where they actually came from?",
    options: [
      { label: "Not really. I just know what I believe.", score: 0 },
      { label: "Some of them, vaguely — family or culture probably.", score: 1 },
      { label: "Most of them. I've thought about this before.", score: 2 },
      { label: "Yes, specifically. I've mapped this deliberately.", score: 3 },
    ],
  },
  {
    id: 3,
    question: "When you encounter a story in the media, how often do you ask who benefits from this narrative?",
    options: [
      { label: "Rarely — I generally trust reliable sources.", score: 0 },
      { label: "Sometimes, for stories that feel obviously biased.", score: 1 },
      { label: "Often, across most sources I read.", score: 2 },
      { label: "Almost always. It's become automatic.", score: 3 },
    ],
  },
  {
    id: 4,
    question: "Have you ever seriously read the best argument against a belief you hold?",
    options: [
      { label: "No — I don't feel the need to.", score: 0 },
      { label: "Once or twice, but not as a habit.", score: 1 },
      { label: "Fairly regularly on important topics.", score: 2 },
      { label: "Yes, deliberately. The strongest opposing case, not a strawman.", score: 3 },
    ],
  },
  {
    id: 5,
    question: "Which statement comes closest to how you experience your own thinking?",
    options: [
      { label: "I think the way most sensible people in my environment think.", score: 0 },
      { label: "I've questioned some things, but my core beliefs feel solid.", score: 1 },
      { label: "I've done real work on this — but I know there's more to examine.", score: 2 },
      { label: "I treat my own mind as something worth auditing regularly.", score: 3 },
    ],
  },
];

const results = [
  {
    range: [0, 4],
    type: "The Unexamined Mind",
    headline: "Most of what you think is borrowed. That's not an insult — it's where almost everyone starts.",
    description:
      "Your beliefs are largely intact from how they arrived — through environment, culture, and upbringing. You haven't been asked to examine them, and the world generally doesn't encourage it. The good news: the awareness that something is unexamined is itself the beginning of examining it.",
    cta: "The free guide is the right place to start. Five signs, five practical fixes — in one read.",
    ctaHref: "/free-guide",
    ctaLabel: "Get the free guide",
  },
  {
    range: [5, 8],
    type: "The Curious Doubter",
    headline: "You sense something is off. You haven't fully named it yet.",
    description:
      "You've noticed the cracks — moments where a belief didn't hold up, or where a trusted source turned out to be less trustworthy. You're asking questions, but you don't yet have a consistent framework for asking them. That gap is exactly what this site is built around.",
    cta: "The Source Audit is a good next move — five specific questions that turn a vague sense of doubt into something you can work with.",
    ctaHref: "/tools",
    ctaLabel: "Try the Source Audit",
  },
  {
    range: [9, 12],
    type: "The Active Examiner",
    headline: "You're already doing the work. This is about going further.",
    description:
      "You've moved past surface-level skepticism. You ask harder questions, you've done some tracing. What you probably need now isn't more skepticism — it's more rigorous method. The difference between 'I question things' and 'I know how to think through things systematically' is significant.",
    cta: "The Deprogramming course was built for where you are — structured, rigorous, and designed to go deeper than a collection of blog posts.",
    ctaHref: "/projects/deprogramming",
    ctaLabel: "Explore the course",
  },
  {
    range: [13, 15],
    type: "The Independent Thinker",
    headline: "You've built real intellectual independence. Now build on it.",
    description:
      "You treat your mind as something worth maintaining. You check sources, you read opposing arguments, you trace beliefs. The question isn't whether you think — it's whether your thinking has a system that holds up across all domains, not just the ones you've worked on already.",
    cta: "The letter is where readers at this stage find the most use — one framework per issue, sent when there's something worth saying.",
    ctaHref: "/letter",
    ctaLabel: "Read the letter",
  },
];

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const totalScore = answers.reduce((sum, score) => sum + score, 0);

  const currentResult = results.find((r) => totalScore >= r.range[0] && totalScore <= r.range[1]) ?? results[0];

  const progress = (currentQuestion / questions.length) * 100;

  function handleSelect(score: number, idx: number) {
    setSelectedOption(idx);
  }

  function handleNext() {
    if (selectedOption === null) return;
    const score = questions[currentQuestion].options[selectedOption].score;
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);
    setSelectedOption(null);

    if (currentQuestion + 1 >= questions.length) {
      setShowResult(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    // MailerLite integration — group: quiz-results
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          groups: ["quiz-results"],
          fields: { quiz_result: currentResult.type, quiz_score: totalScore },
          source: "quiz-page",
        }),
      });
    } catch (_) {}
    setSubmitted(true);
  }

  if (showResult) {
    return (
      <div className="bg-background pb-24">
        <div className="container max-w-2xl pt-14">
          {/* Result label */}
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Your result
          </p>

          {/* Score */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-sm border border-border/60 bg-card/30 px-4 py-2">
            <span className="text-[12px] uppercase tracking-[0.12em] text-muted-foreground">Score</span>
            <span className="text-[12px] font-semibold text-foreground">{totalScore} / 15</span>
          </div>

          {/* Result type */}
          <h1
            className="mb-4 text-[2.4rem] leading-[1.05] tracking-[-0.04em] text-foreground md:text-[3.2rem]"
            style={editorialSerif}
          >
            {currentResult.type}
          </h1>
          <p className="mb-6 text-[1.1rem] font-medium leading-[1.6] text-foreground">{currentResult.headline}</p>
          <p className="mb-10 text-[1rem] leading-[1.7] text-muted-foreground">{currentResult.description}</p>

          {/* Divider */}
          <div className="mb-8 border-t border-border" />

          {/* Share */}
          <div className="mb-8">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Share your result
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  const text = `I took the Originalform quiz — I got "${currentResult.type}." How much of your thinking is actually yours? originalform.org/quiz`;
                  if (navigator.share) {
                    navigator.share({ text });
                  } else {
                    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, "_blank");
                  }
                }}
                className="inline-flex items-center gap-2 rounded-sm border border-border/50 px-4 py-2 text-[11px] uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:border-border hover:text-foreground"
              >
                <Share2 className="h-3.5 w-3.5" /> Share on X / Twitter
              </button>
              <button
                onClick={() => {
                  const text = `I got "${currentResult.type}" on the Originalform thinking quiz. originalform.org/quiz`;
                  window.open(
                    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                      "https://originalform.org/quiz"
                    )}&summary=${encodeURIComponent(text)}`,
                    "_blank"
                  );
                }}
                className="inline-flex items-center gap-2 rounded-sm border border-border/50 px-4 py-2 text-[11px] uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:border-border hover:text-foreground"
              >
                <Share2 className="h-3.5 w-3.5" /> Share on LinkedIn
              </button>
            </div>
          </div>

          {/* Email capture */}
          {!submitted ? (
            <div className="mb-10 rounded-sm border border-border/60 bg-card/30 p-7">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Get your full results
              </p>
              <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground" style={editorialSerif}>
                We'll send your result type with a personalised reading path.
              </h2>
              <p className="mb-6 text-[0.93rem] leading-[1.7] text-muted-foreground">
                You'll also receive the Originalform letter — one idea per issue, no noise. Unsubscribe any time.
              </p>
              <form onSubmit={handleEmailSubmit} className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="h-11 flex-1 rounded-sm border border-border bg-background px-4 text-[0.95rem] text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-border"
                />
                <Button type="submit" className="h-11 shrink-0 px-6">
                  Send my results <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>
          ) : (
            <div className="mb-10 rounded-sm border border-border/60 bg-card/30 p-7">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <p className="font-medium text-foreground">Your results are on their way.</p>
              </div>
              <p className="mt-2 text-[0.93rem] text-muted-foreground">
                Check your inbox. If it takes a moment, check your spam folder.
              </p>
            </div>
          )}

          {/* Recommended next step */}
          <div className="mb-10">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Recommended next step
            </p>
            <p className="mb-5 text-[1rem] leading-[1.7] text-muted-foreground">{currentResult.cta}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild className="h-11 px-6">
                <Link href={currentResult.ctaHref}>
                  {currentResult.ctaLabel} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-11 px-6">
                <Link href="/start-here">
                  See all starting points <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Retake */}
          <button
            onClick={() => {
              setCurrentQuestion(0);
              setAnswers([]);
              setSelectedOption(null);
              setShowResult(false);
              setSubmitted(false);
              setEmail("");
            }}
            className="text-sm text-muted-foreground/50 underline-offset-4 hover:text-muted-foreground hover:underline"
          >
            Retake the quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background pb-24">
      <div className="container max-w-2xl pt-14">
        {/* Header — only on first question */}
        {currentQuestion === 0 && (
          <section className="mb-12 border-b border-border pb-10 pt-6">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              5-question quiz
            </p>
            <h1
              className="text-[2.8rem] leading-[1.02] tracking-[-0.04em] text-foreground md:text-[3.8rem]"
              style={editorialSerif}
            >
              How much of your thinking is actually yours?
            </h1>
            <p className="mt-5 text-[1.1rem] leading-[1.7] text-muted-foreground">
              Five questions. No right or wrong answers — only honest ones. Your result will tell you where you are and
              what to do next.
            </p>
            <p className="mt-3 text-[0.93rem] text-muted-foreground">Takes about 2 minutes.</p>
          </section>
        )}

        {/* Progress bar */}
        <div className="mb-10">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Question {currentQuestion + 1} of {questions.length}
            </p>
            <p className="text-[11px] text-muted-foreground/50">{Math.round(progress)}% complete</p>
          </div>
          <div className="h-[2px] w-full bg-border/40">
            <div className="h-[2px] bg-foreground/40 transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h2
            className="text-[1.5rem] font-semibold leading-[1.3] tracking-[-0.02em] text-foreground"
            style={editorialSerif}
          >
            {questions[currentQuestion].question}
          </h2>
        </div>

        {/* Options */}
        <div className="mb-10 space-y-3">
          {questions[currentQuestion].options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(option.score, idx)}
              className={`w-full rounded-sm border px-5 py-4 text-left text-[0.95rem] leading-[1.6] transition-all ${
                selectedOption === idx
                  ? "border-foreground/40 bg-card text-foreground"
                  : "border-border/50 bg-transparent text-muted-foreground hover:border-border hover:text-foreground"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Next button */}
        <Button onClick={handleNext} disabled={selectedOption === null} className="h-11 px-8 disabled:opacity-30">
          {currentQuestion + 1 >= questions.length ? "See my result" : "Next question"}{" "}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
