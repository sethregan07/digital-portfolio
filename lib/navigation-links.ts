import { ContentNavItem, NavGroup, NavItem } from "@/types";

// ── EXPLORE dropdown — two groups ──────────────────────────────────────────
const readGroup: NavGroup = {
  label: "Read",
  items: [
    {
      title: "Start Here",
      href: "/start-here",
      description: "New? The fastest path in — four steps in the right order.",
    },
    {
      title: "Articles",
      href: "/articles",
      description: "Essays on conditioning, systems, and clearer thinking.",
    },
    {
      title: "Reading Series",
      href: "/articles/series",
      description: "Four curated series mapping to the Originalform stages.",
    },
    {
      title: "The Letter",
      href: "/letter",
      description: "One idea per issue, sent when there is something worth saying.",
    },
  ],
};

const toolsGroup: NavGroup = {
  label: "Free tools",
  items: [
    {
      title: "Free Guide",
      href: "/free-guide",
      description: "5 Signs Your Thinking Has Been Managed — diagnosis and fixes.",
    },
    {
      title: "Quiz",
      href: "/quiz",
      description: "How much of your thinking is actually yours? 5 questions.",
    },
    {
      title: "Mini-Course",
      href: "/mini-course",
      description: "Think Clearly in 5 Days — one email lesson per day, free.",
    },
    {
      title: "Notion Templates",
      href: "/templates",
      description: "12-Week Year planner, Make Time system, energy calendar.",
    },
    {
      title: "All Tools",
      href: "/tools",
      description: "Checklists, worksheets, and vocabulary reference.",
    },
  ],
};

// ── THE SYSTEM dropdown — two groups ───────────────────────────────────────
const foundationGroup: NavGroup = {
  label: "Foundation",
  items: [
    {
      title: "The Full System",
      href: "/system",
      description: "The complete 8-stage map — from deprogramming to building.",
    },
    {
      title: "Stage 01 — Deprogram",
      href: "/projects/deprogramming",
      description: "The flagship course. 42 lessons, free to start.",
    },
    {
      title: "Stage 02 — Understand",
      href: "/understand",
      description: "How debt, money, and institutional incentives actually work.",
    },
    {
      title: "Stage 03 — Exit",
      href: "/exit",
      description: "Practical routes out of dependencies that constrain you.",
    },
    {
      title: "Stage 04 — Heal",
      href: "/healing",
      description: "Clear what intellectual work alone cannot reach.",
    },
  ],
};

const discoverGroup: NavGroup = {
  label: "Discover & Build",
  items: [
    {
      title: "Stage 05 — Archetype",
      href: "/archetypes",
      description: "Find your role — Visionary, Seeker, Connector, or Builder.",
    },
    {
      title: "Stage 05 — Gifts",
      href: "/gifts",
      description: "Name the capacities that were always underneath the conditioning.",
    },
    {
      title: "Stage 05 — North Star",
      href: "/north-star",
      description: "Five questions for finding the direction that is genuinely yours.",
    },
    {
      title: "Stage 06 — Build",
      href: "/build",
      description: "The 12-week framework and energy calendar for your life.",
    },
  ],
};

// Flat list still needed for active-state detection in navbar
export const exploreItems: ContentNavItem[] = [...readGroup.items, ...toolsGroup.items];

export const systemItems: ContentNavItem[] = [...foundationGroup.items, ...discoverGroup.items];

export const navigationLinks: NavItem[] = [
  {
    title: "Explore",
    groups: [readGroup, toolsGroup],
    content: exploreItems,
  },
  {
    title: "The System",
    groups: [foundationGroup, discoverGroup],
    content: systemItems,
  },
  {
    title: "Course",
    href: "/projects/deprogramming",
  },
  {
    title: "About",
    href: "/about",
  },
];
