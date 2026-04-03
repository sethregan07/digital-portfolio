import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { ArrowLeft, Clock, Layers } from "lucide-react";

import { BASE_URL } from "@/lib/metadata";
import {
  fallbackSections,
  getArticleCategoryCounts,
  getArticleCategoryNameFromSlug,
  getArticleCategorySlug,
  getArticlesByCategorySlug,
} from "@/lib/services/content";
import NewsletterSubscribe from "@/components/newsletter-subscribe";

export const revalidate = 300;

const editorialSerif = {
  fontFamily: '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, "Times New Roman", serif',
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const category = getArticleCategoryNameFromSlug(params.slug);

  if (!category) {
    return {};
  }

  const title = `${category} Articles`;
  const description = `Essays filed under ${category}.`;
  const url = `${BASE_URL}/articles/category/${params.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", url, title, description },
    twitter: { card: "summary_large_image", title, description },
  };
}

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  return fallbackSections.map((section) => ({ slug: getArticleCategorySlug(section) }));
}

export default async function ArticleCategoryPage({ params }: { params: { slug: string } }) {
  const categoryName = getArticleCategoryNameFromSlug(params.slug);
  const articles = await getArticlesByCategorySlug(params.slug);
  const categories = await getArticleCategoryCounts();

  if (!categoryName || articles.length === 0) {
    notFound();
  }

  return (
    <div className="bg-gradient-to-b from-background via-background to-muted/30 pb-16">
      <div className="container max-w-5xl pt-10">
        <section className="mb-16 border-b border-border/70 pb-10 pt-4">
          <Link
            href="/articles"
            className="mb-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Articles
          </Link>

          <div className="max-w-3xl">
            <div className="mb-4 flex items-center gap-2">
              <Layers className="h-3.5 w-3.5 text-muted-foreground" />
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">Category</p>
            </div>
            <h1
              className="text-4xl leading-tight tracking-[-0.03em] text-foreground md:text-5xl"
              style={editorialSerif}
            >
              {categoryName}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
              {articles.length} {articles.length === 1 ? "essay" : "essays"} collected under this category.
            </p>
          </div>
        </section>

        {categories.length > 1 ? (
          <section className="mb-16">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const active = category.slug === params.slug;
                return (
                  <Link
                    key={category.slug}
                    href={`/articles/category/${category.slug}`}
                    className={`rounded-sm border px-3 py-1 text-[11px] tracking-wide transition-colors ${
                      active
                        ? "border-foreground bg-foreground text-background"
                        : "border-border/60 text-muted-foreground hover:border-border hover:text-foreground"
                    }`}
                  >
                    {category.name} ({category.count})
                  </Link>
                );
              })}
            </div>
          </section>
        ) : null}

        <section className="mb-20">
          <div className="grid gap-x-10 gap-y-0 md:grid-cols-2">
            {articles.map((article, index) => (
              <article
                key={article.slug}
                className={`py-5 ${index < articles.length - 1 ? "border-b border-border/60" : ""}`}
              >
                <Link href={article.href} className="block">
                  <h2
                    className="text-2xl leading-[1.25] tracking-[-0.02em] text-foreground transition-opacity hover:opacity-75"
                    style={editorialSerif}
                  >
                    {article.title}
                  </h2>
                </Link>
                {article.description ? (
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{article.description}</p>
                ) : null}
                <div className="mt-3 flex items-center gap-3 text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {article.readTimeMinutes} min
                  </span>
                  {article.publishedDate ? (
                    <>
                      <span className="h-1 w-1 rounded-full bg-muted-foreground/60" />
                      <span>{format(article.publishedDate, "LLLL d, yyyy")}</span>
                    </>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-border/70 pt-10">
          <NewsletterSubscribe
            title="Get thoughtful notes on conditioning, clearer decisions, and grounded living"
            description="Occasional essays and practical frameworks on the three themes that shape the site: deprogramming, decision-making under noise, and living with more independence. Sent roughly 2x per month."
            buttonText="Subscribe"
          />
        </section>
      </div>
    </div>
  );
}
