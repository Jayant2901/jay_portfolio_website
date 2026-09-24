import type { Metadata } from "next";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { personal } from "@/data/resume";

export const metadata: Metadata = {
  title: `About — ${personal.name}`,
  description: personal.summary,
};

export default function AboutPage() {
  return (
    <main className="pt-28 sm:pt-32">
      <About />
      <Skills />
    </main>
  );
}
