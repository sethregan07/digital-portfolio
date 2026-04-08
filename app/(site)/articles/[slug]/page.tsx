import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format, isValid, parseISO } from "date-fns";
import { ArrowLeft, ArrowRight, BookOpen, Clock, Eye, FileText, Home, Layers } from "lucide-react";

import { BASE_URL } from "@/lib/metadata";
import {
  getUnifiedArticleAdjacent,
  getUnifiedArticleBySlug,
  getUnifiedArticleStaticParams,
} from "@/lib/services/content";
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import NewsletterSubscribe from "@/components/newsletter-subscribe";
import { TableOfContents } from "@/components/table-of-contents";

export const revalidate = 300;

const editorialSerif = {
  fontFamily: "var(--font-serif), Georgia, serif",
};

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

function formatPostDate(dateValue?: Date | string | null): string | null {
  if (!dateValue) {
    return null;
  }

  const date = dateValue instanceof Date ? dateValue : parseISO(dateValue);
  if (!isValid(date)) {
    return null;
  }

  return format(date, "LLLL d, yyyy");
}

function LabelRow({ icon: Icon, label }: { icon: typeof FileText; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-3.5 w-3.5 text-muted-foreground" />
      <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">{label}</p>
    </div>
  );
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = await getUnifiedArticleBySlug(params.slug);

  if (!article) {
    return {};
  }

  const url = `${BASE_URL}/articles/${params.slug}`;
  const ogImage = `${BASE_URL}/opengraph-image`;
  const twitterImage = `${BASE_URL}/twitter-image`;

  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      url,
      title: article.title,
      description: article.description || undefined,
      images: [{ url: ogImage, width: 1200, height: 630, alt: article.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description || undefined,
      images: [twitterImage],
    },
  };
}

export async function generateStaticParams(): Promise<ArticlePageProps["params"][]> {
  return getUnifiedArticleStaticParams();
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getUnifiedArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const { previous, next } = await getUnifiedArticleAdjacent(article.source, article.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url: `${BASE_URL}/articles/${article.slug}`,
  };
  const publishedDate = formatPostDate(article.publishedDate);
  const lastUpdatedDate = formatPostDate(article.lastUpdatedDate);

  return (
    <div className="bg-background pb-16">
      <div className="container max-w-6xl pt-14">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol
            role="list"
            className="flex flex-wrap items-center gap-2 text-[12px] uppercase tracking-[0.1em] text-muted-foreground"
          >
            <li>
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
                aria-label="Go to Home"
              >
                <Home className="h-3.5 w-3.5" />
                <span>Home</span>
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/articles" className="transition-colors hover:text-foreground">
                Articles
              </Link>
            </li>
            <li>/</li>
            <li className="truncate text-foreground/80">{article.title}</li>
          </ol>
        </nav>

        <header className="mb-12 border-b border-border pb-8">
          <div className="mb-4 flex flex-wrap items-center gap-4 text-[12px] uppercase tracking-[0.12em] text-muted-foreground">
            <div className="inline-flex items-center gap-2">
              <Layers className="h-3.5 w-3.5" />
              <span>{article.section}</span>
            </div>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/60" />
            <span>{`Article ${article.sectionOrder}.${article.lessonOrder}`}</span>
          </div>
          <h1
            className="max-w-4xl text-[3rem] leading-[0.96] tracking-[-0.05em] text-foreground md:text-[4.2rem]"
            style={editorialSerif}
          >
            {article.title}
          </h1>
          {article.description ? (
            <p className="mt-5 max-w-3xl text-[1.05rem] leading-8 text-muted-foreground">{article.description}</p>
          ) : null}
          <div className="mt-6 flex flex-wrap items-center gap-4 text-[0.98rem] text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {article.readTimeMinutes} mins read
            </span>
            {publishedDate ? (
              <span className="inline-flex items-center gap-1.5">
                <Eye className="h-4 w-4" />
                Published: {publishedDate}
              </span>
            ) : null}
            {lastUpdatedDate ? (
              <span className="inline-flex items-center gap-1.5">
                <BookOpen className="h-4 w-4" />
                Updated: {lastUpdatedDate}
              </span>
            ) : null}
          </div>
        </header>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div>
            <div className="mb-6 lg:hidden">
              <Accordion type="single" collapsible>
                <AccordionItem value="table-of-contents">
                  <AccordionTrigger>Table of Contents</AccordionTrigger>
                  <AccordionContent>
                    <TableOfContents chapters={article.headings} />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <article
              className={cn(
                "prose max-w-none dark:prose-invert prose-p:leading-8 hover:prose-a:text-accent-foreground prose-li:leading-8",
                "prose-headings:font-heading prose-headings:font-bold prose-headings:tracking-[-0.03em] prose-headings:text-foreground",
                "[&_h1]:text-4xl [&_h1]:leading-tight [&_h2]:mt-12 [&_h2]:text-3xl [&_h2]:leading-tight",
                "[&_blockquote]:border-border/70 [&_blockquote]:text-foreground/80 [&_h3]:text-2xl [&_h3]:leading-snug",
                "[&_ol]:text-[16px] [&_p]:text-[16px] [&_p]:text-foreground/90 [&_ul]:text-[16px]"
              )}
            >
              {article.bodyCode ? (
                <div dangerouslySetInnerHTML={{ __html: article.bodyCode }} />
              ) : (
                article.contentBlocks?.map((block: any, index: number) => {
                  switch (block.type) {
                    case "heading":
                      const HeadingTag = `h${block.level}` as keyof JSX.IntrinsicElements;
                      return <HeadingTag key={index}>{block.content}</HeadingTag>;
                    case "paragraph":
                      return <p key={index}>{block.content}</p>;
                    case "list":
                      return (
                        <ul key={index} className="list-inside list-disc">
                          {block.items.map((item: string, itemIndex: number) => (
                            <li key={itemIndex}>{item}</li>
                          ))}
                        </ul>
                      );
                    default:
                      return null;
                  }
                })
              )}
            </article>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-8">
              <Button variant="outline" asChild className="rounded-sm border-border/80">
                <Link href="/articles">All Articles</Link>
              </Button>
              <div className="flex flex-wrap items-center gap-2">
                {previous ? (
                  <Button variant="outline" asChild className="rounded-sm border-border/80">
                    <Link href={`/articles/${previous.slug}`}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Previous
                    </Link>
                  </Button>
                ) : null}
                {next ? (
                  <Button asChild className="rounded-sm">
                    <Link href={`/articles/${next.slug}`}>
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                ) : null}
              </div>
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className={cn("sticky top-28 border border-border/70 bg-card/40 p-5")}>
              <div className="mb-4 border-b border-border/60 pb-4">
                <LabelRow icon={FileText} label="Table of Contents" />
              </div>
              <div className="grid gap-4">
                <TableOfContents chapters={article.headings} />
              </div>
              <div className="mt-6 border-t border-border/60 pt-4 text-sm leading-7 text-muted-foreground">
                <p>{`${article.readTimeMinutes} mins read`}</p>
                {publishedDate ? <p>Published: {publishedDate}</p> : null}
                {lastUpdatedDate ? <p>Updated: {lastUpdatedDate}</p> : null}
              </div>
            </div>
          </aside>
        </div>

        {article.resources && article.resources.length > 0 ? (
          <section className="mt-12 border-t border-border/70 pt-10">
            <div className="mb-7">
              <LabelRow icon={BookOpen} label="Resources" />
            </div>
            <div className="border border-border/70 bg-card/40 p-6">
              <ul className="space-y-3 text-sm leading-7 text-muted-foreground">
                {article.resources.map((resource, index) => (
                  <li key={index}>{resource}</li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        <section className="mt-12 border-t border-border/70 pt-10">
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
