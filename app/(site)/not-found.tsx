"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

const editorialSerif = {
  fontFamily: "var(--font-serif), Georgia, serif",
};

const suggestions = [
  { label: "Start here", href: "/start-here", note: "New? This is the entry point." },
  { label: "The full system", href: "/system", note: "All 8 stages in one map." },
  { label: "Free guide", href: "/free-guide", note: "5 Signs Your Thinking Has Been Managed." },
  { label: "All essays", href: "/articles", note: "47 essays across 4 series." },
  { label: "The course", href: "/projects/deprogramming", note: "42 lessons, free to start." },
  { label: "Free tools", href: "/tools", note: "Checklists, worksheets, quiz." },
];

export default function NotFound() {
  return (
    <div className="container max-w-3xl py-24">
      <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">404</p>
      <h1 className="mb-4 text-[2.8rem] leading-[1.05] tracking-[-0.04em] text-foreground" style={editorialSerif}>
        This page doesn&apos;t exist.
      </h1>
      <p className="mb-10 max-w-md text-[1rem] leading-[1.75] text-muted-foreground">
        The page may have moved, been renamed, or never existed. Here are the most useful places to go instead.
      </p>

      <div className="mb-10 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {suggestions.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group border border-border/50 bg-card/10 p-4 transition-colors hover:border-border hover:bg-card/30"
          >
            <p className="text-[0.93rem] font-semibold text-foreground">{s.label}</p>
            <p className="mt-0.5 text-[0.8rem] text-muted-foreground/60">{s.note}</p>
            <div className="mt-2 flex items-center gap-1 text-[10px] text-muted-foreground/40 transition-colors group-hover:text-muted-foreground/70">
              Go there <ArrowRight className="h-3 w-3" />
            </div>
          </Link>
        ))}
      </div>

      <div className="flex gap-3">
        <Button asChild className="rounded-sm">
          <Link href="/">Back to home</Link>
        </Button>
        <Button asChild variant="outline" className="rounded-sm border-border/60">
          <Link href="/contact">Something broken? Let us know</Link>
        </Button>
      </div>
    </div>
  );
}
