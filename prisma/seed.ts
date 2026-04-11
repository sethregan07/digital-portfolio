import { createHash } from "crypto";
import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";
import GithubSlugger from "github-slugger";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

try {
  require("dotenv/config");
} catch {
  // Allow the seed to run when env vars are already present in the shell.
}

const prisma = new PrismaClient();
const contentRoot = path.join(process.cwd(), "content");
const pagesDir = path.join(contentRoot, "pages");
const postsDir = path.join(contentRoot, "posts");
const coursesDir = path.join(contentRoot, "courses");
const skippedCourseTemplates = new Set(["lesson-template.mdx"]);

// Helper function to calculate reading time
function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Helper function to extract headings
function extractHeadings(text: string) {
  const slugger = new GithubSlugger();
  const regXHeader = /\n\n(#{1,6})\s+(.+)/g;
  const headings = Array.from(text.matchAll(regXHeader)).map((match) => {
    const flag = match[1];
    const content = match[2];
    return {
      heading: flag?.length,
      text: content,
      slug: content ? slugger.slug(content) : undefined,
    };
  });
  return headings;
}

// Helper function to parse MDX into structured blocks
function parseMDXToBlocks(content: string): any[] {
  const lines = content.split("\n");
  const blocks: any[] = [];
  let currentParagraph = "";
  let inList = false;
  let listItems: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Headings
    if (line.startsWith("#")) {
      if (currentParagraph) {
        blocks.push({ type: "paragraph", content: currentParagraph.trim() });
        currentParagraph = "";
      }
      if (inList) {
        blocks.push({ type: "list", items: listItems });
        listItems = [];
        inList = false;
      }

      const level = line.match(/^#+/)?.[0].length || 1;
      const headingContent = line.replace(/^#+\s*/, "");
      blocks.push({ type: "heading", level, content: headingContent });
      continue;
    }

    // List items
    if (line.startsWith("- ") || line.startsWith("* ")) {
      if (currentParagraph) {
        blocks.push({ type: "paragraph", content: currentParagraph.trim() });
        currentParagraph = "";
      }
      if (!inList) {
        inList = true;
        listItems = [];
      }
      listItems.push(line.replace(/^[-*]\s*/, ""));
      continue;
    }

    // Empty line - end current paragraph or list
    if (line === "") {
      if (currentParagraph) {
        blocks.push({ type: "paragraph", content: currentParagraph.trim() });
        currentParagraph = "";
      }
      if (inList) {
        blocks.push({ type: "list", items: listItems });
        listItems = [];
        inList = false;
      }
      continue;
    }

    // Regular paragraph
    if (currentParagraph) {
      currentParagraph += " " + line;
    } else {
      currentParagraph = line;
    }
  }

  // Clean up remaining content
  if (currentParagraph) {
    blocks.push({ type: "paragraph", content: currentParagraph.trim() });
  }
  if (inList) {
    blocks.push({ type: "list", items: listItems });
  }

  return blocks;
}

// Helper function to compile MDX to HTML
async function compileMDX(content: string): Promise<string> {
  try {
    const result = await remark().use(remarkHtml).process(content);
    return result.toString();
  } catch (error) {
    console.error("Error compiling MDX:", error);
    return content;
  }
}

function getMdxFiles(dirPath: string, options?: { excludeBaseNames?: Set<string> }): string[] {
  return fs.readdirSync(dirPath, { withFileTypes: true }).flatMap((dirent) => {
    const entryPath = path.join(dirPath, dirent.name);

    if (dirent.isDirectory()) {
      return getMdxFiles(entryPath, options);
    }

    if (!dirent.isFile() || !dirent.name.endsWith(".mdx")) {
      return [];
    }

    if (options?.excludeBaseNames?.has(dirent.name)) {
      return [];
    }

    return [entryPath];
  });
}

function getSlugFromFilePath(filePath: string): string {
  return path.basename(filePath, ".mdx");
}

function getStableId(prefix: string, values: Array<string | number | null | undefined>): string {
  const hash = createHash("sha1")
    .update(values.map((value) => String(value ?? "")).join("::"))
    .digest("hex");

  return `${prefix}_${hash}`;
}

function parseOptionalDate(value: unknown): Date | null {
  if (!value) {
    return null;
  }

  const parsedDate = new Date(String(value));
  return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
}

function getCourseNameFromFilePath(filePath: string): string | null {
  const relativePath = path.relative(coursesDir, filePath);
  const pathSegments = relativePath.split(path.sep).filter(Boolean);

  return pathSegments.length > 1 ? pathSegments[0] : null;
}

async function main() {
  console.log("🌱 Starting seed...");

  // Seed Pages
  const pageFiles = getMdxFiles(pagesDir);

  for (const filePath of pageFiles) {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContent);
    const slug = getSlugFromFilePath(filePath);
    const lastUpdatedDate = parseOptionalDate(data.lastUpdatedDate);

    await prisma.page.upsert({
      where: { slug },
      update: {
        title: data.title,
        description: data.description,
        lastUpdatedDate,
        status: data.status,
        body: content,
      },
      create: {
        title: data.title,
        description: data.description,
        lastUpdatedDate,
        status: data.status,
        slug,
        body: content,
      },
    });
  }

  console.log(`✅ Seeded ${pageFiles.length} pages`);

  // Seed Posts
  const postFiles = getMdxFiles(postsDir);

  for (const filePath of postFiles) {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContent);
    const slug = getSlugFromFilePath(filePath);
    const headings = extractHeadings(content);
    const readTimeMinutes = calculateReadingTime(content);
    const publishedDate = parseOptionalDate(data.publishedDate);
    const lastUpdatedDate = parseOptionalDate(data.lastUpdatedDate);

    if (!publishedDate) {
      console.log(`⚠️  Skipping ${path.relative(process.cwd(), filePath)} - invalid publishedDate`);
      continue;
    }

    // Handle tags
    const tags = Array.isArray(data.tags) ? data.tags.filter((tag): tag is string => typeof tag === "string") : [];
    const slugger = new GithubSlugger();
    const tagSlugs = tags.map((tag: string) => slugger.slug(tag));

    // Handle author
    let authorId = null;
    if (data.author?.name) {
      const authorLookupId = getStableId("author", [data.author.name, data.author.image]);
      const author = await prisma.author.upsert({
        where: { id: authorLookupId },
        update: {
          name: data.author.name,
          image: data.author.image ?? null,
        },
        create: {
          id: authorLookupId,
          name: data.author.name,
          image: data.author.image ?? null,
        },
      });
      authorId = author.id;
    }

    // Handle series
    let seriesId = null;
    if (data.series?.title && typeof data.series.order === "number") {
      const seriesLookupId = getStableId("series", [data.series.title, data.series.order]);
      const series = await prisma.series.upsert({
        where: { id: seriesLookupId },
        update: {
          title: data.series.title,
          order: data.series.order,
        },
        create: {
          id: seriesLookupId,
          title: data.series.title,
          order: data.series.order,
        },
      });
      seriesId = series.id;
    }

    await prisma.post.upsert({
      where: { slug },
      update: {
        title: data.title,
        description: data.description,
        publishedDate,
        lastUpdatedDate,
        tags,
        status: data.status,
        tagSlugs,
        readTimeMinutes,
        headings,
        body: content,
        authorId,
        seriesId,
      },
      create: {
        title: data.title,
        description: data.description,
        publishedDate,
        lastUpdatedDate,
        tags,
        status: data.status,
        slug,
        tagSlugs,
        readTimeMinutes,
        headings,
        body: content,
        authorId,
        seriesId,
      },
    });
  }

  console.log(`✅ Seeded ${postFiles.length} posts`);

  // Seed Courses
  const courseFiles = getMdxFiles(coursesDir, { excludeBaseNames: skippedCourseTemplates });

  let totalCourses = 0;

  for (const filePath of courseFiles) {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContent);
    const courseName = (typeof data.course === "string" && data.course.trim()) || getCourseNameFromFilePath(filePath);

    if (
      !data.title ||
      !data.description ||
      !data.section ||
      typeof data.sectionOrder !== "number" ||
      typeof data.lessonOrder !== "number" ||
      !courseName
    ) {
      console.log(`⚠️  Skipping ${path.relative(process.cwd(), filePath)} - invalid data`);
      continue;
    }

    const slug = getSlugFromFilePath(filePath);
    const headings = extractHeadings(content);
    const readTimeMinutes = data.estimatedReadTime || calculateReadingTime(content);
    const compiledBody = await compileMDX(content);
    const contentBlocks = parseMDXToBlocks(content);
    const resources = Array.isArray(data.resources)
      ? data.resources.filter((resource): resource is string => typeof resource === "string")
      : [];

    await prisma.course.upsert({
      where: { slug },
      update: {
        title: data.title,
        description: data.description,
        section: data.section,
        sectionOrder: data.sectionOrder,
        lessonOrder: data.lessonOrder,
        course: courseName,
        status: data.status,
        estimatedReadTime: data.estimatedReadTime,
        resources,
        readTimeMinutes,
        headings,
        body: content,
        bodyCode: compiledBody,
        contentBlocks,
      },
      create: {
        title: data.title,
        description: data.description,
        section: data.section,
        sectionOrder: data.sectionOrder,
        lessonOrder: data.lessonOrder,
        course: courseName,
        status: data.status,
        estimatedReadTime: data.estimatedReadTime,
        resources,
        slug,
        readTimeMinutes,
        headings,
        body: content,
        bodyCode: compiledBody,
        contentBlocks,
      },
    });

    totalCourses++;
  }

  console.log(`✅ Seeded ${totalCourses} courses`);
  console.log("🌱 Seed completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
