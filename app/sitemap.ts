import { MetadataRoute } from "next";

import { tagOptions } from "@/lib/content-definitions/post";
import { BASE_URL } from "@/lib/metadata";
import { getPublishedPages, getPublishedPosts } from "@/lib/repositories/content";

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const loadedPosts = await getPublishedPosts();
  const loadedPages = await getPublishedPages();
  const tags = tagOptions.map((tag) => ({
    url: `${BASE_URL}/tags/${tag}`,
    lastModified: now,
  }));
  const posts = loadedPosts.map((post) => ({
    url: `${BASE_URL}/posts/${post.slug}`,
    lastModified: post.lastUpdatedDate || post.publishedDate || now,
  }));
  const pages = loadedPages.map((page) => ({
    url: `${BASE_URL}/${page.slug}`,
    lastModified: page.lastUpdatedDate || now,
  }));
  return [
    {
      url: BASE_URL,
      lastModified: now,
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: now,
    },
    {
      url: `${BASE_URL}/uses`,
      lastModified: now,
    },
    {
      url: `${BASE_URL}/social`,
      lastModified: now,
    },
    ...pages,
    {
      url: `${BASE_URL}/posts`,
      lastModified: now,
    },
    ...posts,
    {
      url: `${BASE_URL}/tags`,
      lastModified: now,
    },
    ...tags,
  ];
}
