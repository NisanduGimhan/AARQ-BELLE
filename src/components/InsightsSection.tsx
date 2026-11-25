"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export default function InsightsSection() {
  const articles = siteConfig.insights;

  return (
    <section id="insights" className="relative py-28 bg-[#090909] border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 text-brand-beige text-xs uppercase tracking-[0.25em]">
              <BookOpen className="w-4 h-4" />
              <span>Editorial Journal</span>
            </div>
            <h2 className="font-didot text-4xl sm:text-5xl md:text-6xl text-white font-normal">
              Insights and Inputs
            </h2>
            <p className="text-white/70 text-sm sm:text-base font-archivo font-light leading-relaxed">
              Sharing some thoughts to assist you to make the day exquisite. Practical wisdom, lighting philosophies, and destination planning tips.
            </p>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {articles.map((art, index) => (
            <motion.article
              key={art.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group flex flex-col justify-between rounded-2xl overflow-hidden border border-white/10 bg-[#0e0e0e]"
            >
              <div className="relative w-full h-72 sm:h-80 overflow-hidden">
                <Image
                  src={art.image}
                  alt={art.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 brightness-90 group-hover:brightness-100"
                />
                <div className="absolute top-5 left-5 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest bg-black/60 backdrop-blur-md border border-white/20 text-brand-beige">
                  {art.tag}
                </div>
              </div>

              <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-[11px] uppercase tracking-widest text-white/40">
                    {art.readTime}
                  </span>
                  <h3 className="font-didot text-2xl sm:text-3xl text-white font-normal group-hover:text-brand-beige transition-colors">
                    {art.title}
                  </h3>
                  <p className="text-white/70 text-sm font-light leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/5">
                  <a
                    href="#booking"
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white font-medium group-hover:text-brand-beige transition-colors"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
