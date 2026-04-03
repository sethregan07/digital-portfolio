import { cache } from "react";
import { PostHeading, PostSeries, SeriesItem } from "@/types";
import { remark } from "remark";
import remarkHtml from "remark-html";

import {
  DbPageDetail,
  DbPostPreview,
  getPublishedCourseLessonBySlug,
  getPublishedCourseLessons,
  getPublishedCourseLessonSlugs,
  getPublishedPageBySlug,
  getPublishedPages,
  getPublishedPostBySlug,
  getPublishedPosts,
  getPublishedPostsBySeriesId,
  getPublishedPostSlugs,
} from "@/lib/repositories/content";

export type ContentTagCount = Record<string, number>;
export type ArticleSource = "course" | "post";

export type ArticleListItem = {
  slug: string;
  title: string;
  description: string | null;
  readTimeMinutes: number;
  publishedDate?: Date;
  section: string;
  sectionOrder: number;
  lessonOrder: number;
  href: string;
};

export type UnifiedArticle = {
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
  headings: PostHeading[];
  bodyCode: string | null;
  contentBlocks: any[] | null;
  resources: string[];
};

export const fallbackSections = [
  "Media & Narrative",
  "Power & Institutions",
  "Political Economy",
  "Culture & Conditioning",
] as const;
export const articleCategorySlugs: Record<(typeof fallbackSections)[number], string> = {
  "Media & Narrative": "media-narrative",
  "Power & Institutions": "power-institutions",
  "Political Economy": "political-economy",
  "Culture & Conditioning": "culture-conditioning",
};

export function getArticleCategorySlug(section: string): string {
  return articleCategorySlugs[section as keyof typeof articleCategorySlugs] ?? "general";
}

export function getArticleCategoryNameFromSlug(slug: string): string | null {
  const match = Object.entries(articleCategorySlugs).find(([, value]) => value === slug);
  return match?.[0] ?? null;
}

export function getFallbackSectionFromTags(tags: string[]): string {
  if (tags.some((tag) => ["media", "propaganda", "language", "narrative"].includes(tag))) {
    return "Media & Narrative";
  }
  if (tags.some((tag) => ["economics", "history"].includes(tag))) {
    return "Political Economy";
  }
  if (tags.some((tag) => ["politics", "democracy", "education", "decentralisation"].includes(tag))) {
    return "Power & Institutions";
  }
  if (tags.some((tag) => ["identity", "development", "society"].includes(tag))) {
    return "Culture & Conditioning";
  }
  return "Power & Institutions";
}

function isEditorialArticle(post: DbPostPreview): boolean {
  const tags = post.tags || [];
  return !tags.includes("docs") && !tags.includes("starter");
}

export async function getRecentPosts(limit = 3): Promise<DbPostPreview[]> {
  const posts = await getPublishedPosts();
  return posts.slice(0, limit);
}

export async function getPostsByTag(tag: string): Promise<DbPostPreview[]> {
  const posts = await getPublishedPosts();
  return posts
    .filter((post) => post.tags?.includes(tag))
    .sort((a, b) => b.publishedDate.getTime() - a.publishedDate.getTime());
}

export async function getTagCounts(): Promise<ContentTagCount> {
  const posts = await getPublishedPosts();
  return posts.reduce((acc: ContentTagCount, post) => {
    for (const tag of post.tags || []) {
      acc[tag] = (acc[tag] || 0) + 1;
    }
    return acc;
  }, {});
}

export async function getArticlesForListing(): Promise<ArticleListItem[]> {
  const posts = (await getPublishedPosts()).filter(isEditorialArticle);
  const sectionCounters: Record<string, number> = {};

  return posts.map((post) => {
    const section = getFallbackSectionFromTags(post.tags || []);
    sectionCounters[section] = (sectionCounters[section] || 0) + 1;
    return {
      slug: post.slug,
      title: post.title,
      description: post.description,
      readTimeMinutes: post.readTimeMinutes,
      publishedDate: post.publishedDate,
      section,
      sectionOrder: Math.max(1, fallbackSections.indexOf(section as (typeof fallbackSections)[number]) + 1),
      lessonOrder: sectionCounters[section],
      href: `/articles/${post.slug}`,
    };
  });
}

export async function getArticleCategoryCounts(): Promise<Array<{ name: string; slug: string; count: number }>> {
  const articles = await getArticlesForListing();
  const counts = new Map<string, number>();

  for (const article of articles) {
    counts.set(article.section, (counts.get(article.section) ?? 0) + 1);
  }

  return fallbackSections
    .map((section) => ({
      name: section,
      slug: getArticleCategorySlug(section),
      count: counts.get(section) ?? 0,
    }))
    .filter((item) => item.count > 0);
}

export async function getArticlesByCategorySlug(slug: string): Promise<ArticleListItem[]> {
  const category = getArticleCategoryNameFromSlug(slug);
  if (!category) return [];

  const articles = await getArticlesForListing();
  return articles.filter((article) => article.section === category);
}

async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(remarkHtml).process(markdown);
  return result.toString();
}

export const getPostDetailBySlug = cache(async (slug: string): Promise<any | null> => {
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    return null;
  }

  if (post.seriesId && post.series) {
    const seriesPosts = await getPublishedPostsBySeriesId(post.seriesId);

    const seriesItems: SeriesItem[] = seriesPosts.map((p) => ({
      title: p.title,
      slug: p.slug,
      status: p.status,
      isCurrent: p.slug === slug,
    }));

    if (seriesItems.length > 0) {
      return {
        ...post,
        series: {
          ...post.series,
          posts: seriesItems,
        } as unknown as PostSeries,
      };
    }
  }

  return post;
});

export const getPostStaticParams = cache(async (): Promise<{ slug: string }[]> => {
  const slugs = await getPublishedPostSlugs();
  return slugs.map((slug) => ({ slug }));
});

export const getUnifiedArticleBySlug = cache(async (slug: string): Promise<UnifiedArticle | null> => {
  const post = await getPublishedPostBySlug(slug);
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
    sectionOrder: Math.max(1, fallbackSections.indexOf(section as (typeof fallbackSections)[number]) + 1),
    lessonOrder: 1,
    readTimeMinutes: post.readTimeMinutes,
    publishedDate: post.publishedDate,
    lastUpdatedDate: post.lastUpdatedDate,
    headings: Array.isArray(post.headings)
      ? (post.headings as Array<any>).filter(
          (h) => typeof h?.heading === "number" && typeof h?.text === "string" && typeof h?.slug === "string"
        )
      : [],
    bodyCode,
    contentBlocks: null,
    resources: [],
  };
});

export const getUnifiedArticleAdjacent = cache(async (source: ArticleSource, slug: string) => {
  const allPosts = (await getPublishedPosts()).filter(isEditorialArticle);
  const currentIndex = allPosts.findIndex((post) => post.slug === slug);
  return {
    previous: currentIndex > 0 ? allPosts[currentIndex - 1] : null,
    next: currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null,
  };
});

export const getUnifiedArticleStaticParams = cache(async (): Promise<{ slug: string }[]> => {
  const postSlugs = (await getPublishedPosts()).filter(isEditorialArticle).map((post) => post.slug);
  const unique = new Set(postSlugs);
  return Array.from(unique).map((slug) => ({ slug }));
});

export const getDeprogrammingLessonBySlug = cache(async (slug: string) => {
  const lesson = await getPublishedCourseLessonBySlug("deprogramming", slug);
  if (!lesson) {
    return null;
  }

  return {
    ...lesson,
    contentBlocks: Array.isArray(lesson.contentBlocks) ? (lesson.contentBlocks as any[]) : [],
  };
});

export const getDeprogrammingLessonAdjacent = cache(async (slug: string) => {
  const lessons = await getPublishedCourseLessons("deprogramming");
  const currentIndex = lessons.findIndex((lesson) => lesson.slug === slug);
  return {
    previous: currentIndex > 0 ? lessons[currentIndex - 1] : null,
    next: currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null,
  };
});

export const getDeprogrammingLessonStaticParams = cache(async (): Promise<{ slug: string }[]> => {
  const slugs = await getPublishedCourseLessonSlugs("deprogramming");
  return slugs.map((slug) => ({ slug }));
});

export const getStaticPageBySlug = cache(async (slug: string): Promise<DbPageDetail | null> => {
  return getPublishedPageBySlug(slug);
});

export const getStaticPageParams = cache(async (): Promise<{ slug: string }[]> => {
  const pages = await getPublishedPages();
  return pages.map((page) => ({ slug: page.slug }));
});
