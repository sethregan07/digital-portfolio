import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Layers, Zap } from "lucide-react";

import { BASE_URL, defaultAuthor } from "@/lib/metadata";
import { Button } from "@/components/ui/button";
import NewsletterSubscribe from "@/components/newsletter-subscribe";

export const revalidate = 300;

const editorialSerif = {
  fontFamily: "var(--font-serif), Georgia, serif",
};

export async function generateMetadata(): Promise<Metadata> {
  const title = "About — Originalform";
  const description =
    "Originalform is a thinking system for people building something independent. Eight stages from deprogramming inherited assumptions to building a life that is actually yours.";
  const url = `${BASE_URL}/about`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", url, title, description },
    twitter: { card: "summary_large_image", title, description },
  };
}

const pillars = [
  {
    icon: Layers,
    title: "Deprogramming",
    description:
      "Most of what people believe about work, money, identity, and relationships arrived before they had tools to examine it. The first stage of this work is seeing the source — not to reject everything, but to choose consciously.",
  },
  {
    icon: BookOpen,
    title: "Systems thinking",
    description:
      "Once you can see your own conditioning, you can see the architecture of the systems you operate inside. Debt, institutions, media, incentives — understanding how these work is the precondition for making real choices within or outside them.",
  },
  {
    icon: Zap,
    title: "Building independently",
    description:
      "The end goal is not analysis. It is a life and work structure built from your actual values, archetype, and energy — not from inherited scripts about what success is supposed to look like.",
  },
];

const whatIsHere = [
  { label: "The 8-stage system", href: "/system", note: "The full journey map" },
  { label: "Deprogramming course", href: "/projects/deprogramming", note: "42 lessons, free to start" },
  { label: "Reading series", href: "/articles/series", note: "47 essays across 4 series" },
  { label: "Free tools", href: "/tools", note: "Checklists, worksheets, quiz" },
  { label: "The letter", href: "/letter", note: "One framework per issue" },
  { label: "Notion templates", href: "/templates", note: "12-week year, make time, more" },
];

export default function AboutPage() {
  return (
    <div className="bg-background pb-24">
      <div className="container max-w-4xl pt-14">
        {/* ── HEADER ── */}
        <section className="mb-16 border-b border-border pb-12 pt-6">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">About</p>
          <h1
            className="max-w-3xl text-[2.8rem] leading-[1.02] tracking-[-0.04em] text-foreground md:text-[4rem]"
            style={editorialSerif}
          >
            The bottleneck is not information. It is the assumptions running underneath your decisions.
          </h1>
          <p className="mt-6 max-w-2xl text-[1.1rem] leading-[1.75] text-muted-foreground">
            Originalform is a thinking system for people building something independent — founders, writers, people who
            have stepped off the default path and are trying to build something that actually fits who they are.
          </p>
        </section>

        {/* ── WHAT THIS IS ── */}
        <section className="mb-16">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-5 text-[1rem] leading-[1.8] text-muted-foreground">
              <p>
                Most productivity and self-help content assumes the operating system is fine — you just need better
                habits, cleaner systems, more discipline. Originalform starts with a different diagnosis: the operating
                system itself was installed by forces you never consciously agreed to.
              </p>
              <p>
                Family conditioning, educational systems, economic incentives, media narratives — these do not just
                influence what you think. They shape what feels obvious, what feels possible, what you reach for
                automatically. Most people optimise inside those constraints without ever examining them.
              </p>
              <p>The work here is about examining them. Then rebuilding from something more solid.</p>
            </div>
            <div className="space-y-5 text-[1rem] leading-[1.8] text-muted-foreground">
              <p>
                This is not a self-help site. It does not promise transformation. It offers frameworks, essays, and
                tools for people who are already thinking clearly enough to see that something in their current setup
                does not fit — and who want the vocabulary and structure to do something about it.
              </p>
              <p>
                The audience is specific: people building on their own terms, who need their thinking to hold up under
                pressure. Not people looking for motivation. People who are already moving and want the mental
                infrastructure to match.
              </p>
            </div>
          </div>
        </section>

        {/* ── THREE PILLARS ── */}
        <section className="mb-16 border-t border-border pt-12">
          <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Three territories
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {pillars.map((p) => (
              <div key={p.title} className="border border-border/60 bg-card/20 p-6">
                <p.icon className="mb-4 h-4 w-4 text-muted-foreground/50" />
                <h3
                  className="mb-3 text-[1rem] font-semibold tracking-[-0.01em] text-foreground"
                  style={editorialSerif}
                >
                  {p.title}
                </h3>
                <p className="text-[0.88rem] leading-[1.75] text-muted-foreground">{p.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── THE SYSTEM ── */}
        <section className="mb-16 border border-border/60 bg-card/20 p-8">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/50">
            The structure
          </p>
          <h2
            className="mb-4 text-[1.5rem] font-semibold leading-[1.3] tracking-[-0.03em] text-foreground"
            style={editorialSerif}
          >
            Eight stages from conditioning to clarity.
          </h2>
          <p className="mb-6 max-w-2xl text-[0.95rem] leading-[1.8] text-muted-foreground">
            The system is not a self-help programme. It is a map. Stage 01 is deprogramming — seeing what was installed.
            Stages 02–03 are understanding and exiting systems that don't serve you. Stage 04 is clearing what
            intellectual work alone cannot reach. Stages 05–06 are discovering your archetype and building from it.
            Stages 07–08 are tools and the larger view of what is being built.
          </p>
          <Link
            href="/system"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
          >
            See the full system map <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </section>

        {/* ── WHAT'S HERE ── */}
        <section className="mb-16 border-t border-border pt-12">
          <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            What is here
          </p>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {whatIsHere.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group border border-border/50 bg-card/10 p-4 transition-colors hover:border-border hover:bg-card/30"
              >
                <p className="text-[0.93rem] font-semibold text-foreground">{item.label}</p>
                <p className="mt-0.5 text-[0.8rem] text-muted-foreground/60">{item.note}</p>
                <div className="mt-2 flex items-center gap-1 text-[10px] uppercase tracking-[0.1em] text-muted-foreground/40 transition-colors group-hover:text-muted-foreground/70">
                  View <ArrowRight className="h-3 w-3" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── COMMITMENTS ── */}
        <section className="mb-16 border-t border-border pt-12">
          <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            How this works
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: "No spin",
                body: "What is known, uncertain, and still being tested stays visible. This is not a brand. It is a working document.",
              },
              {
                title: "Proof over promise",
                body: "If something is recommended, the logic is shown. No outcomes are guaranteed. The frameworks are tools, not answers.",
              },
              {
                title: "Corrections welcome",
                body: "If the work is wrong, it gets updated. If something helped, that matters too — write in.",
              },
            ].map((c) => (
              <div key={c.title}>
                <p className="mb-2 text-[0.93rem] font-semibold text-foreground">{c.title}</p>
                <p className="text-[0.88rem] leading-[1.75] text-muted-foreground">{c.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── AUTHOR ── */}
        <section className="mb-16 border-t border-border pt-10">
          <div className="flex items-start gap-6">
            <div>
              <p className="mb-1 text-[11px] uppercase tracking-[0.14em] text-muted-foreground/50">Published by</p>
              <p className="text-[1.1rem] font-semibold tracking-[-0.02em] text-foreground">{defaultAuthor.name}</p>
              <p className="mt-1 text-[0.88rem] text-muted-foreground/60">{defaultAuthor.email}</p>
              <p className="mt-3 max-w-md text-[0.93rem] leading-[1.75] text-muted-foreground">
                Writer, systems thinker, and independent builder. Previously embedded in systems that didn&apos;t fit.
                Now building frameworks for people in the same position.
              </p>
            </div>
          </div>
        </section>

        {/* ── NEWSLETTER ── */}
        <section className="border-t border-border pt-10">
          <NewsletterSubscribe
            provider="mailerlite"
            title="The letter — for people building on their own terms."
            description="One mechanism or framework per issue. The kind that changes how you read a situation, evaluate a decision, or see a pattern you were inside. Roughly twice a month."
            buttonText="Join the letter"
          />
        </section>
      </div>
    </div>
  );
}
