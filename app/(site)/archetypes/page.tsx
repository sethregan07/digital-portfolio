"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";

const editorialSerif = {
  fontFamily: "var(--font-serif), Georgia, serif",
};

const questions = [
  {
    id: 1,
    question: "When a group you are in faces a problem, what is your most natural response?",
    options: [
      { label: "I start generating ideas and possibilities others haven't seen yet.", archetype: "visionary" },
      { label: "I want to understand what is really causing it before anyone acts.", archetype: "seeker" },
      { label: "I feel pulled to make sure everyone is heard and the group stays together.", archetype: "connector" },
      { label: "I want to figure out what specifically needs to happen and make it happen.", archetype: "builder" },
    ],
  },
  {
    id: 2,
    question: "What do people most often come to you for?",
    options: [
      { label: "A new perspective — you see what others miss.", archetype: "visionary" },
      { label: "Real, honest answers — you tell them what is actually true.", archetype: "seeker" },
      { label: "Support and understanding — you make them feel less alone.", archetype: "connector" },
      { label: "Getting something done — you are reliable and practical.", archetype: "builder" },
    ],
  },
  {
    id: 3,
    question: "What frustrates you most in work or collaboration?",
    options: [
      {
        label: "Being forced to execute someone else's small vision when you can see something bigger.",
        archetype: "visionary",
      },
      { label: "People avoiding the real issue and staying in comfortable illusions.", archetype: "seeker" },
      { label: "Groups that are fragmented, competitive, or lacking real trust.", archetype: "connector" },
      { label: "Plans that never turn into action — all talk, no movement.", archetype: "builder" },
    ],
  },
  {
    id: 4,
    question: "When you are doing your best work, it feels like:",
    options: [
      { label: "Channelling something — the ideas arrive, not just from me.", archetype: "visionary" },
      { label: "Peeling back layers until something real and clear emerges.", archetype: "seeker" },
      { label: "Being exactly where I am needed, bringing the right people together.", archetype: "connector" },
      { label: "Watching something come to life that didn't exist before.", archetype: "builder" },
    ],
  },
  {
    id: 5,
    question: "What kind of contribution do you most want to make?",
    options: [
      {
        label: "Introduce ideas and possibilities that expand what people think is achievable.",
        archetype: "visionary",
      },
      { label: "Tell the truth clearly in a world full of noise and distraction.", archetype: "seeker" },
      { label: "Create belonging and community where people feel genuinely seen.", archetype: "connector" },
      { label: "Build something tangible that outlasts you and solves a real problem.", archetype: "builder" },
    ],
  },
];

const archetypes: Record<
  string,
  {
    title: string;
    headline: string;
    description: string;
    gifts: string[];
    shadow: string;
    invitation: string;
    cta: string;
    ctaHref: string;
  }
> = {
  visionary: {
    title: "The Visionary",
    headline: "You see what doesn't exist yet — and you can't stop seeing it.",
    description:
      "Your gift is the ability to perceive possibility before it has form. Where others see constraints, you see configurations that haven't been tried. This is not optimism — it is a particular way of perceiving reality that arrives before reason and often before language. The Visionary's role in a group or a system is to hold the image of what could be when others have given up or settled.",
    gifts: [
      "Seeing patterns and connections across domains that others miss",
      "Holding a compelling picture of the future clearly enough that others can move toward it",
      "Generating novel approaches when conventional thinking has stalled",
      "Inspiring action through articulating what is possible",
    ],
    shadow:
      "The Visionary's shadow is starting without finishing — moving to the next vision before the current one has landed. The gift becomes a liability when it is used to avoid the slower, less exciting work of execution and follow-through.",
    invitation:
      "Find one Builder or Connector to anchor your ideas in reality. Your vision is not enough alone — it needs someone who can translate it into steps. The pairing of Visionary and Builder is one of the most productive combinations in any creative or organisational context.",
    cta: "Find your north star",
    ctaHref: "/north-star",
  },
  seeker: {
    title: "The Seeker",
    headline: "You cannot stop asking the question underneath the question.",
    description:
      "Your gift is relentless inquiry — not as a personality trait, but as a function. You are built to find what is actually true underneath what is assumed, performed, or comfortable. The Seeker's role in any system is to name the thing that everyone is avoiding, ask the question no one is willing to ask, and refuse to settle for the comfortable answer when a real one is available.",
    gifts: [
      "Seeing through performed consensus to what is actually happening",
      "Asking questions that expose the real problem beneath the stated one",
      "Thinking rigorously across contested territory without needing external validation",
      "Holding complexity and ambiguity without collapsing it prematurely",
    ],
    shadow:
      "The Seeker's shadow is inquiry without landing — staying in the question so long that the knowledge never becomes action. Truth-seeking can become a way of avoiding commitment. At some point the question has to become a position and the position has to become a choice.",
    invitation:
      "Your insights need a Builder or Connector to carry them. You are not usually the one to implement what you discover — and that is fine. The work is to hand what you find to someone who can act on it, without needing to control how it lands.",
    cta: "Explore the deprogramming course",
    ctaHref: "/projects/deprogramming",
  },
  connector: {
    title: "The Connector",
    headline: "You feel the field — the space between people — and you know how to work it.",
    description:
      "Your gift is relational intelligence — the ability to perceive what a group needs, hold space for different people to be genuinely seen, and weave individuals into something that functions as a whole. The Connector is not a people-pleaser. The gift is not about making everyone comfortable — it is about understanding what needs to move between people for real trust and collaboration to exist.",
    gifts: [
      "Reading what a group needs before anyone has articulated it",
      "Creating conditions where people feel safe enough to be honest",
      "Bridging between people who would not naturally find each other",
      "Sustaining relationships and community through difficulty, not just in ease",
    ],
    shadow:
      "The Connector's shadow is self-erasure — giving so much to the group that your own vision, needs, and direction disappear. Connection becomes a form of hiding. The invitation is not to connect less, but to remain visible and directional within the relationships you build.",
    invitation:
      "Build with a Visionary or Seeker to ensure your relational gift is pointed at something worth building. Connection without direction dissipates. The most powerful version of this archetype is a Connector who knows where they are going and brings people with them — not one who simply facilitates what others want.",
    cta: "Explore the letter community",
    ctaHref: "/letter",
  },
  builder: {
    title: "The Builder",
    headline: "You are not satisfied until something real exists that didn't exist before.",
    description:
      "Your gift is execution grounded in reality — the ability to take what is abstract, complex, or aspirational and turn it into something that works. The Builder is not a technician. The gift is the combination of practical intelligence and the will to see something through from idea to existence, through all the unglamorous middle work that most people abandon.",
    gifts: [
      "Translating vision into concrete steps without losing the original intention",
      "Sustaining energy through the difficult middle of a project when novelty is gone",
      "Identifying what actually needs to happen versus what merely feels important",
      "Producing things that work — not just things that are interesting",
    ],
    shadow:
      "The Builder's shadow is building the wrong thing efficiently — optimising execution so thoroughly that there is no space to ask whether the direction is right. The gift can become a way of avoiding harder questions about meaning and purpose by staying busy with tangible progress.",
    invitation:
      "Pair with a Visionary or Seeker to ensure what you are building is worth building. Your capacity for execution is rare — the question is whether you are directing it at something that actually matters to you, or simply at whatever problem is in front of you.",
    cta: "Explore the build framework",
    ctaHref: "/build",
  },
};

export default function ArchetypesPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({ visionary: 0, seeker: 0, connector: 0, builder: 0 });
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [started, setStarted] = useState(false);

  const topArchetype = Object.entries(scores).sort(([, a], [, b]) => b - a)[0][0];
  const result = archetypes[topArchetype];
  const progress = (currentQuestion / questions.length) * 100;

  function handleSelect(archetype: string, idx: number) {
    setSelectedOption(idx);
  }

  function handleNext() {
    if (selectedOption === null) return;
    const chosen = questions[currentQuestion].options[selectedOption].archetype;
    const newScores = { ...scores, [chosen]: scores[chosen] + 1 };
    setScores(newScores);
    setSelectedOption(null);

    if (currentQuestion + 1 >= questions.length) {
      setShowResult(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          groups: ["archetype-quiz"],
          fields: { archetype: topArchetype },
          source: "archetypes-page",
        }),
      });
    } catch (_) {}
    setSubmitted(true);
  }

  // Landing screen
  if (!started) {
    return (
      <div className="bg-background pb-24">
        <div className="container max-w-2xl pt-14">
          <section className="border-b border-border pb-12 pt-6">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Archetype Finder — Stage 05
            </p>
            <h1
              className="text-[2.8rem] leading-[1.02] tracking-[-0.04em] text-foreground md:text-[3.8rem]"
              style={editorialSerif}
            >
              What is your role in the world?
            </h1>
            <p className="mt-5 text-[1.1rem] leading-[1.7] text-muted-foreground">
              After deprogramming comes discovery. Beneath the inherited scripts and social expectations is a particular
              way you are built to see, contribute, and create.
            </p>
            <p className="mt-3 text-[1.1rem] leading-[1.7] text-muted-foreground">
              Five questions. Four archetypes. A description of your gifts, your shadow, and how to work with both.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button onClick={() => setStarted(true)} className="h-12 px-8">
                Find my archetype <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <p className="mt-4 text-[0.88rem] text-muted-foreground/50">Takes about 3 minutes.</p>
          </section>

          {/* The 4 archetypes */}
          <section className="pt-12">
            <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              The four archetypes
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {Object.entries(archetypes).map(([key, arch]) => (
                <div key={key} className="border border-border/40 bg-card/20 p-5">
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/50">
                    {key}
                  </p>
                  <h3 className="mb-2 text-[1rem] font-semibold text-foreground" style={editorialSerif}>
                    {arch.title}
                  </h3>
                  <p className="text-[0.88rem] leading-[1.6] text-muted-foreground">{arch.headline}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }

  // Result screen
  if (showResult) {
    return (
      <div className="bg-background pb-24">
        <div className="container max-w-2xl pt-14">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Your archetype
          </p>

          <div className="mb-5 inline-flex items-center gap-2 rounded-sm border border-border/60 bg-card/30 px-4 py-2">
            <span className="text-[12px] uppercase tracking-[0.12em] text-muted-foreground">Stage 05 — Discover</span>
          </div>

          <h1
            className="mb-4 text-[2.4rem] leading-[1.05] tracking-[-0.04em] text-foreground md:text-[3.2rem]"
            style={editorialSerif}
          >
            {result.title}
          </h1>
          <p className="mb-5 text-[1.1rem] font-medium leading-[1.6] text-foreground">{result.headline}</p>
          <p className="mb-10 text-[1rem] leading-[1.7] text-muted-foreground">{result.description}</p>

          {/* Gifts */}
          <div className="mb-8">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Your core gifts
            </p>
            <div className="space-y-2">
              {result.gifts.map((gift) => (
                <div key={gift} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <p className="text-[0.97rem] leading-[1.6] text-foreground">{gift}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8 border-t border-border" />

          {/* Shadow */}
          <div className="mb-8 rounded-sm border border-border/50 bg-card/20 p-6">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              The shadow to watch for
            </p>
            <p className="text-[0.95rem] leading-[1.7] text-muted-foreground">{result.shadow}</p>
          </div>

          {/* Invitation */}
          <div className="mb-10 border-l-2 border-border/40 pl-5">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              The invitation
            </p>
            <p className="text-[0.97rem] leading-[1.7] text-muted-foreground">{result.invitation}</p>
          </div>

          {/* Email capture */}
          {!submitted ? (
            <div className="mb-10 border border-border/60 bg-card/30 p-6">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Save your result
              </p>
              <h2 className="mb-3 text-lg font-semibold text-foreground" style={editorialSerif}>
                Get your full archetype profile by email.
              </h2>
              <p className="mb-5 text-[0.9rem] leading-[1.7] text-muted-foreground">
                Includes your archetype description, gifts, shadow work, and a personalised path through the
                Originalform system.
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
                  Send my profile <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>
          ) : (
            <div className="mb-10 border border-border/60 bg-card/30 p-6">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <p className="font-medium text-foreground">Your archetype profile is on its way.</p>
              </div>
            </div>
          )}

          {/* Next step */}
          <div className="mb-8">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Recommended next step
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild className="h-11 px-6">
                <Link href={result.ctaHref}>
                  {result.cta} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-11 px-6">
                <Link href="/system">
                  See the full system <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <button
            onClick={() => {
              setCurrentQuestion(0);
              setScores({ visionary: 0, seeker: 0, connector: 0, builder: 0 });
              setSelectedOption(null);
              setShowResult(false);
              setStarted(false);
              setSubmitted(false);
              setEmail("");
            }}
            className="text-sm text-muted-foreground/40 underline-offset-4 hover:text-muted-foreground hover:underline"
          >
            Retake the quiz
          </button>
        </div>
      </div>
    );
  }

  // Quiz screen
  return (
    <div className="bg-background pb-24">
      <div className="container max-w-2xl pt-14">
        {/* Progress */}
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
        <h2
          className="mb-8 text-[1.5rem] font-semibold leading-[1.3] tracking-[-0.02em] text-foreground"
          style={editorialSerif}
        >
          {questions[currentQuestion].question}
        </h2>

        {/* Options */}
        <div className="mb-10 space-y-3">
          {questions[currentQuestion].options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(option.archetype, idx)}
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

        <Button onClick={handleNext} disabled={selectedOption === null} className="h-11 px-8 disabled:opacity-30">
          {currentQuestion + 1 >= questions.length ? "See my archetype" : "Next question"}{" "}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
