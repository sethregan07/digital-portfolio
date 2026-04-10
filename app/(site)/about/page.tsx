import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";

import { BASE_URL, defaultAuthor } from "@/lib/metadata";
import { Button } from "@/components/ui/button";
import NewsletterSubscribe from "@/components/newsletter-subscribe";

export async function generateMetadata(): Promise<Metadata> {
  const title = "About";
  const description =
    "Originalform is a thinking space for founders and sharp minds who suspect their reasoning has been shaped by forces they never examined.";
  const url = `${BASE_URL}/about`;
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

export default function AboutPage() {
  return (
    <div className="bg-background pb-16">
      <div className="container max-w-5xl pt-14">
        {/* ── HERO ── */}
        <section className="mb-16 border-b border-border pb-10 pt-6">
          <div className="max-w-2xl">
            <p className="page-kicker mb-4">About</p>
            <h1 className="page-title" style={editorialSerif}>
              For people who are smart enough to sense something is wrong — but haven&apos;t yet found the language for
              it.
            </h1>
            <p className="page-intro max-w-xl font-light">
              Originalform is a thinking space built around one question: what does it take to reason clearly in a world
              that profits from your confusion?
            </p>
          </div>
        </section>

        {/* ── MAIN CONTENT + SIDEBAR ── */}
        <section className="mb-20 grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)]">
          {/* Left: body copy */}
          <div className="space-y-6 text-[1.0625rem] font-light leading-8 text-muted-foreground">
            <p>
              Most people who end up here are already intelligent. That&apos;s the problem. Propaganda, conditioning,
              and managed narratives don&apos;t work best on the passive or uninformed. They work best on people who are
              fast at building explanations and skilled at defending identity. Smart people carry the most sophisticated
              versions of borrowed thinking.
            </p>
            <p>
              Originalform started as a question: how much of what people believe did they actually choose? Most
              assumptions about work, relationships, money, politics, and identity arrive before there are tools to
              examine them. This site is the ongoing attempt to examine them anyway.
            </p>
            <p>
              The work sits inside three recurring territories — conditioning and deprogramming, decision-making under
              noise, and frameworks for grounded living. They are not separate topics. They are the same problem looked
              at from different angles.
            </p>
            <p>
              The Deprogramming course is the most structured version: 42 lessons that move from how beliefs form, to
              how institutions sustain them, to how individuals can begin to think more independently — without falling
              into cynicism or isolation.
            </p>
            <p>
              Nothing here is finished. The frameworks get updated. The essays get corrected. If something is wrong, the
              work should improve. If something helped, that matters too.
            </p>

            {/* Free guide callout */}
            <div className="mt-8 rounded-sm border border-border bg-card p-6">
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/60">
                Free download
              </p>
              <p className="mb-1 text-[1.05rem] font-semibold text-foreground">
                5 Signs Your Thinking Has Been Managed
              </p>
              <p className="mb-4 text-[0.95rem] font-light leading-7 text-muted-foreground">
                A short guide that names the specific patterns — for founders and thinkers who already sense something
                is off but haven&apos;t put it into words yet.
              </p>
              <Button asChild variant="outline" size="sm" className="rounded-sm">
                <Link href="/free-guide">
                  Get the free guide <Download className="ml-2 h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right: sidebar */}
          <div className="border-t border-border/60 pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <div className="space-y-8">
              <div>
                <p className="mb-3 text-[11px] uppercase tracking-[0.16em] text-muted-foreground/60">Published by</p>
                <p className="text-[1.2rem] font-semibold tracking-[-0.02em] text-foreground">{defaultAuthor.name}</p>
                {defaultAuthor.jobTitle && (
                  <p className="mt-1 text-[1.0625rem] font-light leading-8 text-muted-foreground">
                    {defaultAuthor.jobTitle}
                  </p>
                )}
                <p className="mt-1 text-[0.9rem] font-light text-muted-foreground/60">
                  Los Angeles, CA · {defaultAuthor.email}
                </p>
              </div>

              <div>
                <p className="mb-3 text-[11px] uppercase tracking-[0.16em] text-muted-foreground/60">
                  What&apos;s here
                </p>
                <div className="space-y-2">
                  {[
                    { label: "Essays", href: "/articles" },
                    { label: "Deprogramming course", href: "/projects/deprogramming" },
                    { label: "Free guide", href: "/free-guide" },
                    { label: "Newsletter", href: "/newsletter" },
                  ].map((item) => (
                    <Link key={item.href} href={item.href} className="group flex items-center justify-between">
                      <span className="text-[1.0625rem] font-light leading-8 text-muted-foreground transition-colors group-hover:text-foreground">
                        {item.label}
                      </span>
                      <span className="text-muted-foreground/35 text-sm transition-colors group-hover:text-muted-foreground">
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 text-[11px] uppercase tracking-[0.16em] text-muted-foreground/60">Commitments</p>
                <div className="space-y-3 text-[1.0625rem] font-light leading-8 text-muted-foreground">
                  <p>No spin. What is known, uncertain, and still being tested stays visible.</p>
                  <p>Proof over promise. If something is recommended, the logic is shown.</p>
                  <p>Corrections welcome. If the work is wrong, it gets updated and credited.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── NEWSLETTER SECTION ── */}
        <section className="mb-16 border-t border-border pt-12">
          <div className="max-w-xl">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/60">
              Weekly newsletter
            </p>
            <h2 className="mb-2 text-2xl font-semibold tracking-[-0.03em] text-foreground" style={editorialSerif}>
              One idea. No noise.
            </h2>
            <p className="mb-6 text-[1.0rem] font-light leading-7 text-muted-foreground">
              One essay or framework per week — the kind of thinking that doesn&apos;t make it into feeds. Read by
              founders and independent thinkers. Unsubscribe any time.
            </p>
            <NewsletterSubscribe />
          </div>
        </section>

        {/* ── CTA STRIP ── */}
        <section className="flex flex-col gap-4 border-t border-border pt-10 sm:flex-row">
          <Button asChild className="rounded-sm px-6">
            <Link href="/projects/deprogramming">
              Start the course
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="rounded-sm border-border/80 px-6">
            <Link href="/contact">Get in touch</Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            className="rounded-sm px-0 text-muted-foreground hover:bg-transparent hover:text-foreground"
          >
            <Link href="/now">See current focus →</Link>
          </Button>
        </section>
      </div>
    </div>
  );
}
