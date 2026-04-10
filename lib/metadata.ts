import { AuthorType, SiteMetaData } from "@/types";

import { socialProfiles } from "./social-data";

export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
  `http://localhost:${process.env.PORT || 3000}`;

export const defaultAuthor: AuthorType = {
  name: "Originalform",
  handle: "@originalform",
  socialProfiles,
  email: "signal@originalform.org",
  website: BASE_URL,
  jobTitle: "Essays, frameworks, and courses for clearer thinking",
  company: "",
  availableForWork: true,
  location: {
    city: "Los Angeles, CA",
    media: "/losangeles.jpg",
  },
};

const defaultTitle = defaultAuthor.name;
const defaultDescription = "Essays, frameworks, and courses on deprogramming, power, and clearer thinking.";

const siteMetadata: SiteMetaData = {
  title: {
    template: `%s | ${defaultTitle}`,
    default: defaultTitle,
  },
  description: defaultDescription,
  siteRepo: "https://github.com/jngnandan/digital-garden-1",
  newsletterProvider: "mailerlite",
  newsletterUrl: "https://originalform.org/newsletter",
  analyticsProvider: "umami",
  defaultTheme: "dark",
  // Set activeAnnouncement: true when you have a real launch announcement to show.
  activeAnnouncement: false,
  announcement: {
    buttonText: "Start the Deprogramming course →",
    link: "/projects/deprogramming",
  },
  postsPerPage: 10,
  postsOnHomePage: 8,
  projectsOnHomePage: 4,
};

export default siteMetadata;
