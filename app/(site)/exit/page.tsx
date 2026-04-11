import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { BASE_URL } from "@/lib/metadata";
import { Button } from "@/components/ui/button";
import NewsletterSubscribe from "@/components/newsletter-subscribe";

export const revalidate = 300;

const editorialSerif = { fontFamily: "var(--font-serif), Georgia, serif" };

export const metadata: Metadata = {
  title: "Exit Routes — Practical Paths to More Autonomy",
  description:
    "Understanding the system is not enough. Exit routes are the specific, practical paths that reduce your dependencies and expand your options. Stage 3 of the Originalform system.",
  alternates: { canonical: `${BASE_URL}/exit` },
};

const routes = [
  {
    area: "Financial",
    title: "Reduce dependency on a single income source",
    description:
      "The single largest constraint on most people's choices is the employment-dependent income. Not because employment is wrong, but because exclusive dependency means any loss — redundancy, a difficult manager, health — removes all options at once. The exit route is not to quit your job. It is to build a second income that functions independently, even at small scale, before you need it.",
    steps: [
      "Map your actual monthly spending and identify the minimum you need to sustain your life",
      "Identify a skill or knowledge set that could generate income outside of employment",
      "Build that at 10% capacity before expanding — one client, one product, one recurring source",
      "Track the gap between your employment income and your minimum until they converge",
    ],
  },
  {
    area: "Time",
    title: "Reclaim your schedule from external design",
    description:
      "Most people's time is almost entirely externally structured — meetings, commutes, social obligations, notification loops designed by others. The exit route here is not radical withdrawal. It is the deliberate design of protected time that is yours before you give any of it away. Even one hour per day of genuinely autonomous time, used consistently, compounds into significant creative and financial output over a year.",
    steps: [
      "Track your time for one week at 30-minute intervals — not what you meant to do, what you actually did",
      "Identify the two or three things that produced the most real value and the three that consumed the most time for no return",
      "Block one morning or afternoon per week that is genuinely yours — no meetings, no obligations",
      "Treat this block as an appointment that cannot be cancelled",
    ],
  },
  {
    area: "Information",
    title: "Exit algorithmically curated information environments",
    description:
      "The feeds, platforms, and recommendation systems that dominate most people's information diet are optimised for engagement, not for the quality of your thinking. The exit route is not to become uninformed — it is to take deliberate control of what enters your attention and in what form. Reading books, following primary sources, and choosing what to pay attention to rather than consuming what arrives produces a qualitatively different quality of thought.",
    steps: [
      "Remove social media applications from your phone for two weeks and note what changes",
      "Replace the first 30 minutes of each day — previously filled with feeds — with something you chose deliberately",
      "Subscribe to three primary sources in areas that matter to you, replacing algorithmic curation with editorial curation",
      "Set a weekly reading goal for long-form material — books or long essays — rather than consuming fragmented content",
    ],
  },
  {
    area: "Geographic",
    title: "Decouple your income from your physical location",
    description:
      "Location-dependent income ties your quality of life to the cost of a specific city and the decisions of a specific employer. Remote-capable skills and income sources produce optionality: you can live where you choose, test different environments, and respond to cost of living changes without losing your income. This is not about leaving — it is about having the choice.",
    steps: [
      "Assess whether your current income is location-dependent or location-flexible",
      "If location-dependent: identify what skills would make you location-flexible",
      "If already flexible: identify whether you are living where you do by choice or by default",
      "Plan one deliberate experiment — one month in a different location — to test assumptions",
    ],
  },
  {
    area: "Identity",
    title: "Exit definitions of success that are not yours",
    description:
      "The hardest dependency to exit is not financial or geographic — it is the social definition of success that governs which choices feel acceptable. Career paths, home ownership timelines, relationship structures, consumption signals — these are not neutral. They are inherited. The exit route here is not rebellion. It is the deliberate construction of personal criteria for what a good life actually looks like for you specifically.",
    steps: [
      "Write down five things you believe you should want or should have by now — and trace each one to its source",
      "Identify which of these you would keep if there were no social approval attached to them",
      "Write a single paragraph describing what a genuinely good week looks like for you — without referencing external markers",
      "Use that description as the reference point when making decisions about time, money, and direction",
    ],
  },
];

export default function ExitPage() {
  return (
    <div className="bg-background pb-24">
      <div className="container max-w-3xl pt-14">
        <section className="mb-4 pt-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/50">
            Stage 03 of 08 — Exit
          </p>
        </section>
        <section className="mb-16 border-b border-border pb-10 pt-4">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Exit Routes
          </p>
          <h1
            className="text-[2.8rem] leading-[1.02] tracking-[-0.04em] text-foreground md:text-[4rem]"
            style={editorialSerif}
          >
            Seeing the system is not enough. You need a way out.
          </h1>
          <p className="mt-5 max-w-xl text-[1.1rem] leading-[1.7] text-muted-foreground">
            Exit routes are not about dropping out of society or rejecting everything. They are about reducing the
            specific dependencies that limit your choices — so that you stay in the system by choice, not by necessity.
          </p>
          <p className="mt-3 max-w-xl text-[1.1rem] leading-[1.7] text-muted-foreground">
            Five areas. For each: the dependency, the route out, and the specific steps.
          </p>
        </section>

        {/* ── ROUTES ── */}
        <section className="mb-16">
          <div className="space-y-0 divide-y divide-border/60">
            {routes.map((route) => (
              <div key={route.area} className="py-10">
                <div className="mb-5 flex items-center gap-3">
                  <span className="rounded-sm border border-border/50 px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                    {route.area}
                  </span>
                </div>
                <h2
                  className="mb-4 text-[1.3rem] font-semibold tracking-[-0.02em] text-foreground"
                  style={editorialSerif}
                >
                  {route.title}
                </h2>
                <p className="mb-6 max-w-2xl text-[0.95rem] leading-[1.8] text-muted-foreground">{route.description}</p>
                <div className="rounded-sm border border-border/40 bg-card/20 p-5">
                  <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/50">
                    Practical steps
                  </p>
                  <div className="space-y-3">
                    {route.steps.map((step, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/30" />
                        <p className="text-[0.9rem] leading-[1.65] text-muted-foreground">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── NEWSLETTER ── */}
        <section className="mb-16 border-t border-border pt-12">
          <NewsletterSubscribe
            provider="mailerlite"
            eyebrow="Stage 03 — Exit"
            title="Get the Exit Routes Notion template."
            description="A structured template for mapping your current dependencies and planning your exit routes — one area at a time. Free."
            buttonText="Send me the template"
            group="exit-routes"
            includeDefaultGroups={false}
            source="exit-page"
            successMessage="The template is on its way."
          />
        </section>

        {/* ── NEXT ── */}
        <section className="border-t border-border pt-10">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Next — Stage 04
          </p>
          <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground" style={editorialSerif}>
            Clear what the mind alone cannot reach.
          </h2>
          <p className="mb-6 text-[0.95rem] leading-[1.7] text-muted-foreground">
            Conditioning does not only live in beliefs and structures. It lives in the body, the nervous system, and
            emotional patterns that fire before thought. Stage 4 is healing work.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="outline" className="h-11 px-6">
              <Link href="/system">
                Back to the full system <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-11 px-6">
              <Link href="/archetypes">
                Skip to Stage 05 — Discover <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
