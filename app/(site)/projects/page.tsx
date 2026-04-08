import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, ExternalLink, FileText, Lightbulb, Sparkles } from "lucide-react";

import { BASE_URL } from "@/lib/metadata";
import { projects } from "@/lib/projects-data";
import { Button } from "@/components/ui/button";
import { SpotlightCard } from "@/components/spotlight-card";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Offerings";
  const description =
    "Courses and frameworks designed to help you think clearly, question assumptions, and act with confidence.";
  const url = `${BASE_URL}/projects`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", url, title, description },
    twitter: { card: "summary_large_image", title, description },
  };
}

const editorialSerif = {
  fontFamily: "var(--font-serif), Georgia, serif",
};

const iconMap = {
  Deprogramming: BookOpen,
  Frameworks: Lightbulb,
} as const;

export default async function SocialPage() {
  const projectsByCategory = projects.reduce(
    (acc: Record<string, typeof projects>, project: (typeof projects)[number]) => {
      const category = project.category || "Other";
      if (!acc[category]) acc[category] = [];
      acc[category].push(project);
      return acc;
    },
    {} as Record<string, typeof projects>
  );

  return (
    <div className="bg-background pb-16">
      <div className="container max-w-5xl pt-14">
        {/* ── PAGE HEADER ── */}
        <section className="mb-16 border-b border-border pb-10 pt-6">
          <div className="max-w-3xl">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Offerings
            </p>
            <h1
              className="text-[3rem] leading-[0.96] tracking-[-0.05em] text-foreground md:text-[4.2rem]"
              style={editorialSerif}
            >
              Courses and tools designed to help you think more clearly and act with more independence.
            </h1>
            <p className="mt-5 max-w-2xl text-[1.0625rem] leading-8 text-muted-foreground">
              Practical learning paths and decision tools for people trying to question assumptions, reduce noise, and
              build more grounded judgment.
            </p>

            {/* Quick-glance strip */}
            <div className="mt-8 grid max-w-xs grid-cols-3 divide-x divide-border rounded-sm border border-border">
              {[
                { num: "42", label: "lessons" },
                { num: "Free", label: "to start" },
                { num: "1", label: "workbook" },
              ].map((s) => (
                <div key={s.label} className="px-4 py-3">
                  <span
                    className="mb-1 block text-lg font-semibold leading-none text-foreground"
                    style={editorialSerif}
                  >
                    {s.num}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CATEGORIES ── */}
        {Object.entries(projectsByCategory).map(([category, categoryProjects]) => {
          return (
            <section key={category} className="mb-20">
              {/* Section label */}
              <div className="mb-8 flex items-baseline justify-between border-b border-border pb-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {category}
                </p>
                <span className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground/50">
                  {categoryProjects.length} {categoryProjects.length === 1 ? "offering" : "offerings"}
                </span>
              </div>

              <div className="grid w-full items-stretch justify-items-stretch gap-6">
                {categoryProjects.map((item) => {
                  const Icon = iconMap[item.title as keyof typeof iconMap] ?? Sparkles;
                  return <SpotlightCard key={item.href} {...item} icon={<Icon className="h-8 w-8" />} />;
                })}
              </div>

              {/* Featured tools — shown under Frameworks */}
              {category === "Frameworks" && (
                <div className="mt-12 border-t border-border/60 pt-10">
                  <div className="mb-8">
                    <p className="mb-2 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                      Standalone tools
                    </p>
                    <h3 className="text-[1.6rem] font-semibold tracking-[-0.03em] text-foreground">
                      Smaller tools with a single, useful outcome.
                    </h3>
                    <p className="mt-3 max-w-xl text-[1.0625rem] leading-8 text-muted-foreground">
                      Focused tools you can use quickly without committing to a larger program. More are on the way.
                    </p>
                  </div>

                  {/* Tools grid — full 2-col so it doesn't orphan */}
                  <div className="grid gap-6 md:grid-cols-2">
                    {/* False Needs */}
                    <div className="flex flex-col gap-4 rounded-sm border border-border/70 bg-card/40 p-6">
                      <div className="flex flex-wrap gap-2">
                        {["Workbook", "Gumroad"].map((tag) => (
                          <span
                            key={tag}
                            className="rounded-sm border border-border/60 px-2 py-1 text-[11px] uppercase tracking-[0.12em] text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-border/70 bg-muted/20 text-foreground">
                          <FileText className="h-4 w-4" />
                        </span>
                        <h4 className="text-base font-medium text-foreground">False Needs</h4>
                      </div>
                      <p className="text-[1.0625rem] leading-8 text-muted-foreground">
                        A short workbook to separate real needs from manufactured wants and make more grounded
                        decisions.
                      </p>
                      <div className="mt-auto pt-2">
                        <Button asChild size="sm" variant="outline" className="rounded-sm border-border/80">
                          <a
                            href="https://originalform.gumroad.com/l/falseneeds?layout=profile"
                            target="_blank"
                            rel="noreferrer"
                          >
                            View on Gumroad
                            <ExternalLink className="ml-2 h-3 w-3" />
                          </a>
                        </Button>
                      </div>
                    </div>

                    {/* Coming soon slot */}
                    <div className="flex items-center justify-center rounded-sm border border-dashed border-border/50 px-6 py-10 text-center">
                      <div>
                        <p className="mb-2 text-[11px] uppercase tracking-[0.16em] text-muted-foreground/60">
                          More tools
                        </p>
                        <p className="text-muted-foreground/55 text-[1.0625rem] font-light leading-8">
                          In progress — check back soon.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </section>
          );
        })}

        {/* ── BOTTOM CTA ── */}
        <section className="border-t border-border pt-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-2 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                Not sure where to start?
              </p>
              <p className="max-w-md text-[1.0625rem] leading-8 text-muted-foreground">
                The Deprogramming course is the best entry point — it connects all three territories into a single path.
              </p>
            </div>
            <Button asChild className="shrink-0 rounded-sm px-6">
              <Link href="/projects/deprogramming">
                Start Deprogramming
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
