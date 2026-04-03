import { ContentNavItem, NavItem } from "@/types";

const content: ContentNavItem[] = [
  {
    title: "Articles",
    href: "/articles",
    description: "Essays, notes, and arguments on conditioning, systems, and clearer thinking.",
  },
];

export const navigationLinks: NavItem[] = [
  {
    title: "Content",
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
    title: "Offerings",
    href: "/projects",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];
