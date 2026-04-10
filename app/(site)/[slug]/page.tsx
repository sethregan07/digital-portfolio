import { Metadata } from "next";
import { notFound } from "next/navigation";
import { format } from "date-fns";

import { BASE_URL } from "@/lib/metadata";
import { getStaticPageBySlug, getStaticPageParams } from "@/lib/services/content";
import { ServerMdx } from "@/components/mdx/server";

interface PageProps {
  params: {
    slug: string;
  };
}

export const revalidate = 300;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = await getStaticPageBySlug(params.slug);

  if (!page) {
    return {};
  }

  const url = `${BASE_URL}/${params.slug}`;

  return {
    title: page.title,
    description: page.description || undefined,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      url,
      title: page.title,
      description: page.description || undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description || undefined,
    },
  };
}

export async function generateStaticParams(): Promise<PageProps["params"][]> {
  return getStaticPageParams();
}

export default async function PagePage({ params }: PageProps) {
  const page = await getStaticPageBySlug(params.slug);

  if (!page || (process.env.NODE_ENV === "development" && page.status !== "published")) {
    notFound();
  }

  return (
    <div className="container max-w-6xl pb-10 pt-14">
      <article className="prose mx-auto max-w-5xl dark:prose-invert prose-headings:mb-3 prose-headings:mt-8 prose-headings:font-heading prose-headings:font-bold prose-headings:leading-tight hover:prose-a:text-accent-foreground prose-a:prose-headings:no-underline [&_ol]:text-[16px] [&_p]:text-[16px] [&_ul]:text-[16px]">
        <h1 className="mt-0">{page.title}</h1>
        {page.description && <p className="m-0 text-xl">{page.description}</p>}
        {page.lastUpdatedDate && (
          <time className="text-sm text-slate-500">Last updated: {format(page.lastUpdatedDate, "LLLL d, yyyy")}</time>
        )}
        <hr className="my-4" />
        <ServerMdx source={page.body} stripFirstHeading />
      </article>
    </div>
  );
}
