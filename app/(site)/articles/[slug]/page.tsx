import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { remark } from "remark";
import remarkHtml from "remark-html";
import { format, isValid, parseISO } from "date-fns";

import { BASE_URL } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TableOfContents } from "@/components/table-of-contents";

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

type ArticleSource = "course" | "post";

type UnifiedArticle = {
  source: ArticleSource;
  slug: string;
  title: string;
  description: string | null;
  section: string;
  sectionOrder: number;
  lessonOrder: number;
  readTimeMinutes: number;
  publishedDate: Date | null;
  lastUpdatedDate: Date | null;
  headings: Array<{ heading?: number; text?: string; slug?: string }>;
  bodyCode: string | null;
  contentBlocks: any[] | null;
  resources: string[];
};

const fallbackSections = ["Society & Politics", "Economics & History", "Development", "General"];

function getFallbackSectionFromTags(tags: string[]): string {
  if (tags.some((tag) => ["society", "politics", "democracy", "inequality", "decentralisation"].includes(tag))) {
    return "Society & Politics";
  }
  if (tags.some((tag) => ["economics", "history"].includes(tag))) {
    return "Economics & History";
  }
  if (tags.some((tag) => ["development", "docs", "starter"].includes(tag))) {
    return "Development";
  }
  return "General";
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

async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(remarkHtml).process(markdown);
  return result.toString();
}

async function getArticleFromParams(params: ArticlePageProps["params"]) {
  const courseArticle = await prisma.course.findFirst({
    where: {
      slug: params.slug,
      course: "articles",
      status: "published",
    },
  });

  if (courseArticle) {
    return {
      source: "course",
      slug: courseArticle.slug,
      title: courseArticle.title,
      description: courseArticle.description,
      section: courseArticle.section,
      sectionOrder: courseArticle.sectionOrder,
      lessonOrder: courseArticle.lessonOrder,
      readTimeMinutes: courseArticle.estimatedReadTime || courseArticle.readTimeMinutes,
      publishedDate: null,
      lastUpdatedDate: null,
      headings: Array.isArray(courseArticle.headings)
        ? (courseArticle.headings as Array<{ heading?: number; text?: string; slug?: string }>)
        : [],
      bodyCode: courseArticle.bodyCode,
      contentBlocks: Array.isArray(courseArticle.contentBlocks) ? (courseArticle.contentBlocks as any[]) : null,
      resources: courseArticle.resources || [],
    } as UnifiedArticle;
  }

  const post = await prisma.post.findFirst({
    where: {
      slug: params.slug,
      status: "published",
    },
  });

  if (!post) {
    return null;
  }

  const section = getFallbackSectionFromTags(post.tags || []);
  const bodyCode = await markdownToHtml(post.body);

  return {
    source: "post",
    slug: post.slug,
    title: post.title,
    description: post.description,
    section,
    sectionOrder: Math.max(1, fallbackSections.indexOf(section) + 1),
    lessonOrder: 1,
    readTimeMinutes: post.readTimeMinutes,
    publishedDate: post.publishedDate,
    lastUpdatedDate: post.lastUpdatedDate,
    headings: Array.isArray(post.headings)
      ? (post.headings as Array<{ heading?: number; text?: string; slug?: string }>)
      : [],
    bodyCode,
    contentBlocks: null,
    resources: [],
  } as UnifiedArticle;
}

async function getAdjacentArticles(currentArticle: UnifiedArticle) {
  if (currentArticle.source === "course") {
    const allArticles = await prisma.course.findMany({
      where: {
        course: "articles",
        status: "published",
      },
      orderBy: [{ sectionOrder: "asc" }, { lessonOrder: "asc" }],
    });

    const currentIndex = allArticles.findIndex((article) => article.slug === currentArticle.slug);

    return {
      previous: currentIndex > 0 ? allArticles[currentIndex - 1] : null,
      next: currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null,
    };
  }

  const allPosts = await prisma.post.findMany({
    where: {
      status: "published",
    },
    orderBy: {
      publishedDate: "desc",
    },
    select: {
      slug: true,
      title: true,
    },
  });

  const currentIndex = allPosts.findIndex((post) => post.slug === currentArticle.slug);

  return {
    previous: currentIndex > 0 ? allPosts[currentIndex - 1] : null,
    next: currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null,
  };
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = await getArticleFromParams(params);

  if (!article) {
    return {};
  }

  return {
    title: article.title,
    description: article.description,
  };
}

export async function generateStaticParams(): Promise<ArticlePageProps["params"][]> {
  const articles = await prisma.course.findMany({
    where: {
      course: "articles",
      status: "published",
    },
    select: {
      slug: true,
    },
  });

  const posts = await prisma.post.findMany({
    where: {
      status: "published",
    },
    select: {
      slug: true,
    },
  });

  const slugSet = new Set([...articles.map((article) => article.slug), ...posts.map((post) => post.slug)]);
  return Array.from(slugSet).map((slug) => ({ slug }));
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticleFromParams(params);

  if (!article) {
    notFound();
  }

  const { previous, next } = await getAdjacentArticles(article);

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
