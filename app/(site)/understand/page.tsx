import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { BASE_URL } from "@/lib/metadata";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/breadcrumb";
import NewsletterSubscribe from "@/components/newsletter-subscribe";

export const revalidate = 300;

const editorialSerif = { fontFamily: "var(--font-serif), Georgia, serif" };

export const metadata: Metadata = {
  title: "How the Current System Works — Originalform",
  description:
    "Debt, monetary systems, institutional incentives — most people operate inside systems they have never examined. Stage 2 of the Originalform journey.",
  alternates: { canonical: `${BASE_URL}/understand` },
};

const mechanisms = [
  {
    title: "Debt as control",
    description:
      "Debt is not primarily a financial instrument. It is a behavioural one. A person with a mortgage, car payments, and student loans does not need to be told to comply — the structure of their obligations does that. Debt ties the future to the present, constraining choices that feel unaffordable even when they are technically available. Understanding this changes how you read financial advice, career choices, and the cultural pressure to take on leverage early.",
  },
  {
    title: "How money is created",
    description:
      "Most people believe money is printed by governments and distributed into the economy. It is not — at least not primarily. The majority of money in circulation is created by commercial banks when they issue loans. This means the money supply is driven by private lending decisions, not public policy. The implications for how wealth concentrates, how inflation works, and whose interests the system serves are significant and largely absent from mainstream financial education.",
  },
  {
    title: "The incentive structure of institutions",
    description:
      "Institutions — banks, governments, media companies, universities — are not primarily driven by their stated purpose. They are driven by the incentives that sustain them: funding, regulatory relationships, reputational dependencies, competitive dynamics. Understanding an institution means understanding what it is actually optimised for, not what it says it is for. These two things are rarely the same.",
  },
  {
    title: "The employment contract",
    description:
      "The standard employment relationship trades time, attention, and creative output for a fixed income and the psychological comfort of external structure. This trade is not neutral — it produces a particular kind of person: one whose income is controlled by someone else, whose schedule is externally imposed, and who has limited equity in what they build. Understanding the terms of this contract clearly is the precondition for deciding whether to renegotiate it.",
  },
  {
    title: "Network effects and who they serve",
    description:
      "The platforms and networks that dominate modern life — social media, search, financial systems, professional networks — generate most of their value from user participation and most of their financial return for a small ownership class. Participation is not free: it costs attention, data, and in many cases the shaping of preferences and beliefs. Knowing this does not require leaving these networks — but it changes the terms on which you participate.",
  },
];

const keyQuestions = [
  "Who owns the institution, and who funds it?",
  "What behaviour does this system reward — and what does it punish?",
  "Who captures the value created by my participation?",
  "What would need to be true for this arrangement to continue serving me?",
  "If I stopped participating, what would I lose — and what would I gain?",
];

export default function UnderstandPage() {
  return (
    <div className="bg-background pb-24">
      <div className="container max-w-3xl pt-14">
        <Breadcrumb items={[{ label: "The System", href: "/system" }, { label: "Stage 02 — Understand" }]} />
        {/* ── HEADER ── */}
        <section className="mb-4 pt-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/50">
            Stage 02 of 08 — Understand
          </p>
        </section>
        <section className="mb-16 border-b border-border pb-10 pt-4">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            How the Current System Works
          </p>
          <h1
            className="text-[2.8rem] leading-[1.02] tracking-[-0.04em] text-foreground md:text-[4rem]"
            style={editorialSerif}
          >
            You are operating inside systems you have probably never examined.
          </h1>
          <p className="mt-5 max-w-xl text-[1.1rem] leading-[1.7] text-muted-foreground">
            Deprogramming inherited beliefs is Stage 1. Stage 2 is understanding the structural systems that shape your
            options, your behaviour, and your sense of what is possible — debt, money creation, institutional
            incentives, the employment contract, and network effects.
          </p>
          <p className="mt-3 max-w-xl text-[1.1rem] leading-[1.7] text-muted-foreground">
            This is not a conspiracy theory section. These are documented mechanisms that operate in plain sight — they
            simply are not taught.
          </p>
        </section>

        {/* ── MECHANISMS ── */}
        <section className="mb-16">
          <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Five mechanisms worth understanding
          </p>
          <div className="space-y-0 divide-y divide-border/60">
            {mechanisms.map((item) => (
              <div key={item.title} className="py-8">
                <h2
                  className="mb-4 text-[1.2rem] font-semibold tracking-[-0.02em] text-foreground"
                  style={editorialSerif}
                >
                  {item.title}
                </h2>
                <p className="max-w-2xl text-[0.95rem] leading-[1.8] text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── KEY QUESTIONS ── */}
        <section className="mb-16 border border-border/60 bg-card/20 p-7">
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Five questions to apply to any system
          </p>
          <div className="space-y-3">
            {keyQuestions.map((q, i) => (
              <div key={i} className="flex items-start gap-4">
                <span className="mt-0.5 text-[11px] font-semibold text-muted-foreground/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-[0.97rem] leading-[1.65] text-foreground">{q}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── NEWSLETTER ── */}
        <section className="mb-16 border-t border-border pt-12">
          <NewsletterSubscribe
            provider="mailerlite"
            eyebrow="Stage 02 — Understand"
            title="Get the full reading list for this stage."
            description="The books, essays, and frameworks that cover this material in depth — delivered to your inbox. Plus the Originalform letter when there is something worth saying."
            buttonText="Send me the reading list"
            group="understand-stage"
            includeDefaultGroups={false}
            source="understand-page"
            successMessage="The reading list is on its way."
          />
        </section>

        {/* ── NEXT STAGE ── */}
        <section className="border-t border-border pt-10">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Next — Stage 03
          </p>
          <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground" style={editorialSerif}>
            Find your exit routes.
          </h2>
          <p className="mb-6 text-[0.95rem] leading-[1.7] text-muted-foreground">
            Once you understand how the system works, the next question is practical: what are the specific routes out
            of the dependencies that constrain your choices?
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="h-11 px-6">
              <Link href="/exit">
                Explore exit routes <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-11 px-6">
              <Link href="/system">
                Back to the full system <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
