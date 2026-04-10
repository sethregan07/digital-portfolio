import { Metadata } from "next";

import { BASE_URL, defaultAuthor } from "@/lib/metadata";
import { getPublishedPosts } from "@/lib/repositories/content";
import { getCanonicalPostPath, isPublicLegacyPost } from "@/lib/services/content";
import PostPreview from "@/components/post-preview";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const title = "Posts";
  const description = `Archive of notes, docs, and legacy posts by ${defaultAuthor.name}.`;
  const url = `${BASE_URL}/posts`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      url,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function Blog() {
  const posts = (await getPublishedPosts()).filter(isPublicLegacyPost);

  return (
    <div className="container mb-4">
      <div className="prose mx-auto max-w-5xl dark:prose-invert prose-headings:font-heading prose-headings:font-bold prose-headings:leading-tight hover:prose-a:text-accent-foreground prose-a:prose-headings:no-underline">
        <h1 className="mt-0">Notes and Legacy Posts</h1>
        <hr className="my-4" />
        {posts.length > 0 ? (
          <div className="grid grid-flow-row gap-2">
            {posts.map((post) => (
              <PostPreview
                post={{
                  slug: post.slug,
                  title: post.title,
                  description: post.description,
                  publishedDate: post.publishedDate.toISOString(),
                  readTimeMinutes: post.readTimeMinutes,
                  href: getCanonicalPostPath(post),
                  tags: post.tags,
                }}
                key={post.id}
              />
            ))}
          </div>
        ) : (
          <p className="text-base text-muted-foreground">
            No legacy posts are currently published. Current long-form writing lives in the articles library.
          </p>
        )}
      </div>
    </div>
  );
}
