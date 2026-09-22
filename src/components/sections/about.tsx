"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { about, education, leadership, languages, personal } from "@/data/resume";
import { withBasePath } from "@/lib/base-path";

const EASE = [0.16, 1, 0.3, 1] as const;

function ProfilePhoto() {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-surface to-bg">
        <span className="font-display text-6xl text-accent/40">
          {personal.initials}
        </span>
        <span className="px-6 text-center text-xs text-muted">Photo coming soon</span>
      </div>
    );
  }

  return (
    <Image
      src={withBasePath(personal.photo)}
      alt={personal.name}
      fill
      sizes="280px"
      className="object-cover"
      onError={() => setFailed(true)}
    />
  );
}

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="scroll-mt-24 border-t border-border py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="mb-14 grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,280px)_1fr] md:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
            style={{ y: photoY }}
            className="relative aspect-[4/5] w-full max-w-[280px] overflow-hidden rounded-[28px] border border-border shadow-card"
          >
            <ProfilePhoto />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="max-w-2xl"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
              Who I am
            </p>
            <h2 className="mb-8 font-display text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.95] text-fg">
              About
            </h2>
            <div className="space-y-4">
              {about.paragraphs.map((p) => (
                <p key={p} className="text-lg leading-relaxed text-muted">
                  {p}
                </p>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted">
              Languages: {languages.map((l) => `${l.name} (${l.level})`).join(" · ")}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="rounded-[28px] border border-border bg-surface p-8 shadow-card"
          >
            <h3 className="mb-6 font-display text-2xl text-fg">Education</h3>
            <div className="flex flex-col gap-6">
              {education.map((item) => (
                <div key={item.degree} className="border-l-2 border-accent pl-5">
                  <p className="font-semibold text-fg">{item.degree}</p>
                  <p className="mt-1 text-sm text-muted">{item.school}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-muted">
                    {item.period}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="rounded-[28px] border border-border bg-surface p-8 shadow-card"
          >
            <h3 className="mb-6 font-display text-2xl text-fg">Leadership</h3>
            <div className="flex flex-col gap-6">
              {leadership.map((item) => (
                <div key={item.role} className="border-l-2 border-accent pl-5">
                  <p className="font-semibold text-fg">{item.role}</p>
                  <p className="mt-1 text-sm text-muted">{item.org}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-muted">
                    {item.period}
                  </p>
                  <ul className="mt-3 flex flex-col gap-2">
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-2 text-sm text-muted">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
