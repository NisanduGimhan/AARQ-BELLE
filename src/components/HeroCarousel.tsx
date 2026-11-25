"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Calendar, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export default function HeroCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. Subtle, Elegant Scroll Animation (Zoomed in on desktop & mobile)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Zoomed-in scale (starts at 1.0 on mobile & desktop, and gently zooms to 1.05 on scroll)
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.0, 1.05]);
  const imageY = useTransform(scrollYProgress, [0, 0.5], ["0%", "3%"]);
  const imageBlur = useTransform(
    scrollYProgress,
    [0, 0.45],
    ["blur(0px)", "blur(2px)"]
  );
  const textY = useTransform(scrollYProgress, [0, 0.5], ["0%", "25%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);

  return (
    <header
      id="hero"
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Layer 1: Ambient Blurred Background (fills screen warmly with matching photo tones) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Image
          src={siteConfig.hero.image}
          alt=""
          fill
          priority
          className="object-cover object-center filter blur-3xl opacity-30 scale-105 brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />
      </div>

      {/* Layer 2: Main Hero Photo - Zoomed in View on Desktop & Mobile */}
      <motion.div
        style={{
          scale: imageScale,
          y: imageY,
          filter: imageBlur,
        }}
        className="relative z-10 flex items-center justify-center w-full h-full max-h-[92vh] py-4 px-2 sm:px-4 will-change-transform pointer-events-none"
      >
        <div className="relative w-auto h-[78vh] sm:h-[84vh] md:h-[88vh] max-h-[900px] max-w-[96vw] md:max-w-[90vw] aspect-[3/4] sm:aspect-auto">
          <Image
            src={siteConfig.hero.image}
            alt={siteConfig.hero.title}
            fill
            priority
            className="object-contain object-center filter drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)] rounded-2xl"
          />
        </div>
      </motion.div>

      {/* Layer 3: Floating Headline & Content Centered */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="absolute z-20 max-w-5xl mx-auto px-6 text-center flex flex-col items-center pointer-events-auto"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-black/60 backdrop-blur-md mb-4 shadow-xl">
          <Sparkles className="w-3.5 h-3.5 text-brand-gold animate-pulse" />
          <span className="text-[11px] uppercase tracking-[0.25em] text-white/90 font-archivo">
            {siteConfig.hero.tag}
          </span>
        </div>

        <div className="space-y-3">
          <h1 className="font-didot text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.08] text-white font-normal drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            {siteConfig.hero.title}{" "}
            <span className="italic font-light text-brand-beige block mt-2">
              {siteConfig.hero.subtitle}
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-white/90 font-archivo font-light leading-relaxed pt-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            {siteConfig.hero.description}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
          <a
            href={siteConfig.hero.ctaLink || "#booking"}
            className="btn-luxury px-8 py-3.5 rounded-full text-xs uppercase tracking-[0.2em] font-semibold text-white shadow-2xl hover:shadow-white/20 flex items-center gap-2 group"
          >
            <Calendar className="w-4 h-4 text-brand-gold" />
            <span>{siteConfig.hero.ctaText || "Reserve Your Date"}</span>
          </a>
          <a
            href="#spotlight"
            className="px-6 py-3.5 text-xs uppercase tracking-[0.2em] text-white/80 hover:text-white transition-colors"
          >
            Explore Portfolio
          </a>
        </div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <div
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5 text-white/50 hover:text-white transition-colors cursor-pointer"
        onClick={() => {
          const nextSec = document.getElementById("about") || document.querySelector("section");
          nextSec?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span className="text-[10px] uppercase tracking-[0.25em]">Scroll down</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-3.5 h-3.5 text-white/70" />
        </motion.div>
      </div>
    </header>
  );
}
