import { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, Clock, FileText, Home, Layers } from "lucide-react";

import { getDeprogrammingLessonAdjacent, getDeprogrammingLessonBySlug } from "@/lib/services/content";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const revalidate = 300;

const editorialSerif = {
  fontFamily: '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, "Times New Roman", serif',
};

const previewLessonCount = 3;

interface LessonPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: LessonPageProps): Promise<Metadata> {
  const lesson = await getDeprogrammingLessonBySlug(params.slug);

  if (!lesson) {
    return {};
  }

  return {
    title: `${lesson.title} - Deprogramming Preview`,
    description: lesson.description,
  };
}

export default async function PreviewLessonPage({ params }: LessonPageProps) {
  const lesson = await getDeprogrammingLessonBySlug(params.slug);
  if (!lesson) {
    notFound();
  }

  if (lesson.lessonOrder > previewLessonCount) {
    redirect("/projects/deprogramming?access=required");
  }

  const { previous, next } = await getDeprogrammingLessonAdjacent(lesson.slug);
  const nextPreviewLesson = next && next.lessonOrder <= previewLessonCount ? next : null;
  const previousPreviewLesson = previous && previous.lessonOrder <= previewLessonCount ? previous : null;

  return (
    <div className="bg-gradient-to-b from-background via-background to-muted/30 pb-16">
      <div className="container max-w-6xl pt-10">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol
            role="list"
            className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-muted-foreground"
          >
            <li>
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
                aria-label="Go to Home"
              >
                <Home className="h-3.5 w-3.5" />
                <span>Home</span>
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/projects" className="transition-colors hover:text-foreground">
                Offerings
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/projects/deprogramming" className="transition-colors hover:text-foreground">
                Deprogramming
              </Link>
            </li>
            <li>/</li>
            <li className="truncate text-foreground/80">{lesson.title}</li>
          </ol>
        </nav>

        <header className="mb-12 border-b border-border/70 pb-8">
          <div className="mb-4 flex flex-wrap items-center gap-4 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            <div className="inline-flex items-center gap-2">
              <Layers className="h-3.5 w-3.5" />
              <span>{lesson.section}</span>
            </div>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/60" />
            <span>{`Free Lesson ${lesson.sectionOrder}.${lesson.lessonOrder}`}</span>
          </div>
          <h1
            className="max-w-4xl text-4xl leading-tight tracking-[-0.03em] text-foreground md:text-5xl"
            style={editorialSerif}
          >
            {lesson.title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">{lesson.description}</p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {lesson.estimatedReadTime || lesson.readTimeMinutes} mins read
            </span>
            <span className="inline-flex items-center gap-1.5">
              <BookOpen className="h-4 w-4" />
              Preview lesson
            </span>
          </div>
        </header>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px]">
          <div>
            <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-border/70 pb-8">
              <div className="flex flex-wrap items-center gap-2">
                {previousPreviewLesson ? (
                  <Button variant="outline" asChild className="rounded-sm border-border/80">
                    <Link href={`/projects/deprogramming/${previousPreviewLesson.slug}`}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Previous
                    </Link>
                  </Button>
                ) : null}
                {nextPreviewLesson ? (
                  <Button asChild className="rounded-sm">
                    <Link href={`/projects/deprogramming/${nextPreviewLesson.slug}`}>
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                ) : null}
              </div>

              <Button variant="outline" asChild className="rounded-sm border-border/80">
                <Link href="/projects/deprogramming">Course Overview</Link>
              </Button>
            </div>

            <article
              className={cn(
                "prose max-w-none dark:prose-invert prose-p:leading-8 hover:prose-a:text-accent-foreground prose-li:leading-8",
                "prose-headings:font-normal prose-headings:tracking-[-0.02em] prose-headings:text-foreground",
                "[&_h1]:text-4xl [&_h1]:leading-tight [&_h2]:mt-12 [&_h2]:text-3xl [&_h2]:leading-tight",
                "[&_blockquote]:border-border/70 [&_blockquote]:text-foreground/80 [&_h3]:text-2xl [&_h3]:leading-snug",
                "[&_ol]:text-[15px] [&_p]:text-[15px] [&_p]:text-foreground/90 [&_ul]:text-[15px]"
              )}
              style={editorialSerif}
            >
              {lesson.contentBlocks?.map((block: any, index: number) => {
                switch (block.type) {
                  case "heading":
                    const HeadingTag = `h${block.level}` as keyof JSX.IntrinsicElements;
                    return <HeadingTag key={index}>{block.content}</HeadingTag>;
                  case "paragraph":
                    return <p key={index}>{block.content}</p>;
                  case "list":
                    return (
                      <ul key={index} className="list-inside list-disc">
                        {block.items.map((item: string, itemIndex: number) => (
                          <li key={itemIndex}>{item}</li>
                        ))}
                      </ul>
                    );
                  default:
                    return null;
                }
              })}
            </article>

            {lesson.resources && lesson.resources.length > 0 ? (
              <section className="mt-12 border-t border-border/70 pt-10">
                <div className="mb-7 flex items-center gap-2">
                  <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                  <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Resources</p>
                </div>
                <div className="border border-border/70 bg-card/40 p-6">
                  <ul className="space-y-3 text-sm leading-7 text-muted-foreground">
                    {lesson.resources.map((resource: string, index: number) => (
                      <li key={index}>{resource}</li>
                    ))}
                  </ul>
                </div>
              </section>
            ) : null}

            <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-8">
              <Button variant="outline" asChild className="rounded-sm border-border/80">
                <Link href="/projects/deprogramming">Back to Course</Link>
              </Button>
              <div className="flex flex-wrap items-center gap-2">
                {previousPreviewLesson ? (
                  <Button variant="outline" asChild className="rounded-sm border-border/80">
                    <Link href={`/projects/deprogramming/${previousPreviewLesson.slug}`}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Previous
                    </Link>
                  </Button>
                ) : null}
                {nextPreviewLesson ? (
                  <Button asChild className="rounded-sm">
                    <Link href={`/projects/deprogramming/${nextPreviewLesson.slug}`}>
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                ) : null}
              </div>
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-28 border border-border/70 bg-card/40 p-5">
              <div className="mb-4 border-b border-border/60 pb-4">
                <div className="flex items-center gap-2">
                  <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                  <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Preview Notes</p>
                </div>
              </div>
              <div className="space-y-3 text-sm leading-7 text-muted-foreground">
                <p>{lesson.section}</p>
                <p>{`Lesson ${lesson.sectionOrder}.${lesson.lessonOrder}`}</p>
                <p>{`${lesson.estimatedReadTime || lesson.readTimeMinutes} mins read`}</p>
                <p>Free preview</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
