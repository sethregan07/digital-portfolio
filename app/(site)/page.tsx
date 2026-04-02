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
  fontFamily: '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, "Times New Roman", serif',
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
    <div className="bg-gradient-to-b from-background via-background to-muted/30 pb-16">
      {/* ── COURSE ANNOUNCEMENT BAR ── */}
      <div className="border-b border-border/60 bg-muted/30 px-6 py-2.5">
        <div className="container flex max-w-5xl items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">New:</span> Deprogramming — a 42-lesson course on clear
            thinking. Free to start.
          </p>
          <Button asChild variant="outline" size="sm" className="h-7 shrink-0 rounded-sm px-3 text-xs">
            <Link href="/projects/deprogramming">
              Start the course <ArrowRight className="ml-1.5 h-3 w-3" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="container max-w-5xl pt-10">
        {/* ── HERO ── */}
        <section className="mb-20 pt-4">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              <FileText className="h-3.5 w-3.5" />
              <p>Editorial Notes, Essays, and Tools</p>
            </div>
            <h1
              className="max-w-4xl text-5xl leading-[1.04] tracking-[-0.04em] text-foreground md:text-7xl"
              style={editorialSerif}
            >
              Clear thinking for people trying to live outside borrowed scripts.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">
              Essays build the argument, frameworks make it usable, and the course turns it into a deeper path.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild className="rounded-sm px-6">
                <Link href="/projects/deprogramming">
                  Start Deprogramming
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-sm border-border/80 px-6">
                <Link href="/articles">
                  Browse Essays
                  <Newspaper className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* ── PROOF STRIP ── */}
            <div className="mt-10 grid max-w-sm grid-cols-4 divide-x divide-border/60 rounded-sm border border-border/60">
              {[
                { num: "42", label: "lessons" },
                { num: "3", label: "territories" },
                { num: "Free", label: "to start" },
                { num: "Weekly", label: "essays" },
              ].map((s) => (
                <div key={s.label} className="px-4 py-3">
                  <span
                    className="mb-1 block text-lg font-semibold leading-none text-foreground"
                    style={editorialSerif}
                  >
                    {s.num}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── READER QUOTE ── */}
        <div className="mb-20 flex items-start gap-4 border-y border-border/60 bg-muted/20 px-6 py-5">
          <span className="mt-0.5 shrink-0 text-4xl leading-none text-muted-foreground/30" style={editorialSerif}>
            "
          </span>
          <div>
            <p className="max-w-2xl text-sm font-light italic leading-7 text-muted-foreground">
              The most useful thing I've read on breaking out of inherited thinking. Every framework is something you
              can actually use the same day.
            </p>
            <p className="mt-2 text-[11px] text-muted-foreground/50">— Reader, via email</p>
          </div>
        </div>

        {/* ── START HERE ── */}
        <section className="mb-20">
          <div className="mb-7 flex items-end justify-between border-b border-border/70 pb-3">
            <div className="flex items-center gap-2">
              <Compass className="h-3.5 w-3.5 text-muted-foreground" />
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Start Here</p>
            </div>
            <Link
              href="/articles"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Read the library
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid gap-y-8 md:grid-cols-2 xl:grid-cols-4 xl:gap-x-8">
            {startHereLinks.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group border-border/70 pr-6 transition-opacity hover:opacity-75 xl:min-h-[180px] ${
                    index < startHereLinks.length - 1 ? "xl:border-r" : ""
                  }`}
                >
                  <p className="mb-4 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{item.number}</p>
                  <div className="mb-3 flex items-center gap-3">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <h2 className="text-2xl tracking-[-0.02em] text-foreground" style={editorialSerif}>
                      {item.title}
                    </h2>
                  </div>
                  <p className="max-w-xs text-sm leading-7 text-muted-foreground">{item.description}</p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── RECENT ESSAYS ── */}
        <section className="mb-20">
          <div className="mb-7 flex items-end justify-between border-b border-border/70 pb-3">
            <div className="flex items-center gap-2">
              <Newspaper className="h-3.5 w-3.5 text-muted-foreground" />
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Recent Essays</p>
            </div>
            <Link
              href="/articles"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              View all essays
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {leadPost ? (
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
              <article className="border-b border-border/60 pb-8 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-10">
                <p className="mb-3 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Lead Essay</p>
                <Link href={`/articles/${leadPost.slug}`} className="block">
                  <h2
                    className="max-w-2xl text-3xl leading-[1.18] tracking-[-0.03em] text-foreground transition-opacity hover:opacity-75 md:text-5xl"
                    style={editorialSerif}
                  >
                    {leadPost.title}
                  </h2>
                </Link>
                <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground">
                  {leadPost.description || "A long-form essay from the working library."}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
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
                    className={`py-4 ${index < sidePosts.length - 1 ? "border-b border-border/60" : ""} ${
                      index === 0 ? "pt-0" : ""
                    }`}
                  >
                    <p className="mb-2 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Essay</p>
                    <Link href={`/articles/${post.slug}`} className="block">
                      <h3 className="text-lg font-medium leading-7 text-foreground transition-opacity hover:opacity-75">
                        {post.title}
                      </h3>
                    </Link>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      {post.description || "A shorter field note from the current writing desk."}
                    </p>
                    <div className="mt-3 flex items-center gap-3 text-[11px] text-muted-foreground">
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
        <section className="mb-20 border border-border/70 bg-card/40 p-7 md:p-10">
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
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{s.label}</span>
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
        <section className="mb-20 grid gap-10 border-t border-border/70 pt-10 lg:grid-cols-[minmax(0,1fr)_320px]">
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
            <div className="mt-6 flex flex-col gap-3 text-sm text-muted-foreground">
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
        <section className="border-t border-border/70 pt-10">
          <NewsletterSubscribe
            title="Get essays and frameworks on conditioning, clarity, and independent thinking"
            description="A thoughtful note when there is something worth sending — original essays, practical frameworks, and sharper ways to think through noise. Sent roughly 2× per month."
            buttonText="Subscribe"
          />
        </section>
      </div>
    </div>
  );
}
