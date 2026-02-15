import { Metadata } from "next";
import { BookOpen, Lightbulb } from "lucide-react";

import { projects } from "@/lib/projects-data";
import { SpotlightCard } from "@/components/spotlight-card";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Projects",
    description: "My projects",
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
  const projectsByCategory = projects.reduce((acc, project) => {
    const category = project.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(project);
    return acc;
  }, {} as Record<string, typeof projects>);

  return (
    <div className="container pb-10">
      <article className="prose mx-auto max-w-5xl dark:prose-invert prose-headings:mb-3 prose-headings:mt-8 prose-headings:font-heading prose-headings:font-bold prose-headings:leading-tight hover:prose-a:text-accent-foreground prose-a:prose-headings:no-underline">
        <h1 className="mt-0 ">Projects</h1>
        <p className="m-0 text-xl ">
          Here I share my projects and work across different areas.
        </p>
        <hr className="my-4" />

        {Object.entries(projectsByCategory).map(([category, categoryProjects]) => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              {getCategoryIcon(category)}
              {category}
            </h2>
            <div className="grid items-stretch gap-4 md:grid-cols-2">
              {categoryProjects.map((item) => (
                <SpotlightCard key={item.href} {...item} />
              ))}
            </div>
          </div>
        ))}
      </article>
    </div>
  );
}
