import RSS from "rss";

import siteMetadata, { BASE_URL, defaultAuthor } from "@/lib/metadata";
import { getPublishedPosts } from "@/lib/repositories/content";

export const revalidate = 300;

export async function GET(request: Request) {
  const posts = await getPublishedPosts();
  const feed = new RSS({
    title: siteMetadata.title.default,
    description: siteMetadata.description,
    site_url: BASE_URL,
    feed_url: `${BASE_URL}/feed.xml`,
    copyright: `© 2023 ${defaultAuthor.name}`,
    language: "en-US",
    pubDate: new Date(),
  });

  posts.map((post) => {
      feed.item({
        title: post.title,
        guid: `${BASE_URL}/posts/${post.slug}`,
        url: `${BASE_URL}/posts/${post.slug}`,
        date: post.lastUpdatedDate || post.publishedDate,
        description: post.description || "",
        author: defaultAuthor.name,
        categories: post?.tags?.map((tag) => tag) || [],
      });
    });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
    },
  });
}
