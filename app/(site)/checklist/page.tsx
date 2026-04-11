import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckSquare } from "lucide-react";

import { BASE_URL } from "@/lib/metadata";
import { Button } from "@/components/ui/button";
import NewsletterSubscribe from "@/components/newsletter-subscribe";

export const revalidate = 300;

const editorialSerif = {
  fontFamily: "var(--font-serif), Georgia, serif",
};

export const metadata: Metadata = {
  title: "The Media Audit: 7 Questions to Ask Before You Believe Anything",
  description:
    "A practical checklist for evaluating any story, claim, or piece of information — before you share it or let it shape what you think.",
  alternates: { canonical: `${BASE_URL}/checklist` },
  openGraph: {
    type: "website",
    url: `${BASE_URL}/checklist`,
    title: "7 Questions Before You Believe Anything — Originalform",
    description: "A checklist for thinking clearly about any claim you encounter. Free.",
  },
};

const questions = [
  {
    number: "01",
    question: "Who published this — and what do they profit from you believing it?",
    detail:
      "Every outlet, institution, or individual has incentives. This isn't cynicism — it's the starting point. A pharmaceutical company funding a drug study is not neutral. A government-funded broadcaster is not neutral. Neither is an activist journalist. Knowing who profits doesn't tell you the story is wrong. It tells you which direction any distortion is likely to run.",
  },
  {
    number: "02",
    question: "What is the source of the actual data — and have you seen it?",
    detail:
      "Most reporting cites other reporting. Follow the chain until you reach the original study, the primary source, the raw data. If the chain ends in 'experts say' or 'sources familiar with the matter,' there is no chain. The claim is floating.",
  },
  {
    number: "03",
    question: "What does the strongest counterargument say?",
    detail:
      "Not a strawman. The best-faith, most rigorous case made by an intelligent person who disagrees. If you cannot state the opposing position accurately enough that its supporters would recognise it, you have not understood the issue. You have consumed one side of it.",
  },
  {
    number: "04",
    question: "Is this story being amplified — or reported?",
    detail:
      "Amplification is not journalism. A tweet going viral, a clip shared across platforms, a quote pulled from context — these are not news events. They are signals that something is emotionally useful to someone. Ask whether the event actually occurred or whether the event is the amplification itself.",
  },
  {
    number: "05",
    question: "What is left out?",
    detail:
      "Stories are not lies — they are selections. The most powerful form of distortion is not what is said but what is not said. Ask what context, what counterevidence, what complicating facts are absent from the account you're reading. Absence is often where the argument lives.",
  },
  {
    number: "06",
    question: "Would I find this persuasive if the conclusion confirmed the opposite of what I believe?",
    detail:
      "This is the sharpest test. If the same level of sourcing, the same type of expert, the same style of argument appeared in support of a position you dislike — would you find it convincing? If not, you are not evaluating evidence. You are ratifying conclusions you already hold.",
  },
  {
    number: "07",
    question: "What would I need to see to change my mind on this?",
    detail:
      "If no evidence could shift your position, you do not have a reasoned view. You have an identity. That is worth knowing. The inability to answer this question is one of the clearest signs that a belief is not genuinely held — it is performed.",
  },
];

const useCases = [
  "A news story that feels urgent or outrageous",
  "A statistic cited in a political argument",
  "A health or science claim in a mainstream outlet",
  "An expert opinion on a contested topic",
  "A viral post or clip that everyone seems to be sharing",
  "A belief you have held for years without examining",
];

export default function ChecklistPage() {
  return (
    <div className="bg-background pb-24">
      <div className="container max-w-3xl pt-14">
        {/* ── HEADER ── */}
        <section className="mb-16 border-b border-border pb-10 pt-6">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Free Checklist — Media Audit
          </p>
          <h1
            className="text-[2.8rem] leading-[1.02] tracking-[-0.04em] text-foreground md:text-[4rem]"
            style={editorialSerif}
          >
            7 Questions to Ask Before You Believe Anything.
          </h1>
          <p className="mt-5 max-w-xl text-[1.1rem] leading-[1.7] text-muted-foreground">
            The problem is not that people are gullible. The problem is that they have no framework for evaluation —
            only a vague sense that some sources are trustworthy and others are not.
          </p>
          <p className="mt-3 max-w-xl text-[1.1rem] leading-[1.7] text-muted-foreground">
            These seven questions apply to any claim, any source, any story. Use them in the order they appear, or keep
            the short version somewhere you will actually see it.
          </p>
        </section>

        {/* ── USE CASES ── */}
        <section className="mb-14">
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Use this checklist when
          </p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {useCases.map((uc, i) => (
              <div key={i} className="flex items-start gap-3 rounded-sm border border-border/40 bg-card/20 px-4 py-3">
                <CheckSquare className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/50" />
                <p className="text-[0.92rem] leading-[1.6] text-muted-foreground">{uc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── THE 7 QUESTIONS ── */}
        <section className="mb-16">
          <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            The checklist
          </p>
          <div className="space-y-0 divide-y divide-border/60 rounded-sm border border-border/60">
            {questions.map((item) => (
              <div key={item.number} className="px-6 py-8">
                <div className="mb-4 flex items-baseline gap-5">
                  <span
                    className="text-[1.8rem] font-semibold leading-none text-muted-foreground/20"
                    style={editorialSerif}
                  >
                    {item.number}
                  </span>
                  <h3
                    className="text-[1.05rem] font-semibold leading-[1.4] tracking-[-0.01em] text-foreground"
                    style={editorialSerif}
                  >
                    {item.question}
                  </h3>
                </div>
                <div className="ml-14 border-l border-border/40 pl-5">
                  <p className="text-[0.93rem] leading-[1.75] text-muted-foreground">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── PRINTABLE CTA ── */}
        <section className="mb-20">
          <div className="border border-border/60 bg-card/30 p-7">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Get the printable version
            </p>
            <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground" style={editorialSerif}>
              Download the Media Audit checklist.
            </h2>
            <p className="mb-6 max-w-lg text-[0.93rem] leading-[1.7] text-muted-foreground">
              A single-page PDF — the seven questions compressed to a format you can keep at your desk or phone.
              Designed to be consulted quickly, in the moment.
            </p>
            <NewsletterSubscribe
              eyebrow="Free Checklist"
              provider="mailerlite"
              title="Enter your email to get the PDF."
              description="You will also receive the Originalform letter — one idea per issue, no noise. Unsubscribe any time."
              buttonText="Send me the checklist"
              group="media-audit-checklist"
              includeDefaultGroups={false}
              source="checklist-page"
              successMessage="The checklist is on its way to your inbox."
              finePrint="Check your inbox. If it takes a moment, check your spam folder."
            />
          </div>
        </section>

        {/* ── NEXT STEP ── */}
        <section className="border-t border-border pt-10">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            If this is useful
          </p>
          <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground" style={editorialSerif}>
            The Source Audit goes deeper.
          </h2>
          <p className="mb-6 text-[0.95rem] leading-[1.7] text-muted-foreground">
            Where this checklist evaluates incoming information, the Source Audit examines the beliefs you already hold
            — tracing them back to their actual origin. Together, they cover both directions.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="outline" className="h-11 px-6">
              <Link href="/tools#source-audit">
                Try the Source Audit <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-11 px-6">
              <Link href="/frameworks">
                Browse frameworks <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
