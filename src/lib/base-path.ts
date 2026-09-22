// next/link and next/image auto-prefix basePath, but plain <a href> strings
// and metadata paths don't — use this for those.
export function withBasePath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path}`;
}
