import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function LessonLoading() {
  return (
    <div className="container max-w-4xl pb-10">
      {/* Breadcrumb Navigation Skeleton */}
      <nav className="mb-6">
        <div className="flex items-center gap-2 text-sm">
          <div className="h-4 w-12 bg-muted rounded animate-pulse" />
          <span>/</span>
          <div className="h-4 w-24 bg-muted rounded animate-pulse" />
          <span>/</span>
          <div className="h-4 w-32 bg-muted rounded animate-pulse" />
        </div>
      </nav>

      {/* Lesson Header Skeleton */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-6 w-20 bg-muted rounded animate-pulse" />
          <div className="h-6 w-24 bg-muted rounded animate-pulse" />
        </div>

        <div className="h-9 w-3/4 bg-muted rounded animate-pulse mb-4" />
        <div className="h-6 w-full bg-muted rounded animate-pulse mb-6" />

        <div className="flex items-center gap-6 text-sm">
          <div className="h-4 w-20 bg-muted rounded animate-pulse" />
          <div className="h-4 w-24 bg-muted rounded animate-pulse" />
        </div>
      </div>

      {/* Lesson Navigation Skeleton */}
      <div className="flex items-center justify-between mb-8">
        <div className="h-10 w-40 bg-muted rounded animate-pulse" />
        <div className="h-10 w-32 bg-muted rounded animate-pulse" />
        <div className="h-10 w-36 bg-muted rounded animate-pulse" />
      </div>

      {/* Lesson Content Skeleton */}
      <article className="space-y-6 mb-8">
        <div className="h-6 w-full bg-muted rounded animate-pulse" />
        <div className="h-6 w-5/6 bg-muted rounded animate-pulse" />
        <div className="h-4 w-full bg-muted rounded animate-pulse" />
        <div className="h-4 w-full bg-muted rounded animate-pulse" />
        <div className="h-4 w-4/5 bg-muted rounded animate-pulse" />

        <div className="h-8 w-1/2 bg-muted rounded animate-pulse mt-8" />
        <div className="h-4 w-full bg-muted rounded animate-pulse" />
        <div className="h-4 w-full bg-muted rounded animate-pulse" />
        <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />

        <div className="h-6 w-3/5 bg-muted rounded animate-pulse mt-6" />
        <div className="space-y-2 ml-4">
          <div className="h-4 w-full bg-muted rounded animate-pulse" />
          <div className="h-4 w-4/5 bg-muted rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-muted rounded animate-pulse" />
        </div>
      </article>

      {/* Resources Section Skeleton */}
      <Card>
        <CardHeader>
          <div className="h-6 w-40 bg-muted rounded animate-pulse" />
          <div className="h-4 w-64 bg-muted rounded animate-pulse" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="h-4 w-full bg-muted rounded animate-pulse" />
            <div className="h-4 w-4/5 bg-muted rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
          </div>
        </CardContent>
      </Card>

      {/* Bottom Navigation Skeleton */}
      <div className="flex items-center justify-between mt-12">
        <div className="h-10 w-36 bg-muted rounded animate-pulse" />
        <div className="h-10 w-28 bg-muted rounded animate-pulse" />
        <div className="h-10 w-32 bg-muted rounded animate-pulse" />
      </div>
    </div>
  );
}