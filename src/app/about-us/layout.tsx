import type { Metadata } from "next";
import { siteConfig } from "@/config/siteConfig";

export const metadata: Metadata = {
  title: `About Us - ${siteConfig.brand.name}`,
  description: siteConfig.about.description,
  openGraph: {
    title: `About Us - ${siteConfig.brand.name}`,
    description: siteConfig.about.description,
    images: [siteConfig.about.heroImage || siteConfig.hero.image],
    type: "website",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
