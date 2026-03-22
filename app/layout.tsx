import "./globals.css";

import { Metadata } from "next";

import siteMetadata, { BASE_URL, defaultAuthor } from "@/lib/metadata";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@/components/analytics";
import { BackTopButton } from "@/components/back-to-top";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: siteMetadata.title,
  description: siteMetadata.description,
  authors: [{ name: defaultAuthor.name, url: defaultAuthor.website }],
  alternates: {
    canonical: BASE_URL,
    types: {
      "application/rss+xml": `${BASE_URL}/feed.xml`,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    title: siteMetadata.title.default,
    description: siteMetadata.description,
    siteName: siteMetadata.title.default,
    images: [
      {
        url: `${BASE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: siteMetadata.title.default,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title.default,
    description: siteMetadata.description,
    images: [`${BASE_URL}/twitter-image`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-gradient-to-b from-slate-100 to-white text-slate-900 antialiased dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 dark:text-slate-50">
        <ThemeProvider
          storageKey="digital-garden-theme"
          attribute="class"
          defaultTheme={siteMetadata.defaultTheme}
          enableSystem
        >
          {children}
          <BackTopButton />
          <Toaster />
        </ThemeProvider>
      </body>
      <Analytics />
    </html>
  );
}
