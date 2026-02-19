import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function ArticlesLoading() {
  return (
    <div className="container mb-4">
      <div className="prose mx-auto max-w-5xl dark:prose-invert">
        <div className="h-12 w-48 bg-muted rounded animate-pulse mb-4" />
        <div className="h-px bg-muted rounded animate-pulse mb-8" />

        {/* Categories */}
        {[1, 2, 3].map((category, categoryIndex) => (
          <div key={category} className="mb-12">
            <div
              className="h-8 w-64 bg-muted rounded animate-pulse mb-6"
              style={{ animationDelay: `${categoryIndex * 200}ms` }}
            />

            {/* Article previews */}
            <div className="grid grid-flow-row gap-2">
              {[1, 2, 3, 4].map((article, articleIndex) => (
                <article
                  key={article}
                  className="w-full rounded-md p-4 bg-muted/50 animate-pulse"
                  style={{ animationDelay: `${(categoryIndex * 200) + (articleIndex * 100)}ms` }}
                >
                  <div className="h-8 w-3/4 bg-muted rounded mb-2" />
                  <div className="flex gap-2 mb-4">
                    <div className="h-4 w-24 bg-muted rounded" />
                    <div className="h-4 w-20 bg-muted rounded" />
                  </div>
                  <div className="flex gap-2 mb-4">
                    <div className="h-6 w-16 bg-muted rounded-full" />
                    <div className="h-6 w-20 bg-muted rounded-full" />
                  </div>
                  <div className="h-4 w-full bg-muted rounded mb-1" />
                  <div className="h-4 w-2/3 bg-muted rounded" />
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}