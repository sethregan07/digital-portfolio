import { MetadataRoute } from "next";

import { BASE_URL } from "@/lib/metadata";
import { getPublishedCourseArticles, getPublishedPages, getPublishedPosts } from "@/lib/repositories/content";
import { getArticleCategoryCounts, getTagCounts, isEditorialArticle, isPublicLegacyPost } from "@/lib/services/content";

export const revalidate = 300;

const previewLessonCount = 3;
const staticRouteEntries = [
  "/",
  "/about",
  "/articles",
  "/articles/series",
  "/archetypes",
  "/build",
  "/checklist",
  "/contact",
  "/exit",
  "/frameworks",
  "/free-guide",
  "/gifts",
  "/healing",
  "/letter",
  "/mini-course",
  "/north-star",
  "/projects",
  "/projects/deprogramming",
  "/quiz",
  "/resources",
  "/start-here",
  "/system",
  "/templates",
  "/tools",
  "/understand",
  "/uses",
  "/vocabulary",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const loadedPosts = await getPublishedPosts();
  const loadedPages = await getPublishedPages();
  const courseLessons = await getPublishedCourseArticles("deprogramming");
  const tagCounts = await getTagCounts();
  const articleCategories = await getArticleCategoryCounts();

  const editorialPosts = loadedPosts.filter(isEditorialArticle);
  const legacyPosts = loadedPosts.filter(isPublicLegacyPost);
  const tags = Object.keys(tagCounts)
    .sort((left, right) => left.localeCompare(right))
    .map((tag) => ({
      url: `${BASE_URL}/tags/${tag}`,
      lastModified: now,
    }));
  const posts = legacyPosts.map((post) => ({
    url: `${BASE_URL}/posts/${post.slug}`,
    lastModified: post.lastUpdatedDate || post.publishedDate || now,
  }));
  const articles = editorialPosts.map((post) => ({
    url: `${BASE_URL}/articles/${post.slug}`,
    lastModified: post.lastUpdatedDate || post.publishedDate || now,
  }));
  const previewLessons = courseLessons
    .filter((lesson) => lesson.lessonOrder <= previewLessonCount)
    .map((lesson) => ({
      url: `${BASE_URL}/projects/deprogramming/${lesson.slug}`,
      lastModified: now,
    }));
  const pages = loadedPages.map((page: { slug: string; lastUpdatedDate: Date | null }) => ({
    url: `${BASE_URL}/${page.slug}`,
    lastModified: page.lastUpdatedDate || now,
  }));

  return [
    ...staticRouteEntries.map((route) => ({
      url: `${BASE_URL}${route === "/" ? "" : route}`,
      lastModified: now,
    })),
    ...pages,
    ...articleCategories.map((category) => ({
      url: `${BASE_URL}/articles/category/${category.slug}`,
      lastModified: now,
    })),
    ...articles,
    ...previewLessons,
    ...(legacyPosts.length > 0
      ? [
          {
            url: `${BASE_URL}/posts`,
            lastModified: now,
          },
        ]
      : []),
    ...posts,
    ...(tags.length > 0
      ? [
          {
            url: `${BASE_URL}/tags`,
            lastModified: now,
          },
        ]
      : []),
    ...tags,
  ];
}
