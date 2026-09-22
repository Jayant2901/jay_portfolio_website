import { Hero } from "@/components/sections/hero";
import { FeatureBlocks } from "@/components/sections/feature-blocks";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { About } from "@/components/sections/about";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeatureBlocks />
      <Projects />
      <Skills />
      <About />
      <Footer />
    </main>
  );
}
