"use client";

import { motion } from "framer-motion";
import { ArrowUp, Mail } from "lucide-react";
import { personal, socials } from "@/data/resume";
import { GithubIcon, LinkedinIcon } from "@/components/icons/brand-icons";
import { AnchorLink } from "@/components/ui/anchor-link";
import { Button } from "@/components/ui/button";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Footer() {
  return (
    <footer id="contact" className="scroll-mt-24 border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 sm:py-32">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-4 text-xs font-semibold uppercase tracking-widest text-accent"
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

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
          className="mt-10 flex flex-wrap items-center gap-3.5"
        >
          <Button asChild variant="primary">
            <a href={socials.email}>
              <Mail size={16} />
              {personal.email}
            </a>
          </Button>
          <Button asChild variant="ghost">
            <a href={socials.linkedin} target="_blank" rel="noopener noreferrer">
              <LinkedinIcon size={16} />
              LinkedIn
            </a>
          </Button>
          <Button asChild variant="ghost">
            <a href={socials.github} target="_blank" rel="noopener noreferrer">
              <GithubIcon size={16} />
              GitHub
            </a>
          </Button>
        </motion.div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <p>
            {personal.phone} · {personal.location}
          </p>
          <div className="flex items-center gap-6">
            <p>© {new Date().getFullYear()} {personal.name}</p>
            <AnchorLink
              href="#"
              aria-label="Back to top"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <ArrowUp size={15} />
            </AnchorLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
