import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { format, isValid, parseISO } from "date-fns";

import { BASE_URL } from "@/lib/metadata";
import {
  getUnifiedArticleAdjacent,
  getUnifiedArticleBySlug,
  getUnifiedArticleStaticParams,
  type UnifiedArticle,
} from "@/lib/services/content";
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TableOfContents } from "@/components/table-of-contents";

export const revalidate = 300;

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

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = await getUnifiedArticleBySlug(params.slug);

  if (!article) {
    return {};
  }

  return {
    title: article.title,
    description: article.description,
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
    <div className="container max-w-7xl pb-10">
      <nav aria-label="Breadcrumb">
        <ol role="list" className="flex items-center gap-1 text-sm text-muted-foreground">
          <li>
            <Link href="/" className="block transition hover:text-muted-foreground/70" aria-label="Go to Home">
              <span className="sr-only"> Home </span>
              <Home size={14} />
            </Link>
          </li>
          <li className="rtl:rotate-180">/</li>
          <li>
            <Link href="/articles" className="block transition hover:text-muted-foreground/70">
              Articles
            </Link>
          </li>
          <li className="rtl:rotate-180">/</li>
          <li>
            <Link href="#" className="block transition hover:text-muted-foreground/70">
              {article.title}
            </Link>
          </li>
        </ol>
      </nav>

      <header className="mt-5 border-b pb-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge variant="outline">{article.section}</Badge>
          <Badge variant="secondary">Article {article.sectionOrder}.{article.lessonOrder}</Badge>
        </div>
        <h1 className="mb-3 font-heading text-4xl leading-tight">{article.title}</h1>
        {article.description && <p className="max-w-3xl text-lg text-muted-foreground">{article.description}</p>}
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span>{`${article.readTimeMinutes} mins read`}</span>
          {publishedDate && <time>Published: {publishedDate}</time>}
          {lastUpdatedDate && <time>Updated: {lastUpdatedDate}</time>}
        </div>
      </header>

      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div>
          <div className="mb-4 lg:hidden">
            <Accordion type="single" collapsible>
              <AccordionItem value="table-of-contents">
                <AccordionTrigger>Table of Contents</AccordionTrigger>
                <AccordionContent>
                  <TableOfContents chapters={article.headings} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <article className="prose max-w-none dark:prose-invert hover:prose-a:text-accent-foreground prose-a:prose-headings:mb-3 prose-a:prose-headings:mt-8 prose-a:prose-headings:font-heading prose-a:prose-headings:font-bold prose-a:prose-headings:leading-tight prose-a:prose-headings:no-underline">
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

          <Separator className="my-6" />

          <div className="flex flex-wrap items-center justify-between gap-3">
            <Button variant="outline" asChild>
              <Link href="/articles">All Articles</Link>
            </Button>
            <div className="flex flex-wrap items-center gap-2">
              {previous && (
                <Button variant="outline" asChild>
                  <Link href={`/articles/${previous.slug}`}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous: {previous.title}
                  </Link>
                </Button>
              )}
              {next && (
                <Button asChild>
                  <Link href={`/articles/${next.slug}`}>
                    Next: {next.title}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>

        <aside className="hidden lg:block">
          <Card className={cn("sticky top-28 mb-4")}>
            <CardHeader>
              <CardTitle>Table of Contents</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <TableOfContents chapters={article.headings} />
            </CardContent>
            <Separator />
            <CardFooter>
              <div className="mb-4 mt-1 text-sm leading-snug text-muted-foreground">
                <p className="mb-2">{`${article.readTimeMinutes} mins read`}</p>
                {publishedDate && <time>Published: {publishedDate} </time>}
                {publishedDate && lastUpdatedDate && <br />}
                {lastUpdatedDate && <time>Updated: {lastUpdatedDate}</time>}
              </div>
            </CardFooter>
          </Card>
        </aside>
      </div>

      {article.resources && article.resources.length > 0 && (
        <>
          <Separator className="my-8" />
          <Card>
            <CardHeader>
              <CardTitle>Resources</CardTitle>
              <CardDescription>Further reading and references</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {article.resources.map((resource, index) => (
                  <li key={index} className="text-sm">
                    {resource}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </>
      )}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
