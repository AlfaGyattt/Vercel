"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { testimonialsContent } from "@/data/content";
import { fadeInUp, staggerContainer } from "@/lib/utils";

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="testimonials"
      className="section-padding relative overflow-hidden"
      aria-label="Témoignages utilisateurs Mood2Fit"
    >
      {/* Fond */}
      <div className="absolute inset-0 bg-[#0f0018]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(247,37,133,0.15)] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(247,37,133,0.15)] to-transparent" />

      {/* Glow */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-[#f72585]/05 blur-[100px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          className="mb-14 md:mb-20"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.span
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-[rgba(247,37,133,0.1)] border border-[rgba(247,37,133,0.25)] text-xs font-dm font-500 text-[#f72585] tracking-widest uppercase mb-5"
          >
            {testimonialsContent.eyebrow}
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="font-syne font-800 text-4xl md:text-5xl lg:text-6xl text-[#faf4ff] leading-tight max-w-2xl"
          >
            {testimonialsContent.title}
          </motion.h2>
        </motion.div>

        {/* Cartes */}
        <motion.div
          className="grid md:grid-cols-3 gap-5 md:gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {testimonialsContent.testimonials.map((t, i) => (
            <motion.article
              key={t.id}
              variants={fadeInUp}
              className="relative flex flex-col gap-5 p-6 md:p-8 rounded-brand bg-gradient-card glow-border group hover:border-[rgba(247,37,133,0.3)] transition-all duration-300"
              aria-label={`Témoignage de ${t.name}`}
            >
              {/* Guillemet décoratif */}
              <div
                className="absolute top-5 right-6 text-6xl font-syne font-800 leading-none opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                aria-hidden="true"
                style={{ color: t.avatarBg }}
              >
                &ldquo;
              </div>

              {/* Quote */}
              <blockquote className="relative z-10">
                <p className="font-dm font-300 text-base text-[rgba(250,244,255,0.8)] leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </blockquote>

              {/* Auteur */}
              <footer className="flex items-center gap-3 mt-auto pt-4 border-t border-[rgba(250,244,255,0.06)]">
                {/* Avatar */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-syne font-700 text-[#faf4ff] flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${t.avatarBg}, #7209b7)`,
                  }}
                  aria-hidden="true"
                >
                  {t.avatarInitials}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-dm font-500 text-[#faf4ff]">
                    {t.name}
                  </p>
                  <p className="text-xs font-dm text-[rgba(250,244,255,0.45)]">
                    {t.city}
                  </p>
                </div>

                {/* Badge sport */}
                <span
                  className="flex items-center gap-1 px-2.5 py-1 rounded-pill text-xs font-dm font-500 border flex-shrink-0"
                  style={{
                    background: `${t.avatarBg}15`,
                    borderColor: `${t.avatarBg}30`,
                    color: t.avatarBg,
                  }}
                >
                  <span aria-hidden="true">{t.sportEmoji}</span>
                  {t.sport}
                </span>
              </footer>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
