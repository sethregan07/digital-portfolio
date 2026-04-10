import { ContentNavItem, NavItem } from "@/types";

const content: ContentNavItem[] = [
  {
    title: "Start Here",
    href: "/start-here",
    description: "New to Originalform? The fastest path in — four steps in the right order.",
  },
  {
    title: "Articles",
    href: "/articles",
    description: "Essays, notes, and arguments on conditioning, systems, and clearer thinking.",
  },
  {
    title: "Free Guide",
    href: "/free-guide",
    description: "5 Signs Your Thinking Has Been Managed — free download with action steps.",
  },
  {
    title: "The Letter",
    href: "/letter",
    description: "A letter on thinking clearly. One idea per issue, sent when there is something worth saying.",
  },
  {
    title: "Free Tools",
    href: "/tools",
    description: "Worksheets and frameworks for examining your thinking. Free, standalone, immediately usable.",
  },
];

export const navigationLinks: NavItem[] = [
  {
    title: "Read",
    content,
  },
  {
    title: "Resources",
    href: "/resources",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Course",
    href: "/projects/deprogramming",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];
