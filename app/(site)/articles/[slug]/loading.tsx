import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function ArticleLoading() {
  return (
    <div className="container max-w-7xl pb-10">
      <nav aria-label="Breadcrumb" className="mb-5">
        <div className="flex items-center gap-2 text-sm">
          <div className="h-4 w-4 rounded bg-muted animate-pulse" />
          <div className="h-4 w-1 rounded bg-muted animate-pulse" />
          <div className="h-4 w-16 rounded bg-muted animate-pulse" />
          <div className="h-4 w-1 rounded bg-muted animate-pulse" />
          <div className="h-4 w-32 rounded bg-muted animate-pulse" />
        </div>
      </nav>

      <header className="border-b pb-6">
        <div className="mb-3 flex gap-2">
          <div className="h-6 w-20 rounded bg-muted animate-pulse" />
          <div className="h-6 w-28 rounded bg-muted animate-pulse" />
        </div>
        <div className="mb-3 h-10 w-4/5 rounded bg-muted animate-pulse" />
        <div className="h-6 w-2/3 rounded bg-muted animate-pulse" />
        <div className="mt-4 flex gap-4">
          <div className="h-4 w-24 rounded bg-muted animate-pulse" />
          <div className="h-4 w-32 rounded bg-muted animate-pulse" />
          <div className="h-4 w-28 rounded bg-muted animate-pulse" />
        </div>
      </header>

      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div>
          <div className="mb-4 lg:hidden">
            <div className="h-10 w-full rounded border bg-muted/40 animate-pulse" />
          </div>

          <article className="space-y-4">
            <div className="h-4 w-full rounded bg-muted animate-pulse" />
            <div className="h-4 w-full rounded bg-muted animate-pulse" />
            <div className="h-4 w-5/6 rounded bg-muted animate-pulse" />
            <div className="h-8 w-1/2 rounded bg-muted animate-pulse mt-3" />
            <div className="h-4 w-full rounded bg-muted animate-pulse" />
            <div className="h-4 w-4/5 rounded bg-muted animate-pulse" />
            <div className="h-4 w-3/4 rounded bg-muted animate-pulse" />
          </article>

          <Separator className="my-6" />

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="h-9 w-28 rounded bg-muted animate-pulse" />
            <div className="flex gap-2">
              <div className="h-9 w-36 rounded bg-muted animate-pulse" />
              <div className="h-9 w-36 rounded bg-muted animate-pulse" />
            </div>
          </div>
        </div>

        <aside className="hidden lg:block">
          <Card className="sticky top-28">
            <CardHeader>
              <CardTitle>
                <div className="h-6 w-36 rounded bg-muted animate-pulse" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="h-4 w-full rounded bg-muted animate-pulse" />
              <div className="h-4 w-4/5 rounded bg-muted animate-pulse" />
              <div className="h-4 w-3/4 rounded bg-muted animate-pulse" />
            </CardContent>
            <Separator />
            <CardFooter>
              <div className="w-full space-y-2">
                <div className="h-4 w-24 rounded bg-muted animate-pulse" />
                <div className="h-4 w-28 rounded bg-muted animate-pulse" />
              </div>
            </CardFooter>
          </Card>
        </aside>
      </div>
    </div>
  );
}
