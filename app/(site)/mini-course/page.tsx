import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, Clock, MailOpen } from "lucide-react";

import { BASE_URL } from "@/lib/metadata";
import { Button } from "@/components/ui/button";
import NewsletterSubscribe from "@/components/newsletter-subscribe";

export const revalidate = 300;

const editorialSerif = {
  fontFamily: "var(--font-serif), Georgia, serif",
};

export const metadata: Metadata = {
  title: "Think Clearly in 5 Days — Free Email Course",
  description:
    "A free 5-day email course on the fundamentals of independent thinking. One lesson per day, delivered to your inbox. No fluff.",
  alternates: { canonical: `${BASE_URL}/mini-course` },
  openGraph: {
    type: "website",
    url: `${BASE_URL}/mini-course`,
    title: "Think Clearly in 5 Days — Free Email Course",
    description: "5 lessons. 5 days. The core of what Originalform is built around — free.",
  },
};

const lessons = [
  {
    day: "Day 1",
    title: "Where your beliefs actually come from",
    description:
      "Most people believe they have formed their views through reason and experience. They have not — not primarily. This lesson traces the real sources: environment, repetition, social pressure, and economic incentive. Not to destabilise you. To give you a starting point.",
    duration: "8 min read",
  },
  {
    day: "Day 2",
    title: "The incentive question",
    description:
      "One question cuts through more noise than any other: who benefits from me believing this? This lesson teaches you to apply it systematically — to news, to institutions, to advice, to the frame of any conversation. The answer is almost never neutral.",
    duration: "9 min read",
  },
  {
    day: "Day 3",
    title: "How smart people fool themselves",
    description:
      "Intelligence is not protection from conditioning — it is often an accelerant. Smarter people build more sophisticated rationalisations. This lesson examines the specific mechanisms: identity-protective cognition, motivated reasoning, and why expertise in one domain does not transfer to another.",
    duration: "10 min read",
  },
  {
    day: "Day 4",
    title: "Reading the room vs. reading the evidence",
    description:
      "Social proof is the most powerful force in opinion formation — and the most easily manufactured. This lesson draws the line between genuinely evaluating evidence and simply registering what people around you believe. One is thinking. The other is updating your tribal position.",
    duration: "8 min read",
  },
  {
    day: "Day 5",
    title: "Building a framework, not a position",
    description:
      "The goal is not to arrive at the 'right' set of beliefs. It is to build a method for evaluating new information — one that holds up regardless of the topic. This lesson gives you the practical structure: the four questions to ask before forming a view, and how to use them.",
    duration: "11 min read",
  },
];

const outcomes = [
  "Know where your most important beliefs actually came from",
  "Apply the incentive question to any claim, source, or institution",
  "Distinguish evidence-based reasoning from tribal position-taking",
  "Understand why smart people are often the most efficiently conditioned",
  "Have a four-question framework for evaluating any new information",
];

const faqs = [
  {
    q: "Is this the same as the Deprogramming course?",
    a: "No. The mini-course is an introduction — five foundational lessons to give you the core concepts and orient you to how the site thinks. The Deprogramming course is 42 lessons across six sections, and goes significantly deeper. The mini-course is the right place to start if you are not sure this is for you.",
  },
  {
    q: "What happens after day 5?",
    a: "After the five lessons, you will receive the Originalform letter — roughly twice a month, one idea per issue. You can unsubscribe at any time. The mini-course itself is complete as a standalone — you are not being funnelled into anything paid.",
  },
  {
    q: "Is there any cost?",
    a: "No. The five lessons are free. The Deprogramming course has a free tier (first module) and a paid full access option — but the mini-course has no upsell built into it.",
  },
  {
    q: "How long does each lesson take?",
    a: "Between eight and eleven minutes, depending on pace. They are written to be read in one sitting — not skimmed. The value is in sitting with each idea before the next one arrives.",
  },
];

export default function MiniCoursePage() {
  return (
    <div className="bg-background pb-24">
      <div className="container max-w-3xl pt-14">
        {/* ── HEADER ── */}
        <section className="mb-16 border-b border-border pb-10 pt-6">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Free 5-Day Email Course
          </p>
          <h1
            className="text-[2.8rem] leading-[1.02] tracking-[-0.04em] text-foreground md:text-[4rem]"
            style={editorialSerif}
          >
            Think Clearly in 5 Days.
          </h1>
          <p className="mt-5 max-w-xl text-[1.1rem] leading-[1.7] text-muted-foreground">
            Five lessons on the fundamentals of independent thinking. One per day, delivered to your inbox. Each is
            standalone and immediately useful.
          </p>
          <p className="mt-3 max-w-xl text-[1.1rem] leading-[1.7] text-muted-foreground">
            No fluff. No productivity hacks. The actual mechanisms — how beliefs form, how narratives are managed, how
            to think more clearly about any of it.
          </p>

          <div className="mt-7 flex flex-wrap gap-5">
            <div className="flex items-center gap-2 text-[0.9rem] text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              <span>5 lessons</span>
            </div>
            <div className="flex items-center gap-2 text-[0.9rem] text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>8–11 min each</span>
            </div>
            <div className="flex items-center gap-2 text-[0.9rem] text-muted-foreground">
              <CheckCircle2 className="h-4 w-4" />
              <span>Free</span>
            </div>
          </div>
        </section>

        {/* ── OUTCOMES ── */}
        <section className="mb-16">
          <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            After 5 days, you will
          </p>
          <div className="space-y-3">
            {outcomes.map((outcome, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <p className="text-[1rem] leading-[1.6] text-foreground">{outcome}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── SIGN UP ── */}
        <section className="mb-16">
          <div className="border border-border/60 bg-card/30 p-7">
            <NewsletterSubscribe
              eyebrow="Free Mini-Course"
              provider="mailerlite"
              title="Start Lesson 1 today."
              description="Enter your email and the first lesson arrives within the hour. One lesson per day for five days — then the Originalform letter, roughly twice a month. Unsubscribe any time."
              buttonText="Start the mini-course"
              group="mini-course"
              includeDefaultGroups={false}
              source="mini-course-page"
              successMessage="Lesson 1 is on its way. Check your inbox — it should arrive within the hour."
              finePrint="Check your inbox. If it takes a moment, check your spam folder."
            />
          </div>
        </section>

        {/* ── LESSON BREAKDOWN ── */}
        <section className="mb-16">
          <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            What you will receive
          </p>
          <div className="space-y-0 divide-y divide-border/60">
            {lessons.map((lesson) => (
              <div key={lesson.day} className="flex gap-7 py-8">
                {/* Day label */}
                <div className="w-16 shrink-0 pt-0.5">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/50">
                    {lesson.day}
                  </span>
                </div>
                {/* Content */}
                <div className="flex-1">
                  <h3
                    className="mb-2 text-[1.1rem] font-semibold tracking-[-0.01em] text-foreground"
                    style={editorialSerif}
                  >
                    {lesson.title}
                  </h3>
                  <p className="mb-3 text-[0.93rem] leading-[1.7] text-muted-foreground">{lesson.description}</p>
                  <span className="text-[11px] text-muted-foreground/50">{lesson.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="mb-16">
          <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Questions</p>
          <div className="space-y-0 divide-y divide-border/60">
            {faqs.map((faq) => (
              <div key={faq.q} className="py-6">
                <p className="mb-3 font-medium text-foreground">{faq.q}</p>
                <p className="text-[0.95rem] leading-[1.7] text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── IF YOU WANT MORE ── */}
        <section className="border-t border-border pt-10">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Want to go deeper?
          </p>
          <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground" style={editorialSerif}>
            The Deprogramming course picks up where the mini-course ends.
          </h2>
          <p className="mb-6 text-[0.95rem] leading-[1.7] text-muted-foreground">
            42 structured lessons across six sections — social conditioning, institutions, media, economic systems,
            education, and family programming. The mini-course introduces the framework. The full course applies it.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="h-11 px-6">
              <Link href="/projects/deprogramming">
                Explore the full course <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-11 px-6">
              <Link href="/start-here">
                Not sure where to begin? <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
