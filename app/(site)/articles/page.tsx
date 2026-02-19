import { Metadata } from "next";
import { prisma } from "@/lib/db";

import { defaultAuthor } from "@/lib/metadata";
import PostPreview from "@/components/post-preview";

// Transform database post to match PostPreview expectations
function transformPostForPreview(dbPost: any) {
  return {
    slug: dbPost.slug,
    title: dbPost.title,
    publishedDate: dbPost.publishedDate.toISOString(),
    readTimeMinutes: dbPost.readTimeMinutes,
    tags: dbPost.tags,
    description: dbPost.description,
  };
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Articles",
    description: `Articles by ${defaultAuthor.name}`,
  };
}

export default async function Articles() {
  const posts = await prisma.post.findMany({
    where: {
      status: "published",
    },
    orderBy: {
      publishedDate: 'desc',
    },
  });

  // Transform posts for PostPreview component
  const transformedPosts = posts.map(transformPostForPreview);

  // Group posts by categories
  const categories = {
    "Society & Politics": transformedPosts.filter(post =>
      post.tags?.some((tag: string) => ['society', 'politics', 'democracy', 'inequality', 'decentralisation'].includes(tag))
    ),
    "Economics & History": transformedPosts.filter(post =>
      post.tags?.some((tag: string) => ['economics', 'history'].includes(tag))
    ),
    "Development": transformedPosts.filter(post =>
      post.tags?.some((tag: string) => ['development', 'docs', 'starter'].includes(tag))
    ),
  };

  return (
    <div className="container mb-4">
      <div className="prose mx-auto max-w-5xl dark:prose-invert prose-headings:font-heading prose-headings:font-bold prose-headings:leading-tight hover:prose-a:text-accent-foreground prose-a:prose-headings:no-underline">
        <h1 className="mt-0">Articles</h1>
        <hr className="my-4" />

        {Object.entries(categories).map(([category, categoryPosts]) => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{category}</h2>
            {categoryPosts.length > 0 ? (
              <div className="grid grid-flow-row gap-2">
                {categoryPosts.map((post) => (
                  <PostPreview key={post.slug} post={post as any} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No articles in this category yet.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
