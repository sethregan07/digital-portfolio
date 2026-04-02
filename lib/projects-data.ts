export type ProjectItem = {
  title: string;
  description: string;
  href: string;
  mediaType?: "icon" | "video" | "image";
  mediaSrc?: string;
  iconName?: "book-open" | "lightbulb";
  category?: string;
  tag?: string;
  highlights?: string[];
  forWhom?: string;
  outcome?: string;
  proof?: string;
  meta?: string;
  priceNote?: string;
  ctaLabel?: string;
};

export const projects: ProjectItem[] = [
  {
    title: "Deprogramming",
    description: `A guided course to help you recognize conditioning, think independently, and build your own worldview.`,
    forWhom: "Curious, skeptical learners ready to challenge inherited narratives",
    outcome: "A clear personal framework and actionable ways to test beliefs",
    highlights: [
      "Spot social and self-conditioning patterns",
      "Build your own grounded worldview",
      "Apply systems thinking in daily life",
    ],
    meta: "42 lessons • self-paced",
    proof: "Built from 30+ classic sources and original frameworks",
    priceNote: "Signature program",
    ctaLabel: "Explore the course",
    href: "/projects/deprogramming",
    mediaType: "icon",
    iconName: "book-open",
    category: "Deprogramming",
  },
  {
    title: "Frameworks",
    description: `Decision tools, templates, and checklists for navigating complex problems with clarity.`,
    forWhom: "Teams, mentors, and anyone making high-stakes choices",
    outcome: "Faster, more confident decisions with less noise",
    highlights: [
      "Decision templates you can reuse",
      "Mental models for clearer thinking",
      "Actionable tools for real situations",
    ],
    meta: "Living library",
    proof: "Field-tested in projects, writing, and mentorship work",
    priceNote: "Free + paid",
    ctaLabel: "Browse frameworks",
    href: "/frameworks",
    mediaType: "icon",
    iconName: "lightbulb",
    category: "Frameworks",
  },
];
