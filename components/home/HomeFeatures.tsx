"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, animate, AnimatePresence } from "framer-motion";

const BASE_SLIDES = [
  {
    id: "mood",
    num: "",
    title: "Ton humeur,\nta séance.",
    desc: "Chaud, motivé ou dans ta bulle — l'app s'adapte à ton énergie du moment.",
    bg: "#fff", text: "#000", accent: "#f72585",
    mutedText: "rgba(0,0,0,0.5)",
    phoneBorder: "#f72585", phoneGlow: "rgba(247,37,133,0.35)",
    screen: "mood",
  },
  {
    id: "matching",
    num: "",
    title: "Le bon\npartenaire.",
    desc: "Niveau, zone, dispo, mood — l'algorithme trouve qui te correspond.",
    bg: "#000", text: "#fff", accent: "#f72585",
    mutedText: "rgba(255,255,255,0.5)",
    phoneBorder: "#b5179e", phoneGlow: "rgba(181,23,158,0.35)",
    screen: "matching",
  },
  {
    id: "challenges",
    num: "",
    title: "Dépasse-toi\nensemble.",
    desc: "Des défis hebdomadaires solo ou en équipe pour ne jamais lâcher.",
    bg: "#f72585", text: "#fff", accent: "#fff",
    mutedText: "rgba(255,255,255,0.7)",
    phoneBorder: "rgba(255,255,255,0.6)", phoneGlow: "rgba(255,255,255,0.2)",
    screen: "challenges",
  },
];

// Tripler pour scroll infini
const slides = [...BASE_SLIDES, ...BASE_SLIDES, ...BASE_SLIDES];
const OFFSET = BASE_SLIDES.length;

// ─── ÉCRANS ──────────────────────────────────────────────────
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
          {[
            { emoji: "⚡", label: "J'ai de l'énergie", active: true },
            { emoji: "💜", label: "Motivation moyenne", active: false },
            { emoji: "🌙", label: "Dans ma bulle", active: false },
          ].map((m) => (
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
      {[
        { name: "Léa M.", city: "Paris 11e", sport: "Muscu", score: 97, color: "#f72585" },
        { name: "Thomas K.", city: "Paris 3e", sport: "Street WO", score: 88, color: "#b5179e" },
        { name: "Sara B.", city: "Boulogne", sport: "Cardio", score: 81, color: "#7209b7" },
      ].map((u) => (
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
      {[
        { emoji: "💪", label: "100 tractions", progress: 73, color: "#06d6a0" },
        { emoji: "🏃", label: "50km ce mois", progress: 40, color: "#4cc9f0" },
        { emoji: "🔥", label: "7 séances/sem", progress: 86, color: "#f72585" },
      ].map((c) => (
        <div key={c.label} className="p-2.5 rounded-xl"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
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

// ─── MOCKUP 3D ───────────────────────────────────────────────
function Phone3D({ screen, border, glow, dragProgress, isFlipping }: {
  screen: string; border: string; glow: string; dragProgress: number; isFlipping: boolean;
}) {
  const rotateY = isFlipping ? 180 : dragProgress * -28;
  const rotateX = isFlipping ? 0 : Math.abs(dragProgress) * 5;
  const scale = isFlipping ? 0.85 : 1;

  return (
    <div style={{ perspective: "1200px" }} className="flex items-center justify-center">
      <div className="relative">
        <div className="absolute rounded-[60px] pointer-events-none transition-all duration-500"
          style={{ inset: "-20px", background: `radial-gradient(circle, ${glow}, transparent 70%)`, filter: "blur(40px)", opacity: 0.8 }} />
        <motion.div
          className="relative overflow-hidden"
          style={{ width: "220px", aspectRatio: "9/19.5", borderRadius: "36px", background: "#09000f", border: `1.5px solid ${border}`, boxShadow: `0 40px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07)` }}
          animate={{ rotateY, rotateX, scale }}
          transition={isFlipping
            ? { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
            : { type: "spring", stiffness: 160, damping: 22 }
          }
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center gap-1"
            style={{ width: "100px", height: "26px", background: "#000", borderRadius: "0 0 18px 18px" }}>
            <div className="w-2 h-2 rounded-full bg-[#1a1a1a]" />
            <div className="w-10 h-1 rounded-full bg-white/10" />
            <div className="w-2 h-2 rounded-full bg-[#1a1a1a]" />
          </div>
          <motion.div className="absolute inset-0 z-10 pointer-events-none rounded-[36px]"
            animate={{ background: `linear-gradient(${110 + rotateY * 1.5}deg, rgba(255,255,255,${0.05 + Math.abs(dragProgress) * 0.1}) 0%, transparent 55%)` }}
            transition={{ type: "spring", stiffness: 160, damping: 22 }} />
          <div className="absolute inset-0 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div key={screen} className="absolute inset-0"
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
                {phoneScreens[screen]}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-14 h-1 rounded-full bg-white/15 z-10" />
        </motion.div>
      </div>
    </div>
  );
}

// ─── COMPOSANT PRINCIPAL ─────────────────────────────────────
export default function HomeFeatures() {
  const [current, setCurrent] = useState(OFFSET);
  const [dragProgress, setDragProgress] = useState(0);
  const x = useMotionValue(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const SLIDE_WIDTH = typeof window !== "undefined" ? window.innerWidth : 1440;

  // Initialiser la position au centre
  useEffect(() => {
    x.set(-OFFSET * SLIDE_WIDTH);
  }, []);

  const goTo = (index: number) => {
    setIsFlipping(true);
    setTimeout(() => {
      setCurrent(index);
      animate(x, -index * SLIDE_WIDTH, {
        type: "spring", stiffness: 300, damping: 35,
        onComplete: () => {
          setIsFlipping(false);
          if (index <= OFFSET - 1) {
            const adjusted = index + BASE_SLIDES.length;
            setCurrent(adjusted);
            x.set(-adjusted * SLIDE_WIDTH);
          } else if (index >= OFFSET + BASE_SLIDES.length * 2) {
            const adjusted = index - BASE_SLIDES.length;
            setCurrent(adjusted);
            x.set(-adjusted * SLIDE_WIDTH);
          }
        },
      });
      setDragProgress(0);
    }, 300);
  };

  const startAutoScroll = () => {
    stopAutoScroll();
    autoTimer.current = setInterval(() => {
      setCurrent((prev) => {
        const next = prev + 1;
        animate(x, -next * SLIDE_WIDTH, {
          type: "spring", stiffness: 300, damping: 35,
          onComplete: () => {
            if (next >= OFFSET + BASE_SLIDES.length * 2) {
              const adjusted = next - BASE_SLIDES.length;
              setCurrent(adjusted);
              x.set(-adjusted * SLIDE_WIDTH);
            }
          },
        });
        return next;
      });
    }, 5000);
  };

  const stopAutoScroll = () => {
    if (autoTimer.current) clearInterval(autoTimer.current);
  };

  const resetInactivity = () => {
    stopAutoScroll();
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(startAutoScroll, 5000);
  };

  useEffect(() => {
    startAutoScroll();
    return () => {
      stopAutoScroll();
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, []);

  const handleDragEnd = (_: never, info: { offset: { x: number }; velocity: { x: number } }) => {
    const threshold = SLIDE_WIDTH * 0.2;
    if (info.offset.x < -threshold || info.velocity.x < -500) goTo(current + 1);
    else if (info.offset.x > threshold || info.velocity.x > 500) goTo(current - 1);
    else goTo(current);
    resetInactivity();
  };

  // Index réel pour bg et dots (modulo BASE)
  const realIndex = ((current - OFFSET) % BASE_SLIDES.length + BASE_SLIDES.length) % BASE_SLIDES.length;
  const currentSlide = BASE_SLIDES[realIndex];

  return (
    <section
      className="relative h-screen overflow-hidden"
      style={{ background: currentSlide.bg, transition: "background 0.6s ease" }}
      aria-label="Fonctionnalités Mood2Fit"
    >
      <motion.div
        className="flex h-full cursor-grab active:cursor-grabbing"
        style={{ x, width: `${slides.length * 100}vw` }}
        drag="x"
        dragConstraints={{ left: -99999, right: 0 }}
        dragElastic={0.05}
        onDragStart={stopAutoScroll}
        onDrag={(_, info) => setDragProgress(Math.max(-1, Math.min(1, info.offset.x / SLIDE_WIDTH)))}
        onDragEnd={handleDragEnd}
      >
        {slides.map((s, i) => (
          <div key={`${s.id}-${i}`}
            className="flex-shrink-0 w-screen h-full flex items-center select-none"
            style={{ background: s.bg }}>
            <div className="w-full max-w-7xl mx-auto px-6 md:px-16">
              <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
                <div className="flex flex-col gap-6">
                  <span className="font-roboto font-700 text-xs tracking-[0.2em] uppercase"
                    style={{ color: s.id === "challenges" ? "rgba(255,255,255,0.6)" : "#f72585" }}>
                    {s.num}
                  </span>
                  <h2 className="font-roboto font-900 uppercase leading-[0.88] tracking-[-0.03em] whitespace-pre-line"
                    style={{ fontSize: "clamp(44px, 6vw, 84px)", color: s.text }}>
                    {s.title}
                  </h2>
                  <p className="font-roboto font-400 leading-relaxed max-w-sm"
                    style={{ fontSize: "clamp(14px, 1.4vw, 17px)", color: s.mutedText }}>
                    {s.desc}
                  </p>
                  <div className="h-px w-16" style={{ background: s.accent }} />
                </div>
                <div className="flex justify-center pointer-events-none">
                  <Phone3D screen={s.screen} border={s.phoneBorder} glow={s.phoneGlow} dragProgress={dragProgress} isFlipping={isFlipping} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
        {BASE_SLIDES.map((_, i) => (
          <button key={i}
            onClick={() => { goTo(OFFSET + i); resetInactivity(); }}
            aria-label={`Slide ${i + 1}`}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === realIndex ? 32 : 8, height: 8,
              background: i === realIndex
                ? (currentSlide.id === "challenges" ? "#fff" : "#f72585")
                : (currentSlide.id === "challenges" ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.2)"),
            }}
          />
        ))}
      </div>

      {/* Flèches — toujours visibles */}
      {[-1, 1].map((delta) => (
        <button key={delta}
          onClick={() => { goTo(current + delta); resetInactivity(); }}
          className={`absolute ${delta === -1 ? "left-6" : "right-6"} top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110`}
          style={{
            background: currentSlide.id === "challenges" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.08)",
            border: `1px solid ${currentSlide.id === "challenges" ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.15)"}`,
          }}
          aria-label={delta === -1 ? "Slide précédent" : "Slide suivant"}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d={delta === -1 ? "M11 4L6 9L11 14" : "M7 4L12 9L7 14"}
              stroke={currentSlide.id === "challenges" ? "#fff" : "#000"}
              strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      ))}

      {/* Hint glisser */}
      {realIndex === 0 && (
        <motion.div className="absolute bottom-10 right-16 flex items-center gap-2 z-20 pointer-events-none"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} aria-hidden="true">
          <span className="font-roboto text-[10px] tracking-[0.15em] uppercase"
            style={{ color: "rgba(0,0,0,0.35)" }}>Glisser</span>
          <motion.div animate={{ x: [0, 8, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
            <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
              <path d="M0 6h18M13 1l5 5-5 5" stroke="rgba(0,0,0,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}