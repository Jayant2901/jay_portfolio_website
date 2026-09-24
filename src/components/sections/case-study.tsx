"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { GithubIcon } from "@/components/icons/brand-icons";
import { CountUp } from "@/components/ui/count-up";
import { Button } from "@/components/ui/button";
import { projects, type Project } from "@/data/resume";

const EASE = [0.16, 1, 0.3, 1] as const;

export function CaseStudy({ project }: { project: Project }) {
  const index = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <main className="pb-24 pt-28 sm:pb-32 sm:pt-32">
      <div className="mx-auto max-w-4xl px-6 sm:px-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-mono-label mb-4 text-xs font-semibold uppercase text-accent"
        >
          {"// case study"}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
          className="font-display text-[clamp(2.4rem,7vw,4.5rem)] leading-[0.95] text-fg"
        >
          {project.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-3 text-sm text-muted"
        >
          {project.tagline} · {project.timeframe}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 max-w-2xl text-lg leading-relaxed text-muted"
        >
          {project.summary}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2"
        >
          <div className="rounded-[24px] border border-border bg-surface p-6">
            <h2 className="font-mono-label text-xs font-semibold uppercase text-muted">
              Technology
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
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
          <div className="rounded-[24px] border border-border bg-surface p-6">
            <h2 className="font-mono-label text-xs font-semibold uppercase text-muted">
              Role
            </h2>
            <p className="mt-4 text-fg">{project.role}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mt-14 border-t border-border pt-10"
        >
          <h2 className="font-display text-2xl text-fg">Challenge</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">{project.challenge}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mt-14 border-t border-border pt-10"
        >
          <h2 className="font-display text-2xl text-fg">Approach</h2>
          <ul className="mt-5 flex flex-col gap-4">
            {project.points.map((point) => (
              <li key={point} className="flex gap-3 text-muted">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="text-lg leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mt-14 flex flex-col items-start gap-2 border-t border-border pt-10"
        >
          <h2 className="font-mono-label text-xs font-semibold uppercase text-muted">Result</h2>
          <CountUp
            stat={project.stat}
            className="font-display text-[clamp(3rem,8vw,5rem)] leading-none text-accent"
          />
          <p className="text-muted">{project.statLabel}</p>
        </motion.div>

        <div className="mt-14 flex flex-wrap items-center gap-3.5 border-t border-border pt-10">
          <Button asChild variant="primary">
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <GithubIcon size={16} />
              View on GitHub
            </a>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/work">All projects</Link>
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 border-t border-border pt-10 sm:grid-cols-2">
          <Link
            href={`/projects/${prev.slug}`}
            className="group rounded-[24px] border border-border bg-surface p-6 transition-colors hover:border-accent/60"
          >
            <span className="font-mono-label flex items-center gap-2 text-xs font-semibold uppercase text-muted">
              <ArrowLeft size={14} className="transition-transform duration-300 group-hover:-translate-x-1" />
              Previous
            </span>
            <p className="mt-3 font-display text-xl text-fg">{prev.title}</p>
          </Link>
          <Link
            href={`/projects/${next.slug}`}
            className="group rounded-[24px] border border-border bg-surface p-6 text-right transition-colors hover:border-accent/60"
          >
            <span className="font-mono-label flex items-center justify-end gap-2 text-xs font-semibold uppercase text-muted">
              Next
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <p className="mt-3 font-display text-xl text-fg">{next.title}</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
