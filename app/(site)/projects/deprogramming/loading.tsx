import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function CourseLoading() {
  return (
    <div className="container max-w-6xl pb-10">
      {/* Course Header Skeleton */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-6 w-16 bg-muted rounded animate-pulse [animation-delay:0ms]" />
          <div className="h-6 w-20 bg-muted rounded animate-pulse [animation-delay:100ms]" />
        </div>

        <div className="h-10 w-3/4 bg-muted rounded animate-pulse mb-4 [animation-delay:200ms]" />
        <div className="h-6 w-full bg-muted rounded animate-pulse mb-2 [animation-delay:300ms]" />
        <div className="h-6 w-2/3 bg-muted rounded animate-pulse mb-6 [animation-delay:400ms]" />

        {/* Course Stats Skeleton */}
        <div className="flex flex-wrap gap-6 mb-6">
          <div className="h-5 w-20 bg-muted rounded animate-pulse [animation-delay:500ms]" />
          <div className="h-5 w-24 bg-muted rounded animate-pulse [animation-delay:600ms]" />
          <div className="h-5 w-18 bg-muted rounded animate-pulse [animation-delay:700ms]" />
          <div className="h-5 w-16 bg-muted rounded animate-pulse [animation-delay:800ms]" />
        </div>

        <div className="h-10 w-32 bg-muted rounded animate-pulse [animation-delay:900ms]" />
      </div>

      {/* What You'll Learn Skeleton */}
      <div className="mb-8">
        <div className="h-8 w-48 bg-muted rounded animate-pulse mb-4" />
        <div className="grid md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader>
                <div className="h-6 w-32 bg-muted rounded animate-pulse" />
              </CardHeader>
              <CardContent>
                <div className="h-4 w-full bg-muted rounded animate-pulse mb-2" />
                <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Course Curriculum Skeleton */}
      <div className="mb-8">
        <div className="h-8 w-56 bg-muted rounded animate-pulse mb-6" />

        <div className="space-y-4">
          {[1, 2, 3].map((section) => (
            <Card key={section}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-6 w-8 bg-muted rounded animate-pulse" />
                  <div className="h-6 w-48 bg-muted rounded animate-pulse" />
                  <div className="h-6 w-20 bg-muted rounded animate-pulse ml-auto" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((lesson) => (
                    <div key={lesson} className="flex items-center justify-between p-3 rounded-lg border bg-muted/50">
                      <div className="flex items-center gap-3">
                        <div className="h-4 w-4 bg-muted rounded animate-pulse" />
                        <div className="space-y-2">
                          <div className="h-5 w-64 bg-muted rounded animate-pulse" />
                          <div className="h-4 w-96 bg-muted rounded animate-pulse" />
                        </div>
                      </div>
                      <div className="h-4 w-16 bg-muted rounded animate-pulse" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Course Overview Skeleton */}
      <Card>
        <CardHeader>
          <div className="h-6 w-32 bg-muted rounded animate-pulse" />
          <div className="h-4 w-64 bg-muted rounded animate-pulse" />
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="h-4 w-full bg-muted rounded animate-pulse" />
          <div className="h-4 w-full bg-muted rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
        </CardContent>
      </Card>
    </div>
  );
}
