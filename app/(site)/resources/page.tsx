import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, PlayCircle } from "lucide-react";

import { BASE_URL } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Resources";
  const description =
    "Books, videos, and articles selected for systems thinking, social critique, and grounded growth.";
  const url = `${BASE_URL}/resources`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", url, title, description },
    twitter: { card: "summary_large_image", title, description },
  };
}

const editorialSerif = {
  fontFamily: '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, "Times New Roman", serif',
};

const books = [
  {
    title: "Debt: The First 5,000 Years",
    author: "David Graeber",
    why: "The book that reframed how I think about money, obligation, and the stories economies tell about themselves.",
    description: "An exploration of how debt, obligation, and moral language shaped human societies across history.",
    image: "https://covers.openlibrary.org/b/olid/OL24088724M-L.jpg",
    link: "https://www.goodreads.com/book/show/6617037-debt",
  },
  {
    title: "The Tyranny of Experts",
    author: "William Easterly",
    why: "A rigorous takedown of the assumption that top-down expertise produces good outcomes for real people.",
    description: "A critique of top-down development logic and the blind spots of technocratic problem solving.",
    image: "https://covers.openlibrary.org/b/olid/OL26791447M-L.jpg",
    link: "https://www.goodreads.com/book/show/18210744-the-tyranny-of-experts",
  },
];

const videos = [
  {
    title: "Osho on Democracy",
    why: "Cuts through the inherited language around democratic ideals and asks harder questions.",
    description: "A talk on democracy, power, and the limits of inherited political language.",
    thumbnail: "https://img.youtube.com/vi/fCQoukZvvFo/hqdefault.jpg",
    link: "https://www.youtube.com/watch?v=fCQoukZvvFo",
  },
  {
    title: "Osho on Marriage",
    why: "Useful for separating what relationships actually are from what culture says they should be.",
    description: "A conversation on marriage, love, and the difference between social structure and relationship.",
    thumbnail: "https://img.youtube.com/vi/CXlMz1Ja2VM/hqdefault.jpg",
    link: "https://youtu.be/CXlMz1Ja2VM?si=xqqb03zKwCIwzm2j",
  },
];

const articles = [
  {
    title: "The Manufactured Crisis of Productivity",
    source: "Aeon",
    description:
      "How the productivity industry repackages anxiety as ambition — and what a grounded alternative looks like.",
    link: "https://aeon.co",
  },
  {
    title: "Against Hustle Culture",
    source: "Cal Newport",
    description:
      "A systematic look at how overwork became a status signal and why it produces worse thinking, not better.",
    link: "https://calnewport.com",
  },
];

function SectionHeader({ label, count }: { label: string; count?: number }) {
  return (
    <div className="mb-8 flex items-baseline justify-between border-b border-border/70 pb-3">
      <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
      {count !== undefined && (
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground/40">
          {count} {count === 1 ? "item" : "items"}
        </span>
      )}
    </div>
  );
}

export default function ResourcesPage() {
  return (
    <div className="bg-gradient-to-b from-background via-background to-muted/30 pb-16">
      <div className="container max-w-5xl pt-10">
        {/* ── HEADER ── */}
        <section className="mb-16 border-b border-border/70 pb-10 pt-4">
          <div className="max-w-3xl">
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Reading Shelf, Watch List, and Reference Desk
            </p>
            <h1
              className="text-4xl leading-tight tracking-[-0.03em] text-foreground md:text-5xl"
              style={editorialSerif}
            >
              Books, talks, and essays that shaped how I think.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
              A living shelf of resources that have influenced the way I approach conditioning, institutions, culture,
              and practical self-direction. Each one earns its place.
            </p>

            {/* Curation note */}
            <div className="mt-8 border-l-2 border-border/50 pl-5">
              <p className="text-sm font-light italic leading-7 text-muted-foreground">
                I only add something here if I'd recommend it to a person I respect. No affiliate links, no sponsored
                picks — just the things that actually changed how I see.
              </p>
            </div>
          </div>
        </section>

        {/* ── BOOKS ── */}
        <section className="mb-20">
          <SectionHeader label="Books" count={books.length} />

          <div className="space-y-0 divide-y divide-border/60">
            {books.map((book) => (
              <article key={book.title} className="grid gap-6 py-8 md:grid-cols-[80px_minmax(0,1fr)]">
                {/* Cover */}
                <div className="h-[120px] w-[80px] overflow-hidden rounded-sm border border-border/60 bg-card/50">
                  <Image
                    src={book.image}
                    alt={`Cover of ${book.title}`}
                    width={80}
                    height={120}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Content */}
                <div>
                  <p className="mb-1.5 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Book</p>
                  <h2 className="mb-1 text-xl tracking-[-0.02em] text-foreground" style={editorialSerif}>
                    {book.title}
                  </h2>
                  <p className="mb-3 text-[11px] uppercase tracking-[0.1em] text-muted-foreground/60">{book.author}</p>

                  {/* Why I picked it */}
                  <p className="mb-2 border-l border-border/50 pl-3 text-sm font-light italic leading-7 text-muted-foreground/70">
                    {book.why}
                  </p>

                  <p className="mb-4 text-sm font-light leading-7 text-muted-foreground">{book.description}</p>

                  <Link
                    href={book.link}
                    target="_blank"
                    className="inline-flex items-center gap-1.5 text-xs text-foreground/70 transition-opacity hover:opacity-70"
                  >
                    Open reference
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── VIDEOS ── */}
        <section className="mb-20">
          <SectionHeader label="Videos & Talks" count={videos.length} />

          <div className="grid gap-10 md:grid-cols-2">
            {videos.map((video) => (
              <article key={video.title}>
                {/* Thumbnail */}
                <Link
                  href={video.link}
                  target="_blank"
                  className="mb-5 block overflow-hidden rounded-sm border border-border/60"
                >
                  <Image
                    src={video.thumbnail}
                    alt={`Thumbnail for ${video.title}`}
                    width={640}
                    height={360}
                    className="h-auto w-full object-cover transition-opacity duration-300 hover:opacity-80"
                  />
                </Link>

                <p className="mb-1.5 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Video</p>
                <h2 className="mb-3 text-xl tracking-[-0.02em] text-foreground" style={editorialSerif}>
                  <Link href={video.link} target="_blank" className="transition-opacity hover:opacity-70">
                    {video.title}
                  </Link>
                </h2>

                {/* Why I picked it */}
                <p className="mb-2 border-l border-border/50 pl-3 text-sm font-light italic leading-7 text-muted-foreground/70">
                  {video.why}
                </p>

                <p className="mb-4 text-sm font-light leading-7 text-muted-foreground">{video.description}</p>

                <Link
                  href={video.link}
                  target="_blank"
                  className="inline-flex items-center gap-1.5 text-xs text-foreground/70 transition-opacity hover:opacity-70"
                >
                  Watch talk
                  <PlayCircle className="h-3.5 w-3.5" />
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* ── ARTICLES & WEBSITES ── */}
        <section className="mb-20">
          <SectionHeader label="Articles & Websites" count={articles.length} />

          <div className="space-y-0 divide-y divide-border/60">
            {articles.map((article) => (
              <article key={article.title} className="py-6">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-3">
                      <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Essay</p>
                      <span className="text-[10px] text-muted-foreground/40">·</span>
                      <p className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground/50">
                        {article.source}
                      </p>
                    </div>
                    <h2 className="mb-3 text-lg tracking-[-0.02em] text-foreground" style={editorialSerif}>
                      <Link href={article.link} target="_blank" className="transition-opacity hover:opacity-70">
                        {article.title}
                      </Link>
                    </h2>
                    <p className="text-sm font-light leading-7 text-muted-foreground">{article.description}</p>
                  </div>
                  <Link
                    href={article.link}
                    target="_blank"
                    className="mt-1 shrink-0 text-xs text-muted-foreground/40 transition-colors hover:text-muted-foreground"
                  >
                    ↗
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── SUGGEST A RESOURCE ── */}
        <section className="rounded-sm border border-border/60 bg-card/40 p-7 md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-3 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                Got a recommendation?
              </p>
              <h2 className="mb-3 text-2xl tracking-[-0.02em] text-foreground" style={editorialSerif}>
                Send something worth reading.
              </h2>
              <p className="max-w-md text-sm font-light leading-7 text-muted-foreground">
                If you've read or watched something that changed how you think about conditioning, systems, or
                independent living — I'd genuinely like to hear about it.
              </p>
            </div>
            <a
              href="mailto:signal@originalform.org?subject=Resource suggestion"
              className="inline-flex shrink-0 items-center gap-2 rounded-sm border border-border/70 px-5 py-2.5 text-sm text-muted-foreground transition-colors hover:border-border hover:text-foreground"
            >
              Send a suggestion
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
