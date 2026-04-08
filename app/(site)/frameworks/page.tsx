import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Brain,
  Compass,
  DollarSign,
  Lightbulb,
  Network,
  Scale,
  Target,
  Users,
  Zap,
} from "lucide-react";

import { BASE_URL } from "@/lib/metadata";
import { Button } from "@/components/ui/button";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Frameworks";
  const description =
    "Mental models and structured tools for clearer decisions, grounded living, and independent thinking.";
  const url = `${BASE_URL}/frameworks`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", url, title, description },
    twitter: { card: "summary_large_image", title, description },
  };
}

const editorialSerif = {
  fontFamily: "var(--font-serif), Georgia, serif",
};

// Consolidated to 4 meaningful sections, each framework has a "use when" line
const frameworkSections = [
  {
    label: "Thinking & Decisions",
    icon: Brain,
    description: "Tools for making clearer choices under uncertainty and noise.",
    items: [
      {
        title: "Rational Choice Under Uncertainty",
        icon: Target,
        tags: ["Decision Making", "Analysis"],
        description:
          "Systematic framework for decisions under uncertainty using probability assessment and expected value.",
        useWhen: "You're stuck between options and emotion is drowning out the signal.",
      },
      {
        title: "Long-term Thinking",
        icon: Compass,
        tags: ["Strategy", "Future"],
        description: "Evaluating decisions through second and third-order effects and future scenario planning.",
        useWhen: "A decision feels urgent but the real cost shows up years later.",
      },
      {
        title: "Ethical Decision Framework",
        icon: Scale,
        tags: ["Ethics", "Values"],
        description: "Multi-dimensional approach considering consequences, principles, and stakeholder impact.",
        useWhen: "The right answer isn't obvious and competing values are pulling in different directions.",
      },
      {
        title: "Systems Thinking",
        icon: Network,
        tags: ["Systems", "Society"],
        description: "Understanding complex systems, feedback loops, and interconnected structures.",
        useWhen: "A problem keeps coming back no matter how many times you fix the surface symptom.",
      },
    ],
  },
  {
    label: "Conditioning & Identity",
    icon: Lightbulb,
    description: "Frameworks for spotting inherited beliefs and rebuilding a grounded worldview.",
    items: [
      {
        title: "Belief Audit",
        icon: Brain,
        tags: ["Identity", "Deprogramming"],
        description: "A structured process for identifying which of your beliefs were chosen and which were installed.",
        useWhen: "You hold a strong opinion but can't remember where it came from or why.",
      },
      {
        title: "Life Purpose Matrix",
        icon: Compass,
        tags: ["Identity", "Values"],
        description: "Identifying core values and purpose through self-reflection and pattern recognition.",
        useWhen: "You're productive but not sure what you're building toward or whether it's yours.",
      },
      {
        title: "Cultural Intelligence",
        icon: Users,
        tags: ["Culture", "Awareness"],
        description: "Understanding and navigating cultural differences, scripts, and cross-cultural communication.",
        useWhen: "You're trying to separate what's universal human behavior from what's culturally installed.",
      },
    ],
  },
  {
    label: "Work & Execution",
    icon: Zap,
    description: "Practical tools for getting things done without burning out or drifting.",
    items: [
      {
        title: "Goal Setting with OKRs",
        icon: Target,
        tags: ["Productivity", "Planning"],
        description: "Structured approach to setting and tracking meaningful goals with milestones and metrics.",
        useWhen: "You have ambition but it's scattered — lots of motion, not much direction.",
      },
      {
        title: "Productivity Systems",
        icon: Zap,
        tags: ["Productivity", "Efficiency"],
        description: "Integrated framework combining time management, task prioritization, and energy optimization.",
        useWhen: "You're always busy but rarely feel like you moved the right things forward.",
      },
      {
        title: "Learning Acceleration",
        icon: BookOpen,
        tags: ["Education", "Skills"],
        description: "Acquiring new skills efficiently through deliberate practice and spaced repetition.",
        useWhen: "You want to go deep on something fast without the forgetting curve undoing the work.",
      },
    ],
  },
  {
    label: "Money & Independence",
    icon: DollarSign,
    description: "Tools for separating conditioned money beliefs from grounded financial thinking.",
    items: [
      {
        title: "Money Psychology",
        icon: DollarSign,
        tags: ["Psychology", "Mindset"],
        description: "Understanding money mindset, behavioral economics, and emotional relationships with wealth.",
        useWhen: "Your financial decisions feel rational in the moment but irrational in retrospect.",
      },
      {
        title: "Wealth Building Framework",
        icon: ArrowRight,
        tags: ["Investing", "Wealth"],
        description: "Systematic approach to building wealth through saving, investing, and risk management.",
        useWhen: "You earn reasonably but can't explain where the money goes or what it's building.",
      },
      {
        title: "Financial Independence Roadmap",
        icon: Target,
        tags: ["Independence", "Planning"],
        description: "Path to financial independence through budgeting, debt management, and passive income.",
        useWhen: "You want to make work optional, not just retire — and need a map, not motivation.",
      },
    ],
  },
];

export default function FrameworksPage() {
  const totalFrameworks = frameworkSections.reduce((acc, s) => acc + s.items.length, 0);

  return (
    <div className="bg-background pb-16">
      <div className="container max-w-5xl pt-14">
        {/* ── HEADER ── */}
        <section className="mb-16 border-b border-border pb-10 pt-6">
          <div className="max-w-3xl">
            <div className="mb-4 flex items-center gap-2">
              <Lightbulb className="h-3.5 w-3.5 text-muted-foreground" />
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Frameworks</p>
            </div>
            <h1
              className="text-[3rem] leading-[0.96] tracking-[-0.05em] text-foreground md:text-[4.2rem]"
              style={editorialSerif}
            >
              Mental models and tools for clearer decisions.
            </h1>
            <p className="mt-5 max-w-2xl text-base font-light leading-8 text-muted-foreground">
              These tools translate the site's core themes into something usable. Each one has a specific situation it's
              built for — start with the problem in front of you, not the most interesting-looking framework.
            </p>

            {/* How to use note */}
            <div className="mt-7 border-l-2 border-border/50 pl-5">
              <p className="text-[1rem] font-light italic leading-8 text-muted-foreground">
                Each framework includes a "use when" line — that's the most important part. A tool used in the wrong
                situation produces confident wrong answers.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-8 grid max-w-xs grid-cols-3 divide-x divide-border rounded-sm border border-border">
              {[
                { num: totalFrameworks.toString(), label: "frameworks" },
                { num: frameworkSections.length.toString(), label: "categories" },
                { num: "Free", label: "to use" },
              ].map((s) => (
                <div key={s.label} className="px-4 py-3">
                  <span
                    className="mb-1 block text-lg font-semibold leading-none text-foreground"
                    style={editorialSerif}
                  >
                    {s.num}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTIONS ── */}
        {frameworkSections.map((section) => {
          const SectionIcon = section.icon;
          return (
            <section key={section.label} className="mb-20">
              {/* Section header with description */}
              <div className="mb-8 border-b border-border/70 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <SectionIcon className="h-3.5 w-3.5 text-muted-foreground" />
                    <p className="text-[12px] uppercase tracking-[0.16em] text-muted-foreground">{section.label}</p>
                  </div>
                  <span className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground/50">
                    {section.items.length} tools
                  </span>
                </div>
                <p className="mt-2 max-w-xl text-[1rem] font-light leading-7 text-muted-foreground/75">
                  {section.description}
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {section.items.map((item) => {
                  const ItemIcon = item.icon;
                  return (
                    <article key={item.title} className="bg-card/35 flex flex-col border border-border/70 p-6">
                      {/* Icon + title */}
                      <div className="mb-4 flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-border/70 bg-muted/20">
                          <ItemIcon className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <h2
                          className="pt-0.5 text-[1.12rem] leading-snug tracking-[-0.01em] text-foreground"
                          style={editorialSerif}
                        >
                          {item.title}
                        </h2>
                      </div>

                      {/* Description */}
                      <p className="mb-4 text-[1rem] font-light leading-8 text-muted-foreground">{item.description}</p>

                      {/* Use when — the key addition */}
                      <div className="mt-auto border-t border-border/50 pt-4">
                        <p className="mb-1.5 text-[11px] uppercase tracking-[0.1em] text-muted-foreground/60">
                          Use when
                        </p>
                        <p className="text-sm font-light italic leading-7 text-muted-foreground/75">{item.useWhen}</p>
                      </div>

                      {/* Tags */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="border border-border/60 px-2 py-0.5 text-[11px] uppercase tracking-[0.08em] text-muted-foreground/70"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}

        {/* ── BOTTOM CTA ── */}
        <section className="border border-border/70 bg-card/40 p-7 md:p-10">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
            <div>
              <p className="mb-3 text-[12px] uppercase tracking-[0.16em] text-muted-foreground">Go deeper</p>
              <h2 className="mb-3 text-2xl tracking-[-0.02em] text-foreground" style={editorialSerif}>
                The Deprogramming course puts these tools into sequence.
              </h2>
              <p className="max-w-md text-[1rem] font-light leading-8 text-muted-foreground">
                Frameworks are more useful when you understand the conditioning they're working against. The course
                builds that context across 42 lessons.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3">
              <Button asChild className="rounded-sm px-6">
                <Link href="/projects/deprogramming">
                  Start the course
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-sm border-border/80 px-6">
                <Link href="/contact">Work with me</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
