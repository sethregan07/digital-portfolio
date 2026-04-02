"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

type LessonMeta = {
  slug: string;
  lessonOrder: number;
  title: string;
};

type ProgressState = {
  slug: string;
  lessonOrder: number;
  completed?: number[];
};

const STORAGE_KEY = "deprogramming_progress";

export function CourseProgress({
  lessons,
  totalLessons,
  basePath,
}: {
  lessons: LessonMeta[];
  totalLessons: number;
  basePath: string;
}) {
  const [progress, setProgress] = useState<ProgressState | null>(null);

  const firstLesson = useMemo(() => {
    if (!lessons.length) return null;
    return lessons.slice().sort((a, b) => a.lessonOrder - b.lessonOrder)[0];
  }, [lessons]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as ProgressState;
      if (parsed?.slug && parsed?.lessonOrder) {
        setProgress(parsed);
      }
    } catch {
      // ignore
    }
  }, []);

  const completedCount = progress?.lessonOrder ?? 0;
  const percent = totalLessons ? Math.min(100, Math.round((completedCount / totalLessons) * 100)) : 0;

  return (
    <div className="rounded-lg border border-slate-200/70 bg-white/70 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/60">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-foreground">Your progress</p>
          <p className="text-xs text-muted-foreground">
            {completedCount > 0 ? `Last lesson: ${progress?.lessonOrder}` : "Start the course to track progress."}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {firstLesson && (
            <Button asChild size="sm" variant="outline">
              <Link href={`${basePath}/${firstLesson.slug}`}>Start course</Link>
            </Button>
          )}
          {progress?.slug && (
            <Button asChild size="sm">
              <Link href={`${basePath}/${progress.slug}`}>Resume</Link>
            </Button>
          )}
        </div>
      </div>
      <div className="mt-3 h-2 w-full rounded-full bg-muted">
        <div className="h-2 rounded-full bg-primary" style={{ width: `${percent}%` }} />
      </div>
      <p className="mt-2 text-xs text-muted-foreground">{percent}% complete</p>
    </div>
  );
}
