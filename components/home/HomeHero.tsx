"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Apple, Play } from "lucide-react";

export default function HomeHero() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-black">

      {/* Vidéo fond */}
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover opacity-50"
          autoPlay loop muted playsInline preload="none"
          aria-hidden="true"
        >
          <source src="/acceuil.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.7) 85%, #000 100%)"
        }} />
      </div>

      {/* Contenu */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-7xl mx-auto pt-24 md:pt-32">

        {/* Titre massif — style Nike */}
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-roboto font-900 text-white uppercase tracking-[-0.03em] leading-[0.88]"
          style={{ fontSize: "clamp(62px, 12vw, 149px)" }}
        >
          Le sport<br />est meilleur<br />
          <span style={{ color: "#f72585" }}>à deux.</span>
        </motion.h1>

        {/* Sous-ligne minimaliste */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-roboto font-300 text-white/60 mt-8 tracking-wide"
          style={{ fontSize: "clamp(14px, 1.5vw, 18px)" }}
        >
          Connectés par l&apos;effort, poussés par le collectif.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex gap-3 mt-10"
        >
          <Link href="/"
            className="flex items-center gap-2.5 px-7 py-3.5 rounded-full font-roboto font-700 text-sm text-black bg-white hover:bg-white/90 active:scale-[0.97] transition-all duration-150"
          >
            <Apple size={16} />
            App Store
          </Link>
          <Link href="/"
            className="flex items-center gap-2.5 px-7 py-3.5 rounded-full font-roboto font-700 text-sm text-white border border-white/30 hover:border-white/60 hover:bg-white/08 active:scale-[0.97] transition-all duration-150"
          >
            <Play size={14} />
            Google Play
          </Link>
        </motion.div>
      </div>

      {/* Scroll line */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        aria-hidden="true"
      >
        <motion.div
          className="w-px h-14"
          style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)" }}
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}