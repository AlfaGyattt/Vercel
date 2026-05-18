"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">

      {/* Glow violet */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(114,9,183,0.2) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "10%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(247,37,133,0.1) 0%, transparent 70%)" }} />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl mx-auto">

        {/* 404 massif */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-roboto font-900 uppercase leading-none tracking-[-0.04em]"
            style={{ fontSize: "clamp(120px, 20vw, 240px)", color: "rgba(255,255,255,0.06)" }}>
            404
          </p>
        </motion.div>

        {/* Texte */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-6 -mt-8 md:-mt-16"
        >
          <h1 className="font-roboto font-900 uppercase leading-[0.9] text-white"
            style={{ fontSize: "clamp(36px, 6vw, 72px)", letterSpacing: "-0.02em" }}>
            Page introuvable.<br />
            <span style={{ color: "#f72585" }}>Elle s'est barrée.</span>
          </h1>

          <p className="font-roboto font-400 text-white/40 max-w-md leading-relaxed"
            style={{ fontSize: "clamp(14px, 1.4vw, 17px)" }}>
            Cette page n'existe pas ou a été déplacée. Pas de panique — retourne à l'accueil et reprends ta séance.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link href="/"
              className="flex items-center gap-2 px-8 py-4 rounded-full font-roboto font-700 text-sm text-white transition-all duration-150 hover:opacity-90 active:scale-[0.97]"
              style={{ background: "linear-gradient(135deg, #f72585, #7209b7)", boxShadow: "0 8px 40px rgba(247,37,133,0.3)" }}>
              Retour à l'accueil
            </Link>
            <Link href="/contact"
              className="flex items-center gap-2 px-8 py-4 rounded-full font-roboto font-700 text-sm text-white/60 border border-white/15 hover:text-white hover:border-white/30 transition-all duration-150 active:scale-[0.97]">
              Signaler le problème
            </Link>
          </div>
        </motion.div>

        {/* Logo watermark */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="font-roboto font-900 text-white/10 mt-16 uppercase tracking-[-0.02em]"
          style={{ fontSize: "clamp(32px, 5vw, 56px)" }}>
          Mood<span style={{ color: "rgba(247,37,133,0.2)" }}>2Fit</span>
        </motion.p>

      </div>
    </main>
  );
}