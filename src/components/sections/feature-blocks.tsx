"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, FolderGit2, GraduationCap } from "lucide-react";
import { useTilt, TiltSurface } from "@/components/ui/tilt-card";

const EASE = [0.16, 1, 0.3, 1] as const;

const blocks = [
  {
    href: "/work",
    index: "01",
    title: "Projects",
    description: "Fraud risk, adaptive RAG, and a regression model that actually explains itself.",
    icon: FolderGit2,
  },
  {
    href: "/about",
    index: "02",
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
      <Link
        ref={ref}
        href={block.href}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="group relative flex h-64 overflow-hidden rounded-[28px] border border-border bg-surface p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 sm:h-72 sm:p-10"
      >
        <span
          aria-hidden="true"
          className="font-display pointer-events-none absolute -bottom-6 -right-2 text-[9rem] leading-none text-fg/[0.04] transition-colors duration-500 group-hover:text-accent/[0.07] sm:text-[11rem]"
        >
          {block.index}
        </span>

        <TiltSurface rotateX={rotateX} rotateY={rotateY} className="relative flex h-full w-full flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors duration-300 group-hover:border-accent/60 group-hover:text-accent">
              <Icon size={17} strokeWidth={1.6} />
            </span>
            <ArrowUpRight
              size={22}
              className="text-muted transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent"
            />
          </div>

          <div>
            <h3 className="font-display text-[clamp(2rem,4.5vw,3rem)] leading-none text-fg transition-colors duration-300 group-hover:text-accent">
              {block.title}
            </h3>
            <p className="mt-3 max-w-sm text-muted">{block.description}</p>
          </div>
        </TiltSurface>
      </Link>
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
