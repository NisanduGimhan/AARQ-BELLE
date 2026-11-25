
window.Webflow = window.Webflow || [];
if (typeof window.Webflow.env !== 'function') {
  window.Webflow.env = function () { return undefined; };
}
gsap.registerPlugin(ScrollTrigger, SplitText);

// LENIS SMOOTH SCROLL
let lenis;
if (Webflow.env("editor") === undefined) {
  lenis = new Lenis({
    lerp: 0.1,
    wheelMultiplier: 0.7,
    gestureOrientation: "vertical",
    normalizeWheel: false,
    smoothTouch: false
  });
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}
$("[data-lenis-start]").on("click", function () {
  lenis.start();
});
$("[data-lenis-stop]").on("click", function () {
  lenis.stop();
});
$("[data-lenis-toggle]").on("click", function () {
  $(this).toggleClass("stop-scroll");
  if ($(this).hasClass("stop-scroll")) {
    lenis.stop();
  } else {
    lenis.start();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // 1. SplitText Animation (Global)
  setTimeout(() => {
    const elements = document.querySelectorAll("[js-line-animation]");

    elements.forEach((textEl) => {
      const textContent = textEl.textContent;
      let tl;

      gsap.set(textEl, { autoAlpha: 1 });

      function createSplitTextAnimation() {
        const splitText = new SplitText(textEl, {
          type: "lines",
          linesClass: "line"
        });

        splitText.lines.forEach(line => {
          const lineContent = line.innerHTML;
          line.innerHTML = `<span class="line-inner" style="display: block;">${lineContent}</span>`;
        });

        tl = gsap.timeline({
          scrollTrigger: {
            trigger: textEl,
            start: "top bottom",
            end: "bottom bottom",
            toggleActions: "none play none reset"
          }
        });

        tl.fromTo(
          textEl.querySelectorAll(".line-inner"),
          { yPercent: 115 },
          {
            yPercent: 0,
            duration: 0.6,
            stagger: { amount: 0.4, ease: "power1.out" }
          }
        );
      }

      createSplitTextAnimation();

      let windowWidth = window.innerWidth;
      window.addEventListener("resize", () => {
        if (windowWidth !== window.innerWidth) {
          windowWidth = window.innerWidth;
          if (tl) tl.kill();
          textEl.textContent = textContent;
          createSplitTextAnimation();
        }
      });
    });
  }, 700);

  // 2. Nav Menu Animation (Global)
  const navLinks = document.querySelectorAll('.fs-menu-link, .fs-navbar_wrap');
  const fsNavbarMenuButton = document.querySelector('.fs-navbar_menu-button');

  window.isMenuOpen = window.isMenuOpen || false;

  if (navLinks.length && fsNavbarMenuButton) {
    gsap.set(navLinks, { opacity: 0.5, y: 100 });

    function animateNavLinks() {
      if (!window.isMenuOpen) {
        gsap.to(navLinks, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.02,
          ease: 'power2.out',
          delay: 0.4
        });
        window.isMenuOpen = true;
      } else {
        gsap.to(navLinks, {
          opacity: 0.5,
          y: 100,
          duration: 0.4,
          stagger: 0.02,
          ease: 'power2.out',
          onComplete: () => {
            window.isMenuOpen = false;
          }
        });
      }
    }

    fsNavbarMenuButton.addEventListener('click', animateNavLinks);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Dynamic update current year
  const currentYear = new Date().getFullYear();
  const currentYearElements = document.querySelectorAll('[data-current-year]');
  currentYearElements.forEach(currentYearElement => {
    currentYearElement.textContent = currentYear;
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // Set initial state
  gsap.set('.portfolio_item, .inputs_item-link', {
    opacity: 0,
    y: 30
  });

  // Set initial scale for portfolio images
  gsap.set('.portfolio_image_inner', {
    scale: 1.1
  });

  // Target all items
  const items = document.querySelectorAll('.portfolio_item, .inputs_item-link');

  // Loop through each item and create ScrollTrigger
  items.forEach((item, index) => {
    ScrollTrigger.create({
      trigger: item,
      start: 'top 85%', // Trigger earlier on mobile
      onEnter: () => {
        item.classList.add('is-visible');

        // Animate item in
        gsap.to(item, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.1
        });

        // Animate image scale if exists
        const imageInner = item.querySelector('.portfolio_image_inner');
        if (imageInner) {
          gsap.to(imageInner, {
            scale: 1,
            duration: 3,
            ease: 'power2.out',
            delay: index * 0.1
          });
        }
      },
      once: true
      // markers: true // Uncomment for debugging
    });
  });
});

// 4. Global Home & Logo Navigation Handler
document.addEventListener("click", function (e) {
  const link = e.target.closest("a");
  if (!link) return;

  const href = link.getAttribute("href");
  const isHomeLink =
    href === "/" ||
    href === "" ||
    link.classList.contains("navbar_logo-link") ||
    link.classList.contains("footer_logo-link");
  const linkText = (link.textContent || "").trim().toLowerCase();

  if (
    isHomeLink &&
    (linkText === "home" ||
      link.classList.contains("navbar_logo-link") ||
      link.classList.contains("footer_logo-link") ||
      link.classList.contains("fs-menu-link") ||
      link.classList.contains("nav-link_item"))
  ) {
    const isAlreadyOnHomePage =
      window.location.pathname === "/" ||
      window.location.pathname === "" ||
      window.location.pathname.endsWith("/index.html");

    if (isAlreadyOnHomePage) {
      // If already on the homepage, scroll smoothly to top
      e.preventDefault();

      // If mobile drawer is open, close it
      const menuButton = document.querySelector(".fs-navbar_menu-button");
      const menu = document.querySelector(".fs-navbar_menu");
      if (
        window.isMenuOpen ||
        (menu &&
          (menu.classList.contains("w--open") ||
            window.getComputedStyle(menu).display !== "none"))
      ) {
        if (menuButton) {
          menuButton.click();
        }
      }

      if (typeof lenis !== "undefined" && lenis && typeof lenis.scrollTo === "function") {
        lenis.scrollTo(0, { immediate: false, duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      // If navigating to home from another page, ensure top position on arrival
      try {
        sessionStorage.setItem("mie_scroll_to_top", "true");
      } catch (err) { }
    }
  }
});

// Scroll to top on arrival if navigating from another page
try {
  if (sessionStorage.getItem("mie_scroll_to_top") === "true") {
    sessionStorage.removeItem("mie_scroll_to_top");
    window.scrollTo(0, 0);
    if (typeof lenis !== "undefined" && lenis && typeof lenis.scrollTo === "function") {
      lenis.scrollTo(0, { immediate: true });
    }
  }
} catch (err) { }

// 5. Preloader Logo Animation & Graceful Dismissal
(function initPreloader() {
  function startLoader() {
    const preloader = document.querySelector(".preloader");
    if (!preloader) return;

    if (window.__preloaderRan) return;
    window.__preloaderRan = true;

    const contentWrapper = preloader.querySelector(".loader_content-wrapper");
    const loaderImg = preloader.querySelector(".loader_image");
    const loaderBg = preloader.querySelector(".loader_background");

    // Ensure preloader is actively displayed
    gsap.set(preloader, { display: "flex", opacity: 1, pointerEvents: "auto" });
    if (contentWrapper) gsap.set(contentWrapper, { opacity: 1 });
    if (loaderBg) gsap.set(loaderBg, { yPercent: 0 });
    if (loaderImg) gsap.set(loaderImg, { yPercent: 100, opacity: 0 });

    const tl = gsap.timeline({
      delay: 0.15,
      onComplete: function () {
        gsap.set(preloader, { display: "none", pointerEvents: "none" });
        try {
          window.dispatchEvent(new Event("preloaderFinished"));
        } catch (err) {}
      }
    });

    // 1. Logo slides up into center view and becomes fully visible
    if (loaderImg) {
      tl.to(loaderImg, {
        yPercent: 0,
        opacity: 1,
        duration: 0.85,
        ease: "power3.out"
      });
    }

    // 2. Elegant pause on the brand logo
    tl.to({}, { duration: 0.5 });

    // 3. Logo softly fades out
    if (contentWrapper) {
      tl.to(contentWrapper, {
        opacity: 0,
        duration: 0.35,
        ease: "power2.in"
      });
    }

    // 4. Dark background curtain slides up smoothly to reveal hero
    if (loaderBg) {
      tl.to(loaderBg, {
        yPercent: -100,
        duration: 0.8,
        ease: "power3.inOut"
      }, "-=0.1");
    }

    // 5. Fade container
    tl.to(preloader, {
      opacity: 0,
      duration: 0.25,
      ease: "power1.out"
    }, "-=0.25");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startLoader);
  } else {
    startLoader();
  }

  // Fallback safety timeout (ensures it never hangs under any condition)
  setTimeout(() => {
    const preloader = document.querySelector(".preloader");
    if (preloader && window.getComputedStyle(preloader).display !== "none") {
      preloader.style.opacity = "0";
      preloader.style.pointerEvents = "none";
      setTimeout(() => {
        preloader.style.display = "none";
      }, 300);
    }
  }, 3500);
})();
