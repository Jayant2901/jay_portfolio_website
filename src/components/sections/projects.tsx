"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons/brand-icons";
import { TiltCard } from "@/components/ui/tilt-card";
import { projects } from "@/data/resume";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 0.2"],
  });
  const headingX = useTransform(scrollYProgress, [0, 1], [-40, 0]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="scroll-mt-24 border-t border-border py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <motion.div style={{ x: headingX }} className="mb-14">
          <p className="font-mono-label mb-3 text-xs font-semibold uppercase text-accent">
            Selected work
          </p>
          <h2 className="font-display text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.95] text-fg">
            Projects
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-6">
          {projects.map((project, i) => {
            const featured = i === 0;
            return (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, x: i % 2 === 0 ? -32 : 32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: EASE }}
                style={{ transformStyle: "preserve-3d" }}
                className={featured ? "sm:col-span-4" : "sm:col-span-2"}
              >
                <TiltCard
                  as="a"
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative flex overflow-hidden rounded-[28px] border border-border bg-surface shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_36px_64px_-24px_rgba(201,123,61,0.24)] ${
                    featured
                      ? "h-[22rem] flex-row items-end p-8"
                      : "h-[22rem] flex-col justify-between p-7"
                  }`}
                >
                  <div className="pointer-events-none absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {featured ? (
                    <>
                      <div className="flex h-full flex-1 flex-col justify-between">
                        <div className="flex items-start justify-between">
                          <span className="font-mono-label text-xs font-semibold uppercase text-muted">
                            0{i + 1} · {project.tagline}
                          </span>
                          <ArrowUpRight
                            size={22}
                            className="text-muted transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent"
                          />
                        </div>
                        <div>
                          <h3 className="font-display text-[clamp(2rem,4vw,3rem)] leading-none text-fg">
                            {project.title}
                          </h3>
                          <p className="mt-3 max-w-md text-muted">{project.summary}</p>
                        </div>
                      </div>
                      <div className="ml-8 hidden shrink-0 border-l border-border pl-8 sm:block">
                        <span className="font-display block text-[clamp(2.8rem,6vw,4rem)] leading-none text-accent">
                          {project.stat}
                        </span>
                        <span className="font-mono-label mt-2 block max-w-[12rem] text-xs font-medium uppercase text-muted">
                          {project.statLabel}
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-start justify-between">
                        <span className="font-mono-label text-xs font-semibold uppercase text-muted">
                          0{i + 1}
                        </span>
                        <ArrowUpRight
                          size={20}
                          className="text-muted transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent"
                        />
                      </div>

                      <div>
                        <span className="font-display block text-[clamp(1.8rem,4vw,2.4rem)] leading-none text-accent">
                          {project.stat}
                        </span>
                        <span className="font-mono-label mt-2 block text-xs font-medium uppercase text-muted">
                          {project.statLabel}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-display text-xl leading-tight text-fg">
                          {project.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted">
                          {project.summary}
                        </p>
                      </div>
                    </>
                  )}
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-20 flex flex-col divide-y divide-border border-t border-border">
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: EASE }}
              className="grid grid-cols-1 gap-6 py-10 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]"
            >
              <div>
                <h3 className="font-display text-2xl text-fg sm:text-3xl">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{project.tagline}</p>
                <p className="mt-1 text-sm text-muted">{project.timeframe}</p>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-fg underline decoration-border underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                >
                  <GithubIcon size={16} />
                  View on GitHub
                </a>
              </div>
              <div>
                <ul className="flex flex-col gap-3">
                  {project.points.map((point) => (
                    <li key={point} className="flex gap-3 text-muted">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
