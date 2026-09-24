"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { personal, socials } from "@/data/resume";
import { GithubIcon, LinkedinIcon } from "@/components/icons/brand-icons";
import { Button } from "@/components/ui/button";

const EASE = [0.16, 1, 0.3, 1] as const;

// Free, no-backend form delivery — works from a static GitHub Pages export.
// Create a free access key at https://web3forms.com and set it here (or via
// NEXT_PUBLIC_WEB3FORMS_KEY) before the form goes live.
const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

type Status = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!WEB3FORMS_ACCESS_KEY) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("access_key", WEB3FORMS_ACCESS_KEY);
    data.append("subject", `Portfolio contact from ${data.get("name")}`);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      if (result.success) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="scroll-mt-24 border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="font-mono-label mb-4 text-xs font-semibold uppercase text-accent"
        >
          Get in touch
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="max-w-3xl font-display text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.95] text-fg"
        >
          Let&apos;s build something.
        </motion.h2>

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_minmax(0,26rem)]">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="font-mono-label text-xs uppercase text-muted">Name</span>
                <input
                  required
                  name="name"
                  type="text"
                  placeholder="Your name"
                  className="rounded-2xl border border-border bg-surface px-4 py-3 text-fg placeholder:text-muted/60 outline-none transition-colors focus:border-accent"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="font-mono-label text-xs uppercase text-muted">Email</span>
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="rounded-2xl border border-border bg-surface px-4 py-3 text-fg placeholder:text-muted/60 outline-none transition-colors focus:border-accent"
                />
              </label>
            </div>
            <label className="flex flex-col gap-2">
              <span className="font-mono-label text-xs uppercase text-muted">Message</span>
              <textarea
                required
                name="message"
                rows={5}
                placeholder="What are you working on?"
                className="resize-none rounded-2xl border border-border bg-surface px-4 py-3 text-fg placeholder:text-muted/60 outline-none transition-colors focus:border-accent"
              />
            </label>

            <div className="mt-2 flex flex-wrap items-center gap-4">
              <Button type="submit" variant="primary" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : "Send message"}
                <Send size={16} />
              </Button>
              {status === "sent" && (
                <p className="text-sm text-accent">Thanks — I&apos;ll get back to you soon.</p>
              )}
              {status === "error" && (
                <p className="text-sm text-muted">
                  Couldn&apos;t send that — email me directly at{" "}
                  <a href={socials.email} className="underline decoration-border underline-offset-4 hover:text-accent">
                    {personal.email}
                  </a>
                  .
                </p>
              )}
            </div>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            className="flex flex-col gap-3"
          >
            <a
              href={socials.email}
              className="group flex items-center justify-between rounded-2xl border border-border bg-surface px-6 py-5 transition-colors hover:border-accent/60"
            >
              <span className="flex items-center gap-3 text-fg">
                <Mail size={18} className="text-accent" />
                {personal.email}
              </span>
            </a>
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-2xl border border-border bg-surface px-6 py-5 transition-colors hover:border-accent/60"
            >
              <span className="flex items-center gap-3 text-fg">
                <LinkedinIcon size={18} className="text-accent" />
                LinkedIn
              </span>
            </a>
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-2xl border border-border bg-surface px-6 py-5 transition-colors hover:border-accent/60"
            >
              <span className="flex items-center gap-3 text-fg">
                <GithubIcon size={18} className="text-accent" />
                GitHub
              </span>
            </a>
            <p className="mt-2 text-sm text-muted">
              {personal.phone} · {personal.location}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
