"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/siteConfig";

interface PageNavbarProps {
  currentPath?: string;
}

export default function PageNavbar({ currentPath: propPath }: PageNavbarProps) {
  const pathname = usePathname();
  const currentPath = propPath || pathname || "/";
  const [menuOpen, setMenuOpen] = useState(false);

  // When on the homepage, the native Webflow navbar is rendered from pageContent.ts
  if (currentPath === "/") {
    return null;
  }

  const isAbout = currentPath === "/about-us";
  const isPortfolio = currentPath === "/portfolio" || currentPath.startsWith("/couple");
  const isReviews = currentPath === "/reviews";

  const whatsappUrl = `https://wa.me/${(siteConfig.contact.whatsappNumber || "94783793366").replace(/\D/g, "")}?text=${encodeURIComponent(siteConfig.contact.whatsappMessage || "Hello! I would like to inquire about wedding photography availability and packages.")}`;

  return (
    <div
      className="navbar_component w-nav page-navbar"
      data-animation="default"
      data-collapse="all"
      data-duration="0"
      data-easing="ease"
      data-easing2="ease"
      data-theme="dark"
      data-w-id="7173b84c-5aac-7a8a-e931-d1b5bdb14a48"
      fs-scrolldisable-element="smart-nav"
      role="banner"
    >
      <div className="navbar_container">
        <a
          href="/"
          className="navbar_logo-link w-nav-brand"
        >
          <img
            alt={`${siteConfig.brand.name} Logo`}
            className="navbar_logo"
            loading="lazy"
            src={siteConfig.brand.logo}
          />
        </a>

        {/* Desktop Nav Links */}
        <div className="nav-link_wrap">
          <a
            className="nav-link_item w-inline-block"
            data-w-id="2575dde9-084a-934d-4dc8-e6c38ca5d10f"
            href="/"
          >
            <div className="u-text-main">Home</div>
            <div className="nav-link_underline"></div>
          </a>
          <Link
            className={`nav-link_item w-inline-block ${isAbout ? "w--current" : ""}`}
            data-w-id="2575dde9-084a-934d-4dc8-e6c38ca5d10f"
            href="/about-us"
          >
            <div className="u-text-main">About</div>
            <div className="nav-link_underline"></div>
          </Link>
          <Link
            className={`nav-link_item w-inline-block ${isPortfolio ? "w--current" : ""}`}
            data-w-id="2575dde9-084a-934d-4dc8-e6c38ca5d10f"
            href="/portfolio"
          >
            <div className="u-text-main">Portfolio</div>
            <div className="nav-link_underline"></div>
          </Link>
          <Link
            className={`nav-link_item w-inline-block ${isReviews ? "w--current" : ""}`}
            data-w-id="2575dde9-084a-934d-4dc8-e6c38ca5d10f"
            href="/reviews"
          >
            <div className="u-text-main">Reviews</div>
            <div className="nav-link_underline"></div>
          </Link>
          <a
            className="nav-link_item w-inline-block"
            data-w-id="2575dde9-084a-934d-4dc8-e6c38ca5d10f"
            href="/#footer"
          >
            <div className="u-text-main">Contact</div>
            <div className="nav-link_underline"></div>
          </a>
        </div>

        {/* Action & Menu Button */}
        <div className="navbar_wrapper">
          <div className="nav-button_wrap">
            <aside className="button-bride" data-w-id="4d2cdb7e-ebc9-648d-4ca9-06a9020b6dbd">
              <div className="button-t_bridge">Reserve Now</div>
              <div className="button-icon-wrap_bridge">
                <div className="button-icon w-embed">
                  <svg
                    aria-hidden="true"
                    className="iconify iconify--tabler"
                    height="100%"
                    preserveAspectRatio="xMidYMid meet"
                    role="img"
                    viewBox="0 0 24 24"
                    width="100%"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6m-7 1l9-9m-5 0h5v5"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                  </svg>
                </div>
              </div>
              <div className="button-cover_bridge"></div>
              <a
                className="button-link_bridge w-inline-block"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              ></a>
            </aside>
          </div>

          <aside className="button-animated is-icon" data-w-id="4ad17e6f-278c-2eb2-cb26-7a9808318717">
            <div className="button-icon-wrap is-icon">
              <div className="icon-embed-medium w-embed">
                <svg
                  aria-hidden="true"
                  className="iconify iconify--ic"
                  height="100%"
                  preserveAspectRatio="xMidYMid meet"
                  role="img"
                  viewBox="0 0 24 24"
                  width="100%"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 11v6.97l-5-2.14l-5 2.14V5h6V3H7c-1.1 0-2 .9-2 2v16l7-3l7 3V11zm4-4h-2v2h-2V7h-2V5h2V3h2v2h2z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </div>
            <a className="button-link w-inline-block" href="/#booking"></a>
          </aside>

          {/* Fullscreen Mobile / Drawer Menu */}
          <nav
            className={`fs-navbar_menu w-nav-menu ${menuOpen ? "w--open" : ""}`}
            role="navigation"
            style={{
              display: menuOpen ? "block" : "none",
              opacity: menuOpen ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          >
            <div className="fs-navbar_menu-bg">
              <div className="fs-navbar_menu-bg-overlay"></div>
              <img
                alt=""
                className="fs-navbar_menu-bg-image"
                loading="lazy"
                src={siteConfig.brand?.menuImage || "/images/cta_03y.jpg"}
              />
            </div>
            <div className="fs-navbar_menu-wrapper">
              <div className="fs-navbart_menu-container">
                <div className="fs-navbar_links-wrapper">
                  <div className="fs-navbar_links_left">
                    <div className="fs-navbar_link-host">
                      <div className="fs-navbar_link">
                        <a
                          className="fs-menu-link w-inline-block"
                          href="/"
                          onClick={() => setMenuOpen(false)}
                        >
                          <div className="fs-menu-link_text">Home</div>
                          <div className="nav-link_underline"></div>
                        </a>
                      </div>
                    </div>
                    <div className="fs-navbar_link-host">
                      <div className="fs-navbar_link">
                        <Link
                          className={`fs-menu-link w-inline-block ${isAbout ? "w--current" : ""}`}
                          href="/about-us"
                          onClick={() => setMenuOpen(false)}
                        >
                          <div className="fs-menu-link_text">About us</div>
                          <div className="nav-link_underline"></div>
                        </Link>
                      </div>
                    </div>
                    <div className="fs-navbar_link-host">
                      <div className="fs-navbar_link">
                        <Link
                          className={`fs-menu-link w-inline-block ${isPortfolio ? "w--current" : ""}`}
                          href="/portfolio"
                          onClick={() => setMenuOpen(false)}
                        >
                          <div className="fs-menu-link_text">Portfolio</div>
                          <div className="nav-link_underline"></div>
                        </Link>
                      </div>
                    </div>
                    <div className="fs-navbar_link-host">
                      <div className="fs-navbar_link">
                        <Link
                          className={`fs-menu-link w-inline-block ${isReviews ? "w--current" : ""}`}
                          href="/reviews"
                          onClick={() => setMenuOpen(false)}
                        >
                          <div className="fs-menu-link_text">Reviews</div>
                          <div className="nav-link_underline"></div>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="fs-navbar_links_right">
                    <div className="fs-navbar_link-host">
                      <div className="fs-navbar_link">
                        <a
                          className="fs-menu-link w-inline-block"
                          href="/#footer"
                          onClick={() => setMenuOpen(false)}
                        >
                          <div className="fs-menu-link_text">Contact Us</div>
                          <div className="nav-link_underline"></div>
                        </a>
                      </div>
                    </div>
                    <div className="fs-navbar_link-host">
                      <div className="fs-navbar_link">
                        <a
                          className="fs-menu-link w-inline-block"
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setMenuOpen(false)}
                        >
                          <div className="fs-menu-link_text">Reserve Now</div>
                          <div className="nav-link_underline"></div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="fs-navbar_bottom">
              <div className="fs-navbar_wrap">
                <a
                  className="footer_link w-inline-block"
                  href="/#faq"
                  onClick={() => setMenuOpen(false)}
                >
                  <div>FAQ</div>
                  <div className="footer_link-underline"></div>
                </a>
                <div className="w-layout-grid footer_social-list">
                  {siteConfig.contact.facebook && (
                    <a
                      className="footer_social-link w-inline-block"
                      href={siteConfig.contact.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="icon-embed_social w-embed">
                        <svg fill="none" height="100%" viewBox="0 0 24 24" width="100%" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M22 12.0611C22 6.50451 17.5229 2 12 2C6.47715 2 2 6.50451 2 12.0611C2 17.0828 5.65684 21.2452 10.4375 22V14.9694H7.89844V12.0611H10.4375V9.84452C10.4375 7.32296 11.9305 5.93012 14.2146 5.93012C15.3088 5.93012 16.4531 6.12663 16.4531 6.12663V8.60261H15.1922C13.95 8.60261 13.5625 9.37822 13.5625 10.1739V12.0611H16.3359L15.8926 14.9694H13.5625V22C18.3432 21.2452 22 17.083 22 12.0611Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </div>
                    </a>
                  )}
                  {siteConfig.contact.instagram && (
                    <a
                      className="footer_social-link w-inline-block"
                      href={siteConfig.contact.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="icon-embed_social w-embed">
                        <svg fill="none" height="100%" viewBox="0 0 24 24" width="100%" xmlns="http://www.w3.org/2000/svg">
                          <path
                            clipRule="evenodd"
                            d="M16 3H8C5.23858 3 3 5.23858 3 8V16C3 18.7614 5.23858 21 8 21H16C18.7614 21 21 18.7614 21 16V8C21 5.23858 18.7614 3 16 3ZM19.25 16C19.2445 17.7926 17.7926 19.2445 16 19.25H8C6.20735 19.2445 4.75549 17.7926 4.75 16V8C4.75549 6.20735 6.20735 4.75549 8 4.75H16C17.7926 4.75549 19.2445 6.20735 19.25 8V16ZM16.75 8.25C17.3023 8.25 17.75 7.80228 17.75 7.25C17.75 6.69772 17.3023 6.25 16.75 6.25C16.1977 6.25 15.75 6.69772 15.75 7.25C15.75 7.80228 16.1977 8.25 16.75 8.25ZM12 7.5C9.51472 7.5 7.5 9.51472 7.5 12C7.5 14.4853 9.51472 16.5 12 16.5C14.4853 16.5 16.5 14.4853 16.5 12C16.5027 10.8057 16.0294 9.65957 15.1849 8.81508C14.3404 7.97059 13.1943 7.49734 12 7.5ZM9.25 12C9.25 13.5188 10.4812 14.75 12 14.75C13.5188 14.75 14.75 13.5188 14.75 12C14.75 10.4812 13.5188 9.25 12 9.25C10.4812 9.25 9.25 10.4812 9.25 12Z"
                            fill="currentColor"
                            fillRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </nav>

          {/* Mobile Menu Hamburger Button */}
          <div
            role="button"
            tabIndex={0}
            className={`fs-navbar_menu-button w-nav-button ${menuOpen ? "w--open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setMenuOpen(!menuOpen);
              }
            }}
            aria-label="Toggle Navigation Menu"
          >
            <div className="menu-icon">
              <div className="menu-icon_wrapper">
                <div
                  className="menu-icon_line-top"
                  style={{
                    transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
                    transition: "transform 0.3s",
                  }}
                ></div>
                <div
                  className="menu-icon_line-middle"
                  style={{
                    opacity: menuOpen ? 0 : 1,
                    transition: "opacity 0.2s",
                  }}
                >
                  <div className="menu-icon4_line-middle-top"></div>
                  <div className="menu-icon4_line-middle-base"></div>
                </div>
                <div
                  className="menu-icon_line-bottom"
                  style={{
                    transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
                    transition: "transform 0.3s",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
