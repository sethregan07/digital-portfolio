import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function PostLoading() {
  return (
    <div className="container max-w-6xl pb-10">
      {/* Breadcrumb Skeleton */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="hidden items-center gap-1 text-sm text-muted-foreground md:flex md:flex-row">
          <li>
            <div className="h-4 w-12 bg-muted rounded animate-pulse" />
          </li>
          <li className="rtl:rotate-180">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </li>
          <li>
            <div className="h-4 w-16 bg-muted rounded animate-pulse" />
          </li>
          <li className="rtl:rotate-180">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </li>
          <li>
            <div className="h-4 w-32 bg-muted rounded animate-pulse" />
          </li>
        </ol>
      </nav>

      <div className="flex flex-col lg:flex-row lg:gap-8">
        {/* Mobile TOC Skeleton */}
        <div className="lg:hidden mb-4">
          <div className="mb-4 mt-1 text-sm leading-snug text-muted-foreground">
            <div className="h-4 w-24 bg-muted rounded animate-pulse mb-2" />
            <div className="h-4 w-32 bg-muted rounded animate-pulse" />
          </div>
          <div className="border rounded-lg p-4">
            <div className="h-6 w-32 bg-muted rounded animate-pulse mb-3" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-muted rounded animate-pulse" />
              <div className="h-4 w-4/5 bg-muted rounded animate-pulse" />
              <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
            </div>
          </div>
        </div>

        {/* Article Skeleton */}
        <article className="prose max-w-7xl dark:prose-invert lg:max-w-2xl lg:pr-8">
          <div className="h-12 w-4/5 bg-muted rounded animate-pulse mb-4" />
          <div className="h-6 w-full bg-muted rounded animate-pulse mb-2" />
          <div className="h-6 w-3/4 bg-muted rounded animate-pulse mb-6" />
          <div className="h-px bg-muted rounded animate-pulse mb-6" />

          {/* Content blocks */}
          <div className="space-y-4 mb-8">
            <div className="h-4 w-full bg-muted rounded animate-pulse" />
            <div className="h-4 w-full bg-muted rounded animate-pulse" />
            <div className="h-4 w-5/6 bg-muted rounded animate-pulse" />
            <div className="h-6 w-1/2 bg-muted rounded animate-pulse mt-6" />
            <div className="h-4 w-full bg-muted rounded animate-pulse" />
            <div className="h-4 w-4/5 bg-muted rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
          </div>

          <div className="h-px bg-muted rounded animate-pulse mb-6" />

          {/* Tags and share */}
          <div className="flex flex-row items-center justify-between">
            <div className="flex gap-2">
              <div className="h-6 w-12 bg-muted rounded-full animate-pulse" />
              <div className="h-6 w-16 bg-muted rounded-full animate-pulse" />
              <div className="h-6 w-14 bg-muted rounded-full animate-pulse" />
            </div>
            <div className="h-8 w-20 bg-muted rounded animate-pulse" />
          </div>
        </article>

        {/* Sidebar Skeleton */}
        <aside className="hidden lg:block">
          <Card className="sticky top-28 mb-4">
            <CardHeader>
              <CardTitle>
                <div className="h-6 w-32 bg-muted rounded animate-pulse" />
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="space-y-2">
                <div className="h-4 w-full bg-muted rounded animate-pulse" />
                <div className="h-4 w-4/5 bg-muted rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-muted rounded animate-pulse" />
              </div>
            </CardContent>
            <Separator />
            <CardFooter>
              <div className="mb-4 mt-1 text-sm leading-snug text-muted-foreground w-full">
                <div className="h-4 w-24 bg-muted rounded animate-pulse mb-2" />
                <div className="h-4 w-32 bg-muted rounded animate-pulse mb-1" />
                <div className="h-4 w-28 bg-muted rounded animate-pulse" />
              </div>
            </CardFooter>
          </Card>
        </aside>
      </div>
    </div>
  );
}