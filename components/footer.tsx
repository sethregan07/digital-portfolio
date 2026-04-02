import React from "react";
import Link from "next/link";

import { defaultAuthor } from "@/lib/metadata";
import { CopyButton } from "@/components/copy-button";

const editorialSerif = {
  fontFamily: '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, "Times New Roman", serif',
};

const footerLinks = [
  { label: "Articles", href: "/articles" },
  { label: "Frameworks", href: "/frameworks" },
  { label: "Deprogramming", href: "/projects/deprogramming" },
  { label: "Now", href: "/now" },
  { label: "Offerings", href: "/projects" },
];

const socialLinks = [
  { label: "X / Twitter", href: "https://x.com/originalformx" },
  { label: "Substack", href: "https://originalform.substack.com" },
  { label: "Medium", href: "https://medium.com/@originalform" },
  { label: "Quora", href: "https://www.quora.com/profile/Originalform" },
  { label: "Bluesky", href: "https://bsky.app/profile/originalform.bsky.social" },
  // { label: "LinkedIn", href: "https://linkedin.com/in/yourhandle" },
  // { label: "YouTube", href: "https://youtube.com/@originalform" },
];

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-border/70 bg-gradient-to-t from-background via-background to-muted/30 pb-10 pt-12">
      <div className="container mx-auto max-w-5xl">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-16">
          {/* ── LEFT ── */}
          <div>
            <div className="mb-4 text-2xl font-bold tracking-[-0.02em] text-foreground" style={editorialSerif}>
              Originalform
            </div>

            <p className="mb-6 max-w-sm text-sm font-light leading-7 text-muted-foreground">
              A practical editorial space for essays, frameworks, and courses about clearer thinking, deprogramming, and
              more grounded decision-making.
            </p>

            <nav className="mb-8 flex flex-wrap gap-x-5 gap-y-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <p className="text-xs text-muted-foreground/50">&copy; {new Date().getFullYear()} Originalform.</p>
          </div>

          {/* ── RIGHT ── */}
          <div className="border-t border-border/60 pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <p className="mb-5 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Connect</p>

            <div className="mb-6 flex flex-col gap-3">
              {socialLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between"
                >
                  <span className="text-sm font-light text-muted-foreground transition-colors group-hover:text-foreground">
                    {label}
                  </span>
                  <span className="text-xs text-muted-foreground/30 transition-colors group-hover:text-muted-foreground">
                    ↗
                  </span>
                </a>
              ))}
            </div>

            <div className="border-t border-border/60 pt-5">
              <p className="mb-2 text-[10px] uppercase tracking-[0.14em] text-muted-foreground/50">Email</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-light text-muted-foreground">{defaultAuthor.email}</span>
                <CopyButton
                  size="sm"
                  variant="ghost"
                  className="h-7 rounded-sm px-2 text-xs text-muted-foreground hover:text-foreground"
                  copyText={defaultAuthor.email}
                >
                  Copy
                </CopyButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
