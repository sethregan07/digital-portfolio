import { Metadata } from "next";
import { allPosts } from "contentlayer/generated";

import { defaultAuthor } from "@/lib/metadata";
import { sortByDate } from "@/lib/utils";
import PostPreview from "@/components/post-preview";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Articles",
    description: `Articles by ${defaultAuthor.name}`,
  };
}

export default function Articles() {
  const posts = allPosts.filter((post) => post.status === "published").sort(sortByDate);

  // Group posts by categories
  const categories = {
    "Society & Politics": posts.filter(post =>
      post.tags?.some(tag => ['society', 'politics', 'democracy', 'inequality', 'decentralisation'].includes(tag))
    ),
    "Economics & History": posts.filter(post =>
      post.tags?.some(tag => ['economics', 'history'].includes(tag))
    ),
    "Development": posts.filter(post =>
      post.tags?.some(tag => ['development', 'docs', 'starter'].includes(tag))
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
                  <PostPreview key={post._id} post={post} />
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