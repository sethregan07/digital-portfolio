import { Metadata } from "next";
import { BookOpen, Lightbulb, Sparkles } from "lucide-react";

import { BASE_URL } from "@/lib/metadata";
import { projects } from "@/lib/projects-data";
import { SpotlightCard } from "@/components/spotlight-card";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Offerings";
  const description = "Courses and frameworks designed to help you think clearly, question assumptions, and act with confidence.";
  const url = `${BASE_URL}/projects`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      url,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Deprogramming":
      return <BookOpen className="inline-block mr-2 h-6 w-6 text-muted-foreground" />;
    case "Frameworks":
      return <Lightbulb className="inline-block mr-2 h-6 w-6 text-muted-foreground" />;
    default:
      return null;
  }
};

export default async function SocialPage() {
  // Group projects by category
  const projectsByCategory = projects.reduce(
    (acc: Record<string, typeof projects>, project: (typeof projects)[number]) => {
    const category = project.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(project);
    return acc;
  }, {} as Record<string, typeof projects>);

  const iconMap = {
    Deprogramming: BookOpen,
    Frameworks: Lightbulb,
  } as const;

  return (
    <div className="container pb-10">
      <article className="prose mx-auto max-w-5xl dark:prose-invert prose-headings:mb-3 prose-headings:mt-8 prose-headings:font-heading prose-headings:font-bold prose-headings:leading-tight hover:prose-a:text-accent-foreground prose-a:prose-headings:no-underline">
        <h1 className="mt-0 ">Offerings</h1>
        <p className="m-0 text-xl ">
          Practical learning paths and tools that help you break patterns, build clarity, and apply systems thinking in real life.
        </p>
        <hr className="my-4" />

        {Object.entries(projectsByCategory).map(([category, categoryProjects]) => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              {getCategoryIcon(category)}
              {category}
            </h2>
            <div className="grid items-stretch gap-4 md:grid-cols-2">
              {categoryProjects.map((item) => {
                const Icon = iconMap[item.title as keyof typeof iconMap] ?? Sparkles;
                return (
                  <SpotlightCard
                    key={item.href}
                    {...item}
                    icon={<Icon className="h-8 w-8" />}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </article>
    </div>
  );
}
