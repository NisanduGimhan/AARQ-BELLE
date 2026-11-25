import type { Metadata } from "next";
import { siteConfig } from "@/config/siteConfig";
import PageNavbar from "@/components/PageNavbar";
import PageFooter from "@/components/PageFooter";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: siteConfig.brand.seoTitle,
  description: siteConfig.brand.seoDescription,
  icons: {
    icon: siteConfig.brand.logo,
    apple: siteConfig.brand.logo,
  },
  openGraph: {
    title: siteConfig.brand.seoTitle,
    description: siteConfig.brand.seoDescription,
    images: [siteConfig.hero.image],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-wf-domain="wedlockinternational.com"
      data-wf-page="66f2e119b79d1d70f35704ed"
      data-wf-site="66f2e119b79d1d70f35704ab"
    >
      <head>
        <link rel="stylesheet" href="/css/webflow.css" />
        <link rel="stylesheet" href="/css/head_styles.css" />
        <link
          rel="preconnect"
          href="https://cdn.prod.website-files.com"
          crossOrigin="anonymous"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(o,c){var n=c.documentElement,t=" w-mod-";n.className+=t+"js",("ontouchstart"in o||o.DocumentTouch&&c instanceof DocumentTouch)&&(n.className+=t+"touch")}(window,document);`,
          }}
        />
      </head>
      <body>
        <PageNavbar />
        {children}
        <PageFooter />
        <FloatingWhatsApp />

        {/* Core Webflow & Animation Runtime Scripts */}
        <script src="/js/jquery.js" />
        <script src="/js/webflow.chunk1.js" />
        <script src="/js/webflow.chunk2.js" />
        <script src="/js/webflow.main.js" />
        <script src="/js/gsap.js" />
        <script src="/js/ScrollTrigger.js" />
        <script src="/js/SplitText.js" />
        <script src="/js/lenis.js" />
        <script src="/js/page_custom.js" />
      </body>
    </html>
  );
}
