"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface PreloadLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  [key: string]: any;
}

export function PreloadLink({ href, children, className, onClick, ...props }: PreloadLinkProps) {
  const router = useRouter();
  const [isPreloaded, setIsPreloaded] = useState(false);

  useEffect(() => {
    // Preload on hover after a short delay
    let timeoutId: NodeJS.Timeout;

    const handleMouseEnter = () => {
      if (!isPreloaded) {
        timeoutId = setTimeout(() => {
          router.prefetch(href);
          setIsPreloaded(true);
        }, 100); // Small delay to avoid unnecessary preloads
      }
    };

    const handleMouseLeave = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };

    const link = document.querySelector(`a[href="${href}"]`);
    if (link) {
      link.addEventListener('mouseenter', handleMouseEnter);
      link.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        link.removeEventListener('mouseenter', handleMouseEnter);
        link.removeEventListener('mouseleave', handleMouseLeave);
        if (timeoutId) clearTimeout(timeoutId);
      };
    }
  }, [href, router, isPreloaded]);

  return (
    <Link
      href={href}
      className={className}
      onClick={onClick}
      {...props}
    >
      {children}
    </Link>
  );
}