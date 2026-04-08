import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Clock,
  Compass,
  ExternalLink,
  Eye,
  FileText,
  Lightbulb,
  Mail,
  Newspaper,
} from "lucide-react";

import { defaultAuthor } from "@/lib/metadata";
import { getRecentPosts } from "@/lib/services/content";
import { Button } from "@/components/ui/button";
import NewsletterSubscribe from "@/components/newsletter-subscribe";

export const revalidate = 300;

const editorialSerif = {
  fontFamily: "var(--font-serif), Georgia, serif",
};

const startHereLinks = [
  {
    number: "01",
    title: "Now",
    description: "A quick status page with current focus, priorities, and what is actively moving.",
    href: "/now",
    icon: Compass,
  },
  {
    number: "02",
    title: "Frameworks",
    description: "Decision tools and mental models built to reduce noise and improve judgment.",
    href: "/frameworks",
    icon: Lightbulb,
  },
  {
    number: "03",
    title: "Deprogramming",
    description: "A structured course for examining conditioning and rebuilding a grounded worldview.",
    href: "/projects/deprogramming",
    icon: BookOpen,
  },
  {
    number: "04",
    title: "Articles",
    description: "Long-form essays, field notes, and working ideas that are still being sharpened.",
    href: "/articles",
    icon: Newspaper,
  },
];

export default async function Home() {
  const posts = await getRecentPosts(3);
  const [leadPost, ...sidePosts] = posts;

  return (
    <div className="bg-background pb-20">
      {/* ── COURSE ANNOUNCEMENT BAR ── */}
      <div className="premium-panel border-b border-border/80 px-6 py-3">
        <div className="container flex max-w-5xl items-center justify-between gap-4">
          <p className="text-[12px] uppercase tracking-[0.12em] text-muted-foreground">
            <span className="font-medium text-foreground">New:</span> Deprogramming — a 42-lesson course on clear
            thinking. Free to start.
          </p>
          <Button asChild variant="outline" size="sm" className="h-8 shrink-0 px-3">
            <Link href="/projects/deprogramming">
              Start the course <ArrowRight className="ml-1.5 h-3 w-3" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="container max-w-5xl pt-14">
        {/* ── HERO ── */}
        <section className="fade-up mb-24 pt-6">
          <div className="max-w-3xl">
            <div className="mb-8 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              <p>Editorial Notes, Essays, and Tools</p>
            </div>
            <h1
              className="max-w-4xl text-[3.5rem] leading-[0.94] tracking-[-0.06em] text-foreground md:text-[5.6rem]"
              style={editorialSerif}
            >
              Clear thinking for people trying to live outside borrowed scripts.
            </h1>
            <p className="mt-8 max-w-2xl text-[1.15rem] leading-[1.65] text-muted-foreground">
              Essays build the argument, frameworks make it usable, and the course turns it into a deeper path.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild className="h-12 px-7">
                <Link href="/projects/deprogramming">
                  Start Deprogramming
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-12 px-7">
                <Link href="/articles">
                  Browse Essays
                  <Newspaper className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* ── PROOF STRIP ── */}
            <div className="mt-12 grid max-w-sm grid-cols-4 divide-x divide-border rounded-sm border border-border">
              {[
                { num: "42", label: "lessons" },
                { num: "3", label: "territories" },
                { num: "Free", label: "to start" },
                { num: "Weekly", label: "essays" },
              ].map((s) => (
                <div key={s.label} className="px-4 py-3.5">
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
        </section>

        {/* ── READER QUOTE ── */}
        <div className="fade-up-delayed premium-surface mb-24 flex items-start gap-4 border-y border-border/80 px-5 py-6">
          <span className="mt-0.5 shrink-0 text-4xl leading-none text-muted-foreground/30" style={editorialSerif}>
            "
          </span>
          <div>
            <p className="max-w-2xl text-[0.98rem] font-light italic leading-7 text-muted-foreground">
              The most useful thing I've read on breaking out of inherited thinking. Every framework is something you
              can actually use the same day.
            </p>
            <p className="mt-2 text-[12px] text-muted-foreground/60">— Reader, via email</p>
          </div>
        </div>

        {/* ── START HERE ── */}
        <section className="fade-up-delayed mb-24">
          <div className="mb-8 flex items-end justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Start Here</p>
            </div>
            <Link
              href="/articles"
              className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
            >
              Read the library
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid gap-y-10 border-b border-border pb-2 md:grid-cols-2 xl:grid-cols-4 xl:gap-x-8">
            {startHereLinks.map((item, index) => {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group pr-6 transition-opacity hover:opacity-75 xl:min-h-[170px] ${
                    index < startHereLinks.length - 1 ? "xl:border-r" : ""
                  }`}
                >
                  <p className="mb-4 text-[12px] uppercase tracking-[0.14em] text-muted-foreground">{item.number}</p>
                  <h2 className="mb-3 text-[1.8rem] font-semibold tracking-[-0.03em] text-foreground">{item.title}</h2>
                  <p className="max-w-xs text-[1.02rem] leading-[1.65] text-muted-foreground">{item.description}</p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── RECENT ESSAYS ── */}
        <section className="fade-up-delayed mb-24">
          <div className="mb-8 flex items-end justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Recent Essays
              </p>
            </div>
            <Link
              href="/articles"
              className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
            >
              View all essays
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {leadPost ? (
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:border-b lg:border-border lg:pb-4">
              <article className="border-b border-border pb-8 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-10">
                <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Featured
                </p>
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
                  <span className="inline-flex items-center gap-1.5">
                    <Eye className="h-3.5 w-3.5" />
                    {leadPost.publishedDate.toLocaleDateString()}
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
                      <span>{post.publishedDate.toLocaleDateString()}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ) : null}
        </section>

        {/* ── FLAGSHIP COURSE ── */}
        <section className="fade-up-delayed mb-20 border border-border/70 p-7 md:p-10">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <BookOpen className="h-3.5 w-3.5 text-muted-foreground" />
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Flagship Course</p>
              </div>
              <h2 className="text-3xl tracking-[-0.03em] text-foreground md:text-4xl" style={editorialSerif}>
                Deprogramming is the structured path through the ideas behind this site.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
                The course turns scattered insight into a sequence: social conditioning, institutions, media, power, and
                the habits required to think with more independence.
              </p>
              <div className="mt-6 flex gap-8">
                {[
                  { num: "42", label: "lessons" },
                  { num: "Free", label: "to start" },
                  { num: "Self-paced", label: "no deadline" },
                ].map((s) => (
                  <div key={s.label}>
                    <span className="mb-1 block text-2xl leading-none text-foreground" style={editorialSerif}>
                      {s.num}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex shrink-0 flex-col gap-3">
              <Button asChild className="rounded-sm px-6">
                <Link href="/projects/deprogramming">
                  Explore the course
                  <BookOpen className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-sm border-border/80 px-6">
                <Link href="/projects/deprogramming/what-is-deprogramming">Preview lessons</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section className="fade-up-delayed mb-20 grid gap-10 border-t border-border/70 pt-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <FileText className="h-3.5 w-3.5 text-muted-foreground" />
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">About The Desk</p>
            </div>
            <h2 className="text-3xl tracking-[-0.03em] text-foreground md:text-4xl" style={editorialSerif}>
              Built as a practical editorial space, not a personal brand brochure.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
              Everything here is meant to earn its place through usefulness. Originalform focuses on tested frameworks,
              clear writing, and work that helps people think for themselves with a little more honesty and calm.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="outline" className="rounded-sm border-border/80 px-6">
                <Link href="/frameworks">
                  Explore Frameworks
                  <Lightbulb className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                className="rounded-sm px-0 text-muted-foreground hover:bg-transparent hover:text-foreground"
              >
                <Link href="/now">See current focus</Link>
              </Button>
            </div>
          </div>

          <div className="border-t border-border/60 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <div className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-muted-foreground" />
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Editor</p>
            </div>
            <h3 className="mt-3 text-2xl tracking-[-0.03em] text-foreground" style={editorialSerif}>
              {defaultAuthor.name}
            </h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              {defaultAuthor.jobTitle}
              {defaultAuthor.company ? ` at ${defaultAuthor.company}` : ""}
            </p>
            <div className="mt-6 flex flex-col gap-3 text-[1rem] text-muted-foreground">
              <Link href="/contact" className="inline-flex items-center gap-2 transition-colors hover:text-foreground">
                <Mail className="h-4 w-4" />
                Contact
              </Link>
              <Link
                href="https://twitter.com/originalformx"
                target="_blank"
                className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
              >
                <ExternalLink className="h-4 w-4" />
                Follow updates
              </Link>
            </div>
          </div>
        </section>

        {/* ── NEWSLETTER ── */}
        <section className="fade-up-delayed border-t border-border/70 pt-10">
          <NewsletterSubscribe
            provider="mailerlite"
            title="Get essays and frameworks on conditioning, clarity, and independent thinking"
            description="A thoughtful note when there is something worth sending — original essays, practical frameworks, and sharper ways to think through noise. Sent roughly 2× per month."
            buttonText="Subscribe"
          />
        </section>
      </div>
    </div>
  );
}
