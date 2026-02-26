import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Briefcase,
  BookOpen,
  Users,
  Target,
  Lightbulb,
  Calendar,
  Mail,
  ExternalLink,
  Clock,
  Eye
} from "lucide-react";

import siteMetadata, { defaultAuthor } from "@/lib/metadata";
import { getRecentPosts } from "@/lib/services/content";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import NewsletterSubscribe from "@/components/newsletter-subscribe";

export const revalidate = 300;

export default async function Home() {
  const posts = await getRecentPosts(3);

  return (
    <div className="pb-10">
      {/* Enhanced Hero Section */}
      <div className="relative overflow-hidden">
        <div className="container max-w-6xl py-20">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Badge variant="secondary" className="text-sm">Systems Thinking</Badge>
              <Badge variant="outline" className="text-sm">Personal Growth</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Vision for Digital Age
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Frontend engineer exploring systems thinking, societal transformation,
              and the intersection of technology with human flourishing.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/updates">
                  <MapPin className="mr-2 h-4 w-4" />
                  See What I'm Up To
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/frameworks">
                  <Lightbulb className="mr-2 h-4 w-4" />
                  Explore Frameworks
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-6xl mt-12">
        {/* Featured Content Sections */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Explore the Garden</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  Updates
                </CardTitle>
                <CardDescription>Current status & availability</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Real-time updates on what I'm working on, where I am, and my current projects.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link href="/now">
                    View Status <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg">
                  <Lightbulb className="h-5 w-5 text-muted-foreground" />
                  Frameworks
                </CardTitle>
                <CardDescription>Mental models & templates</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Comprehensive collection of frameworks for personal growth and decision making.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link href="/frameworks">
                    Explore <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg">
                  <BookOpen className="h-5 w-5 text-muted-foreground" />
                  Deprogramming
                </CardTitle>
                <CardDescription>Course on societal conditioning</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Systematic exploration of how society shapes our beliefs and behaviors.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link href="/projects/deprogramming">
                    Start Course <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  Articles
                </CardTitle>
                <CardDescription>Thoughts & insights</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  In-depth articles on technology, society, systems thinking, and personal growth.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link href="/articles">
                    Read Articles <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator className="my-12" />

        {/* Recent Posts Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-muted-foreground" />
              Recent Articles
            </h2>
            <Button asChild variant="ghost">
              <Link href="/articles">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">
                      Article
                    </Badge>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="mr-1 h-3 w-3" />
                      {post.readTimeMinutes} min
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight line-clamp-2">
                    <Link href={`/articles/${post.slug}`} className="hover:text-primary transition-colors">
                      {post.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Eye className="mr-1 h-3 w-3" />
                      {post.publishedDate.toLocaleDateString()}
                    </div>
                    <Button asChild size="sm" variant="ghost">
                      <Link href={`/articles/${post.slug}`}>
                        Read <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* About Section */}
        {(
          <div className="mb-16">
            <Separator className="my-12" />

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="flex items-center gap-2 mb-6">
                  <Badge variant="secondary">About</Badge>
                  <Badge variant="outline">Purpose</Badge>
                </div>

                <h2 className="text-3xl font-bold mb-6">Building Towards a Better Future</h2>

                <div className="prose dark:prose-invert max-w-none mb-6">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    I'm passionate about exploring how technology and systems thinking can help us
                    build more cooperative, equitable, and sustainable communities. Through this digital
                    garden, I share frameworks, insights, and tools for personal and societal transformation.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild>
                    <Link href="/now">
                      <Users className="mr-2 h-4 w-4" />
                      Get to Know Me
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/frameworks">
                      <Target className="mr-2 h-4 w-4" />
                      Explore Tools
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <Card className="p-8 text-center">
                  <div className="mx-auto mb-6 h-24 w-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">N</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{defaultAuthor.name}</h3>
                  <p className="text-muted-foreground mb-4">{defaultAuthor.jobTitle}</p>
                  <p className="text-sm text-muted-foreground">{defaultAuthor.company}</p>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* Newsletter Section */}
        <div className="mb-12">
          <NewsletterSubscribe
            title="Stay Updated"
            description="Get new frameworks, articles, and insights on systems thinking, personal growth, and societal transformation delivered to your inbox."
            buttonText="Subscribe"
          />
        </div>

        {/* Social Links */}
        <div className="mb-12">
          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="pt-8 pb-8 text-center">
              <h3 className="text-xl font-bold mb-4">Connect & Follow</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Follow for updates and join the conversation on systems thinking,
                personal growth, and societal transformation.
              </p>
              <div className="flex justify-center gap-4">
                <Button asChild variant="outline">
                  <Link href="https://twitter.com" target="_blank">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Twitter
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/contact">
                    <Mail className="mr-2 h-4 w-4" />
                    Contact
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
