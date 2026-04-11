import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Compass, Star } from "lucide-react";

import { BASE_URL } from "@/lib/metadata";
import { Breadcrumb } from "@/components/breadcrumb";
import NewsletterSubscribe from "@/components/newsletter-subscribe";

export const revalidate = 300;

const editorialSerif = {
  fontFamily: "var(--font-serif), Georgia, serif",
};

export const metadata: Metadata = {
  title: "Find Your Gifts — Stage 05 | Originalform",
  description:
    "Your gifts are not the same as your skills. They are what you do effortlessly that others find remarkable. This is how to find and name them.",
  alternates: { canonical: `${BASE_URL}/gifts` },
  openGraph: {
    type: "website",
    url: `${BASE_URL}/gifts`,
    title: "Find Your Gifts — Stage 05 | Originalform",
    description:
      "The difference between skills and gifts, why most people mistake one for the other, and a five-step process for finding what was always there.",
  },
};

const distinctions = [
  {
    label: "Skills are learned. Gifts are native.",
    explanation:
      "A skill is something you worked to acquire. A gift is something that arrived before effort — a natural capacity you were using before you had language for it. You can improve a gift with skill, but the gift was already there.",
  },
  {
    label: "Gifts often feel invisible to you.",
    explanation:
      "The most common reason people miss their gifts: they feel obvious. What comes effortlessly to you seems like it should come effortlessly to everyone. It doesn't. What bores you about yourself is often what others find remarkable.",
  },
  {
    label: "Gifts and conditioning get tangled.",
    explanation:
      "Some of what you are good at is yours. Some of it is what you had to become to survive or to be accepted. Conditioning can make you excellent at things that are not actually yours. That is why Stage 01 comes before Stage 05.",
  },
  {
    label: "Gifts do not equal purpose.",
    explanation:
      "Knowing your gifts tells you what you can offer. It does not tell you where to direct that offering. That is the north star question — a separate step, though the two are related.",
  },
];

const findingProcess = [
  {
    step: "01",
    title: "Notice what you do that loses time",
    description:
      "Flow states are a reliable signal. Not every flow state is a gift — some are just habits — but the activities where time disappears and you emerge energised rather than depleted are worth examining. Write a list. Do not filter for usefulness.",
  },
  {
    step: "02",
    title: "Ask three people what they come to you for",
    description:
      "Not what they admire about you — what they actually ask you for help with. These are people who know you well enough to rely on you. The pattern in their answers is usually more accurate than your own self-assessment.",
  },
  {
    step: "03",
    title: "Look at what you already do for free",
    description:
      "What do you offer without being asked, because you cannot help it? What do you notice or do in a room that no one assigned you? This is the gift operating beneath intention.",
  },
  {
    step: "04",
    title: "Separate gifts from compensations",
    description:
      "Some things you are good at because a younger version of you had to be — to be safe, to be loved, to be useful. Ask: does this energise me, or does it drain me even when I do it well? The latter is often a compensation, not a gift.",
  },
  {
    step: "05",
    title: "Name it in a sentence",
    description:
      "A gift named vaguely is not yet named. 'I am good with people' is not a gift — it is a category. The sentence needs to be specific: 'I can sense what is not being said in a group and find a way to surface it without causing shutdown.' That precision is the gift.",
  },
];

const giftCategories = [
  {
    category: "Perception gifts",
    description: "The ability to see, sense, or read things others miss.",
    examples: [
      "Pattern recognition across unrelated domains",
      "Reading emotional undercurrents in groups",
      "Seeing structural problems before they surface",
      "Noticing the question underneath the stated question",
    ],
  },
  {
    category: "Synthesis gifts",
    description: "The ability to bring things together into something new.",
    examples: [
      "Making complex things simple without losing their substance",
      "Connecting ideas from different fields into a coherent framework",
      "Translating abstract vision into concrete structure",
      "Finding the through-line in disparate information",
    ],
  },
  {
    category: "Relational gifts",
    description: "The ability to create conditions for others to function at their best.",
    examples: [
      "Creating safety for honesty in groups",
      "Bridging between people who would not find each other",
      "Holding someone's development without directing it",
      "Sustaining relationships through difficulty, not just ease",
    ],
  },
  {
    category: "Creation gifts",
    description: "The ability to bring something into existence that was not there before.",
    examples: [
      "Taking an idea from concept to working reality",
      "Finding elegant solutions to constrained problems",
      "Building systems that keep working without constant maintenance",
      "Generating new possibilities where others see only existing options",
    ],
  },
  {
    category: "Communication gifts",
    description: "The ability to move something true through language, image, or presence.",
    examples: [
      "Writing or speaking that lands at the level of felt truth, not just logic",
      "Teaching so that the learner owns the insight, not just the content",
      "Asking questions that shift how someone sees their situation",
      "Holding a frame steady long enough for others to step into it",
    ],
  },
];

export default function GiftsPage() {
  return (
    <div className="bg-background pb-24">
      <div className="container max-w-4xl pt-14">
        <Breadcrumb items={[{ label: "The System", href: "/system" }, { label: "Stage 05 — Gifts" }]} />
        {/* ── HEADER ── */}
        <section className="mb-16 border-b border-border pb-10 pt-6">
          <div className="mb-4 flex items-center gap-2">
            <Star className="h-3.5 w-3.5 text-muted-foreground" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Stage 05 — Discover
            </p>
          </div>
          <h1
            className="max-w-3xl text-[2.8rem] leading-[1.02] tracking-[-0.04em] text-foreground md:text-[4rem]"
            style={editorialSerif}
          >
            Find what was always there underneath the conditioning.
          </h1>
          <p className="mt-5 max-w-2xl text-[1.1rem] leading-[1.7] text-muted-foreground">
            Your gifts are not your skills. They are not your achievements. They are not what your parents said you were
            good at. They are the specific capacities that were operating before anyone named them — and that you
            probably still take for granted.
          </p>
          <p className="mt-3 max-w-2xl text-[1.1rem] leading-[1.7] text-muted-foreground">
            This page is about finding them precisely. Not as an exercise in self-celebration — as a practical map for
            where your effort is best directed.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/archetypes"
              className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
            >
              Find your archetype <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <span className="text-muted-foreground/30">·</span>
            <Link
              href="/north-star"
              className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
            >
              Find your north star <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <span className="text-muted-foreground/30">·</span>
            <Link
              href="/system"
              className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
            >
              Full system map <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>

        {/* ── DISTINCTIONS ── */}
        <section className="mb-16">
          <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Four things to understand first
          </p>
          <div className="space-y-0 divide-y divide-border/50">
            {distinctions.map((d) => (
              <div key={d.label} className="py-6">
                <h3
                  className="mb-2 text-[1rem] font-semibold tracking-[-0.01em] text-foreground"
                  style={editorialSerif}
                >
                  {d.label}
                </h3>
                <p className="text-[0.93rem] leading-[1.75] text-muted-foreground">{d.explanation}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FINDING PROCESS ── */}
        <section className="mb-16 border-t border-border pt-12">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            How to find your gifts
          </p>
          <p className="mb-8 max-w-2xl text-[1rem] leading-[1.7] text-muted-foreground">
            Five steps. Not a personality quiz — an actual process. It works best done over a few days, not in one
            sitting.
          </p>
          <div className="space-y-8">
            {findingProcess.map((step) => (
              <div key={step.step} className="flex gap-6">
                <span className="w-8 shrink-0 pt-1 text-[1.1rem] font-bold tabular-nums text-muted-foreground/20">
                  {step.step}
                </span>
                <div>
                  <h3
                    className="mb-2 text-[1.05rem] font-semibold tracking-[-0.01em] text-foreground"
                    style={editorialSerif}
                  >
                    {step.title}
                  </h3>
                  <p className="text-[0.93rem] leading-[1.75] text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── GIFT CATEGORIES ── */}
        <section className="mb-16 border-t border-border pt-12">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            A map of gift types
          </p>
          <p className="mb-8 max-w-2xl text-[1rem] leading-[1.7] text-muted-foreground">
            This is not an exhaustive taxonomy — it is a reference for recognition. Read through and notice what
            resonates before you dismiss it as obvious.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {giftCategories.map((cat) => (
              <div key={cat.category} className="border border-border/60 bg-card/20 p-6">
                <div className="mb-3 flex items-start gap-2">
                  <Compass className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground/50" />
                  <div>
                    <h3
                      className="text-[0.95rem] font-semibold tracking-[-0.01em] text-foreground"
                      style={editorialSerif}
                    >
                      {cat.category}
                    </h3>
                    <p className="mt-1 text-[0.83rem] text-muted-foreground/70">{cat.description}</p>
                  </div>
                </div>
                <ul className="mt-4 space-y-2">
                  {cat.examples.map((ex) => (
                    <li key={ex} className="flex items-start gap-2 text-[0.83rem] leading-[1.6] text-muted-foreground">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/30" />
                      {ex}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── KEY QUESTION ── */}
        <section className="mb-16 border border-border/60 bg-card/20 p-8">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/50">
            The question to sit with
          </p>
          <p
            className="text-[1.35rem] font-semibold leading-[1.4] tracking-[-0.02em] text-foreground"
            style={editorialSerif}
          >
            "What do I do that others find valuable but I find ordinary — that I have never thought to charge for or
            teach, because it has always just been how I operate?"
          </p>
          <p className="mt-4 text-[0.93rem] leading-[1.75] text-muted-foreground">
            The answer to that question is usually closer to your actual gift than anything you have worked hard to
            acquire. Write it down. Then make it more specific. That specificity is where the gift becomes usable.
          </p>
        </section>

        {/* ── NEXT STEPS ── */}
        <section className="mb-16 border-t border-border pt-12">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Related tools in Stage 05
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <Link
              href="/archetypes"
              className="group border border-border/60 bg-card/20 p-5 transition-colors hover:border-border"
            >
              <p className="mb-1 text-[10px] uppercase tracking-[0.12em] text-muted-foreground/50">Quiz</p>
              <p className="text-[0.93rem] font-semibold text-foreground">Find your archetype</p>
              <p className="mt-1 text-[0.82rem] text-muted-foreground/70">
                Visionary, Seeker, Connector, or Builder — 5 questions.
              </p>
              <div className="mt-3 flex items-center gap-1 text-[11px] text-muted-foreground/50 transition-colors group-hover:text-muted-foreground">
                Take quiz <ArrowRight className="h-3 w-3" />
              </div>
            </Link>
            <Link
              href="/north-star"
              className="group border border-border/60 bg-card/20 p-5 transition-colors hover:border-border"
            >
              <p className="mb-1 text-[10px] uppercase tracking-[0.12em] text-muted-foreground/50">Framework</p>
              <p className="text-[0.93rem] font-semibold text-foreground">Your north star</p>
              <p className="mt-1 text-[0.82rem] text-muted-foreground/70">
                Five questions for finding the direction that is genuinely yours.
              </p>
              <div className="mt-3 flex items-center gap-1 text-[11px] text-muted-foreground/50 transition-colors group-hover:text-muted-foreground">
                Explore the framework <ArrowRight className="h-3 w-3" />
              </div>
            </Link>
            <Link
              href="/healing"
              className="group border border-border/60 bg-card/20 p-5 transition-colors hover:border-border"
            >
              <p className="mb-1 text-[10px] uppercase tracking-[0.12em] text-muted-foreground/50">Stage 04</p>
              <p className="text-[0.93rem] font-semibold text-foreground">Before this: healing</p>
              <p className="mt-1 text-[0.82rem] text-muted-foreground/70">
                If you are struggling to find your gifts, the clearing work comes first.
              </p>
              <div className="mt-3 flex items-center gap-1 text-[11px] text-muted-foreground/50 transition-colors group-hover:text-muted-foreground">
                Start Stage 04 <ArrowRight className="h-3 w-3" />
              </div>
            </Link>
          </div>
        </section>

        {/* ── NEWSLETTER ── */}
        <section className="border-t border-border pt-10">
          <NewsletterSubscribe
            provider="mailerlite"
            title="The letter — for people building on their own terms."
            description="One mechanism or framework per issue. The kind that changes how you read a news story, evaluate an opportunity, or make a decision. Roughly twice a month. No noise."
            buttonText="Join the letter"
          />
        </section>
      </div>
    </div>
  );
}
