import { Metadata } from "next";
import Link from "next/link";
import { format } from "date-fns";

import { defaultAuthor } from "@/lib/metadata";
import { ArticleListItem, getArticlesForListing } from "@/lib/services/content";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Articles",
    description: `Articles by ${defaultAuthor.name}`,
  };
}

export default async function Articles() {
  const articles = await getArticlesForListing();

  const sections = articles.reduce((acc, article) => {
    const section = article.section;
    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push(article);
    return acc;
  }, {} as Record<string, ArticleListItem[]>);

  return (
    <div className="container mb-4">
      <div className="prose mx-auto max-w-5xl dark:prose-invert prose-headings:font-heading prose-headings:font-bold prose-headings:leading-tight hover:prose-a:text-accent-foreground prose-a:prose-headings:no-underline">
        <h1 className="mt-0">Articles</h1>
        <hr className="my-4" />

        {articles.length === 0 ? (
          <p className="text-muted-foreground">
            Publish posts or add content in `content/courses/articles/*.mdx`, then run your seed script.
          </p>
        ) : (
          Object.entries(sections)
            .sort(([, a], [, b]) => a[0].sectionOrder - b[0].sectionOrder)
            .map(([sectionName, sectionArticles]) => (
              <div key={sectionName} className="mb-12">
                <h2 className="mb-6 text-2xl font-bold">{sectionName}</h2>
                <div className="grid grid-flow-row gap-4 not-prose">
                  {sectionArticles.map((article) => (
                    <article key={article.slug} className="rounded-md border p-4">
                      <Link href={article.href} className="text-lg font-semibold hover:text-primary transition-colors">
                        {article.title}
                      </Link>
                      {article.description && (
                        <p className="mt-2 text-sm text-muted-foreground">{article.description}</p>
                      )}
                      <div className="mt-3 text-xs text-muted-foreground">
                        <span>{article.readTimeMinutes} min read</span>
                        {article.publishedDate && <span>{` • ${format(article.publishedDate, "LLLL d, yyyy")}`}</span>}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
}
