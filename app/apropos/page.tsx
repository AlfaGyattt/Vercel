"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Apple, Play } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fadeInUp, staggerContainer } from "@/lib/utils";

// ─── DONNÉES ────────────────────────────────────────────────

const floatingStats = [
  { value: "12k+", label: "Sportifs inscrits", delay: 0.3 },
  { value: "8 200", label: "Duos formés", delay: 0.5 },
  { value: "96%", label: "Satisfaction", delay: 0.7 },
  { value: "+30", label: "Villes", delay: 0.9 },
];

const tickerItems = [
  "Co-sport", "Musculation", "Street Workout", "Matching",
  "Challenges", "Communauté", "Paris", "Progression", "Duo",
  "Co-sport", "Musculation", "Street Workout", "Matching",
  "Challenges", "Communauté", "Paris", "Progression", "Duo",
];

const timeline = [
  {
    year: "2023",
    title: "L'idée naît d'une frustration",
    desc: "Heitor et Karim, amis de salle depuis 4 ans, réalisent qu'ils annulent leurs séances une fois sur deux. Incompatibilité d'horaires, niveaux qui divergent. Il doit exister un meilleur moyen.",
    emoji: "",
    side: "left",
  },
  {
    year: "2025",
    title: "Le premier prototype",
    desc: "La v1 est lancée en beta fermée à Paris. Des testeurs, 50 premiers utilisateurs. Le concept fonctionne.",
    emoji: "",
    side: "right",
  },
  {
    year: "2026",
    title: "Le concept prend forme",
    desc: "Matcher des sportifs non pas sur \"même sport\" mais sur niveau, zone, mood du moment et objectifs. Jade rejoint le projet pour le design, Alfayed pour la tech.",
    emoji: "",
    side: "left",
  },
];

const values = [
  {
    num: "01",
    icon: "",
    title: "Bienveillance",
    desc: "Le sport doit être un espace sûr et positif. On crée des connexions basées sur le respect mutuel, peu importe le niveau ou les objectifs.",
    color: "#f72585",
  },
  {
    num: "02",
    icon: "",
    title: "Progression",
    desc: "Chacun avance à son rythme. On célèbre les progrès, des premières tractions au muscle-up, des 5 kg aux 100 kg. Tout compte.",
    color: "#7209b7",
  },
  {
    num: "03",
    icon: "",
    title: "Communauté",
    desc: "Le sport seul c'est bien. Avec d'autres, c'est transformateur. On construit une communauté où les gens se soutiennent, se challengent, se motivent vraiment.",
    color: "#4cc9f0",
  },
];

const team = [
  {
    name: "Heitor Lavorata",
    role: "Fondateur de l'application",
    tag: "Chef de Projet",
    initials: "HL",
    bg: "from-[#3a0060] to-[#f72585]",
    color: "#f72585",
  },
  {
    name: "Jade",
    role: "Marketing & Design",
    tag: "Équipe de projet",
    initials: "JD",
    bg: "from-[#200010] to-[#7209b7]",
    color: "#7209b7",
  },
  {
    name: "Alfayed",
    role: "Developer Web",
    tag: "Équipe de projet",
    initials: "AF",
    bg: "from-[#100020] to-[#4cc9f0]",
    color: "#4cc9f0",
  },
];

// ─── COMPOSANTS ─────────────────────────────────────────────

function PhoneMockup() {
  return (
    <div className="relative w-[200px] h-[390px] mx-auto">
      {/* Glow */}
      <div className="absolute inset-0 blur-[50px] bg-gradient-to-b from-[#f72585]/30 to-[#7209b7]/20 scale-110 rounded-[60px]" />
      {/* Corps */}
      <div className="relative w-full h-full rounded-[36px] bg-[#0d0010] border-[2.5px] border-[rgba(247,37,133,0.45)] overflow-hidden shadow-phone">
        {/* Encoche */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[88px] h-[22px] bg-black rounded-b-2xl z-10" />
        {/* Contenu écran */}
        <div className="absolute inset-0 p-3 pt-8 flex flex-col gap-2">
          <div className="flex items-center justify-between mb-1">
            <div>
              <p className="text-[7px] text-[rgba(250,244,255,0.4)]">Bonjour,</p>
              <p className="text-[11px] font-syne font-800 text-[#faf4ff]">Heitor 👋</p>
            </div>
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#f72585] to-[#7209b7] flex items-center justify-center text-[9px] font-700">H</div>
          </div>
          <div className="rounded-xl bg-[rgba(247,37,133,0.1)] border border-[rgba(247,37,133,0.25)] p-2.5">
            <p className="text-[8px] font-syne font-700 text-[#faf4ff] mb-1.5">Mood du jour</p>
            <div className="grid grid-cols-3 gap-1">
              {[
                { e: "", l: "Energy", a: true },
                { e: "", l: "Calm", a: false },
                { e: "", l: "Beast", a: false },
              ].map((m) => (
                <div key={m.l} className={`rounded-lg p-1.5 text-center border ${m.a ? "bg-[rgba(247,37,133,0.2)] border-[rgba(247,37,133,0.5)]" : "bg-[rgba(250,244,255,0.03)] border-[rgba(250,244,255,0.06)]"}`}>
                  <div className="text-sm">{m.e}</div>
                  <div className={`text-[6px] mt-0.5 font-500 ${m.a ? "text-[#f72585]" : "text-[rgba(250,244,255,0.4)]"}`}>{m.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl bg-[rgba(250,244,255,0.04)] border border-[rgba(250,244,255,0.08)] p-2.5">
            <p className="text-[7px] text-[rgba(250,244,255,0.4)] mb-1.5">Ton match du jour</p>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#7209b7] to-[#f72585] flex items-center justify-center text-[9px] font-700 flex-shrink-0">K</div>
              <div className="flex-1">
                <p className="text-[8px] font-500 text-[#faf4ff]">Karim · Paris 19e</p>
                <p className="text-[7px] text-[rgba(250,244,255,0.4)]">Street Workout</p>
              </div>
              <span className="text-[9px] font-700 text-[#f72585]">97%</span>
            </div>
          </div>
          <div className="rounded-xl bg-[rgba(76,201,240,0.07)] border border-[rgba(76,201,240,0.15)] p-2.5">
            <p className="text-[7px] text-[rgba(250,244,255,0.4)] mb-1">Challenge actif</p>
            <p className="text-[8px] font-syne font-700 text-[#faf4ff] mb-1.5">100 dips en 7 jours</p>
            <div className="w-full h-1 rounded-full bg-[rgba(250,244,255,0.07)]">
              <div className="h-full w-3/5 rounded-full bg-gradient-to-r from-[#4cc9f0] to-[#06d6a0]" />
            </div>
          </div>
        </div>
        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-14 h-1 bg-[rgba(250,244,255,0.2)] rounded-full" />
      </div>
    </div>
  );
}

function TimelineSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="histoire" className="section-padding relative overflow-hidden bg-[#080010]" ref={ref}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(247,37,133,0.15)] to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-5 md:px-8">
        <motion.div
          className="mb-16"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.span variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-[rgba(247,37,133,0.1)] border border-[rgba(247,37,133,0.25)] text-xs font-dm font-500 text-[#f72585] tracking-widest uppercase mb-5">
            Notre parcours
          </motion.span>
          <motion.h2 variants={fadeInUp} className="font-syne font-800 text-4xl md:text-5xl text-[#faf4ff] leading-tight">
            Née d&apos;une séance{" "}
            <span className="gradient-text">ratée.</span>
          </motion.h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Ligne centrale */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-[rgba(247,37,133,0.15)] hidden md:block" />

          <div className="flex flex-col gap-12">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                className={`flex items-start gap-6 md:gap-0 ${item.side === "right" ? "md:flex-row-reverse" : ""}`}
                initial={{ opacity: 0, x: item.side === "left" ? -40 : 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.2 + 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Carte */}
                <div className={`flex-1 ${item.side === "left" ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <span className="text-xs font-dm font-500 text-[#f72585] tracking-widest uppercase mb-2 block">
                    {item.year}
                  </span>
                  <div className="p-5 rounded-brand bg-[#0f0018] border border-[rgba(250,244,255,0.08)] hover:border-[rgba(247,37,133,0.25)] transition-all duration-300">
                    <h3 className="font-syne font-700 text-base text-[#faf4ff] mb-2">{item.title}</h3>
                    <p className="text-sm font-dm font-300 text-[rgba(250,244,255,0.6)] leading-relaxed">{item.desc}</p>
                  </div>
                </div>

                {/* Point central */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[rgba(247,37,133,0.15)] border-2 border-[rgba(247,37,133,0.4)] flex items-center justify-center text-xl relative z-10 hidden md:flex">
                  {item.emoji}
                </div>

                {/* Espace vide côté opposé */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PAGE ────────────────────────────────────────────────────
export default function AProposPage() {
  const bentoRef = useRef<HTMLDivElement>(null);
  const bentoInView = useInView(bentoRef, { once: true, margin: "-100px" });
  const valuesRef = useRef<HTMLDivElement>(null);
  const valuesInView = useInView(valuesRef, { once: true, margin: "-100px" });
  const teamRef = useRef<HTMLDivElement>(null);
  const teamInView = useInView(teamRef, { once: true, margin: "-100px" });

  return (
    <>
      <Navbar />
      <main>

        {/* ── HERO ── */}
        <section className="relative min-h-screen flex items-center overflow-hidden bg-[#080010]">
          {/* Grille animée */}
          <div
            className="absolute inset-0 z-0 pointer-events-none opacity-40"
            style={{
              backgroundImage: `
                linear-gradient(rgba(247,37,133,.06) 1px, transparent 1px),
                linear-gradient(90deg, rgba(247,37,133,.06) 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px",
              animation: "gridDrift 18s linear infinite",
            }}
          />
          <style>{`@keyframes gridDrift{0%{transform:translate(0,0)}100%{transform:translate(80px,80px)}}`}</style>

          {/* Glows */}
          <div className="absolute -top-32 -left-20 w-[600px] h-[600px] rounded-full bg-[#b5179e]/20 blur-[100px] pointer-events-none animate-float" />
          <div className="absolute -bottom-20 -right-10 w-[500px] h-[500px] rounded-full bg-[#f72585]/15 blur-[100px] pointer-events-none animate-float-delay" />
          <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-[#4cc9f0]/08 blur-[80px] pointer-events-none animate-float-delay2" />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-8 pt-28 pb-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">

              {/* Gauche */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-7"
              >
                <motion.span variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-[rgba(247,37,133,0.1)] border border-[rgba(247,37,133,0.25)] text-xs font-dm font-500 text-[#f72585] tracking-widest uppercase w-fit">
                  Notre histoire
                </motion.span>

                <motion.h1 variants={fadeInUp} className="font-syne font-800 text-5xl md:text-6xl lg:text-7xl text-[#faf4ff] leading-[0.95] tracking-tight">
                  &ldquo;On a créé<br />l&apos;app qu&apos;on<br />aurait{" "}
                  <span className="gradient-text">aimé avoir.&rdquo;</span>
                </motion.h1>

                <motion.p variants={fadeInUp} className="text-base md:text-lg font-dm font-300 text-[rgba(250,244,255,0.65)] leading-relaxed max-w-md">
                  Mood2Fit est née d&apos;une conviction simple : le sport est meilleur quand il se partage. Mais trouver le bon partenaire avec le même niveau, les mêmes énergies ou les mêmes objectifs c&apos;est souvent compliqué.
                </motion.p>

                <motion.div variants={fadeInUp} className="flex flex-wrap gap-3">
                  <Link href="/" className="inline-flex items-center gap-2 px-7 py-4 rounded-pill bg-gradient-brand text-white font-dm font-500 text-sm hover:opacity-90 active:scale-[0.98] transition-all duration-200 shadow-glow">
                    Rejoindre la communauté →
                  </Link>
                  <Link href="#histoire" className="inline-flex items-center gap-2 px-7 py-4 rounded-pill border border-[rgba(250,244,255,0.15)] text-[rgba(250,244,255,0.7)] font-dm font-500 text-sm hover:border-[rgba(247,37,133,0.4)] hover:text-[#faf4ff] transition-all duration-200">
                    Notre histoire ↓
                  </Link>
                </motion.div>
              </motion.div>

              {/* Droite — Téléphone + stats flottantes */}
              <motion.div
                className="relative flex items-center justify-center h-[520px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <PhoneMockup />

                {/* Stats flottantes */}
                {floatingStats.map((stat, i) => {
                  const positions = [
                    "top-[8%] left-[5%]",
                    "top-[35%] right-[0%]",
                    "bottom-[12%] left-[20%]",
                    "top-[60%] left-[-5%]",
                  ];
                  return (
                    <motion.div
                      key={stat.label}
                      className={`absolute ${positions[i]} bg-[rgba(18,0,26,0.85)] backdrop-blur-xl border border-[rgba(247,37,133,0.22)] rounded-[20px] px-6 py-5 flex flex-col gap-1.5`}
                      style={{ boxShadow: "0 0 0 0 transparent" }}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: stat.delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-[20px] bg-gradient-brand" />
                      <span className="font-syne font-800 text-3xl gradient-text leading-none">{stat.value}</span>
                      <span className="text-xs font-dm font-500 text-[rgba(250,244,255,0.55)]">{stat.label}</span>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── TICKER ── */}
        <div className="relative bg-[#0f0018] border-y border-[rgba(247,37,133,0.1)] py-3.5 overflow-hidden">
          <div className="flex whitespace-nowrap" style={{ animation: "tickerScroll 22s linear infinite" }}>
            {tickerItems.map((item, i) => (
              <span key={i} className="inline-flex items-center gap-5 px-10 font-syne text-xs font-700 tracking-[.12em] uppercase text-[rgba(250,244,255,0.35)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f72585] flex-shrink-0" />
                {item}
              </span>
            ))}
          </div>
          <style>{`@keyframes tickerScroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
        </div>

        {/* ── BENTO QUI SOMMES-NOUS ── */}
        <section className="section-padding relative overflow-hidden bg-[#0f0018]" ref={bentoRef}>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(247,37,133,0.15)] to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8">
            <motion.div
              className="mb-12"
              variants={staggerContainer}
              initial="hidden"
              animate={bentoInView ? "visible" : "hidden"}
            >
              <motion.span variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-[rgba(247,37,133,0.1)] border border-[rgba(247,37,133,0.25)] text-xs font-dm font-500 text-[#f72585] tracking-widest uppercase mb-5">
                Qui sommes-nous
              </motion.span>
              <motion.h2 variants={fadeInUp} className="font-syne font-800 text-4xl md:text-5xl text-[#faf4ff] leading-tight">
                Une équipe de{" "}
                <span className="gradient-text">sportifs</span>
                <br />qui ont résolu leur problème.
              </motion.h2>
            </motion.div>

            {/* Grille bento */}
            <motion.div
              className="grid grid-cols-12 gap-4"
              variants={staggerContainer}
              initial="hidden"
              animate={bentoInView ? "visible" : "hidden"}
            >
              {/* Card principale */}
              <motion.div
                variants={fadeInUp}
                className="col-span-12 md:col-span-7 row-span-2 p-7 md:p-9 rounded-brand bg-gradient-card glow-border relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-brand" />
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#f72585]/08 blur-[60px] rounded-full" />
                <div className="text-5xl mb-5"></div>
                <h3 className="font-syne font-800 text-2xl md:text-3xl text-[#faf4ff] leading-tight mb-4">
                  Des passionnés,<br />
                  pas des <span className="gradient-text">marketeurs.</span>
                </h3>
                <p className="text-sm md:text-base font-dm font-300 text-[rgba(250,244,255,0.65)] leading-relaxed mb-3">
                  Mood2Fit, c&apos;est une équipe de 3 personnes basée à Paris. On pratique la musculation, le street workout, la callisthénie et on a tous vécu la même frustration : impossible de trouver facilement un partenaire d&apos;entraînement fiable et compatible.
                </p>
                <p className="text-sm md:text-base font-dm font-300 text-[rgba(250,244,255,0.65)] leading-relaxed">
                  On n&apos;a pas eu &ldquo;l&apos;idée d&apos;une app&rdquo;. On a résolu notre propre problème et réalisé que des millions de gens avaient le même.
                </p>
              </motion.div>

              {/* Stat 2023 */}
              <motion.div
                variants={fadeInUp}
                className="col-span-6 md:col-span-5 p-6 rounded-brand bg-[#160022] border border-[rgba(250,244,255,0.07)] hover:border-[rgba(247,37,133,0.25)] transition-all duration-300 flex flex-col gap-2"
              >
                <span className="font-syne font-800 text-5xl gradient-text leading-none">2023</span>
                <span className="text-sm font-dm text-[rgba(250,244,255,0.5)]">Année de création</span>
              </motion.div>

              {/* Stat 3 */}
              <motion.div
                variants={fadeInUp}
                className="col-span-6 md:col-span-5 p-6 rounded-brand bg-[#160022] border border-[rgba(250,244,255,0.07)] hover:border-[rgba(247,37,133,0.25)] transition-all duration-300 flex flex-col gap-2"
              >
                <span className="font-syne font-800 text-5xl gradient-text leading-none">3</span>
                <span className="text-sm font-dm text-[rgba(250,244,255,0.5)]">Personnes dans l&apos;équipe</span>
              </motion.div>

              {/* Quote */}
              <motion.div
                variants={fadeInUp}
                className="col-span-12 p-6 md:p-8 rounded-brand bg-[#160022] border border-[rgba(250,244,255,0.07)] flex items-center gap-6 flex-wrap"
              >
                <span className="font-syne font-800 text-8xl text-[#f72585]/20 leading-none flex-shrink-0">&ldquo;</span>
                <p className="font-syne font-700 text-lg md:text-2xl text-[#faf4ff] leading-snug">
                  Le sport n&apos;est pas une corvée quand tu as la{" "}
                  <span className="gradient-text">bonne compagnie.</span>
                </p>
              </motion.div>

              {/* Tags disciplines */}
              {[
                { icon: "", title: "Musculation", desc: "Notre discipline de cœur. La salle, les barres, les kilos." },
                { icon: "", title: "Street Workout", desc: "Les barres de parc, l'air libre, la liberté du mouvement." },
                { icon: "", title: "HIIT", desc: "Repousser ses limites, ensemble. Toujours plus loin." },
              ].map((tag, i) => (
                <motion.div
                  key={tag.title}
                  variants={fadeInUp}
                  className="col-span-12 md:col-span-4 p-6 rounded-brand bg-[#160022] border border-[rgba(250,244,255,0.07)] hover:border-[rgba(247,37,133,0.25)] transition-all duration-300 group"
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">{tag.icon}</div>
                  <p className="font-syne font-800 text-sm text-[#faf4ff] mb-2">{tag.title}</p>
                  <p className="text-xs font-dm text-[rgba(250,244,255,0.5)] leading-relaxed">{tag.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── TIMELINE ── */}
        <TimelineSection />

        {/* ── VALEURS ── */}
        <section className="section-padding relative overflow-hidden bg-[#0f0018]" ref={valuesRef}>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(247,37,133,0.15)] to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(247,37,133,0.15)] to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8">
            <motion.div
              className="text-center mb-14"
              variants={staggerContainer}
              initial="hidden"
              animate={valuesInView ? "visible" : "hidden"}
            >
              <motion.span variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-[rgba(247,37,133,0.1)] border border-[rgba(247,37,133,0.25)] text-xs font-dm font-500 text-[#f72585] tracking-widest uppercase mb-5">
                Ce qu&apos;on croit vraiment
              </motion.span>
              <motion.h2 variants={fadeInUp} className="font-syne font-800 text-4xl md:text-5xl text-[#faf4ff] leading-tight">
                Nos <span className="gradient-text">valeurs.</span>
              </motion.h2>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-3 gap-5"
              variants={staggerContainer}
              initial="hidden"
              animate={valuesInView ? "visible" : "hidden"}
            >
              {values.map((val, i) => (
                <motion.div
                  key={val.num}
                  variants={fadeInUp}
                  className="relative flex flex-col gap-4 p-7 md:p-9 rounded-brand bg-[#160022] border border-[rgba(250,244,255,0.07)] hover:border-[rgba(247,37,133,0.3)] hover:-translate-y-2 transition-all duration-300 overflow-hidden group"
                  style={{ marginTop: i === 1 ? "40px" : i === 2 ? "20px" : "0" }}
                >
                  {/* Ligne top hover */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-brand scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-t-brand" />
                  {/* Numéro décoratif */}
                  <span className="absolute right-4 bottom-2 font-syne font-800 text-[100px] leading-none text-[rgba(247,37,133,0.05)] pointer-events-none select-none">
                    {val.num}
                  </span>
                  <span className="text-4xl">{val.icon}</span>
                  <h3 className="font-syne font-800 text-xl text-[#faf4ff]">{val.title}</h3>
                  <p className="text-sm font-dm font-300 text-[rgba(250,244,255,0.6)] leading-relaxed relative z-10">{val.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── ÉQUIPE ── */}
        <section className="section-padding relative overflow-hidden bg-[#080010]" ref={teamRef}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#7209b7]/06 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8">
            <motion.div
              className="text-center mb-14"
              variants={staggerContainer}
              initial="hidden"
              animate={teamInView ? "visible" : "hidden"}
            >
              <motion.span variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-[rgba(247,37,133,0.1)] border border-[rgba(247,37,133,0.25)] text-xs font-dm font-500 text-[#f72585] tracking-widest uppercase mb-5">
                Les visages
              </motion.span>
              <motion.h2 variants={fadeInUp} className="font-syne font-800 text-4xl md:text-5xl text-[#faf4ff] leading-tight">
                Celles et ceux qui<br />
                font <span className="gradient-text">Mood2Fit.</span>
              </motion.h2>
            </motion.div>

            <motion.div
              className="flex flex-wrap justify-center gap-5"
              variants={staggerContainer}
              initial="hidden"
              animate={teamInView ? "visible" : "hidden"}
            >
              {team.map((member) => (
                <motion.div
                  key={member.name}
                  variants={fadeInUp}
                  className="w-[280px] rounded-[20px] overflow-hidden bg-[#0f0018] border border-[rgba(250,244,255,0.08)] hover:border-[rgba(247,37,133,0.3)] hover:-translate-y-2 hover:shadow-card transition-all duration-300 group cursor-pointer relative"
                >
                  {/* Image / Avatar */}
                  <div className={`h-[220px] bg-gradient-to-br ${member.bg} flex items-center justify-center relative overflow-hidden`}>
                    <span className="font-syne font-800 text-6xl text-white/20">{member.initials}</span>
                    {/* Overlay hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0010]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="font-syne text-xs font-700 tracking-[.12em] uppercase text-[rgba(247,37,133,0.9)]">
                        {member.tag}
                      </span>
                    </div>
                  </div>
                  {/* Infos */}
                  <div className="p-5">
                    <p className="font-syne font-700 text-base text-[#faf4ff] mb-1">{member.name}</p>
                    <p className="text-xs font-dm text-[rgba(250,244,255,0.45)]">{member.role}</p>
                  </div>
                  {/* Ligne bottom hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-brand scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="relative py-28 md:py-40 overflow-hidden bg-[#080010]">
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(181,23,158,0.2) 0%, transparent 65%)" }} />

          <div className="relative z-10 max-w-4xl mx-auto px-5 md:px-8 text-center">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col items-center gap-7"
            >
              <motion.span variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-[rgba(247,37,133,0.1)] border border-[rgba(247,37,133,0.25)] text-xs font-dm font-500 text-[#f72585] tracking-widest uppercase">
                Rejoins l&apos;aventure
              </motion.span>
              <motion.h2 variants={fadeInUp} className="font-syne font-800 text-5xl md:text-6xl lg:text-7xl text-[#faf4ff] leading-tight tracking-tight">
                Tu n&apos;as plus<br />d&apos;excuse pour<br />
                <span className="gradient-text">t&apos;entraîner seul.</span>
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-base font-dm font-300 text-[rgba(250,244,255,0.6)] max-w-md leading-relaxed">
                12 400 sportifs t&apos;attendent déjà. Crée ton profil en 2 minutes, reçois tes premiers matchs instantanément.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                {[
                  { platform: "ios", label: "App Store", sub: "Disponible sur iOS" },
                  { platform: "android", label: "Google Play", sub: "Disponible sur Android" },
                ].map((btn) => (
                  <Link
                    key={btn.platform}
                    href="/"
                    className="flex items-center gap-4 px-7 py-4 rounded-brand border border-[rgba(247,37,133,0.3)] bg-[rgba(247,37,133,0.06)] hover:bg-[rgba(247,37,133,0.12)] hover:border-[rgba(247,37,133,0.5)] active:scale-[0.97] transition-all duration-200"
                  >
                    {btn.platform === "ios"
                      ? <Apple size={24} className="text-[#faf4ff]" />
                      : <Play size={24} className="text-[#faf4ff]" />
                    }
                    <div className="text-left">
                      <p className="text-[10px] text-[rgba(250,244,255,0.5)]">{btn.sub}</p>
                      <p className="text-base font-syne font-700 text-[#faf4ff]">{btn.label}</p>
                    </div>
                  </Link>
                ))}
              </motion.div>
              <motion.p variants={fadeInUp} className="text-xs text-[rgba(250,244,255,0.3)]">
                Bientôt disponible sur les stores
              </motion.p>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
