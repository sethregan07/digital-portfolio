"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { navigationLinks } from "@/lib/navigation-links";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function Navbar() {
  const pathname = usePathname();

  function isActiveDropdown(content: { href: string }[]) {
    return content.some((item) => pathname === item.href || pathname.startsWith(item.href + "/"));
  }

  function isActiveLink(href: string) {
    return pathname === href || (href !== "/" && pathname.startsWith(href + "/"));
  }

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navigationLinks?.map((item) => (
          <NavigationMenuItem key={item.title.trim()}>
            {item.groups ? (
              <>
                <NavigationMenuTrigger
                  className={cn(
                    item.content &&
                      isActiveDropdown(item.content) &&
                      "border border-border/60 bg-accent/60 text-foreground"
                  )}
                >
                  {item.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  {/* Grouped layout */}
                  <div className="flex w-[580px] gap-0 p-3">
                    {item.groups.map((group, gi) => (
                      <div key={group.label} className={cn("flex-1", gi > 0 && "ml-3 border-l border-border/40 pl-3")}>
                        <p className="mb-2 px-3 text-[9px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/40">
                          {group.label}
                        </p>
                        <ul className="space-y-0.5">
                          {group.items.map((subItem) => (
                            <ListItem
                              key={subItem.href}
                              title={subItem.title}
                              href={subItem.href}
                              isActive={pathname === subItem.href}
                              target={subItem.href.startsWith("http") ? "_blank" : "_self"}
                            >
                              {subItem.description}
                            </ListItem>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </NavigationMenuContent>
              </>
            ) : item.content ? (
              <>
                <NavigationMenuTrigger
                  className={cn(
                    isActiveDropdown(item.content) && "border border-border/60 bg-accent/60 text-foreground"
                  )}
                >
                  {item.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[320px] gap-2 p-3">
                    {item.content.map((subItem) => (
                      <ListItem
                        key={subItem.href.trim()}
                        title={subItem.title}
                        href={subItem.href}
                        isActive={pathname === subItem.href}
                        target={subItem.href.startsWith("http") ? "_blank" : "_self"}
                      >
                        {subItem.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <Link href={item.href as string} legacyBehavior passHref>
                <NavigationMenuLink
                  target={item?.href?.startsWith("http") ? "_blank" : "_self"}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    isActiveLink(item.href as string) && "border border-border/60 bg-accent/60 text-foreground"
                  )}
                  aria-current={isActiveLink(item.href as string) ? "page" : undefined}
                >
                  {item.title}
                </NavigationMenuLink>
              </Link>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a"> & { isActive?: boolean }>(
  ({ className, title, children, isActive, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          {/* @ts-expect-error */}
          <Link
            ref={ref}
            className={cn(
              "block select-none rounded-sm border p-2.5 leading-none no-underline outline-none transition-colors hover:border-border/70 hover:bg-accent focus:border-border/70 focus:bg-accent",
              isActive ? "border-border/50 bg-accent/40" : "border-transparent",
              className
            )}
            aria-current={isActive ? "page" : undefined}
            {...props}
          >
            <div className="mb-0.5 font-sans text-[11px] font-semibold uppercase tracking-[0.13em] text-foreground">
              {title}
            </div>
            <p className="line-clamp-1 text-[12px] leading-snug text-muted-foreground/70">{children}</p>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";
