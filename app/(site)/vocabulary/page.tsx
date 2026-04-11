import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { BASE_URL } from "@/lib/metadata";
import { Button } from "@/components/ui/button";
import NewsletterSubscribe from "@/components/newsletter-subscribe";

export const revalidate = 300;

const editorialSerif = {
  fontFamily: "var(--font-serif), Georgia, serif",
};

export const metadata: Metadata = {
  title: "Vocabulary of Conditioning — Key Terms",
  description:
    "A reference glossary of the key terms used across Originalform — from manufactured consent to social proof to the Overton Window. Understand the words, understand the mechanisms.",
  alternates: { canonical: `${BASE_URL}/vocabulary` },
  openGraph: {
    type: "website",
    url: `${BASE_URL}/vocabulary`,
    title: "Vocabulary of Conditioning — Originalform",
    description: "The key terms for understanding how beliefs, attention, and behaviour are shaped. Free reference.",
  },
};

const categories = [
  {
    category: "How Beliefs Are Formed",
    terms: [
      {
        term: "Social Proof",
        definition:
          "The psychological mechanism by which people determine correct behaviour by observing what others do. In conditions of uncertainty, social proof is not a flaw — it is a rational shortcut. The problem is that it is exploitable at scale: manufactured consensus functions as social proof even when no genuine consensus exists.",
      },
      {
        term: "Authority Bias",
        definition:
          "The tendency to attribute greater accuracy and credibility to the opinion of an authority figure, independent of the evidence they present. Institutions exploit this by attaching credentials to messages rather than arguments. The relevant question is not 'who said this' but 'what is the quality of the argument.'",
      },
      {
        term: "Confirmation Bias",
        definition:
          "The tendency to search for, interpret, and favour information that confirms beliefs already held. Not a sign of low intelligence — if anything, higher intelligence enables more sophisticated rationalisation of pre-existing positions. The antidote is deliberate exposure to the strongest opposing view, not balanced media consumption.",
      },
      {
        term: "Availability Heuristic",
        definition:
          "The mental shortcut of estimating the probability of an event based on how easily an example comes to mind. Media coverage dramatically distorts availability: a plane crash receives weeks of coverage; car accidents, which kill orders of magnitude more people, receive none. What feels common is what is covered, not what is statistically frequent.",
      },
      {
        term: "Anchoring",
        definition:
          "The cognitive bias where the first piece of information encountered disproportionately influences subsequent judgement. Negotiators, politicians, and advertisers set anchors deliberately. Knowing what the anchor is — and where it came from — is the first move in evaluating any framed argument.",
      },
    ],
  },
  {
    category: "How Narratives Are Managed",
    terms: [
      {
        term: "Manufactured Consent",
        definition:
          "A concept developed by Noam Chomsky and Edward Herman describing the way mass media, through structural pressures rather than conspiracy, produces consent for dominant political and economic arrangements. The mechanism is not centralised control — it is shared incentives: corporate ownership, advertiser dependency, and source access all filter what gets reported and how.",
      },
      {
        term: "The Overton Window",
        definition:
          "The range of ideas that are considered acceptable to mainstream public discourse at any given time. Positions outside the window are treated as extreme, fringe, or dangerous — not because they have been evaluated and rejected, but because they fall outside the window. The window shifts over time, and its current position is always contested by those who benefit from it.",
      },
      {
        term: "Framing Effect",
        definition:
          "The way the presentation of information — rather than the information itself — shapes how it is evaluated. 'A 10% chance of dying' and 'a 90% chance of surviving' contain identical information but produce reliably different responses. Framing is not neutral: whoever controls the frame controls the starting conditions of any argument.",
      },
      {
        term: "Narrative Capture",
        definition:
          "The process by which an institution, movement, or individual successfully establishes a single story as the default lens through which an issue is viewed. Once captured, alternative framings are not merely disputed — they are invisible. The test for narrative capture is whether you find it difficult to articulate a plausible alternative frame.",
      },
      {
        term: "Moral Licensing",
        definition:
          "The psychological phenomenon where prior 'good' behaviour gives people tacit permission to behave badly afterward. At scale, it functions as a political and institutional tool: a company publicises its charitable work while lobbying against worker rights; a government announces climate targets while approving fossil fuel projects. The announcement substitutes for the action.",
      },
    ],
  },
  {
    category: "How Institutions Shape Behaviour",
    terms: [
      {
        term: "Hidden Curriculum",
        definition:
          "The set of values, norms, and behaviours transmitted through schooling that are not part of the explicit academic curriculum. Punctuality, deference to authority, performance of compliance, and the separation of work from meaning are all products of hidden curriculum — instilled not through direct instruction but through the structure of the institution itself.",
      },
      {
        term: "Credentialism",
        definition:
          "The practice of using formal credentials as a proxy for competence, insight, or trustworthiness. Credentialism serves institutional interests by maintaining gatekeeping power — and serves credentialled individuals by suppressing competition from the uncredentialled. It systematically undervalues knowledge and ability that exists outside formal systems.",
      },
      {
        term: "Incentive Structure",
        definition:
          "The set of rewards and punishments — financial, social, reputational — that shapes the behaviour of individuals within a system. Most institutional failure is not caused by bad people but by incentive structures that reward bad outcomes: a media company optimised for engagement will produce outrage regardless of the intentions of any individual journalist.",
      },
      {
        term: "Path Dependency",
        definition:
          "The tendency for current choices to be constrained by choices made in the past, even when those earlier choices are no longer optimal. Institutions are highly path-dependent: the structure of a university, a corporation, or a government reflects decisions made decades ago under different conditions. The question is not why things are this way but why they remain this way.",
      },
    ],
  },
  {
    category: "How Identity Shapes Thinking",
    terms: [
      {
        term: "Identity-Protective Cognition",
        definition:
          "The tendency to evaluate evidence in ways that protect the groups one belongs to. When a belief is tied to group membership, challenging the belief is experienced as a threat to belonging — not just an intellectual disagreement. This is why more information rarely changes identity-level beliefs: the argument is not about the evidence.",
      },
      {
        term: "Epistemic Closure",
        definition:
          "A condition in which a political, ideological, or social group becomes self-referential — accepting only information that originates within the group and treating outside information as suspect. Not unique to any political faction. Epistemic closure is a structural property of any group that prioritises cohesion over inquiry.",
      },
      {
        term: "Tribal Epistemology",
        definition:
          "The practice of determining the truth of a claim by its source rather than its content — accepting claims from in-group sources and rejecting the same claims from out-group sources regardless of the underlying evidence. The result is that shared factual reality becomes impossible within a population segmented by tribal information systems.",
      },
      {
        term: "Cognitive Dissonance",
        definition:
          "The discomfort experienced when holding two or more contradictory beliefs simultaneously — and the psychological pressure to resolve that discomfort. The resolution is usually not to abandon the flawed belief but to rationalise it into compatibility with the new evidence. Understanding this mechanism is essential to understanding why people do not simply change their minds when presented with facts.",
      },
    ],
  },
];

export default function VocabularyPage() {
  return (
    <div className="bg-background pb-24">
      <div className="container max-w-3xl pt-14">
        {/* ── HEADER ── */}
        <section className="mb-16 border-b border-border pb-10 pt-6">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Free Reference
          </p>
          <h1
            className="text-[2.8rem] leading-[1.02] tracking-[-0.04em] text-foreground md:text-[4rem]"
            style={editorialSerif}
          >
            Vocabulary of Conditioning
          </h1>
          <p className="mt-5 max-w-xl text-[1.1rem] leading-[1.7] text-muted-foreground">
            The mechanisms that shape belief, attention, and behaviour have names. Knowing the names is not the same as
            escaping the mechanisms — but it is the precondition for it.
          </p>
          <p className="mt-3 max-w-xl text-[1.1rem] leading-[1.7] text-muted-foreground">
            This is a reference, not a glossary. Each term is explained in enough depth to be useful — not just defined.
          </p>
        </section>

        {/* ── JUMP LINKS ── */}
        <section className="mb-14">
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Jump to</p>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <a
                key={cat.category}
                href={`#${cat.category.toLowerCase().replace(/\s+/g, "-")}`}
                className="rounded-sm border border-border/50 px-4 py-2 text-[0.85rem] text-muted-foreground transition-colors hover:border-border hover:text-foreground"
              >
                {cat.category}
              </a>
            ))}
          </div>
        </section>

        {/* ── TERMS ── */}
        {categories.map((cat) => (
          <section key={cat.category} id={cat.category.toLowerCase().replace(/\s+/g, "-")} className="mb-16">
            <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {cat.category}
            </p>
            <div className="space-y-0 divide-y divide-border/60">
              {cat.terms.map((item) => (
                <div key={item.term} className="py-8">
                  <h2
                    className="mb-4 text-[1.3rem] font-semibold tracking-[-0.02em] text-foreground"
                    style={editorialSerif}
                  >
                    {item.term}
                  </h2>
                  <p className="max-w-2xl text-[0.97rem] leading-[1.8] text-muted-foreground">{item.definition}</p>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* ── DOWNLOAD CTA ── */}
        <section className="mb-20">
          <div className="border border-border/60 bg-card/30 p-7">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Get the full reference
            </p>
            <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground" style={editorialSerif}>
              Download the Vocabulary of Conditioning.
            </h2>
            <p className="mb-6 max-w-lg text-[0.93rem] leading-[1.7] text-muted-foreground">
              A clean PDF version of all terms — formatted for reading or printing. Includes additional terms not in the
              web version.
            </p>
            <NewsletterSubscribe
              eyebrow="Free Reference"
              provider="mailerlite"
              title="Enter your email to get the PDF."
              description="You will also receive the Originalform letter — one idea per issue, no noise. Unsubscribe any time."
              buttonText="Send me the vocabulary PDF"
              group="vocabulary-reference"
              includeDefaultGroups={false}
              source="vocabulary-page"
              successMessage="The vocabulary reference is on its way to your inbox."
              finePrint="Check your inbox. If it takes a moment, check your spam folder."
            />
          </div>
        </section>

        {/* ── RELATED ── */}
        <section className="border-t border-border pt-10">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Related tools
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="outline" className="h-11 px-6">
              <Link href="/tools#source-audit">
                Source Audit <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-11 px-6">
              <Link href="/checklist">
                Media Audit Checklist <ArrowRight className="ml-2 h-4 w-4" />
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
