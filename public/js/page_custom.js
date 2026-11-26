
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

  // 2. Nav menu handler registered globally outside DOMContentLoaded (see section 2B below)
});

// 2B. Homepage Mobile Nav Menu Drawer Controller (Delegated & Immune to DOMContentLoaded/IX2/w-nav timing)
(function initHomeMobileMenu() {
  window.isMenuOpen = false;

  function setHomeMenuOpen(navbar, menu, menuBtn, open) {
    window.isMenuOpen = open;
    const links = menu.querySelectorAll('.fs-menu-link, .fs-navbar_wrap');
    const lineTop = menuBtn.querySelector('.menu-icon_line-top');
    const lineMid = menuBtn.querySelector('.menu-icon_line-middle');
    const lineBot = menuBtn.querySelector('.menu-icon_line-bottom');

    // Ensure menu is not trapped inside Webflow's hidden .w-nav-overlay
    if (menu.parentElement && menu.parentElement.classList.contains('w-nav-overlay')) {
      const wrapper = navbar.querySelector('.navbar_wrapper');
      if (wrapper) wrapper.appendChild(menu);
    }

    if (open) {
      menuBtn.classList.add('w--open');
      menu.classList.add('w--open', 'is-home-open');
      menu.setAttribute('data-nav-menu-open', '');
      menuBtn.setAttribute('aria-expanded', 'true');

      if (typeof lenis !== 'undefined' && lenis && typeof lenis.stop === 'function') {
        lenis.stop();
      }
      document.body.style.overflow = 'hidden';

      if (typeof gsap !== 'undefined') {
        gsap.killTweensOf(menu);
        gsap.set(menu, { display: 'block', yPercent: 0, y: 0 });
        gsap.fromTo(menu, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });

        if (links.length) {
          gsap.killTweensOf(links);
          gsap.fromTo(
            links,
            { opacity: 0, y: 36 },
            { opacity: 1, y: 0, duration: 0.45, stagger: 0.04, ease: 'power2.out', delay: 0.1 }
          );
        }

        if (lineTop) gsap.to(lineTop, { rotate: 45, x: 5, y: 8, width: 24, duration: 0.25 });
        if (lineMid) gsap.to(lineMid, { opacity: 0, duration: 0.15 });
        if (lineBot) gsap.to(lineBot, { rotate: -45, x: 5, y: -8, width: 24, duration: 0.25 });
      } else {
        menu.style.display = 'block';
        menu.style.opacity = '1';
      }
    } else {
      menuBtn.classList.remove('w--open');
      menu.classList.remove('w--open', 'is-home-open');
      menu.removeAttribute('data-nav-menu-open');
      menuBtn.setAttribute('aria-expanded', 'false');

      if (typeof lenis !== 'undefined' && lenis && typeof lenis.start === 'function') {
        lenis.start();
      }
      document.body.style.overflow = '';

      if (typeof gsap !== 'undefined') {
        if (lineTop) gsap.to(lineTop, { rotate: 0, x: 0, y: 0, width: 24, duration: 0.25 });
        if (lineMid) gsap.to(lineMid, { opacity: 1, duration: 0.2 });
        if (lineBot) gsap.to(lineBot, { rotate: 0, x: 0, y: 0, width: 24, duration: 0.25 });

        gsap.killTweensOf(menu);
        gsap.to(menu, {
          opacity: 0,
          duration: 0.25,
          ease: 'power2.in',
          onComplete: () => {
            if (!window.isMenuOpen) {
              menu.style.display = 'none';
            }
          }
        });
      } else {
        menu.style.opacity = '0';
        menu.style.display = 'none';
      }
    }
  }

  document.addEventListener('click', (e) => {
    const target = e.target;
    if (!target || typeof target.closest !== 'function') return;

    const btn = target.closest('.navbar_component:not(.page-navbar) .fs-navbar_menu-button');
    if (btn) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      const navbar = btn.closest('.navbar_component');
      const menu = navbar ? navbar.querySelector('.fs-navbar_menu') : null;
      if (navbar && menu) {
        const currentlyOpen = menu.classList.contains('is-home-open');
        setHomeMenuOpen(navbar, menu, btn, !currentlyOpen);
      }
      return;
    }

    // Close menu when clicking any link inside homepage mobile drawer
    const drawerLink = target.closest('.navbar_component:not(.page-navbar) .fs-navbar_menu a');
    if (drawerLink) {
      const navbar = drawerLink.closest('.navbar_component');
      const menu = navbar ? navbar.querySelector('.fs-navbar_menu') : null;
      const menuBtn = navbar ? navbar.querySelector('.fs-navbar_menu-button') : null;
      if (navbar && menu && menuBtn && menu.classList.contains('is-home-open')) {
        setHomeMenuOpen(navbar, menu, menuBtn, false);
      }
    }
  }, true);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && window.isMenuOpen) {
      const navbar = document.querySelector('.navbar_component:not(.page-navbar)');
      const menu = navbar ? navbar.querySelector('.fs-navbar_menu') : null;
      const menuBtn = navbar ? navbar.querySelector('.fs-navbar_menu-button') : null;
      if (navbar && menu && menuBtn) {
        setHomeMenuOpen(navbar, menu, menuBtn, false);
      }
    }
  });
})();

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

      // If mobile drawer is open, close it cleanly
      const menuButton = document.querySelector(".fs-navbar_menu-button");
      const menu = document.querySelector(".fs-navbar_menu");
      if (menu && (menu.classList.contains("is-home-open") || menu.classList.contains("w--open"))) {
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
