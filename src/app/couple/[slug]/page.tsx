"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/siteConfig";
import PageCta from "@/components/PageCta";
import LightboxModal from "@/components/LightboxModal";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";

interface StoryPageProps {
  params: {
    slug: string;
  };
}

export default function CoupleStoryPage({ params }: StoryPageProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const decodedSlug = decodeURIComponent(params.slug || "").trim().toLowerCase();
  const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

  // Find story by slug or fallback to spotlight / portfolioStories / portfolioItems
  const story =
    (() => {
      // 1. Check spotlight array first (spotlight top image is spot.image e.g. /images/spotlight_4.jpg)
      const spot = siteConfig.spotlight?.find(
        (s) =>
          (s.slug && (s.slug.toLowerCase() === decodedSlug || slugify(s.slug) === slugify(decodedSlug))) ||
          slugify(s.name) === slugify(decodedSlug)
      );
      if (spot) {
        return {
          slug: spot.slug ? slugify(spot.slug) : slugify(spot.name),
          title: spot.name,
          category: spot.category || "Destination Wedding",
          location: spot.location || "Sri Lanka",
          coverImage: spot.image,
          galleryImages: spot.images && spot.images.length > 0 ? spot.images : [spot.image],
          related: siteConfig.spotlight
            .filter((s) => s.name !== spot.name)
            .slice(0, 2)
            .map((s) => ({
              title: s.name,
              slug: s.slug ? slugify(s.slug) : slugify(s.name),
              image: s.image,
              category: s.category,
              location: s.location,
            })),
        };
      }

      // 2. Check portfolioStories
      const portStory = siteConfig.portfolioStories?.find(
        (s) =>
          s.slug.toLowerCase() === decodedSlug ||
          slugify(s.slug) === slugify(decodedSlug) ||
          slugify(s.title) === slugify(decodedSlug)
      );
      if (portStory) {
        return {
          slug: portStory.slug,
          title: portStory.title,
          category: portStory.category,
          location: portStory.location,
          coverImage: portStory.coverImage,
          galleryImages: portStory.galleryImages,
          related: portStory.related || [],
        };
      }

      // 3. Check portfolioItems
      const portItem = siteConfig.portfolioItems?.find(
        (p) =>
          p.slug.toLowerCase() === decodedSlug ||
          slugify(p.slug) === slugify(decodedSlug) ||
          slugify(p.title) === slugify(decodedSlug)
      );
      if (portItem) {
        return {
          slug: portItem.slug,
          title: portItem.title,
          category: portItem.category || "Wedding Photography",
          location: portItem.country || "Sri Lanka",
          coverImage: portItem.image,
          galleryImages: [portItem.image],
          related: siteConfig.portfolioItems
            ?.filter((p) => p.slug !== portItem.slug)
            .slice(0, 2)
            .map((p) => ({
              title: p.title,
              slug: p.slug,
              image: p.image,
              category: p.category,
              location: p.country,
            })) || [],
        };
      }

      return null;
    })();

  useScrollAnimations([story?.slug]);

  if (!story) {
    notFound();
  }

  const galleryList = story.galleryImages || [];
  const relatedList =
    story.related && story.related.length > 0
      ? story.related
      : (siteConfig.portfolioStories || [])
        .filter((s) => s.slug !== story.slug)
        .slice(0, 2)
        .map((s) => ({
          title: s.title,
          slug: s.slug,
          image: s.coverImage,
          category: s.category,
          location: s.location,
        }));

  return (
    <div className="page_wrap">
      {/* Embedded CSS for 100% borderless images and seamless Masonry layout */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .image-gallery_list {
              column-count: 3;
              column-gap: 15px;
            }
            @media (max-width: 991px) {
              .image-gallery_list {
                column-count: 2;
              }
            }
            @media (max-width: 479px) {
              .image-gallery_list {
                column-count: 1;
              }
            }
            .image-gallery_images {
              break-inside: avoid !important;
              page-break-inside: avoid !important;
              -webkit-column-break-inside: avoid !important;
              display: inline-block !important;
              width: 100% !important;
              margin-bottom: 15px !important;
            }
            .image-gallery_box,
            .image-gallery_box:focus,
            .image-gallery_box:hover,
            .image-gallery_box:active {
              border: none !important;
              outline: none !important;
              box-shadow: none !important;
              text-decoration: none !important;
              background: transparent !important;
            }
            .image-gallery_item {
              border: none !important;
              outline: none !important;
              box-shadow: none !important;
              border-radius: 0 !important;
              margin: 0 !important;
              display: block !important;
            }
            .image-gallery_item,
            .single-portfolio_cover-image,
            .portfolio_image {
              border: none !important;
              outline: none !important;
              box-shadow: none !important;
            }
          `,
        }}
      />

      <main id="main" className="page_main">
        {/* Story Header Section */}
        <header data-theme="dark" className="section_single-portfolio-heading">
          <div className="u-container">
            <div className="single-portfolio-heading_component">
              {/* Cover Image (Top Image from Spotlight / Story) */}
              <div className="single-portfolio_cover-image-wrap">
                <img
                  src={story.coverImage}
                  loading="lazy"
                  alt={story.title}
                  className="single-portfolio_cover-image"
                  style={{ border: "none", outline: "none", boxShadow: "none" }}
                />
                <div className="single-portfolio_cover-image-overlay"></div>
              </div>

              {/* Title & Category Box */}
              <div className="single-portfolio_title-wrap u-vflex-center-center">
                <h1 className="u-text-h1">{story.title}</h1>
                <div className="portfolio-category_cms w-dyn-list">
                  <div role="list" className="portfolio-category_list w-dyn-items">
                    <div role="listitem" className="portfolio-category_item w-dyn-item">
                      <div className="portfolio-category_item-box">
                        <p className="portfolio-category_item-text">
                          {story.category}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Gallery Grid (CSS Masonry Layout) */}
            <div className="image-gallery_collection u-mt-large w-dyn-list">
              <div role="list" className="image-gallery_list w-dyn-items">
                {galleryList.map((imgUrl, idx) => (
                  <div
                    key={idx}
                    role="listitem"
                    className="image-gallery_images w-dyn-item w-dyn-repeater-item"
                    style={{
                      breakInside: "avoid",
                      pageBreakInside: "avoid",
                      display: "inline-block",
                      width: "100%",
                      marginBottom: "15px",
                    }}
                  >
                    <a
                      href="#"
                      className="image-gallery_box w-inline-block w-lightbox group relative w-full text-left overflow-hidden block focus:outline-none"
                      style={{
                        border: "none",
                        outline: "none",
                        boxShadow: "none",
                        background: "transparent",
                        padding: 0,
                        margin: 0,
                        cursor: "pointer",
                        display: "block",
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        setLightboxIndex(idx);
                      }}
                      aria-label={`View photo ${idx + 1} of ${story.title}`}
                    >
                      <img
                        loading="lazy"
                        src={imgUrl}
                        alt={`${story.title} - photo ${idx + 1}`}
                        className="image-gallery_item transition-transform duration-500 group-hover:scale-105"
                        style={{
                          border: "none",
                          outline: "none",
                          boxShadow: "none",
                          display: "block",
                          width: "100%",
                          height: "auto",
                        }}
                      />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Stories You May Like (Related Stories Section) */}
        {relatedList.length > 0 && (
          <section data-theme="dark" className="section_related-portfolio">
            <div className="u-container">
              <div className="tours_list_component">
                <div className="u-text-align-center u-mb-large">
                  <h2 className="u-text-h2 u-mb-main">Stories you may like</h2>
                  <p className="u-text-main">
                    Let us take you through some of our exclusive pieces of work.
                  </p>
                </div>
                <div className="tours_list_content">
                  <div className="portfolio_list-wrapper w-dyn-list">
                    <div role="list" className="portfolio_list w-dyn-items">
                      {relatedList.map((rel, rIdx) => (
                        <div
                          key={rIdx}
                          role="listitem"
                          className="portfolio_item w-dyn-item"
                        >
                          <div className="portfolio_component">
                            <div className="g_clickable_wrap u-cover-absolute u-radius-inherit u-zindex-3">
                              <Link
                                href={`/couple/${rel.slug}`}
                                className="g_clickable_link u-cover-absolute u-radius-inherit u-display-block w-inline-block"
                              >
                                <span className="g_clickable_text u-sr-only">
                                  {rel.title}
                                </span>
                              </Link>
                            </div>
                            <div className="portfolio_image-wrapper">
                              <div className="portfolio_image_inner">
                                <img
                                  alt={rel.title}
                                  src={rel.image}
                                  loading="lazy"
                                  className="portfolio_image"
                                />
                              </div>
                            </div>
                            <div className="portfolio_title-wrapper">
                              <div className="portfolio_item-content">
                                <div className="portfolio-category_wrap w-dyn-list">
                                  <div
                                    role="list"
                                    className="portfolio-category_list w-dyn-items"
                                  >
                                    <div
                                      role="listitem"
                                      className="portfolio-category_tem w-dyn-item"
                                    >
                                      <div className="portfolio-category_item-box">
                                        <div>{rel.category}</div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <h3 className="u-text-h4">{rel.title}</h3>
                              </div>
                              <div
                                className="link-button"
                                style={{ backgroundColor: "rgba(255,255,255,0)" }}
                              >
                                <div className="link-button-wrap">
                                  <div className="link-button-icon w-embed">
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
                                        d="M13 19V7.83l4.88 4.88c.39.39 1.03.39 1.42 0a.996.996 0 0 0 0-1.41l-6.59-6.59a.996.996 0 0 0-1.41 0l-6.6 6.58a.996.996 0 1 0 1.41 1.41L11 7.83V19c0 .55.45 1 1 1s1-.45 1-1"
                                      ></path>
                                    </svg>
                                  </div>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="100%"
                                    viewBox="0 0 20 16"
                                    fill="none"
                                    aria-hidden="true"
                                  >
                                    <path
                                      d="M0.90332 8.04297L19.0446 8.04297"
                                      stroke="currentColor"
                                      strokeWidth="var(--svg-stroke-width--main)"
                                      strokeMiterlimit="10"
                                      vectorEffect="non-scaling-stroke"
                                    ></path>
                                    <path
                                      d="M11.0708 0.710938C11.0708 4.81094 14.6368 8.12807 19.0445 8.12807"
                                      stroke="currentColor"
                                      strokeWidth="var(--svg-stroke-width--main)"
                                      strokeMiterlimit="10"
                                      vectorEffect="non-scaling-stroke"
                                    ></path>
                                    <path
                                      d="M19.0967 8.29297C14.6891 8.29297 11.123 11.6101 11.123 15.7101"
                                      stroke="currentColor"
                                      strokeWidth="var(--svg-stroke-width--main)"
                                      strokeMiterlimit="10"
                                      vectorEffect="non-scaling-stroke"
                                    ></path>
                                  </svg>
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
            </div>
          </section>
        )}

        {/* Global CTA Section */}
        <PageCta />
      </main>

      {/* Lightbox for Gallery */}
      <LightboxModal
        images={galleryList}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />
    </div>
  );
}
