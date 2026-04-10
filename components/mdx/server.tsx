import { cache, Fragment } from "react";
import type { AnchorHTMLAttributes, ImgHTMLAttributes } from "react";
import * as jsxRuntime from "react/jsx-runtime";
import NextImage, { ImageProps } from "next/image";
import Link from "next/link";
import { evaluate } from "@mdx-js/mdx";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import { NewsletterCTA } from "./newsletter-cta";
import { YouTubeVideo } from "./youtube-video";

/* eslint-disable @next/next/no-img-element */

function CustomLink({ href, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (!href) {
    return <a {...props}>{children}</a>;
  }

  if (href.startsWith("http")) {
    return (
      <a href={href} rel="noopener noreferrer" target="_blank" {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}

const mdxComponents = {
  a: CustomLink,
  img: (props: ImgHTMLAttributes<HTMLImageElement>) => <img {...props} alt={props.alt || ""} />,
  Image: (props: ImageProps) => <NextImage {...props} />,
  NewsletterCTA,
  YouTubeVideo,
};

function hasMathSyntax(source: string) {
  return /\$\$[\s\S]+?\$\$/m.test(source) || /(^|[^\\$])\$[A-Za-z\\][^$\n]*\$/m.test(source);
}

function remarkStripFirstHeading() {
  return (tree: any) => {
    if (!Array.isArray(tree?.children)) {
      return;
    }

    const firstHeadingIndex = tree.children.findIndex((node: any) => node?.type === "heading" && node?.depth === 1);
    if (firstHeadingIndex === 0) {
      tree.children.splice(firstHeadingIndex, 1);
    }
  };
}

const getMdxModule = cache(async (source: string, stripFirstHeading: boolean) => {
  const usesMath = hasMathSyntax(source);

  return evaluate(source, {
    Fragment,
    jsx: (jsxRuntime as any).jsx,
    jsxs: (jsxRuntime as any).jsxs,
    development: false,
    rehypePlugins: [rehypeSlug as any, usesMath ? (rehypeKatex as any) : null].filter(Boolean) as any,
    remarkPlugins: [
      stripFirstHeading ? remarkStripFirstHeading : null,
      usesMath ? (remarkMath as any) : null,
      remarkGfm as any,
    ].filter(Boolean) as any,
  });
});

interface ServerMdxProps {
  source: string;
  stripFirstHeading?: boolean;
}

export async function ServerMdx({ source, stripFirstHeading = false }: ServerMdxProps) {
  const evaluated = await getMdxModule(source, stripFirstHeading);
  const Content = evaluated.default;

  return <Content components={mdxComponents as any} />;
}
