import type { NextConfig } from "next";

// GitHub Pages serves this repo at /jay_portfolio_website, not the domain root,
// so the production build needs that prefix baked into every asset/link path.
// Local dev (no GITHUB_PAGES env) still runs at the root as normal.
const basePath = process.env.GITHUB_PAGES === "true" ? "/jay_portfolio_website" : "";

const nextConfig: NextConfig = {
  output: "export",
  // Every route below is a real static page (multi-page site, not one
  // scroll page), so GitHub Pages needs the /route/index.html convention
  // to resolve /about, /work, etc. without a 404.
  trailingSlash: true,
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
