"use client";

import PageCta from "@/components/PageCta";
import { siteConfig } from "@/config/siteConfig";

export default function ReviewsPage() {
  const testimonials = siteConfig.testimonials || [];

  return (
    <div className="page_wrap">
      <main id="main" className="page_main">
        {/* Page Header */}
        <header data-theme="dark" className="section_page-header u-vflex-center-bottom">
          <div className="is-page-headinng_text-wrap">
            <div data-padding-bottom="none" data-padding-top="none" className="u-container">
              <h1 className="u-text-h1 u-mb-main">Reviews</h1>
              <div className="max-width-large">
                <p className="u-text-main">
                  Explore heartfelt words from our international couples whose love stories we’ve had the honor of documenting across the world.
                </p>
              </div>
            </div>
          </div>
          <div className="page-header_background-image-wrapper u-container">
            <div className="page-overlay-layer"></div>
            <div className="page-header-overlay_left"></div>
            <div className="page-header-overlay_right"></div>
            <img
              src="/images/cta_03y.jpg"
              loading="eager"
              alt="Reviews Header Background"
              className="page-header_background-image"
            />
          </div>
        </header>

        {/* Reviews Cards Section */}
        <section data-theme="dark" className="section_reviews">
          <div className="u-container">
            <div className="reviews-cards_component">
              <div className="testimonial_cms-wrap w-dyn-list">
                <div role="list" className="reviews-cms-list w-dyn-items">
                  {testimonials.map((item, idx) => (
                    <div key={idx} role="listitem" className="testimonial_cms-item w-dyn-item">
                      <div className="testimonial_component relative overflow-hidden group">
                        {/* Background Couple Photo */}
                        <img
                          src={item.image}
                          loading="lazy"
                          alt={item.name}
                          className="testimonial-bg-image transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Gradient Tint Overlay */}
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.3) 100%)",
                            zIndex: 1,
                          }}
                        ></div>

                        {/* Content */}
                        <div className="testimonial33_content relative z-10 flex flex-col justify-between h-full p-8 md:p-10">
                          <div className="testimonial33_content-top u-mb-main">
                            <div className="quote-icon w-embed text-white/80 u-mb-small">
                              <svg
                                width="36"
                                height="36"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                              </svg>
                            </div>
                            <p className="u-text-main text-white/95 text-base md:text-lg leading-relaxed italic">
                              "{item.quote}"
                            </p>
                          </div>
                          <div className="testimonial33_content-bottom border-t border-white/15 pt-4">
                            <h3 className="u-text-h4 text-white font-medium">{item.name}</h3>
                            <div className="text-sm text-white/70 uppercase tracking-widest mt-1">
                              {item.origin}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Global CTA Section */}
        <PageCta />
      </main>
    </div>
  );
}
