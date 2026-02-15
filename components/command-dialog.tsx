"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { DialogProps } from "@radix-ui/react-alert-dialog";
import { File, Github, Laptop, Mail, Moon, Sun, Twitter, BookOpen, Calendar, Tag } from "lucide-react";
import { useTheme } from "next-themes";
import { siGithub, siX } from "simple-icons";

import siteMetadata, { defaultAuthor } from "@/lib/metadata";
import { navigationLinks } from "@/lib/navigation-links";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

// Import contentlayer generated data
import { allPosts, allPages } from "contentlayer/generated";

export function CommandDialogComponent({ ...props }: DialogProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const { setTheme } = useTheme();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const navigate = (href: string) => {
    if (href.startsWith("http")) {
      window.open(href, "_blank");
    } else {
      router.push(href);
    }
  };

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  // Filter content based on search value
  const filteredPosts = React.useMemo(() => {
    if (!searchValue.trim()) return [];

    const searchLower = searchValue.toLowerCase();
    return allPosts
      .filter((post) => post.status === "published")
      .filter((post) =>
        post.title.toLowerCase().includes(searchLower) ||
        post.description?.toLowerCase().includes(searchLower) ||
        post.tags?.some((tag: string) => tag.toLowerCase().includes(searchLower))
      );
  }, [searchValue]);

  const filteredPages = React.useMemo(() => {
    if (!searchValue.trim()) return [];

    const searchLower = searchValue.toLowerCase();
    return allPages.filter((page) =>
      page.title?.toLowerCase().includes(searchLower) ||
      page.description?.toLowerCase().includes(searchLower)
    );
  }, [searchValue]);

  const hasSearchResults = filteredPosts.length > 0 || filteredPages.length > 0;

  return (
    <>
      <Button
        variant="ghost"
        className={cn(
          "relative h-9 w-full justify-start rounded-[0.5rem] text-sm text-muted-foreground sm:pr-12 md:w-32 lg:w-64"
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <span className="inline-flex">Search...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={(open) => {
        setOpen(open);
        if (!open) {
          setSearchValue("");
        }
      }}>
        <CommandInput
          placeholder="Type a command or search..."
          value={searchValue}
          onValueChange={setSearchValue}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          {/* Search Results */}
          {hasSearchResults && (
            <>
              {filteredPosts.length > 0 && (
                <CommandGroup heading="Articles">
                  {filteredPosts.map((post) => (
                    <CommandItem
                      key={post._id}
                      onSelect={() => {
                        runCommand(() => navigate(`/posts/${post.slug}`));
                      }}
                    >
                      <BookOpen className="mr-2 h-4 w-4" />
                      <div className="flex flex-col">
                        <span>{post.title}</span>
                        {post.description && (
                          <span className="text-xs text-muted-foreground line-clamp-1">
                            {post.description}
                          </span>
                        )}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {filteredPages.length > 0 && (
                <CommandGroup heading="Pages">
                  {filteredPages.map((page) => (
                    <CommandItem
                      key={page._id}
                      onSelect={() => {
                        runCommand(() => navigate(`/${page.slug}`));
                      }}
                    >
                      <File className="mr-2 h-4 w-4" />
                      <div className="flex flex-col">
                        <span>{page.title || page.slug}</span>
                        {page.description && (
                          <span className="text-xs text-muted-foreground line-clamp-1">
                            {page.description}
                          </span>
                        )}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              <CommandSeparator />
            </>
          )}

          {/* Navigation Links - only show when not searching */}
          {!hasSearchResults && (
            <>
              <CommandGroup heading="Content">
                {navigationLinks.map((item) =>
                  item.content ? (
                    item.content.map((subItem) => (
                      <CommandItem
                        key={subItem.title.trim()}
                        onSelect={() => {
                          runCommand(() => navigate(subItem.href as string));
                        }}
                      >
                        <File className="mr-2 h-4 w-4" />
                        <span>{subItem.title}</span>
                      </CommandItem>
                    ))
                  ) : (
                    <CommandItem
                      key={item.title.trim()}
                      onSelect={() => {
                        runCommand(() => navigate(item.href as string));
                      }}
                    >
                      <File className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </CommandItem>
                  )
                )}
              </CommandGroup>
              <CommandSeparator />
            </>
          )}

          <CommandGroup heading="Social">
            <CommandItem
              onSelect={() => {
                runCommand(() =>
                  navigate(defaultAuthor.socialProfiles.find((platform) => platform.name === "x")?.link as string)
                );
              }}
            >
              <svg
                role="img"
                viewBox="0 0 24 24"
                className="mr-2 h-4 w-4"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d={siX.path}></path>
              </svg>
              <span>X (formerly Twitter)</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                runCommand(() =>
                  navigate(defaultAuthor.socialProfiles.find((platform) => platform.name === "github")?.link as string)
                );
              }}
            >
              <svg
                role="img"
                viewBox="0 0 24 24"
                className="mr-2 h-4 w-4"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d={siGithub.path}></path>
              </svg>
              <span>Github</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
              <Sun className="mr-2 h-4 w-4" />
              Light
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
              <Moon className="mr-2 h-4 w-4" />
              Dark
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
              <Laptop className="mr-2 h-4 w-4" />
              System
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}