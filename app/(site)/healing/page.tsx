import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Heart } from "lucide-react";

import { BASE_URL } from "@/lib/metadata";
import NewsletterSubscribe from "@/components/newsletter-subscribe";

export const revalidate = 300;

const editorialSerif = {
  fontFamily: "var(--font-serif), Georgia, serif",
};

export const metadata: Metadata = {
  title: "Healing — Stage 04 | Originalform",
  description:
    "Conditioning doesn't only live in beliefs. It lives in the nervous system, in physical patterns, in emotional responses that fire before thought. Stage 04 is about clearing what intellectual work alone cannot reach.",
  alternates: { canonical: `${BASE_URL}/healing` },
  openGraph: {
    type: "website",
    url: `${BASE_URL}/healing`,
    title: "Healing — Stage 04 | Originalform",
    description:
      "The layer of the work that lives below conscious thought. Nervous system patterns, stored responses, and what timeline healing actually addresses.",
  },
};

const patterns = [
  {
    title: "You understand it but keep repeating it",
    description:
      "You have seen the conditioning clearly. You know where it came from. But the pattern keeps firing anyway — in relationships, in how you respond to stress, in what you reach for. This is the body, not the mind.",
  },
  {
    title: "The same emotional response shows up in different contexts",
    description:
      "Defensiveness in feedback. Collapse when someone withdraws. Anxiety when things are going well. The trigger changes; the feeling is identical. That is stored, not chosen.",
  },
  {
    title: "Your decisions make sense logically but feel wrong in the body",
    description:
      "You reason your way to a good decision and then feel a quiet dread about it. Or the opposite: you know something is bad for you and feel pulled toward it anyway. The body is running a different calculation.",
  },
  {
    title: "You have done the thinking work but feel stuck",
    description:
      "You can articulate your conditioning, map your patterns, identify what you want — and still not move. What is left is not a knowledge problem.",
  },
];

const approaches = [
  {
    title: "Timeline healing",
    description:
      "A process for returning to specific memories or periods where patterns were installed, and clearing the emotional charge stored there. This is not about re-living or re-traumatising — it is about completing what was left incomplete.",
    when: "When a specific event or period is clearly at the root of a recurring pattern.",
  },
  {
    title: "Nervous system regulation",
    description:
      "The nervous system learns threat responses and holds them. Regulation work — breath, movement, somatic awareness — teaches it new defaults. The goal is a baseline state of safety rather than one of low-grade vigilance.",
    when: "When the default state is tired, anxious, or defended even when nothing is actively wrong.",
  },
  {
    title: "Parts work",
    description:
      "Parts of us formed at different stages with different jobs: protecting, managing, adapting. When those parts are running old strategies in new circumstances, the work is to acknowledge them rather than suppress or override them.",
    when: "When internal conflict is the main obstacle — when you want two incompatible things and neither wins.",
  },
  {
    title: "Belief archaeology",
    description:
      "Tracing a current belief or behaviour to its origin — not to assign blame, but to see that it made sense then and may not apply now. The belief was a conclusion drawn from evidence that no longer exists.",
    when: "When a belief feels like a fact but cannot be verified in the present.",
  },
];

const distinctions = [
  {
    label: "This is not therapy",
    explanation:
      "Therapy often works with what is happening now and what to do about it. This work goes further back — to where the pattern was first installed — and works at the level of the body rather than only the narrative.",
  },
  {
    label: "This is not positive thinking",
    explanation:
      "Affirmations and reframes work at the conscious level. Healing work operates below that — on the patterns that run before and underneath conscious thought.",
  },
  {
    label: "This is not spiritual bypassing",
    explanation:
      "Bypassing uses spiritual framing to avoid the work. This stage is the opposite: it takes the stored material seriously, looks at it directly, and does not skip over it with concepts.",
  },
  {
    label: "This is not optional if you want the later stages to hold",
    explanation:
      "Stage 05 (Discover) and Stage 06 (Build) require a stable foundation. If unresolved patterns are running underneath, they will surface and undermine whatever is built on top of them.",
  },
];

export default function HealingPage() {
  return (
    <div className="bg-background pb-24">
      <div className="container max-w-4xl pt-14">
        {/* ── HEADER ── */}
        <section className="mb-16 border-b border-border pb-10 pt-6">
          <div className="mb-4 flex items-center gap-2">
            <Heart className="h-3.5 w-3.5 text-muted-foreground" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Stage 04 — Heal
            </p>
          </div>
          <h1
            className="max-w-3xl text-[2.8rem] leading-[1.02] tracking-[-0.04em] text-foreground md:text-[4rem]"
            style={editorialSerif}
          >
            Clear what intellectual work alone cannot reach.
          </h1>
          <p className="mt-5 max-w-2xl text-[1.1rem] leading-[1.7] text-muted-foreground">
            Conditioning does not only live in beliefs. It lives in the nervous system — in physical patterns and
            emotional responses that fire before thought arrives. You can understand your conditioning completely and
            still be run by it at the level of the body.
          </p>
          <p className="mt-3 max-w-2xl text-[1.1rem] leading-[1.7] text-muted-foreground">
            Stage 04 is about clearing that layer. Not as a spiritual exercise. As a practical precondition for what
            comes after.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/system"
              className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
            >
              Full system map <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <span className="text-muted-foreground/30">·</span>
            <Link
              href="/archetypes"
              className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
            >
              Next: Stage 05 — Discover <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>

        {/* ── WHY THIS STAGE EXISTS ── */}
        <section className="mb-16">
          <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Why Stage 04 exists
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {patterns.map((pattern) => (
              <div key={pattern.title} className="border border-border/60 bg-card/20 p-6">
                <h3
                  className="mb-3 text-[1rem] font-semibold leading-[1.3] tracking-[-0.01em] text-foreground"
                  style={editorialSerif}
                >
                  {pattern.title}
                </h3>
                <p className="text-[0.9rem] leading-[1.75] text-muted-foreground">{pattern.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── WHAT THE WORK INVOLVES ── */}
        <section className="mb-16 border-t border-border pt-12">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            What the work involves
          </p>
          <p className="mb-8 max-w-2xl text-[1rem] leading-[1.7] text-muted-foreground">
            There is no single method. The approach depends on where the pattern is stored and how it presents. These
            are the primary tools used in Stage 04 work.
          </p>
          <div className="space-y-0 divide-y divide-border/50">
            {approaches.map((approach) => (
              <div key={approach.title} className="py-8">
                <div className="grid gap-6 md:grid-cols-[1fr_280px]">
                  <div>
                    <h3
                      className="mb-3 text-[1.15rem] font-semibold tracking-[-0.02em] text-foreground"
                      style={editorialSerif}
                    >
                      {approach.title}
                    </h3>
                    <p className="text-[0.93rem] leading-[1.75] text-muted-foreground">{approach.description}</p>
                  </div>
                  <div className="rounded-sm border border-border/40 bg-card/30 p-4">
                    <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/50">
                      Use when
                    </p>
                    <p className="text-[0.85rem] leading-[1.6] text-muted-foreground">{approach.when}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── DISTINCTIONS ── */}
        <section className="mb-16 border-t border-border pt-12">
          <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            What this is not
          </p>
          <div className="space-y-5">
            {distinctions.map((d) => (
              <div key={d.label} className="flex gap-4">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/40" />
                <div>
                  <p className="mb-1 text-[0.95rem] font-semibold text-foreground">{d.label}</p>
                  <p className="text-[0.9rem] leading-[1.75] text-muted-foreground">{d.explanation}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── OUTCOME ── */}
        <section className="mb-16 border border-border/60 bg-card/20 p-8">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/50">
            Outcome of Stage 04
          </p>
          <p
            className="text-[1.35rem] font-semibold leading-[1.35] tracking-[-0.02em] text-foreground"
            style={editorialSerif}
          >
            The work you do mentally is no longer undermined by unresolved patterns in the body.
          </p>
          <p className="mt-4 text-[0.95rem] leading-[1.75] text-muted-foreground">
            Stage 05 — discovering your archetype, gifts, and north star — becomes available when there is enough
            internal stability to hear something underneath the noise. You cannot find what is yours when the nervous
            system is running a threat response.
          </p>
        </section>

        {/* ── WHAT'S NEXT ── */}
        <section className="mb-16 border-t border-border pt-12">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            After Stage 04
          </p>
          <p className="mb-6 max-w-xl text-[0.95rem] leading-[1.7] text-muted-foreground">
            Once the clearing work is underway, Stage 05 opens: discovering your archetype, your core gifts, and the
            direction that was always there underneath the conditioning.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/archetypes"
              className="inline-flex items-center gap-2 rounded-sm border border-border/60 px-5 py-2.5 text-[11px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:border-border hover:text-foreground"
            >
              Find your archetype <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/north-star"
              className="inline-flex items-center gap-2 rounded-sm border border-border/60 px-5 py-2.5 text-[11px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:border-border hover:text-foreground"
            >
              Find your north star <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/gifts"
              className="inline-flex items-center gap-2 rounded-sm border border-border/60 px-5 py-2.5 text-[11px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:border-border hover:text-foreground"
            >
              Discover your gifts <ArrowRight className="h-3.5 w-3.5" />
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
