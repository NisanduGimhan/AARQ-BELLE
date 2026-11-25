"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ArrowUpRight, Instagram, Facebook } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/siteConfig";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Tours", href: "#tours" },
    { label: "Services", href: "#services" },
    { label: "Spotlight", href: "#spotlight" },
    { label: "Reviews", href: "#testimonials" },
    { label: "Insights", href: "#insights" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-black/85 backdrop-blur-md py-4 border-b border-white/10 shadow-2xl"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="#hero" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 md:w-12 md:h-12 transition-transform duration-300 group-hover:scale-105">
              <Image
                src={siteConfig.brand.logo}
                alt={`${siteConfig.brand.name} Logo`}
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-didot text-lg md:text-xl tracking-wider text-white uppercase font-light">
                {siteConfig.brand.name}
              </span>
              {siteConfig.brand.nameSecondary && (
                <span className="text-[9px] md:text-[10px] tracking-[0.25em] text-white/70 uppercase">
                  {siteConfig.brand.nameSecondary}
                </span>
              )}
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-8 text-sm uppercase tracking-widest text-white/80 font-archivo">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="link-underline transition-colors hover:text-white text-xs py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="#booking"
              className="btn-luxury px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-medium group"
            >
              <span>Reserve Now</span>
              <ArrowUpRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white/90 hover:text-white focus:outline-none"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-8 pt-28 lg:hidden"
          >
            <div className="flex flex-col space-y-5">
              <span className="text-xs uppercase tracking-[0.3em] text-white/40">Navigation</span>
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx }}
                  className="font-didot text-2xl md:text-3xl text-white hover:text-brand-beige transition-colors flex items-center justify-between border-b border-white/10 pb-3"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-5 h-5 text-white/40" />
                </motion.a>
              ))}
            </div>

            <div className="pt-6 border-t border-white/10 space-y-4">
              <div className="flex flex-col text-xs text-white/60 space-y-1 font-archivo">
                <span className="text-white">Direct Line: {siteConfig.contact.phone}</span>
                <span>{siteConfig.contact.email}</span>
              </div>
              <div className="flex items-center gap-4 text-white/60 pt-2">
                <a href={siteConfig.contact.instagram} target="_blank" rel="noreferrer" className="hover:text-white">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href={siteConfig.contact.facebook} target="_blank" rel="noreferrer" className="hover:text-white">
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
