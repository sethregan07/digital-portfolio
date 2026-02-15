import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Resources",
    description: "Books, videos, and articles I recommend",
  };
}

const books = [
  {
    title: "Debt: The First 5,000 Years",
    author: "David Graeber",
    description: "An exploration of how debt has shaped human societies and economies throughout history.",
    image: "https://covers.openlibrary.org/b/olid/OL24088724M-L.jpg",
    link: "https://www.goodreads.com/book/show/6617037-debt",
  },
  {
    title: "The Tyranny of Experts",
    author: "William Easterly",
    description: "A critique of how experts and technocrats often fail to address the real needs of developing countries.",
    image: "https://covers.openlibrary.org/b/olid/OL26791447M-L.jpg",
    link: "https://www.goodreads.com/book/show/18210744-the-tyranny-of-experts",
  },
];

const videos = [
  {
    title: "Osho on Democracy",
    description: "Osho's teachings on democracy and political systems",
    thumbnail: "https://img.youtube.com/vi/fCQoukZvvFo/hqdefault.jpg",
    link: "https://www.youtube.com/watch?v=fCQoukZvvFo",
  },
  {
    title: "Osho on Marriage",
    description: "Osho's perspective on marriage, relationships, and love",
    thumbnail: "https://img.youtube.com/vi/CXlMz1Ja2VM/hqdefault.jpg",
    link: "https://youtu.be/CXlMz1Ja2VM?si=xqqb03zKwCIwzm2j",
  },
];

const articles = [
  {
    title: "Sample Article Title",
    description: "Description of the article",
    link: "https://example.com/article",
  },
];

export default function ResourcesPage() {
  return (
    <div className="container pb-10">
      <article className="prose mx-auto max-w-5xl dark:prose-invert prose-headings:mb-3 prose-headings:mt-8 prose-headings:font-heading prose-headings:font-bold prose-headings:leading-tight hover:prose-a:text-accent-foreground prose-a:prose-headings:no-underline">
        <h1 className="mt-0">Resources</h1>
        <p className="m-0 text-xl">
          Here I share books, videos, and articles that have influenced my thinking and work.
        </p>
        <hr className="my-4" />

        <h2>Books</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {books.map((book) => (
            <div key={book.title} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Image
                    src={book.image}
                    alt={`Cover of ${book.title}`}
                    width={80}
                    height={120}
                    className="rounded-md object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">{book.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">by {book.author}</p>
                  <p className="text-sm mb-3">{book.description}</p>
                  <Link
                    href={book.link}
                    target="_blank"
                    className="text-sm text-blue-600 hover:text-blue-800 underline"
                  >
                    Learn more →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2>Videos</h2>
        <div className="mb-8">
          {videos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {videos.map((video) => (
                <div key={video.title} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <Image
                        src={video.thumbnail}
                        alt={`Thumbnail for ${video.title}`}
                        width={120}
                        height={90}
                        className="rounded-md object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">
                        <Link
                          href={video.link}
                          target="_blank"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          {video.title}
                        </Link>
                      </h3>
                      <p className="text-sm text-muted-foreground">{video.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">Videos will be added soon.</p>
          )}
        </div>

        <h2>Articles & Websites</h2>
        <div className="mb-8">
          {articles.length > 0 ? (
            <ul className="space-y-4">
              {articles.map((article) => (
                <li key={article.title} className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-2">
                    <Link
                      href={article.link}
                      target="_blank"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {article.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-muted-foreground">{article.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">Articles and websites will be added soon.</p>
          )}
        </div>
      </article>
    </div>
  );
}