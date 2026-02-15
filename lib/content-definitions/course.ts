// Course content type for Udemy-style courses
import { defineDocumentType } from "contentlayer/source-files";
import GithubSlugger from "github-slugger";

import { calculateReadingTime } from "../utils";

export const Course = defineDocumentType(() => ({
  name: "Course",
  filePathPattern: `courses/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    section: {
      type: "string",
      required: true,
    },
    sectionOrder: {
      type: "number",
      required: true,
    },
    lessonOrder: {
      type: "number",
      required: true,
    },
    course: {
      type: "string",
      required: true,
    },
    status: {
      type: "enum",
      options: ["draft", "published"],
      required: true,
    },
    estimatedReadTime: {
      type: "number",
    },
    resources: {
      type: "list",
      of: { type: "string" },
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ""),
    },
    readTimeMinutes: {
      type: "number",
      resolve: (doc) => doc.estimatedReadTime || calculateReadingTime(doc.body.raw),
    },
    headings: {
      type: "json",
      resolve: async (doc) => {
        // use same package as rehypeSlug so toc and sluggified headings match
        // https://github.com/rehypejs/rehype-slug/blob/main/package.json#L36
        const slugger = new GithubSlugger();

        // https://stackoverflow.com/a/70802303
        const regXHeader = /\n\n(#{1,6})\s+(.+)/g;

        const headings = Array.from(doc.body.raw.matchAll(regXHeader)).map((match: any) => {
          const flag = match[1];
          const content = match[2];
          return {
            heading: flag?.length,
            text: content,
            slug: content ? slugger.slug(content) : undefined,
          };
        });

        return headings;
      },
    },
  },
}));