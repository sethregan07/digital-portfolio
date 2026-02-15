import { Metadata } from "next";
import Link from "next/link";
import { MapPin, Briefcase, CheckCircle, XCircle, Users, MessageCircle, Calendar, Twitter, Rss } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import NewsletterSubscribe from "@/components/newsletter-subscribe";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Now - What I'm Up To",
    description: "A quick way to check what I'm working on these days and my current availability.",
  };
}

export default function NowPage() {
  return (
    <div className="container max-w-6xl pb-10">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="secondary">Now</Badge>
          <Badge variant="outline">Live Status</Badge>
        </div>

        <h1 className="text-4xl font-bold mb-4">What I'm Up To</h1>

        <p className="text-xl text-muted-foreground mb-6 max-w-3xl">
          A quick way to check what I'm working on these days, where I am, and my current availability.
          Updated regularly to keep things transparent.
        </p>
      </div>

      <Separator className="my-8" />

      {/* Current Location */}
      {/* <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <MapPin className="h-6 w-6 text-muted-foreground" />
          Where Am I?
        </h2>

        <Card className="max-w-2xl">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Los Angeles, California</h3>
                <p className="text-muted-foreground">
                  I'm currently based in the beautiful city of LA. As a digital nomad, I work from various locations
                  around the world, but LA serves as my home base with its vibrant tech scene and creative energy.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div> */}



      {/* Availability */}
      {/* <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Availability</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-green-200 dark:border-green-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-green-700 dark:text-green-400">
                <CheckCircle className="h-5 w-5" />
                Available For
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <MessageCircle className="h-4 w-4 text-green-500" />
                  <span>Public speaking engagements</span>
                </li>
                <li className="flex items-center gap-3">
                  <Users className="h-4 w-4 text-green-500" />
                  <span>Content collaboration</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-red-200 dark:border-red-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-red-700 dark:text-red-400">
                <XCircle className="h-5 w-5" />
                Not Available For
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <XCircle className="h-4 w-4 text-red-500" />
                  <span>Employment-based work</span>
                </li>
                <li className="flex items-center gap-3">
                  <XCircle className="h-4 w-4 text-red-500" />
                  <span>Freelance (unless unique/exciting)</span>
                </li>
                <li className="flex items-center gap-3">
                  <XCircle className="h-4 w-4 text-red-500" />
                  <span>Co-founding opportunities</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Decision Framework:</strong> I follow the &ldquo;Hell yeah! or No&rdquo; principle.
            If a project doesn't excite me immediately, it's probably not the right fit.
          </p>
        </div>
      </div> */}

      {/* Consulting Services */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <Users className="h-6 w-6 text-muted-foreground" />
          Consulting & Mentoring Services
        </h2>

        <p className="text-lg text-muted-foreground mb-6 max-w-3xl">
          I'm available for consulting and mentoring focused on impact-driven organizations and projects.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Founder Clarity Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                One-on-one sessions to help founders clarify their vision, navigate challenges,
                and build sustainable organizations.
              </p>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Social activists & organizers</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Strategic Mentoring</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Ongoing mentorship for activists, blockchain projects, and NGOs focusing on impact,
                sustainability, and growth.
              </p>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Blockchain startups & NGOs</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button asChild size="lg">
            <Link href="#contact">
              <Calendar className="mr-2 h-4 w-4" />
              Book a Session
            </Link>
          </Button>
          <p className="text-sm text-muted-foreground mt-2">Calendar link coming soon</p>
        </div>
      </div>

      {/* Changelog */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <CheckCircle className="h-6 w-6 text-muted-foreground" />
          Changelog
        </h2>

        <p className="text-lg text-muted-foreground mb-6">
          A chronological record of significant updates and improvements to the site.
        </p>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* v2.1.0 */}
          <Card className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-xs">v2.1.0</Badge>
                <Badge variant="outline" className="text-xs">Feb 2026</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-green-500 text-sm">🚀</span>
                  <span className="text-sm font-medium">5 New Course Lessons</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-500 text-sm">✍️</span>
                  <span className="text-sm font-medium">Journalistic Style</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-purple-500 text-sm">⚡</span>
                  <span className="text-sm font-medium">Performance Boost</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* v2.0.0 */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-xs">v2.0.0</Badge>
                <Badge variant="outline" className="text-xs">Dec 2025</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-green-500 text-sm">📚</span>
                  <span className="text-sm font-medium">Deprogramming Course</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-500 text-sm">🔄</span>
                  <span className="text-sm font-medium">Platform Migration</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-purple-500 text-sm">📂</span>
                  <span className="text-sm font-medium">Better Organization</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* v1.5.0 */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-xs">v1.5.0</Badge>
                <Badge variant="outline" className="text-xs">Nov 2025</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-green-500 text-sm">📝</span>
                  <span className="text-sm font-medium">Articles Section</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-500 text-sm">📧</span>
                  <span className="text-sm font-medium">Newsletter Ready</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-purple-500 text-sm">📱</span>
                  <span className="text-sm font-medium">Mobile Optimized</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* v1.2.0 */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-xs">v1.2.0</Badge>
                <Badge variant="outline" className="text-xs">Sep 2025</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-green-500 text-sm">🔍</span>
                  <span className="text-sm font-medium">Search Functionality</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-500 text-sm">🏷️</span>
                  <span className="text-sm font-medium">Tag System</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-purple-500 text-sm">📊</span>
                  <span className="text-sm font-medium">Analytics Integration</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>


      </div>

      {/* Newsletter Section */}
      <div className="mb-8">
        <NewsletterSubscribe
          title="Stay Updated"
          description="Get new frameworks, articles, and insights on systems thinking, personal growth, and societal transformation delivered to your inbox."
          buttonText="Subscribe"
        />
      </div>

      {/* Footer Note */}
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">
            <em>
              This page was inspired by{" "}
              <Link href="https://nownownow.com/about" className="text-primary hover:underline">
                Derek Sivers
              </Link>
              . It works as a public declaration and a reminder to myself.
            </em>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}