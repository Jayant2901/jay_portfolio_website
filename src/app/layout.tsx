import type { Metadata } from "next";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { Navbar } from "@/components/layout/navbar";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { personal } from "@/data/resume";

const siteUrl = "https://jayantsharma.dev"; // TODO: update once a domain is connected

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${personal.name} — Data Science / ML / AI`,
  description: personal.tagline,
  keywords: [
    "Jayant Sharma",
    "Data Science",
    "Machine Learning",
    "AI",
    "Portfolio",
    "Python",
    "scikit-learn",
    "XGBoost",
  ],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: `${personal.name} — Data Science / ML / AI`,
    description: personal.tagline,
    url: siteUrl,
    siteName: personal.name,
    images: ["/og-image.svg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${personal.name} — Data Science / ML / AI`,
    description: personal.tagline,
    images: ["/og-image.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- root layout applies to every route, so this is not the pages/_document anti-pattern the rule targets */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-bg text-fg">
        <MotionConfig reducedMotion="user">
          <ScrollProgress />
          <SmoothScrollProvider>
            <Navbar />
            {children}
          </SmoothScrollProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
