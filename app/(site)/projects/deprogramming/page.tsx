import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, Clock, Gift, Lock, ShieldCheck, XCircle, Zap } from "lucide-react";

import { BASE_URL, defaultAuthor } from "@/lib/metadata";
import { getPublishedCourseArticles } from "@/lib/repositories/content";
import { Button } from "@/components/ui/button";
import NewsletterSubscribe from "@/components/newsletter-subscribe";
import { PreloadLink } from "@/components/preload-link";

export const revalidate = 300;

const editorialSerif = {
  fontFamily: "var(--font-serif), Georgia, serif",
};

const offerStack = [
  {
    icon: BookOpen,
    label: "Core: The Deprogramming Course",
    value:
      "42 structured lessons across social conditioning, institutions, media, economic systems, education, and family programming. Method, not ideology.",
  },
  {
    icon: Gift,
    label: "Bonus 1: The Frameworks Reference PDF",
    value: "A compiled reference of the core models and decision tools from the course so you can reuse them quickly.",
  },
  {
    icon: Gift,
    label: "Bonus 2: The Examined Thinker Reading List",
    value:
      "A curated list of the books that go deepest on each section of the course, with a short note on why each one matters.",
  },
  {
    icon: Gift,
    label: "Bonus 3: The Source Audit Worksheet",
    value:
      "A one-page worksheet for tracing any belief back to its origin and testing whether it is still worth keeping.",
  },
];

const forList = [
  "Founders, builders, and serious readers who suspect some of their strongest convictions might be inherited",
  "People who know intelligence alone does not protect them from conditioning",
  "Readers who want method over ideology and examination over validation",
  "People willing to sit with discomfort when a belief does not hold up under scrutiny",
  "Anyone who wants a structured path instead of scattered insight",
];

const notForList = [
  "People looking for political reassurance that their side is already right",
  "Anyone who wants to be told what to believe by the end of the course",
  "People looking for a quick productivity hack or a personality upgrade",
  "Anyone unwilling to question their own scripts with the same seriousness they question other people's",
];

const testimonials = [
  {
    quote:
      "This changed how I read the news, talk to my family, and make decisions. It gave me a way to pause before defending whatever frame I had inherited.",
    name: "Course reader",
    via: "via email",
  },
  {
    quote:
      "I knew something felt off about how I was thinking. The first lessons gave me the language for it, and the later ones gave me a way to work on it.",
    name: "Reader, founder",
    via: "via email",
  },
  {
    quote:
      "I bought it after the free preview because it was the first thing on this topic that felt structured instead of theatrical.",
    name: "Reader",
    via: "via email",
  },
];

function SectionHeader({ label }: { label: string }) {
  return (
    <div className="mb-7 flex items-end justify-between border-b border-border pb-3">
      <p className="section-label">{label}</p>
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const title = "Deprogramming — Know Which Beliefs Are Actually Yours";
  const description =
    "42 structured lessons on how conditioning works — and how to examine your own thinking with precision. Free to start. Self-paced.";
  const url = `${BASE_URL}/projects/deprogramming`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", url, title, description },
    twitter: { card: "summary_large_image", title, description },
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
  const totalHours = Math.max(1, Math.round(totalReadTime / 60));

  const previewWins = [
    `In the first ${previewCount} lessons, you will see why intelligence alone does not protect you from conditioning.`,
    "You will be able to name at least one belief pattern that feels personal but was socially installed.",
    "You will know whether the tone and method of the course fit you before you pay for anything.",
  ];

  const fullWins = [
    "Trace strong opinions back to their real source instead of confusing familiarity with truth.",
    "Recognize how institutions and media shape your attention before it feels like your own conclusion.",
    "Use a repeatable framework for evaluating new information instead of endlessly collecting more of it.",
    "Leave with language, tools, and references you can use long after the course is finished.",
  ];

  const proofFacts = [
    {
      title: "Read before you buy",
      description: `The first ${previewCount} lessons are free, so you can judge the substance and tone for yourself.`,
    },
    {
      title: "Specific risk reversal",
      description: "Complete the first 10 lessons. If nothing shifts, ask for a full refund.",
    },
    {
      title: "Structured depth",
      description: `${totalLessons} lessons across ${sectionCount} sections, sequenced to build a method instead of scattering ideas.`,
    },
    {
      title: "Manageable pace",
      description: `Most lessons take 10-20 minutes. Total reading time is about ${totalHours} hours, fully self-paced.`,
    },
  ];

  const accessSteps = [
    {
      title: `Read the first ${previewCount} lessons free`,
      description: "No account needed. Use the preview to decide whether the work is actually useful to you.",
    },
    {
      title: "Unlock the full course",
      description: `Purchase via Gumroad and receive access to all ${totalLessons} lessons plus the bonuses.`,
    },
    {
      title: "Work one lesson at a time",
      description: "Most readers move through one or two lessons per week. Reflection matters more than speed.",
    },
    {
      title: "Keep the tools close",
      description:
        "Use the PDF reference, reading list, and Source Audit Worksheet without rereading the entire course.",
    },
  ];

  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Deprogramming",
    description:
      "A structured course for examining inherited beliefs, social scripts, and institutional pressures to build a more grounded way of seeing.",
    provider: {
      "@type": "Organization",
      name: defaultAuthor.name,
      url: BASE_URL,
    },
    url: `${BASE_URL}/projects/deprogramming`,
    timeRequired: `PT${totalReadTime}M`,
  };

  return (
    <div className="bg-background pb-16">
      <div className="container max-w-5xl pt-14">
        <section className="mb-16 pt-6">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
            <div className="max-w-3xl">
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                A structured course for people who want to know which beliefs are actually theirs
              </p>
              <h1
                className="text-[2.8rem] leading-[1.02] tracking-[-0.05em] text-foreground md:text-[4.4rem]"
                style={editorialSerif}
              >
                Learn how to tell which beliefs are actually yours before they keep steering your decisions.
              </h1>
              <p className="mt-6 max-w-2xl text-[1.08rem] leading-[1.72] text-muted-foreground">
                Deprogramming helps you trace beliefs back to their source, see how conditioning works in plain sight,
                and build a more grounded way of thinking without swapping one ideology for another.
              </p>
              <div className="mt-8 space-y-3">
                {[
                  "You suspect some of your strongest convictions were installed before they were examined.",
                  "You can argue a position well, but tracing its origin is harder.",
                  "You want a method for clearer thinking, not a new tribe to belong to.",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <p className="text-[1rem] leading-[1.68] text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button asChild className="h-12 rounded-sm px-8">
                  <Link href="/projects/deprogramming/what-is-deprogramming">
                    Read Lesson 1 free <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-12 rounded-sm border-border/80 px-8">
                  <a href={gumroadUrl} target="_blank" rel="noreferrer">
                    Unlock full course
                  </a>
                </Button>
              </div>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                First {previewCount} lessons are free. No account needed. Full course includes all bonuses plus a
                10-lesson guarantee.
              </p>
            </div>

            <aside className="premium-surface-soft self-start border border-border/70 p-6">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                What you unlock
              </p>
              <div className="mb-6 grid grid-cols-2 divide-x divide-y divide-border rounded-sm border border-border">
                {[
                  { num: totalLessons.toString(), label: "lessons" },
                  { num: sectionCount.toString(), label: "sections" },
                  { num: previewCount.toString(), label: "free previews" },
                  { num: `${totalHours}h`, label: "reading" },
                ].map((item) => (
                  <div key={item.label} className="px-4 py-4">
                    <span
                      className="mb-1 block text-xl font-semibold leading-none text-foreground"
                      style={editorialSerif}
                    >
                      {item.num}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">{item.label}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                {[
                  "All course lessons in sequence",
                  "Frameworks Reference PDF",
                  "Examined Thinker Reading List",
                  "Source Audit Worksheet",
                  "10-lesson guarantee",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <p className="text-[0.96rem] leading-[1.65] text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="mb-16 grid gap-8 md:grid-cols-2">
          <div className="border border-border/60 bg-card/30 p-7">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              What shifts before you buy
            </p>
            <div className="space-y-3">
              {previewWins.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <p className="text-[0.98rem] leading-[1.7] text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-border/60 bg-card/30 p-7">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              What the full course gives you
            </p>
            <div className="space-y-3">
              {fullWins.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <p className="text-[0.98rem] leading-[1.7] text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-16">
          <SectionHeader label="Why this is easier to trust than a normal course" />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {proofFacts.map((item) => (
              <article key={item.title} className="border border-border/60 p-6">
                <p className="mb-3 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{item.title}</p>
                <p className="text-[0.95rem] leading-[1.7] text-muted-foreground">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.quote} className="border border-border/60 bg-card/30 p-6">
              <span className="mb-3 block text-3xl leading-none text-muted-foreground/20" style={editorialSerif}>
                "
              </span>
              <p className="mb-4 text-[0.93rem] font-light italic leading-[1.7] text-muted-foreground">{t.quote}</p>
              <p className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground/50">
                — {t.name}, {t.via}
              </p>
            </div>
          ))}
        </section>

        <section className="mb-16">
          <SectionHeader label="Everything included when you unlock" />
          <div className="space-y-0 divide-y divide-border/60 rounded-sm border border-border/60">
            {offerStack.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-start gap-5 px-6 py-6">
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <div>
                    <p className="mb-1.5 font-medium text-foreground">{item.label}</p>
                    <p className="text-[0.93rem] leading-[1.68] text-muted-foreground">{item.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mb-16 border border-primary/20 bg-primary/5 p-7 md:p-10">
          <div className="flex items-start gap-5">
            <ShieldCheck className="mt-1 h-6 w-6 shrink-0 text-primary" />
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                The Guarantee
              </p>
              <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground" style={editorialSerif}>
                Complete the first 10 lessons. If nothing shifts, ask for a full refund.
              </h2>
              <p className="max-w-2xl text-[0.95rem] leading-[1.7] text-muted-foreground">
                This is not a vague satisfaction guarantee. It is a specific one. Read the first 10 lessons with genuine
                attention. If nothing in how you understand your own thinking has moved, email signal@originalform.org
                and you will receive a full refund.
              </p>
              <p className="mt-3 text-[0.9rem] text-muted-foreground/60">
                The guarantee exists because the course should earn trust through use, not demand it upfront.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16 grid gap-8 md:grid-cols-2">
          <div>
            <SectionHeader label="This course is for you if" />
            <div className="space-y-3">
              {forList.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <p className="text-[0.93rem] leading-[1.65] text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionHeader label="This course is NOT for you if" />
            <div className="space-y-3">
              {notForList.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/40" />
                  <p className="text-[0.93rem] leading-[1.65] text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-16">
          <SectionHeader label="How access works" />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {accessSteps.map((item, index) => (
              <article key={item.title} className="border border-border/60 p-6">
                <p className="mb-3 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{`Step 0${
                  index + 1
                }`}</p>
                <h3 className="mb-3 text-[1.05rem] font-semibold tracking-[-0.02em] text-foreground">{item.title}</h3>
                <p className="text-[0.95rem] leading-[1.7] text-muted-foreground">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <div className="mb-8 flex items-baseline justify-between border-b border-border pb-3">
            <p className="section-label">Course Curriculum</p>
            <span className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground/50">
              {totalLessons} lessons · {sectionCount} sections
            </span>
          </div>

          <div className="space-y-12">
            {(Object.entries(sections) as [string, (typeof courseLessons)[number][]][]).map(
              ([sectionName, lessons], sectionIndex) => (
                <section key={sectionName} className="border-b border-border/60 pb-8 last:border-b-0">
                  <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <span className="rounded-sm border border-border/70 px-3 py-1 text-[12px] uppercase tracking-[0.1em] text-muted-foreground">
                        {sectionIndex + 1}
                      </span>
                      <h2 className="card-title">{sectionName}</h2>
                    </div>
                    <p className="text-[12px] uppercase tracking-[0.1em] text-muted-foreground">
                      {lessons.length} lessons
                    </p>
                  </div>

                  <div className="space-y-0 divide-y divide-border/50">
                    {lessons.map((lesson) => {
                      const isPreview = lesson.lessonOrder <= previewCount;
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
                                {isPreview ? (
                                  <>
                                    <PreloadLink
                                      href={`/projects/deprogramming/${lesson.slug}`}
                                      className="text-base leading-7 text-foreground transition-opacity hover:opacity-70"
                                    >
                                      {lesson.title}
                                    </PreloadLink>
                                    <span className="rounded-sm border border-border/50 px-1.5 py-0.5 text-[11px] uppercase tracking-[0.1em] text-muted-foreground/50">
                                      Free
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <h3 className="text-base leading-7 text-muted-foreground">{lesson.title}</h3>
                                    <Lock className="h-3 w-3 text-muted-foreground/40" />
                                  </>
                                )}
                              </div>
                              {lesson.description ? (
                                <p className="mt-1 text-sm leading-7 text-muted-foreground/60">{lesson.description}</p>
                              ) : null}
                            </div>
                          </div>
                          <div className="flex shrink-0 items-center gap-1.5 pl-9 text-sm text-muted-foreground/50 sm:pl-0">
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

        <section className="mb-16 rounded-sm border border-border/70 bg-card/40 p-8 md:p-11">
          <div className="flex items-start gap-4">
            <Zap className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
            <div>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                How to get the most from it
              </p>
              <p className="max-w-3xl text-base leading-8 text-muted-foreground">
                One lesson at a time. After each one, write down a belief it made you want to examine. Readers who take
                the course at that pace report the clearest shifts. Readers who rush usually collect ideas without
                changing how they see.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16 border border-border/70 bg-card/40 p-7 md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-3 text-[12px] uppercase tracking-[0.12em] text-muted-foreground">Start with proof</p>
              <h2 className="section-title mb-3" style={editorialSerif}>
                Read the free preview first. Buy only if the method makes you think more clearly.
              </h2>
              <p className="max-w-md text-sm leading-7 text-muted-foreground">
                Start with the first {previewCount} lessons. Unlock the full {totalLessons}-lesson course and bonuses
                only if you can feel the work changing the quality of your attention.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3">
              <Button asChild className="rounded-sm px-6">
                <Link href="/projects/deprogramming/what-is-deprogramming">
                  Read Lesson 1 free <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-sm border-border/80 px-6">
                <a href={gumroadUrl} target="_blank" rel="noreferrer">
                  Unlock full course
                </a>
              </Button>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <SectionHeader label="Common Questions" />
          <div className="space-y-0 divide-y divide-border/60">
            {[
              {
                q: "Is this left-wing or right-wing?",
                a: "Neither. The course does not replace one ideology with another. It examines conditioning across the spectrum and asks you to apply the same scrutiny to your own side as to any other.",
              },
              {
                q: "Do I need any prior knowledge?",
                a: "No. It is written for intelligent, curious readers with no formal background in sociology, philosophy, or media theory. The method is built from first principles.",
              },
              {
                q: "How long does it take?",
                a: `${totalLessons} lessons, self-paced. Most lessons take 10-20 minutes to read. Most readers move through one or two per week, but there is no deadline.`,
              },
              {
                q: "What exactly happens when I unlock the course?",
                a: `You purchase through Gumroad, then receive access to the full ${totalLessons}-lesson course and the included bonuses. The first ${previewCount} lessons remain free either way.`,
              },
              {
                q: "What if I am interested but not ready to buy yet?",
                a: "Start with the free preview or get Lesson 1 by email below. The page is designed so you can inspect the work before making any commitment.",
              },
            ].map((item) => (
              <div key={item.q} className="py-7">
                <p className="mb-3 font-medium text-foreground">{item.q}</p>
                <p className="max-w-2xl text-[0.95rem] leading-[1.7] text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <NewsletterSubscribe
            provider="mailerlite"
            title="Not ready to buy? Get Lesson 1 by email."
            description="Subscribe and receive Lesson 1 in your inbox along with the Originalform letter. Read at your own pace and decide later."
            buttonText="Send me Lesson 1"
            group="deprogramming"
            source="deprogramming-course-page"
            successMessage="Done. Lesson 1 is on its way to your inbox."
          />
        </section>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }} />
      </div>
    </div>
  );
}
