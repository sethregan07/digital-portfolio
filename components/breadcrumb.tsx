import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("mb-6 flex items-center gap-1.5", className)}>
      <Link
        href="/"
        className="flex items-center text-muted-foreground/50 transition-colors hover:text-muted-foreground"
        aria-label="Home"
      >
        <Home className="h-3 w-3" />
      </Link>

      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-1.5">
          <ChevronRight className="h-3 w-3 text-muted-foreground/30" aria-hidden="true" />
          {item.href && index < items.length - 1 ? (
            <Link
              href={item.href}
              className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground/50 transition-colors hover:text-muted-foreground"
            >
              {item.label}
            </Link>
          ) : (
            <span
              className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground/70"
              aria-current={index === items.length - 1 ? "page" : undefined}
            >
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
