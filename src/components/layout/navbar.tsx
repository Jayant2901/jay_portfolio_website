"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Briefcase, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { personal } from "@/data/resume";

const links = [
  { href: "/work", label: "Work", abbr: "Wo", icon: Briefcase },
  { href: "/about", label: "About", abbr: "Ab", icon: User },
  { href: "/contact", label: "Contact", abbr: "Ct", icon: Mail },
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
        <Link
          href="/"
          className="font-display text-2xl text-fg"
          aria-label={`${personal.name} — home`}
        >
          {personal.initials}
        </Link>

        <ul className="hidden items-center gap-3 md:flex">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group flex h-10 items-center gap-2 rounded-full border border-border px-3 text-muted transition-colors duration-300 hover:border-accent/60 hover:text-fg"
                >
                  <Icon size={14} className="shrink-0" />
                  <span className="grid font-mono-label text-xs font-semibold uppercase">
                    <span
                      aria-hidden="true"
                      className="col-start-1 row-start-1 transition-opacity duration-200 group-hover:opacity-0"
                    >
                      {link.abbr}
                    </span>
                    <span className="col-start-1 row-start-1 whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      {link.label}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden md:block">
          <Button asChild size="sm">
            <Link href="/contact">Let&apos;s talk</Link>
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
                <Link
                  href={link.href}
                  className="text-lg font-semibold uppercase tracking-widest text-fg"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
