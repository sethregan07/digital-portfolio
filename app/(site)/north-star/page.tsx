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
  title: "What Is Your North Star — Purpose and Direction",
  description:
    "After deprogramming and discovering your archetype, the question becomes: what is the direction that is genuinely yours? Stage 5 of the Originalform system.",
  alternates: { canonical: `${BASE_URL}/north-star` },
};

const questions = [
  {
    prompt: "What would you do if no one was watching and there was no social approval attached to it?",
    detail:
      "Strip away what looks good, what earns status, what your family approves of, and what your industry rewards. What remains is a signal. It may be small, unpractical, or embarrassingly simple. It is still a signal.",
  },
  {
    prompt: "What problems do you find yourself trying to solve even when no one asked you to?",
    detail:
      "People with a clear direction tend to gravitate toward certain types of problems regardless of context — at work, in conversation, in how they spend discretionary time. The problem types you are drawn to are not random. They point toward something.",
  },
  {
    prompt: "What were you doing the last time time disappeared?",
    detail:
      "Flow states are not aspirational. They are data. When time disappears, it is because the activity is engaging your actual capabilities at near their full extent. The activities that reliably produce this are worth cataloguing.",
  },
  {
    prompt: "What would you build if you knew it would work?",
    detail:
      "Most people's hesitation about purpose is practical: it might not succeed, it might not pay, they might not be good enough. Remove the question of outcome and notice what emerges. The answer to 'what would you build if it definitely worked' bypasses most of the fear-based filtering that obscures direction.",
  },
  {
    prompt: "What do you want to still be true about your life when you are 80?",
    detail:
      "Not what you want to have done or achieved — what you want to be still true. Relationships, character, contribution, the way you spent time. This question reverses the direction of planning: instead of optimising from now, it orients from the end.",
  },
];

const clarityKillers = [
  {
    title: "Optimising for others' approval",
    description:
      "The most common reason people cannot find their direction is that they have been filtering their genuine impulses through the question of what other people will think. The direction that would survive zero social approval is the one worth orienting toward.",
  },
  {
    title: "Waiting for certainty",
    description:
      "Purpose does not arrive fully formed before you act. It clarifies through action, not before it. The people with the clearest sense of direction got there by moving — testing, failing, adjusting — not by thinking until the answer appeared.",
  },
  {
    title: "Confusing a career with a purpose",
    description:
      "A career is a vehicle. Purpose is the direction. The same purpose can be expressed through many different careers, roles, and structures. Constraining the question to 'what job should I have' dramatically reduces the answer space.",
  },
  {
    title: "Treating purpose as permanent",
    description:
      "Your north star at 25 is not the same as your north star at 45. Direction evolves as you do. The mistake is either never having a direction or treating it as fixed. A direction is a current best answer, held with commitment but not rigidity.",
  },
];

export default function NorthStarPage() {
  return (
    <div className="bg-background pb-24">
      <div className="container max-w-3xl pt-14">
        <Breadcrumb items={[{ label: "The System", href: "/system" }, { label: "Stage 05 — North Star" }]} />
        <section className="mb-4 pt-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/50">
            Stage 05 of 08 — Discover
          </p>
        </section>
        <section className="mb-16 border-b border-border pb-10 pt-4">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            What Is Your North Star
          </p>
          <h1
            className="text-[2.8rem] leading-[1.02] tracking-[-0.04em] text-foreground md:text-[4rem]"
            style={editorialSerif}
          >
            After the noise clears, a direction becomes visible. This is how to find it.
          </h1>
          <p className="mt-5 max-w-xl text-[1.1rem] leading-[1.7] text-muted-foreground">
            Purpose is not a destination you arrive at. It is a direction you orient toward — one that pulls you forward
            without requiring constant motivation because it is aligned with how you are actually built.
          </p>
          <p className="mt-3 max-w-xl text-[1.1rem] leading-[1.7] text-muted-foreground">
            The work of Stage 1 — clearing conditioning — is the precondition for this. You cannot find a direction that
            is genuinely yours while you are still defending someone else's.
          </p>
        </section>

        {/* ── FIVE QUESTIONS ── */}
        <section className="mb-16">
          <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Five questions that orient toward your north star
          </p>
          <div className="space-y-0 divide-y divide-border/60">
            {questions.map((item, i) => (
              <div key={i} className="py-8">
                <div className="mb-4 flex items-baseline gap-5">
                  <span className="text-muted-foreground/15 text-[1.6rem] font-semibold" style={editorialSerif}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2
                    className="text-[1.05rem] font-semibold leading-[1.4] tracking-[-0.01em] text-foreground"
                    style={editorialSerif}
                  >
                    {item.prompt}
                  </h2>
                </div>
                <div className="ml-14 border-l border-border/40 pl-5">
                  <p className="text-[0.93rem] leading-[1.75] text-muted-foreground">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CLARITY KILLERS ── */}
        <section className="mb-16">
          <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            What kills clarity about direction
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {clarityKillers.map((item) => (
              <div key={item.title} className="border border-border/40 bg-card/20 p-5">
                <h3 className="mb-3 font-semibold text-foreground" style={editorialSerif}>
                  {item.title}
                </h3>
                <p className="text-[0.9rem] leading-[1.65] text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── SOVEREIGN INDIVIDUAL ── */}
        <section className="mb-16 border border-border/60 bg-card/20 p-7">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Framework — The Sovereign Individual
          </p>
          <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground" style={editorialSerif}>
            Autonomy as the precondition for direction.
          </h2>
          <p className="mb-4 text-[0.95rem] leading-[1.7] text-muted-foreground">
            The Sovereign Individual framework argues that the most important shift of our era is the decoupling of
            income, identity, and location from institutional gatekeepers. When a person is not financially or socially
            dependent on a single employer, institution, or geography, their range of choices expands dramatically —
            including choices about direction and purpose.
          </p>
          <p className="text-[0.95rem] leading-[1.7] text-muted-foreground">
            Your north star cannot be fully expressed if your circumstances require constant compromise to survive.
            Building autonomy is not separate from finding your direction — it is what makes it executable.
          </p>
        </section>

        {/* ── NEWSLETTER ── */}
        <section className="mb-16 border-t border-border pt-12">
          <NewsletterSubscribe
            provider="mailerlite"
            eyebrow="Stage 05 — North Star"
            title="Get the North Star worksheet."
            description="A structured set of prompts for working through the five questions — formatted for a single sitting. Free."
            buttonText="Send me the worksheet"
            group="north-star"
            includeDefaultGroups={false}
            source="north-star-page"
            successMessage="The worksheet is on its way."
          />
        </section>

        {/* ── NEXT ── */}
        <section className="border-t border-border pt-10">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Next — Stage 06
          </p>
          <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground" style={editorialSerif}>
            Build the structure that fits who you actually are.
          </h2>
          <p className="mb-6 text-[0.95rem] leading-[1.7] text-muted-foreground">
            Once you have a direction, you need a work and life structure that supports it — one built around your
            energy, your archetype, and your actual priorities. The 12-week framework and energy calendar live here.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="h-11 px-6">
              <Link href="/build">
                Explore Stage 06 — Build <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-11 px-6">
              <Link href="/archetypes">
                Find your archetype first <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
