import { ContentNavItem, NavItem } from "@/types";

import siteMetadata, { defaultAuthor } from "@/lib/metadata";

const content: ContentNavItem[] = [
  {
    title: "Articles",
    href: "/articles",
    description: "Articles on web development, technology, and life lessons",
  },
  {
    title: "Sections",
    href: "/articles",
    description: "Articles organized into categories for easy browsing",
  },
  {
    title: "Speaking",
    href: "/speaking",
    description: "My previous (and current) talks, workshops, and other speaking engagements.",
  },
  {
    title: "Videos",
    href: defaultAuthor.socialProfiles.find((platform) => platform.name === "youtube")?.link as string,
    description: "My YouTube channel where I talk about web development.",
  },
  {
    title: "Newsletter",
    href: siteMetadata.newsletterUrl as string,
    description: "My newsletter about software development",
  },
  {
    title: "Teaching",
    href: "/teaching",
    description: "I teach others. Sometimes for free, sometimes for money.",
  },
];

export const navigationLinks: NavItem[] = [
  {
    title: "Content",
    content,
  },
  {
    title: "Projects",
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
