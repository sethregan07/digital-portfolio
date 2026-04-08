"use client";

import * as React from "react";
import Link from "next/link";

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
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navigationLinks?.map((item) => (
          <NavigationMenuItem key={item.title.trim()}>
            {item.content ? (
              <>
                <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[280px] gap-2 p-3 md:w-[320px]">
                    {item.content.map((subItem) => (
                      <ListItem
                        key={subItem.href.trim()}
                        title={subItem.title}
                        href={subItem.href}
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
                  className={navigationMenuTriggerStyle()}
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

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          {/* TODO: Figure out how to type this */}
          {/* @ts-expect-error */}
          <Link
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-sm border border-transparent p-3 leading-none no-underline outline-none transition-colors hover:border-border/70 hover:bg-accent focus:border-border/70 focus:bg-accent",
              className
            )}
            {...props}
          >
            <div className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-foreground">{title}</div>
            <p className="line-clamp-2 text-[13px] leading-snug text-muted-foreground">{children}</p>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";
