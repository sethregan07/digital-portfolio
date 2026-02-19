import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { BookOpen, Clock, Users, Award } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PreloadLink } from "@/components/preload-link";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Deprogramming Course",
    description: "A comprehensive course on breaking free from societal conditioning and reclaiming personal freedom.",
  };
}

export default async function DeprogrammingCoursePage() {
  // Get all deprogramming course content
  const courseLessons = await prisma.course.findMany({
    where: {
      course: "deprogramming",
      status: "published",
    },
    orderBy: [
      { sectionOrder: 'asc' },
      { lessonOrder: 'asc' },
    ],
  });

  // Group lessons by section
  const sections = courseLessons.reduce((acc, lesson) => {
    const section = lesson.section;
    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push(lesson);
    return acc;
  }, {} as Record<string, typeof courseLessons>);

  // Calculate course stats
  const totalLessons = courseLessons.length;
  const totalReadTime = courseLessons.reduce((acc, lesson) => acc + (lesson.estimatedReadTime || lesson.readTimeMinutes), 0);
  const sectionCount = Object.keys(sections).length;

  return (
    <div className="container max-w-6xl pb-10">
      {/* Course Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="secondary">Course</Badge>
          <Badge variant="outline">Self-Paced</Badge>
        </div>

        <h1 className="text-4xl font-bold mb-4">Deprogramming: Breaking Free from Societal Conditioning</h1>

        <p className="text-xl text-muted-foreground mb-6 max-w-3xl">
          A comprehensive course exploring how society shapes our beliefs and behaviors,
          and how to reclaim personal freedom and critical thinking through systematic deprogramming.
        </p>

        {/* Course Stats */}
        <div className="flex flex-wrap gap-6 mb-6">
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

        <Button asChild size="lg">
          <Link href="/projects/deprogramming/what-is-deprogramming">
            Start Course
          </Link>
        </Button>
      </div>

      <Separator className="my-8" />

      {/* What You'll Learn */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Critical Analysis</CardTitle>
            </CardHeader>
            <CardContent>
          <p className="text-muted-foreground">
            Tools to examine societal narratives and personal beliefs with clarity and objectivity.
          </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Systems Thinking</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Understanding how economic, social, and political systems interconnect and influence behavior.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Personal Freedom</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Practical steps to break free from limiting conditioning and live authentically.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Alternative Paradigms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Exploring new ways of thinking and living that serve human flourishing.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Course Curriculum */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Course Curriculum</h2>

        <div className="space-y-4">
          {Object.entries(sections).map(([sectionName, lessons], sectionIndex) => (
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
                <div className="space-y-3">
                  {lessons.map((lesson, lessonIndex) => (
                    <div key={lesson.slug} className="flex items-center justify-between p-3 rounded-lg border bg-muted/50">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-muted-foreground">
                          {lesson.lessonOrder}.
                        </span>
                        <div>
                          <PreloadLink
                            href={`/projects/deprogramming/${lesson.slug}`}
                            className="font-medium hover:text-primary transition-colors"
                          >
                            {lesson.title}
                          </PreloadLink>
                          <p className="text-sm text-muted-foreground mt-1">
                            {lesson.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{lesson.estimatedReadTime || lesson.readTimeMinutes} min</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Course Overview Content */}
      <Card>
        <CardHeader>
          <CardTitle>Course Overview</CardTitle>
          <CardDescription>
            A detailed introduction to the deprogramming journey
          </CardDescription>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p>
            This course is designed to help you examine the invisible forces that shape our thoughts,
            beliefs, and behaviors. Through systematic exploration of societal structures, you'll learn
            to identify conditioning, question assumptions, and build a more authentic life.
          </p>

          <p>
            Each lesson includes core concepts, reflection exercises, practical applications, and
            further resources for deeper study. Take your time with each lesson—deprogramming is
            not a race, it's a journey of self-discovery.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}