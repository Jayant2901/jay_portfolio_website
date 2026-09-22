"use client";

import { useEffect, useState } from "react";
import { AnchorLink } from "@/components/ui/anchor-link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { personal } from "@/data/resume";

const links = [
  { href: "#projects", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "border-b border-border bg-bg/85 backdrop-blur" : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-10">
        <AnchorLink
          href="#"
          className="font-display text-2xl text-fg"
          aria-label={`${personal.name} — back to top`}
        >
          {personal.initials}
        </AnchorLink>

        <ul className="hidden items-center gap-10 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <AnchorLink
                href={link.href}
                className="text-sm font-semibold uppercase tracking-widest text-muted transition-colors hover:text-fg"
              >
                {link.label}
              </AnchorLink>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button asChild size="sm">
            <AnchorLink href="#contact">Let&apos;s talk</AnchorLink>
          </Button>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={cn("h-0.5 w-6 bg-fg transition-transform", open && "translate-y-2 rotate-45")} />
          <span className={cn("h-0.5 w-6 bg-fg transition-opacity", open && "opacity-0")} />
          <span className={cn("h-0.5 w-6 bg-fg transition-transform", open && "-translate-y-2 -rotate-45")} />
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-bg px-6 pb-8 pt-4 md:hidden">
          <ul className="flex flex-col gap-6">
            {links.map((link) => (
              <li key={link.href}>
                <AnchorLink
                  href={link.href}
                  className="text-lg font-semibold uppercase tracking-widest text-fg"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </AnchorLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
