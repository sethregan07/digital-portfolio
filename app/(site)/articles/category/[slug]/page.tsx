import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { ArrowLeft, Clock, Layers } from "lucide-react";

import { BASE_URL } from "@/lib/metadata";
import {
  articleCategories,
  getArticleCategoryBySlug,
  getArticleCategoryCounts,
  getArticlesByCategorySlug,
} from "@/lib/services/content";
import NewsletterSubscribe from "@/components/newsletter-subscribe";

export const revalidate = 300;

const editorialSerif = {
  fontFamily: "var(--font-serif), Georgia, serif",
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const category = getArticleCategoryBySlug(params.slug);

  if (!category) {
    return {};
  }

  const title = `${category.name} Articles`;
  const description = category.description;
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
  return articleCategories.map((category) => ({ slug: category.slug }));
}

export default async function ArticleCategoryPage({ params }: { params: { slug: string } }) {
  const category = getArticleCategoryBySlug(params.slug);
  const articles = await getArticlesByCategorySlug(params.slug);
  const categories = await getArticleCategoryCounts();

  if (!category || articles.length === 0) {
    notFound();
  }

  return (
    <div className="bg-background pb-16">
      <div className="container max-w-5xl pt-14">
        <section className="mb-16 border-b border-border pb-10 pt-6">
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
              <p className="page-kicker">Category</p>
            </div>
            <h1 className="page-title" style={editorialSerif}>
              {category.name}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
              {category.description} This category currently includes {articles.length}{" "}
              {articles.length === 1 ? "essay." : "essays."}
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
                    className={`rounded-sm border px-3 py-1 font-sans text-[11px] tracking-wide transition-colors ${
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
                  <h2 className="card-title leading-[1.12] transition-opacity hover:opacity-75">{article.title}</h2>
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
