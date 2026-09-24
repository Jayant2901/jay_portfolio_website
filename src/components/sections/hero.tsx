"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ChevronDown, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnchorLink } from "@/components/ui/anchor-link";
import { personal, socials } from "@/data/resume";
import { GithubIcon, LinkedinIcon } from "@/components/icons/brand-icons";
import { useMediaQuery } from "@/hooks/use-media-query";
import { withBasePath } from "@/lib/base-path";

const HeroScene = dynamic(
  () => import("@/components/three/hero-scene").then((mod) => mod.HeroScene),
  { ssr: false }
);

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canDrag = useMediaQuery("(pointer: fine)");
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col overflow-hidden pt-28 sm:pt-32"
    >
      <motion.div
        style={{ opacity: sceneOpacity, scale: sceneScale }}
        className={`absolute inset-0 z-0 sm:right-[-10%] sm:left-[20%] ${
          canDrag ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <HeroScene interactive={canDrag} />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-transparent via-transparent to-bg sm:bg-gradient-to-r sm:from-bg sm:via-bg/40 sm:to-transparent" />

      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="pointer-events-none relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 sm:px-10"
      >
        <h1 className="font-display leading-[0.85] text-fg">
          {["JAYANT", "SHARMA"].map((word, i) => (
            <span key={word} className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.1 + i * 0.1, ease: EASE }}
                className="block text-[clamp(3.2rem,13vw,9rem)]"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45, ease: EASE }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl"
        >
          {personal.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6, ease: EASE }}
          className="pointer-events-auto mt-10 flex flex-wrap items-center gap-3.5"
        >
          <Button asChild variant="primary">
            <AnchorLink href="#projects">View my work</AnchorLink>
          </Button>
          <Button asChild variant="ghost">
            <a href={withBasePath(personal.resumeUrl)} download>
              Resume
              <ArrowDown />
            </a>
          </Button>
          <div className="flex items-center gap-3">
            {[
              { href: socials.linkedin, label: "LinkedIn", icon: LinkedinIcon },
              { href: socials.github, label: "GitHub", icon: GithubIcon },
              { href: socials.email, label: "Email", icon: Mail },
            ].map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-fg transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.9 }}
        className="font-mono-label relative z-10 mx-auto mb-8 flex items-center gap-2 text-xs font-semibold uppercase text-muted"
      >
        <ChevronDown size={14} className="animate-bounce" />
        {canDrag ? "Scroll — drag to spin" : "Scroll"}
      </motion.div>
    </section>
  );
}
