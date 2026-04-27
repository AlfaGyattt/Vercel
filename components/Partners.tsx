"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { partnersContent } from "@/data/content";
import { fadeInUp, staggerContainer } from "@/lib/utils";

export default function Partners() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section
      aria-label="Partenaires Mood2Fit"
      className="relative py-12 md:py-16 overflow-hidden"
    >
      {/* Fond */}
      <div className="absolute inset-0 bg-[#0f0018]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(247,37,133,0.1)] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(247,37,133,0.1)] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8" ref={ref}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Label */}
          <motion.p
            variants={fadeInUp}
            className="text-center text-xs font-dm font-500 text-[rgba(250,244,255,0.3)] uppercase tracking-widest mb-8"
          >
            {partnersContent.label}
          </motion.p>

          {/* Logos */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center justify-center gap-6 md:gap-10"
          >
            {partnersContent.partners.map((partner) => (
              <div
                key={partner.id}
                className="group flex flex-col items-center gap-1 opacity-30 hover:opacity-70 transition-opacity duration-300 cursor-pointer"
                title={partner.description}
              >
                {/* Logo placeholder — rectangle typographique */}
                <div className="px-5 py-3 rounded-xl border border-[rgba(250,244,255,0.08)] group-hover:border-[rgba(247,37,133,0.2)] transition-colors duration-300">
                  <span className="font-syne font-700 text-sm text-[#faf4ff] whitespace-nowrap tracking-wide">
                    {partner.name}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
