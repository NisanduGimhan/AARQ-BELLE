"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export default function TestimonialsSection() {
  const testimonials = siteConfig.testimonials;

  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[currentIndex];

  return (
    <section id="testimonials" className="relative py-28 bg-black border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-brand-beige">
            Client Words
          </span>
          <h2 className="font-didot text-4xl sm:text-5xl md:text-6xl text-white font-normal">
            Weddings Testimonials
          </h2>
          <p className="text-white/70 text-sm sm:text-base font-archivo font-light">
            Check out what our clients have to say about their experience with us.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto bg-[#0d0d0d] border border-white/10 rounded-3xl p-8 sm:p-14 shadow-2xl overflow-hidden">
          {/* Subtle Quote Background Icon */}
          <div className="absolute top-6 right-8 text-white/[0.04] pointer-events-none">
            <Quote className="w-32 h-32" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col md:flex-row items-center gap-8 md:gap-12 relative z-10"
            >
              {/* Couple Portrait */}
              <div className="relative w-32 h-32 sm:w-44 sm:h-44 rounded-full overflow-hidden border-2 border-brand-gold/40 flex-shrink-0 shadow-xl">
                <Image
                  src={current.image}
                  alt={current.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Quote Content */}
              <div className="space-y-4 text-center md:text-left">
                {/* 5 Stars */}
                <div className="flex items-center justify-center md:justify-start gap-1 text-brand-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-brand-gold" />
                  ))}
                </div>

                <p className="font-didot text-lg sm:text-2xl text-white font-light italic leading-relaxed">
                  &ldquo;{current.quote}&rdquo;
                </p>

                <div className="pt-2">
                  <h3 className="font-didot text-xl text-white font-normal">
                    {current.name}
                  </h3>
                  <span className="text-xs uppercase tracking-widest text-white/50">
                    {current.origin}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-between pt-10 mt-8 border-t border-white/10">
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 transition-all rounded-full ${
                    currentIndex === idx ? "w-8 bg-white" : "w-2 bg-white/20"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-white/20 hover:border-white hover:bg-white/10 flex items-center justify-center text-white transition-all"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full border border-white/20 hover:border-white hover:bg-white/10 flex items-center justify-center text-white transition-all"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
