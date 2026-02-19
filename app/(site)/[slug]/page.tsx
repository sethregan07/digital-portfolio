import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { format, parseISO } from "date-fns";

interface PageProps {
  params: {
    slug: string;
  };
}

async function getPageFromParams(params: PageProps["params"]) {
  const page = await prisma.page.findFirst({
    where: {
      slug: params.slug,
      status: "published",
    },
  });

  if (!page) {
    return null;
  }

  return page;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = await getPageFromParams(params);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description || undefined,
  };
}

export async function generateStaticParams(): Promise<PageProps["params"][]> {
  const pages = await prisma.page.findMany({
    where: {
      status: "published",
    },
    select: {
      slug: true,
    },
  });

  return pages.map((page) => ({
    slug: page.slug,
  }));
}

export default async function PagePage({ params }: PageProps) {
  const page = await getPageFromParams(params);

  if (!page || (process.env.NODE_ENV === "development" && page.status !== "published")) {
    notFound();
  }

  return (
    <div className="container max-w-6xl pb-10">
      <article className="prose mx-auto max-w-5xl dark:prose-invert prose-headings:mb-3 prose-headings:mt-8 prose-headings:font-heading prose-headings:font-bold prose-headings:leading-tight hover:prose-a:text-accent-foreground prose-a:prose-headings:no-underline">
        <h1 className="mt-0">{page.title}</h1>
        {page.description && <p className="m-0 text-xl">{page.description}</p>}
        {page.lastUpdatedDate && (
          <time className="text-sm text-slate-500">
            Last updated: {format(parseISO(page.lastUpdatedDate.toISOString()), "LLLL d, yyyy")}
          </time>
        )}
        <hr className="my-4" />
        <div dangerouslySetInnerHTML={{ __html: page.body }} />
      </article>
    </div>
  );
}
