import type { Metadata } from "next";
import { Contact } from "@/components/sections/contact";
import { personal } from "@/data/resume";

export const metadata: Metadata = {
  title: `Contact — ${personal.name}`,
  description: `Get in touch with ${personal.name}.`,
};

export default function ContactPage() {
  return (
    <main className="pt-28 sm:pt-32">
      <Contact />
    </main>
  );
}
