"use client";

import { motion } from "framer-motion";
import { skillsRowOne, skillsRowTwo } from "@/data/resume";

function MarqueeRow({
  items,
  reverse,
  outline,
}: {
  items: string[];
  reverse?: boolean;
  outline?: boolean;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="no-scrollbar flex overflow-hidden">
      <div
        className={`flex shrink-0 gap-5 pr-5 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className={
              outline
                ? "whitespace-nowrap rounded-full border border-border px-6 py-3 font-display text-2xl text-fg transition-colors duration-200 hover:border-accent hover:text-accent sm:text-3xl"
                : "whitespace-nowrap rounded-full bg-accent px-6 py-3 font-display text-2xl text-accent-fg sm:text-3xl"
            }
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="font-mono-label mb-3 text-xs font-semibold uppercase text-accent"
        >
          Toolkit
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mb-14 font-display text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.95] text-fg"
        >
          Skills &amp; certifications
        </motion.h2>
      </div>

      <div className="flex flex-col gap-5">
        <MarqueeRow items={skillsRowOne} outline />
        <MarqueeRow items={skillsRowTwo} reverse />
      </div>
    </section>
  );
}
