import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock, BookOpen } from "lucide-react";

import { BASE_URL } from "@/lib/metadata";
import {
  getDeprogrammingLessonAdjacent,
  getDeprogrammingLessonBySlug,
  getDeprogrammingLessonStaticParams,
} from "@/lib/services/content";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const revalidate = 300;

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

export async function generateStaticParams(): Promise<LessonPageProps["params"][]> {
  return getDeprogrammingLessonStaticParams();
}

export default async function LessonPage({ params }: LessonPageProps) {
  const lesson = await getDeprogrammingLessonBySlug(params.slug);

  if (!lesson) {
    notFound();
  }

  const { previous, next } = await getDeprogrammingLessonAdjacent(lesson.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    name: lesson.title,
    description: lesson.description,
    isPartOf: {
      "@type": "Course",
      name: "Deprogramming: Breaking Free from Societal Conditioning",
      description: "A comprehensive course on breaking free from societal conditioning",
    },
  };

  return (
    <div className="container max-w-4xl pb-10">
      {/* Breadcrumb Navigation */}
      <nav className="mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/projects" className="hover:text-foreground transition-colors">
            Projects
          </Link>
          <span>/</span>
          <Link href="/projects/deprogramming" className="hover:text-foreground transition-colors">
            Deprogramming Course
          </Link>
          <span>/</span>
          <span className="text-foreground">{lesson.title}</span>
        </div>
      </nav>

      {/* Lesson Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="outline">{lesson.section}</Badge>
          <Badge variant="secondary">
            Lesson {lesson.sectionOrder}.{lesson.lessonOrder}
          </Badge>
        </div>

        <h1 className="text-3xl font-bold mb-4">{lesson.title}</h1>

        <p className="text-xl text-muted-foreground mb-6">
          {lesson.description}
        </p>

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

      {/* Lesson Navigation */}
      <div className="flex items-center justify-between mb-8">
        <div>
          {previous && (
            <Button variant="outline" asChild>
              <Link href={`/projects/deprogramming/${previous.slug}`}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous: {previous.title}
              </Link>
            </Button>
          )}
        </div>

        <Button variant="outline" asChild>
          <Link href="/projects/deprogramming">
            Course Overview
          </Link>
        </Button>

        <div>
          {next && (
            <Button asChild>
              <Link href={`/projects/deprogramming/${next.slug}`}>
                Next: {next.title}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          )}
        </div>
      </div>

      <Separator className="my-8" />

      {/* Lesson Content */}
      <article className="prose dark:prose-invert prose-headings:mb-3 prose-headings:mt-8 prose-headings:font-heading prose-headings:font-bold prose-headings:leading-tight hover:prose-a:text-accent-foreground prose-a:prose-headings:no-underline max-w-none">
        {lesson.contentBlocks?.map((block: any, index: number) => {
          switch (block.type) {
            case 'heading':
              const HeadingTag = `h${block.level}` as keyof JSX.IntrinsicElements
              return <HeadingTag key={index}>{block.content}</HeadingTag>
            case 'paragraph':
              return <p key={index}>{block.content}</p>
            case 'list':
              return (
                <ul key={index} className="list-disc list-inside">
                  {block.items.map((item: string, itemIndex: number) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              )
            default:
              return null
          }
        })}
      </article>

      {/* Resources Section */}
      {lesson.resources && lesson.resources.length > 0 && (
        <>
          <Separator className="my-8" />
          <Card>
            <CardHeader>
              <CardTitle>Further Resources</CardTitle>
              <CardDescription>
                Books, articles, and tools for deeper exploration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {lesson.resources.map((resource, index) => (
                  <li key={index} className="text-sm">
                    {resource}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </>
      )}

      {/* Lesson Navigation (Bottom) */}
      <div className="flex items-center justify-between mt-12">
        <div>
          {previous && (
            <Button variant="outline" asChild>
              <Link href={`/projects/deprogramming/${previous.slug}`}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous Lesson
              </Link>
            </Button>
          )}
        </div>

        <Button variant="outline" asChild>
          <Link href="/projects/deprogramming">
            Back to Course
          </Link>
        </Button>

        <div>
          {next && (
            <Button asChild>
              <Link href={`/projects/deprogramming/${next.slug}`}>
                Next Lesson
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          )}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
