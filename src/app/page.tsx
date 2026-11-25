"use client";

import { siteConfig } from "@/config/siteConfig";
import { getRenderedPage } from "./pageContent";

export default function Home() {
  const html = getRenderedPage(siteConfig);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
