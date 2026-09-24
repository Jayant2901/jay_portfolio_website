import type { Metadata } from "next";
import { Projects } from "@/components/sections/projects";
import { personal } from "@/data/resume";

export const metadata: Metadata = {
  title: `Work — ${personal.name}`,
  description: "Selected projects, each with a full case study.",
};

export default function WorkPage() {
  return (
    <main className="pt-28 sm:pt-32">
      <Projects />
    </main>
  );
}
