import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, CheckSquare, Download, FileText, HelpCircle, Lightbulb, MailOpen } from "lucide-react";

import { BASE_URL } from "@/lib/metadata";
import { Button } from "@/components/ui/button";
import NewsletterSubscribe from "@/components/newsletter-subscribe";

export const revalidate = 300;

const editorialSerif = {
  fontFamily: "var(--font-serif), Georgia, serif",
};

export const metadata: Metadata = {
  title: "Tools",
  description: "Free practical tools for examining your thinking — worksheets, frameworks, and reference documents.",
  alternates: { canonical: `${BASE_URL}/tools` },
  openGraph: {
    type: "website",
    url: `${BASE_URL}/tools`,
    title: "Free Tools — Originalform",
    description: "Practical worksheets and frameworks for examining your thinking. Free.",
  },
};

const sourceAuditQuestions = [
  {
    step: "01",
    question: "Where did this belief come from?",
    prompt:
      "Can you trace it to a specific source — a parent, a teacher, a media environment, a culture, a peer group? If you cannot trace it, that is itself a signal worth examining.",
  },
  {
    step: "02",
    question: "Have I ever seriously read the best argument against this?",
    prompt:
      "Not a strawman version. The best, most rigorous case made by someone intelligent who disagrees. If the answer is no, you do not fully hold this belief — it holds you.",
  },
  {
    step: "03",
    question: "Who benefits from me holding this belief?",
    prompt:
      "Follow the incentive. Is there an institution, a culture, an industry, or a group that profits — financially, politically, or socially — from you believing this? The answer is rarely neutral.",
  },
  {
    step: "04",
    question: "Would I hold this belief if I had grown up somewhere different?",
    prompt:
      "Different country, different family, different economic class. If the answer is probably not, the belief is significantly environmental — which does not make it wrong, but means you have not truly chosen it.",
  },
  {
    step: "05",
    question: "What would have to be true for this belief to be wrong?",
    prompt:
      "If you cannot answer this — if no evidence or argument could change your mind — the belief is not a reasoned position. It is identity. Those are worth examining the most carefully.",
  },
];

const frameworks = [
  {
    title: "The Source Audit",
    description: "Five questions for tracing any belief back to its actual origin. Use on one belief at a time.",
    tag: "Worksheet",
    href: "#source-audit",
    available: true,
    icon: FileText,
  },
  {
    title: "7 Questions Before You Believe Anything",
    description:
      "A media audit checklist for evaluating any story, claim, or piece of information before it shapes what you think.",
    tag: "Checklist",
    href: "/checklist",
    available: true,
    icon: CheckSquare,
  },
  {
    title: "Vocabulary of Conditioning",
    description:
      "18 key terms explained in depth — the language for understanding how beliefs, attention, and behaviour are shaped.",
    tag: "Reference",
    href: "/vocabulary",
    available: true,
    icon: BookOpen,
  },
  {
    title: "How Much of Your Thinking Is Actually Yours?",
    description: "A 5-question quiz that gives you a personalised result and recommended reading path.",
    tag: "Quiz",
    href: "/quiz",
    available: true,
    icon: HelpCircle,
  },
  {
    title: "Think Clearly in 5 Days",
    description: "A free email course on the fundamentals of independent thinking. One lesson per day.",
    tag: "Email Course",
    href: "/mini-course",
    available: true,
    icon: MailOpen,
  },
  {
    title: "The Incentive Lens",
    description: "A framework for asking who profits from any given narrative, institution, or piece of information.",
    tag: "Coming soon",
    href: "#",
    available: false,
    icon: Lightbulb,
  },
];

export default function ToolsPage() {
  return (
    <div className="bg-background pb-24">
      <div className="container max-w-3xl pt-14">
        {/* ── HEADER ── */}
        <section className="mb-16 border-b border-border pb-10 pt-6">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Free Tools</p>
          <h1
            className="text-[2.8rem] leading-[1.02] tracking-[-0.04em] text-foreground md:text-[4rem]"
            style={editorialSerif}
          >
            Practical tools for examining your thinking.
          </h1>
          <p className="mt-5 max-w-xl text-[1.1rem] leading-[1.7] text-muted-foreground">
            Frameworks only work if you can use them the same day you encounter them. Everything here is standalone,
            immediate, and free.
          </p>
        </section>

        {/* ── TOOLS LIST ── */}
        <section className="mb-20">
          <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Available tools
          </p>
          <div className="space-y-0 divide-y divide-border/60">
            {frameworks.map((tool) => (
              <div key={tool.title} className="flex items-start justify-between gap-6 py-7">
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-3">
                    <span className="rounded-sm border border-border/50 px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                      {tool.tag}
                    </span>
                  </div>
                  <h2
                    className="mb-2 text-[1.2rem] font-semibold tracking-[-0.02em] text-foreground"
                    style={editorialSerif}
                  >
                    {tool.title}
                  </h2>
                  <p className="text-[0.93rem] leading-[1.65] text-muted-foreground">{tool.description}</p>
                </div>
                {tool.available ? (
                  <Link
                    href={tool.href}
                    className="mt-1 shrink-0 text-sm text-muted-foreground/50 transition-colors hover:text-foreground"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <span className="mt-1 shrink-0 text-sm text-muted-foreground/30">Soon</span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── SOURCE AUDIT — the actual tool ── */}
        <section id="source-audit" className="mb-20">
          <div className="mb-2 flex items-center gap-3">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Tool 01 — The Source Audit
            </p>
          </div>
          <h2
            className="mb-4 text-[2rem] font-semibold leading-[1.1] tracking-[-0.03em] text-foreground"
            style={editorialSerif}
          >
            Five questions for any belief you hold strongly.
          </h2>
          <p className="mb-10 max-w-xl text-[1rem] leading-[1.7] text-muted-foreground">
            Pick one belief. Work through the five questions below in order. Write your answers — the act of writing
            forces precision. Expect the process to take 10–20 minutes if done seriously.
          </p>

          <div className="mb-10 space-y-0 divide-y divide-border/60 rounded-sm border border-border/60">
            {sourceAuditQuestions.map((item) => (
              <div key={item.step} className="px-6 py-7">
                <div className="mb-3 flex items-baseline gap-4">
                  <span
                    className="text-[1.8rem] font-semibold leading-none text-muted-foreground/20"
                    style={editorialSerif}
                  >
                    {item.step}
                  </span>
                  <h3 className="text-[1.05rem] font-semibold tracking-[-0.01em] text-foreground">{item.question}</h3>
                </div>
                <div className="ml-12 border-l border-border/50 pl-5">
                  <p className="text-[0.93rem] leading-[1.7] text-muted-foreground">{item.prompt}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA — download printable version */}
          <div className="border border-border/60 bg-card/30 p-7">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Get the printable version
            </p>
            <h3 className="mb-3 text-xl font-semibold tracking-tight text-foreground" style={editorialSerif}>
              Download the Source Audit worksheet.
            </h3>
            <p className="mb-6 max-w-lg text-[0.93rem] leading-[1.7] text-muted-foreground">
              A clean, single-page PDF version with space to write your answers. Designed to be printed and used with a
              pen — which matters more than it sounds.
            </p>
            <NewsletterSubscribe
              eyebrow="Free Worksheet"
              provider="mailerlite"
              title="Enter your email to get the PDF."
              description="You will also receive the Originalform letter — one idea per issue, no noise. Unsubscribe any time."
              buttonText="Send me the worksheet"
              group="source-audit"
              includeDefaultGroups={false}
              source="tools-source-audit"
              successMessage="The worksheet is on its way to your inbox."
              finePrint="Check your inbox. If it takes a moment, check your spam folder."
            />
          </div>
        </section>

        {/* ── LINK TO FRAMEWORKS ── */}
        <section className="border-t border-border pt-10">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Looking for more?
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild variant="outline" className="h-11 px-6">
              <Link href="/frameworks">
                Browse frameworks <Lightbulb className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-11 px-6">
              <Link href="/projects/deprogramming">
                Explore the course <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
