import { Metadata } from "next";
import { notFound } from "next/navigation";

import { BASE_URL } from "@/lib/metadata";
import { getCanonicalPostPath, getPostsByTag } from "@/lib/services/content";
import PostPreview from "@/components/post-preview";

export const revalidate = 300;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const posts = await getPostsByTag(params.slug);

  if (posts.length === 0) {
    return {};
  }

  const title = `Tagged: ${params.slug}`;
  const description = `${posts.length} ${posts.length === 1 ? "post" : "posts"} tagged ${params.slug}.`;
  const url = `${BASE_URL}/tags/${params.slug}`;

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

export default async function TagPage({ params }: { params: { slug: string } }) {
  const tag = params.slug;
  const posts = await getPostsByTag(tag);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="container mb-4">
      <div className="prose mx-auto max-w-5xl dark:prose-invert prose-headings:font-heading prose-headings:font-bold prose-headings:leading-tight hover:prose-a:text-accent-foreground prose-a:prose-headings:no-underline">
        <h1 className="mt-0">All posts in {tag}</h1>
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
                href: getCanonicalPostPath(post),
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
