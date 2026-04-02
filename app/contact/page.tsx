import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Calendar, Lightbulb } from "lucide-react";

import { BASE_URL, defaultAuthor } from "@/lib/metadata";
import { Button } from "@/components/ui/button";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Contact";
  const description = "Get in touch — consulting, mentoring, or just a message.";
  const url = `${BASE_URL}/contact`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", url, title, description },
    twitter: { card: "summary_large_image", title, description },
  };
}

const editorialSerif = {
  fontFamily: '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, "Times New Roman", serif',
};

const consulting = [
  {
    title: "Founder Clarity Sessions",
    audience: "Founders, creators, and operators",
    description: "One-on-one sessions to clarify strategy, surface blind spots, and remove execution noise.",
    icon: Lightbulb,
  },
  {
    title: "Strategic Mentoring",
    audience: "Impact teams and independent builders",
    description: "Ongoing support for people building hard things with limited time, complexity, and pressure.",
    icon: BookOpen,
  },
];

export default function ContactPage() {
  return (
    <div className="bg-gradient-to-b from-background via-background to-muted/30 pb-16">
      <div className="container max-w-5xl pt-10">
        {/* ── HEADER ── */}
        <section className="mb-16 border-b border-border/70 pb-10 pt-4">
          <div className="max-w-2xl">
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">Contact</p>
            <h1
              className="text-4xl leading-tight tracking-[-0.03em] text-foreground md:text-5xl"
              style={editorialSerif}
            >
              Get in touch.
            </h1>
            <p className="mt-5 max-w-xl text-base font-light leading-8 text-muted-foreground">
              For consulting, mentoring, course questions, or anything else — email is the best way to reach me. I read
              every message and reply to most.
            </p>

            {/* Direct email — visible, no form friction */}
            <div className="mt-8 flex items-center gap-4">
              <a
                href={`mailto:${defaultAuthor.email}`}
                className="text-lg font-light text-foreground transition-opacity hover:opacity-70"
                style={editorialSerif}
              >
                {defaultAuthor.email}
              </a>
            </div>
            <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground/40">
              Typical response: 2–3 business days
            </p>
          </div>
        </section>

        {/* ── CONSULTING ── */}
        <section className="mb-20">
          <div className="mb-7 flex items-baseline justify-between border-b border-border/70 pb-3">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Consulting & Mentoring</p>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground/40">Limited availability</span>
          </div>

          <p className="mb-8 max-w-xl text-base font-light leading-8 text-muted-foreground">
            A small number of sessions open each month. Best fit: founders, creators, and teams who need sharper
            decisions and cleaner execution.
          </p>

          <div className="mb-10 grid gap-6 md:grid-cols-2">
            {consulting.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-sm border border-border/60 bg-card/40 p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Advisory</p>
                  </div>
                  <h2 className="mb-1 text-xl tracking-[-0.02em] text-foreground" style={editorialSerif}>
                    {item.title}
                  </h2>
                  <p className="mb-4 text-[10px] uppercase tracking-[0.1em] text-muted-foreground/50">
                    {item.audience}
                  </p>
                  <p className="text-sm font-light leading-7 text-muted-foreground">{item.description}</p>
                </div>
              );
            })}
          </div>

          <Button asChild className="rounded-sm px-6">
            <a href={`mailto:${defaultAuthor.email}?subject=Session request`}>
              <Calendar className="mr-2 h-4 w-4" />
              Request a Session
            </a>
          </Button>
        </section>

        {/* ── GOOD FIT / NOT A FIT ── */}
        <section className="mb-20">
          <div className="mb-7 border-b border-border/70 pb-3">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Good fit</p>
          </div>

          <div className="mb-10 grid gap-0 divide-y divide-border/60 rounded-sm border border-border/60">
            {[
              "You're building something and need clearer thinking around strategy or positioning.",
              "You've read the essays and want to go deeper on a specific idea.",
              "You have a question about the course or a framework.",
              "You want to suggest a resource or flag something I got wrong.",
              "You just want to say something — that's fine too.",
            ].map((item) => (
              <div key={item} className="flex items-start gap-4 px-6 py-4">
                <span className="mt-1 shrink-0 text-xs text-muted-foreground/30">→</span>
                <p className="text-sm font-light leading-7 text-muted-foreground">{item}</p>
              </div>
            ))}
          </div>

          <div className="mb-7 border-b border-border/70 pb-3">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Not a fit</p>
          </div>

          <div className="grid gap-0 divide-y divide-border/60 rounded-sm border border-border/60">
            {[
              "Pitches, sponsorships, or paid placements — this site doesn't carry ads.",
              "Requests to ghostwrite or produce content under another name.",
              "Bulk outreach or templated partnership requests.",
            ].map((item) => (
              <div key={item} className="flex items-start gap-4 px-6 py-4">
                <span className="mt-1 shrink-0 text-xs text-muted-foreground/20">×</span>
                <p className="text-sm font-light leading-7 text-muted-foreground/60">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── ELSEWHERE ── */}
        <section className="flex flex-col gap-4 border-t border-border/70 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-sm text-sm font-light text-muted-foreground">
            Not ready to email? Read the work first — the course is free to start.
          </p>
          <Button asChild variant="outline" className="shrink-0 rounded-sm border-border/80 px-6">
            <Link href="/projects/deprogramming">
              Start the course
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </section>
      </div>
    </div>
  );
}
