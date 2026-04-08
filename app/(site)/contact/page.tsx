import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Calendar, Lightbulb } from "lucide-react";

import { BASE_URL, defaultAuthor } from "@/lib/metadata";
import { Button } from "@/components/ui/button";
import NewsletterSubscribe from "@/components/newsletter-subscribe";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Contact";
  const description = "Get in touch — consulting, mentoring, course questions, or a note.";
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
  fontFamily: "var(--font-serif), Georgia, serif",
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
    <div className="bg-background pb-16">
      <div className="container max-w-5xl pt-14">
        <section className="mb-16 border-b border-border pb-10 pt-6">
          <div className="max-w-2xl">
            <p className="page-kicker mb-4">Contact</p>
            <h1 className="page-title" style={editorialSerif}>
              Get in touch.
            </h1>
            <p className="page-intro max-w-xl font-light">
              For consulting, mentoring, course questions, or anything else, email is the best way to reach the desk.
              Every message gets read, and most receive a reply.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <a
                href={`mailto:${defaultAuthor.email}`}
                className="text-[1.15rem] font-semibold tracking-[-0.02em] text-foreground transition-opacity hover:opacity-70"
              >
                {defaultAuthor.email}
              </a>
            </div>
            <p className="mt-2 text-[11px] uppercase tracking-[0.14em] text-muted-foreground/50">
              Typical response: 2–3 business days
            </p>
          </div>
        </section>

        <section className="mb-20">
          <div className="mb-7 flex items-baseline justify-between border-b border-border pb-3">
            <p className="section-label">Consulting & Mentoring</p>
            <span className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground/50">
              Limited availability
            </span>
          </div>

          <p className="mb-8 max-w-xl text-[1.0625rem] font-light leading-8 text-muted-foreground">
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
                    <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Advisory</p>
                  </div>
                  <h2 className="card-title mb-1">{item.title}</h2>
                  <p className="text-muted-foreground/55 mb-4 text-[11px] uppercase tracking-[0.12em]">
                    {item.audience}
                  </p>
                  <p className="text-[1.0625rem] font-light leading-8 text-muted-foreground">{item.description}</p>
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

        <section className="mb-20">
          <div className="mb-7 border-b border-border pb-3">
            <p className="section-label">Good fit</p>
          </div>

          <div className="mb-10 grid gap-0 divide-y divide-border/60 rounded-sm border border-border/60">
            {[
              "You are building something and need clearer thinking around strategy or positioning.",
              "You have read the essays and want to go deeper on a specific idea.",
              "You have a question about the course or a framework.",
              "You want to suggest a resource or flag something that needs correction.",
              "You just want to say something. That is fine too.",
            ].map((item) => (
              <div key={item} className="flex items-start gap-4 px-6 py-4">
                <span className="text-muted-foreground/35 mt-1 shrink-0 text-sm">→</span>
                <p className="text-[1.0625rem] font-light leading-8 text-muted-foreground">{item}</p>
              </div>
            ))}
          </div>

          <div className="mb-7 border-b border-border pb-3">
            <p className="section-label">Not a fit</p>
          </div>

          <div className="grid gap-0 divide-y divide-border/60 rounded-sm border border-border/60">
            {[
              "Pitches, sponsorships, or paid placements. This site does not carry ads.",
              "Requests to ghostwrite or produce content under another name.",
              "Bulk outreach or templated partnership requests.",
            ].map((item) => (
              <div key={item} className="flex items-start gap-4 px-6 py-4">
                <span className="mt-1 shrink-0 text-sm text-muted-foreground/25">×</span>
                <p className="text-muted-foreground/65 text-[1.0625rem] font-light leading-8">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-20 rounded-sm border border-border/70 bg-card/40 p-7 md:p-10">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
            <div>
              <p className="mb-3 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Working Together</p>
              <h2 className="section-title mb-4" style={editorialSerif}>
                Best fit: people who want clearer decisions, not more noise.
              </h2>
              <p className="max-w-xl text-[1.0625rem] font-light leading-8 text-muted-foreground">
                If you&apos;re building something meaningful and need sharper thinking around strategy, positioning, or
                execution, email is the best starting point.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3">
              <Button asChild className="rounded-sm px-6">
                <a href={`mailto:${defaultAuthor.email}`}>
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

        <section className="border-t border-border pt-10">
          <NewsletterSubscribe
            provider="mailerlite"
            title="Get thoughtful notes on conditioning, clearer decisions, and grounded living"
            description="Occasional essays and practical frameworks on the three themes that shape the site: deprogramming, decision-making under noise, and living with more independence. Sent roughly 2x per month."
            buttonText="Subscribe"
          />
        </section>
      </div>
    </div>
  );
}
