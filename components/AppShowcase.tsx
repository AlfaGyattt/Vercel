"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { showcaseContent } from "@/data/content";
import { fadeInUp, staggerContainer } from "@/lib/utils";

// Contenu mockup pour chaque feature
const mockupScreens = {
  mood: (
    <div className="flex flex-col gap-2 p-3 pt-8 h-full">
      <p className="text-[8px] text-[rgba(250,244,255,0.5)] font-dm">Ton énergie aujourd&apos;hui</p>
      <div className="grid grid-cols-1 gap-1.5">
        {[
          { emoji: "💤", label: "Récupération", active: false },
          { emoji: "🚶", label: "Light", active: false },
          { emoji: "⚡", label: "Energique", active: true },
          { emoji: "🔥", label: "Beast Mode", active: false },
        ].map((item) => (
          <div
            key={item.label}
            className={`flex items-center gap-2 p-2 rounded-xl border transition-all ${
              item.active
                ? "bg-[rgba(247,37,133,0.2)] border-[rgba(247,37,133,0.4)]"
                : "bg-[rgba(250,244,255,0.03)] border-[rgba(250,244,255,0.06)]"
            }`}
          >
            <span className="text-sm">{item.emoji}</span>
            <span className={`text-[9px] font-dm font-500 ${item.active ? "text-[#f72585]" : "text-[rgba(250,244,255,0.5)]"}`}>
              {item.label}
            </span>
            {item.active && (
              <div className="ml-auto w-3 h-3 rounded-full bg-[#f72585] flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-auto p-2.5 rounded-xl bg-gradient-to-r from-[#f72585]/20 to-[#7209b7]/20 border border-[rgba(247,37,133,0.3)]">
        <p className="text-[8px] text-[rgba(250,244,255,0.5)] mb-0.5">3 partenaires disponibles</p>
        <p className="text-[9px] font-syne font-700 text-[#faf4ff]">Voir les matchs →</p>
      </div>
    </div>
  ),
  matching: (
    <div className="flex flex-col gap-2 p-3 pt-8 h-full">
      <p className="text-[8px] text-[rgba(250,244,255,0.5)] font-dm">Tes matchs du jour</p>
      {[
        { name: "Lucas", city: "Paris 11e", sport: "Muscu", score: 97, initial: "L", color: "#f72585" },
        { name: "Amina", city: "Montreuil", sport: "CrossFit", score: 89, initial: "A", color: "#7209b7" },
        { name: "Tom", city: "Paris 20e", sport: "Cardio", score: 82, initial: "T", color: "#4cc9f0" },
      ].map((user) => (
        <div key={user.name} className="flex items-center gap-2 p-2 rounded-xl bg-[rgba(250,244,255,0.04)] border border-[rgba(250,244,255,0.07)]">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-700 text-[#faf4ff] flex-shrink-0"
            style={{ background: `linear-gradient(135deg, ${user.color}, #7209b7)` }}
          >
            {user.initial}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[9px] font-dm font-500 text-[#faf4ff] truncate">{user.name} · {user.city}</p>
            <p className="text-[8px] text-[rgba(250,244,255,0.4)]">{user.sport}</p>
          </div>
          <div
            className="text-[9px] font-syne font-700 flex-shrink-0"
            style={{ color: user.color }}
          >
            {user.score}%
          </div>
        </div>
      ))}
      <div className="mt-auto h-1.5 rounded-full bg-[rgba(250,244,255,0.06)]">
        <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-[#4cc9f0] to-[#7209b7]" />
      </div>
    </div>
  ),
  challenges: (
    <div className="flex flex-col gap-2 p-3 pt-8 h-full">
      <p className="text-[8px] text-[rgba(250,244,255,0.5)] font-dm">Challenges actifs</p>
      {[
        { emoji: "💪", title: "100 tractions", progress: 73, color: "#06d6a0", team: false },
        { emoji: "🏃", title: "50km ce mois", progress: 40, color: "#4cc9f0", team: true },
        { emoji: "🔥", title: "7 séances / semaine", progress: 86, color: "#f72585", team: false },
      ].map((challenge) => (
        <div key={challenge.title} className="p-2 rounded-xl bg-[rgba(250,244,255,0.04)] border border-[rgba(250,244,255,0.07)]">
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="text-xs">{challenge.emoji}</span>
            <span className="text-[9px] font-dm font-500 text-[#faf4ff] flex-1">{challenge.title}</span>
            {challenge.team && (
              <span className="text-[7px] px-1.5 py-0.5 rounded-full bg-[rgba(76,201,240,0.2)] text-[#4cc9f0] border border-[rgba(76,201,240,0.3)]">
                Équipe
              </span>
            )}
          </div>
          <div className="w-full h-1 rounded-full bg-[rgba(250,244,255,0.08)]">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{
                width: `${challenge.progress}%`,
                background: `linear-gradient(90deg, ${challenge.color}, ${challenge.color}99)`,
              }}
            />
          </div>
          <p className="text-[7px] text-[rgba(250,244,255,0.3)] mt-1 text-right">{challenge.progress}%</p>
        </div>
      ))}
    </div>
  ),
};

type MockupKey = keyof typeof mockupScreens;

interface PhoneCardProps {
  feature: typeof showcaseContent.features[number];
  index: number;
}

function PhoneCard({ feature, index }: PhoneCardProps) {
  const isCentral = feature.isCentral;

  return (
    <motion.div
      variants={fadeInUp}
      className={`flex flex-col items-center gap-6 ${isCentral ? "relative z-10" : ""}`}
    >
      {/* Téléphone */}
      <div
        className={`relative ${
          isCentral ? "w-[200px] md:w-[230px]" : "w-[170px] md:w-[195px]"
        }`}
        style={{
          transform: isCentral
            ? "none"
            : index === 0
            ? "rotateY(15deg) rotateX(3deg)"
            : "rotateY(-15deg) rotateX(3deg)",
          perspective: "1000px",
        }}
      >
        {/* Glow */}
        <div
          className="absolute inset-0 blur-[40px] rounded-[50px] opacity-40"
          style={{
            background: `radial-gradient(circle, ${feature.accentColor}60, transparent)`,
          }}
        />

        {/* Corps */}
        <motion.div
          className="relative w-full aspect-[9/19.5] rounded-[32px] bg-[#0f0018] border overflow-hidden shadow-phone"
          style={{ borderColor: `${feature.accentColor}40` }}
          animate={{ y: [0, -8, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 1.3,
          }}
        >
          {/* Encoche */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#080010] rounded-b-2xl z-10" />

          {/* Contenu écran */}
          <div className="absolute inset-0 h-full overflow-hidden">
            {mockupScreens[feature.id as MockupKey]}
          </div>

          {/* Home indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-[rgba(250,244,255,0.2)] rounded-full" />
        </motion.div>
      </div>

      {/* Texte sous le téléphone */}
      <div className="text-center max-w-[200px]">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-xl">{feature.emoji}</span>
          <h3
            className="font-syne font-700 text-base text-[#faf4ff]"
          >
            {feature.title}
          </h3>
        </div>
        <p className="text-xs font-dm font-300 text-[rgba(250,244,255,0.5)] leading-relaxed">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function AppShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="features"
      className="section-padding relative overflow-hidden"
      aria-label="Fonctionnalités de l'application Mood2Fit"
    >
      {/* Fond */}
      <div className="absolute inset-0 bg-[#080010]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f0018]/50 to-transparent" />

      {/* Glow central */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#7209b7]/10 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          className="text-center mb-16 md:mb-24"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.span
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-[rgba(247,37,133,0.1)] border border-[rgba(247,37,133,0.25)] text-xs font-dm font-500 text-[#f72585] tracking-widest uppercase mb-5"
          >
            {showcaseContent.eyebrow}
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="font-syne font-800 text-4xl md:text-5xl lg:text-6xl text-[#faf4ff] leading-tight"
          >
            {showcaseContent.title}
          </motion.h2>
        </motion.div>

        {/* Téléphones */}
        <motion.div
          className="flex flex-col md:flex-row items-end justify-center gap-8 md:gap-4 lg:gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{ perspective: "1200px" }}
        >
          {showcaseContent.features.map((feature, i) => (
            <PhoneCard key={feature.id} feature={feature} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
