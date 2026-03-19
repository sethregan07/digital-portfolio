import { cache } from "react";
import { prisma } from "@/lib/db";
import { ContentStatus } from "@prisma/client";

const shouldSkipDb = process.env.SKIP_DB === "true";

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
  if (shouldSkipDb) return [];
  return prisma.post.findMany({
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
});

export const getPublishedPostBySlug = cache(async (slug: string) => {
  if (shouldSkipDb) return null;
  return prisma.post.findFirst({
    where: {
      slug,
      status: "published",
    },
    include: {
      author: true,
      series: true,
    },
  });
});

export const getPublishedPostsBySeriesId = cache(async (seriesId: string) => {
  if (shouldSkipDb) return [];
  return prisma.post.findMany({
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
});

export const getPublishedCourseArticles = cache(async (course: string): Promise<DbCourseArticleListItem[]> => {
  if (shouldSkipDb) return [];
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
});

export const getPublishedPostSlugs = cache(async (): Promise<string[]> => {
  if (shouldSkipDb) return [];
  const posts = await prisma.post.findMany({
    where: {
      status: "published",
    },
    select: {
      slug: true,
    },
  });

  return posts.map((post) => post.slug);
});

export const getPublishedPages = cache(async () => {
  if (shouldSkipDb) return [];
  return prisma.page.findMany({
    where: {
      status: "published",
    },
    select: {
      slug: true,
      lastUpdatedDate: true,
    },
  });
});

export const getPublishedPageBySlug = cache(async (slug: string): Promise<DbPageDetail | null> => {
  if (shouldSkipDb) return null;
  return prisma.page.findFirst({
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
});

export const getPublishedCourseLessonBySlug = cache(async (course: string, slug: string) => {
  if (shouldSkipDb) return null;
  return prisma.course.findFirst({
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
});

export const getPublishedCourseLessons = cache(async (course: string) => {
  if (shouldSkipDb) return [];
  return prisma.course.findMany({
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
});

export const getPublishedCourseLessonSlugs = cache(async (course: string): Promise<string[]> => {
  if (shouldSkipDb) return [];
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
});
