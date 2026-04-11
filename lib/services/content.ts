import { cache } from "react";
import { PostHeading, PostSeries, SeriesItem } from "@/types";

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
  tags: string[];
  section: string;
  sectionOrder: number;
  lessonOrder: number;
  readTimeMinutes: number;
  publishedDate: Date | null;
  lastUpdatedDate: Date | null;
  headings: PostHeading[];
  body: string;
  resources: string[];
};

export const articleCategories = [
  {
    name: "Media, Propaganda & Attention",
    slug: "media-propaganda-attention",
    description: "How narrative control, language, propaganda, and attention capture shape what feels true.",
  },
  {
    name: "Power, Institutions & Democracy",
    slug: "power-institutions-democracy",
    description:
      "Essays on obedience, schooling, institutions, elite coordination, and the limits of representative politics.",
  },
  {
    name: "Political Economy & Social Systems",
    slug: "political-economy-social-systems",
    description:
      "Money, debt, markets, growth, decentralization, and the structural assumptions baked into social order.",
  },
  {
    name: "Technology & Platform Life",
    slug: "technology-platform-life",
    description: "What software, platforms, automation, and AI are doing to agency, culture, and daily life.",
  },
  {
    name: "Consciousness, Reality & Meaning",
    slug: "consciousness-reality-meaning",
    description:
      "Pieces about perception, creativity, spirituality, and the difference between inherited belief and direct seeing.",
  },
  {
    name: "Psychology, Healing & Identity",
    slug: "psychology-healing-identity",
    description:
      "How conditioning lands in the nervous system, habits, identity, and the work of becoming less reactive.",
  },
] as const;

export type ArticleCategoryDefinition = (typeof articleCategories)[number];
export type ArticleCategoryName = ArticleCategoryDefinition["name"];
export type ArticleCategorySlug = ArticleCategoryDefinition["slug"];

export const fallbackSections = articleCategories.map((category) => category.name);

const defaultArticleCategory = articleCategories[1];
const editorialArticleCategoryOverrides: Record<string, ArticleCategorySlug> = {
  "art-cant-be-bought-or-twistedthats": "consciousness-reality-meaning",
  "debt-as-a-system-of-social-control": "political-economy-social-systems",
  "decentralization-beyond-slogans": "political-economy-social-systems",
  "elites-networks-and-soft-power": "power-institutions-democracy",
  "healing-after-conditioning": "psychology-healing-identity",
  "history-of-money": "political-economy-social-systems",
  "how-ai-could-dissolve-competition": "technology-platform-life",
  "how-success-is-being-created-why": "psychology-healing-identity",
  "how-to-be-indistractabile-its-not": "psychology-healing-identity",
  "how-we-measure-everything-and-illusion": "political-economy-social-systems",
  "ideas-to-fix-the-the-democracy": "power-institutions-democracy",
  "is-this-democracy-a-reflection-on": "power-institutions-democracy",
  "life-vs-ego-finding-your-own-truth": "consciousness-reality-meaning",
  "manufacturing-consent-and-modern-media": "media-propaganda-attention",
  "measure-of-progress": "political-economy-social-systems",
  "obedience-inside-modern-institutions": "power-institutions-democracy",
  "once-you-see-it-you-cant-unsee-it": "consciousness-reality-meaning",
  "power-hides-inside-language": "media-propaganda-attention",
  "power-isnt-where-you-think-it-is": "power-institutions-democracy",
  "remiagine-our-society": "political-economy-social-systems",
  "schooling-and-the-management-of-attention": "power-institutions-democracy",
  "technology-isnt-fixing-your-life": "technology-platform-life",
  "the-big-lie-were-all-taught-good": "power-institutions-democracy",
  "the-cost-of-building-without-consciousness": "technology-platform-life",
  "the-deeper-nature-of-reality-why": "consciousness-reality-meaning",
  "the-fabricated-world-how-belief-replaces": "consciousness-reality-meaning",
  "the-illusion-of-democracy": "power-institutions-democracy",
  "the-illusion-of-freedom-how-monopolies": "political-economy-social-systems",
  "the-illusion-of-growth-why-we-celebrate": "political-economy-social-systems",
  "the-limits-of-heroic-politics": "power-institutions-democracy",
  "the-main-reason-tech-platforms-prioritise": "technology-platform-life",
  "the-manufactured-consent-machine": "media-propaganda-attention",
  "the-myth-of-neutral-markets": "political-economy-social-systems",
  "the-price-of-awakening-and-standing": "consciousness-reality-meaning",
  "the-reasons-to-protect-your-energy": "psychology-healing-identity",
  "the-tools-have-evolved-the-patterns": "technology-platform-life",
  "the-trap-of-being-right": "psychology-healing-identity",
  "we-are-fish-in-a-tank-swimming-for": "technology-platform-life",
  "we-dont-have-a-mental-health-crisis": "psychology-healing-identity",
  "what-if-we-can-reimagine-our-society": "political-economy-social-systems",
  "why-its-time-for-people-to-think": "consciousness-reality-meaning",
  "why-propaganda-works-on-smart-people": "media-propaganda-attention",
  "why-social-systems-are-not-working": "power-institutions-democracy",
  "why-we-feel-the-way-we-do": "psychology-healing-identity",
  "why-we-keep-repeating-the-same-patterns": "psychology-healing-identity",
  "why-we-need-this-to-change-and-our": "political-economy-social-systems",
  "youre-not-seeing-reality-youre-seeing": "media-propaganda-attention",
};

function getArticleCategoryDefinitionBySlug(slug: string): ArticleCategoryDefinition | null {
  return articleCategories.find((category) => category.slug === slug) ?? null;
}

function getArticleCategoryOrder(slug: string): number {
  const index = articleCategories.findIndex((category) => category.slug === slug);
  return index >= 0 ? index + 1 : 1;
}

export function getArticleCategorySlug(section: string): string {
  return articleCategories.find((category) => category.name === section)?.slug ?? "general";
}

export function getArticleCategoryBySlug(slug: string): ArticleCategoryDefinition | null {
  return getArticleCategoryDefinitionBySlug(slug);
}

export function getArticleCategoryNameFromSlug(slug: string): string | null {
  return getArticleCategoryDefinitionBySlug(slug)?.name ?? null;
}

function getFallbackArticleCategorySlug(tags: string[]): ArticleCategorySlug {
  if (tags.some((tag) => ["media", "propaganda", "language", "narrative", "attention"].includes(tag))) {
    return "media-propaganda-attention";
  }
  if (tags.some((tag) => ["politics", "democracy", "education", "development"].includes(tag))) {
    return "power-institutions-democracy";
  }
  if (tags.some((tag) => ["economics", "history", "systems", "decentralisation", "inequality"].includes(tag))) {
    return "political-economy-social-systems";
  }
  if (tags.some((tag) => ["technology", "ai"].includes(tag))) {
    return "technology-platform-life";
  }
  if (tags.some((tag) => ["consciousness", "reality", "philosophy", "art", "creativity"].includes(tag))) {
    return "consciousness-reality-meaning";
  }
  if (tags.some((tag) => ["psychology", "mindset", "wellbeing", "identity", "success"].includes(tag))) {
    return "psychology-healing-identity";
  }
  return defaultArticleCategory.slug;
}

function getArticleCategory(post: Pick<DbPostPreview, "slug" | "tags">): ArticleCategoryDefinition {
  const categorySlug = editorialArticleCategoryOverrides[post.slug] ?? getFallbackArticleCategorySlug(post.tags || []);
  return getArticleCategoryDefinitionBySlug(categorySlug) ?? defaultArticleCategory;
}

export function getFallbackSectionFromTags(tags: string[]): string {
  return (getArticleCategoryDefinitionBySlug(getFallbackArticleCategorySlug(tags)) ?? defaultArticleCategory).name;
}

export function isEditorialArticle(post: Pick<DbPostPreview, "tags">): boolean {
  const tags = post.tags || [];
  return !tags.includes("docs") && !tags.includes("starter");
}

export function isTemplatePost(post: Pick<DbPostPreview, "tags">): boolean {
  const tags = post.tags || [];
  return tags.includes("docs") || tags.includes("starter");
}

export function isPublicLegacyPost(post: Pick<DbPostPreview, "tags">): boolean {
  return !isEditorialArticle(post) && !isTemplatePost(post);
}

export function getCanonicalPostPath(post: Pick<DbPostPreview, "slug" | "tags">): string {
  return isEditorialArticle(post) ? `/articles/${post.slug}` : `/posts/${post.slug}`;
}

export async function getRecentPosts(limit = 3): Promise<DbPostPreview[]> {
  const posts = (await getPublishedPosts()).filter(isEditorialArticle);
  return posts.slice(0, limit);
}

export async function getPostsByTag(tag: string): Promise<DbPostPreview[]> {
  const posts = await getPublishedPosts();
  return posts
    .filter((post) => !isTemplatePost(post))
    .filter((post) => post.tags?.includes(tag))
    .sort((a, b) => b.publishedDate.getTime() - a.publishedDate.getTime());
}

export async function getTagCounts(): Promise<ContentTagCount> {
  const posts = (await getPublishedPosts()).filter((post) => !isTemplatePost(post));
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
    const category = getArticleCategory(post);
    sectionCounters[category.slug] = (sectionCounters[category.slug] || 0) + 1;
    return {
      slug: post.slug,
      title: post.title,
      description: post.description,
      readTimeMinutes: post.readTimeMinutes,
      publishedDate: post.publishedDate,
      section: category.name,
      sectionOrder: getArticleCategoryOrder(category.slug),
      lessonOrder: sectionCounters[category.slug],
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

  return articleCategories
    .map((category) => ({
      name: category.name,
      slug: category.slug,
      count: counts.get(category.name) ?? 0,
    }))
    .filter((item) => item.count > 0);
}

export async function getArticlesByCategorySlug(slug: string): Promise<ArticleListItem[]> {
  const category = getArticleCategoryNameFromSlug(slug);
  if (!category) return [];

  const articles = await getArticlesForListing();
  return articles.filter((article) => article.section === category);
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
  const posts = await getPublishedPosts();
  return posts.filter(isPublicLegacyPost).map((post) => ({ slug: post.slug }));
});

export const getUnifiedArticleBySlug = cache(async (slug: string): Promise<UnifiedArticle | null> => {
  const post = await getPublishedPostBySlug(slug);
  if (!post) {
    return null;
  }

  const listing = (await getArticlesForListing()).find((article) => article.slug === slug);
  const category = getArticleCategory(post);

  return {
    source: "post",
    slug: post.slug,
    title: post.title,
    description: post.description,
    tags: post.tags || [],
    section: listing?.section ?? category.name,
    sectionOrder: listing?.sectionOrder ?? getArticleCategoryOrder(category.slug),
    lessonOrder: listing?.lessonOrder ?? 1,
    readTimeMinutes: post.readTimeMinutes,
    publishedDate: post.publishedDate,
    lastUpdatedDate: post.lastUpdatedDate,
    headings: Array.isArray(post.headings)
      ? (post.headings as Array<any>).filter(
          (h) => typeof h?.heading === "number" && typeof h?.text === "string" && typeof h?.slug === "string"
        )
      : [],
    body: post.body,
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

  return lesson;
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
