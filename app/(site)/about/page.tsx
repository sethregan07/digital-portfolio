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
  fontFamily: "var(--font-serif), Georgia, serif",
};

export default function AboutPage() {
  return (
    <div className="bg-background pb-16">
      <div className="container max-w-5xl pt-14">
        <section className="mb-16 border-b border-border pb-10 pt-6">
          <div className="max-w-2xl">
            <p className="page-kicker mb-4">About</p>
            <h1 className="page-title" style={editorialSerif}>
              A practical editorial space, not a personal brand brochure.
            </h1>
            <p className="page-intro max-w-xl font-light">
              Everything here is meant to earn its place through usefulness. If it doesn&apos;t help readers think more
              clearly, it shouldn&apos;t be here.
            </p>
          </div>
        </section>

        <section className="mb-20 grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)]">
          <div className="space-y-6 text-[1.0625rem] font-light leading-8 text-muted-foreground">
            <p>
              Originalform started as a question: how much of what people believe did they actually choose? Most
              assumptions about work, relationships, money, politics, and identity arrive before there are tools to
              examine them. This site is the ongoing attempt to examine them anyway.
            </p>
            <p>
              The writing here sits inside three recurring territories: conditioning and deprogramming, decision-making
              under noise, and frameworks for grounded living. They are not separate topics. They are the same problem
              looked at from different angles.
            </p>
            <p>
              The Deprogramming course is the most structured version of this work: 42 lessons that move from how
              beliefs form, to how institutions sustain them, to how individuals can begin to think more independently
              without falling into cynicism or isolation.
            </p>
            <p>
              Nothing here is finished. The frameworks get updated. The essays get corrected. If something is wrong, the
              work should improve. If something helped, that matters too.
            </p>
          </div>

          <div className="border-t border-border/60 pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <div className="space-y-8">
              <div>
                <p className="mb-3 text-[11px] uppercase tracking-[0.16em] text-muted-foreground/60">Editor</p>
                <p className="text-[1.2rem] font-semibold tracking-[-0.02em] text-foreground">{defaultAuthor.name}</p>
                {defaultAuthor.jobTitle && (
                  <p className="mt-1 text-[1.0625rem] font-light leading-8 text-muted-foreground">
                    {defaultAuthor.jobTitle}
                  </p>
                )}
              </div>

              <div>
                <p className="mb-3 text-[11px] uppercase tracking-[0.16em] text-muted-foreground/60">
                  What&apos;s here
                </p>
                <div className="space-y-2">
                  {[
                    { label: "Essays", href: "/articles" },
                    { label: "Frameworks", href: "/frameworks" },
                    { label: "Deprogramming course", href: "/projects/deprogramming" },
                    { label: "Resources shelf", href: "/resources" },
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
                  <p>No spin. What is known, what is uncertain, and what is still being tested should stay visible.</p>
                  <p>Proof over promise. If something is recommended, the logic should be shown.</p>
                  <p>Corrections welcome. If the work is wrong, it should be updated and credited.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

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
