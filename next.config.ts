import type { NextConfig } from "next";

// GitHub Pages serves this repo at /jay_portfolio_website, not the domain root,
// so the production build needs that prefix baked into every asset/link path.
// Local dev (no GITHUB_PAGES env) still runs at the root as normal.
const basePath = process.env.GITHUB_PAGES === "true" ? "/jay_portfolio_website" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: {
    // next/image's optimizer needs a server; static export has none.
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
