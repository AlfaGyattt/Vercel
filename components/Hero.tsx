"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Apple, Play, ChevronDown } from "lucide-react";
import { heroContent } from "@/data/content";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/utils";

// Badges flottants autour du téléphone
interface FloatingBadge {
  id: string;
  emoji: string;
  label: string;
  value: string;
  position: string;
  delay: number;
  color: string;
}

const floatingBadges: FloatingBadge[] = [
  {
    id: "match",
    emoji: "🎯",
    label: "Nouveau match",
    value: "Lucas, Paris 11e",
    position: "top-[15%] -left-6 md:-left-14",
    delay: 0.8,
    color: "#f72585",
  },
  {
    id: "challenge",
    emoji: "🏆",
    label: "Challenge terminé",
    value: "+420 pts",
    position: "top-[55%] -right-4 md:-right-12",
    delay: 1.1,
    color: "#4cc9f0",
  },
  {
    id: "mood",
    emoji: "⚡",
    label: "Mood du jour",
    value: "Full Power",
    position: "bottom-[20%] -left-4 md:-left-12",
    delay: 1.4,
    color: "#06d6a0",
  },
];

// Composant téléphone mockup
function PhoneMockup() {
  return (
    <div className="relative w-[220px] md:w-[260px] lg:w-[280px] mx-auto">
      {/* Glow derrière le téléphone */}
      <div className="absolute inset-0 blur-[60px] bg-gradient-to-b from-[#f72585]/30 to-[#7209b7]/20 scale-110 rounded-[60px]" />

      {/* Corps du téléphone */}
      <motion.div
        className="relative w-full aspect-[9/19.5] rounded-[40px] bg-[#0f0018] border border-[rgba(247,37,133,0.3)] shadow-phone overflow-hidden"
        style={{ transform: "rotateY(-8deg) rotateX(3deg)" }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Encoche */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#080010] rounded-b-2xl z-10" />

        {/* Écran - contenu app */}
        <div className="absolute inset-0 p-4 pt-10 flex flex-col gap-3">
          {/* Header app */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[9px] text-[rgba(250,244,255,0.5)] font-dm">Bonjour Alex 👋</p>
              <p className="text-[11px] font-syne font-700 text-[#faf4ff] leading-tight">
                Ton mood du jour ?
              </p>
            </div>
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#f72585] to-[#7209b7] flex items-center justify-center text-[10px]">
              A
            </div>
          </div>

          {/* Mood selector */}
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { emoji: "💤", label: "Calm", active: false },
              { emoji: "⚡", label: "Energy", active: true },
              { emoji: "🔥", label: "Beast", active: false },
            ].map((mood) => (
              <div
                key={mood.label}
                className={`rounded-xl p-2 text-center border transition-all ${
                  mood.active
                    ? "bg-[rgba(247,37,133,0.2)] border-[rgba(247,37,133,0.5)]"
                    : "bg-[rgba(250,244,255,0.04)] border-[rgba(250,244,255,0.06)]"
                }`}
              >
                <div className="text-base">{mood.emoji}</div>
                <div
                  className={`text-[8px] font-dm font-500 mt-0.5 ${
                    mood.active ? "text-[#f72585]" : "text-[rgba(250,244,255,0.4)]"
                  }`}
                >
                  {mood.label}
                </div>
              </div>
            ))}
          </div>

          {/* Match card */}
          <div className="rounded-2xl bg-[rgba(247,37,133,0.08)] border border-[rgba(247,37,133,0.2)] p-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7209b7] to-[#f72585] flex items-center justify-center text-[11px] text-[#faf4ff] font-700">
                K
              </div>
              <div className="flex-1">
                <p className="text-[9px] font-dm font-500 text-[#faf4ff]">Karim · Paris 19e</p>
                <p className="text-[8px] text-[rgba(250,244,255,0.5)]">Street Workout · 3 séances/sem</p>
              </div>
              <div className="text-[9px] font-700 text-[#f72585]">94%</div>
            </div>
          </div>

          {/* Challenges mini */}
          <div className="rounded-2xl bg-[rgba(76,201,240,0.08)] border border-[rgba(76,201,240,0.15)] p-3">
            <p className="text-[8px] text-[rgba(250,244,255,0.5)] font-dm mb-1.5">Challenge actif</p>
            <p className="text-[10px] font-syne font-700 text-[#faf4ff] mb-2">
              100 dips en 7 jours
            </p>
            <div className="w-full h-1 bg-[rgba(250,244,255,0.08)] rounded-full">
              <div className="h-full w-3/5 rounded-full bg-gradient-to-r from-[#4cc9f0] to-[#06d6a0]" />
            </div>
            <p className="text-[8px] text-[rgba(250,244,255,0.4)] mt-1">60 / 100 dips</p>
          </div>
        </div>

        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-[rgba(250,244,255,0.2)] rounded-full" />
      </motion.div>

      {/* Badges flottants */}
      {floatingBadges.map((badge) => (
        <motion.div
          key={badge.id}
          className={`absolute ${badge.position} z-20`}
          initial={{ opacity: 0, scale: 0.6, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            delay: badge.delay,
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <motion.div
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#0f0018]/90 backdrop-blur-sm border shadow-lg whitespace-nowrap"
            style={{ borderColor: `${badge.color}40` }}
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: badge.delay * 0.5,
            }}
          >
            <span className="text-sm">{badge.emoji}</span>
            <div>
              <p className="text-[9px] text-[rgba(250,244,255,0.5)] leading-none mb-0.5">
                {badge.label}
              </p>
              <p
                className="text-[10px] font-dm font-500 leading-none"
                style={{ color: badge.color }}
              >
                {badge.value}
              </p>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

// Bouton store
interface StoreButtonProps {
  platform: "ios" | "android";
  label: string;
  sublabel: string;
  href: string;
}

function StoreButton({ platform, label, sublabel, href }: StoreButtonProps) {
  const Icon = platform === "ios" ? Apple : Play;

  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-5 py-3.5 rounded-brand bg-[rgba(250,244,255,0.06)] border border-[rgba(250,244,255,0.1)] hover:border-[rgba(247,37,133,0.4)] hover:bg-[rgba(247,37,133,0.06)] active:scale-[0.97] transition-all duration-200 group"
      aria-label={`Télécharger sur ${label}`}
    >
      <Icon
        size={22}
        className="text-[#faf4ff] group-hover:text-[#f72585] transition-colors duration-200"
      />
      <div className="text-left">
        <p className="text-[10px] text-[rgba(250,244,255,0.5)] leading-none mb-0.5 font-dm">
          {sublabel}
        </p>
        <p className="text-sm font-syne font-700 text-[#faf4ff] leading-none">
          {label}
        </p>
      </div>
    </Link>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Section d'introduction Mood2Fit"
    >
      {/* Vidéo de fond */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-20"
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        aria-hidden="true"
      >
        <source src={heroContent.videoSrc} type="video/mp4" />
      </video>

      {/* Overlay dégradé sombre */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#080010]/60 via-[#080010]/40 to-[#080010]" />
      <div className="absolute inset-0 bg-gradient-hero" />

      {/* Fallback radial si pas de vidéo */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-[#7209b7]/20 blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-[#f72585]/15 blur-[100px]" />
      </div>

      {/* Contenu */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-8 pt-24 md:pt-28 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[calc(100vh-7rem)]">

          {/* Colonne gauche */}
          <motion.div
            className="flex flex-col items-start gap-6 lg:gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Eyebrow */}
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-[rgba(247,37,133,0.1)] border border-[rgba(247,37,133,0.25)] text-xs font-dm font-500 text-[#f72585] tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f72585] animate-pulse" />
                {heroContent.eyebrow}
              </span>
            </motion.div>

            {/* Titre */}
            <motion.div variants={fadeInUp} className="space-y-1">
              <h1 className="font-syne font-800 text-5xl md:text-6xl lg:text-7xl text-[#faf4ff] leading-[0.95] tracking-tight">
                {heroContent.title.map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
                <span className="block gradient-text">
                  {heroContent.titleAccent}
                </span>
              </h1>
            </motion.div>

            {/* Sous-titre */}
            <motion.p
              variants={fadeInUp}
              className="text-base md:text-lg font-dm font-300 text-[rgba(250,244,255,0.65)] leading-relaxed max-w-md"
            >
              {heroContent.subtitle}
            </motion.p>

            {/* Boutons stores */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
            >
              {heroContent.storeButtons.map((btn) => (
                <StoreButton key={btn.platform} {...btn} />
              ))}
            </motion.div>

            {/* Preuve sociale */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-3"
            >
              {/* Avatars */}
              <div className="flex -space-x-2" aria-hidden="true">
                {heroContent.socialProof.avatarColors.map((color, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-[#080010] flex items-center justify-center text-xs font-700 text-[#faf4ff]"
                    style={{ backgroundColor: color }}
                  >
                    {["A", "K", "M", "L"][i]}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-dm font-500 text-[#faf4ff]">
                  {heroContent.socialProof.count}
                </p>
                <p className="text-xs font-dm text-[rgba(250,244,255,0.5)]">
                  {heroContent.socialProof.label}
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Colonne droite — Mockup téléphone */}
          <motion.div
            className="flex items-center justify-center relative"
            initial={{ opacity: 0, y: 60, rotateY: -20 }}
            animate={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <PhoneMockup />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          aria-hidden="true"
        >
          <span className="text-xs font-dm text-[rgba(250,244,255,0.3)] tracking-widest uppercase">
            Découvrir
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown
              size={18}
              className="text-[rgba(250,244,255,0.3)]"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
