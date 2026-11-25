"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export default function ToursSection() {
  const tours = siteConfig.tours;

  return (
    <section id="tours" className="relative py-28 bg-black">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs uppercase tracking-[0.3em] text-brand-beige">
              Exclusive Destinations
            </span>
            <h2 className="font-didot text-4xl sm:text-5xl md:text-6xl text-white font-normal">
              Recent Tours
            </h2>
            <p className="text-white/70 text-sm sm:text-base font-archivo font-light leading-relaxed">
              We’re bringing the Wedlock experience to your city! Secure your session during one of our exclusive international tour dates. Limited bookings available.
            </p>
          </div>

          <div>
            <a
              href="#booking"
              className="btn-luxury px-6 py-3 rounded-full text-xs uppercase tracking-widest font-medium inline-flex items-center gap-2 group"
            >
              <span>Request A Tour City</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Tour Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tours.map((tour, index) => (
            <motion.div
              key={tour.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative rounded-2xl overflow-hidden border border-white/10 bg-[#0c0c0c] flex flex-col justify-between"
            >
              {/* Image Container with Hover Scale */}
              <div className="relative w-full h-80 sm:h-96 overflow-hidden">
                <Image
                  src={tour.image}
                  alt={tour.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 brightness-90 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                {/* Badges */}
                <div className="absolute top-6 left-6 flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-widest bg-black/60 backdrop-blur-md border border-white/20 text-white font-medium">
                    RECENT TOUR
                  </span>
                  <div className="relative w-6 h-4 overflow-hidden rounded shadow">
                    <Image
                      src={tour.flag}
                      alt="Country Flag"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="absolute top-6 right-6">
                  <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-widest bg-brand-gold/20 backdrop-blur-md border border-brand-gold/40 text-brand-beige font-medium">
                    {tour.tag}
                  </span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-2 text-xs text-brand-beige font-medium mb-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{tour.date}</span>
                  </div>
                  <h3 className="font-didot text-3xl sm:text-4xl text-white font-normal group-hover:text-brand-beige transition-colors">
                    {tour.title}
                  </h3>
                  <p className="text-white/80 text-xs sm:text-sm italic font-light mt-1">
                    {tour.subtitle}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-6 bg-[#0c0c0c] border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-white/60">
                  <MapPin className="w-3.5 h-3.5 text-brand-beige" />
                  <span className="truncate max-w-[220px] sm:max-w-xs">{tour.destination}</span>
                </div>
                <a
                  href="#booking"
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-white hover:text-brand-beige transition-colors font-medium group/btn"
                >
                  <span>View Tour</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
