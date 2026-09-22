"use client";

import { ArrowUp, Mail } from "lucide-react";
import { personal, socials } from "@/data/resume";
import { GithubIcon, LinkedinIcon } from "@/components/icons/brand-icons";
import { AnchorLink } from "@/components/ui/anchor-link";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer id="contact" className="scroll-mt-24 border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 sm:py-32">
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-accent">
          Get in touch
        </p>
        <h2 className="max-w-3xl font-display text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.95] tracking-tight text-fg">
          Let&apos;s build something.
        </h2>

        <div className="mt-10 flex flex-wrap items-center gap-3.5">
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
        </div>
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
