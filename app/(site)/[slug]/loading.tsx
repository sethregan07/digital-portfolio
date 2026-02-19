export default function PageLoading() {
  return (
    <div className="container max-w-6xl pb-10">
      <article className="prose mx-auto max-w-5xl dark:prose-invert">
        <div className="h-12 w-3/4 bg-muted rounded animate-pulse mb-4" />
        <div className="h-6 w-full bg-muted rounded animate-pulse mb-2" />
        <div className="h-6 w-2/3 bg-muted rounded animate-pulse mb-6" />
        <div className="h-4 w-32 bg-muted rounded animate-pulse mb-8" />
        <div className="h-px bg-muted rounded animate-pulse mb-8" />

        {/* Content blocks */}
        <div className="space-y-4">
          <div className="h-4 w-full bg-muted rounded animate-pulse" />
          <div className="h-4 w-full bg-muted rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-muted rounded animate-pulse" />
          <div className="h-6 w-1/2 bg-muted rounded animate-pulse mt-6" />
          <div className="h-4 w-full bg-muted rounded animate-pulse" />
          <div className="h-4 w-4/5 bg-muted rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
          <div className="h-6 w-3/5 bg-muted rounded animate-pulse mt-6" />
          <div className="h-4 w-full bg-muted rounded animate-pulse" />
          <div className="h-4 w-4/5 bg-muted rounded animate-pulse" />
        </div>
      </article>
    </div>
  );
}