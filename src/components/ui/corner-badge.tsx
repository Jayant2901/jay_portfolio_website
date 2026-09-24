import type { ReactNode } from "react";

// A HUD-style bracket-cornered tile — four corner brackets drawn from
// border edges, no image asset needed.
export function CornerBadge({ children }: { children: ReactNode }) {
  return (
    <div className="group relative px-6 py-5">
      <span className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l border-t border-border transition-colors duration-300 group-hover:border-accent" />
      <span className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r border-t border-border transition-colors duration-300 group-hover:border-accent" />
      <span className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b border-l border-border transition-colors duration-300 group-hover:border-accent" />
      <span className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b border-r border-border transition-colors duration-300 group-hover:border-accent" />
      {children}
    </div>
  );
}
