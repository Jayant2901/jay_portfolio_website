"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, FolderGit2, GraduationCap } from "lucide-react";
import { AnchorLink } from "@/components/ui/anchor-link";
import { useTilt, TiltSurface } from "@/components/ui/tilt-card";

const EASE = [0.16, 1, 0.3, 1] as const;

const blocks = [
  {
    href: "#projects",
    title: "Projects",
    description: "Fraud risk, adaptive RAG, and a regression model that actually explains itself.",
    icon: FolderGit2,
  },
  {
    href: "#about",
    title: "About",
    description: "Final-year CS (Data Science) student in Hyderabad, exploring applied ML and LLM tooling.",
    icon: GraduationCap,
  },
];

function FeatureTile({ block, index }: { block: (typeof blocks)[number]; index: number }) {
  const { ref, rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt<HTMLAnchorElement>();
  const Icon = block.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: index === 0 ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: EASE }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <AnchorLink
        ref={ref}
        href={block.href}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="group relative flex h-64 overflow-hidden rounded-[28px] border border-border bg-surface p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 sm:h-80 sm:p-10"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full bg-accent/10 blur-3xl transition-opacity duration-500 group-hover:opacity-80"
        />
        <TiltSurface rotateX={rotateX} rotateY={rotateY} className="flex h-full w-full flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted">
              0{index + 1}
            </span>
            <ArrowUpRight
              size={28}
              className="text-muted transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent"
            />
          </div>

          <Icon
            size={72}
            strokeWidth={1.1}
            className="self-center text-accent/25 transition-all duration-500 group-hover:scale-110 group-hover:text-accent/50"
          />

          <div>
            <h3 className="font-display text-[clamp(2.2rem,5vw,3.5rem)] leading-none text-fg transition-colors duration-300 group-hover:text-accent">
              {block.title}
            </h3>
            <p className="mt-3 max-w-sm text-muted">{block.description}</p>
          </div>
        </TiltSurface>
      </AnchorLink>
    </motion.div>
  );
}

export function FeatureBlocks() {
  return (
    <section className="border-t border-border py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-6 sm:grid-cols-2 sm:px-10">
        {blocks.map((block, i) => (
          <FeatureTile key={block.href} block={block} index={i} />
        ))}
      </div>
    </section>
  );
}
