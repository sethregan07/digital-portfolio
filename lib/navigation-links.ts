import { ContentNavItem, NavItem } from "@/types";

const readContent: ContentNavItem[] = [
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
    title: "Reading Series",
    href: "/articles/series",
    description: "Four curated series mapping to the Originalform stages — follow a thread start to finish.",
  },
  {
    title: "The Letter",
    href: "/letter",
    description: "A letter on thinking clearly. One idea per issue, sent when there is something worth saying.",
  },
  {
    title: "Free Guide",
    href: "/free-guide",
    description: "5 Signs Your Thinking Has Been Managed — diagnosis and fixes.",
  },
  {
    title: "Mini-Course",
    href: "/mini-course",
    description: "Think Clearly in 5 Days — one email lesson per day, free.",
  },
  {
    title: "Quiz",
    href: "/quiz",
    description: "How much of your thinking is actually yours? 5 questions, personalised result.",
  },
  {
    title: "Free Tools",
    href: "/tools",
    description: "Worksheets, checklists, and references for examining your thinking.",
  },
];

const systemContent: ContentNavItem[] = [
  {
    title: "The Full System",
    href: "/system",
    description: "The complete 8-stage journey — from deprogramming to discovering your original form.",
  },
  {
    title: "Understand",
    href: "/understand",
    description: "How debt, money, and institutional incentives actually work. Stage 02.",
  },
  {
    title: "Exit Routes",
    href: "/exit",
    description: "Practical paths to reducing the dependencies that constrain your choices. Stage 03.",
  },
  {
    title: "Healing",
    href: "/healing",
    description: "Clear what intellectual work alone cannot reach — stored patterns in the body. Stage 04.",
  },
  {
    title: "Find Your Archetype",
    href: "/archetypes",
    description: "Discover your role — Visionary, Seeker, Connector, or Builder. Stage 05.",
  },
  {
    title: "Your Gifts",
    href: "/gifts",
    description: "Find and name the capacities that were always there underneath the conditioning. Stage 05.",
  },
  {
    title: "Your North Star",
    href: "/north-star",
    description: "Five questions for finding the direction that is genuinely yours. Stage 05.",
  },
  {
    title: "Build",
    href: "/build",
    description: "The 12-week framework and energy calendar for a life built around who you are. Stage 06.",
  },
];

export const navigationLinks: NavItem[] = [
  {
    title: "Read",
    content: readContent,
  },
  {
    title: "The System",
    content: systemContent,
  },
  {
    title: "Course",
    href: "/projects/deprogramming",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];
