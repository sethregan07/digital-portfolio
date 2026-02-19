"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function NavigationLoading() {
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleNavigationStart = () => {
      // Show loading immediately on navigation start
      setIsNavigating(true);

      // Hide after a short delay to prevent flash if navigation is fast
      timeoutId = setTimeout(() => {
        setIsNavigating(false);
      }, 100);
    };

    // Listen for navigation events
    const handleRouteChangeStart = () => {
      handleNavigationStart();
    };

    const handleRouteChangeComplete = () => {
      setIsNavigating(false);
      if (timeoutId) clearTimeout(timeoutId);
    };

    // Use Next.js router events if available, otherwise use a mutation observer
    // For now, we'll use a simple approach with pathname changes
    const currentPath = pathname;
    const observer = new MutationObserver(() => {
      if (window.location.pathname !== currentPath) {
        handleNavigationStart();
        setTimeout(() => setIsNavigating(false), 200);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [pathname]);

  if (!isNavigating) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-primary" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}