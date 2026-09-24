"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

// Stats aren't plain integers ("13×", "1.8σ", "0.968", "12s"), so animate
// just the leading numeric portion and re-append whatever surrounds it.
function parseStat(stat: string) {
  const match = stat.match(/\d+(\.\d+)?/);
  if (!match || match.index === undefined) return null;
  const value = parseFloat(match[0]);
  const decimals = match[0].includes(".") ? match[0].split(".")[1].length : 0;
  return {
    value,
    prefix: stat.slice(0, match.index),
    suffix: stat.slice(match.index + match[0].length),
    decimals,
  };
}

export function CountUp({ stat, className }: { stat: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const parsed = parseStat(stat);
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [display, setDisplay] = useState(() => {
    if (prefersReducedMotion || !parsed) return stat;
    return `${parsed.prefix}0${parsed.suffix}`;
  });

  useEffect(() => {
    if (!parsed || !inView || prefersReducedMotion) return;

    const duration = 900;
    const start = performance.now();
    let raf = 0;

    function tick(now: number) {
      if (!parsed) return;
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = parsed.value * eased;
      setDisplay(`${parsed.prefix}${current.toFixed(parsed.decimals)}${parsed.suffix}`);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setDisplay(stat);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- parsed is derived from stat, re-running per-frame off it is intentional
  }, [inView, stat]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
