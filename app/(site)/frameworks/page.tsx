import { Metadata } from "next";
import Link from "next/link";
import {
  Brain,
  Heart,
  Briefcase,
  Activity,
  DollarSign,
  Users,
  Target,
  BookOpen,
  Lightbulb,
  Compass,
  Zap,
  Shield,
  TrendingUp,
  Network,
  Scale
} from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Frameworks - Mental Models & Templates",
    description: "Comprehensive collection of frameworks and mental models for personal growth, decision making, and societal understanding.",
  };
}

export default function FrameworksPage() {
  return (
    <div className="container max-w-6xl pb-10">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="secondary">Frameworks</Badge>
          <Badge variant="outline">Mental Models</Badge>
        </div>

        <h1 className="text-4xl font-bold mb-4">Mental Models & Frameworks</h1>

        <p className="text-xl text-muted-foreground mb-6 max-w-3xl">
          A comprehensive collection of frameworks, templates, and mental models for understanding life,
          society, decision-making, and personal growth. Each framework provides structured thinking tools
          to navigate complex situations.
        </p>
      </div>

      <Separator className="my-8" />

      {/* Personal Development */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <Brain className="h-6 w-6 text-muted-foreground" />
          Personal Development
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg">
                <Target className="h-5 w-5 text-muted-foreground" />
                Goal Setting Framework
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Structured approach to setting, tracking, and achieving meaningful goals
                using OKRs, milestones, and progress metrics.
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">Productivity</Badge>
                <Badge variant="outline" className="text-xs">Planning</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg">
                <Compass className="h-5 w-5 text-muted-foreground" />
                Life Purpose Matrix
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Framework for identifying core values, strengths, and life purpose
                through self-reflection and pattern recognition.
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">Identity</Badge>
                <Badge variant="outline" className="text-xs">Values</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg">
                <BookOpen className="h-5 w-5 text-muted-foreground" />
                Learning Acceleration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Systematic approach to acquiring new skills and knowledge efficiently
                through deliberate practice and spaced repetition.
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">Education</Badge>
                <Badge variant="outline" className="text-xs">Skills</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Relationships & Communication */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <Heart className="h-6 w-6 text-muted-foreground" />
          Relationships & Communication
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg">
                <Users className="h-5 w-5 text-muted-foreground" />
                Conflict Resolution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Structured process for resolving disagreements through active listening,
                empathy mapping, and collaborative problem-solving.
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">Communication</Badge>
                <Badge variant="outline" className="text-xs">Conflict</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg">
                <Network className="h-5 w-5 text-muted-foreground" />
                Social Capital Builder
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Framework for cultivating meaningful relationships and building
                social networks through value exchange and reciprocity.
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">Networking</Badge>
                <Badge variant="outline" className="text-xs">Relationships</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg">
                <Shield className="h-5 w-5 text-muted-foreground" />
                Boundary Setting
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Systematic approach to establishing healthy boundaries in relationships
                while maintaining empathy and clear communication.
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">Boundaries</Badge>
                <Badge variant="outline" className="text-xs">Self-care</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Career & Work */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <Briefcase className="h-6 w-6 text-muted-foreground" />
          Career & Work
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg">
                <TrendingUp className="h-5 w-5 text-muted-foreground" />
                Career Navigation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Framework for career planning, skill development, and opportunity
                identification in rapidly changing job markets.
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">Career</Badge>
                <Badge variant="outline" className="text-xs">Planning</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg">
                <Zap className="h-5 w-5 text-muted-foreground" />
                Productivity Systems
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Integrated productivity framework combining time management,
                task prioritization, and energy optimization techniques.
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">Productivity</Badge>
                <Badge variant="outline" className="text-xs">Efficiency</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg">
                <Scale className="h-5 w-5 text-muted-foreground" />
                Work-Life Integration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Balanced approach to integrating professional and personal life
                through boundary setting and intentional prioritization.
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">Balance</Badge>
                <Badge variant="outline" className="text-xs">Integration</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Health & Wellness */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <Activity className="h-6 w-6 text-muted-foreground" />
          Health & Wellness
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg">
                <Activity className="h-5 w-5 text-muted-foreground" />
                Habit Formation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Evidence-based framework for building sustainable habits through
                small changes, environmental design, and behavioral psychology.
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">Habits</Badge>
                <Badge variant="outline" className="text-xs">Behavior</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg">
                <Brain className="h-5 w-5 text-muted-foreground" />
                Mental Health Toolkit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Comprehensive toolkit for mental wellness including stress management,
                emotional regulation, and cognitive behavioral techniques.
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">Mental Health</Badge>
                <Badge variant="outline" className="text-xs">Wellness</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg">
                <Target className="h-5 w-5 text-muted-foreground" />
                Physical Optimization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Integrated framework for physical health covering nutrition,
                exercise, sleep, and recovery optimization.
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">Fitness</Badge>
                <Badge variant="outline" className="text-xs">Nutrition</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Finance & Money */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <DollarSign className="h-6 w-6 text-muted-foreground" />
          Finance & Money
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg">
                <TrendingUp className="h-5 w-5 text-muted-foreground" />
                Wealth Building
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Systematic approach to building wealth through saving, investing,
                and multiple income streams with risk management.
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">Investing</Badge>
                <Badge variant="outline" className="text-xs">Wealth</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg">
                <DollarSign className="h-5 w-5 text-muted-foreground" />
                Money Psychology
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Framework for understanding money mindset, behavioral economics,
                and emotional relationships with wealth and spending.
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">Psychology</Badge>
                <Badge variant="outline" className="text-xs">Mindset</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg">
                <Shield className="h-5 w-5 text-muted-foreground" />
                Financial Independence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Roadmap to financial independence through budgeting, debt management,
                and passive income development strategies.
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">Independence</Badge>
                <Badge variant="outline" className="text-xs">Planning</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Society & Systems */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <Users className="h-6 w-6 text-muted-foreground" />
          Society & Systems
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg">
                <Network className="h-5 w-5 text-muted-foreground" />
                Systems Thinking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Framework for understanding complex systems, feedback loops,
                and interconnected societal structures and their dynamics.
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">Systems</Badge>
                <Badge variant="outline" className="text-xs">Society</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg">
                <Scale className="h-5 w-5 text-muted-foreground" />
                Social Justice Lens
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Analytical framework for examining social inequalities, power dynamics,
                and systemic injustices through multiple perspectives.
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">Justice</Badge>
                <Badge variant="outline" className="text-xs">Equity</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg">
                <Lightbulb className="h-5 w-5 text-muted-foreground" />
                Cultural Intelligence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Framework for understanding and navigating cultural differences,
                communication styles, and cross-cultural collaboration.
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">Culture</Badge>
                <Badge variant="outline" className="text-xs">Diversity</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Decision Making */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <Target className="h-6 w-6 text-muted-foreground" />
          Decision Making
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg">
                <Brain className="h-5 w-5 text-muted-foreground" />
                Rational Choice Theory
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Systematic framework for making decisions under uncertainty
                using probability assessment and expected value calculations.
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">Decision Making</Badge>
                <Badge variant="outline" className="text-xs">Analysis</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg">
                <Scale className="h-5 w-5 text-muted-foreground" />
                Ethical Decision Framework
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Multi-dimensional approach to ethical decision-making considering
                consequences, principles, and stakeholder impact analysis.
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">Ethics</Badge>
                <Badge variant="outline" className="text-xs">Values</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg">
                <Compass className="h-5 w-5 text-muted-foreground" />
                Long-term Thinking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Framework for evaluating decisions through long-term consequences,
                second and third-order effects, and future scenario planning.
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">Strategy</Badge>
                <Badge variant="outline" className="text-xs">Future</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Call to Action */}
      <Card>
        <CardContent className="pt-8 pb-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Explore & Apply Frameworks</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            These frameworks are designed to be practical tools you can apply immediately.
            Start with one that resonates with your current challenges or goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/projects/deprogramming">
                <BookOpen className="mr-2 h-4 w-4" />
                Start with Deprogramming
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/now">
                <Users className="mr-2 h-4 w-4" />
                See My Current Focus
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}