"use client";

import React from "react";
import Link from "next/link";
import { Check, Clock } from "lucide-react";

type LessonItem = {
  slug: string;
  lessonOrder: number;
  title: string;
  description: string | null;
  estimatedReadTime?: number | null;
  readTimeMinutes?: number | null;
};

const STORAGE_KEY = "deprogramming_progress";

export function CourseLessonList({ lessons, basePath }: { lessons: LessonItem[]; basePath: string }) {
  const [completedSet, setCompletedSet] = React.useState<Set<number>>(new Set());

  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const completed = raw ? JSON.parse(raw).completed ?? [] : [];
      setCompletedSet(new Set(completed));
    } catch {
      setCompletedSet(new Set());
    }
  }, []);

  return (
    <div className="space-y-3">
      {lessons.map((lesson) => {
        const isCompleted = completedSet.has(lesson.lessonOrder);
        return (
          <div
            key={lesson.slug}
            className="flex items-center justify-between rounded-lg border border-muted/40 bg-muted/50 p-3"
          >
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-muted-foreground">{lesson.lessonOrder}.</span>
              <div>
                <Link
                  href={`${basePath}/${lesson.slug}`}
                  className="inline-flex items-center gap-2 font-medium transition-colors hover:text-primary"
                >
                  {lesson.title}
                  {isCompleted && (
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-3 w-3" />
                    </span>
                  )}
                </Link>
                <p className="mt-1 text-sm text-muted-foreground">{lesson.description ?? ""}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{lesson.estimatedReadTime || lesson.readTimeMinutes} min</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
