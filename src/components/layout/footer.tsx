"use client";

import { ArrowUp } from "lucide-react";
import { personal } from "@/data/resume";
import { AnchorLink } from "@/components/ui/anchor-link";

export function Footer() {
  return (
    <footer className="border-t border-border">
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
    </footer>
  );
}
