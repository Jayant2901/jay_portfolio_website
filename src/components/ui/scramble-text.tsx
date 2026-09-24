"use client";

import { useEffect, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

// A React re-implementation of the character-scramble reveal effect
// (baffle.js on the inspiration site): cycles random characters before
// settling into the target text, left to right.
export function ScrambleText({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const [display, setDisplay] = useState(text);
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (prefersReducedMotion) return;

    let raf = 0;
    let frame = 0;
    const framesPerChar = 3;
    const totalFrames = text.length * framesPerChar + 15;

    const startTimeout = setTimeout(() => {
      function tick() {
        frame++;
        const revealCount = Math.floor(frame / framesPerChar);
        setDisplay(
          text
            .split("")
            .map((ch, i) => {
              if (ch === " ") return " ";
              if (i < revealCount) return text[i];
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );
        if (frame < totalFrames) {
          raf = requestAnimationFrame(tick);
        } else {
          setDisplay(text);
        }
      }
      raf = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      cancelAnimationFrame(raf);
    };
  }, [text, delay, prefersReducedMotion]);

  return <span className={className}>{display}</span>;
}
