"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gsap?: any;
    ScrollTrigger?: any;
    SplitText?: any;
  }
}

/**
 * Initializes GSAP ScrollTrigger + SplitText animations on React pages
 * matching the homepage & reference Webflow site's smooth scroll reveals.
 */
export function useScrollAnimations(deps: unknown[] = []) {
  useEffect(() => {
    let ctx: any;
    let retryTimer: ReturnType<typeof setTimeout> | null = null;

    const init = () => {
      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;
      const SplitText = window.SplitText;

      if (!gsap || !ScrollTrigger) {
        retryTimer = setTimeout(init, 120);
        return;
      }

      gsap.registerPlugin(ScrollTrigger);
      if (SplitText) {
        gsap.registerPlugin(SplitText);
      }

      ctx = gsap.context(() => {
        // 1. SplitText Line Reveal ([js-line-animation])
        if (SplitText) {
          const lineEls = document.querySelectorAll("[js-line-animation]");
          lineEls.forEach((el) => {
            const htmlEl = el as HTMLElement;
            if (htmlEl.dataset.splitAnimated === "true") return;
            htmlEl.dataset.splitAnimated = "true";

            gsap.set(htmlEl, { autoAlpha: 1 });

            try {
              const split = new SplitText(htmlEl, {
                type: "lines",
                linesClass: "line",
              });

              split.lines.forEach((line: HTMLElement) => {
                const content = line.innerHTML;
                line.style.overflow = "hidden";
                line.innerHTML = `<span class="line-inner" style="display: block;">${content}</span>`;
              });

              const innerLines = htmlEl.querySelectorAll(".line-inner");
              gsap.fromTo(
                innerLines,
                { yPercent: 115 },
                {
                  yPercent: 0,
                  duration: 0.7,
                  stagger: 0.08,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: htmlEl,
                    start: "top 92%",
                    once: true,
                  },
                }
              );
            } catch {
              gsap.fromTo(
                htmlEl,
                { opacity: 0, y: 20 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.65,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: htmlEl,
                    start: "top 92%",
                    once: true,
                  },
                }
              );
            }
          });
        }

        // 2. Portfolio & Cinematography Cards Scroll Reveal + Image Scale Settle
        const cardItems = Array.from(
          document.querySelectorAll(".portfolio_item, .cinematography_item")
        ).filter((el) => (el as HTMLElement).dataset.cardAnimated !== "true");

        if (cardItems.length > 0) {
          gsap.set(cardItems, { opacity: 0, y: 35 });

          cardItems.forEach((card) => {
            const inner = card.querySelector(
              ".portfolio_image_inner, .cinematography_thumb"
            );
            if (inner) {
              gsap.set(inner, { scale: 1.1 });
            }
          });

          ScrollTrigger.batch(cardItems, {
            start: "top 88%",
            once: true,
            onEnter: (batch: Element[]) => {
              batch.forEach((el, i) => {
                (el as HTMLElement).dataset.cardAnimated = "true";
                el.classList.add("is-visible");

                gsap.to(el, {
                  opacity: 1,
                  y: 0,
                  duration: 0.7,
                  delay: i * 0.08,
                  ease: "power3.out",
                  clearProps: "transform",
                });

                const inner = el.querySelector(
                  ".portfolio_image_inner, .cinematography_thumb"
                );
                if (inner) {
                  gsap.to(inner, {
                    scale: 1,
                    duration: 1.6,
                    delay: i * 0.08,
                    ease: "power2.out",
                  });
                }
              });
            },
          });
        }

        // 4. Couple Story Masonry Gallery Scroll Reveal
        const galleryItems = Array.from(
          document.querySelectorAll(".image-gallery_images")
        ).filter((el) => (el as HTMLElement).dataset.galleryAnimated !== "true");

        if (galleryItems.length > 0) {
          gsap.set(galleryItems, { opacity: 0, y: 40 });

          galleryItems.forEach((item) => {
            const img = item.querySelector(".image-gallery_item");
            if (img) {
              gsap.set(img, { scale: 1.07 });
            }
          });

          ScrollTrigger.batch(galleryItems, {
            start: "top 90%",
            once: true,
            onEnter: (batch: Element[]) => {
              batch.forEach((el, i) => {
                (el as HTMLElement).dataset.galleryAnimated = "true";

                gsap.to(el, {
                  opacity: 1,
                  y: 0,
                  duration: 0.75,
                  delay: (i % 3) * 0.08,
                  ease: "power3.out",
                  clearProps: "transform",
                });

                const img = el.querySelector(".image-gallery_item");
                if (img) {
                  gsap.to(img, {
                    scale: 1,
                    duration: 1.3,
                    delay: (i % 3) * 0.08,
                    ease: "power2.out",
                    clearProps: "transform",
                  });
                }
              });
            },
          });
        }

        ScrollTrigger.refresh();
      });
    };

    const startTimer = setTimeout(init, 60);

    return () => {
      clearTimeout(startTimer);
      if (retryTimer) clearTimeout(retryTimer);
      // Do not revert completed reveal animations on filter/tab re-runs so visible cards never flash back to opacity: 0
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
