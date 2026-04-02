import { Metadata } from "next";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowRight, Clock, FileText, Newspaper } from "lucide-react";

import { BASE_URL, defaultAuthor } from "@/lib/metadata";
import { ArticleListItem, getArticlesForListing } from "@/lib/services/content";
import { Button } from "@/components/ui/button";

export const revalidate = 300;

const editorialSerif = {
  fontFamily: '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, "Times New Roman", serif',
};

export async function generateMetadata(): Promise<Metadata> {
  const title = "Articles";
  const description = `Clear, practical essays by ${defaultAuthor.name} to help you think better and decide with confidence.`;
  const url = `${BASE_URL}/articles`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", url, title, description },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function Articles() {
  const articles = await getArticlesForListing();

  const sections = articles.reduce(
    (acc: Record<string, ArticleListItem[]>, article: ArticleListItem) => {
      const section = article.section;
      if (!acc[section]) acc[section] = [];
      acc[section].push(article);
      return acc;
    },
    {} as Record<string, ArticleListItem[]>
  );

  return (
    <div className="bg-gradient-to-b from-background via-background to-muted/30 pb-16">
      <div className="container max-w-5xl pt-10">
        {/* ── PAGE HEADER ── */}
        <section className="mb-16 border-b border-border/70 pb-10 pt-4">
          <div className="max-w-3xl">
            <div className="mb-4 flex items-center gap-2">
              <FileText className="h-3.5 w-3.5 text-muted-foreground" />
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">Articles</p>
            </div>
            <h1
              className="text-4xl leading-tight tracking-[-0.03em] text-foreground md:text-5xl"
              style={editorialSerif}
            >
              Essays and field notes for clearer thinking.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
              The essays here sit inside three recurring territories: conditioning and deprogramming, decision-making
              under noise, and frameworks for grounded living. Each piece tries to make one important thing clearer.
            </p>

            {/* ── TERRITORY PILLS ── */}
            <div className="mt-7 flex flex-wrap gap-2">
              {["Conditioning & Deprogramming", "Decision-Making Under Noise", "Frameworks for Grounded Living"].map(
                (t) => (
                  <span
                    key={t}
                    className="rounded-sm border border-border/60 px-3 py-1 text-[11px] tracking-wide text-muted-foreground"
                  >
                    {t}
                  </span>
                )
              )}
            </div>
          </div>
        </section>

        {/* ── ARTICLE COUNT ── */}
        {articles.length > 0 && (
          <p className="mb-10 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            {articles.length} {articles.length === 1 ? "essay" : "essays"} in the library
          </p>
        )}

        {/* ── SECTIONS ── */}
        {articles.length === 0 ? (
          <p className="text-sm leading-7 text-muted-foreground">
            Add content in <code className="text-xs">content/courses/articles/*.mdx</code>, then run your seed script to
            publish.
          </p>
        ) : (
          Object.entries(sections)
            .sort(([, a], [, b]) => a[0].sectionOrder - b[0].sectionOrder)
            .map(([sectionName, sectionArticles]) => {
              const [leadArticle, ...restArticles] = sectionArticles;

              return (
                <section key={sectionName} className="mb-20">
                  {/* Section header — bolder, with article count */}
                  <div className="mb-8 flex items-baseline justify-between border-b border-border/70 pb-3">
                    <div className="flex items-center gap-2">
                      <Newspaper className="h-3.5 w-3.5 text-muted-foreground" />
                      <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{sectionName}</p>
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground/50">
                      {sectionArticles.length} {sectionArticles.length === 1 ? "essay" : "essays"}
                    </span>
                  </div>

                  {/* Only lead — full width */}
                  {leadArticle && restArticles.length === 0 ? (
                    <article className="max-w-2xl">
                      <p className="mb-3 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Lead Essay</p>
                      <Link href={leadArticle.href} className="block">
                        <h2
                          className="text-3xl leading-[1.18] tracking-[-0.03em] text-foreground transition-opacity hover:opacity-75 md:text-4xl"
                          style={editorialSerif}
                        >
                          {leadArticle.title}
                        </h2>
                      </Link>
                      {leadArticle.description && (
                        <p className="mt-4 text-base leading-8 text-muted-foreground">{leadArticle.description}</p>
                      )}
                      <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          {leadArticle.readTimeMinutes} min read
                        </span>
                        <span className="h-1 w-1 rounded-full bg-muted-foreground/60" />
                        <span>
                          {leadArticle.publishedDate ? format(leadArticle.publishedDate, "LLLL d, yyyy") : "Draft"}
                        </span>
                      </div>
                      <Button
                        asChild
                        variant="ghost"
                        className="mt-5 rounded-sm px-0 text-foreground hover:bg-transparent hover:text-foreground"
                      >
                        <Link href={leadArticle.href}>
                          Read essay
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </article>
                  ) : (
                    /* Lead + sidebar grid */
                    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
                      {/* Lead */}
                      {leadArticle && (
                        <article className="border-b border-border/60 pb-8 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-10">
                          <p className="mb-3 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                            Lead Essay
                          </p>
                          <Link href={leadArticle.href} className="block">
                            <h2
                              className="max-w-2xl text-3xl leading-[1.18] tracking-[-0.03em] text-foreground transition-opacity hover:opacity-75 md:text-4xl"
                              style={editorialSerif}
                            >
                              {leadArticle.title}
                            </h2>
                          </Link>
                          {leadArticle.description && (
                            <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground">
                              {leadArticle.description}
                            </p>
                          )}
                          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                            <span className="inline-flex items-center gap-1.5">
                              <Clock className="h-3.5 w-3.5" />
                              {leadArticle.readTimeMinutes} min read
                            </span>
                            <span className="h-1 w-1 rounded-full bg-muted-foreground/60" />
                            <span>
                              {leadArticle.publishedDate ? format(leadArticle.publishedDate, "LLLL d, yyyy") : "Draft"}
                            </span>
                          </div>
                          <Button
                            asChild
                            variant="ghost"
                            className="mt-6 rounded-sm px-0 text-foreground hover:bg-transparent hover:text-foreground"
                          >
                            <Link href={leadArticle.href}>
                              Read essay
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </article>
                      )}

                      {/* Sidebar — rest or coming-soon */}
                      <div className="flex flex-col">
                        {restArticles.length > 0 ? (
                          restArticles.map((article, index) => (
                            <article
                              key={article.slug}
                              className={`py-5 ${index < restArticles.length - 1 ? "border-b border-border/60" : ""} ${
                                index === 0 ? "pt-0" : ""
                              }`}
                            >
                              <p className="mb-2 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                                Essay
                              </p>
                              <Link href={article.href} className="block">
                                <h3
                                  className="text-lg leading-[1.35] tracking-[-0.01em] text-foreground transition-opacity hover:opacity-75"
                                  style={editorialSerif}
                                >
                                  {article.title}
                                </h3>
                              </Link>
                              {article.description && (
                                <p className="mt-2 line-clamp-2 text-sm leading-7 text-muted-foreground">
                                  {article.description}
                                </p>
                              )}
                              <div className="mt-3 flex items-center gap-3 text-[11px] text-muted-foreground">
                                <span>{article.readTimeMinutes} min</span>
                                <span className="h-1 w-1 rounded-full bg-muted-foreground/60" />
                                <span>
                                  {article.publishedDate ? format(article.publishedDate, "LLLL d, yyyy") : "Draft"}
                                </span>
                              </div>
                            </article>
                          ))
                        ) : (
                          /* Clean coming-soon state instead of orphaned text */
                          <div className="flex h-full items-center justify-center rounded-sm border border-dashed border-border/50 px-6 py-10 text-center">
                            <div>
                              <p className="mb-2 text-[11px] uppercase tracking-[0.14em] text-muted-foreground/50">
                                More essays
                              </p>
                              <p className="text-sm font-light text-muted-foreground/40">
                                Coming soon to this section.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </section>
              );
            })
        )}
      </div>
    </div>
  );
}
