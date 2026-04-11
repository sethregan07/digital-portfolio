import { Metadata } from "next";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowRight, Clock, FileText, Newspaper } from "lucide-react";

import { BASE_URL, defaultAuthor } from "@/lib/metadata";
import { ArticleListItem, getArticleCategoryCounts, getArticlesForListing } from "@/lib/services/content";
import NewsletterSubscribe from "@/components/newsletter-subscribe";

export const revalidate = 300;

const editorialSerif = {
  fontFamily: "var(--font-serif), Georgia, serif",
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

function EditorialArticleSplit({ lead, supporting }: { lead: ArticleListItem; supporting: ArticleListItem[] }) {
  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
      <article className="pr-2">
        <p className="mb-3 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{lead.section}</p>
        <Link href={lead.href} className="block">
          <h2
            className="text-[2.2rem] font-extrabold leading-[0.98] tracking-[-0.05em] text-foreground transition-opacity hover:opacity-75 md:text-[3rem]"
            style={editorialSerif}
          >
            {lead.title}
          </h2>
        </Link>
        {lead.description ? (
          <p className="mt-5 max-w-xl text-[1.02rem] leading-8 text-muted-foreground">{lead.description}</p>
        ) : null}
        <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {lead.readTimeMinutes} min read
          </span>
          {lead.publishedDate ? (
            <>
              <span className="h-1 w-1 rounded-full bg-muted-foreground/60" />
              <span>{format(lead.publishedDate, "LLLL d, yyyy")}</span>
            </>
          ) : null}
        </div>
        <Link
          href={lead.href}
          className="mt-5 inline-flex items-center gap-1.5 text-sm text-foreground transition-opacity hover:opacity-70"
        >
          Read essay <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </article>

      {supporting.length > 0 ? (
        <div className="flex flex-col divide-y divide-border/60 border-t border-border/60 pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
          {supporting.map((article) => (
            <article key={article.slug} className="py-6 first:pt-0 last:pb-0">
              <p className="mb-1.5 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{article.section}</p>
              <Link href={article.href} className="block">
                <h3 className="text-[1.15rem] font-semibold leading-[1.15] tracking-[-0.02em] text-foreground transition-opacity hover:opacity-75">
                  {article.title}
                </h3>
              </Link>
              {article.description ? (
                <p className="mt-3 line-clamp-2 text-sm leading-7 text-muted-foreground">{article.description}</p>
              ) : null}
              <div className="mt-2 flex items-center gap-2 text-[11px] text-muted-foreground">
                <span>{article.readTimeMinutes} min</span>
                {article.publishedDate ? (
                  <>
                    <span className="h-1 w-1 rounded-full bg-muted-foreground/60" />
                    <span>{format(article.publishedDate, "MMM d, yyyy")}</span>
                  </>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default async function Articles() {
  const articles = await getArticlesForListing();
  const categories = await getArticleCategoryCounts();
  const [leadArticle, ...archiveArticles] = articles;
  const articlesBySection = categories.map((category) => ({
    ...category,
    articles: articles.filter((article) => article.section === category.name),
  }));

  return (
    <div className="bg-background pb-16">
      <div className="container max-w-5xl pt-14">
        <section className="mb-16 border-b border-border pb-10 pt-6">
          <div className="max-w-3xl">
            <div className="mb-4 flex items-center gap-2">
              <FileText className="h-3.5 w-3.5 text-muted-foreground" />
              <p className="page-kicker">Articles</p>
            </div>
            <h1 className="page-title" style={editorialSerif}>
              Essays and field notes for clearer thinking.
            </h1>
            <p className="page-intro max-w-2xl">
              A growing editorial library on conditioning, institutions, media, power, and the habits of independent
              judgment.
            </p>

            {categories.length > 0 ? (
              <div className="mt-7 space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="mr-2 text-[10px] uppercase tracking-widest text-muted-foreground/40">
                    {articles.length} essays
                  </span>
                  <Link
                    href="/articles/series"
                    className="inline-flex items-center gap-1.5 rounded-sm border border-primary/30 bg-primary/5 px-3 py-1 text-[11px] tracking-wide text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                  >
                    Browse by series
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {categories.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/articles/category/${category.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-sm border border-border/60 px-3 py-1 text-[11px] tracking-wide text-muted-foreground transition-colors hover:border-border hover:text-foreground"
                    >
                      {category.name}
                      <span className="text-muted-foreground/40">{category.count}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </section>

        {leadArticle ? (
          <section className="mb-16">
            <div className="mb-8 flex items-baseline justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <Newspaper className="h-3.5 w-3.5 text-muted-foreground" />
                <p className="section-label">Latest Essay</p>
              </div>
            </div>

            <EditorialArticleSplit lead={leadArticle} supporting={archiveArticles.slice(0, 2)} />
          </section>
        ) : (
          <section className="mb-16">
            <p className="text-sm leading-7 text-muted-foreground">
              Add content in <code className="text-xs">content/posts/*.mdx</code>, then run the seed script to publish
              the archive.
            </p>
          </section>
        )}

        {articlesBySection.map((category) => {
          const sectionArticles = category.articles.filter((article) => article.slug !== leadArticle?.slug);
          const [sectionLead, ...restSectionArticles] = sectionArticles;

          if (!sectionLead) return null;

          return (
            <section key={category.slug} className="mb-20">
              <div className="mb-8 flex items-baseline justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2">
                  <Newspaper className="h-3.5 w-3.5 text-muted-foreground" />
                  <p className="section-label">{category.name}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground/40">
                    {category.count} essays
                  </span>
                  <Link
                    href={`/articles/category/${category.slug}`}
                    className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    More essays
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              <EditorialArticleSplit lead={sectionLead} supporting={restSectionArticles.slice(0, 2)} />
            </section>
          );
        })}

        <section className="border-t border-border pt-10">
          <NewsletterSubscribe
            provider="mailerlite"
            title="The letter — for people building on their own terms."
            description="One mechanism or framework per issue. The kind that changes how you read a news story, evaluate an opportunity, or make a decision. Roughly twice a month. No noise."
            buttonText="Join the letter"
          />
        </section>
      </div>
    </div>
  );
}
