"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Calendar } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const subjectY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const archScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);


  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black pt-24 pb-16"
    >
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0">
        <Image
          src={siteConfig.hero.image}
          alt={siteConfig.brand.name}
          fill
          className="object-cover object-center opacity-40 brightness-75 scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Top Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
          <span className="text-[11px] uppercase tracking-[0.25em] text-white/80 font-archivo">
            {siteConfig.hero.tag}
          </span>
        </motion.div>

        {/* Hero Headline (Didot Editorial Serif) */}
        <motion.div
          style={{ y: textY, opacity }}
          className="space-y-4 max-w-4xl"
        >
          <h1 className="font-didot text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.08] text-white font-normal">
            {siteConfig.hero.title}{" "}
            <span className="italic font-light text-brand-beige block mt-2">
              {siteConfig.hero.subtitle}
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-white/70 font-archivo font-light leading-relaxed pt-2">
            {siteConfig.hero.description}
          </p>
        </motion.div>

        {/* Foreground Subject Cutout (Parallax Bride & Groom) */}
        <motion.div
          style={{ y: subjectY }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="relative w-full max-w-lg h-64 sm:h-80 md:h-96 my-4 pointer-events-none"
        >
          <Image
            src="/images/hero_subject.avif"
            alt="Bride and Groom"
            fill
            className="object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
            priority
          />
        </motion.div>

        {/* Call to Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-2"
        >
          <a
            href="#booking"
            className="btn-luxury px-8 py-3.5 rounded-full text-xs uppercase tracking-[0.2em] font-semibold text-white shadow-xl hover:shadow-white/10"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Reserve Your Date
          </a>
          <a
            href="#spotlight"
            className="px-6 py-3.5 text-xs uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors"
          >
            Explore Portfolio
          </a>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors cursor-pointer"
        onClick={() => {
          const aboutSection = document.getElementById("about");
          aboutSection?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span className="text-[10px] uppercase tracking-[0.25em]">Scroll down</span>
        <ArrowDown className="w-4 h-4" />
      </motion.div>
    </section>
  );
}
