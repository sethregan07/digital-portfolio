import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Download, FileText, Lightbulb, Newspaper } from "lucide-react";

import { BASE_URL } from "@/lib/metadata";
import { Button } from "@/components/ui/button";
import NewsletterSubscribe from "@/components/newsletter-subscribe";

export const revalidate = 300;

const editorialSerif = {
  fontFamily: "var(--font-serif), Georgia, serif",
};

export const metadata: Metadata = {
  title: "Start Here",
  description: "New to Originalform? This is where to begin — a clear path through the essays, tools, and course.",
  alternates: { canonical: `${BASE_URL}/start-here` },
  openGraph: {
    type: "website",
    url: `${BASE_URL}/start-here`,
    title: "Start Here — Originalform",
    description: "A clear path into Originalform for people who just arrived.",
  },
};

const steps = [
  {
    number: "01",
    label: "Download the free guide",
    href: "/free-guide",
    icon: Download,
    time: "10 min read",
    description:
      "Start with '5 Signs Your Thinking Has Been Managed.' It's short, practical, and designed to name something you've probably already felt. Most people recognise themselves in at least three of the five signs.",
    cta: "Get the guide",
  },
  {
    number: "02",
    label: "Read one essay",
    href: "/articles",
    icon: Newspaper,
    time: "15–20 min",
    description:
      "The essays are where the argument lives. A good place to start: 'Why Propaganda Works on Smart People' — it's the piece that names the core problem Originalform is built around. If that resonates, work through the rest.",
    cta: "Browse essays",
  },
  {
    number: "03",
    label: "Explore the frameworks",
    href: "/frameworks",
    icon: Lightbulb,
    time: "Browse at your pace",
    description:
      "Frameworks are decision tools — ways of organising perception that hold up outside the classroom and away from the feed. Each one is standalone and immediately usable. Pick the one that matches where you are right now.",
    cta: "See frameworks",
  },
  {
    number: "04",
    label: "Start the Deprogramming course",
    href: "/projects/deprogramming",
    icon: BookOpen,
    time: "42 lessons — free to start",
    description:
      "The course is the structured path through everything on this site. It moves through social conditioning, institutions, media, economic systems, education, and family programming — in sequence, with method. Free to begin. Self-paced.",
    cta: "Start the course",
  },
];

const essays = [
  {
    title: "Why Propaganda Works on Smart People",
    href: "/articles/why-propaganda-works-on-smart-people",
    description: "The essay that frames the whole project. Start here.",
  },
  {
    title: "Manufacturing Consent and Modern Media",
    href: "/articles/manufacturing-consent-and-modern-media",
    description: "How narratives are shaped before they reach you.",
  },
  {
    title: "Schooling and the Management of Attention",
    href: "/articles/schooling-and-the-management-of-attention",
    description: "What institutions actually optimise for.",
  },
  {
    title: "Debt as a System of Social Control",
    href: "/articles/debt-as-a-system-of-social-control",
    description: "How financial obligation shapes behaviour at scale.",
  },
];

export default function StartHerePage() {
  return (
    <div className="bg-background pb-24">
      <div className="container max-w-3xl pt-14">
        {/* ── HEADER ── */}
        <section className="mb-16 border-b border-border pb-10 pt-6">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            New here? Begin with this.
          </p>
          <h1
            className="text-[2.8rem] leading-[1.02] tracking-[-0.04em] text-foreground md:text-[4rem]"
            style={editorialSerif}
          >
            Start Here
          </h1>
          <p className="mt-5 max-w-xl text-[1.1rem] leading-[1.7] text-muted-foreground">
            Originalform is built around one question: what does it take to think clearly in a world that is actively
            working to prevent it?
          </p>
          <p className="mt-3 max-w-xl text-[1.1rem] leading-[1.7] text-muted-foreground">
            This page gives you the fastest path in — four steps, in the order that makes sense.
          </p>
        </section>

        {/* ── FOUR STEPS ── */}
        <section className="mb-20">
          <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">The path</p>
          <div className="space-y-0 divide-y divide-border/60">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="flex gap-8 py-10 first:pt-0 last:pb-0">
                  {/* Number */}
                  <div className="shrink-0 pt-1">
                    <span
                      className="text-[2rem] font-semibold leading-none text-muted-foreground/20"
                      style={editorialSerif}
                    >
                      {step.number}
                    </span>
                  </div>
                  {/* Content */}
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                      <Icon className="h-3.5 w-3.5" />
                      <span>{step.time}</span>
                    </div>
                    <h2
                      className="mb-3 text-[1.5rem] font-semibold tracking-[-0.02em] text-foreground"
                      style={editorialSerif}
                    >
                      {step.label}
                    </h2>
                    <p className="mb-5 max-w-lg text-[1rem] leading-[1.7] text-muted-foreground">{step.description}</p>
                    <Button asChild variant="outline" className="h-10 rounded-sm px-5">
                      <Link href={step.href}>
                        {step.cta} <ArrowRight className="ml-2 h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── DIVIDER ── */}
        <div className="mb-16 border-t border-border" />

        {/* ── RECOMMENDED ESSAYS ── */}
        <section className="mb-20">
          <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Essays to read first
          </p>
          <div className="space-y-0 divide-y divide-border/60">
            {essays.map((essay) => (
              <Link
                key={essay.href}
                href={essay.href}
                className="group flex items-start justify-between gap-6 py-5 transition-opacity hover:opacity-70"
              >
                <div>
                  <h3 className="mb-1.5 text-[1.1rem] font-medium tracking-[-0.01em] text-foreground">{essay.title}</h3>
                  <p className="text-[0.92rem] text-muted-foreground">{essay.description}</p>
                </div>
                <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground/40 transition-colors group-hover:text-foreground" />
              </Link>
            ))}
          </div>
          <div className="mt-8">
            <Button
              asChild
              variant="ghost"
              className="h-10 px-0 text-muted-foreground hover:bg-transparent hover:text-foreground"
            >
              <Link href="/articles">
                View all essays <ArrowRight className="ml-2 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </section>

        {/* ── DIVIDER ── */}
        <div className="mb-16 border-t border-border" />

        {/* ── WHAT THIS IS NOT ── */}
        <section className="mb-20">
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Worth saying clearly
          </p>
          <h2 className="mb-6 text-2xl tracking-[-0.02em] text-foreground" style={editorialSerif}>
            What Originalform is not.
          </h2>
          <div className="space-y-4 border-l-2 border-border/50 pl-5">
            <p className="text-[1rem] leading-[1.7] text-muted-foreground">
              <span className="font-medium text-foreground">Not left or right.</span> The goal is not to replace one
              ideology with another. It is to help you hold your own thinking — rigorously, honestly, without borrowed
              scripts.
            </p>
            <p className="text-[1rem] leading-[1.7] text-muted-foreground">
              <span className="font-medium text-foreground">Not conspiracy.</span> This is not about secret cabals or
              hidden puppeteers. It is about visible, well-documented systems that shape attention, belief, and
              behaviour — openly, by design.
            </p>
            <p className="text-[1rem] leading-[1.7] text-muted-foreground">
              <span className="font-medium text-foreground">Not more information.</span> The problem is not that you
              lack data. The problem is the framework for evaluating it. That is what this site is actually building.
            </p>
          </div>
        </section>

        {/* ── NEWSLETTER CTA ── */}
        <NewsletterSubscribe
          eyebrow="The Letter"
          provider="mailerlite"
          title="Stay connected while you work through it."
          description="A letter roughly twice a month — one idea, one framework, no noise. The essays and tools come to you. Unsubscribe any time."
          buttonText="Send me the letter"
          source="start-here-page"
        />
      </div>
    </div>
  );
}
