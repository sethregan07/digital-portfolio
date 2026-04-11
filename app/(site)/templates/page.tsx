import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, ExternalLink, Target, Zap } from "lucide-react";

import { BASE_URL } from "@/lib/metadata";
import NewsletterSubscribe from "@/components/newsletter-subscribe";

export const revalidate = 300;

const editorialSerif = {
  fontFamily: "var(--font-serif), Georgia, serif",
};

export const metadata: Metadata = {
  title: "Notion Templates — Originalform",
  description:
    "Free Notion templates for independent builders. The 12-Week Year planner, Make Time daily focus system, and more — built around the Originalform framework.",
  alternates: { canonical: `${BASE_URL}/templates` },
  openGraph: {
    type: "website",
    url: `${BASE_URL}/templates`,
    title: "Notion Templates — Originalform",
    description:
      "Free Notion templates for independent builders. The 12-Week Year planner, Make Time daily focus system, energy calendar, and more.",
  },
};

const templates = [
  {
    id: "12-week-year",
    title: "12-Week Year Execution Planner",
    tag: "Planning system",
    tagline: "Treat 12 weeks like a full year. Compress your execution cycle and stop losing months to drift.",
    description:
      "Based on Brian Moran's 12 Week Year framework. Most people operate on a 12-month planning horizon and lose urgency for 10 months out of every 12. This template compresses the cycle: one 12-week vision, three goals maximum, weekly scorecards, and a model week that reflects your actual priorities — not an aspirational one.",
    whatYouGet: [
      "12-week vision page with three-goal cap",
      "Weekly plan template with execution blocks",
      "Weekly scorecard (80% execution = on track)",
      "Daily model week builder",
      "Review ritual template (weekly + mid-point)",
      "Lag vs lead indicator tracker",
    ],
    goodFor: "Anyone running a quarter, a project, or a product cycle who keeps losing track in week 7.",
    stage: "Stage 06 — Build",
    stageHref: "/build",
    icon: Target,
    notionHref: "https://www.notion.so/templates",
    comingSoon: false,
  },
  {
    id: "make-time",
    title: "Make Time Daily Focus System",
    tag: "Daily operating system",
    tagline: "One highlight per day. Laser time blocks. Evening reflection. A system that fits real life.",
    description:
      "Based on Jake Knapp and John Zeratsky's Make Time framework. The core idea: instead of trying to do everything, choose one thing each day that will make it feel like a win — your Highlight. Then protect time for it with deliberate Laser blocks. Distraction is designed in; this template designs it out.",
    whatYouGet: [
      "Daily Highlight picker (three methods included)",
      "Time block planner with Laser focus slots",
      "Distraction audit log",
      "Evening reflection (4 questions)",
      "Energy level tracker",
      "Weekly pattern review",
    ],
    goodFor:
      "Independent builders, writers, and founders who keep ending the day having been busy but not having done the thing.",
    stage: "Stage 06 — Build",
    stageHref: "/build",
    icon: Clock,
    notionHref: "https://www.notion.so/templates",
    comingSoon: false,
  },
  {
    id: "energy-calendar",
    title: "Energy Management Calendar",
    tag: "Energy system",
    tagline: "Build your week around your energy pattern, not a generic productivity template.",
    description:
      "Most people schedule tasks at random and wonder why deep work never gets done. This template maps your chronotype, identifies your peak energy windows, and builds a repeatable weekly structure around them. Deep work goes in peak windows. Admin and meetings go in low-energy slots. Creative work goes where it actually happens.",
    whatYouGet: [
      "Chronotype assessment (early bird / third bird / night owl)",
      "Peak / support / recovery energy mapping",
      "Weekly energy calendar template",
      "Deep work block scheduler",
      "Meeting hygiene rules",
      "Monthly energy audit",
    ],
    goodFor: "Anyone who knows what they should be doing but keeps scheduling it at the wrong time of day.",
    stage: "Stage 06 — Build",
    stageHref: "/build",
    icon: Zap,
    notionHref: "https://www.notion.so/templates",
    comingSoon: false,
  },
  {
    id: "north-star-planner",
    title: "North Star Life Planner",
    tag: "Direction system",
    tagline: "From archetype to direction to quarterly execution. The full planning stack in one workspace.",
    description:
      "Combines the north star framework, archetype profile, and 12-week execution into a single Notion workspace. Starts with the five north star questions, maps your archetype's strengths and shadow, and connects both to your current quarter's goals. The idea is a single source of truth for what you are building and why.",
    whatYouGet: [
      "Five north star questions with reflection prompts",
      "Archetype profile page (gifts, shadow, invitation)",
      "3-year direction statement builder",
      "Quarterly goal alignment check",
      "Values clarification exercise",
      "Decision filter: 'does this move toward my north star?'",
    ],
    goodFor:
      "People post-deprogramming who have cleared the noise and need to rebuild a direction from what's actually theirs.",
    stage: "Stage 05 — Discover",
    stageHref: "/north-star",
    icon: Calendar,
    notionHref: "https://www.notion.so/templates",
    comingSoon: true,
  },
];

export default function TemplatesPage() {
  return (
    <div className="bg-background pb-24">
      <div className="container max-w-4xl pt-14">
        {/* ── HEADER ── */}
        <section className="mb-16 border-b border-border pb-12 pt-6">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Free resources
          </p>
          <h1
            className="max-w-3xl text-[2.8rem] leading-[1.02] tracking-[-0.04em] text-foreground md:text-[4rem]"
            style={editorialSerif}
          >
            Notion templates for independent builders.
          </h1>
          <p className="mt-5 max-w-2xl text-[1.05rem] leading-[1.75] text-muted-foreground">
            Free templates built around the frameworks in the Originalform system. Each one has a specific job — not a
            productivity aesthetic, not a course in a box. A tool that does one thing well and gets out of the way.
          </p>
          <p className="mt-3 max-w-xl text-[0.93rem] leading-[1.7] text-muted-foreground/70">
            Duplicate to your Notion workspace. No email required.
          </p>
        </section>

        {/* ── TEMPLATES ── */}
        <section className="mb-20 space-y-12">
          {templates.map((t) => (
            <div key={t.id} className="border border-border/60 bg-card/10">
              {/* Card header */}
              <div className="border-b border-border/50 p-6 pb-5">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <t.icon className="h-3.5 w-3.5 text-muted-foreground/50" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/50">
                      {t.tag}
                    </span>
                  </div>
                  {t.comingSoon ? (
                    <span className="rounded-sm border border-border/40 px-2 py-0.5 text-[9px] uppercase tracking-[0.12em] text-muted-foreground/40">
                      Coming soon
                    </span>
                  ) : (
                    <Link
                      href={t.stageHref}
                      className="text-[9px] uppercase tracking-[0.12em] text-muted-foreground/40 transition-colors hover:text-muted-foreground"
                    >
                      {t.stage}
                    </Link>
                  )}
                </div>
                <h2
                  className="mb-2 text-[1.35rem] font-semibold leading-[1.25] tracking-[-0.02em] text-foreground"
                  style={editorialSerif}
                >
                  {t.title}
                </h2>
                <p className="text-[0.95rem] leading-[1.6] text-muted-foreground">{t.tagline}</p>
              </div>

              {/* Card body */}
              <div className="grid gap-6 p-6 md:grid-cols-[1fr_260px]">
                <div>
                  <p className="mb-4 text-[0.9rem] leading-[1.8] text-muted-foreground">{t.description}</p>
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/40">
                    Good for
                  </p>
                  <p className="text-[0.85rem] leading-[1.7] text-muted-foreground/70">{t.goodFor}</p>
                </div>
                <div className="border-t border-border/40 pt-4 md:border-l md:border-t-0 md:pl-6 md:pt-0">
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/40">
                    What&apos;s inside
                  </p>
                  <ul className="space-y-2">
                    {t.whatYouGet.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-[0.82rem] leading-[1.6] text-muted-foreground"
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/30" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card footer */}
              <div className="border-t border-border/40 px-6 py-4">
                {t.comingSoon ? (
                  <span className="text-[11px] text-muted-foreground/40">
                    Join the letter to get notified when this template drops.
                  </span>
                ) : (
                  <Link
                    href={t.notionHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Duplicate to Notion <ExternalLink className="h-3 w-3" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </section>

        {/* ── OTHER TOOLS ── */}
        <section className="mb-16 border-t border-border pt-10">
          <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Other free tools
          </p>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {[
              { label: "Media Audit Checklist", href: "/checklist", note: "7 questions before you believe anything" },
              { label: "Vocabulary of Conditioning", href: "/vocabulary", note: "18 terms across 4 categories" },
              {
                label: "Source Audit Worksheet",
                href: "/tools#source-audit",
                note: "Map where your beliefs come from",
              },
              { label: "Archetype Quiz", href: "/archetypes", note: "Visionary, Seeker, Connector, or Builder" },
              { label: "Think Clearly Mini-Course", href: "/mini-course", note: "5 lessons, free email course" },
              { label: "All Tools", href: "/tools", note: "Everything in one place" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group border border-border/50 bg-card/10 p-4 transition-colors hover:border-border hover:bg-card/20"
              >
                <p className="text-[0.9rem] font-semibold text-foreground">{item.label}</p>
                <p className="mt-0.5 text-[0.8rem] text-muted-foreground/60">{item.note}</p>
                <div className="mt-2 flex items-center gap-1 text-[10px] text-muted-foreground/40 transition-colors group-hover:text-muted-foreground/60">
                  View <ArrowRight className="h-3 w-3" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── NEWSLETTER ── */}
        <section className="border-t border-border pt-10">
          <NewsletterSubscribe
            provider="mailerlite"
            title="Get new templates when they drop."
            description="New Notion templates are announced in the letter first. One framework per issue, roughly twice a month. No noise."
            buttonText="Join the letter"
          />
        </section>
      </div>
    </div>
  );
}
