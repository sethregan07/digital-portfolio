import { ContentNavItem, NavItem } from "@/types";

import siteMetadata, { defaultAuthor } from "@/lib/metadata";

const content: ContentNavItem[] = [
  {
    title: "Articles",
    href: "/articles",
    description: "Articles on web development, technology, and life lessons",
  },
  {
    title: "Newsletter Series",
    href: siteMetadata.newsletterUrl as string,
    description: "My newsletter about software development",
  },
];

export const navigationLinks: NavItem[] = [
  {
    title: "Content",
    content,
  },
  {
    title: "Offerings",
    href: "/projects",
  },
  {
    title: "Resources",
    href: "/resources",
  },
  {
    title: "Now",
    href: "/now",
  },
];
