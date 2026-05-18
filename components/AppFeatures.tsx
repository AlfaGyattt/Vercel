"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Zap, Target, Trophy } from "lucide-react";

const features = [
  {
    slide: 0,
    icon: Zap,
    label: "01 · Mood intelligent",
    title: "Ton humeur guide",
    titleAccent: "ta séance.",
    desc: "Chaud, motivé ou dans ta bulle, l'app s'adapte à ton énergie du moment et te propose des entraînements qui correspondent vraiment à ton état du jour.",
    body: "L'application te propose des séances en fonction de ton niveau d'énergie du moment. Tu peux aussi voir les sportifs disponibles autour de toi et accéder à un feed communautaire pour rester motivé.",
    cta: "Essayer gratuitement →",
    ctaHref: "/",
    phoneScreen: "mood",
    textSide: "left" as const,
    accentColor: "#f72585",
    glowColor: "rgba(247,37,133,.28)",
  },
  {
    slide: 1,
    icon: Target,
    label: "02 · Matching précis",
    title: "Le bon partenaire,",
    titleAccent: "pas le premier venu.",
    desc: "Notre algorithme analyse 8 critères — niveau, dispo, activités, objectifs — pour te connecter avec des profils vraiment compatibles près de chez toi.",
    body: "Un système de matching analyse ton profil (niveau, objectifs, disponibilités…) pour te proposer des partenaires compatibles. Tu peux voir qui est actif et discuter directement dans l'application pour organiser ou partager tes séances.",
    cta: "Voir les partenaires →",
    ctaHref: "/communaute",
    phoneScreen: "matching",
    textSide: "right" as const,
    accentColor: "#7209b7",
    glowColor: "rgba(114,9,183,.36)",
  },
  {
    slide: 2,
    icon: Trophy,
    label: "03 · Challenges & Progrès",
    title: "Des défis qui te",
    titleAccent: "font avancer.",
    desc: "Points, rangs, défis solo ou en duo — Mood2Fit gamifie ta progression pour que chaque séance compte et que la motivation ne retombe jamais.",
    body: "L'application Mood2Fit intègre un système de points et de rangs pour suivre ta progression. Des défis adaptés à ton mood sont proposés, à faire seul ou à plusieurs.",
    cta: "Voir les challenges →",
    ctaHref: "/fonctionnalites",
    phoneScreen: "challenges",
    textSide: "left" as const,
    accentColor: "#f8d210",
    glowColor: "rgba(248,210,16,.2)",
  },
];

function MoodScreen() {
  return (
    <div className="flex flex-col gap-2 p-3 pt-8 h-full overflow-hidden" style={{ background: "#0d001a" }}>
      <div className="flex justify-between items-center">
        <div>
          <div className="text-[8px] text-[rgba(255,255,255,.4)]">Bonjour,</div>
          <div className="font-syne font-800 text-[15px] text-white">Hzhfei</div>
        </div>
        <div className="w-7 h-7 rounded-full border border-[rgba(114,9,183,.5)] bg-[rgba(114,9,183,.14)] flex items-center justify-center text-[11px]">🔔</div>
      </div>
      <div className="rounded-[14px] p-2.5" style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(114,9,183,.32)" }}>
        <div className="font-syne font-700 text-[11px] text-white mb-2">Mood du jour</div>
        <div className="grid grid-cols-3 gap-1">
          {[
            { emoji: "⚡", label: "J'ai de l'énergie", sub: "Des séances dynamiques mais accessibles", active: true },
            { emoji: "💜", label: "Moyenne motivation", sub: "Des mouvements simples et efficaces", active: false },
            { emoji: "🌙", label: "Pas motivé·e", sub: "Des micro-séances ultra douces", active: false },
          ].map((m) => (
            <div key={m.label} className="rounded-[10px] p-[8px_6px]" style={{ background: m.active ? "rgba(247,37,133,.09)" : "rgba(255,255,255,.03)", border: `1px solid ${m.active ? "rgba(247,37,133,.6)" : "rgba(114,9,183,.32)"}` }}>
              <div className="text-sm mb-1">{m.emoji}</div>
              <div className="font-syne font-800 text-[8px] text-white leading-[1.25]">{m.label}</div>
              <div className="text-[7px] text-[rgba(255,255,255,.37)] mt-[3px] leading-[1.3]">{m.sub}</div>
              <div className="text-[7px] text-[#7c3aed] font-700 mt-1">Voir &gt;</div>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-[12px] p-[11px_13px]" style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(114,9,183,.28)" }}>
        <div className="flex justify-between items-start mb-2">
          <div>
            <div className="font-syne font-700 text-[11px] text-white">Rejoins une séance</div>
            <div className="text-[8px] text-[rgba(255,255,255,.38)] mt-0.5">Des activités proches, compatibles avec ton profil.</div>
          </div>
          <span className="text-base">📍</span>
        </div>
        <div className="text-center py-2 rounded-full bg-[#7c3aed] font-syne font-700 text-[10px] text-white">Explorer la carte</div>
      </div>
      <div className="flex justify-between items-center">
        <div className="font-syne font-800 text-[13px] text-white">Feed</div>
        <div className="text-[9px] text-[#7c3aed] font-700">Filtres</div>
      </div>
      <div className="rounded-[11px] p-[9px_11px]" style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(114,9,183,.26)" }}>
        <div className="flex items-center gap-1.5 mb-1.5">
          <div className="w-6 h-6 rounded-full bg-[#f72585] flex items-center justify-center font-syne font-800 text-[10px] text-white flex-shrink-0">H</div>
          <div className="font-syne font-700 text-[10px] text-white flex-1">Hzhfei</div>
          <div className="text-[8px] text-[rgba(255,255,255,.28)]">Il y a 1 j</div>
        </div>
        <div className="text-[9px] text-[rgba(255,255,255,.62)] leading-[1.5]">1 min consacrées aujourd'hui à mes pecs doux !</div>
      </div>
      <div className="flex justify-around items-center pt-2 border-t border-[rgba(255,255,255,.06)] mt-auto">
        {[{ e: "🏠", l: "Accueil", on: true }, { e: "🗺️", l: "Carte" }, { e: "🏋️", l: "Séances" }, { e: "💬", l: "Messages" }, { e: "👤", l: "Profil" }].map((n) => (
          <div key={n.l} className="flex flex-col items-center gap-0.5">
            <div className="text-base">{n.e}</div>
            <div className="text-[7px]" style={{ color: n.on ? "#f72585" : "rgba(255,255,255,.3)" }}>{n.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MatchingScreen() {
  return (
    <div className="flex flex-col gap-2 p-3 pt-8 h-full overflow-hidden" style={{ background: "#0d001a" }}>
      <div className="flex items-center gap-2">
        <div><div className="text-[8px] text-[rgba(255,255,255,.4)]">3 matchs près de toi</div><div className="font-syne font-800 text-[15px] text-white">Partenaires</div></div>
      </div>
      <div className="rounded-[13px] p-[11px] relative overflow-hidden" style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(247,37,133,.28)" }}>
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#f72585] to-[#7209b7]" />
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-[38px] h-[38px] rounded-full flex items-center justify-center text-lg flex-shrink-0" style={{ background: "linear-gradient(135deg,#7209b7,#f72585)" }}>💪</div>
          <div className="flex-1"><div className="font-syne font-700 text-[11px] text-white">Léa M.</div><div className="text-[8px] text-[rgba(255,255,255,.38)]">📍 Paris 11e · En ligne</div></div>
          <div className="font-syne font-800 text-[18px]" style={{ background: "linear-gradient(135deg,#f72585,#7209b7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>94%</div>
        </div>
        <div className="flex gap-1 flex-wrap mb-1.5">
          {["Musculation", "Intermédiaire", "Ce soir"].map((t) => (
            <span key={t} className="text-[7px] px-1.5 py-0.5 rounded-full text-[rgba(255,255,255,.68)]" style={{ background: "rgba(114,9,183,.2)", border: "1px solid rgba(114,9,183,.38)" }}>{t}</span>
          ))}
        </div>
        <div className="text-center py-1.5 rounded-full font-syne font-700 text-[9px] text-white bg-gradient-to-r from-[#f72585] to-[#7209b7]">💬 Envoyer un message</div>
      </div>
      <div className="rounded-[13px] p-[11px] relative overflow-hidden" style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(76,201,240,.3)" }}>
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#4cc9f0] to-[#b5179e]" />
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-[38px] h-[38px] rounded-full flex items-center justify-center text-lg flex-shrink-0" style={{ background: "linear-gradient(135deg,#b5179e,#4cc9f0)" }}>🤸</div>
          <div className="flex-1"><div className="font-syne font-700 text-[11px] text-white">Thomas K.</div><div className="text-[8px] text-[rgba(255,255,255,.38)]">📍 Paris 3e · Actif</div></div>
          <div className="font-syne font-800 text-[18px]" style={{ background: "linear-gradient(135deg,#4cc9f0,#b5179e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>88%</div>
        </div>
        <div className="flex gap-1 flex-wrap mb-1.5">
          {["Street WO", "Avancé", "Matin"].map((t) => (
            <span key={t} className="text-[7px] px-1.5 py-0.5 rounded-full text-[rgba(255,255,255,.68)]" style={{ background: "rgba(114,9,183,.2)", border: "1px solid rgba(114,9,183,.38)" }}>{t}</span>
          ))}
        </div>
        <div className="text-center py-1.5 rounded-full font-syne font-700 text-[9px] text-white bg-gradient-to-r from-[#4cc9f0] to-[#7209b7]">💬 Envoyer un message</div>
      </div>
      <div className="flex justify-around items-center pt-2 border-t border-[rgba(255,255,255,.06)] mt-auto">
        {[{ e: "🏠", l: "Accueil" }, { e: "🗺️", l: "Carte" }, { e: "🏋️", l: "Séances", on: true }, { e: "💬", l: "Messages" }, { e: "👤", l: "Profil" }].map((n) => (
          <div key={n.l} className="flex flex-col items-center gap-0.5">
            <div className="text-base">{n.e}</div>
            <div className="text-[7px]" style={{ color: n.on ? "#f72585" : "rgba(255,255,255,.3)" }}>{n.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChallengesScreen() {
  return (
    <div className="flex flex-col gap-2 p-3 pt-8 h-full overflow-hidden" style={{ background: "#0d001a" }}>
      <div><div className="text-[8px] text-[rgba(255,255,255,.4)]">Défis du jour</div><div className="font-syne font-800 text-[15px] text-white">Challenges</div></div>
      <div className="grid grid-cols-3 gap-1">
        {[{ n: "340", l: "Points" }, { n: "3", l: "En cours" }, { n: "🥈", l: "Rang" }].map((s) => (
          <div key={s.l} className="rounded-[9px] p-[7px_5px] text-center" style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.07)" }}>
            <div className="font-syne font-800 text-[14px] text-[#f72585]">{s.n}</div>
            <div className="text-[7px] text-[rgba(255,255,255,.36)] mt-0.5">{s.l}</div>
          </div>
        ))}
      </div>
      <div className="flex gap-1">
        <span className="px-2 py-0.5 rounded-full font-syne font-700 text-[8px] text-[#ff6b6b]" style={{ background: "rgba(255,59,48,.13)", border: "1px solid rgba(255,59,48,.36)" }}>🔥 Je suis chaud·e</span>
        <span className="px-2 py-0.5 rounded-full font-syne font-700 text-[8px] text-[#4dabff]" style={{ background: "rgba(10,132,255,.13)", border: "1px solid rgba(10,132,255,.36)" }}>😄 Compagnie</span>
      </div>
      <div className="rounded-[12px] p-[10px_11px]" style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(114,9,183,.32)" }}>
        <div className="flex justify-between items-start mb-1.5">
          <span className="text-[20px]">💪</span>
          <span className="text-[8px] px-1.5 py-0.5 rounded-full text-[#f8d210]" style={{ background: "rgba(248,210,16,.13)", border: "1px solid rgba(248,210,16,.3)" }}>⭐ 50 pts</span>
        </div>
        <div className="font-syne font-700 text-[10px] text-white mb-0.5">100 pompes dans la journée</div>
        <div className="text-[8px] text-[rgba(255,255,255,.38)] mb-1.5 leading-[1.5]">Répartis comme tu veux — l'important c'est finir à 100.</div>
        <div className="h-[3px] rounded-full bg-[rgba(255,255,255,.08)]">
          <div className="h-full w-[60%] rounded-full bg-gradient-to-r from-[#f72585] to-[#7209b7]" />
        </div>
      </div>
      <div className="rounded-[12px] p-[10px_11px]" style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(114,9,183,.32)" }}>
        <div className="flex justify-between items-start mb-1.5">
          <span className="text-[20px]">👥</span>
          <span className="text-[8px] px-1.5 py-0.5 rounded-full text-[#f8d210]" style={{ background: "rgba(248,210,16,.13)", border: "1px solid rgba(248,210,16,.3)" }}>⭐ 120 pts</span>
        </div>
        <div className="font-syne font-700 text-[10px] text-white mb-0.5">1000 reps en duo cette semaine</div>
        <div className="text-[8px] text-[rgba(255,255,255,.38)] mb-1.5 leading-[1.5]">Toi + ton partenaire, 1000 reps au total.</div>
        <div className="h-[3px] rounded-full bg-[rgba(255,255,255,.08)]">
          <div className="h-full w-[75%] rounded-full bg-gradient-to-r from-[#7209b7] to-[#4cc9f0]" />
        </div>
      </div>
      <div className="flex justify-around items-center pt-2 border-t border-[rgba(255,255,255,.06)] mt-auto">
        {[{ e: "🏠", l: "Accueil" }, { e: "🗺️", l: "Carte" }, { e: "🏋️", l: "Séances" }, { e: "💬", l: "Messages", on: true }, { e: "👤", l: "Profil" }].map((n) => (
          <div key={n.l} className="flex flex-col items-center gap-0.5">
            <div className="text-base">{n.e}</div>
            <div className="text-[7px]" style={{ color: n.on ? "#f72585" : "rgba(255,255,255,.3)" }}>{n.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const phoneScreens: Record<string, React.ReactNode> = {
  mood: <MoodScreen />,
  matching: <MatchingScreen />,
  challenges: <ChallengesScreen />,
};

// ─── TÉLÉPHONE — accentColor supprimé (non utilisé) ─────────
function Phone({ activeSlide, glowColor, phoneScreen }: {
  activeSlide: number;
  glowColor: string;
  phoneScreen: string;
}) {
  return (
    <div className="flex justify-center relative">
      <div
        className="absolute w-[240px] h-[240px] rounded-full z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-700"
        style={{ background: `radial-gradient(circle,${glowColor} 0%,transparent 70%)`, filter: "blur(44px)", animation: "glPulse 5s ease-in-out infinite" }}
      />
      <style>{`@keyframes glPulse{0%,100%{opacity:.7}50%{opacity:1}}@keyframes phFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}`}</style>
      <div
        className="relative z-[1] overflow-hidden"
        style={{
          width: "265px",
          background: "#09000f",
          borderRadius: "42px",
          border: "1.5px solid rgba(255,255,255,.1)",
          boxShadow: "0 40px 90px rgba(0,0,0,.65), inset 0 1px 0 rgba(255,255,255,.07)",
          animation: "phFloat 7s ease-in-out infinite",
        }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-[5] flex items-center justify-center gap-1.5" style={{ width: "108px", height: "27px", background: "#000", borderRadius: "0 0 20px 20px" }}>
          <div className="w-2 h-2 rounded-full bg-[#1a1a1a]" />
          <div className="w-[50px] h-1 rounded-full bg-[rgba(255,255,255,.1)]" />
          <div className="w-2 h-2 rounded-full bg-[#1a1a1a]" />
        </div>
        <div className="flex justify-between items-center px-[18px] pt-3 pb-1 font-bold text-[12px] text-white" style={{ fontFamily: "-apple-system,sans-serif" }}>
          <span>{["19:21", "20:04", "21:37"][activeSlide]}</span>
          <span>▲▲ 🔋</span>
        </div>
        <div className="relative" style={{ minHeight: "510px", overflow: "hidden" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              className="absolute inset-0"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {phoneScreens[phoneScreen]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default function AppFeatures() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const slideProgress = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [0, 1, 2, 2]);

  useEffect(() => {
    const unsubscribe = slideProgress.on("change", (v) => {
      setActiveSlide(Math.min(2, Math.max(0, Math.round(v))));
    });
    return unsubscribe;
  }, [slideProgress]);

  const current = features[activeSlide];
  const Icon = current.icon;

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative"
      style={{ height: "300vh" }}
      aria-label="Fonctionnalités Mood2Fit"
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden" style={{ background: "#080010" }}>
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-1000"
          style={{ background: `radial-gradient(ellipse 55% 55% at 50% 50%, ${current.accentColor}10, transparent 70%)` }}
        />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(247,37,133,0.12)] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(247,37,133,0.12)] to-transparent" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className={current.textSide === "right" ? "lg:order-1" : "lg:order-2"}>
              <Phone
                activeSlide={activeSlide}
                glowColor={current.glowColor}
                phoneScreen={current.phoneScreen}
              />
            </div>
            <div className={`flex flex-col gap-6 ${current.textSide === "right" ? "lg:order-2" : "lg:order-1"}`}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  className="flex flex-col gap-5"
                  initial={{ opacity: 0, x: current.textSide === "left" ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: current.textSide === "left" ? -25 : 25 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="block font-syne font-700 text-[11px] tracking-[.16em] uppercase mb-1" style={{ color: current.accentColor }}>
                    {current.label}
                  </span>
                  <h2 className="font-syne font-800 text-[#faf4ff] leading-[1.08] tracking-[-0.025em]" style={{ fontSize: "clamp(26px,2.8vw,40px)" }}>
                    {current.title}<br />
                    <span style={{ color: current.accentColor }}>{current.titleAccent}</span>
                  </h2>
                  <p className="font-dm font-400 text-[rgba(250,244,255,0.65)] leading-[1.8]" style={{ fontSize: "15px" }}>
                    {current.desc}
                  </p>
                  <p className="font-dm font-300 text-[rgba(250,244,255,0.55)] leading-[1.75]" style={{ fontSize: "14px" }}>
                    {current.body}
                  </p>
                  <Link
                    href={current.ctaHref}
                    className="self-start px-6 py-3 rounded-pill font-dm font-500 text-sm text-white transition-all duration-200 hover:opacity-90 active:scale-[.98]"
                    style={{ background: `linear-gradient(135deg, ${current.accentColor}, #7209b7)` }}
                  >
                    {current.cta}
                  </Link>
                </motion.div>
              </AnimatePresence>
              <div className="flex items-center gap-3 mt-2">
                {features.map((f, i) => (
                  <div
                    key={f.slide}
                    className="rounded-full transition-all duration-500"
                    style={{
                      width: i === activeSlide ? "36px" : "8px",
                      height: "4px",
                      background: i === activeSlide ? current.accentColor : "rgba(250,244,255,0.15)",
                    }}
                  />
                ))}
                <span className="text-xs font-dm text-[rgba(250,244,255,0.3)] ml-2">
                  {activeSlide + 1} / {features.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 pointer-events-none">
          <span className="font-syne text-[10px] tracking-[.14em] uppercase text-[rgba(250,244,255,.5)]">Scroll</span>
          <motion.div
            className="w-px h-8 bg-gradient-to-b from-[rgba(250,244,255,0.4)] to-transparent"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </div>
    </section>
  );
}