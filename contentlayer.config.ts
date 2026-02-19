import { makeSource } from "contentlayer/source-files";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import { Course } from "./lib/content-definitions/course";
import { Page } from "./lib/content-definitions/page";
import { Post } from "./lib/content-definitions/post";

export const HEADING_LINK_ANCHOR = `anchor-heading-link`;

export default makeSource({
  contentDirPath: "./content",
  documentTypes: [Post, Page, Course],
  mdx: {
    esbuildOptions(options) {
      options.target = "esnext";
      return options;
    },
    remarkPlugins: [[remarkGfm], [remarkMath]],
    rehypePlugins: [],
  },
});
