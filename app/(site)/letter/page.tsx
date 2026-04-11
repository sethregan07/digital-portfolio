import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { BASE_URL } from "@/lib/metadata";
import NewsletterSubscribe from "@/components/newsletter-subscribe";

export const revalidate = 300;

const editorialSerif = {
  fontFamily: "var(--font-serif), Georgia, serif",
};

export const metadata: Metadata = {
  title: "The Letter — Originalform",
  description:
    "A letter for independent builders who need their thinking to hold up under pressure. One mechanism or framework per issue. Sent when there is something worth saying.",
  alternates: { canonical: `${BASE_URL}/letter` },
  openGraph: {
    type: "website",
    url: `${BASE_URL}/letter`,
    title: "The Letter — Originalform",
    description: "For people building independently who need their thinking to hold up. One idea per issue, no noise.",
  },
};

const whatToExpect = [
  {
    label: "One mechanism per issue",
    description:
      "Not a digest. Not a link roundup. Every issue examines one specific mechanism — how a belief gets installed, how an incentive shapes behaviour, how a system maintains itself — and what to do about it.",
  },
  {
    label: "Built for people already in motion",
    description:
      "This is not motivational content. It is a thinking tool for people building something independently — founders, freelancers, serious readers — who make real decisions and need their judgment to hold up.",
  },
  {
    label: "Sent when there is something worth saying",
    description:
      "Roughly twice a month. No filler issues to hit a publishing schedule. If there is nothing worth sending, nothing gets sent. Quality over volume, every time.",
  },
  {
    label: "Direct replies welcome",
    description:
      "Every issue is sent from a real address. Reply directly — every response is read. Pushback, questions, and disagreement all welcome. That is part of what the letter is for.",
  },
];

const pastIssueTopics = [
  "The incentive structure behind what you call common sense",
  "Why smart people build the most sophisticated rationalisations",
  "How debt shapes behaviour without needing force",
  "The difference between information and a framework for using it",
  "What institutions actually optimise for — and why it is not you",
  "How the Millionaire Next Door builds wealth that looks like nothing from the outside",
];

export default function LetterPage() {
  return (
    <div className="bg-background pb-24">
      <div className="container max-w-2xl pt-14">
        {/* ── HEADER ── */}
        <section className="mb-14 border-b border-border pb-10 pt-6">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Published from Los Angeles
          </p>
          <h1
            className="text-[3rem] leading-[1.02] tracking-[-0.05em] text-foreground md:text-[4.2rem]"
            style={editorialSerif}
          >
            The Letter
          </h1>
          <p className="mt-5 text-[1.15rem] leading-[1.7] text-muted-foreground">
            For people building an independent life who need their thinking to hold up under pressure.
          </p>
          <p className="mt-3 text-[1.1rem] leading-[1.7] text-muted-foreground">
            One mechanism or framework per issue — the kind that changes how you read a news story, evaluate an
            opportunity, or make a decision. Sent roughly twice a month, when there is something worth saying. No noise,
            no affiliate links, no product pitches dressed as content.
          </p>
        </section>

        {/* ── SUBSCRIBE ── */}
        <section className="mb-16">
          <NewsletterSubscribe
            eyebrow="The Letter"
            provider="mailerlite"
            title="Join the letter."
            description="Essays, frameworks, and tools for people who want their thinking to be actually theirs. Unsubscribe any time."
            buttonText="Subscribe"
            source="letter-page"
            successMessage="You're in. The next issue comes when there's something worth saying."
          />
        </section>

        {/* ── WHAT TO EXPECT ── */}
        <section className="mb-16">
          <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            What to expect
          </p>
          <div className="space-y-0 divide-y divide-border/60">
            {whatToExpect.map((item) => (
              <div key={item.label} className="py-6">
                <p className="mb-2 font-medium text-foreground">{item.label}</p>
                <p className="text-[0.95rem] leading-[1.65] text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── THE RITUAL ── */}
        <section className="mb-16 border border-border/60 bg-card/30 p-7">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            How every issue is structured
          </p>
          <h2 className="mb-5 text-xl font-semibold tracking-tight text-foreground" style={editorialSerif}>
            Opening question. Argument. One thing to take with you.
          </h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <span className="mt-0.5 w-16 shrink-0 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/50">
                Open
              </span>
              <p className="text-[0.95rem] leading-[1.65] text-muted-foreground">
                A single question that frames the week's idea. Something you can carry into your day before reading
                further.
              </p>
            </div>
            <div className="flex gap-4">
              <span className="mt-0.5 w-16 shrink-0 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/50">
                Body
              </span>
              <p className="text-[0.95rem] leading-[1.65] text-muted-foreground">
                The argument. Evidence, examples, and the framework. Written to be read once straight through.
              </p>
            </div>
            <div className="flex gap-4">
              <span className="mt-0.5 w-16 shrink-0 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/50">
                Close
              </span>
              <p className="text-[0.95rem] leading-[1.65] text-muted-foreground">
                One thing to try or think differently about before the next issue arrives. Practical — not a CTA.
              </p>
            </div>
          </div>
        </section>

        {/* ── PAST TOPICS ── */}
        <section className="mb-16">
          <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Topics covered in the letter
          </p>
          <div className="space-y-3">
            {pastIssueTopics.map((topic, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/40" />
                <p className="text-[0.97rem] leading-[1.6] text-muted-foreground">{topic}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link
              href="/articles"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Read the full essay archive <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>

        {/* ── READER QUOTE ── */}
        <section className="border-t border-border pt-10">
          <blockquote className="flex items-start gap-4">
            <span className="mt-0.5 shrink-0 text-4xl leading-none text-muted-foreground/20" style={editorialSerif}>
              "
            </span>
            <div>
              <p className="text-[1rem] font-light italic leading-[1.75] text-muted-foreground">
                I knew something felt off about how I was thinking — I just didn't have the words for it. Originalform
                named it. Now I read every issue the day it lands.
              </p>
              <p className="mt-3 text-[12px] text-muted-foreground/50">— Reader, via email</p>
            </div>
          </blockquote>
        </section>
      </div>
    </div>
  );
}
