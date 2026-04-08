// Component inspired by Julien https://www.julienthibeaut.xyz/blog/create-modern-spotlight-effect-with-react-css
"use client";

import type { ReactNode } from "react";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Lightbulb } from "lucide-react";
import { useTheme } from "next-themes";

interface SpotlightCardProps {
  title: string;
  description: string;
  mediaSrc?: string;
  mediaType?: "image" | "video" | "icon";
  href: string;
  icon?: ReactNode;
  iconName?: "book-open" | "lightbulb";
  tag?: string;
  highlights?: string[];
  forWhom?: string;
  outcome?: string;
  proof?: string;
  meta?: string;
  priceNote?: string;
  ctaLabel?: string;
}

export const SpotlightCard = ({
  title,
  description,
  mediaSrc,
  mediaType = "image",
  href,
  icon,
  iconName,
  tag,
  highlights,
  forWhom,
  outcome,
  proof,
  meta,
  priceNote,
  ctaLabel,
}: SpotlightCardProps) => {
  const resolvedIcon =
    icon ??
    (iconName === "book-open" ? (
      <BookOpen className="h-9 w-9" />
    ) : iconName === "lightbulb" ? (
      <Lightbulb className="h-9 w-9" />
    ) : null);
  const { theme } = useTheme();
  const divRef = useRef<HTMLAnchorElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  const target = href.startsWith("http") ? "_blank" : undefined;
  const rel = href.startsWith("http") ? "noreferrer" : undefined;

  return (
    <Link
      ref={divRef}
      href={href}
      target={target}
      rel={rel}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="premium-surface group relative flex h-full w-full max-w-none flex-col overflow-hidden rounded-sm border border-border/70 shadow-none transition-all duration-300 ease-out hover:-translate-y-1 hover:border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(520px circle at ${position.x}px ${position.y}px, ${
            theme !== "dark" ? "hsla(0,0%,30%,.08)" : "hsla(360,100%,100%,.05)"
          }, transparent 45%)`,
        }}
      />

      <div className="flex h-full flex-col md:flex-row md:items-stretch">
        <div className="relative flex items-center justify-center border-b border-border/70 bg-muted/10 px-6 py-6 md:h-full md:w-52 md:self-stretch md:border-b-0 md:border-r md:py-0">
          <div className="bg-background/55 flex h-20 w-20 items-center justify-center border border-border/70 text-foreground">
            {mediaType === "video" ? (
              <video autoPlay loop muted playsInline className="h-20 w-20 rounded-2xl object-cover">
                <source src="/project-garden.webm" type="video/webm" />
                <source src="/project-garden.mp4" type="video/mp4" />
              </video>
            ) : mediaType === "image" && mediaSrc ? (
              <Image
                src={mediaSrc}
                alt={title}
                width={120}
                height={120}
                className="h-20 w-20 rounded-2xl object-cover"
              />
            ) : (
              resolvedIcon
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-center gap-4 p-6 md:py-8">
          <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
            {tag && <span className="border border-border/70 px-2 py-1">{tag}</span>}
            {meta && <span className="border border-border/70 px-2 py-1">{meta}</span>}
            {priceNote && <span className="border border-border/70 px-2 py-1">{priceNote}</span>}
          </div>

          <div>
            <h2
              className="text-2xl leading-tight tracking-[-0.02em] text-foreground"
              style={{
                fontFamily: "var(--font-serif), Georgia, serif",
              }}
            >
              {title}
            </h2>
            <p className="mt-3 text-[1rem] leading-8 text-muted-foreground">{description}</p>
          </div>

          {highlights && highlights.length > 0 && (
            <ul className="grid gap-2 text-[1rem] leading-7 text-foreground/90">
              {highlights.slice(0, 3).map((highlight) => (
                <li key={highlight} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-foreground/70" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="grid gap-3 text-[1rem] leading-7 text-muted-foreground">
            {forWhom && (
              <p>
                <span className="font-semibold text-foreground">For:</span> {forWhom}
              </p>
            )}
            {outcome && (
              <p>
                <span className="font-semibold text-foreground">Outcome:</span> {outcome}
              </p>
            )}
            {proof && (
              <p>
                <span className="font-semibold text-foreground">Proof:</span> {proof}
              </p>
            )}
          </div>

          <div className="mt-auto flex items-center justify-between border-t border-border/60 pt-4">
            <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition group-hover:opacity-70">
              {ctaLabel ?? "Explore"}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </span>
            <span className="text-[12px] uppercase tracking-[0.12em] text-muted-foreground">Open</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
