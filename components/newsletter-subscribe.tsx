"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  provider?: "mailerlite" | "listmonk";
  group?: string;
  source?: string;
  successMessage?: string;
  finePrint?: string;
  redirectTo?: string;
};

const formSchema = z.object({
  email: z.string().email(),
});

const NewsletterSubscribe = ({
  title,
  description,
  buttonText,
  provider,
  group,
  source,
  successMessage,
  finePrint,
  redirectTo,
  className,
  ...props
}: CTAProps & React.HTMLAttributes<HTMLDivElement>) => {
  const router = useRouter();
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
        provider,
        group,
        source,
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
    const resolvedSuccessMessage =
      successMessage || "You're subscribed. Check your inbox for a welcome email if enabled.";
    setStatusMessage(resolvedSuccessMessage);
    toast({
      title: "🎉 Nice!",
      description: resolvedSuccessMessage,
    });

    if (redirectTo) {
      router.push(redirectTo);
      return;
    }

    return;
  };

  return (
    <section className={cn("premium-surface-soft border border-border/70 text-card-foreground", className)} {...props}>
      <div className="p-7 md:p-10">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-3 flex items-center justify-center gap-2 text-[12px] uppercase tracking-[0.16em] text-muted-foreground">
            <Mail className="h-3.5 w-3.5" />
            <span>Newsletter</span>
          </div>
          <h2 className="text-[1.75rem] font-semibold leading-[1.08] tracking-[-0.025em] text-foreground md:text-[2.1rem]">
            {title}
          </h2>

          <p className="mt-4 hidden max-w-[58ch] text-[0.98rem] leading-7 text-muted-foreground sm:block">
            {description}
          </p>
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
                        className="h-11 rounded-sm border-border/80 bg-[#0c1630]/90 text-foreground placeholder:text-muted-foreground/75 focus-visible:ring-foreground/20"
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
          {finePrint ? <p className="mt-3 text-sm leading-6 text-muted-foreground">{finePrint}</p> : null}
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
