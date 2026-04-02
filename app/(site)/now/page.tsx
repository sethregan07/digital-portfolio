import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

import { BASE_URL } from "@/lib/metadata";
import { Button } from "@/components/ui/button";
import NewsletterSubscribe from "@/components/newsletter-subscribe";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Now";
  const description = "What I'm focused on right now — current priorities, what's shipping, and open work.";
  const url = `${BASE_URL}/now`;

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
  },
  {
    title: "Strategic Mentoring",
    audience: "Impact teams and independent builders",
    description: "Ongoing support for people building hard things with limited time, complexity, and pressure.",
  },
];

const changelog = [
  {
    version: "v2.1.0",
    date: "Feb 2026",
    status: "current",
    items: ["5 New Course Lessons", "Journalistic Style", "Performance Boost"],
  },
  {
    version: "v2.0.0",
    date: "Dec 2025",
    status: "shipped",
    items: ["Deprogramming Course", "Platform Migration", "Better Organization"],
  },
  {
    version: "v1.5.0",
    date: "Nov 2025",
    status: "shipped",
    items: ["Articles Section", "Newsletter Ready", "Mobile Optimized"],
  },
  {
    version: "v1.2.0",
    date: "Sep 2025",
    status: "shipped",
    items: ["Search Functionality", "Tag System", "Analytics Integration"],
  },
];

function SectionHeader({ label, link, linkLabel }: { label: string; link?: string; linkLabel?: string }) {
  return (
    <div className="mb-7 flex items-end justify-between border-b border-border/70 pb-3">
      <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
      {link && linkLabel ? (
        <Link href={link} className="text-xs text-muted-foreground transition-colors hover:text-foreground">
          {linkLabel}
        </Link>
      ) : null}
    </div>
  );
}

export default function NowPage() {
  return (
    <div className="bg-gradient-to-b from-background via-background to-muted/30 pb-16">
      <div className="container max-w-5xl pt-10">
        {/* ── HEADER ── */}
        <section className="mb-16 border-b border-border/70 pb-10 pt-4">
          <div className="max-w-3xl">
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">Now</p>
            <h1
              className="text-4xl leading-tight tracking-[-0.03em] text-foreground md:text-5xl"
              style={editorialSerif}
            >
              What I'm focused on right now.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
              A quick pulse check on current priorities, what is shipping, and the kinds of work currently open. Updated
              regularly.
            </p>
            {/* Last updated signal — builds trust */}
            <p className="mt-3 text-xs uppercase tracking-widest text-muted-foreground/40">
              Last updated: February 2026
            </p>
          </div>
        </section>

        {/* ── CURRENT FOCUS — new section, personal + direct ── */}
        <section className="mb-20">
          <SectionHeader label="Current Focus" />
          <div className="grid gap-0 divide-y divide-border/60 rounded-sm border border-border/60">
            {[
              {
                status: "Active",
                item: "Writing new Deprogramming course lessons — targeting 50 total by Q2 2026.",
              },
              {
                status: "Active",
                item: "Publishing weekly essays on conditioning, systems, and independent thinking.",
              },
              {
                status: "In progress",
                item: "Building out the Frameworks library — adding 10 new decision tools.",
              },
              {
                status: "Paused",
                item: "Video content — planned for later in 2026 once writing cadence is stable.",
              },
            ].map(({ status, item }) => (
              <div key={item} className="flex items-start gap-5 px-6 py-4">
                <span
                  className={`mt-0.5 min-w-[72px] shrink-0 text-[10px] font-medium uppercase tracking-widest ${
                    status === "Active"
                      ? "text-foreground"
                      : status === "In progress"
                      ? "text-muted-foreground"
                      : "text-muted-foreground/40"
                  }`}
                >
                  {status}
                </span>
                <p className="text-sm font-light leading-7 text-muted-foreground">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CONSULTING ── */}
        <section className="mb-20">
          <SectionHeader label="Consulting & Mentoring" />

          <p className="mb-8 max-w-2xl text-base font-light leading-8 text-muted-foreground">
            A small number of clarity sessions open each month for founders, creators, and teams who need sharper
            decisions and cleaner execution.
          </p>

          <div className="mb-10 grid gap-6 md:grid-cols-2">
            {consulting.map((item) => (
              <div key={item.title} className="rounded-sm border border-border/60 bg-card/40 p-6">
                <p className="mb-2 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Advisory</p>
                <h2 className="mb-1 text-xl tracking-[-0.02em] text-foreground" style={editorialSerif}>
                  {item.title}
                </h2>
                <p className="mb-4 text-[10px] uppercase tracking-[0.1em] text-muted-foreground/60">{item.audience}</p>
                <p className="text-sm font-light leading-7 text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>

          {/* CTA — no "coming soon", direct email instead */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild className="rounded-sm px-6">
              <a href="mailto:signal@originalform.org">
                <Calendar className="mr-2 h-4 w-4" />
                Request a Session
              </a>
            </Button>
            <p className="text-xs text-muted-foreground/50">Email directly — I read every message.</p>
          </div>
        </section>

        {/* ── CHANGELOG — timeline style ── */}
        <section className="mb-20">
          <SectionHeader label="Changelog" />

          <p className="mb-8 max-w-2xl text-base font-light leading-8 text-muted-foreground">
            Recent updates, shipped and in progress.
          </p>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute bottom-0 left-[88px] top-0 hidden w-px bg-border/50 sm:block" />

            <div className="space-y-0 divide-y divide-border/50">
              {changelog.map((entry, index) => (
                <div key={entry.version} className="flex gap-0 py-6 sm:gap-8">
                  {/* Date + version — left column */}
                  <div className="hidden w-20 shrink-0 flex-col items-end gap-1 pt-0.5 sm:flex">
                    <span className="text-sm font-semibold text-foreground" style={editorialSerif}>
                      {entry.version}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground/50">{entry.date}</span>
                  </div>

                  {/* Dot */}
                  <div className="hidden w-8 shrink-0 items-start justify-center pt-1.5 sm:flex">
                    <div
                      className={`h-2 w-2 rounded-full border ${
                        index === 0 ? "border-foreground bg-foreground" : "border-border bg-transparent"
                      }`}
                    />
                  </div>

                  {/* Items */}
                  <div className="flex-1">
                    {/* Mobile header */}
                    <div className="mb-3 flex items-baseline justify-between sm:hidden">
                      <span className="text-sm font-semibold text-foreground" style={editorialSerif}>
                        {entry.version}
                      </span>
                      <span className="text-[10px] uppercase tracking-widest text-muted-foreground/50">
                        {entry.date}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {entry.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-sm border border-border/60 px-3 py-1 text-xs font-light text-muted-foreground"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WORKING TOGETHER — CTA points to contact, not resources ── */}
        <section className="mb-20 rounded-sm border border-border/70 bg-card/40 p-7 md:p-10" id="contact">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
            <div>
              <p className="mb-3 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Working Together</p>
              <h2 className="mb-4 text-3xl tracking-[-0.03em] text-foreground md:text-4xl" style={editorialSerif}>
                Best fit: people who want clearer decisions, not more noise.
              </h2>
              <p className="max-w-xl text-base font-light leading-8 text-muted-foreground">
                If you're building something meaningful and need sharper thinking around strategy, positioning, or
                execution — email is the best starting point.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3">
              <Button asChild className="rounded-sm px-6">
                <a href="mailto:signal@originalform.org">
                  Send a message
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline" className="rounded-sm border-border/80 px-6">
                <Link href="/projects/deprogramming">Explore the course</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ── NEWSLETTER ── */}
        <section className="border-t border-border/70 pt-10">
          <NewsletterSubscribe
            title="Get thoughtful notes on conditioning, clearer decisions, and grounded living"
            description="Occasional essays and practical frameworks on the three themes that shape the site: deprogramming, decision-making under noise, and living with more independence. Sent roughly 2× per month."
            buttonText="Subscribe"
          />
        </section>
      </div>
    </div>
  );
}
