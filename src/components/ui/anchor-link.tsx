"use client";

import { forwardRef, type AnchorHTMLAttributes, type MouseEvent } from "react";
import { useLenis } from "@/components/providers/smooth-scroll-provider";

const NAV_OFFSET = 88;

export const AnchorLink = forwardRef<
  HTMLAnchorElement,
  AnchorHTMLAttributes<HTMLAnchorElement>
>(({ href, onClick, ...props }, ref) => {
  const lenisRef = useLenis();

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e);
    if (!href) return;
    const lenis = lenisRef?.current;

    if (href === "#") {
      e.preventDefault();
      if (lenis) lenis.scrollTo(0, { duration: 1.1 });
      else window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (href.startsWith("#")) {
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(target as HTMLElement, {
          offset: -NAV_OFFSET,
          duration: 1.1,
        });
      } else {
        (target as HTMLElement).scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  }

  return <a ref={ref} href={href} onClick={handleClick} {...props} />;
});
AnchorLink.displayName = "AnchorLink";
