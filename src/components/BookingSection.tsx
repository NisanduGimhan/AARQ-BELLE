"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, Send, Calendar, MapPin, Mail, Phone, User } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export default function BookingSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    date: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="booking" className="relative py-28 bg-[#070707] border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Context & Imagery */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-brand-beige text-xs uppercase tracking-[0.25em]">
              <Calendar className="w-4 h-4" />
              <span>{siteConfig.booking.badge}</span>
            </div>

            <h2 className="font-didot text-3xl sm:text-5xl text-white font-normal leading-tight">
              {siteConfig.booking.title}
            </h2>

            <p className="text-white/70 text-sm sm:text-base font-archivo font-light leading-relaxed">
              {siteConfig.booking.description}
            </p>

            {/* Featured Image Collage */}
            <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src={siteConfig.booking.image}
                alt="International Destination Wedding"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[11px] uppercase tracking-widest text-brand-beige">
                  Seamless Global Planning
                </span>
                <p className="text-white text-xs sm:text-sm mt-1 font-light">
                  Tailored itineraries, flight permits, multi-day shoots, and dedicated concierge support.
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-col space-y-2 text-xs text-white/60">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-brand-beige" />
                <span>Direct / WhatsApp: {siteConfig.contact.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-brand-beige" />
                <span>{siteConfig.contact.email}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Reservation Form */}
          <div className="lg:col-span-7 bg-[#0f0f0f] border border-white/10 p-8 sm:p-12 rounded-3xl shadow-2xl relative">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16 space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-didot text-3xl text-white font-normal">
                  Thank You, {formData.name || "Valued Client"}
                </h3>
                <p className="text-white/70 text-sm max-w-md mx-auto font-light">
                  Your reservation request has been received. Our international coordinator will review your dates and reach out within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-luxury px-6 py-2.5 rounded-full text-xs uppercase tracking-widest mt-4"
                >
                  Send Another Inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-widest text-white/50">Reserve Your Experience</span>
                  <h3 className="font-didot text-2xl sm:text-3xl text-white font-normal">
                    Let Us Tell Your Story
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-white/60">Your Names</label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="e.g. Maya & Daniel"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-white/60">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="hello@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-white/60">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-white/60">Estimated Date</label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-white/60">Wedding Destination / City</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lake Como, Italy / Galle, Sri Lanka"
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-white/60">Your Vision & Details</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your celebration, guest count, and photography preferences..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-luxury-white w-full py-4 rounded-xl text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 mt-4 shadow-xl"
                >
                  <span>Submit Reservation Request</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
