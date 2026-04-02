"use client";

import { useEffect } from "react";

const STORAGE_KEY = "deprogramming_progress";

export function CourseProgressTracker({ slug, lessonOrder }: { slug: string; lessonOrder: number }) {
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const existing = raw ? (JSON.parse(raw) as { slug: string; lessonOrder: number; completed?: number[] }) : null;
      const completed = new Set(existing?.completed ?? []);
      completed.add(lessonOrder);
      const nextState = {
        slug,
        lessonOrder: Math.max(existing?.lessonOrder ?? 0, lessonOrder),
        completed: Array.from(completed).sort((a, b) => a - b),
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
    } catch {
      // ignore
    }
  }, [slug, lessonOrder]);

  return null;
}
