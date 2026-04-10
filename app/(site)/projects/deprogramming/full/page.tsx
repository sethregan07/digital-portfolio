import { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Award, BookOpen, Clock, Users } from "lucide-react";

import { BASE_URL } from "@/lib/metadata";
import { getPublishedCourseArticles } from "@/lib/repositories/content";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CourseLessonList } from "@/components/course-lesson-list";
import { CourseProgress } from "@/components/course-progress";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const url = `${BASE_URL}/projects/deprogramming/full`;

  return {
    title: "Deprogramming Course (Full Access)",
    description: "Full access to the Deprogramming course content.",
    alternates: {
      canonical: url,
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function DeprogrammingCourseFullPage() {
  const hasAccess = cookies().get("course_access")?.value === "1";
  if (!hasAccess) {
    redirect("/projects/deprogramming?access=required");
  }

  const courseLessons = await getPublishedCourseArticles("deprogramming");

  const sections = courseLessons.reduce(
    (acc: Record<string, typeof courseLessons>, lesson: (typeof courseLessons)[number]) => {
      const section = lesson.section;
      if (!acc[section]) {
        acc[section] = [];
      }
      acc[section].push(lesson);
      return acc;
    },
    {} as Record<string, typeof courseLessons>
  );

  const totalLessons = courseLessons.length;
  const totalReadTime = courseLessons.reduce(
    (acc: number, lesson: (typeof courseLessons)[number]) => acc + lesson.readTimeMinutes,
    0
  );
  const sectionCount = Object.keys(sections).length;

  const lessonsMeta = courseLessons.map((lesson) => ({
    slug: lesson.slug,
    lessonOrder: lesson.lessonOrder,
    title: lesson.title,
  }));

  return (
    <div className="container max-w-6xl pb-10">
      <div className="mb-8">
        <div className="mb-4 flex items-center gap-2">
          <Badge variant="secondary">Course</Badge>
          <Badge variant="outline">Full access</Badge>
        </div>

        <h1 className="mb-4 text-4xl font-bold">Deprogramming: Breaking Free from Societal Conditioning</h1>
        <p className="mb-6 max-w-3xl text-xl text-muted-foreground">
          Full course access. Use this page as your main workspace for the Deprogramming curriculum.
        </p>

        <div className="mb-6 flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-muted-foreground" />
            <span>{totalLessons} lessons</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <span>{totalReadTime} mins total</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-muted-foreground" />
            <span>{sectionCount} sections</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-muted-foreground" />
            <span>Self-directed</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">{/* Buttons live in the progress bar below */}</div>
      </div>

      <Separator className="my-8" />

      <CourseProgress lessons={lessonsMeta} totalLessons={totalLessons} basePath="/projects/deprogramming/full" />

      <div className="mb-8">
        <h2 className="mb-6 mt-6 text-2xl font-bold">Course Curriculum</h2>

        <div className="space-y-4">
          {(Object.entries(sections) as [string, (typeof courseLessons)[number][]][]).map(
            ([sectionName, lessons], sectionIndex) => (
              <Card key={sectionName}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Badge variant="outline">{sectionIndex + 1}</Badge>
                    {sectionName}
                    <Badge variant="secondary" className="ml-auto">
                      {lessons.length} lessons
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CourseLessonList lessons={lessons} basePath="/projects/deprogramming/full" />
                </CardContent>
              </Card>
            )
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Course Overview</CardTitle>
          <CardDescription>A detailed introduction to the deprogramming journey</CardDescription>
        </CardHeader>
        <CardContent className="prose max-w-none dark:prose-invert">
          <p>
            This course is designed to help you examine the invisible forces that shape our thoughts, beliefs, and
            behaviors. Through systematic exploration of societal structures, you'll learn to identify conditioning,
            question assumptions, and build a more authentic life.
          </p>
          <p>
            Each lesson includes core concepts, reflection exercises, practical applications, and further resources for
            deeper study. Take your time with each lesson—deprogramming is not a race, it's a journey of self-discovery.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
