"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

import siteMetadata from "@/lib/metadata";
import { cn } from "@/lib/utils";
import { AnnouncementBar } from "@/components/announcement-bar";
import { MobileNav } from "@/components/mobile-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { Navbar } from "@/components/navbar";

const CommandDialogComponent = dynamic(
  () => import("@/components/command-dialog").then((mod) => mod.CommandDialogComponent),
  { ssr: false }
);

const wordmark = {
  fontFamily: "var(--font-serif), Georgia, serif",
};

export function Navigation() {
  const [visible, setVisible] = useState(true);
  const prevScrollPosRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const prevScrollPos = prevScrollPosRef.current;

      if ((prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 70) || currentScrollPos < 10) {
        setVisible(true);
      } else {
        setVisible(false);
      }

      prevScrollPosRef.current = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Announcement bar — points to course, not DevHunt */}
      {siteMetadata?.activeAnnouncement && (
        <AnnouncementBar
          buttonText={siteMetadata.announcement.buttonText as string}
          link={siteMetadata.announcement.link as string}
        >
          <strong className="mr-1">New:</strong> Deprogramming — a 42-lesson course on clear thinking. Free to start.
        </AnnouncementBar>
      )}

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-20 mx-auto transition-all duration-1000 animate-out sm:h-16 sm:px-0 sm:transition-none",
          visible && "animate-in",
          !visible && "-top-32 sm:top-0",
          siteMetadata.activeAnnouncement && "sm:top-28 md:top-20 lg:top-12"
        )}
      >
        <div className="premium-panel flex items-center gap-2 border-b border-border/80 px-3 py-2.5 supports-[backdrop-filter]:bg-background/90 sm:justify-between sm:px-3">
          <div className="container relative mx-auto flex max-w-6xl items-center justify-between">
            <div className="flex shrink-0 items-center justify-start">
              <Link href="/" aria-label="Go to Home">
                <span
                  className="hidden text-[1.35rem] font-semibold tracking-[-0.03em] text-foreground sm:block"
                  style={wordmark}
                >
                  Originalform
                </span>
              </Link>
            </div>

            <Link href="/" aria-label="Go to Home" className="absolute left-1/2 -translate-x-1/2 sm:hidden">
              <span className="text-[1.45rem] font-semibold tracking-[-0.03em] text-foreground" style={wordmark}>
                Originalform
              </span>
            </Link>

            <div className="order-1 sm:order-2 sm:ml-auto">
              <nav className="ml-auto hidden font-sans text-sm font-medium sm:block sm:w-full">
                <Navbar />
              </nav>
              <nav className="sm:hidden">
                <MobileNav />
              </nav>
            </div>

            {/* Actions — search + mode toggle */}
            <div className="order-2 ml-auto flex w-auto items-center justify-end gap-2 sm:order-3 sm:ml-4 sm:w-fit">
              <CommandDialogComponent className="border border-border/70 bg-background/60 text-muted-foreground hover:bg-accent hover:text-foreground sm:bg-background/30" />
              <ModeToggle />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
