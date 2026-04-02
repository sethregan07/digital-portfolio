import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { BASE_URL, defaultAuthor } from "@/lib/metadata";
import { Button } from "@/components/ui/button";

export async function generateMetadata(): Promise<Metadata> {
  const title = "About";
  const description = "What Originalform is, why it exists, and who is behind it.";
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
  fontFamily: '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, "Times New Roman", serif',
};

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-b from-background via-background to-muted/30 pb-16">
      <div className="container max-w-5xl pt-10">
        {/* ── HEADER ── */}
        <section className="mb-16 border-b border-border/70 pb-10 pt-4">
          <div className="max-w-2xl">
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">About</p>
            <h1
              className="text-4xl leading-tight tracking-[-0.03em] text-foreground md:text-5xl"
              style={editorialSerif}
            >
              A practical editorial space, not a personal brand brochure.
            </h1>
            <p className="mt-5 max-w-xl text-base font-light leading-8 text-muted-foreground">
              Everything here is meant to earn its place through usefulness. If it doesn't help you think more clearly,
              it shouldn't be here.
            </p>
          </div>
        </section>

        {/* ── TWO COLUMN — story + quick facts ── */}
        <section className="mb-20 grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)]">
          {/* Story */}
          <div className="space-y-6 text-base font-light leading-8 text-muted-foreground">
            <p>
              Originalform started as a question: how much of what I believe did I actually choose? Most of our
              assumptions about work, relationships, money, politics, and identity were installed before we had the
              tools to examine them. This site is the ongoing attempt to examine them anyway.
            </p>
            <p>
              The writing here sits inside three recurring territories — conditioning and deprogramming, decision-making
              under noise, and frameworks for grounded living. They're not separate topics. They're the same problem
              looked at from different angles.
            </p>
            <p>
              The Deprogramming course is the most structured version of this work: 42 lessons that move from how
              beliefs form, to how institutions sustain them, to how individuals can begin to think more independently
              without falling into cynicism or isolation.
            </p>
            <p>
              Nothing here is finished. The frameworks get updated. The essays get corrected. If something is wrong, I
              want to know. If something helped, I'd like to hear that too.
            </p>
          </div>

          {/* Quick facts sidebar */}
          <div className="border-t border-border/60 pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <div className="space-y-8">
              <div>
                <p className="mb-3 text-[10px] uppercase tracking-[0.14em] text-muted-foreground/50">Editor</p>
                <p className="text-lg font-semibold text-foreground" style={editorialSerif}>
                  {defaultAuthor.name}
                </p>
                {defaultAuthor.jobTitle && (
                  <p className="mt-1 text-sm font-light text-muted-foreground">{defaultAuthor.jobTitle}</p>
                )}
              </div>

              <div>
                <p className="mb-3 text-[10px] uppercase tracking-[0.14em] text-muted-foreground/50">What's here</p>
                <div className="space-y-2">
                  {[
                    { label: "Essays", href: "/articles" },
                    { label: "Frameworks", href: "/frameworks" },
                    { label: "Deprogramming course", href: "/projects/deprogramming" },
                    { label: "Resources shelf", href: "/resources" },
                  ].map((item) => (
                    <Link key={item.href} href={item.href} className="group flex items-center justify-between">
                      <span className="text-sm font-light text-muted-foreground transition-colors group-hover:text-foreground">
                        {item.label}
                      </span>
                      <span className="text-xs text-muted-foreground/30 transition-colors group-hover:text-muted-foreground">
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 text-[10px] uppercase tracking-[0.14em] text-muted-foreground/50">Commitments</p>
                <div className="space-y-2 text-sm font-light text-muted-foreground">
                  <p>No spin — I say what I know, what I don't, and what I'm still testing.</p>
                  <p>Proof over promise — if I recommend something, I show the logic.</p>
                  <p>Corrections welcome — if I'm wrong, I'll update and credit.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── BOTTOM CTAS ── */}
        <section className="flex flex-col gap-4 border-t border-border/70 pt-10 sm:flex-row">
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
            <Link href="/now">See what I'm working on →</Link>
          </Button>
        </section>
      </div>
    </div>
  );
}
