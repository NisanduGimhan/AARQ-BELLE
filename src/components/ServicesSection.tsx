"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Camera, Compass, Plane, HeartHandshake } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export default function ServicesSection() {
  const serviceIcons = [Camera, Compass, Plane, HeartHandshake];
  const services = siteConfig.services.map((s, idx) => ({
    ...s,
    icon: serviceIcons[idx % serviceIcons.length],
  }));

  return (
    <section id="services" className="relative py-28 bg-[#0a0a0a] border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 text-brand-beige text-xs uppercase tracking-[0.25em]">
            <Sparkles className="w-4 h-4" />
            <span>Curated Offerings</span>
          </div>
          <h2 className="font-didot text-4xl sm:text-5xl md:text-6xl text-white font-normal">
            Mastery & Artistry
          </h2>
          <p className="text-white/70 text-sm sm:text-base font-archivo font-light leading-relaxed">
            Elevating wedding photography into enduring high-fashion heirlooms through timeless vision, technical perfection, and heartfelt connection.
          </p>
        </div>

        {/* Services List with Staggered Alternating Layout */}
        <div className="space-y-16">
          {services.map((service, index) => {
            const isEven = index % 2 === 1;
            const Icon = service.icon;

            return (
              <motion.div
                key={service.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className={`flex flex-col ${
                  isEven ? "lg:flex-row-reverse" : "lg:flex-row"
                } items-center gap-10 lg:gap-16 p-8 sm:p-12 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all group`}
              >
                {/* Visual Image */}
                <div className="w-full lg:w-1/2 relative h-72 sm:h-96 rounded-2xl overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/70 backdrop-blur-md flex items-center justify-center border border-white/20 text-white">
                    <Icon className="w-5 h-5 text-brand-beige" />
                  </div>
                </div>

                {/* Text Content */}
                <div className="w-full lg:w-1/2 space-y-4">
                  <div className="text-brand-gold font-didot text-xl tracking-widest">
                    {service.num}
                  </div>
                  <h3 className="font-didot text-3xl sm:text-4xl text-white font-normal group-hover:text-brand-beige transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-white/70 text-sm sm:text-base font-archivo font-light leading-relaxed">
                    {service.description}
                  </p>
                  <div className="pt-4">
                    <a
                      href="#booking"
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/90 hover:text-white border-b border-white/30 hover:border-white pb-1 transition-all"
                    >
                      <span>Inquire About {service.title}</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
