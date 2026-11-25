"use client";

import Image from "next/image";
import Link from "next/link";
import { Instagram, Facebook, Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050505] text-white border-t border-white/10 pt-20 pb-12 font-archivo">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-6">
            <Link href="#hero" className="flex items-center gap-3">
              <div className="relative w-12 h-12">
                <Image
                  src={siteConfig.brand.logo}
                  alt={`${siteConfig.brand.name} Logo`}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-didot text-2xl tracking-wider text-white uppercase font-light">
                  {siteConfig.brand.name}
                </span>
                {siteConfig.brand.nameSecondary && (
                  <span className="text-[10px] tracking-[0.25em] text-white/70 uppercase">
                    {siteConfig.brand.nameSecondary}
                  </span>
                )}
              </div>
            </Link>

            <p className="text-white/60 text-sm font-light leading-relaxed max-w-sm">
              {siteConfig.brand.tagline}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 text-white/60 pt-2">
              {siteConfig.contact.instagram && (
                <a
                  href={siteConfig.contact.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:border-white hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {siteConfig.contact.facebook && (
                <a
                  href={siteConfig.contact.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:border-white hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Column 1: Contact Info */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-didot text-xl text-white font-normal border-b border-white/10 pb-2">
              Get in Touch
            </h4>
            <ul className="space-y-3 text-sm text-white/70 font-light">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-beige" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white transition-colors">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-beige" />
                <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-white transition-colors">
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-2 pt-1">
                <MapPin className="w-4 h-4 text-brand-beige mt-0.5" />
                <span>{siteConfig.contact.address}</span>
              </li>
            </ul>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-didot text-xl text-white font-normal border-b border-white/10 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-white/70 font-light">
              <li>
                <a href="#hero" className="hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">About Us</a>
              </li>
              <li>
                <a href="#spotlight" className="hover:text-white transition-colors">Portfolio</a>
              </li>
              <li>
                <a href="#tours" className="hover:text-white transition-colors">Tours</a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-white transition-colors">Reviews</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 space-y-4 sm:space-y-0">
          <p>© {currentYear} {siteConfig.brand.name} {siteConfig.brand.nameSecondary}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#hero" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#hero" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#hero" className="hover:text-white transition-colors">Back to Top ↑</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
