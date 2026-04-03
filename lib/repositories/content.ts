import { cache } from "react";
import { ContentStatus } from "@prisma/client";
import { allCourses, allPages, allPosts } from "contentlayer/generated";

import { prisma } from "@/lib/db";

const shouldSkipDb = process.env.SKIP_DB === "true";

function shouldUseContentFallback(error: unknown): boolean {
  if (shouldSkipDb) return true;

  if (typeof error !== "object" || error === null) {
    return false;
  }

  const maybePrismaError = error as { code?: string; message?: string };
  const message = maybePrismaError.message?.toLowerCase() ?? "";

  return (
    maybePrismaError.code === "P1010" ||
    maybePrismaError.code === "P1001" ||
    maybePrismaError.code === "P1000" ||
    message.includes("was denied access") ||
    message.includes("denied access on the database") ||
    message.includes("authentication failed") ||
    message.includes("can't reach database server") ||
    message.includes("could not connect")
  );
}

function logContentFallback(error: unknown, operation: string) {
  const message = error instanceof Error ? error.message : String(error);
  console.warn(`[content] Falling back to local content for ${operation}: ${message}`);
}

function getSeriesId(series?: { title: string; order: number } | null): string | null {
  if (!series) return null;
  return `${series.title}-${series.order}`;
}

function mapContentlayerPostPreview(post: (typeof allPosts)[number]): DbPostPreview {
  return {
    id: post._id,
    slug: post.slug,
    title: post.title,
    description: post.description ?? null,
    publishedDate: new Date(post.publishedDate),
    lastUpdatedDate: post.lastUpdatedDate ? new Date(post.lastUpdatedDate) : null,
    readTimeMinutes: post.readTimeMinutes,
    tags: post.tags ?? [],
  };
}

function getFallbackPublishedPosts(): DbPostPreview[] {
  return allPosts
    .filter((post) => post.status === "published")
    .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
    .map(mapContentlayerPostPreview);
}

function getFallbackPublishedPostBySlug(slug: string) {
  const post = allPosts.find((item) => item.slug === slug && item.status === "published");
  if (!post) return null;

  return {
    id: post._id,
    slug: post.slug,
    title: post.title,
    description: post.description ?? null,
    publishedDate: new Date(post.publishedDate),
    lastUpdatedDate: post.lastUpdatedDate ? new Date(post.lastUpdatedDate) : null,
    readTimeMinutes: post.readTimeMinutes,
    tags: post.tags ?? [],
    status: post.status as ContentStatus,
    tagSlugs: Array.isArray(post.tagSlugs) ? post.tagSlugs : [],
    headings: Array.isArray(post.headings) ? post.headings : [],
    body: post.body.raw,
    authorId: post.author ? `${post.author.name}-${post.author.image || ""}` : null,
    author: post.author
      ? {
          id: `${post.author.name}-${post.author.image || ""}`,
          name: post.author.name,
          image: post.author.image ?? null,
        }
      : null,
    seriesId: getSeriesId(post.series),
    series: post.series
      ? {
          id: getSeriesId(post.series)!,
          title: post.series.title,
          order: post.series.order,
        }
      : null,
  };
}

function getFallbackPublishedPostsBySeriesId(seriesId: string) {
  return allPosts
    .filter((post) => post.status === "published" && getSeriesId(post.series) === seriesId)
    .sort((a, b) => (a.series?.order ?? 0) - (b.series?.order ?? 0))
    .map((post) => ({
      ...getFallbackPublishedPostBySlug(post.slug)!,
      series: post.series
        ? {
            id: getSeriesId(post.series)!,
            title: post.series.title,
            order: post.series.order,
          }
        : null,
    }));
}

function getFallbackPublishedCourseArticles(course: string): DbCourseArticleListItem[] {
  return allCourses
    .filter((item) => item.course === course && item.status === "published")
    .sort((a, b) => a.sectionOrder - b.sectionOrder || a.lessonOrder - b.lessonOrder)
    .map((item) => ({
      slug: item.slug,
      title: item.title,
      description: item.description ?? null,
      section: item.section,
      sectionOrder: item.sectionOrder,
      lessonOrder: item.lessonOrder,
      readTimeMinutes: item.estimatedReadTime || item.readTimeMinutes,
    }));
}

function getFallbackPublishedPages() {
  return allPages
    .filter((page) => page.status === "published")
    .map((page) => ({
      slug: page.slug,
      lastUpdatedDate: page.lastUpdatedDate ? new Date(page.lastUpdatedDate) : null,
    }));
}

function getFallbackPublishedPageBySlug(slug: string): DbPageDetail | null {
  const page = allPages.find((item) => item.slug === slug && item.status === "published");
  if (!page) return null;

  return {
    slug: page.slug,
    title: page.title,
    description: page.description ?? null,
    lastUpdatedDate: page.lastUpdatedDate ? new Date(page.lastUpdatedDate) : null,
    body: page.body.raw,
    status: page.status as ContentStatus,
  };
}

function getFallbackPublishedCourseLessonBySlug(course: string, slug: string): DbCourseLessonDetail | null {
  const lesson = allCourses.find((item) => item.course === course && item.slug === slug && item.status === "published");
  if (!lesson) return null;

  return {
    id: lesson._id,
    slug: lesson.slug,
    title: lesson.title,
    description: lesson.description,
    section: lesson.section,
    sectionOrder: lesson.sectionOrder,
    lessonOrder: lesson.lessonOrder,
    estimatedReadTime: lesson.estimatedReadTime ?? null,
    readTimeMinutes: lesson.readTimeMinutes,
    resources: lesson.resources ?? [],
    headings: Array.isArray(lesson.headings) ? lesson.headings : [],
    bodyCode: lesson.body.code ?? null,
    contentBlocks: null,
  };
}

function getFallbackPublishedCourseLessons(course: string) {
  return allCourses
    .filter((item) => item.course === course && item.status === "published")
    .sort((a, b) => a.sectionOrder - b.sectionOrder || a.lessonOrder - b.lessonOrder)
    .map((item) => ({
      slug: item.slug,
      title: item.title,
      sectionOrder: item.sectionOrder,
      lessonOrder: item.lessonOrder,
    }));
}

export type DbPostPreview = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  publishedDate: Date;
  lastUpdatedDate: Date | null;
  readTimeMinutes: number;
  tags: string[];
};

export type DbCourseArticleListItem = {
  slug: string;
  title: string;
  description: string | null;
  section: string;
  sectionOrder: number;
  lessonOrder: number;
  readTimeMinutes: number;
};

export type DbCourseLessonDetail = {
  id: string;
  slug: string;
  title: string;
  description: string;
  section: string;
  sectionOrder: number;
  lessonOrder: number;
  estimatedReadTime: number | null;
  readTimeMinutes: number;
  resources: string[];
  headings: any;
  bodyCode: string | null;
  contentBlocks: any;
};

export type DbPageDetail = {
  slug: string;
  title: string;
  description: string | null;
  lastUpdatedDate: Date | null;
  body: string;
  status: ContentStatus;
};

export const getPublishedPosts = cache(async (): Promise<DbPostPreview[]> => {
  if (shouldSkipDb) return getFallbackPublishedPosts();

  try {
    return await prisma.post.findMany({
      where: {
        status: "published",
      },
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        publishedDate: true,
        lastUpdatedDate: true,
        readTimeMinutes: true,
        tags: true,
      },
      orderBy: {
        publishedDate: "desc",
      },
    });
  } catch (error) {
    if (!shouldUseContentFallback(error)) throw error;
    logContentFallback(error, "getPublishedPosts");
    return getFallbackPublishedPosts();
  }
});

export const getPublishedPostBySlug = cache(async (slug: string) => {
  if (shouldSkipDb) return getFallbackPublishedPostBySlug(slug);

  try {
    return await prisma.post.findFirst({
      where: {
        slug,
        status: "published",
      },
      include: {
        author: true,
        series: true,
      },
    });
  } catch (error) {
    if (!shouldUseContentFallback(error)) throw error;
    logContentFallback(error, "getPublishedPostBySlug");
    return getFallbackPublishedPostBySlug(slug);
  }
});

export const getPublishedPostsBySeriesId = cache(async (seriesId: string) => {
  if (shouldSkipDb) return getFallbackPublishedPostsBySeriesId(seriesId);

  try {
    return await prisma.post.findMany({
      where: {
        seriesId,
        status: "published",
      },
      include: {
        series: true,
      },
      orderBy: {
        series: {
          order: "asc",
        },
      },
    });
  } catch (error) {
    if (!shouldUseContentFallback(error)) throw error;
    logContentFallback(error, "getPublishedPostsBySeriesId");
    return getFallbackPublishedPostsBySeriesId(seriesId);
  }
});

export const getPublishedCourseArticles = cache(async (course: string): Promise<DbCourseArticleListItem[]> => {
  if (shouldSkipDb) return getFallbackPublishedCourseArticles(course);

  try {
    const rows = await prisma.course.findMany({
      where: {
        course,
        status: "published",
      },
      select: {
        slug: true,
        title: true,
        description: true,
        section: true,
        sectionOrder: true,
        lessonOrder: true,
        estimatedReadTime: true,
        readTimeMinutes: true,
      },
      orderBy: [{ sectionOrder: "asc" }, { lessonOrder: "asc" }],
    });

    return rows.map((row) => ({
      slug: row.slug,
      title: row.title,
      description: row.description,
      section: row.section,
      sectionOrder: row.sectionOrder,
      lessonOrder: row.lessonOrder,
      readTimeMinutes: row.estimatedReadTime || row.readTimeMinutes,
    }));
  } catch (error) {
    if (!shouldUseContentFallback(error)) throw error;
    logContentFallback(error, "getPublishedCourseArticles");
    return getFallbackPublishedCourseArticles(course);
  }
});

export const getPublishedPostSlugs = cache(async (): Promise<string[]> => {
  if (shouldSkipDb) return getFallbackPublishedPosts().map((post) => post.slug);

  try {
    const posts = await prisma.post.findMany({
      where: {
        status: "published",
      },
      select: {
        slug: true,
      },
    });

    return posts.map((post) => post.slug);
  } catch (error) {
    if (!shouldUseContentFallback(error)) throw error;
    logContentFallback(error, "getPublishedPostSlugs");
    return getFallbackPublishedPosts().map((post) => post.slug);
  }
});

export const getPublishedPages = cache(async () => {
  if (shouldSkipDb) return getFallbackPublishedPages();

  try {
    return await prisma.page.findMany({
      where: {
        status: "published",
      },
      select: {
        slug: true,
        lastUpdatedDate: true,
      },
    });
  } catch (error) {
    if (!shouldUseContentFallback(error)) throw error;
    logContentFallback(error, "getPublishedPages");
    return getFallbackPublishedPages();
  }
});

export const getPublishedPageBySlug = cache(async (slug: string): Promise<DbPageDetail | null> => {
  if (shouldSkipDb) return getFallbackPublishedPageBySlug(slug);

  try {
    return await prisma.page.findFirst({
      where: {
        slug,
        status: "published",
      },
      select: {
        slug: true,
        title: true,
        description: true,
        lastUpdatedDate: true,
        body: true,
        status: true,
      },
    });
  } catch (error) {
    if (!shouldUseContentFallback(error)) throw error;
    logContentFallback(error, "getPublishedPageBySlug");
    return getFallbackPublishedPageBySlug(slug);
  }
});

export const getPublishedCourseLessonBySlug = cache(async (course: string, slug: string) => {
  if (shouldSkipDb) return getFallbackPublishedCourseLessonBySlug(course, slug);

  try {
    return await prisma.course.findFirst({
      where: {
        slug,
        course,
        status: "published",
      },
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        section: true,
        sectionOrder: true,
        lessonOrder: true,
        estimatedReadTime: true,
        readTimeMinutes: true,
        resources: true,
        headings: true,
        bodyCode: true,
        contentBlocks: true,
      },
    });
  } catch (error) {
    if (!shouldUseContentFallback(error)) throw error;
    logContentFallback(error, "getPublishedCourseLessonBySlug");
    return getFallbackPublishedCourseLessonBySlug(course, slug);
  }
});

export const getPublishedCourseLessons = cache(async (course: string) => {
  if (shouldSkipDb) return getFallbackPublishedCourseLessons(course);

  try {
    return await prisma.course.findMany({
      where: {
        course,
        status: "published",
      },
      orderBy: [{ sectionOrder: "asc" }, { lessonOrder: "asc" }],
      select: {
        slug: true,
        title: true,
        sectionOrder: true,
        lessonOrder: true,
      },
    });
  } catch (error) {
    if (!shouldUseContentFallback(error)) throw error;
    logContentFallback(error, "getPublishedCourseLessons");
    return getFallbackPublishedCourseLessons(course);
  }
});

export const getPublishedCourseLessonSlugs = cache(async (course: string): Promise<string[]> => {
  if (shouldSkipDb) return getFallbackPublishedCourseLessons(course).map((lesson) => lesson.slug);

  try {
    const lessons = await prisma.course.findMany({
      where: {
        course,
        status: "published",
      },
      select: {
        slug: true,
      },
    });

    return lessons.map((lesson) => lesson.slug);
  } catch (error) {
    if (!shouldUseContentFallback(error)) throw error;
    logContentFallback(error, "getPublishedCourseLessonSlugs");
    return getFallbackPublishedCourseLessons(course).map((lesson) => lesson.slug);
  }
});
