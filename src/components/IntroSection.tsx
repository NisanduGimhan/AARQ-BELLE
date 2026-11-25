"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Globe, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export default function IntroSection() {
  const countries = siteConfig.about.countries;

  return (
    <section id="about" className="relative py-28 bg-[#070707] border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-brand-beige text-xs uppercase tracking-[0.25em]"
          >
            <Globe className="w-4 h-4" />
            <span>{siteConfig.about.badge}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-didot text-3xl sm:text-5xl md:text-6xl text-white font-normal leading-tight"
          >
            {siteConfig.about.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/70 text-base sm:text-lg font-archivo font-light leading-relaxed pt-2"
          >
            {siteConfig.about.description}
          </motion.p>
        </div>

        {/* Global Destinations Strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 pt-12 border-t border-white/10"
        >
          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-[0.3em] text-white/50">
              International Presence & Destinations Covered
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 items-center">
            {countries.map((c, i) => (
              <div
                key={c.name}
                className="flex flex-col items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/20 hover:bg-white/[0.06] transition-all group"
              >
                <div className="relative w-10 h-7 overflow-hidden rounded shadow-md group-hover:scale-110 transition-transform">
                  <Image
                    src={c.flag}
                    alt={`${c.name} Flag`}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-[11px] text-white/80 tracking-wider text-center font-medium">
                  {c.name}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-white/10 text-center">
          <div>
            <div className="font-didot text-4xl md:text-5xl text-white font-light">12+</div>
            <div className="text-xs uppercase tracking-[0.2em] text-white/50 mt-1">Countries Toured</div>
          </div>
          <div>
            <div className="font-didot text-4xl md:text-5xl text-white font-light">650+</div>
            <div className="text-xs uppercase tracking-[0.2em] text-white/50 mt-1">Weddings Captured</div>
          </div>
          <div>
            <div className="font-didot text-4xl md:text-5xl text-white font-light">100%</div>
            <div className="text-xs uppercase tracking-[0.2em] text-white/50 mt-1">Bespoke Curation</div>
          </div>
          <div>
            <div className="font-didot text-4xl md:text-5xl text-white font-light">15+</div>
            <div className="text-xs uppercase tracking-[0.2em] text-white/50 mt-1">Industry Accolades</div>
          </div>
        </div>

        {/* Explore Button */}
        <div className="mt-14 text-center">
          <a
            href="#booking"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white font-medium hover:text-brand-beige transition-colors group"
          >
            <span>Learn More About Our Philosophy</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
