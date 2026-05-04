"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Apple, Play } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const features = [
  {
    id: "mood", num: "01",
    title: "Ton humeur,\nta séance.",
    desc: "Que tu sois chaud bouillant ou dans ta bulle, l'app s'adapte à ton énergie du moment et te propose des entraînements qui correspondent à ton état du jour.",
    bg: "#fff", text: "#000", accent: "#f72585", mutedText: "rgba(0,0,0,0.5)",
    phoneBorder: "#f72585", phoneGlow: "rgba(247,37,133,0.35)", screen: "mood",
    phoneLeft: false,
  },
  {
    id: "matching", num: "02",
    title: "Le bon\npartenaire.",
    desc: "Notre algorithme analyse ton niveau, tes disponibilités, tes activités et tes objectifs pour te connecter avec les profils les plus compatibles près de chez toi.",
    bg: "#000", text: "#fff", accent: "#f72585", mutedText: "rgba(255,255,255,0.5)",
    phoneBorder: "#b5179e", phoneGlow: "rgba(181,23,158,0.35)", screen: "matching",
    phoneLeft: true,
  },
  {
    id: "challenges", num: "03",
    title: "Dépasse-toi\nensemble.",
    desc: "Points, classements, défis solo ou en duo. Mood2Fit transforme ta progression en jeu pour que chaque séance compte vraiment.",
    bg: "#f72585", text: "#fff", accent: "#fff", mutedText: "rgba(255,255,255,0.75)",
    phoneBorder: "rgba(255,255,255,0.6)", phoneGlow: "rgba(255,255,255,0.2)", screen: "challenges",
    phoneLeft: false,
  },
];

const activities = [
  { name: "Musculation", desc: "Force & hypertrophie" },
  { name: "Street Workout", desc: "Callisthénie urbaine" },
  { name: "Powerlifting", desc: "Force maximale" },
  { name: "Callisthénie", desc: "Poids du corps" },
  { name: "HIIT", desc: "Cardio intensif" },
  { name: "CrossFit", desc: "Fonctionnel" },
  { name: "Running", desc: "Endurance" },
  { name: "Cyclisme", desc: "Route & piste" },
  { name: "Yoga", desc: "Corps & esprit" },
  { name: "Boxe", desc: "Combat & cardio" },
  { name: "Natation", desc: "Eau & endurance" },
  { name: "Et plus encore...", desc: "Toutes disciplines" },
];

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
          {[
            { label: "J'ai de l'énergie", active: true },
            { label: "Motivation moyenne", active: false },
            { label: "Dans ma bulle", active: false },
          ].map((m) => (
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
        { label: "100 tractions", progress: 73, color: "#06d6a0" },
        { label: "50km ce mois", progress: 40, color: "#4cc9f0" },
        { label: "7 séances/sem", progress: 86, color: "#f72585" },
      ].map((c) => (
        <div key={c.label} className="p-2.5 rounded-xl"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="flex items-center gap-1.5 mb-1.5">
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

function Phone({ screen, border, glow, rotateY = 0 }: {
  screen: string; border: string; glow: string; rotateY?: number;
}) {
  return (
    <div style={{ perspective: "1200px" }}>
      <div className="relative">
        <div className="absolute rounded-[60px] pointer-events-none"
          style={{ inset: "-20px", background: `radial-gradient(circle, ${glow}, transparent 70%)`, filter: "blur(40px)", opacity: 0.8 }} />
        <div className="relative overflow-hidden"
          style={{ width: "220px", aspectRatio: "9/19.5", borderRadius: "36px", background: "#09000f", border: `1.5px solid ${border}`, boxShadow: `0 40px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07)`, transform: `rotateY(${rotateY}deg) rotateX(2deg)` }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center gap-1"
            style={{ width: "100px", height: "26px", background: "#000", borderRadius: "0 0 18px 18px" }}>
            <div className="w-2 h-2 rounded-full bg-[#1a1a1a]" />
            <div className="w-10 h-1 rounded-full bg-white/10" />
            <div className="w-2 h-2 rounded-full bg-[#1a1a1a]" />
          </div>
          <div className="absolute inset-0 overflow-hidden">{phoneScreens[screen]}</div>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-14 h-1 rounded-full bg-white/15 z-10" />
        </div>
      </div>
    </div>
  );
}

export default function FonctionnalitesPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* HERO — plein écran avec fond fonds.png */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src="/fonds.png" alt="" aria-hidden="true" className="w-full h-full object-cover" />
            <div className="absolute inset-0"
              style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.85) 100%)" }} />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center text-center gap-6 px-6 max-w-4xl mx-auto pt-20"
          >
            <h1 className="font-roboto font-900 uppercase leading-[0.88] tracking-[-0.04em] text-white"
              style={{ fontSize: "clamp(56px, 10vw, 130px)", textShadow: "0 2px 20px rgba(0,0,0,0.25)" }}>
              Conçu pour<br />
              <span style={{ color: "#f72585" }}>créer du lien.</span>
            </h1>
            <p className="font-roboto font-400 max-w-lg text-center"
              style={{ fontSize: "clamp(15px, 1.5vw, 18px)", color: "rgba(255,255,255,0.7)" }}>
              Le sport est le prétexte. Ce qu'on construit vraiment, c'est le lien entre les gens.
            </p>

          </motion.div>
        </section>

        {/* 3 SECTIONS FEATURES */}
        {features.map((f) => (
          <section key={f.id} className="min-h-screen flex items-center" style={{ background: f.bg }}>
            <div className="w-full max-w-7xl mx-auto px-6 md:px-16 py-24">
              <div className={`grid md:grid-cols-2 gap-16 md:gap-24 items-center ${f.phoneLeft ? "" : ""}`}>

                {/* Texte */}
                <motion.div
                  className={`flex flex-col gap-6 ${f.phoneLeft ? "md:order-2" : "md:order-1"}`}
                  initial={{ opacity: 0, x: f.phoneLeft ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="font-roboto font-700 text-xs tracking-[0.2em] uppercase"
                    style={{ color: f.id === "challenges" ? "rgba(255,255,255,0.6)" : "#f72585" }}>
                    {f.num}
                  </span>
                  <h2 className="font-roboto font-900 uppercase leading-[0.88] tracking-[-0.03em] whitespace-pre-line"
                    style={{ fontSize: "clamp(44px, 6vw, 84px)", color: f.text }}>
                    {f.title}
                  </h2>
                  <p className="font-roboto font-400 leading-relaxed max-w-sm"
                    style={{ fontSize: "clamp(15px, 1.5vw, 17px)", color: f.mutedText }}>
                    {f.desc}
                  </p>
                  <div className="h-px w-16" style={{ background: f.accent }} />
                </motion.div>

                {/* Téléphone */}
                <motion.div
                  className={`flex justify-center ${f.phoneLeft ? "md:order-1" : "md:order-2"}`}
                  initial={{ opacity: 0, x: f.phoneLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Phone
                    screen={f.screen}
                    border={f.phoneBorder}
                    glow={f.phoneGlow}
                    rotateY={f.phoneLeft ? 8 : -8}
                  />
                </motion.div>
              </div>
            </div>
          </section>
        ))}

        {/* ACTIVITÉS */}
        <section style={{ background: "#fff" }} className="py-32">
          <div className="max-w-7xl mx-auto px-6 md:px-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-roboto font-900 uppercase leading-[0.88] tracking-[-0.03em] text-black mb-4"
              style={{ fontSize: "clamp(40px, 5.5vw, 72px)" }}>
              Peu importe<br /><span style={{ color: "#f72585" }}>ton sport.</span>
            </motion.h2>
            <p className="font-roboto font-400 text-black/45 mb-16 max-w-md" style={{ fontSize: "clamp(14px, 1.4vw, 17px)" }}>
              Mood2Fit s'adapte à toutes les disciplines. Peu importe ton sport, tu trouveras des gens qui pratiquent comme toi.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-px" style={{ background: "rgba(0,0,0,0.08)" }}>
              {activities.map((a, i) => (
                <motion.div key={a.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.04 }}
                  className="flex flex-col gap-1.5 p-6 md:p-8 group cursor-default bg-white"
                  whileHover={{ backgroundColor: "#faf7ff" }}>
                  <span className="font-roboto font-900 text-black group-hover:text-[#f72585] transition-colors duration-200"
                    style={{ fontSize: "clamp(15px, 1.6vw, 18px)" }}>{a.name}</span>
                  <span className="font-roboto font-400 text-black/35 text-sm">{a.desc}</span>
                  <div className="h-px w-0 group-hover:w-8 transition-all duration-300 mt-1" style={{ background: "#f72585" }} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative flex items-center justify-center overflow-hidden py-40" style={{ background: "#f72585" }}>
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-roboto font-900 text-white uppercase leading-[0.85] tracking-[-0.04em] mb-10"
              style={{ fontSize: "clamp(56px, 9vw, 120px)" }}>
              Commence<br />maintenant.
            </motion.h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/" className="flex items-center gap-3 px-9 py-4 rounded-full font-roboto font-700 text-sm text-[#f72585] bg-white hover:scale-[1.03] active:scale-[0.97] transition-all"
                style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.2)" }}>
                <Apple size={18} /> App Store
              </Link>
              <Link href="/" className="flex items-center gap-3 px-9 py-4 rounded-full font-roboto font-700 text-sm text-white border-2 border-white/50 hover:border-white hover:bg-white/10 active:scale-[0.97] transition-all">
                <Play size={16} /> Google Play
              </Link>
            </div>
            <p className="font-roboto text-xs text-white/40 mt-8 tracking-widest uppercase">
              Bientôt disponible sur les stores
            </p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}