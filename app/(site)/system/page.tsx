import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Compass,
  Eye,
  Flame,
  Heart,
  Layers,
  Lock,
  Star,
  TrendingUp,
  Zap,
} from "lucide-react";

import { BASE_URL } from "@/lib/metadata";
import { Button } from "@/components/ui/button";

export const revalidate = 300;

const editorialSerif = {
  fontFamily: "var(--font-serif), Georgia, serif",
};

export const metadata: Metadata = {
  title: "The Originalform System — The Complete Journey",
  description:
    "From deprogramming inherited beliefs to discovering your archetype, exiting systems that don't serve you, and building a life that is actually yours. The full map.",
  alternates: { canonical: `${BASE_URL}/system` },
  openGraph: {
    type: "website",
    url: `${BASE_URL}/system`,
    title: "The Originalform System — The Full Journey Map",
    description: "Eight stages from conditioning to clarity. The complete operating system for living as yourself.",
  },
};

const stages = [
  {
    number: "01",
    stage: "Clear",
    title: "Deprogram from what was installed",
    description:
      "Before anything else, you need to see what is actually yours and what arrived through conditioning — family, culture, education, media, economic incentives. Most people skip this step. Everything built on unexamined ground eventually collapses back to the original script.",
    icon: Eye,
    status: "live",
    resources: [
      { label: "Free guide — 5 Signs", href: "/free-guide" },
      { label: "Deprogramming course", href: "/projects/deprogramming" },
      { label: "Source Audit worksheet", href: "/tools#source-audit" },
      { label: "Media Audit checklist", href: "/checklist" },
      { label: "Vocabulary of Conditioning", href: "/vocabulary" },
    ],
    outcome: "You can name where your most important beliefs came from. You stop defending the script.",
  },
  {
    number: "02",
    stage: "Understand",
    title: "See how the current system actually works",
    description:
      "Debt, monetary systems, institutional incentives, who owns what and why — most people operate inside systems they have never examined. Understanding the architecture of the current system is not cynicism. It is the precondition for making real choices within it or outside it.",
    icon: Layers,
    status: "building",
    resources: [
      { label: "How debt shapes behaviour", href: "/understand" },
      { label: "The Sovereign Individual framework", href: "/north-star" },
    ],
    outcome: "You understand the rules of the game you are playing — and can decide whether to keep playing.",
  },
  {
    number: "03",
    stage: "Exit",
    title: "Find practical routes out of what does not serve you",
    description:
      "Understanding the system is not enough. Exit routes are the specific, practical paths away from dependencies — financial, professional, social — that keep people inside structures they have already seen through. This is not about dropping out. It is about optionality.",
    icon: Lock,
    status: "building",
    resources: [{ label: "Exit routes overview", href: "/exit" }],
    outcome: "You have a concrete plan for the specific dependencies you want to reduce or eliminate.",
  },
  {
    number: "04",
    stage: "Heal",
    title: "Clear what is stored in the body, not just the mind",
    description:
      "Conditioning does not only live in beliefs. It lives in the nervous system, in physical patterns, in emotional responses that fire before thought. Timeline healing and energy work address the layer that intellectual deprogramming alone cannot reach.",
    icon: Heart,
    status: "building",
    resources: [{ label: "Timeline healing — overview", href: "/healing" }],
    outcome: "The work you do mentally is no longer undermined by unresolved patterns in the body.",
  },
  {
    number: "05",
    stage: "Discover",
    title: "Find your archetype, gifts, and north star",
    description:
      "Once the noise is cleared, something becomes visible that was always there: a particular way you see, a set of gifts you did not choose, a direction that feels like returning rather than striving. This stage is about naming what was always underneath — your archetype, your role, your purpose.",
    icon: Compass,
    status: "building",
    resources: [
      { label: "Find your archetype (quiz)", href: "/archetypes" },
      { label: "What is your North Star", href: "/north-star" },
      { label: "Find your gifts", href: "/gifts" },
    ],
    outcome: "You have named your primary archetype, your core gifts, and the direction that feels genuinely yours.",
  },
  {
    number: "06",
    stage: "Build",
    title: "Design a life and work structure that fits who you actually are",
    description:
      "Most productivity systems were built for the industrial model — showing up, performing output, fitting the schedule. This stage is about building a work and life structure from your archetype outward: your energy patterns, your creative rhythms, your actual priorities. The 12-week framework and make-time approach live here.",
    icon: Zap,
    status: "building",
    resources: [
      { label: "The 12-week work framework", href: "/build" },
      { label: "Energy management calendar", href: "/build#energy" },
    ],
    outcome:
      "You have a weekly and quarterly structure designed around how you actually work, not how you were told to.",
  },
  {
    number: "07",
    stage: "Enable",
    title: "Tools, templates, and resources to run the system",
    description:
      "Frameworks only work if they are usable day-to-day. This is the practical layer: Notion templates, planning tools, worksheets, and reference systems for each stage of the journey — so the work you do in this system has somewhere to live and something to build on.",
    icon: Flame,
    status: "building",
    resources: [
      { label: "All free tools", href: "/tools" },
      { label: "Notion templates", href: "/tools#templates" },
    ],
    outcome: "Every part of the system has a corresponding tool that makes it repeatable and visible.",
  },
  {
    number: "08",
    stage: "Vision",
    title: "What comes next — future systems and your contribution",
    description:
      "The current operating system — economic, political, social — is in a late stage. New systems are being built. This final stage is about understanding what is emerging, where your contribution fits, and how to position yourself for a world that does not yet fully exist. A sneak peek into the next project.",
    icon: TrendingUp,
    status: "soon",
    resources: [{ label: "Future systems — coming soon", href: "#vision" }],
    outcome: "You have a clear sense of your contribution to what is being built, not just what currently exists.",
  },
];

const statusLabel: Record<string, { label: string; className: string }> = {
  live: { label: "Available now", className: "border-primary/30 text-primary" },
  building: { label: "In development", className: "border-border/60 text-muted-foreground" },
  soon: { label: "Coming soon", className: "border-border/40 text-muted-foreground/50" },
};

export default function SystemPage() {
  return (
    <div className="bg-background pb-24">
      <div className="container max-w-4xl pt-14">
        {/* ── HEADER ── */}
        <section className="mb-20 border-b border-border pb-12 pt-6">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            The Originalform System
          </p>
          <h1
            className="max-w-3xl text-[2.8rem] leading-[1.02] tracking-[-0.04em] text-foreground md:text-[4.2rem]"
            style={editorialSerif}
          >
            The full journey. Eight stages from conditioning to clarity.
          </h1>
          <p className="mt-6 max-w-2xl text-[1.1rem] leading-[1.7] text-muted-foreground">
            Originalform is not a collection of content. It is a complete operating system — from deprogramming what was
            installed in you, to discovering what was always there, to building a life from that foundation outward.
          </p>
          <p className="mt-3 max-w-2xl text-[1.1rem] leading-[1.7] text-muted-foreground">
            Most people start at Stage 1. Some arrive already through Stage 2 or 3. The map below shows the full arc —
            where you are, what is available now, and what is being built.
          </p>

          {/* Status legend */}
          <div className="mt-8 flex flex-wrap gap-4">
            {Object.entries(statusLabel).map(([, v]) => (
              <span
                key={v.label}
                className={`rounded-sm border px-3 py-1 text-[10px] uppercase tracking-[0.12em] ${v.className}`}
              >
                {v.label}
              </span>
            ))}
          </div>
        </section>

        {/* ── STAGES ── */}
        <section className="mb-24">
          <div className="relative space-y-0">
            {stages.map((stage, i) => {
              const Icon = stage.icon;
              const sl = statusLabel[stage.status];
              return (
                <div key={stage.number} className="relative">
                  {/* Connector line */}
                  {i < stages.length - 1 && (
                    <div className="absolute left-[27px] top-[72px] h-[calc(100%-40px)] w-[1px] bg-border/40" />
                  )}

                  <div className="flex gap-8 py-10">
                    {/* Icon + number */}
                    <div className="shrink-0 pt-1">
                      <div className="relative flex h-14 w-14 items-center justify-center rounded-sm border border-border/60 bg-card/30">
                        <Icon className="h-5 w-5 text-muted-foreground" />
                        <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border border-border/60 bg-background text-[9px] font-bold text-muted-foreground">
                          {i + 1}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="mb-3 flex flex-wrap items-center gap-3">
                        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground/50">
                          Stage {stage.number}
                        </span>
                        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground">
                          {stage.stage}
                        </span>
                        <span
                          className={`rounded-sm border px-2 py-0.5 text-[9px] uppercase tracking-[0.1em] ${sl.className}`}
                        >
                          {sl.label}
                        </span>
                      </div>

                      <h2
                        className="mb-3 text-[1.35rem] font-semibold leading-[1.25] tracking-[-0.02em] text-foreground md:text-[1.6rem]"
                        style={editorialSerif}
                      >
                        {stage.title}
                      </h2>

                      <p className="mb-5 max-w-2xl text-[0.97rem] leading-[1.75] text-muted-foreground">
                        {stage.description}
                      </p>

                      {/* Outcome */}
                      <div className="mb-5 flex items-start gap-2 rounded-sm border border-border/40 bg-card/20 px-4 py-3">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground/40" />
                        <p className="text-[0.88rem] leading-[1.6] text-muted-foreground">
                          <span className="font-medium text-foreground/70">When this clicks: </span>
                          {stage.outcome}
                        </p>
                      </div>

                      {/* Resources */}
                      {stage.resources.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {stage.resources.map((r) => (
                            <Link
                              key={r.href}
                              href={r.href}
                              className="inline-flex items-center gap-1.5 rounded-sm border border-border/50 px-3 py-1.5 text-[11px] uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:border-border hover:text-foreground"
                            >
                              {r.label}
                              <ArrowRight className="h-3 w-3" />
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  {i < stages.length - 1 && <div className="border-b border-border/30" />}
                </div>
              );
            })}
          </div>
        </section>

        {/* ── WHERE ARE YOU ── */}
        <section className="mb-20 border border-border/60 bg-card/20 p-8 md:p-10">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Not sure where you are?
          </p>
          <h2
            className="mb-4 text-2xl font-semibold tracking-[-0.02em] text-foreground md:text-3xl"
            style={editorialSerif}
          >
            Take the quiz. Get a personalised starting point.
          </h2>
          <p className="mb-7 max-w-xl text-[0.97rem] leading-[1.7] text-muted-foreground">
            Five questions that place you in the system — and tell you exactly what to do next. Your result includes a
            recommended path through the stages most relevant to where you are now.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="h-11 px-6">
              <Link href="/quiz">
                Take the quiz <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-11 px-6">
              <Link href="/start-here">
                See all starting points <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* ── VISION TEASER ── */}
        <section id="vision" className="mb-20 border border-border/40 bg-card/10 p-8 md:p-10">
          <div className="flex items-start gap-4">
            <Star className="mt-1 h-5 w-5 shrink-0 text-muted-foreground/40" />
            <div>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Stage 08 — Vision — Coming next
              </p>
              <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground" style={editorialSerif}>
                The next project: new systems for a world in transition.
              </h2>
              <p className="mb-4 max-w-xl text-[0.95rem] leading-[1.7] text-muted-foreground">
                The current economic, political, and social operating systems are showing their limits. New ones are
                being built — some deliberately, some by default. The final stage of this system is about understanding
                what is emerging, finding your role in it, and contributing to what comes next rather than defending
                what is ending.
              </p>
              <p className="max-w-xl text-[0.93rem] leading-[1.7] text-muted-foreground/60">
                If you want early access to the thinking as it develops, the letter is where it will appear first.
              </p>
              <div className="mt-6">
                <Button asChild variant="outline" className="h-10 px-5">
                  <Link href="/letter">
                    Get early access via the letter <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ── BOTTOM CTA ── */}
        <section className="border-t border-border pt-10">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Start at Stage 1
          </p>
          <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground" style={editorialSerif}>
            The free guide is the fastest way in.
          </h2>
          <p className="mb-6 max-w-lg text-[0.95rem] leading-[1.7] text-muted-foreground">
            Five signs your thinking has been managed — with a practical fix for each. Ten minutes. No account needed.
          </p>
          <Button asChild className="h-11 px-6">
            <Link href="/free-guide">
              Get the free guide <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </section>
      </div>
    </div>
  );
}
