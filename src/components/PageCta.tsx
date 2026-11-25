"use client";

import Link from "next/link";
import { siteConfig } from "@/config/siteConfig";

export default function PageCta() {
  return (
    <section data-theme="dark" className="section_cta text-color-alternate">
      <div className="u-container">
        <div>
          <div className="cta_component">
            <div className="max-width-large">
              <h2 className="u-text-h2 u-mb-main">
                Let Us Capture Your <br />
                Wedding Journey
              </h2>
              <div className="max-width-small">
                <p className="u-text-main u-mb-main">
                  Connect with us to discuss your wedding photography needs,
                  wherever in the world your celebration awaits.
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div className="cta_background-image-wrapper">
        <div className="cta-overlay-layer"></div>
        <div
          className="cta_background-image"
          style={{ backgroundImage: `url(${siteConfig.ctaBanner?.image || "/images/cta_june.jpg"})` }}
        />
        <div
          className="cta_background-image-mobile"
          style={{ backgroundImage: `url(${siteConfig.ctaBanner?.image || "/images/cta_june.jpg"})` }}
        />
      </div>
    </section>
  );
}
