"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export default function SpotlightSection() {
  const [selectedCouple, setSelectedCouple] = useState<number | null>(null);
  const couples = siteConfig.spotlight;

  return (
    <section id="spotlight" className="relative py-28 bg-black">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs uppercase tracking-[0.3em] text-brand-beige">
              Curated Masterpieces
            </span>
            <h2 className="font-didot text-4xl sm:text-5xl md:text-6xl text-white font-normal">
              Our Spotlight
            </h2>
            <p className="text-white/70 text-sm sm:text-base font-archivo font-light leading-relaxed">
              Let us take you through some of our exclusive pieces of work. Every frame is composed with intentional fine-art light, authentic emotion, and editorial poise.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-white/50 uppercase tracking-widest hidden sm:inline">
              Click image to enlarge
            </span>
          </div>
        </div>

        {/* Portfolio Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {couples.map((c, index) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setSelectedCouple(index)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-[#0e0e0e]"
            >
              {/* Image Frame */}
              <div className="relative w-full h-[450px] overflow-hidden">
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-108 brightness-90 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Top Corner Icon */}
                <div className="absolute top-5 right-5 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-4 h-4" />
                </div>

                {/* Bottom Overlay Text */}
                <div className="absolute bottom-6 left-6 right-6 space-y-1.5">
                  <span className="text-[11px] uppercase tracking-[0.25em] text-brand-beige font-medium">
                    {c.location}
                  </span>
                  <h3 className="font-didot text-2xl sm:text-3xl text-white font-normal group-hover:text-brand-beige transition-colors flex items-center justify-between">
                    <span>{c.name}</span>
                    <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                  </h3>
                  <p className="text-white/60 text-xs font-light line-clamp-2">
                    {c.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedCouple !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedCouple(null)}
          >
            <button
              onClick={() => setSelectedCouple(null)}
              className="absolute top-6 right-6 p-3 text-white/70 hover:text-white rounded-full bg-white/10 z-10"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[85vh] rounded-2xl overflow-hidden border border-white/20 flex flex-col md:flex-row bg-[#111]"
            >
              <div className="relative w-full md:w-3/5 h-80 md:h-[550px]">
                <Image
                  src={couples[selectedCouple].image}
                  alt={couples[selectedCouple].name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="w-full md:w-2/5 p-8 flex flex-col justify-between bg-black">
                <div className="space-y-4">
                  <span className="text-xs uppercase tracking-[0.25em] text-brand-gold">
                    {couples[selectedCouple].category}
                  </span>
                  <h3 className="font-didot text-3xl md:text-4xl text-white font-normal">
                    {couples[selectedCouple].name}
                  </h3>
                  <div className="text-xs uppercase tracking-widest text-white/50">
                    Location: {couples[selectedCouple].location}
                  </div>
                  <p className="text-sm text-white/70 font-light leading-relaxed pt-2">
                    {couples[selectedCouple].description}
                  </p>
                </div>

                <div className="pt-6">
                  <a
                    href="#booking"
                    onClick={() => setSelectedCouple(null)}
                    className="btn-luxury w-full py-3 rounded-full text-xs uppercase tracking-widest font-medium text-center"
                  >
                    Inquire Similar Experience
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
