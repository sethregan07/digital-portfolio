import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, ChevronRight, Download, Lightbulb } from "lucide-react";

import { BASE_URL } from "@/lib/metadata";
import { Button } from "@/components/ui/button";
import NewsletterSubscribe from "@/components/newsletter-subscribe";

export const revalidate = 300;

const editorialSerif = {
  fontFamily: "var(--font-serif), Georgia, serif",
};

export const metadata: Metadata = {
  title: "Free Guide: 5 Signs Your Thinking Has Been Managed",
  description:
    "Recognise the signs — then do something about each one. A free, practical guide for founders and thinkers.",
  alternates: { canonical: `${BASE_URL}/free-guide` },
  openGraph: {
    type: "website",
    url: `${BASE_URL}/free-guide`,
    title: "5 Signs Your Thinking Has Been Managed",
    description: "Not just a diagnostic. A guide that tells you what to do about each sign — free.",
  },
};

const signs = [
  {
    sign: "You defend systems you have never personally examined.",
    fix: "Pick one system you defend strongly — political, economic, or social. Ask: have I read the best argument against this, or only the arguments for it? Spend 30 minutes with the strongest opposing view. The discomfort is the signal.",
  },
  {
    sign: "Your strongest opinions arrived pre-packaged.",
    fix: "Trace one strong opinion back to its source. Where did it actually come from — a parent, a culture, a media environment? Ask whether you would hold the same opinion if you had grown up somewhere different. If the answer is probably not, the opinion is borrowed.",
  },
  {
    sign: "You feel anxiety when your beliefs are challenged, not curiosity.",
    fix: "The next time someone challenges a belief, pause before defending it. Ask yourself one question: what would have to be true for them to be right? You don't have to agree. Just run the thought. That pause is where independent thinking begins.",
  },
  {
    sign: "You confuse access to information with clarity of thought.",
    fix: "More reading is rarely the answer. The answer is a framework for evaluating what you read. Stop adding inputs until you have a method for sorting them. A good framework makes information useful — without one, information just adds noise.",
  },
  {
    sign: "You have never seriously questioned who benefits from what you believe.",
    fix: "For any major belief you hold — about money, work, relationships, institutions — ask: who profits from me believing this? Follow the incentive. The answer is almost never neutral, and finding it is one of the most clarifying things you can do.",
  },
];

export default function FreeGuidePage() {
  return (
    <div className="bg-background pb-24">
      <div className="container max-w-2xl pt-16">
        {/* Label */}
        <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Free Guide — Diagnosis + Action
        </p>

        {/* Headline */}
        <h1
          className="text-[2.8rem] leading-[1.05] tracking-[-0.04em] text-foreground md:text-[3.8rem]"
          style={editorialSerif}
        >
          5 Signs Your Thinking Has Been Managed
        </h1>

        <p className="mt-6 text-[1.1rem] leading-[1.7] text-muted-foreground">
          Most guides on this topic stop at the diagnosis. This one tells you what to do about each sign — practically,
          the same day you read it.
        </p>

        <p className="mt-3 text-[1.1rem] leading-[1.7] text-muted-foreground">
          Intelligence is not protection. Smart people are often the most efficiently conditioned — because they can
          build more elegant justifications for whatever frame they were handed.
        </p>

        {/* Signs + Fixes */}
        <div className="mt-12 space-y-0 divide-y divide-border/60">
          {signs.map((item, i) => (
            <div key={i} className="py-7">
              {/* Sign */}
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <p className="text-[1rem] font-medium leading-[1.6] text-foreground">{item.sign}</p>
              </div>
              {/* Fix */}
              <div className="mt-4 flex items-start gap-3 rounded-sm border border-border/50 bg-card/40 px-4 py-4">
                <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <p className="text-[0.92rem] leading-[1.65] text-muted-foreground">{item.fix}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-border" />

        {/* CTA — subscribe to get it */}
        <NewsletterSubscribe
          eyebrow="Free Guide"
          provider="mailerlite"
          title="Get the full guide in your inbox."
          description="You'll also receive the Originalform letter — one idea, one framework, no noise. Roughly twice a month. Unsubscribe any time."
          buttonText="Send me the guide"
          group="free-guide"
          includeDefaultGroups={false}
          source="free-guide-page"
          successMessage="Done. The guide is on its way — check your inbox. If it takes a minute, use the direct download below."
          finePrint="After subscribing, the guide arrives by email. The direct download below is your fallback."
        />

        {/* Direct download */}
        <div className="mt-6 text-center">
          <p className="mb-3 text-[12px] text-muted-foreground">Already subscribed?</p>
          <Button asChild variant="outline" className="h-10 px-6">
            <a href="/5-signs-your-thinking-has-been-managed.pdf" download>
              Download directly <Download className="ml-2 h-3.5 w-3.5" />
            </a>
          </Button>
        </div>

        {/* Divider */}
        <div className="my-12 border-t border-border" />

        {/* What's next */}
        <div>
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            If this resonates
          </p>
          <h3 className="mb-3 text-xl font-semibold tracking-tight text-foreground" style={editorialSerif}>
            The Deprogramming course is the full version of this.
          </h3>
          <p className="mb-6 text-[0.95rem] leading-[1.7] text-muted-foreground">
            42 structured lessons that move through how conditioning actually works — across institutions, media,
            economic systems, education, and family. Not ideology. Method. Free to start.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="h-11 px-6">
              <Link href="/projects/deprogramming">
                Explore the course <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-11 px-6">
              <Link href="/start-here">
                Not sure where to start? <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
