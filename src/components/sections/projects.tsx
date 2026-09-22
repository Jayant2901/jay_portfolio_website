"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons/brand-icons";
import { TiltCard } from "@/components/ui/tilt-card";
import { projects } from "@/data/resume";

export function Projects() {
  const [hovered, setHovered] = useState<string | null>(null);
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
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
            Selected work
          </p>
          <h2 className="font-display text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.95] tracking-tight text-fg">
            Projects
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <TiltCard
                as="a"
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHovered(project.slug)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(project.slug)}
                onBlur={() => setHovered(null)}
                className="group relative flex h-80 overflow-hidden rounded-[20px] border border-border bg-surface p-7 transition-colors duration-300 hover:border-accent"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-accent/10 blur-3xl transition-opacity duration-500 group-hover:opacity-80"
                />

                <div className="flex items-start justify-between">
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted">
                    0{i + 1}
                  </span>
                  <ArrowUpRight
                    size={22}
                    className="text-muted transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent"
                  />
                </div>

                <div className="flex flex-1 flex-col items-center justify-center text-center">
                  <span className="font-display text-[clamp(2.2rem,5.5vw,3.2rem)] leading-none tracking-tight text-accent">
                    {project.stat}
                  </span>
                  <span className="mt-2 max-w-[15rem] text-xs font-medium uppercase tracking-wide text-muted">
                    {project.statLabel}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-2xl leading-tight tracking-tight text-fg">
                    {project.title}
                  </h3>
                  <div className="relative mt-2 h-10">
                    <p
                      className={`absolute inset-0 text-sm text-muted transition-all duration-300 ${
                        hovered === project.slug
                          ? "-translate-y-1 opacity-0"
                          : "translate-y-0 opacity-100"
                      }`}
                    >
                      {project.tagline}
                    </p>
                    <p
                      className={`absolute inset-0 text-sm text-fg transition-all duration-300 ${
                        hovered === project.slug
                          ? "translate-y-0 opacity-100"
                          : "translate-y-1 opacity-0"
                      }`}
                    >
                      {project.hoverLine}
                    </p>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 flex flex-col divide-y divide-border border-t border-border">
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="grid grid-cols-1 gap-6 py-10 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]"
            >
              <div>
                <h3 className="font-display text-2xl tracking-tight text-fg sm:text-3xl">
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
