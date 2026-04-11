import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { BASE_URL } from "@/lib/metadata";
import { Button } from "@/components/ui/button";
import NewsletterSubscribe from "@/components/newsletter-subscribe";
import { Breadcrumb } from "@/components/breadcrumb";

export const revalidate = 300;

const editorialSerif = { fontFamily: "var(--font-serif), Georgia, serif" };

export const metadata: Metadata = {
  title: "Build — The 12-Week Framework and Energy Calendar",
  description:
    "Design a work and life structure built around your archetype, your energy patterns, and your actual priorities — not the industrial model. Stage 6 of the Originalform system.",
  alternates: { canonical: `${BASE_URL}/build` },
};

const twelveWeekPhases = [
  {
    weeks: "Weeks 1–2",
    phase: "Orientation",
    description:
      "Define the one outcome that would make this 12-week period a success. Not a list of goals — one outcome. Everything else becomes subordinate to this. Map the specific projects and actions that produce it. Nothing else gets on the plan.",
  },
  {
    weeks: "Weeks 3–9",
    phase: "Execution",
    description:
      "Seven weeks of focused work on the plan. Weekly review every Sunday: what got done, what didn't, what adjusted. No new projects enter during this period. The discipline is not in the plan — it is in refusing to abandon it when it becomes difficult.",
  },
  {
    weeks: "Week 10",
    phase: "Buffer",
    description:
      "A week with no planned output. Catch up on what slipped, review what needs to change, rest before the push. Most 12-week plans fail because they have no slack — this week is built-in slack before the final phase.",
  },
  {
    weeks: "Weeks 11–12",
    phase: "Completion and Review",
    description:
      "Final push on the primary outcome. Then a structured review: what worked, what didn't, what the next 12-week cycle is for. The review is not optional — it is where the learning that improves the next cycle is captured.",
  },
];

const energyPrinciples = [
  {
    title: "Design around peaks, not availability",
    description:
      "Everyone has a peak cognitive window — usually 2–4 hours when their thinking is clearest and their output is highest. Most people fill this time with meetings, email, and low-leverage tasks. The primary shift is to protect this window for the work that requires the most from you.",
  },
  {
    title: "Match task type to energy state",
    description:
      "Creative and analytical work requires different conditions than administrative and communicative work. Building a weekly structure that places creative work in high-energy windows and administrative work in low-energy ones produces more output with less depletion — not by working more, but by working in alignment.",
  },
  {
    title: "Rest is not lost time",
    description:
      "Recovery is part of the production cycle, not an interruption of it. Sustained output requires deliberate rest — not just sleep, but recovery time built into each day and each week. The people who produce the most over the long term are not those who rest least but those who recover most effectively.",
  },
  {
    title: "Your archetype shapes your best rhythm",
    description:
      "A Visionary works differently from a Builder. A Connector needs different conditions than a Seeker. The energy calendar is not a universal template — it is built from your archetype, your chronotype, and your specific constraints. The generic advice about productivity is largely useless because it ignores the person it is supposed to serve.",
  },
];

const weeklyStructure = [
  { day: "Monday", focus: "Orientation — review the week's primary goal and plan the three non-negotiable outputs" },
  { day: "Tue–Thu", focus: "Deep work blocks — 2–3 hour uninterrupted sessions on primary outcome work" },
  { day: "Friday", focus: "Administrative, communication, and relationship work — not creative output" },
  { day: "Saturday", focus: "Optional — learning, exploration, or rest depending on your energy state" },
  { day: "Sunday", focus: "Weekly review — 30 minutes assessing what happened and preparing the next week" },
];

export default function BuildPage() {
  return (
    <div className="bg-background pb-24">
      <div className="container max-w-3xl pt-14">
        <Breadcrumb items={[{ label: "The System", href: "/system" }, { label: "Stage 06 — Build" }]} />

        <section className="mb-4 pt-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/50">
            Stage 06 of 08 — Build
          </p>
        </section>
        <section className="mb-16 border-b border-border pb-10 pt-4">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            The 12-Week Framework + Energy Calendar
          </p>
          <h1
            className="text-[2.8rem] leading-[1.02] tracking-[-0.04em] text-foreground md:text-[4rem]"
            style={editorialSerif}
          >
            Build a structure that fits who you actually are.
          </h1>
          <p className="mt-5 max-w-xl text-[1.1rem] leading-[1.7] text-muted-foreground">
            Most productivity systems were designed for the industrial model — consistent output, external schedule,
            interchangeable workers. If you have done the work of Stages 1–5, you are not that. This stage is about
            building a work and life structure from your archetype outward.
          </p>
          <p className="mt-3 max-w-xl text-[1.1rem] leading-[1.7] text-muted-foreground">
            Two frameworks: the 12-week cycle for direction and output, and the energy calendar for daily and weekly
            structure.
          </p>
        </section>

        {/* ── 12 WEEK ── */}
        <section className="mb-16">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Framework 01
          </p>
          <h2 className="mb-5 text-2xl font-semibold tracking-tight text-foreground" style={editorialSerif}>
            The 12-Week Work Cycle
          </h2>
          <p className="mb-8 max-w-2xl text-[0.97rem] leading-[1.7] text-muted-foreground">
            Annual goals fail because a year is too long to hold focus and too short to change direction meaningfully.
            Twelve weeks is long enough to complete something significant and short enough to maintain urgency throughout.
            Each cycle is a complete unit: one primary outcome, a structured execution period, and a deliberate review.
          </p>
          <div className="space-y-0 divide-y divide-border/60">
            {twelveWeekPhases.map((phase) => (
              <div key={phase.phase} className="flex gap-7 py-7">
                <div className="w-24 shrink-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground/50">
                    {phase.weeks}
                  </p>
                  <p className="mt-1 text-[0.85rem] font-semibold text-foreground">{phase.phase}</p>
                </div>
                <p className="text-[0.93rem] leading-[1.75] text-muted-foreground">{phase.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── ENERGY CALENDAR ── */}
        <section id="energy" className="mb-16">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Framework 02
          </p>
          <h2 className="mb-5 text-2xl font-semibold tracking-tight text-foreground" style={editorialSerif}>
            The Energy Calendar
          </h2>
          <p className="mb-8 max-w-2xl text-[0.97rem] leading-[1.7] text-muted-foreground">
            Time management that ignores energy is just scheduling. The energy calendar maps your actual cognitive and
            creative capacity across the day and week — and builds structure around that reality rather than around
            availability.
          </p>

          <div className="mb-8 space-y-4">
            {energyPrinciples.map((p) => (
              <div key={p.title} className="border border-border/40 bg-card/20 p-5">
                <h3 className="mb-2 font-semibold text-foreground" style={editorialSerif}>{p.title}</h3>
                <p className="text-[0.9rem] leading-[1.65] text-muted-foreground">{p.description}</p>
              </div>
            ))}
          </div>

          {/* Sample week */}
          <div className="rounded-sm border border-border/60 bg-card/20">
            <div className="border-b border-border/40 px-6 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Sample weekly structure
              </p>
            </div>
            <div className="divide-y divide-border/40">
              {weeklyStructure.map((item) => (
                <div key={item.day} className="flex items-start gap-6 px-6 py-4">
                  <span className="w-20 shrink-0 text-[0.85rem] font-semibold text-muted-foreground/60">{item.day}</span>
                  <p className="text-[0.9rem] leading-[1.6] text-muted-foreground">{item.focus}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHAT YOU NEED ── */}
        <section className="mb-16 border border-border/60 bg-card/20 p-7">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            To use these frameworks effectively, you need
          </p>
          <div className="space-y-3">
            {[
              "Your archetype — so the structure fits how you actually work",
              "Your north star — so the 12-week outcome is aimed at something that matters",
              "Your exit routes mapped — so your constraints are explicit and planned around",
              "The Notion template — so the framework has somewhere to live day-to-day",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/30" />
                <p className="text-[0.95rem] leading-[1.6] text-foreground">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── NEWSLETTER ── */}
        <section className="mb-16 border-t border-border pt-12">
          <NewsletterSubscribe
            provider="mailerlite"
            eyebrow="Stage 06 — Build"
            title="Get the 12-Week Planner + Energy Calendar Notion template."
            description="A complete Notion workspace for planning your 12-week cycle, tracking weekly output, and mapping your energy across the day. Free."
            buttonText="Send me the templates"
            group="build-templates"
            includeDefaultGroups={false}
            source="build-page"
            successMessage="The templates are on their way."
          />
        </section>

        {/* ── NEXT ── */}
        <section className="border-t border-border pt-10">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            See the full system
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="outline" className="h-11 px-6">
              <Link href="/system">
                Back to the journey map <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-11 px-6">
              <Link href="/tools">
                All tools and templates <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
