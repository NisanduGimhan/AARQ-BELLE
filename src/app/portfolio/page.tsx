"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import PageCta from "@/components/PageCta";
import { siteConfig } from "@/config/siteConfig";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";

interface PortfolioItemType {
  title: string;
  slug: string;
  image: string;
  category: string;
  country?: string;
  flag?: string;
}

interface CinematographyItemType {
  title: string;
  category: string;
  image: string;
  videoUrl: string;
}

export default function PortfolioPage() {
  const [activeMainTab, setActiveMainTab] = useState<"photography" | "cinematography">("photography");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);
  const [selectedVideo, setSelectedVideo] = useState<CinematographyItemType | null>(null);

  const portfolioItems: PortfolioItemType[] = useMemo(() => {
    if (siteConfig.portfolioItems && siteConfig.portfolioItems.length > 0) {
      return siteConfig.portfolioItems;
    }
    if (siteConfig.spotlight && siteConfig.spotlight.length > 0) {
      return siteConfig.spotlight.map((s) => ({
        title: s.name,
        slug: s.slug || s.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        image: s.image,
        category: s.category || "Wedding Photography",
        country: "Sri Lanka",
        flag: "/images/flags/685d8ccb9d035d251d07b58e_Sri%20Lanka%20Flag.png",
      }));
    }
    return [];
  }, []);

  const cinematographyItems: CinematographyItemType[] = useMemo(() => {
    return siteConfig.cinematographyItems || [];
  }, []);

  // Compute available categories with their counts
  const availableCategories = useMemo(() => {
    const map: Record<string, number> = {};
    portfolioItems.forEach((item) => {
      if (item.category) {
        map[item.category] = (map[item.category] || 0) + 1;
      }
    });
    return Object.entries(map).map(([name, count]) => ({ name, count }));
  }, [portfolioItems]);

  // Compute available locations with flags
  const availableLocations = useMemo(() => {
    const locMap = new Map<string, string>();
    portfolioItems.forEach((item) => {
      if (item.country) {
        if (!locMap.has(item.country)) {
          locMap.set(item.country, item.flag || "/images/flags/685d8ccb9d035d251d07b58e_Sri%20Lanka%20Flag.png");
        }
      }
    });
    return Array.from(locMap.entries())
      .map(([name, flag]) => ({ name, flag }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [portfolioItems]);

  // Filter items based on search, category checkboxes, location checkboxes
  const filteredItems = useMemo(() => {
    return portfolioItems.filter((item) => {
      // 1. Keyword search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesCategory = item.category?.toLowerCase().includes(q);
        const matchesCountry = item.country?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesCategory && !matchesCountry) {
          return false;
        }
      }

      // 2. Category filter
      if (selectedCategories.length > 0) {
        if (!item.category || !selectedCategories.includes(item.category)) {
          return false;
        }
      }

      // 3. Location filter
      if (selectedLocations.length > 0) {
        if (!item.country || !selectedLocations.includes(item.country)) {
          return false;
        }
      }

      return true;
    });
  }, [portfolioItems, searchQuery, selectedCategories, selectedLocations]);

  // Toggle category
  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  // Toggle location
  const toggleLocation = (loc: string) => {
    setSelectedLocations((prev) =>
      prev.includes(loc) ? prev.filter((l) => l !== loc) : [...prev, loc]
    );
  };

  // Clear all filters
  const handleClearAll = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedLocations([]);
  };

  const hasActiveFilters =
    searchQuery.trim().length > 0 ||
    selectedCategories.length > 0 ||
    selectedLocations.length > 0;

  // Close video modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedVideo(null);
      }
    };
    if (selectedVideo) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedVideo]);

  // Convert YouTube url to embed url
  const getEmbedUrl = (url: string) => {
    if (!url) return "";
    let videoId = "";
    if (url.includes("v=")) {
      videoId = url.split("v=")[1]?.split("&")[0];
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0];
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0` : url;
  };

  useScrollAnimations([filteredItems, activeMainTab]);

  return (
    <div className="page_wrap">
      {/* Embedded page styles to guarantee exact layout and responsiveness */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .section_main-portfolio .u-container {
              max-width: 100% !important;
              width: 100% !important;
              padding-left: clamp(1rem, 2.5vw, 2.5rem) !important;
              padding-right: clamp(1rem, 2.5vw, 2.5rem) !important;
            }
            .section_main-portfolio .main-portfolio_component,
            .section_main-portfolio .portfolio_tabs,
            .section_main-portfolio .portfolio_tab-pane,
            .section_main-portfolio .main-portfolio_feed,
            .section_main-portfolio .main-portfolio_cms,
            .section_main-portfolio .portfolio_list-wrapper {
              width: 100% !important;
              min-width: 0;
              align-items: stretch !important;
            }
            .main-portfolio_layout {
              width: 100%;
              grid-column-gap: 2.5rem;
              grid-row-gap: 2.5rem;
              grid-template-rows: auto;
              grid-template-columns: 17rem 1fr;
              grid-auto-columns: 1fr;
              align-items: start;
              display: grid;
            }
            .main-portfolio_filters-wrapper {
              width: 17rem;
              max-width: 17rem;
              position: sticky;
              top: 6rem;
            }
            .section_main-portfolio .portfolio_list {
              width: 100%;
              grid-template-columns: 1fr 1fr;
              grid-column-gap: 2rem;
              grid-row-gap: 3rem;
            }
            @media (max-width: 767px) {
              .section_main-portfolio .portfolio_list {
                grid-template-columns: 1fr;
              }
            }
            @media (max-width: 991px) {
              .main-portfolio_layout {
                grid-template-columns: 1fr;
                grid-row-gap: 1.5rem;
              }
              .main-portfolio_filters-wrapper {
                position: static !important;
                inset: auto !important;
                transform: none !important;
                width: 100% !important;
                max-width: 100% !important;
                height: auto !important;
                overflow: visible !important;
                display: ${showMobileFilters ? "block" : "none"} !important;
                margin-bottom: 1.5rem;
                padding: 1.25rem !important;
                border: 1px solid rgba(255, 255, 255, 0.12);
                border-radius: 0.75rem;
                background-color: #111514 !important;
              }
              .main-portfolio_scroll-wrapper {
                height: auto !important;
                max-height: none !important;
                padding-bottom: 0 !important;
                padding-right: 0 !important;
                overflow: visible !important;
              }
              .main-portfolio_tablet-filters-button {
                display: inline-flex !important;
                align-items: center;
                gap: 0.5rem;
                padding: 0.7rem 1.25rem !important;
                margin-bottom: 1.25rem;
                cursor: pointer;
                background-color: rgba(255, 255, 255, 0.06);
                border: 1px solid rgba(255, 255, 255, 0.18);
                border-radius: 0.5rem;
                color: #fff;
                font-size: 0.95rem;
              }
            }
            .filters_form-checkbox.is-active,
            .filters_checkbox_flag.is-active {
              background-color: rgba(255, 255, 255, 0.12);
              border-color: rgba(255, 255, 255, 0.4);
            }
            .filters_form-checkbox-icon.w--redirected-checked {
              background-color: #ffffff !important;
              background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='black'%3E%3Cpath d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z'/%3E%3C/svg%3E") !important;
              background-size: 10px !important;
              background-repeat: no-repeat !important;
              background-position: center !important;
              border-color: #ffffff !important;
            }
            .filters_form-checkbox_flag-icon.w--redirected-checked {
              background-color: rgba(255, 255, 255, 0.15) !important;
              border-color: #ffffff !important;
            }
            .cinematography_component:hover .play-btn {
              transform: scale(1.1);
              background-color: rgba(255, 255, 255, 0.9);
              color: #000;
            }
            .cinematography_component:hover .cinematography_thumb {
              transform: scale(1.05);
            }
          `,
        }}
      />

      <main id="main" className="page_main">
        {/* Page Header */}
        <header data-theme="dark" className="section_page-header u-vflex-center-bottom">
          <div className="is-page-headinng_text-wrap">
            <div data-padding-bottom="none" data-padding-top="none" className="u-container">
              <h1 className="u-text-h1 u-mb-main">Portfolio</h1>
              <div className="max-width-large">
                <p className="u-text-main">
                  We have had the blessing of photographing charming couples over the years.
                </p>
              </div>
            </div>
          </div>
          <div className="page-header_background-image-wrapper u-container">
            <div className="page-overlay-layer"></div>
            <div className="page-header-overlay_left"></div>
            <div className="page-header-overlay_right"></div>
            <img
              src="/images/portfolio-bg1.jpg"
              loading="eager"
              alt="Portfolio Header Background"
              className="page-header_background-image"
            />
          </div>
        </header>

        {/* Main Portfolio Section */}
        <section data-theme="dark" className="section_main-portfolio">
          <div data-padding-top="small" className="u-container">
            <div className="main-portfolio_component">
              {/* Top Tab Menu: Photography vs Cinematography (rendered only when cinematography items exist) */}
              <div className="portfolio_tabs w-tabs">
                {cinematographyItems.length > 0 && (
                  <div className="category-filter-menu is-center no-scrollbar w-tab-menu">
                    <button
                      type="button"
                      onClick={() => setActiveMainTab("photography")}
                      className={`category-filter-link w-inline-block w-tab-link ${
                        activeMainTab === "photography" ? "w--current" : ""
                      }`}
                    >
                      <div>Photography</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveMainTab("cinematography")}
                      className={`category-filter-link w-inline-block w-tab-link ${
                        activeMainTab === "cinematography" ? "w--current" : ""
                      }`}
                    >
                      <div>Cinematography</div>
                    </button>
                  </div>
                )}

                {/* Tab 1: Photography */}
                {activeMainTab === "photography" && (
                  <div className="portfolio_tab-pane w-tab-pane w--tab-active">
                    {/* Tablet / Mobile Filter Toggle Button */}
                    <button
                      type="button"
                      onClick={() => setShowMobileFilters(!showMobileFilters)}
                      className="main-portfolio_tablet-filters-button w-inline-block"
                      aria-label="Toggle Filters"
                    >
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
                            d="M10 18h4v-2h-4zM3 6v2h18V6zm3 7h12v-2H6z"
                          ></path>
                        </svg>
                      </div>
                      <div>
                        {showMobileFilters ? "Hide Filters" : "Filters"}
                        {hasActiveFilters && (
                          <span style={{ marginLeft: "6px", fontWeight: "bold" }}>
                            ({selectedCategories.length + selectedLocations.length + (searchQuery ? 1 : 0)})
                          </span>
                        )}
                      </div>
                    </button>

                    <div className="main-portfolio_layout">
                      {/* Left Column: Filter Sidebar */}
                      <aside className="main-portfolio_filters-wrapper">
                        <div className="main-portfolio_form-block w-form">
                          <div className="main-portfolio_form">
                            {/* Form Header: Title & Clear All */}
                            <div className="main-portfolio_form-header">
                              <div className="filters2_heading">Filters</div>
                              {hasActiveFilters && (
                                <button
                                  type="button"
                                  onClick={handleClearAll}
                                  className="button is-link w-inline-block"
                                  style={{
                                    background: "none",
                                    border: "none",
                                    padding: 0,
                                    cursor: "pointer",
                                    textDecoration: "underline",
                                    color: "var(--swatch--brand, #c5a059)",
                                  }}
                                >
                                  <div>Clear all</div>
                                </button>
                              )}
                            </div>

                            {/* Results Count */}
                            <div className="main-portfolio_results-wrapper">
                              <div className="main-portfolio_results-text">
                                Showing <span>{filteredItems.length}</span> of{" "}
                                <span>{portfolioItems.length}</span>
                              </div>
                            </div>

                            {/* Scrollable Filter Groups */}
                            <div className="main-portfolio_scroll-wrapper">
                              <div className="main-portfolio_filter-group-list">
                                {/* Group 1: Search Keyword */}
                                <div className="main-portfolio_filter-group">
                                  <div className="main-portfolio_filter-group-heading">
                                    <div>Search</div>
                                    {searchQuery && (
                                      <button
                                        type="button"
                                        onClick={() => setSearchQuery("")}
                                        className="button is-link w-inline-block"
                                        style={{
                                          background: "none",
                                          border: "none",
                                          padding: 0,
                                          cursor: "pointer",
                                          textDecoration: "underline",
                                          color: "#888",
                                        }}
                                      >
                                        <div>Clear</div>
                                      </button>
                                    )}
                                  </div>
                                  <div className="main-portfolio_filter-options">
                                    <div className="main-portfolio_list-wrapper">
                                      <div className="filters_category-list-item">
                                        <div className="filters_item">
                                          <div className="filters2_keyword-search">
                                            <input
                                              type="text"
                                              value={searchQuery}
                                              onChange={(e) => setSearchQuery(e.target.value)}
                                              placeholder="Keyword"
                                              className="form_input is-icon-left w-input"
                                              style={{
                                                backgroundColor: "#111514",
                                                borderColor: "#333",
                                                color: "#fff",
                                              }}
                                            />
                                            <div className="form_icon-wrapper">
                                              <div className="icon-embed-xsmall-2 w-embed">
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  width="100%"
                                                  height="100%"
                                                  viewBox="0 0 24 24"
                                                  fill="none"
                                                  aria-hidden="true"
                                                  role="img"
                                                >
                                                  <path
                                                    d="M10 18C11.775 17.9996 13.4988 17.4054 14.897 16.312L19.293 20.708L20.707 19.294L16.311 14.898C17.405 13.4997 17.9996 11.7754 18 10C18 5.589 14.411 2 10 2C5.589 2 2 5.589 2 10C2 14.411 5.589 18 10 18ZM10 4C13.309 4 16 6.691 16 10C16 13.309 13.309 16 10 16C6.691 16 4 13.309 4 10C4 6.691 6.691 4 10 4Z"
                                                    fill="currentColor"
                                                  />
                                                </svg>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Group 2: Category Filter */}
                                <div className="main-portfolio_filter-group">
                                  <div className="main-portfolio_filter-group-heading">
                                    <div>Category</div>
                                    {selectedCategories.length > 0 && (
                                      <button
                                        type="button"
                                        onClick={() => setSelectedCategories([])}
                                        className="button is-link w-inline-block"
                                        style={{
                                          background: "none",
                                          border: "none",
                                          padding: 0,
                                          cursor: "pointer",
                                          textDecoration: "underline",
                                          color: "#888",
                                        }}
                                      >
                                        <div>Clear</div>
                                      </button>
                                    )}
                                  </div>
                                  <div className="main-portfolio_filter-options">
                                    <div className="main-portfolio_list-wrapper w-dyn-list">
                                      <div role="list" className="main-portfolio_list-wrapper w-dyn-items">
                                        {availableCategories.map((cat) => {
                                          const isSelected = selectedCategories.includes(cat.name);
                                          return (
                                            <div
                                              key={cat.name}
                                              role="listitem"
                                              className="filters_category-list-item w-dyn-item"
                                            >
                                              <label
                                                onClick={() => toggleCategory(cat.name)}
                                                className={`w-checkbox filters_form-checkbox cursor-pointer ${isSelected ? "is-active" : ""
                                                  }`}
                                              >
                                                <div
                                                  className={`w-checkbox-input w-checkbox-input--inputType-custom filters_form-checkbox-icon ${isSelected ? "w--redirected-checked" : ""
                                                    }`}
                                                ></div>
                                                <span className="filters_form-checkbox-label w-form-label">
                                                  {cat.name}
                                                </span>
                                                <div className="count-tag">{cat.count}</div>
                                              </label>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </aside>

                      {/* Right Column: Feed & Cards Grid */}
                      <div className="main-portfolio_feed">
                        {/* Feed Header: Active Filter Tag Pills */}
                        {hasActiveFilters && (
                          <div className="main-portfolio_feed-header">
                            <div className="main-portfolio_tags-wrapper">
                              {/* Search Query Pill */}
                              {searchQuery && (
                                <div className="main-portfolio_tag">
                                  <div>Search</div>
                                  <div className="tag-opertator">:</div>
                                  <div className="tag-value">{searchQuery}</div>
                                  <div
                                    onClick={() => setSearchQuery("")}
                                    className="filters_close-icon w-embed"
                                    title="Remove search filter"
                                  >
                                    <svg
                                      width="100%"
                                      height="100%"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M17.1266 16.773L16.7729 17.1266C16.5777 17.3218 16.2611 17.3218 16.0658 17.1266L12 13.0607L7.9341 17.1265C7.73888 17.3218 7.42229 17.3218 7.22702 17.1265L6.87347 16.773C6.6782 16.5777 6.6782 16.2612 6.87347 16.0659L10.9394 12L6.87347 7.93413C6.6782 7.73891 6.6782 7.42232 6.87347 7.22705L7.22702 6.8735C7.42228 6.67824 7.73888 6.67824 7.9341 6.8735L12 10.9394L16.0658 6.8735C16.2611 6.67824 16.5777 6.67824 16.7729 6.8735L17.1266 7.22705C17.3218 7.42231 17.3218 7.73891 17.1266 7.93413L13.0607 12L17.1266 16.0659C17.3218 16.2612 17.3218 16.5777 17.1266 16.773Z"
                                        fill="currentColor"
                                      />
                                    </svg>
                                  </div>
                                </div>
                              )}

                              {/* Category Pills */}
                              {selectedCategories.map((cat) => (
                                <div key={cat} className="main-portfolio_tag">
                                  <div>Category</div>
                                  <div className="tag-opertator">:</div>
                                  <div className="tag-value">{cat}</div>
                                  <div
                                    onClick={() => toggleCategory(cat)}
                                    className="filters_close-icon w-embed"
                                    title={`Remove ${cat} filter`}
                                  >
                                    <svg
                                      width="100%"
                                      height="100%"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M17.1266 16.773L16.7729 17.1266C16.5777 17.3218 16.2611 17.3218 16.0658 17.1266L12 13.0607L7.9341 17.1265C7.73888 17.3218 7.42229 17.3218 7.22702 17.1265L6.87347 16.773C6.6782 16.5777 6.6782 16.2612 6.87347 16.0659L10.9394 12L6.87347 7.93413C6.6782 7.73891 6.6782 7.42232 6.87347 7.22705L7.22702 6.8735C7.42228 6.67824 7.73888 6.67824 7.9341 6.8735L12 10.9394L16.0658 6.8735C16.2611 6.67824 16.5777 6.67824 16.7729 6.8735L17.1266 7.22705C17.3218 7.42231 17.3218 7.73891 17.1266 7.93413L13.0607 12L17.1266 16.0659C17.3218 16.2612 17.3218 16.5777 17.1266 16.773Z"
                                        fill="currentColor"
                                      />
                                    </svg>
                                  </div>
                                </div>
                              ))}

                              {/* Location Pills */}
                              {selectedLocations.map((loc) => (
                                <div key={loc} className="main-portfolio_tag">
                                  <div>Location</div>
                                  <div className="tag-opertator">:</div>
                                  <div className="tag-value">{loc}</div>
                                  <div
                                    onClick={() => toggleLocation(loc)}
                                    className="filters_close-icon w-embed"
                                    title={`Remove ${loc} filter`}
                                  >
                                    <svg
                                      width="100%"
                                      height="100%"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M17.1266 16.773L16.7729 17.1266C16.5777 17.3218 16.2611 17.3218 16.0658 17.1266L12 13.0607L7.9341 17.1265C7.73888 17.3218 7.42229 17.3218 7.22702 17.1265L6.87347 16.773C6.6782 16.5777 6.6782 16.2612 6.87347 16.0659L10.9394 12L6.87347 7.93413C6.6782 7.73891 6.6782 7.42232 6.87347 7.22705L7.22702 6.8735C7.42228 6.67824 7.73888 6.67824 7.9341 6.8735L12 10.9394L16.0658 6.8735C16.2611 6.67824 16.5777 6.67824 16.7729 6.8735L17.1266 7.22705C17.3218 7.42231 17.3218 7.73891 17.1266 7.93413L13.0607 12L17.1266 16.0659C17.3218 16.2612 17.3218 16.5777 17.1266 16.773Z"
                                        fill="currentColor"
                                      />
                                    </svg>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Cards Grid or Empty State */}
                        <div className="main-portfolio_cms">
                          <div className="portfolio_list-wrapper w-dyn-list">
                            {filteredItems.length === 0 ? (
                              <div className="main-portfolio_empty">
                                <h3 className="u-text-h4 u-mb-small">No items found</h3>
                                <p className="u-text-main u-mb-main">
                                  There are no stories matching your selected criteria.
                                </p>
                                <button
                                  type="button"
                                  onClick={handleClearAll}
                                  className="button is-link"
                                  style={{
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    textDecoration: "underline",
                                    color: "var(--swatch--brand, #c5a059)",
                                  }}
                                >
                                  Clear all filters
                                </button>
                              </div>
                            ) : (
                              <div role="list" className="portfolio_list w-dyn-items">
                                {filteredItems.map((item, idx) => (
                                  <div
                                    key={idx}
                                    role="listitem"
                                    className="portfolio_item w-dyn-item"
                                  >
                                    <div className="portfolio_component">
                                      {/* Full card clickable link */}
                                      <div className="g_clickable_wrap u-cover-absolute u-radius-inherit u-zindex-3">
                                        <Link
                                          href={`/couple/${item.slug}`}
                                          className="g_clickable_link u-cover-absolute u-radius-inherit u-display-block w-inline-block"
                                        >
                                          <span className="g_clickable_text u-sr-only">
                                            {item.title}
                                          </span>
                                        </Link>
                                      </div>

                                      {/* Image with zoom effect */}
                                      <div className="portfolio_image-wrapper">
                                        <div className="portfolio_image_inner">
                                          <img
                                            src={item.image}
                                            alt={item.title}
                                            loading="lazy"
                                            className="portfolio_image"
                                          />
                                        </div>
                                      </div>

                                      {/* Card Title & Category */}
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
                                                  <div>{item.category}</div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <h3 className="u-text-h4">{item.title}</h3>
                                        </div>

                                        {/* Animated Hover Arrow */}
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
                                                d="M11.0708 15.375C11.0708 11.275 14.6368 7.95787 19.0445 7.95787"
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
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 2: Cinematography */}
                {activeMainTab === "cinematography" && (
                  <div className="portfolio_tab-pane w-tab-pane w--tab-active">
                    <div className="main-portfolio_cms">
                      <div className="cinematography_cms-wrapper w-dyn-list">
                        <div role="list" className="cinematography_list w-dyn-items">
                          {cinematographyItems.map((video, vIdx) => (
                            <div
                              key={vIdx}
                              role="listitem"
                              className="cinematography_item w-dyn-item"
                            >
                              <div className="cinematography_component">
                                <div className="cinematography_contain">
                                  <a
                                    href="#"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setSelectedVideo(video);
                                    }}
                                    className="cinematography_light-box w-inline-block w-lightbox"
                                    style={{
                                      display: "block",
                                      width: "100%",
                                      height: "100%",
                                      cursor: "pointer",
                                    }}
                                  >
                                    {/* Play Button Overlay */}
                                    <div className="play-btn_contain">
                                      <div className="play-btn">
                                        <div className="play-icon_wrap">
                                          <div className="play-icon_mask">
                                            <div className="play-icon w-embed">
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                aria-hidden="true"
                                                role="img"
                                                className="iconify iconify--iconoir"
                                                width="100%"
                                                height="100%"
                                                preserveAspectRatio="xMidYMid meet"
                                                viewBox="0 0 24 24"
                                              >
                                                <path
                                                  fill="none"
                                                  stroke="currentColor"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  strokeWidth="1.5"
                                                  d="M6.906 4.537A.6.6 0 0 0 6 5.053v13.894a.6.6 0 0 0 .906.516l11.723-6.947a.6.6 0 0 0 0-1.032z"
                                                ></path>
                                              </svg>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Video Thumbnail */}
                                    <img
                                      src={video.image}
                                      alt={video.title}
                                      loading="lazy"
                                      className="cinematography_thumb"
                                      style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        transition: "transform 0.5s ease",
                                      }}
                                    />

                                    {/* Video Title & Category */}
                                    <div className="cinematography_title-wrapper">
                                      <div className="cinematography_item-content">
                                        <div className="cinematograpy_category-text">
                                          {video.category}
                                        </div>
                                        <h3 className="u-text-h4">{video.title}</h3>
                                      </div>
                                    </div>
                                  </a>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Global CTA Section */}
        <PageCta />
      </main>

      {/* Video Lightbox Modal */}
      {selectedVideo && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedVideo(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
          }}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setSelectedVideo(null)}
            aria-label="Close video"
            style={{
              position: "absolute",
              top: "1.5rem",
              right: "1.5rem",
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "50%",
              width: "44px",
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              cursor: "pointer",
              zIndex: 10,
              transition: "all 0.2s",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Video Container (16:9) */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "1000px",
              aspectRatio: "16 / 9",
              backgroundColor: "#000",
              borderRadius: "0.75rem",
              overflow: "hidden",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8)",
            }}
          >
            <iframe
              src={getEmbedUrl(selectedVideo.videoUrl)}
              title={selectedVideo.title}
              width="100%"
              height="100%"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ width: "100%", height: "100%", border: "none" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
