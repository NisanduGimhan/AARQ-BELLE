"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = siteConfig.faqs;

  return (
    <section id="faq" className="relative py-28 bg-black border-t border-white/10">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-brand-beige text-xs uppercase tracking-[0.25em]">
            <HelpCircle className="w-4 h-4" />
            <span>Questions & Answers</span>
          </div>
          <h2 className="font-didot text-4xl sm:text-5xl md:text-6xl text-white font-normal">
            FAQs
          </h2>
          <p className="text-white/70 text-sm sm:text-base font-archivo font-light">
            Explore our FAQs to find answers to common questions about our services and booking process.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="border border-white/10 rounded-2xl overflow-hidden bg-[#0c0c0c] transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-didot text-lg sm:text-xl text-white font-normal">
                    {faq.question}
                  </span>
                  <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center flex-shrink-0 text-white/70">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-7 sm:px-7 text-white/70 text-sm sm:text-base font-archivo font-light leading-relaxed border-t border-white/5 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
