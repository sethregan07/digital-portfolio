import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { BASE_URL } from "@/lib/metadata";
import { getArticlesForListing } from "@/lib/services/content";

export const revalidate = 300;

const editorialSerif = { fontFamily: "var(--font-serif), Georgia, serif" };

export const metadata: Metadata = {
  title: "Reading Series — Articles",
  description:
    "The Originalform articles organised into four reading series — each one mapping to a stage of the system. Start anywhere, follow the thread.",
  alternates: { canonical: `${BASE_URL}/articles/series` },
};

const seriesDefinitions = [
  {
    title: "The Conditioning Layer",
    stage: "Stage 01 — Clear",
    description:
      "How beliefs get installed before you examine them. Propaganda, language, attention capture, media, and the mechanisms that make borrowed thinking feel like your own.",
    stageHref: "/projects/deprogramming",
    color: "border-border/60",
  },
  {
    title: "The System Explained",
    stage: "Stage 02 — Understand",
    description:
      "How the economic and political structures you operate inside actually work — debt, money creation, institutional incentives, democracy, and why the system maintains itself so effectively.",
    stageHref: "/understand",
    color: "border-border/60",
  },
  {
    title: "Finding What's Yours",
    stage: "Stages 04–05 — Heal & Discover",
    description:
      "What comes after the conditioning is seen. Healing patterns stored in the body, finding what is genuinely yours underneath the inherited script, and rebuilding trust in your own judgment.",
    stageHref: "/archetypes",
    color: "border-border/60",
  },
  {
    title: "Building and What's Next",
    stage: "Stages 06–08 — Build & Vision",
    description:
      "Building independently — in work, money, and life. Technology, AI, future systems, and what it looks like to construct something real from your own operating system rather than someone else's defaults.",
    stageHref: "/build",
    color: "border-border/60",
  },
];

export default async function SeriesIndexPage() {
  const articles = await getArticlesForListing();

  // Group articles by series title
  const seriesMap: Record<string, typeof articles> = {};
  for (const article of articles) {
    const seriesTitle = (article as any).series?.title;
    if (seriesTitle) {
      if (!seriesMap[seriesTitle]) seriesMap[seriesTitle] = [];
      seriesMap[seriesTitle].push(article);
    }
  }

  return (
    <div className="bg-background pb-24">
      <div className="container max-w-4xl pt-14">
        {/* Header */}
        <section className="mb-16 border-b border-border pb-10 pt-6">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Reading Series
          </p>
          <h1
            className="text-[2.8rem] leading-[1.02] tracking-[-0.04em] text-foreground md:text-[4rem]"
            style={editorialSerif}
          >
            Four series. One system.
          </h1>
          <p className="mt-5 max-w-xl text-[1.1rem] leading-[1.7] text-muted-foreground">
            The articles on this site are organised into four reading series — each one corresponding to a stage of the
            Originalform system. You can read any article standalone, or follow a series from start to finish.
          </p>
          <div className="mt-6 flex gap-3">
            <Link
              href="/articles"
              className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
            >
              All articles <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <span className="text-muted-foreground/30">·</span>
            <Link
              href="/system"
              className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
            >
              The full system <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>

        {/* Series */}
        <section className="space-y-16">
          {seriesDefinitions.map((def) => {
            const seriesArticles = (seriesMap[def.title] || []).sort(
              (a: any, b: any) => (a.series?.order ?? 0) - (b.series?.order ?? 0)
            );

            return (
              <div key={def.title} className={`border-l-2 ${def.color} pl-7`}>
                {/* Series header */}
                <div className="mb-6">
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/50">
                    {def.stage}
                  </p>
                  <h2
                    className="mb-3 text-[1.6rem] font-semibold tracking-[-0.03em] text-foreground"
                    style={editorialSerif}
                  >
                    {def.title}
                  </h2>
                  <p className="mb-4 max-w-xl text-[0.93rem] leading-[1.7] text-muted-foreground">{def.description}</p>
                  <Link
                    href={def.stageHref}
                    className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] text-muted-foreground/50 transition-colors hover:text-muted-foreground"
                  >
                    Go to this stage <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>

                {/* Articles in series */}
                {seriesArticles.length > 0 ? (
                  <div className="divide-y divide-border/50">
                    {seriesArticles.map((article: any, idx: number) => (
                      <div key={article.slug} className="flex gap-5 py-4">
                        <span className="w-6 shrink-0 pt-0.5 text-[11px] font-semibold text-muted-foreground/30">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <div className="flex-1">
                          <Link
                            href={article.href}
                            className="block text-[1rem] font-medium leading-[1.35] tracking-[-0.01em] text-foreground transition-opacity hover:opacity-70"
                          >
                            {article.title}
                          </Link>
                          {article.description && (
                            <p className="mt-1 line-clamp-1 text-[0.85rem] text-muted-foreground">
                              {article.description}
                            </p>
                          )}
                        </div>
                        <div className="shrink-0 pt-0.5 text-[11px] text-muted-foreground/40">
                          {article.readTimeMinutes}m
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[0.88rem] text-muted-foreground/40">Articles loading…</p>
                )}

                {/* Start reading CTA */}
                {seriesArticles[0] && (
                  <div className="mt-5">
                    <Link
                      href={seriesArticles[0].href}
                      className="inline-flex items-center gap-2 rounded-sm border border-border/50 px-4 py-2 text-[11px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:border-border hover:text-foreground"
                    >
                      Start series <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </section>

        {/* Bottom nav */}
        <section className="mt-20 border-t border-border pt-10">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Not sure where to start?
          </p>
          <p className="mb-5 text-[0.95rem] leading-[1.7] text-muted-foreground">
            The quiz places you in the system and gives you a personalised starting point — including which series is
            most relevant to where you are now.
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 rounded-sm border border-border/60 px-5 py-2.5 text-[11px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:border-border hover:text-foreground"
          >
            Take the quiz <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </section>
      </div>
    </div>
  );
}
