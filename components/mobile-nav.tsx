"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MobileLinkProps } from "@/types";
import { Menu } from "lucide-react";

import siteMetadata from "@/lib/metadata";
import { navigationLinks } from "@/lib/navigation-links";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 h-8 border border-border/80 px-2 hover:bg-transparent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] border-border bg-background pr-0 sm:w-[340px]">
        <MobileLink href="/" className="flex items-center" onOpenChange={setOpen} aria-label="Go to Home">
          <span className="font-heading text-2xl font-semibold tracking-[-0.03em]">{siteMetadata.title.default}</span>
        </MobileLink>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10">
          <div className="flex flex-col space-y-3">
            {navigationLinks?.map((item) =>
              item.content ? (
                <div className="order-1 mt-3 flex flex-col space-y-3" key={item.title.trim()}>
                  <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    {item.title}
                  </p>
                  {item.content.map((subItem) => (
                    <MobileLink key={subItem.href} href={subItem.href} onOpenChange={setOpen}>
                      {subItem.title}
                    </MobileLink>
                  ))}
                </div>
              ) : (
                <MobileLink key={item.href} href={item.href as string} onOpenChange={setOpen}>
                  {item.title}
                </MobileLink>
              )
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

function MobileLink({ href, onOpenChange, className, children, ...props }: MobileLinkProps) {
  const pathname = usePathname();
  if (href.toString().startsWith("http")) {
    return (
      <a
        href={href.toString()}
        onClick={() => {
          onOpenChange?.(false);
        }}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(className)}
        {...props}
      >
        {children}
      </a>
    );
  }
  return (
    <Link
      href={href}
      onClick={() => {
        onOpenChange?.(false);
      }}
      className={cn(
        "border-b border-border/60 pb-2 font-sans text-lg tracking-[-0.02em]",
        className,
        href.toString() !== "/" &&
          pathname.substring(2).startsWith(href.toString().substring(2)) &&
          "font-semibold text-accent-foreground"
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
