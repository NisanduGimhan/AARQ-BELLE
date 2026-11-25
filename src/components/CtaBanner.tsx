"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export default function CtaBanner() {
  return (
    <section className="relative py-32 overflow-hidden bg-black border-t border-white/10">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={siteConfig.ctaBanner.image}
          alt="Destination Wedding Backdrop"
          fill
          className="object-cover object-center opacity-40 brightness-75 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-black/80" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center space-y-6">
        <span className="inline-block text-xs uppercase tracking-[0.3em] text-brand-beige">
          {siteConfig.ctaBanner.tag}
        </span>

        <h2 className="font-didot text-4xl sm:text-6xl md:text-7xl text-white font-normal leading-tight">
          {siteConfig.ctaBanner.title} <br />
          <span className="italic font-light text-brand-gold">{siteConfig.ctaBanner.titleAccent}</span>
        </h2>

        <p className="max-w-xl mx-auto text-white/70 text-sm sm:text-base font-archivo font-light leading-relaxed">
          {siteConfig.ctaBanner.description}
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#booking"
            className="btn-luxury-white px-8 py-4 rounded-full text-xs uppercase tracking-[0.2em] font-semibold flex items-center gap-2 group shadow-2xl"
          >
            <span>{siteConfig.ctaBanner.ctaText}</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="btn-luxury px-8 py-4 rounded-full text-xs uppercase tracking-[0.2em] font-medium"
          >
            Email Concierge
          </a>
        </div>
      </div>
    </section>
  );
}
