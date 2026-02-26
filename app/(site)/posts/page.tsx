import { Metadata } from "next";

import { defaultAuthor } from "@/lib/metadata";
import { getPublishedPosts } from "@/lib/repositories/content";
import PostPreview from "@/components/post-preview";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Posts",
    description: `Posts by ${defaultAuthor.name}`,
  };
}

export default async function Blog() {
  const posts = await getPublishedPosts();

  return (
    <div className="container mb-4">
      <div className="prose mx-auto max-w-5xl dark:prose-invert prose-headings:font-heading prose-headings:font-bold prose-headings:leading-tight hover:prose-a:text-accent-foreground prose-a:prose-headings:no-underline">
        <h1 className="mt-0">Latest Posts</h1>
        <hr className="my-4" />
        <div className="grid grid-flow-row gap-2">
          {posts.map((post) => (
            <PostPreview
              post={{
                slug: post.slug,
                title: post.title,
                description: post.description,
                publishedDate: post.publishedDate.toISOString(),
                readTimeMinutes: post.readTimeMinutes,
                tags: post.tags,
              }}
              key={post.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
