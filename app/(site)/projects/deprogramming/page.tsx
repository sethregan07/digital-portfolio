import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Award, BookOpen, Calendar, CheckCircle2, Clock, Eye, Lock, Sparkles, Users } from "lucide-react";

import { getPublishedCourseArticles } from "@/lib/repositories/content";
import { Button } from "@/components/ui/button";
import { PreloadLink } from "@/components/preload-link";

export const revalidate = 300;

const editorialSerif = {
  fontFamily: '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, "Times New Roman", serif',
};

const learnings = [
  {
    title: "Critical Analysis",
    description: "Tools to examine societal narratives and personal beliefs with clarity and objectivity.",
    icon: Eye,
  },
  {
    title: "Systems Thinking",
    description: "Understanding how economic, social, and political systems interconnect and influence behavior.",
    icon: BookOpen,
  },
  {
    title: "Personal Freedom",
    description: "Practical steps to break free from limiting conditioning and live authentically.",
    icon: CheckCircle2,
  },
  {
    title: "Alternative Paradigms",
    description: "Exploring new ways of thinking and living that serve human flourishing.",
    icon: Sparkles,
  },
];

function SectionHeader({ label }: { label: string }) {
  return (
    <div className="mb-7 flex items-end justify-between border-b border-border/70 pb-3">
      <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Deprogramming Course",
    description: "A comprehensive course on breaking free from societal conditioning and reclaiming personal freedom.",
  };
}

export default async function DeprogrammingCoursePage() {
  const previewCount = 3;
  const gumroadUrl = process.env.GUMROAD_DEPROGRAMMING_URL ?? "https://originalform.gumroad.com/l/deprogramming";
  const courseLessons = await getPublishedCourseArticles("deprogramming");

  const sections = courseLessons.reduce(
    (acc: Record<string, typeof courseLessons>, lesson: (typeof courseLessons)[number]) => {
      const section = lesson.section;
      if (!acc[section]) acc[section] = [];
      acc[section].push(lesson);
      return acc;
    },
    {} as Record<string, typeof courseLessons>
  );

  const totalLessons = courseLessons.length;
  const totalReadTime = courseLessons.reduce(
    (acc: number, lesson: (typeof courseLessons)[number]) => acc + lesson.readTimeMinutes,
    0
  );
  const sectionCount = Object.keys(sections).length;

  return (
    <div className="bg-gradient-to-b from-background via-background to-muted/30 pb-16">
      <div className="container max-w-5xl pt-10">
        {/* ── HERO ── */}
        <section className="mb-16 border-b border-border/70 pb-10 pt-4">
          <div className="max-w-4xl">
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">Course</p>
            <h1
              className="text-4xl leading-tight tracking-[-0.03em] text-foreground md:text-5xl"
              style={editorialSerif}
            >
              Deprogramming: breaking free from societal conditioning.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">
              A structured course for examining the inherited beliefs, social scripts, and institutional pressures that
              shape thought and behavior — and for building a more grounded way of seeing.
            </p>
          </div>

          {/* ── STAT STRIP — editorial style, not icon-row ── */}
          <div className="mt-8 grid max-w-xl grid-cols-2 divide-x divide-border/60 rounded-sm border border-border/60 sm:grid-cols-4">
            {[
              { num: totalLessons.toString(), label: "lessons" },
              { num: `${totalReadTime} min`, label: "reading time" },
              { num: sectionCount.toString(), label: "sections" },
              { num: "Self-paced", label: "no deadline" },
            ].map((s) => (
              <div key={s.label} className="px-5 py-4">
                <span
                  className="mb-1.5 block text-xl font-semibold leading-none text-foreground"
                  style={editorialSerif}
                >
                  {s.num}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </div>

          {/* ── CTAs ── */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild className="rounded-sm px-6">
              <a href={gumroadUrl} target="_blank" rel="noreferrer">
                Buy on Gumroad
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline" className="rounded-sm border-border/80 px-6">
              <Link href="/projects/deprogramming/what-is-deprogramming">Start free preview</Link>
            </Button>
          </div>
          <p className="mt-3 text-xs text-muted-foreground/60">
            Purchased already? Use your private access link to unlock the full course.
          </p>
        </section>

        {/* ── READER QUOTE — social proof before curriculum ── */}
        <div className="mb-16 flex items-start gap-4 border-y border-border/60 bg-muted/20 px-6 py-5">
          <span className="mt-0.5 shrink-0 text-4xl leading-none text-muted-foreground/30" style={editorialSerif}>
            "
          </span>
          <div>
            <p className="max-w-2xl text-sm font-light italic leading-7 text-muted-foreground">
              This course changed how I read the news, talk to my family, and make decisions. It's the clearest map I've
              found for understanding why I think the way I do.
            </p>
            <p className="mt-2 text-[11px] text-muted-foreground/50">— Course reader, via email</p>
          </div>
        </div>

        {/* ── WHO THIS IS FOR — condensed, inline ── */}
        <section className="mb-16">
          <SectionHeader label="Who This Is For" />
          <div className="grid gap-0 divide-y divide-border/60 rounded-sm border border-border/60 md:grid-cols-2 md:divide-x md:divide-y-0">
            {[
              {
                icon: Users,
                title: "Curious, skeptical learners",
                description: "You like to question narratives, test ideas, and build your own grounded worldview.",
              },
              {
                icon: Sparkles,
                title: "People navigating change",
                description: "You feel tension between what you were taught and what you now see in the world.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex items-start gap-4 px-6 py-5">
                  <Icon className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
                  <div>
                    <p className="mb-1 text-sm font-medium text-foreground">{item.title}</p>
                    <p className="text-sm font-light leading-7 text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── WHAT YOU'LL LEARN ── */}
        <section className="mb-16">
          <SectionHeader label="What You'll Learn" />
          <div className="grid gap-6 md:grid-cols-2">
            {learnings.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex items-start gap-4 border-b border-border/60 pb-6">
                  <Icon className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
                  <div>
                    <p className="mb-1 text-sm font-medium text-foreground">{item.title}</p>
                    <p className="text-sm font-light leading-7 text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── HOW TO USE ── */}
        <section className="mb-16 rounded-sm border border-border/70 bg-card/40 p-7 md:p-10">
          <SectionHeader label="How To Use This Course" />
          <p className="max-w-3xl text-base leading-8 text-muted-foreground">
            Move lesson by lesson, pause often, and write down your own examples. The goal is not speed — it is clarity.
            If a topic hits a nerve, let it sit and come back with fresher eyes. The value of the course is in
            reflection, not just completion.
          </p>
        </section>

        {/* ── CURRICULUM ── */}
        <section className="mb-16">
          <div className="mb-8 flex items-baseline justify-between border-b border-border/70 pb-3">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Course Curriculum</p>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground/50">
              {totalLessons} lessons · {sectionCount} sections
            </span>
          </div>

          <div className="space-y-10">
            {(Object.entries(sections) as [string, (typeof courseLessons)[number][]][]).map(
              ([sectionName, lessons], sectionIndex) => (
                <section key={sectionName} className="border-b border-border/60 pb-8 last:border-b-0">
                  <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <span className="rounded-sm border border-border/70 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                        {sectionIndex + 1}
                      </span>
                      <h2 className="text-2xl tracking-[-0.02em] text-foreground" style={editorialSerif}>
                        {sectionName}
                      </h2>
                    </div>
                    <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                      {lessons.length} lessons
                    </p>
                  </div>

                  <div className="space-y-0 divide-y divide-border/50">
                    {lessons.map((lesson) => {
                      const isPreview = lesson.lessonOrder <= previewCount;
                      const isLocked = !isPreview;

                      return (
                        <article
                          key={lesson.slug}
                          className="flex flex-col gap-3 py-4 sm:flex-row sm:items-start sm:justify-between"
                        >
                          <div className="flex items-start gap-4">
                            <span className="mt-0.5 w-5 shrink-0 text-sm tabular-nums text-muted-foreground/50">
                              {lesson.lessonOrder}.
                            </span>
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                {isLocked ? (
                                  <>
                                    <h3 className="text-base leading-7 text-muted-foreground">{lesson.title}</h3>
                                    <Lock className="h-3 w-3 text-muted-foreground/40" />
                                  </>
                                ) : (
                                  <>
                                    <PreloadLink
                                      href={`/projects/deprogramming/${lesson.slug}`}
                                      className="text-base leading-7 text-foreground transition-opacity hover:opacity-70"
                                    >
                                      {lesson.title}
                                    </PreloadLink>
                                    <span className="rounded-sm border border-border/50 px-1.5 py-0.5 text-[10px] uppercase tracking-widest text-muted-foreground/50">
                                      Free
                                    </span>
                                  </>
                                )}
                              </div>
                              {lesson.description && (
                                <p className="mt-1 text-sm leading-7 text-muted-foreground/60">{lesson.description}</p>
                              )}
                            </div>
                          </div>
                          <div className="flex shrink-0 items-center gap-1.5 pl-9 text-xs text-muted-foreground/50 sm:pl-0">
                            <Clock className="h-3 w-3" />
                            <span>{lesson.readTimeMinutes} min</span>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </section>
              )
            )}
          </div>
        </section>

        {/* ── BOTTOM CTA — after full curriculum scroll ── */}
        <section className="mb-16 rounded-sm border border-border/70 bg-card/40 p-7 md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-3 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Ready to start?</p>
              <h2 className="mb-3 text-2xl tracking-[-0.02em] text-foreground" style={editorialSerif}>
                The first three lessons are free.
              </h2>
              <p className="max-w-md text-sm leading-7 text-muted-foreground">
                Start reading now — no account needed. Buy to unlock the full {totalLessons}-lesson course.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3">
              <Button asChild className="rounded-sm px-6">
                <a href={gumroadUrl} target="_blank" rel="noreferrer">
                  Buy on Gumroad
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline" className="rounded-sm border-border/80 px-6">
                <Link href="/projects/deprogramming/what-is-deprogramming">Start free preview</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ── COURSE OVERVIEW — moved to bottom ── */}
        <section className="border-t border-border/70 pt-10">
          <SectionHeader label="Course Overview" />
          <div className="grid gap-8 md:grid-cols-2">
            <article className="border-b border-border/60 pb-8 md:border-b-0 md:border-r md:pr-8">
              <div className="mb-3 flex items-center gap-3">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <h2 className="text-xl tracking-[-0.02em] text-foreground" style={editorialSerif}>
                  A guided deprogramming journey
                </h2>
              </div>
              <p className="text-sm leading-7 text-muted-foreground">
                This course is designed to help you examine the invisible forces that shape thoughts, beliefs, and
                behaviors. Through systematic exploration of social structures, you learn to identify conditioning,
                question assumptions, and build a more authentic life.
              </p>
            </article>
            <article className="pb-8 md:pl-2">
              <div className="mb-3 flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <h2 className="text-xl tracking-[-0.02em] text-foreground" style={editorialSerif}>
                  Learn at a reflective pace
                </h2>
              </div>
              <p className="text-sm leading-7 text-muted-foreground">
                Each lesson includes core concepts, reflection exercises, practical applications, and further resources
                for deeper study. Take your time — deprogramming is not a race, it is a process of self-observation and
                clearer judgment.
              </p>
            </article>
          </div>
        </section>
      </div>
    </div>
  );
}
