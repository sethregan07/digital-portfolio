import {
  DbPostPreview,
  DbPageDetail,
  getPublishedCourseLessonBySlug,
  getPublishedCourseLessonSlugs,
  getPublishedCourseLessons,
  getPublishedCourseArticles,
  getPublishedPages,
  getPublishedPageBySlug,
  getPublishedPostBySlug,
  getPublishedPostsBySeriesId,
  getPublishedPostSlugs,
  getPublishedPosts,
} from "@/lib/repositories/content";
import { cache } from "react";
import { PostSeries, SeriesItem } from "@/types";
import { PostHeading } from "@/types";

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

export const fallbackSections = ["Society & Politics", "Economics & History", "Development", "General"] as const;

export function getFallbackSectionFromTags(tags: string[]): string {
  if (tags.some((tag) => ["society", "politics", "democracy", "inequality", "decentralisation"].includes(tag))) {
    return "Society & Politics";
  }
  if (tags.some((tag) => ["economics", "history"].includes(tag))) {
    return "Economics & History";
  }
  if (tags.some((tag) => ["development", "docs", "starter"].includes(tag))) {
    return "Development";
  }
  return "General";
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
  const courseArticles = await getPublishedCourseArticles("articles");

  if (courseArticles.length > 0) {
    return courseArticles.map((article) => ({
      slug: article.slug,
      title: article.title,
      description: article.description,
      readTimeMinutes: article.readTimeMinutes,
      section: article.section,
      sectionOrder: article.sectionOrder,
      lessonOrder: article.lessonOrder,
      href: `/articles/${article.slug}`,
    }));
  }

  const posts = await getPublishedPosts();
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
  const courseArticle = await getPublishedCourseLessonBySlug("articles", slug);

  if (courseArticle) {
    return {
      source: "course",
      slug: courseArticle.slug,
      title: courseArticle.title,
      description: courseArticle.description,
      section: courseArticle.section,
      sectionOrder: courseArticle.sectionOrder,
      lessonOrder: courseArticle.lessonOrder,
      readTimeMinutes: courseArticle.estimatedReadTime || courseArticle.readTimeMinutes,
      publishedDate: null,
      lastUpdatedDate: null,
      headings: Array.isArray(courseArticle.headings)
        ? (courseArticle.headings as Array<any>).filter(
            (h) => typeof h?.heading === "number" && typeof h?.text === "string" && typeof h?.slug === "string"
          )
        : [],
      bodyCode: courseArticle.bodyCode,
      contentBlocks: Array.isArray(courseArticle.contentBlocks) ? (courseArticle.contentBlocks as any[]) : null,
      resources: courseArticle.resources || [],
    };
  }

  const post = await getPublishedPostBySlug(slug);
  if (!post) {
    return null;
  }

  const section = getFallbackSectionFromTags(post.tags || []);

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
    bodyCode: post.body,
    contentBlocks: null,
    resources: [],
  };
});

export const getUnifiedArticleAdjacent = cache(async (source: ArticleSource, slug: string) => {
  if (source === "course") {
    const allArticles = await getPublishedCourseLessons("articles");
    const currentIndex = allArticles.findIndex((article) => article.slug === slug);
    return {
      previous: currentIndex > 0 ? allArticles[currentIndex - 1] : null,
      next: currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null,
    };
  }

  const allPosts = await getPublishedPosts();
  const currentIndex = allPosts.findIndex((post) => post.slug === slug);
  return {
    previous: currentIndex > 0 ? allPosts[currentIndex - 1] : null,
    next: currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null,
  };
});

export const getUnifiedArticleStaticParams = cache(async (): Promise<{ slug: string }[]> => {
  const courseSlugs = await getPublishedCourseLessonSlugs("articles");
  const postSlugs = await getPublishedPostSlugs();
  const unique = new Set([...courseSlugs, ...postSlugs]);
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
