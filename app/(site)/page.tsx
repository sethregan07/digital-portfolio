import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, Clock, FileText, Lightbulb, Newspaper } from "lucide-react";

import siteMetadata, { BASE_URL } from "@/lib/metadata";
import { getRecentPosts } from "@/lib/services/content";
import { Button } from "@/components/ui/button";
import NewsletterSubscribe from "@/components/newsletter-subscribe";

export const revalidate = 300;

const editorialSerif = {
  fontFamily: "var(--font-serif), Georgia, serif",
};

const entryPoints = [
  {
    number: "01",
    title: "Get the free guide",
    description:
      "Start with a short diagnosis of five signs your thinking has been managed, plus the first actions to take the same day.",
    href: "/free-guide",
    meta: "10 min",
    icon: FileText,
    cta: "Get the guide",
  },
  {
    number: "02",
    title: "Read Lesson 1 for free",
    description:
      "Sample the course before you buy anything. The first lesson shows the tone, method, and standard of thinking the full course uses.",
    href: "/projects/deprogramming/what-is-deprogramming",
    meta: "No account needed",
    icon: BookOpen,
    cta: "Start free lesson",
  },
  {
    number: "03",
    title: "Read the framing essay",
    description:
      "Begin with the essay that explains why smart people still end up defending inherited scripts with total confidence.",
    href: "/articles/why-propaganda-works-on-smart-people",
    meta: "15-20 min",
    icon: Newspaper,
    cta: "Read the essay",
  },
  {
    number: "04",
    title: "Use a framework",
    description:
      "Jump straight to practical tools for belief audits, clearer decisions, and separating signal from noise in real situations.",
    href: "/frameworks",
    meta: "Immediate",
    icon: Lightbulb,
    cta: "Browse frameworks",
  },
];

const problemSignals = [
  "You are making decisions — in work, money, or life — and you are not fully sure which assumptions driving them are actually yours.",
  "You read widely and consume good information, but your judgment in high-stakes moments still feels less certain than it should.",
  "You have started building something independent — a business, a practice, a different way of working — and realise the bottleneck is not information, it is how you think.",
  "You want a repeatable method, not another framework to agree with.",
];

const outcomePromises = [
  {
    title: "Know which assumptions are running you",
    description:
      "Identify the specific beliefs driving your biggest decisions — in money, work, and relationships — and trace each to whether it came from examination or inheritance.",
  },
  {
    title: "Evaluate anything clearly",
    description:
      "Apply a consistent method to any new idea, institution, or opportunity — so your judgment holds up under pressure rather than defaulting to what feels familiar.",
  },
  {
    title: "Build from your own operating system",
    description:
      "Replace reactive decision-making with a deliberate framework — your archetype, your energy, your direction — so what you build reflects your actual priorities, not someone else's defaults.",
  },
];

const flagshipBullets = [
  "42 structured lessons — conditioning, media, institutions, money systems, education, family programming",
  "First 3 lessons free — the method earns the right to go deeper before you spend anything",
  "Concrete outcome: by the end, you can identify which of your current decisions are running on borrowed assumptions and have a repeatable method for any future decision",
  "10-lesson money-back guarantee — engage genuinely, see no shift, get a full refund",
];

const freeResources = [
  {
    title: "5 Signs Your Thinking Has Been Managed",
    description: "A diagnosis and a fix for each sign — in one 10-minute read.",
    tag: "Free Guide",
    href: "/free-guide",
    meta: "10 min",
    cta: "Read the guide",
  },
  {
    title: "How Much of Your Thinking Is Actually Yours?",
    description: "A 5-question quiz with a personalised result and reading path.",
    tag: "Quiz",
    href: "/quiz",
    meta: "2 min",
    cta: "Take the quiz",
  },
  {
    title: "Think Clearly in 5 Days",
    description: "A free email course on the fundamentals. One lesson per day, 8–11 minutes each.",
    tag: "Email Course",
    href: "/mini-course",
    meta: "5 days",
    cta: "Start the course",
  },
  {
    title: "The Source Audit",
    description: "Five questions for tracing any belief back to its actual origin.",
    tag: "Worksheet",
    href: "/tools#source-audit",
    meta: "10–20 min",
    cta: "Use the worksheet",
  },
  {
    title: "7 Questions Before You Believe Anything",
    description: "A media audit checklist for evaluating any story, claim, or source.",
    tag: "Checklist",
    href: "/checklist",
    meta: "Reference",
    cta: "Get the checklist",
  },
  {
    title: "Vocabulary of Conditioning",
    description: "18 key terms explained in depth — from manufactured consent to tribal epistemology.",
    tag: "Reference",
    href: "/vocabulary",
    meta: "Reference",
    cta: "Browse the vocabulary",
  },
];

const trustReasons = [
  {
    title: "Prove it before you pay for it",
    description:
      "The guide, quiz, essays, and first course lessons exist so the work can demonstrate its value before you spend anything. If the free material does not sharpen how you think, the course is not for you.",
  },
  {
    title: "A method, not a worldview",
    description:
      "Originalform does not tell you what to think. It gives you a method for examining what you already think — where it came from, whether it holds up, and what to do when it does not.",
  },
  {
    title: "Built for people already building",
    description:
      "This is not motivational content for people stuck in thinking. It is a thinking system for people already in motion — making decisions, building things, trying to trust their own judgment more.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  const title = siteMetadata.title.default;
  const description = siteMetadata.description;
  const url = BASE_URL;

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      url,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${BASE_URL}/twitter-image`],
    },
  };
}

export default async function Home() {
  const posts = await getRecentPosts(3);
  const [leadPost, ...sidePosts] = posts;

  return (
    <div className="bg-background pb-20">
      <div className="premium-panel border-b border-border/80 px-6 py-3">
        <div className="container flex max-w-5xl items-center justify-between gap-4">
          <p className="text-[12px] uppercase tracking-[0.12em] text-muted-foreground">
            <span className="font-medium text-foreground">Free:</span> The quiz, the guide, the mini-course, and the
            checklist — no account needed.
          </p>
          <Button asChild variant="outline" size="sm" className="h-8 shrink-0 px-3">
            <Link href="/free-guide">
              Get the guide <ArrowRight className="ml-1.5 h-3 w-3" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="container max-w-5xl pt-14">
        <section className="fade-up mb-20 pt-6">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
            <div className="max-w-3xl">
              <p className="mb-6 text-[12px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                A thinking system for people building something independent
              </p>
              <h1
                className="max-w-4xl text-[3.4rem] leading-[0.94] tracking-[-0.06em] text-foreground md:text-[5.35rem]"
                style={editorialSerif}
              >
                The bottleneck is not information. It is the assumptions running underneath your decisions.
              </h1>
              <p className="mt-8 max-w-2xl text-[1.1rem] leading-[1.72] text-muted-foreground">
                Originalform is a system for identifying which of your beliefs you actually chose — and which arrived
                through conditioning, social pressure, and institutional design. Start free. Go deeper if the method
                earns it.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button asChild className="h-12 px-7">
                  <Link href="/free-guide">
                    Get the free guide
                    <FileText className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-12 px-7">
                  <Link href="/projects/deprogramming/what-is-deprogramming">
                    Read Lesson 1 free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Start free. No account needed for the preview lessons. If you go deeper later, the full course includes
                a 10-lesson guarantee.
              </p>

              <div className="mt-12 grid max-w-2xl grid-cols-2 divide-x divide-y divide-border rounded-sm border border-border sm:grid-cols-4 sm:divide-y-0">
                {[
                  { num: "42", label: "lessons" },
                  { num: "3", label: "free previews" },
                  { num: "10", label: "lesson guarantee" },
                  { num: "47", label: "essays" },
                ].map((s) => (
                  <div key={s.label} className="px-4 py-4">
                    <span
                      className="mb-1 block text-xl font-semibold leading-none text-foreground"
                      style={editorialSerif}
                    >
                      {s.num}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="premium-surface-soft self-start border border-border/70 p-6">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Signals you are in the right place
              </p>
              <div className="space-y-4">
                {problemSignals.map((signal) => (
                  <div key={signal} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <p className="text-[0.98rem] leading-[1.7] text-muted-foreground">{signal}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="fade-up-delayed mb-24">
          <div className="mb-8 border-b border-border pb-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              What changes when the method clicks
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {outcomePromises.map((item) => (
              <article key={item.title} className="border border-border/60 bg-card/30 p-6">
                <h3
                  className="mb-3 text-[1.05rem] font-semibold leading-[1.3] tracking-[-0.01em] text-foreground"
                  style={editorialSerif}
                >
                  {item.title}
                </h3>
                <p className="text-[0.93rem] leading-[1.75] text-muted-foreground">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="fade-up-delayed mb-24">
          <div className="mb-8 flex items-end justify-between border-b border-border pb-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Choose your best starting point
              </p>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">
                Each path leads into the same body of work. Pick the lowest-friction entry that matches your level of
                commitment today.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {entryPoints.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.href} className="flex h-full flex-col border border-border/60 bg-card/30 p-6">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="text-[12px] uppercase tracking-[0.14em] text-muted-foreground">{item.number}</span>
                    <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                      <Icon className="h-3.5 w-3.5" />
                      {item.meta}
                    </span>
                  </div>
                  <h2
                    className="mb-3 text-[1.45rem] font-semibold tracking-[-0.03em] text-foreground"
                    style={editorialSerif}
                  >
                    {item.title}
                  </h2>
                  <p className="mb-6 text-[0.98rem] leading-[1.7] text-muted-foreground">{item.description}</p>
                  <Button asChild variant="outline" className="mt-auto h-10 rounded-sm px-5">
                    <Link href={item.href}>
                      {item.cta}
                      <ArrowRight className="ml-2 h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </article>
              );
            })}
          </div>
        </section>

        <section className="fade-up-delayed mb-24">
          <div className="mb-8 flex items-end justify-between border-b border-border pb-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Read before you buy anything
              </p>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">
                If the essays do not make you think more clearly, the course is not for you. Start with the writing and
                let the standard of the work earn the next click.
              </p>
            </div>
            <Link
              href="/articles"
              className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
            >
              Browse essays
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {leadPost ? (
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:border-b lg:border-border lg:pb-4">
              <article className="border-b border-border pb-8 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-10">
                <Link href={`/articles/${leadPost.slug}`} className="block">
                  <h2
                    className="max-w-2xl text-[2.45rem] font-extrabold leading-[0.98] tracking-[-0.05em] text-foreground transition-opacity hover:opacity-75 md:text-[3.7rem]"
                    style={editorialSerif}
                  >
                    {leadPost.title}
                  </h2>
                </Link>
                <p className="mt-5 max-w-xl text-[1.02rem] leading-[1.7] text-muted-foreground">
                  {leadPost.description || "A long-form essay from the working library."}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3 text-[12px] uppercase tracking-[0.1em] text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {leadPost.readTimeMinutes} min read
                  </span>
                  <span className="h-1 w-1 rounded-full bg-muted-foreground/60" />
                  <span>
                    {leadPost.publishedDate ? leadPost.publishedDate.toLocaleDateString() : "Recently published"}
                  </span>
                </div>
              </article>

              <div className="flex flex-col">
                {sidePosts.map((post, index) => (
                  <article
                    key={post.id}
                    className={`py-5 ${index < sidePosts.length - 1 ? "border-b border-border" : ""} ${
                      index === 0 ? "pt-0" : ""
                    }`}
                  >
                    <Link href={`/articles/${post.slug}`} className="block">
                      <h3 className="text-[1.45rem] font-semibold leading-[1.1] tracking-[-0.03em] text-foreground transition-opacity hover:opacity-75">
                        {post.title}
                      </h3>
                    </Link>
                    <p className="mt-3 text-[1rem] leading-[1.65] text-muted-foreground">
                      {post.description || "A shorter field note from the current writing desk."}
                    </p>
                    <div className="mt-3 flex items-center gap-3 text-[12px] uppercase tracking-[0.1em] text-muted-foreground">
                      <span>{post.readTimeMinutes} min</span>
                      <span className="h-1 w-1 rounded-full bg-muted-foreground/60" />
                      <span>{post.publishedDate ? post.publishedDate.toLocaleDateString() : "Recently published"}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ) : null}
        </section>

        {/* ── FREE RESOURCES GRID ── */}
        <section className="fade-up-delayed mb-24">
          <div className="mb-8 flex items-end justify-between border-b border-border pb-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Free resources — all of them
              </p>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">
                Every tool, worksheet, and guide on this site is free. No account needed.
              </p>
            </div>
            <Link
              href="/tools"
              className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
            >
              All tools
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {freeResources.map((resource) => (
              <Link
                key={resource.href}
                href={resource.href}
                className="group flex flex-col border border-border/50 bg-card/20 p-5 transition-colors hover:border-border hover:bg-card/40"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded-sm border border-border/40 px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                    {resource.tag}
                  </span>
                  <span className="text-[11px] text-muted-foreground/50">{resource.meta}</span>
                </div>
                <h3
                  className="mb-2 text-[1.05rem] font-semibold leading-[1.3] tracking-[-0.01em] text-foreground"
                  style={editorialSerif}
                >
                  {resource.title}
                </h3>
                <p className="mb-4 flex-1 text-[0.88rem] leading-[1.65] text-muted-foreground">
                  {resource.description}
                </p>
                <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.1em] text-muted-foreground/50 transition-colors group-hover:text-muted-foreground">
                  {resource.cta} <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="fade-up-delayed bg-card/35 mb-24 border border-border/70 p-7 md:p-10">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <div>
              <p className="mb-3 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Flagship course</p>
              <h2 className="text-3xl tracking-[-0.03em] text-foreground md:text-4xl" style={editorialSerif}>
                Deprogramming is the full system for figuring out which beliefs are actually yours.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
                The course takes the central question of this site and turns it into a sequence you can actually work
                through. Start with the free lessons. Unlock the rest only if the method earns the right to go deeper.
              </p>
              <div className="mt-7 space-y-3">
                {flagshipBullets.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <p className="text-[0.98rem] leading-[1.7] text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex shrink-0 flex-col gap-3">
              <Button asChild className="rounded-sm px-6">
                <Link href="/projects/deprogramming/what-is-deprogramming">
                  Read Lesson 1 free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-sm border-border/80 px-6">
                <Link href="/projects/deprogramming">See the full course</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="fade-up-delayed mb-20">
          <div className="mb-8 border-b border-border pb-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Why Originalform lands
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {trustReasons.map((item) => (
              <article key={item.title} className="border border-border/60 p-6">
                <h3
                  className="mb-2 text-[1.05rem] font-semibold leading-[1.3] tracking-[-0.02em] text-foreground"
                  style={editorialSerif}
                >
                  {item.title}
                </h3>
                <p className="text-[0.93rem] leading-[1.75] text-muted-foreground">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="fade-up-delayed border-t border-border/70 pt-10">
          <NewsletterSubscribe
            provider="mailerlite"
            title="The letter — for people building on their own terms."
            description="A letter for independent builders who need their thinking to hold up under pressure. One idea per issue — a mechanism, a framework, or a reframe — sent when there is something worth saying. Roughly twice a month. No noise, no pitch cycle."
            buttonText="Join the letter"
          />
        </section>
      </div>
    </div>
  );
}
