import { Metadata } from "next";

import { BASE_URL } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const url = `${BASE_URL}/social`;

  return {
    title: "Social Links",
    description: "Social links, contact routes, and project links for Originalform.",
    alternates: {
      canonical: url,
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default function SocialLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
