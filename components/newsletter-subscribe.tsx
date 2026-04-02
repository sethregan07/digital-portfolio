"use client";

import React, { useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import siteMetadata from "@/lib/metadata";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export type CTAProps = {
  title: string;
  description?: string;
  buttonText: string;
};

const formSchema = z.object({
  email: z.string().email(),
});

const NewsletterSubscribe = ({
  title,
  description,
  buttonText,
  className,
  ...props
}: CTAProps & React.HTMLAttributes<HTMLDivElement>) => {
  const { toast } = useToast();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setStatus("idle");
    setStatusMessage("");

    const response = await fetch("/newsletter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
      }),
    });

    if (!response?.ok) {
      const body = await response.json().catch(() => ({}));
      const message = body?.error || "The subscription did not happen. Please try again.";
      setStatus("error");
      setStatusMessage(message);
      return toast({
        title: "Something went wrong.",
        description: message,
        variant: "destructive",
      });
    }

    setStatus("success");
    setStatusMessage("You're subscribed. Check your inbox for a welcome email if enabled.");
    return toast({
      title: "🎉 Nice!",
      description: "You'll get the emails now.",
    });
  };

  return (
    <section
      className={cn(
        "border border-border/70 bg-gradient-to-b from-background via-background to-muted/30 text-card-foreground",
        className
      )}
      {...props}
    >
      <div className="p-7 md:p-10">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-3 flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            <Mail className="h-3.5 w-3.5" />
            <span>Newsletter</span>
          </div>
          <h2 className="font-heading text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>

          <p className="mt-4 hidden text-sm leading-7 text-muted-foreground sm:block">{description}</p>
        </div>

        <div className="mx-auto mt-8 max-w-2xl border-t border-border/60 pt-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full flex-col gap-3 md:flex-row md:items-start"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-auto">
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        className="h-11 rounded-sm border-border/80 bg-background/70"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="h-11 rounded-sm px-6">
                <Mail className="mr-2 h-4 w-4" /> {buttonText}
              </Button>
            </form>
          </Form>
          {status !== "idle" && (
            <p className={cn("mt-3 text-sm", status === "success" ? "text-emerald-600" : "text-destructive")}>
              {statusMessage}
            </p>
          )}
          {siteMetadata.newsletterUrl && (
            <div className="mt-5 flex items-center justify-center">
              <Button
                asChild
                variant="ghost"
                className="rounded-sm px-0 text-muted-foreground hover:bg-transparent hover:text-foreground"
              >
                <Link href={siteMetadata.newsletterUrl} target="_blank">
                  View Archive <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsletterSubscribe;
