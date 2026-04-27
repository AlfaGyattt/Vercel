"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Apple, Play, ArrowRight, Zap, Target, Trophy, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fadeInUp, staggerContainer } from "@/lib/utils";

// ─── DONNÉES ────────────────────────────────────────────────
const features = [
  {
    id: "mood",
    index: "01",
    tag: "Mood Intelligent",
    title: "Ton humeur",
    titleLine2: "guide",
    titleAccent: "ta séance.",
    body1:
      "Chaud, motivé ou dans ta bulle — l'app s'adapte à ton énergie du moment et te propose des entraînements qui correspondent vraiment à ton état du jour.",
    body2:
      "Tu choisis ton mood, l'app fait le reste. Elle sélectionne les partenaires disponibles autour de toi qui partagent la même intensité que toi ce jour-là.",
    cta: "Essayer gratuitement",
    accentColor: "#f72585",
    phoneLeft: false,
    screen: "mood",
  },
  {
    id: "matching",
    index: "02",
    tag: "Matching Social",
    title: "Le bon partenaire,",
    titleLine2: "au bon",
    titleAccent: "moment.",
    body1:
      "Notre algorithme ne fait pas que matcher des sportifs — il crée des rencontres. Discipline, niveau, localisation, disponibilité et mood : tout est pris en compte.",
    body2:
      "Parce que s'entraîner avec quelqu'un qui te ressemble change tout. La motivation dure, les abandons disparaissent, et le sport devient un rendez-vous.",
    cta: "Voir comment ça marche",
    accentColor: "#4cc9f0",
    phoneLeft: true,
    screen: "matching",
  },
  {
    id: "challenges",
    index: "03",
    tag: "Challenges & Progression",
    title: "Dépasse-toi",
    titleLine2: "avec les",
    titleAccent: "autres.",
    body1:
      "Des défis hebdomadaires solo ou en équipe. Grimpe dans le classement, débloque des badges, et reste motivé même les jours sans.",
    body2:
      "Le meilleur moyen de tenir sur la durée, c'est d'avoir des gens qui comptent sur toi. Les challenges Mood2Fit transforment chaque séance en moment partagé.",
    cta: "Rejoindre un challenge",
    accentColor: "#06d6a0",
    phoneLeft: false,
    screen: "challenges",
  },
];

const activities = [
  { emoji: "🏋️", name: "Musculation", desc: "Force & hypertrophie" },
  { emoji: "🤸", name: "Street Workout", desc: "Calisténie urbaine" },
  { emoji: "🔱", name: "Powerlifting", desc: "Force maximale" },
  { emoji: "💪", name: "Callisténie", desc: "Poids du corps" },
  { emoji: "🔥", name: "HIIT", desc: "Cardio intensif" },
  { emoji: "⚔️", name: "CrossFit", desc: "Fonctionnel" },
  { emoji: "🏃", name: "Running", desc: "Endurance" },
  { emoji: "🚴", name: "Cyclisme", desc: "Route & piste" },
  { emoji: "🧘", name: "Yoga", desc: "Corps & esprit" },
  { emoji: "🥊", name: "Boxe", desc: "Combat & cardio" },
  { emoji: "🏊", name: "Natation", desc: "Eau & endurance" },
  { emoji: "➕", name: "Et plus encore…", desc: "Toutes disciplines" },
];

// ─── MOCKUPS TÉLÉPHONE ──────────────────────────────────────
function MoodScreen() {
  return (
    <div className="flex flex-col gap-3 p-3 pt-10 h-full">
      <div>
        <p className="text-[8px] text-[rgba(250,244,255,0.4)] font-dm">Bonjour,</p>
        <p className="text-[13px] font-syne font-800 text-[#faf4ff]">Alex 👋</p>
      </div>
      <div className="rounded-xl bg-[rgba(250,244,255,0.05)] border border-[rgba(250,244,255,0.08)] p-3">
        <p className="text-[9px] font-syne font-700 text-[#faf4ff] mb-2">Mood du jour</p>
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { emoji: "⚡", label: "J'ai de l'énergie", desc: "Séances dynamiques", active: true, color: "#f72585" },
            { emoji: "💜", label: "Moyenne motivation", desc: "Mouvements simples", active: false, color: "#7209b7" },
            { emoji: "🌙", label: "Pas motivé·e", desc: "Micro-séances", active: false, color: "#4cc9f0" },
          ].map((m) => (
            <div key={m.label} className={`rounded-lg p-2 border ${m.active ? "border-[rgba(247,37,133,0.5)] bg-[rgba(247,37,133,0.15)]" : "border-[rgba(250,244,255,0.06)] bg-[rgba(250,244,255,0.03)]"}`}>
              <div className="text-base mb-1">{m.emoji}</div>
              <p className={`text-[7px] font-syne font-700 leading-tight mb-1 ${m.active ? "text-[#f72585]" : "text-[rgba(250,244,255,0.7)]"}`}>{m.label}</p>
              <p className="text-[6px] text-[rgba(250,244,255,0.4)] leading-tight">{m.desc}</p>
              <p className={`text-[6px] mt-1 font-500 ${m.active ? "text-[#f72585]" : "text-[rgba(250,244,255,0.4)]"}`}>Voir &gt;</p>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-xl bg-[rgba(250,244,255,0.05)] border border-[rgba(250,244,255,0.08)] p-3">
        <div className="flex items-center justify-between mb-1">
          <p className="text-[9px] font-syne font-700 text-[#faf4ff]">Rejoins une séance</p>
          <span className="text-sm">📍</span>
        </div>
        <p className="text-[7px] text-[rgba(250,244,255,0.5)] mb-2">Des activités proches, compatibles avec ton profil.</p>
        <div className="w-full py-2 rounded-lg bg-gradient-to-r from-[#f72585] to-[#7209b7] text-center text-[8px] font-syne font-700 text-white">Explorer la carte</div>
      </div>
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-[9px] font-syne font-700 text-[#faf4ff]">Feed</p>
          <p className="text-[8px] text-[#7209b7]">Filtres</p>
        </div>
        <div className="rounded-xl bg-[rgba(250,244,255,0.04)] border border-[rgba(250,244,255,0.07)] p-2.5 flex gap-2">
          <div className="w-6 h-6 rounded-full bg-[#f72585] flex items-center justify-center text-[8px] font-700 flex-shrink-0">H</div>
          <div>
            <div className="flex justify-between"><p className="text-[8px] font-500">Alex</p><p className="text-[7px] text-[rgba(250,244,255,0.3)]">il y a 1j</p></div>
            <p className="text-[7px] text-[rgba(250,244,255,0.6)] mt-0.5">1 min consacrées aujourd'hui à mes pecs doux !</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MatchingScreen() {
  return (
    <div className="flex flex-col gap-3 p-3 pt-10 h-full">
      <p className="text-[9px] font-syne font-700 text-[#faf4ff]">Tes matchs du jour</p>
      {[
        { name: "Lucas", city: "Paris 11e", sport: "Muscu", score: 97, color: "#f72585", mood: "⚡" },
        { name: "Amina", city: "Montreuil", sport: "CrossFit", score: 89, color: "#7209b7", mood: "🔥" },
        { name: "Tom", city: "Paris 20e", sport: "Running", score: 82, color: "#4cc9f0", mood: "💜" },
      ].map((u) => (
        <div key={u.name} className="flex items-center gap-2 p-2.5 rounded-xl bg-[rgba(250,244,255,0.04)] border border-[rgba(250,244,255,0.08)]">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-700 text-white flex-shrink-0" style={{ background: `linear-gradient(135deg, ${u.color}, #7209b7)` }}>{u.name[0]}</div>
          <div className="flex-1">
            <p className="text-[9px] font-500 text-[#faf4ff]">{u.name} · {u.city}</p>
            <p className="text-[8px] text-[rgba(250,244,255,0.45)]">{u.sport} {u.mood}</p>
          </div>
          <div>
            <p className="text-[10px] font-700 text-right" style={{ color: u.color }}>{u.score}%</p>
            <p className="text-[7px] text-[rgba(250,244,255,0.3)]">match</p>
          </div>
        </div>
      ))}
      <div className="mt-auto p-3 rounded-xl bg-[rgba(76,201,240,0.08)] border border-[rgba(76,201,240,0.2)]">
        <p className="text-[8px] font-dm text-[rgba(250,244,255,0.5)] mb-1">Critères de matching</p>
        <div className="flex flex-wrap gap-1">
          {["Discipline", "Niveau", "Localisation", "Mood", "Dispo"].map((tag) => (
            <span key={tag} className="text-[7px] px-1.5 py-0.5 rounded-full bg-[rgba(76,201,240,0.15)] border border-[rgba(76,201,240,0.3)] text-[#4cc9f0]">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChallengesScreen() {
  return (
    <div className="flex flex-col gap-3 p-3 pt-10 h-full">
      <p className="text-[9px] font-syne font-700 text-[#faf4ff]">Challenges actifs</p>
      {[
        { emoji: "💪", title: "100 tractions", progress: 73, color: "#06d6a0", pts: "+420pts", team: false },
        { emoji: "🏃", title: "50km ce mois", progress: 40, color: "#4cc9f0", pts: "+200pts", team: true },
        { emoji: "🔥", title: "7 séances/sem", progress: 86, color: "#f72585", pts: "+350pts", team: false },
      ].map((c) => (
        <div key={c.title} className="p-2.5 rounded-xl bg-[rgba(250,244,255,0.04)] border border-[rgba(250,244,255,0.08)]">
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-sm">{c.emoji}</span>
            <span className="text-[9px] font-500 text-[#faf4ff] flex-1">{c.title}</span>
            {c.team && <span className="text-[7px] px-1.5 py-0.5 rounded-full bg-[rgba(76,201,240,0.15)] text-[#4cc9f0] border border-[rgba(76,201,240,0.3)]">Équipe</span>}
            <span className="text-[8px] font-700" style={{ color: c.color }}>{c.pts}</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-[rgba(250,244,255,0.07)]">
            <div className="h-full rounded-full" style={{ width: `${c.progress}%`, background: `linear-gradient(90deg, ${c.color}, ${c.color}88)` }} />
          </div>
          <p className="text-[7px] text-[rgba(250,244,255,0.3)] mt-1 text-right">{c.progress}%</p>
        </div>
      ))}
      <div className="mt-auto rounded-xl bg-[rgba(247,37,133,0.08)] border border-[rgba(247,37,133,0.2)] p-2.5">
        <p className="text-[8px] text-[rgba(250,244,255,0.5)] mb-1.5">Classement cette semaine</p>
        {[{ rank: "🥇", name: "Karim", pts: "1240" }, { rank: "🥈", name: "Inès", pts: "980" }, { rank: "🥉", name: "Alex (toi)", pts: "860" }].map((r) => (
          <div key={r.name} className="flex items-center gap-2 py-0.5">
            <span className="text-[10px]">{r.rank}</span>
            <span className="text-[8px] text-[#faf4ff] flex-1">{r.name}</span>
            <span className="text-[8px] font-700 text-[#f72585]">{r.pts}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const screens: Record<string, React.ReactNode> = {
  mood: <MoodScreen />,
  matching: <MatchingScreen />,
  challenges: <ChallengesScreen />,
};

// ─── COMPOSANT TÉLÉPHONE ────────────────────────────────────
function Phone({ screen, accentColor, delay = 0 }: { screen: string; accentColor: string; delay?: number }) {
  return (
    <div className="relative w-[240px] md:w-[280px] mx-auto">
      <div className="absolute inset-0 blur-[60px] rounded-[60px] opacity-40" style={{ background: `radial-gradient(circle, ${accentColor}60, transparent)` }} />
      <motion.div
        className="relative w-full aspect-[9/19.5] rounded-[40px] bg-[#0f0018] border overflow-hidden shadow-phone"
        style={{ borderColor: `${accentColor}40` }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#080010] rounded-b-2xl z-10" />
        <div className="absolute inset-0 overflow-hidden">{screens[screen]}</div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-[rgba(250,244,255,0.15)] rounded-full" />
      </motion.div>
    </div>
  );
}

// ─── SECTION FEATURE ────────────────────────────────────────
function FeatureSection({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const textCol = (
    <motion.div
      className="flex flex-col gap-6 justify-center"
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.div variants={fadeInUp} className="flex items-center gap-3">
        <span className="text-xs font-dm font-500 tracking-widest" style={{ color: feature.accentColor }}>
          {feature.index} · {feature.tag.toUpperCase()}
        </span>
      </motion.div>

      <motion.h2 variants={fadeInUp} className="font-syne font-800 text-5xl md:text-6xl leading-[0.92] tracking-tight text-[#faf4ff]">
        {feature.title}<br />
        {feature.titleLine2}<br />
        <span style={{ color: feature.accentColor }}>{feature.titleAccent}</span>
      </motion.h2>

      <motion.p variants={fadeInUp} className="text-base font-dm font-300 text-[rgba(250,244,255,0.65)] leading-relaxed max-w-md">
        {feature.body1}
      </motion.p>
      <motion.p variants={fadeInUp} className="text-base font-dm font-300 text-[rgba(250,244,255,0.65)] leading-relaxed max-w-md">
        {feature.body2}
      </motion.p>

      <motion.div variants={fadeInUp}>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-7 py-4 rounded-pill text-white font-dm font-500 text-sm hover:opacity-90 active:scale-[0.98] transition-all duration-200 shadow-glow"
          style={{ background: `linear-gradient(135deg, ${feature.accentColor}, #7209b7)` }}
        >
          {feature.cta}
          <ArrowRight size={16} />
        </Link>
      </motion.div>
    </motion.div>
  );

  const phoneCol = (
    <motion.div
      className="flex items-center justify-center"
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <Phone screen={feature.screen} accentColor={feature.accentColor} delay={index * 0.5} />
    </motion.div>
  );

  return (
    <section ref={ref} className="section-padding relative overflow-hidden" style={{ background: index % 2 === 0 ? "#080010" : "#0f0018" }}>
      {index % 2 === 0 && <div className="absolute inset-0 bg-gradient-hero opacity-50 pointer-events-none" />}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(247,37,133,0.1)] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {feature.phoneLeft ? (
            <>{phoneCol}{textCol}</>
          ) : (
            <>{textCol}{phoneCol}</>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── SECTION ACTIVITÉS ──────────────────────────────────────
function ActivitiesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding relative overflow-hidden bg-[#080010]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#7209b7]/08 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(247,37,133,0.15)] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8" ref={ref}>
        <motion.div
          className="text-center mb-16"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.span variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-[rgba(247,37,133,0.1)] border border-[rgba(247,37,133,0.25)] text-xs font-dm font-500 text-[#f72585] tracking-widest uppercase mb-5">
            <Users size={12} /> Toutes les disciplines
          </motion.span>
          <motion.h2 variants={fadeInUp} className="font-syne font-800 text-4xl md:text-5xl lg:text-6xl text-[#faf4ff] leading-tight mb-4">
            Peu importe ton sport,<br />
            <span className="gradient-text">trouve ta tribu.</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-base font-dm font-300 text-[rgba(250,244,255,0.55)] max-w-xl mx-auto">
            Mood2Fit couvre toutes les disciplines. Parce que le lien social dépasse largement les frontières du sport.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {activities.map((activity) => (
            <motion.div
              key={activity.name}
              variants={fadeInUp}
              className="flex flex-col items-center gap-3 p-5 rounded-brand bg-gradient-card glow-border hover:border-[rgba(247,37,133,0.3)] hover:bg-[rgba(247,37,133,0.06)] transition-all duration-300 cursor-default group"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{activity.emoji}</span>
              <div className="text-center">
                <p className="text-sm font-syne font-700 text-[#faf4ff] leading-tight">{activity.name}</p>
                <p className="text-xs font-dm text-[rgba(250,244,255,0.4)] mt-0.5">{activity.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── CTA FINAL ──────────────────────────────────────────────
function CtaSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 md:py-36 overflow-hidden animated-gradient-bg">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 60%)" }} />
      <div className="absolute top-0 left-0 right-0 h-px bg-white/20" />

      <div className="relative z-10 max-w-4xl mx-auto px-5 md:px-8 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col items-center gap-6"
        >
          <motion.h2 variants={fadeInUp} className="font-syne font-800 text-5xl md:text-6xl text-white leading-tight">
            Prêt à ne plus<br />t'entraîner seul ?
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-base font-dm font-300 text-white/75 max-w-md">
            Rejoins la communauté Mood2Fit et trouve ton partenaire dès aujourd'hui.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 mt-2">
            {[
              { platform: "ios", label: "App Store", sub: "Disponible sur iOS" },
              { platform: "android", label: "Google Play", sub: "Disponible sur Android" },
            ].map((btn) => (
              <Link
                key={btn.platform}
                href="/"
                className="flex items-center gap-4 px-7 py-4 rounded-brand bg-white/10 backdrop-blur-sm border border-white/25 hover:bg-white/20 active:scale-[0.97] transition-all duration-200"
              >
                {btn.platform === "ios" ? <Apple size={24} className="text-white" /> : <Play size={24} className="text-white" />}
                <div className="text-left">
                  <p className="text-[10px] text-white/60">{btn.sub}</p>
                  <p className="text-base font-syne font-700 text-white">{btn.label}</p>
                </div>
              </Link>
            ))}
          </motion.div>
          <motion.p variants={fadeInUp} className="text-xs text-white/40">Bientôt disponible sur les stores</motion.p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── PAGE ────────────────────────────────────────────────────
export default function FonctionnalitesPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero de la page */}
        <section className="relative pt-32 pb-16 overflow-hidden bg-[#080010]">
          <div className="absolute inset-0 bg-gradient-hero opacity-60 pointer-events-none" />
          <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#7209b7]/15 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 text-center">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center gap-5"
            >
              <motion.span variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-[rgba(247,37,133,0.1)] border border-[rgba(247,37,133,0.25)] text-xs font-dm font-500 text-[#f72585] tracking-widest uppercase">
                <Zap size={12} /> Fonctionnalités
              </motion.span>
              <motion.h1 variants={fadeInUp} className="font-syne font-800 text-5xl md:text-7xl text-[#faf4ff] leading-tight tracking-tight">
                Conçu pour<br />
                <span className="gradient-text">créer du lien.</span>
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-lg font-dm font-300 text-[rgba(250,244,255,0.6)] max-w-xl leading-relaxed">
                Le sport est le prétexte. Ce qu'on construit vraiment, c'est la connexion entre les gens.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Sections features alternées */}
        {features.map((feature, i) => (
          <FeatureSection key={feature.id} feature={feature} index={i} />
        ))}

        {/* Grille activités */}
        <ActivitiesSection />

        {/* CTA */}
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
