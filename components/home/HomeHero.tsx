"use client";

import Link from "next/link";
import { motion } from "framer-motion";

function MoodScreen() {
  return (
    <div className="flex flex-col gap-2 p-4 pt-10 h-full overflow-hidden" style={{ background: "#0d001a" }}>
      <div>
        <div className="text-[8px] text-white/40">Bonjour,</div>
        <div className="font-roboto font-700 text-[15px] text-white">Alex</div>
      </div>
      <div className="rounded-xl p-2.5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(114,9,183,.32)" }}>
        <div className="font-roboto font-700 text-[11px] text-white mb-2">Mood du jour</div>
        <div className="flex flex-col gap-1.5">
          {[{ label: "J'ai de l'énergie", active: true }, { label: "Motivation moyenne", active: false }, { label: "Dans ma bulle", active: false }].map((m) => (
            <div key={m.label} className="flex items-center gap-2 p-2 rounded-lg"
              style={{ background: m.active ? "rgba(247,37,133,0.18)" : "rgba(255,255,255,0.03)", border: `1px solid ${m.active ? "rgba(247,37,133,0.6)" : "rgba(255,255,255,0.06)"}` }}>
              <span className="font-roboto text-[9px] text-white">{m.label}</span>
              {m.active && <div className="ml-auto w-2.5 h-2.5 rounded-full bg-[#f72585]" />}
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-xl p-2.5 mt-1" style={{ background: "rgba(247,37,133,0.08)", border: "1px solid rgba(247,37,133,0.2)" }}>
        <div className="font-roboto text-[8px] text-white/50 mb-1">3 partenaires disponibles</div>
        <div className="font-roboto font-700 text-[9px] text-white">Voir les matchs</div>
      </div>
      <div className="rounded-xl p-2.5 mt-1" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="font-roboto text-[8px] text-white/40 mb-1.5">Ton match du jour</div>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-roboto font-700 text-white flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#f72585,#7209b7)" }}>K</div>
          <div className="flex-1">
            <div className="font-roboto text-[9px] text-white">Karim · Paris 19e</div>
            <div className="font-roboto text-[8px] text-white/40">Street Workout</div>
          </div>
          <span className="font-roboto font-900 text-[10px] text-[#f72585]">97%</span>
        </div>
      </div>
    </div>
  );
}

function PhoneHero() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Glow rose */}
      <div className="absolute rounded-[60px] pointer-events-none"
        style={{ inset: "-30px", background: "radial-gradient(circle, rgba(247,37,133,0.3), transparent 70%)", filter: "blur(40px)", opacity: 0.8 }} />
      {/* Mokup PNG */}
      <img
        src="/mokup/mokup_1.png"
        alt="Mood2Fit app"
        style={{ width: "clamp(160px, 18vw, 270px)", height: "auto", objectFit: "contain", display: "block", position: "relative", zIndex: 1 }}
      />
    </div>
  );
}

export default function HomeHero() {
  return (
    <section className="relative h-screen flex items-center overflow-hidden bg-black">

      <div className="absolute inset-0 z-0">
        <img src="/street.jpeg" alt="" aria-hidden="true" className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.7) 85%, #000 100%)" }} />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(114,9,183,0.15) 0%, transparent 70%)" }} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 pt-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Gauche — texte (identique desktop et mobile) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start text-left gap-6"
          >
            <h1 className="font-roboto font-900 text-white uppercase leading-[0.88]"
              style={{ fontSize: "clamp(52px, 7vw, 110px)", letterSpacing: "-0.02em" }}>
              Le sport<br />est meilleur<br />
              <span style={{ color: "#f72585" }}>à deux.</span>
            </h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}
              className="font-roboto font-300 text-white/60 tracking-wide"
              style={{ fontSize: "clamp(14px, 1.5vw, 18px)" }}>
              Connectés par l&apos;effort, portés par le collectif.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }}
              className="flex gap-3">

              {/* App Store — logo depuis /app/apple.png */}
              <Link href="/" className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-white hover:bg-white/90 active:scale-[0.97] transition-all duration-150" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.2)" }}>
                <img src="/app/apple.png" alt="Apple" style={{ width: "22px", height: "22px", objectFit: "contain" }} />
                <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
                  <span style={{ fontSize: "9px", color: "rgba(0,0,0,0.5)", lineHeight: 1 }}>Télécharger sur</span>
                  <span style={{ fontSize: "14px", fontWeight: 700, color: "#000", lineHeight: 1.2 }}>App Store</span>
                </div>
              </Link>

              {/* Google Play — logo depuis /app/android.png */}
              <Link href="/" className="flex items-center gap-2.5 px-6 py-3 rounded-full border border-black/20 active:scale-[0.97] transition-all duration-150">
                <img src="/app/android.png" alt="Google Play" style={{ width: "22px", height: "22px", objectFit: "contain" }} />
                <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
                  <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.6)", lineHeight: 1 }}>Disponible sur</span>
                  <span style={{ fontSize: "14px", fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>Google Play</span>
                </div>
              </Link>

            </motion.div>
          </motion.div>

          {/* Droite — téléphone : visible uniquement desktop (hidden sur mobile) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:flex justify-center items-center"
          >
            <motion.div animate={{ y: [0, -16, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}>
              <PhoneHero />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}