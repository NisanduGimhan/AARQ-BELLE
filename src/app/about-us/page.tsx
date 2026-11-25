"use client";

import Link from "next/link";
import PageNavbar from "@/components/PageNavbar";
import PageFooter from "@/components/PageFooter";
import PageCta from "@/components/PageCta";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { siteConfig } from "@/config/siteConfig";

export default function AboutUsPage() {
  const { about, brand } = siteConfig;

  return (
    <div className="page_wrap">
      {/* Universal Webflow Navbar */}
      <PageNavbar currentPath="/about-us" />

      <main id="main" className="page_main">
        {/* Header Section */}
        <header data-theme="dark" className="section_page-header u-vflex-center-bottom">
          <div className="is-page-headinng_text-wrap">
            <div data-padding-bottom="none" data-padding-top="none" className="u-container">
              <h1 className="u-text-h1 u-mb-main">About us</h1>
              <div className="max-width-large">
                <p className="u-text-main">
                  {about.description ||
                    `Welcome to ${brand.name}, where we turn your wedding dreams into timeless memories. Our dedicated team of photographers and videographers is passionate about capturing the essence of your special day in stunning destinations worldwide.`}
                </p>
              </div>
            </div>
          </div>
          <div className="page-header_background-image-wrapper u-container">
            <div className="page-overlay-layer"></div>
            <div className="page-header-overlay_left"></div>
            <div className="page-header-overlay_right"></div>
            <img
              src={about.heroImage || "/images/about_hero.jpg"}
              loading="eager"
              alt="About Us Hero"
              className="page-header_background-image"
            />
          </div>
        </header>

        {/* About Overview Section */}
        <section data-theme="dark" className="section_about-overview">
          <div className="u-container">
            <div className="padding-section-large">
              <div className="w-layout-grid about-overview_component">
                <div className="about-overview_content">
                  <div className="u-text-h2 u-mb-main">
                    {about.title || "Capturing Love Stories Across Borders"}
                  </div>
                  <p className="u-mb-main">
                    At {brand.name}, we believe that every wedding is a unique story waiting to be told.
                    Our team of passionate photographers is dedicated to transforming each special moment
                    into timeless memories, bringing a blend of elegance, artistry, and authenticity to
                    every wedding we capture.
                    <br />
                    <br />
                    With years of experience photographing diverse weddings, from intimate beach
                    ceremonies to grand celebrations, we understand the importance of preserving the
                    joy, beauty, and emotions of your big day. We approach each wedding with a fresh
                    perspective, capturing genuine moments that reflect your personality and the essence
                    of your love.
                  </p>
                  <div className="u-text-h4 u-mb-main">A Vision for Love</div>
                  <p className="u-mb-main">
                    Our services extend far beyond borders, making us a trusted choice for couples from around the world. Whether you&apos;re celebrating
                    a destination wedding on picturesque shores or hosting an event in an exotic locale,
                    our team is ready to bring your vision to life with professionalism and attention to
                    detail.
                    <br />
                    <br />
                    From the initial consultation to the final gallery delivery, we ensure a seamless
                    experience for our clients, offering flexibility and support every step
                    of the way.
                  </p>
                  <div className="u-text-h4 u-mb-main">Our Commitment to Excellence</div>
                  <p className="u-mb-main">
                    At {brand.name}, we don&apos;t just take photographs; we create a lasting narrative of
                    your most cherished day. Driven by a passion for wedding photography and a commitment
                    to excellence, we work tirelessly to provide a warm, personalized experience that
                    makes you feel comfortable and confident.
                    <br />
                    <br />
                    Let us capture your wedding story, one moment at a time.
                  </p>


                </div>
                <div className="about-overview_image-wrap">
                  <img
                    src={about.overviewImage || "/images/about_overview.jpg"}
                    loading="lazy"
                    alt={about.title}
                    className="about-overview_image"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Global CTA Section */}
        <PageCta />
      </main>

      {/* Universal Webflow Footer */}
      <PageFooter />

      <FloatingWhatsApp />
    </div>
  );
}
