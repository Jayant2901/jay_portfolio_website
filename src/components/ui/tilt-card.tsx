"use client";

import { useRef, type MouseEvent, type ReactNode, type RefObject } from "react";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";

// Shared tilt physics for cases where the hoverable/clickable element is owned
// by the caller (e.g. AnchorLink) rather than by TiltCard itself. Attach `ref`,
// `onMouseMove`, and `onMouseLeave` to that stable outer element, then wrap its
// content in <TiltSurface rotateX={rotateX} rotateY={rotateY}>.
export function useTilt<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(springY, [0, 1], [6, -6]);
  const rotateY = useTransform(springX, [0, 1], [-6, 6]);

  function onMouseMove(e: MouseEvent<T>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  }

  function onMouseLeave() {
    x.set(0.5);
    y.set(0.5);
  }

  return { ref: ref as RefObject<T | null>, rotateX, rotateY, onMouseMove, onMouseLeave };
}

export function TiltSurface({
  rotateX,
  rotateY,
  children,
  className,
}: {
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "a";
  href?: string;
  target?: string;
  rel?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

// The outer element owns hit-testing (hover state, href, focus) and never moves,
// so it can't desync from the mouse. Only the inner wrapper tilts in 3D — that way
// the spring lag on the tilt can never cause a spurious mouseleave on the outer box.
export function TiltCard({ children, className, as = "div", ...rest }: TiltCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(springY, [0, 1], [6, -6]);
  const rotateY = useTransform(springX, [0, 1], [-6, 6]);

  function handleMouseMove(e: MouseEvent<HTMLDivElement | HTMLAnchorElement>) {
    const el = as === "a" ? anchorRef.current : divRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    x.set(0.5);
    y.set(0.5);
  }

  const inner = (
    <motion.div
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className="flex h-full w-full flex-col justify-between"
    >
      {children}
    </motion.div>
  );

  if (as === "a") {
    return (
      <a
        ref={anchorRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={className}
        {...rest}
      >
        {inner}
      </a>
    );
  }

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      {...rest}
    >
      {inner}
    </div>
  );
}
