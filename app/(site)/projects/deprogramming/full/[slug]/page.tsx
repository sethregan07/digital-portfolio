import { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, Clock } from "lucide-react";

import { getDeprogrammingLessonAdjacent, getDeprogrammingLessonBySlug } from "@/lib/services/content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CourseProgressTracker } from "@/components/course-progress-tracker";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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
    title: `${lesson.title} - Deprogramming Course`,
    description: lesson.description,
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const hasAccess = cookies().get("course_access")?.value === "1";
  if (!hasAccess) {
    redirect("/projects/deprogramming?access=required");
  }

  const lesson = await getDeprogrammingLessonBySlug(params.slug);
  if (!lesson) {
    notFound();
  }

  const { previous, next } = await getDeprogrammingLessonAdjacent(lesson.slug);

  return (
    <div className="container max-w-4xl pb-10">
      <CourseProgressTracker slug={lesson.slug} lessonOrder={lesson.lessonOrder} />
      <nav className="mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/projects/deprogramming" className="transition-colors hover:text-foreground">
            Offerings
          </Link>
          <span>/</span>
          <Link href="/projects/deprogramming/full" className="transition-colors hover:text-foreground">
            Deprogramming Course
          </Link>
          <span>/</span>
          <span className="text-foreground">{lesson.title}</span>
        </div>
      </nav>

      <div className="mb-8">
        <div className="mb-4 flex items-center gap-2">
          <Badge variant="outline">{lesson.section}</Badge>
          <Badge variant="secondary">
            Lesson {lesson.sectionOrder}.{lesson.lessonOrder}
          </Badge>
        </div>

        <h1 className="mb-4 text-3xl font-bold">{lesson.title}</h1>
        <p className="mb-6 text-xl text-muted-foreground">{lesson.description}</p>

        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{lesson.estimatedReadTime || lesson.readTimeMinutes} min read</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>Section {lesson.sectionOrder}</span>
          </div>
        </div>
      </div>

      <div className="mb-8 flex items-center justify-between">
        <div>
          {previous && (
            <Button variant="outline" asChild>
              <Link href={`/projects/deprogramming/full/${previous.slug}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: {previous.title}
              </Link>
            </Button>
          )}
        </div>

        <Button variant="outline" asChild>
          <Link href="/projects/deprogramming/full">Course Overview</Link>
        </Button>

        <div>
          {next && (
            <Button asChild>
              <Link href={`/projects/deprogramming/full/${next.slug}`}>
                Next: {next.title}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </div>

      <Separator className="my-8" />

      <article className="prose max-w-none dark:prose-invert prose-headings:mb-3 prose-headings:mt-8 prose-headings:font-heading prose-headings:font-bold prose-headings:leading-tight hover:prose-a:text-accent-foreground prose-a:prose-headings:no-underline">
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

      {lesson.resources && lesson.resources.length > 0 && (
        <>
          <Separator className="my-8" />
          <Card>
            <CardHeader>
              <CardTitle>Further Resources</CardTitle>
              <CardDescription>Books, articles, and tools for deeper exploration</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {lesson.resources.map((resource: string, index: number) => (
                  <li key={index} className="text-sm">
                    {resource}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </>
      )}

      <div className="mt-12 flex items-center justify-between">
        <div>
          {previous && (
            <Button variant="outline" asChild>
              <Link href={`/projects/deprogramming/full/${previous.slug}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Lesson
              </Link>
            </Button>
          )}
        </div>

        <Button variant="outline" asChild>
          <Link href="/projects/deprogramming/full">Back to Course</Link>
        </Button>

        <div>
          {next && (
            <Button asChild>
              <Link href={`/projects/deprogramming/full/${next.slug}`}>
                Next Lesson
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
