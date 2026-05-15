"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BASE_SLIDES = [
  { id: "mood", num: "01", title: "Ton humeur,\nta séance.", desc: "Que tu sois au top ou dans ta bulle, l'app s'adapte à ton énergie et te propose la séance qu'il te faut.", color: "#f72585", screen: "mood" },
  { id: "matching", num: "02", title: "Le bon\npartenaire.", desc: "Niveau, disponibilités, mood. L'algorithme trouve les profils qui te correspondent vraiment.", color: "#000000", screen: "matching" },
  { id: "challenges", num: "03", title: "Dépasse-toi\nensemble.", desc: "Des défis hebdomadaires solo ou en équipe. Pour progresser et ne jamais lâcher.", color: "#9650CD", screen: "challenges" },
];

const N = BASE_SLIDES.length;

function MoodScreen() {
  return (
    <div className="flex flex-col gap-2 p-4 pt-10 h-full overflow-hidden" style={{ background: "#0d001a" }}>
      <div>
        <div className="text-[8px] text-white/40">Bonjour,</div>
        <div className="font-roboto font-700 text-[15px] text-white">Alex 👋</div>
      </div>
      <div className="rounded-xl p-2.5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(114,9,183,.32)" }}>
        <div className="font-roboto font-700 text-[11px] text-white mb-2">Mood du jour</div>
        <div className="flex flex-col gap-1.5">
          {[{ emoji: "⚡", label: "J'ai de l'énergie", active: true }, { emoji: "💜", label: "Motivation moyenne", active: false }, { emoji: "🌙", label: "Dans ma bulle", active: false }].map((m) => (
            <div key={m.label} className="flex items-center gap-2 p-2 rounded-lg"
              style={{ background: m.active ? "rgba(247,37,133,0.18)" : "rgba(255,255,255,0.03)", border: `1px solid ${m.active ? "rgba(247,37,133,0.6)" : "rgba(255,255,255,0.06)"}` }}>
              <span className="text-sm">{m.emoji}</span>
              <span className="font-roboto text-[9px] text-white">{m.label}</span>
              {m.active && <div className="ml-auto w-2.5 h-2.5 rounded-full bg-[#f72585]" />}
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-xl p-2.5 mt-1" style={{ background: "rgba(247,37,133,0.08)", border: "1px solid rgba(247,37,133,0.2)" }}>
        <div className="font-roboto text-[8px] text-white/50 mb-1">3 partenaires disponibles</div>
        <div className="font-roboto font-700 text-[9px] text-white">Voir les matchs →</div>
      </div>
    </div>
  );
}

function MatchingScreen() {
  return (
    <div className="flex flex-col gap-2 p-4 pt-10 h-full overflow-hidden" style={{ background: "#0d001a" }}>
      <div className="font-roboto font-700 text-[13px] text-white mb-1">Tes matchs</div>
      {[{ name: "Léa M.", city: "Paris 11e", sport: "Muscu", score: 97, color: "#f72585" }, { name: "Thomas K.", city: "Paris 3e", sport: "Street WO", score: 88, color: "#b5179e" }, { name: "Sara B.", city: "Boulogne", sport: "Cardio", score: 81, color: "#7209b7" }].map((u) => (
        <div key={u.name} className="flex items-center gap-2.5 p-2.5 rounded-xl"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-roboto font-700 text-white flex-shrink-0"
            style={{ background: `linear-gradient(135deg,${u.color},#7209b7)` }}>{u.name[0]}</div>
          <div className="flex-1">
            <div className="font-roboto font-600 text-[9px] text-white">{u.name} · {u.city}</div>
            <div className="font-roboto text-[8px] text-white/40">{u.sport}</div>
          </div>
          <div className="font-roboto font-900 text-[11px]" style={{ color: u.color }}>{u.score}%</div>
        </div>
      ))}
    </div>
  );
}

function ChallengesScreen() {
  return (
    <div className="flex flex-col gap-2 p-4 pt-10 h-full overflow-hidden" style={{ background: "#0d001a" }}>
      <div className="font-roboto font-700 text-[13px] text-white mb-1">Challenges actifs</div>
      {[{ emoji: "💪", label: "100 tractions", progress: 73, color: "#06d6a0" }, { emoji: "🏃", label: "50km ce mois", progress: 40, color: "#4cc9f0" }, { emoji: "🔥", label: "7 séances/sem", progress: 86, color: "#f72585" }].map((c) => (
        <div key={c.label} className="p-2.5 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="text-sm">{c.emoji}</span>
            <span className="font-roboto font-500 text-[9px] text-white flex-1">{c.label}</span>
            <span className="font-roboto font-700 text-[9px]" style={{ color: c.color }}>{c.progress}%</span>
          </div>
          <div className="h-1 rounded-full bg-white/10">
            <div className="h-full rounded-full" style={{ width: `${c.progress}%`, background: c.color }} />
          </div>
        </div>
      ))}
    </div>
  );
}

const phoneScreens: Record<string, React.ReactNode> = {
  mood: <MoodScreen />,
  matching: <MatchingScreen />,
  challenges: <ChallengesScreen />,
};

function SlideCard({ s }: { s: typeof BASE_SLIDES[0] }) {
  return (
    <div className="relative rounded-3xl"
      style={{ width: "100%", height: "78vh", background: s.color, boxShadow: `0 40px 100px ${s.color}55, 0 0 0 1px ${s.color}` }}>

      {/* ── DESKTOP (md+) — ancien code exact ── */}
      <div className="hidden md:flex items-center px-14 h-full">
        <div className="flex flex-col gap-5 max-w-md z-10 relative">
          <span className="font-roboto font-700 text-xs tracking-[0.25em] uppercase text-white/50">{s.num}</span>
          <h2 className="font-roboto font-900 uppercase text-white whitespace-pre-line"
            style={{ fontSize: "clamp(40px, 5vw, 74px)", letterSpacing: "-0.02em", lineHeight: "0.9" }}>
            {s.title}
          </h2>
          <p className="font-roboto font-400 text-white/65 leading-relaxed"
            style={{ fontSize: "clamp(13px, 1.2vw, 15px)", maxWidth: "320px" }}>
            {s.desc}
          </p>
          <div className="h-px w-12" style={{ background: "rgba(255,255,255,0.4)" }} />
        </div>
        {/* Téléphone desktop — taille originale, bas droite */}
        <div className="absolute pointer-events-none z-20" style={{ bottom: "-75px", right: "60px" }}>
          <div style={{ width: "clamp(140px, 15vw, 210px)", aspectRatio: "9/19.5", borderRadius: "34px", background: "#09000f", border: "2.5px solid rgba(255,255,255,0.9)", boxShadow: "0 40px 80px rgba(0,0,0,0.6)", overflow: "hidden", position: "relative" }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center gap-1"
              style={{ width: "90px", height: "22px", background: "#000", borderRadius: "0 0 14px 14px" }}>
              <div className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a]" />
              <div className="w-8 h-0.5 rounded-full bg-white/10" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a]" />
            </div>
            <div className="absolute inset-0 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div key={s.screen} className="absolute inset-0"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}>
                  {phoneScreens[s.screen]}
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full bg-white/15 z-10" />
          </div>
        </div>
      </div>

      {/* ── MOBILE — texte haut + petit téléphone centré en bas ── */}
      <div className="flex md:hidden flex-col h-full px-5 pt-6">
        <div className="flex flex-col gap-3">
          <span className="font-roboto font-700 text-[10px] tracking-[0.25em] uppercase text-white/50">{s.num}</span>
          <h2 className="font-roboto font-900 uppercase text-white whitespace-pre-line"
            style={{ fontSize: "clamp(30px, 9vw, 44px)", letterSpacing: "-0.02em", lineHeight: "0.92" }}>
            {s.title}
          </h2>
          <p className="font-roboto font-400 text-white/65 leading-relaxed text-sm">{s.desc}</p>
        </div>
        <div className="flex justify-center mt-3">
          <div style={{ width: "50vw", maxWidth: "200px", aspectRatio: "9/19.5", borderRadius: "28px", background: "#09000f", border: "2.5px solid rgba(255,255,255,0.9)", boxShadow: "0 20px 50px rgba(0,0,0,0.5)", overflow: "hidden", position: "relative" }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center gap-1"
              style={{ width: "72px", height: "18px", background: "#000", borderRadius: "0 0 11px 11px" }}>
              <div className="w-1 h-1 rounded-full bg-[#1a1a1a]" />
              <div className="w-6 h-0.5 rounded-full bg-white/10" />
              <div className="w-1 h-1 rounded-full bg-[#1a1a1a]" />
            </div>
            <div className="absolute inset-0 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div key={s.screen} className="absolute inset-0"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}>
                  {phoneScreens[s.screen]}
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-white/15 z-10" />
          </div>
        </div>
      </div>

    </div>
  );
}

export default function HomeFeatures() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);
  const autoTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (idx: number, direction: number) => { setDir(direction); setCurrent(((idx % N) + N) % N); };
  const handleNav = (delta: number) => { stopAuto(); goTo(current + delta, delta); setTimeout(startAuto, 5000); };
  const startAuto = () => { stopAuto(); autoTimer.current = setInterval(() => { setCurrent(prev => { setDir(1); return (prev + 1) % N; }); }, 5000); };
  const stopAuto = () => { if (autoTimer.current) clearInterval(autoTimer.current); };

  useEffect(() => { startAuto(); return stopAuto; }, []);

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 120 : -120, scale: 0.95 }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -120 : 120, scale: 0.95 }),
  };

  return (
    <section className="relative h-screen bg-white overflow-hidden flex flex-col items-center justify-center" aria-label="Fonctionnalités Mood2Fit">

      <div className="relative flex items-center justify-center w-full" style={{ height: "clamp(300px, 78vh, 78vh)" }}>
        {/* Desktop : 76vw / Mobile : 92vw */}
        <div className="relative z-10 w-[92vw] md:w-[76vw]">
          <AnimatePresence custom={dir} mode="wait">
            <motion.div key={current} custom={dir} variants={variants} initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}>
              <SlideCard s={BASE_SLIDES[current]} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Flèches */}
        {[-1, 1].map((delta) => (
          <button key={delta} onClick={() => handleNav(delta)}
            className={`absolute ${delta === -1 ? "left-2 md:left-8" : "right-2 md:right-8"} top-1/2 -translate-y-1/2 z-20 w-9 h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110`}
            style={{ background: "rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.1)" }}
            aria-label={delta === -1 ? "Précédent" : "Suivant"}>
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <path d={delta === -1 ? "M11 4L6 9L11 14" : "M7 4L12 9L7 14"} stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        ))}
      </div>

      {/* Dots */}
      <div className="flex items-center gap-3 mt-8 z-20">
        {BASE_SLIDES.map((s, i) => (
          <button key={i} onClick={() => { stopAuto(); goTo(i, i > current ? 1 : -1); setTimeout(startAuto, 5000); }}
            aria-label={`Slide ${i + 1}`} className="rounded-full transition-all duration-300"
            style={{ width: i === current ? 28 : 8, height: 8, background: i === current ? BASE_SLIDES[current].color : "rgba(0,0,0,0.15)" }} />
        ))}
      </div>

    </section>
  );
}