"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Apple, Play, Sparkles } from "lucide-react";
import { ctaContent } from "@/data/content";
import { fadeInUp, staggerContainer } from "@/lib/utils";

export default function CtaDownload() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      aria-label="Télécharger l'application Mood2Fit"
      className="relative py-24 md:py-36 overflow-hidden"
      ref={ref}
    >
      {/* Fond gradient animé */}
      <div className="absolute inset-0 animated-gradient-bg opacity-90" />

      {/* Overlay texturé */}
      <div className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 60%),
                            radial-gradient(circle at 80% 50%, rgba(0,0,0,0.3) 0%, transparent 60%)`,
        }}
      />

      {/* Ligne haut décorative */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/20" />

      {/* Contenu */}
      <div className="relative z-10 max-w-5xl mx-auto px-5 md:px-8 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col items-center gap-6 md:gap-8"
        >
          {/* Eyebrow */}
          <motion.div variants={fadeInUp}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-white/15 border border-white/25 text-xs font-dm font-500 text-white tracking-widest uppercase backdrop-blur-sm">
              <Sparkles size={12} aria-hidden="true" />
              {ctaContent.eyebrow}
            </span>
          </motion.div>

          {/* Titre principal */}
          <motion.h2
            variants={fadeInUp}
            className="font-syne font-800 text-5xl md:text-6xl lg:text-7xl text-white leading-[0.95] tracking-tight"
          >
            {ctaContent.title}
          </motion.h2>

          {/* Sous-titre */}
          <motion.p
            variants={fadeInUp}
            className="text-base md:text-lg font-dm font-300 text-white/75 max-w-md leading-relaxed"
          >
            {ctaContent.subtitle}
          </motion.p>

          {/* Boutons stores */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 mt-2"
          >
            {ctaContent.storeButtons.map((btn) => {
              const Icon = btn.platform === "ios" ? Apple : Play;
              return (
                <Link
                  key={btn.platform}
                  href={btn.href}
                  className="flex items-center gap-4 px-7 py-4 rounded-brand bg-white/10 backdrop-blur-sm border border-white/25 hover:bg-white/20 hover:border-white/40 active:scale-[0.97] transition-all duration-200 group"
                  aria-label={`Télécharger sur ${btn.label}`}
                >
                  <Icon
                    size={26}
                    className="text-white"
                    aria-hidden="true"
                  />
                  <div className="text-left">
                    <p className="text-[11px] text-white/60 leading-none mb-1 font-dm">
                      {btn.sublabel}
                    </p>
                    <p className="text-base font-syne font-700 text-white leading-none">
                      {btn.label}
                    </p>
                  </div>
                </Link>
              );
            })}
          </motion.div>

          {/* Mention */}
          <motion.p
            variants={fadeInUp}
            className="text-xs font-dm text-white/40 tracking-wide"
          >
            {ctaContent.mention}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
