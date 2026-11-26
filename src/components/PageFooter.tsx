"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/siteConfig";

export default function PageFooter() {
  const pathname = usePathname();

  // When on the homepage, the native Webflow footer is rendered from pageContent.ts
  if (pathname === "/") {
    return null;
  }

  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" data-theme="dark" className="footer_component">
      <div data-padding-bottom="small" data-padding-top="small" className="u-container is-footer">
        <div className="w-layout-grid footer_top-wrapper">
          <div className="footer_left-wrapper">
            <a href="/" className="footer_logo-link u-mb-small w-nav-brand">
              <img
                alt={`${siteConfig.brand.name} Logo`}
                src={siteConfig.brand.logo}
                loading="lazy"
                className="footer_logo"
              />
            </a>
            <div className="footer_details-wrapper u-mb-main">
              <div className="footer_conatct-link-wrap u-mb-main">
                {siteConfig.contact.phone && (
                  <a href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`} className="contact-link w-inline-block">
                    <div className="icon-wrap">
                      <div className="icon-embed-xsmall w-embed">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          role="img"
                          className="iconify iconify--carbon"
                          width="100%"
                          height="100%"
                          preserveAspectRatio="xMidYMid meet"
                          viewBox="0 0 32 32"
                        >
                          <path
                            fill="currentColor"
                            d="m20.33 21.48l2.24-2.24a2.19 2.19 0 0 1 2.34-.48l2.73 1.09a2.18 2.18 0 0 1 1.36 2v5A2.17 2.17 0 0 1 26.72 29C7.59 27.81 3.73 11.61 3 5.41A2.17 2.17 0 0 1 5.17 3H10a2.16 2.16 0 0 1 2 1.36l1.09 2.73a2.16 2.16 0 0 1-.47 2.34l-2.24 2.24s1.29 8.73 9.95 9.81"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div>{siteConfig.contact.phone}</div>
                  </a>
                )}
              </div>
              {siteConfig.contact.email && (
                <a href={`mailto:${siteConfig.contact.email}`} className="contact-link u-mb-main w-inline-block">
                  <div className="icon-wrap">
                    <div className="icon-embed-xsmall w-embed">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        role="img"
                        className="iconify iconify--ic"
                        width="100%"
                        height="100%"
                        preserveAspectRatio="xMidYMid meet"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m-.4 4.25l-7.07 4.42c-.32.2-.74.2-1.06 0L4.4 8.25a.85.85 0 1 1 .9-1.44L12 11l6.7-4.19a.85.85 0 1 1 .9 1.44"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div>{siteConfig.contact.email}</div>
                </a>
              )}
              {siteConfig.contact.address && (
                <div className="contact-link u-mb-main">
                  <div className="icon-wrap">
                    <div className="icon-embed-xsmall w-embed">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        role="img"
                        className="iconify iconify--ph"
                        width="100%"
                        height="100%"
                        preserveAspectRatio="xMidYMid meet"
                        viewBox="0 0 256 256"
                      >
                        <path
                          fill="currentColor"
                          d="M128 16a88.1 88.1 0 0 0-88 88c0 75.3 80 132.17 83.41 134.55a8 8 0 0 0 9.18 0C136 236.17 216 179.3 216 104a88.1 88.1 0 0 0-88-88m0 56a32 32 0 1 1-32 32a32 32 0 0 1 32-32"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div>{siteConfig.contact.address}</div>
                </div>
              )}
            </div>
            <div className="w-layout-grid footer_social-list">
              {siteConfig.contact.facebook && (
                <a href={siteConfig.contact.facebook} target="_blank" rel="noopener noreferrer" className="footer_social-link w-inline-block">
                  <div className="icon-embed_social w-embed">
                    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M22 12.0611C22 6.50451 17.5229 2 12 2C6.47715 2 2 6.50451 2 12.0611C2 17.0828 5.65684 21.2452 10.4375 22V14.9694H7.89844V12.0611H10.4375V9.84452C10.4375 7.32296 11.9305 5.93012 14.2146 5.93012C15.3088 5.93012 16.4531 6.12663 16.4531 6.12663V8.60261H15.1922C13.95 8.60261 13.5625 9.37822 13.5625 10.1739V12.0611H16.3359L15.8926 14.9694H13.5625V22C18.3432 21.2452 22 17.083 22 12.0611Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                </a>
              )}
              {siteConfig.contact.instagram && (
                <a href={siteConfig.contact.instagram} target="_blank" rel="noopener noreferrer" className="footer_social-link w-inline-block">
                  <div className="icon-embed_social w-embed">
                    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M16 3H8C5.23858 3 3 5.23858 3 8V16C3 18.7614 5.23858 21 8 21H16C18.7614 21 21 18.7614 21 16V8C21 5.23858 18.7614 3 16 3ZM19.25 16C19.2445 17.7926 17.7926 19.2445 16 19.25H8C6.20735 19.2445 4.75549 17.7926 4.75 16V8C4.75549 6.20735 6.20735 4.75549 8 4.75H16C17.7926 4.75549 19.2445 6.20735 19.25 8V16ZM16.75 8.25C17.3023 8.25 17.75 7.80228 17.75 7.25C17.75 6.69772 17.3023 6.25 16.75 6.25C16.1977 6.25 15.75 6.69772 15.75 7.25C15.75 7.80228 16.1977 8.25 16.75 8.25ZM12 7.5C9.51472 7.5 7.5 9.51472 7.5 12C7.5 14.4853 9.51472 16.5 12 16.5C14.4853 16.5 16.5 14.4853 16.5 12C16.5027 10.8057 16.0294 9.65957 15.1849 8.81508C14.3404 7.97059 13.1943 7.49734 12 7.5ZM9.25 12C9.25 13.5188 10.4812 14.75 12 14.75C13.5188 14.75 14.75 13.5188 14.75 12C14.75 10.4812 13.5188 9.25 12 9.25C10.4812 9.25 9.25 10.4812 9.25 12Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                </a>
              )}
            </div>
          </div>
          <div className="w-layout-grid footer_menu-wrapper">
            <div className="footer_link-list">
              <h3 className="u-text-h5">Quick Links</h3>
              <a href="/" className="footer_link w-inline-block">
                <div>Home</div>
                <div className="footer_link-underline"></div>
              </a>
              <Link href="/about-us" className="footer_link w-inline-block">
                <div>About Us</div>
                <div className="footer_link-underline"></div>
              </Link>
              <Link href="/portfolio" className="footer_link w-inline-block">
                <div>Portfolio</div>
                <div className="footer_link-underline"></div>
              </Link>
              <Link href="/reviews" className="footer_link w-inline-block">
                <div>Reviews</div>
                <div className="footer_link-underline"></div>
              </Link>
            </div>
            <div className="footer_link-list">
              <h3 className="u-text-h5">Inquiries</h3>
              <a href="/#footer" className="footer_link w-inline-block">
                <div>Contact</div>
                <div className="footer_link-underline"></div>
              </a>
              <a
                href={`https://wa.me/${(siteConfig.contact.whatsappNumber || "94783114414").replace(/\D/g, "")}?text=${encodeURIComponent(siteConfig.contact.whatsappMessage || "Hello! I would like to inquire about wedding photography availability and packages.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="footer_link w-inline-block"
              >
                <div>Reserve Now</div>
                <div className="footer_link-underline"></div>
              </a>
            </div>
          </div>
        </div>
        <div className="footer_bottom-wrapper">
          <div className="footer_credit-text_wrap">
            <div className="footer_credit-text">© {currentYear} {siteConfig.brand.name}. All rights reserved.</div>
          </div>
          <div className="w-layout-grid footer_legal-list">
            <div className="footer_site-credit">
              <div className="footer_credit-text">{siteConfig.brand.tagline}</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
