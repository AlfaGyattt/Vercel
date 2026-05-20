"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import ResponsiveBg from "@/components/ResponsiveBg";
import Footer from "@/components/Footer";

const SLIDES = [
  {
    id: "home", bg: "#f72585", img: "/home.png", label: "HOME · ACCUEIL", num: "01 / 03",
    left: [
      { id:"l1", num:"01 — MOOD",        title:"Choisis ton humeur",    desc:"4 moods pour démarrer : chaud, calme, focus ou dépassement de soi.",      tx:0.18, ty:0.18 },
      { id:"l2", num:"02 — COMMUNAUTÉ",  title:"La commu partage",      desc:"Vois ce que les autres terminent. Ici, hzziohf vient de finir sa séance.", tx:0.32, ty:0.73 },
      { id:"l3", num:"03 — TEMPORALITÉ", title:"En direct, maintenant", desc:"Le badge En direct indique l'activité de la commu à l'instant t.",          tx:0.82, ty:0.67 },
    ],
    right: [
      { id:"r1", num:"04 — CARTE",        title:"Salles & street workout", desc:"L'onglet Carte recense les salles et spots de street workout en France.", tx:0.28, ty:0.95 },
      { id:"r2", num:"05 — SURPREND-MOI", title:"Exos selon ton mood",     desc:"M2F choisit pour toi un exercice qui colle à ton humeur du jour.",        tx:0.44, ty:0.57 },
      { id:"r3", num:"06 — SIGNALEMENT",  title:"Un bug ? Le drapeau",     desc:"Le drapeau en bas à droite permet de signaler un bug ou problème.",       tx:0.93, ty:0.87 },
    ],
  },
  {
    id: "seance", bg: "#0A0A0F", img: "/sceance.png", label: "SÉANCES · TRAIN", num: "02 / 03",
    left: [
      { id:"l1", num:"01 — CONNEXION", title:"Se connecter",              desc:"Connecte-toi pour suivre ta progression et débloquer les défis.",   tx:0.5,  ty:0.37 },
      { id:"l2", num:"02 — DÉMARRER",  title:"Mode libre, tout de suite", desc:"Un bouton, et l'entraînement commence. Aucun programme imposé.",    tx:0.5,  ty:0.61 },
      { id:"l3", num:"03 — DÉFI XP",   title:"+80 XP à gagner",           desc:"Chaque défi rapporte de l'expérience pour progresser de niveau.",   tx:0.15, ty:0.26 },
    ],
    right: [
      { id:"r1", num:"04 — FILTRES",     title:"Filtre par niveau ou muscle", desc:"Choisis tes séances par niveau, durée ou groupe musculaire ciblé.", tx:0.88, ty:0.70 },
      { id:"r2", num:"05 — MÉTADONNÉES", title:"Tout en un coup d'œil",       desc:"Type, durée, niveau et XP : la séance s'auto-décrit.",              tx:0.5,  ty:0.82 },
      { id:"r3", num:"06 — MOTIVATION",  title:"1 en cours, tu rejoins ?",    desc:"Vois qui s'entraîne en même temps que toi pour rester motivé.",     tx:0.97,  ty:0.86 },
    ],
  },
  {
    id: "profil", bg: "#9650CD", img: "/profil.jpeg", label: "PROFIL · YOU", num: "03 / 03",
    left: [
      { id:"l1", num:"01 — XP & NIVEAU", title:"20 XP, Niveau 1",         desc:"La barre d'XP visualise ta progression vers le prochain niveau.",   tx:0.06,  ty:0.147 },
      { id:"l2", num:"02 — SÉANCES",     title:"Compte tes séances",       desc:"Le compteur SÉANCES totalise tous les entraînements terminés.",      tx:0.15,  ty:0.22 },
      { id:"l3", num:"03 — ÉDITER",      title:"Stylo → tu personnalises", desc:"Modifie pseudo et photo de profil en un tap sur le stylo.",          tx:0.85, ty:0.09 },
    ],
    right: [
      { id:"r1", num:"04 — POSTS",     title:"Tes posts publiés",           desc:"Le total des publications partagées avec la communauté.",            tx:0.52, ty:0.22 },
      { id:"r2", num:"05 — RÉACTIONS", title:"Tes interactions communauté", desc:"Le compteur de réactions laissées sur les posts des autres.",        tx:0.85, ty:0.22 },
      { id:"r3", num:"06 — BADGES",    title:"Défis relevés",               desc:"Chaque badge récompense un défi ou un palier franchi.",              tx:0.20, ty:0.45 },
    ],
  },
];

const COLORS_LIGHT = ["#fff","#fff","#fff","#fff","#fff","#fff"];
const COLORS_DARK  = ["#f72585","#9650CD","#f72585","#9650CD","#f72585","#9650CD"];
const NUM_COLORS_LIGHT  = ["#ffb3d1","#ffb3d1","#ffb3d1","#ffb3d1","#ffb3d1","#ffb3d1"];
const NUM_COLORS_DARK   = ["#ff6eb4","#ff6eb4","#ff6eb4","#ff6eb4","#ff6eb4","#ff6eb4"];
const NUM_COLORS_VIOLET = ["#d4aaff","#d4aaff","#d4aaff","#d4aaff","#d4aaff","#d4aaff"];

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
  { name: "Marche à pied", desc: "Cardio & bien-être" },
  { name: "Et plus encore...", desc: "Toutes disciplines" },
];

function Slide({ s }: { s: typeof SLIDES[0] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const isDark     = s.bg === "#0A0A0F";
  const titleColors = isDark ? COLORS_DARK : COLORS_LIGHT;
  const numColors   = s.bg === "#0A0A0F" ? NUM_COLORS_DARK : s.bg === "#9650CD" ? NUM_COLORS_VIOLET : NUM_COLORS_LIGHT;
  const dotColor    = isDark ? "#f72585" : "rgba(255,210,0,0.95)";

  useEffect(() => { setActiveIdx(null); }, [s.id]);


  const allBubbles = [...s.left, ...s.right];

  const renderCard = (b: typeof s.left[0], idx: number, side: "left" | "right") => (
    <motion.div key={b.id} onClick={() => setActiveIdx(prev => prev === idx ? null : idx)}
      initial={{ opacity: 0, x: side === "left" ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: (idx % 3) * 0.08 }}
      style={{
        background: activeIdx === idx ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.2)",
        border: `1px solid ${activeIdx === idx ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.12)"}`,
        borderRadius: "6px", padding: "12px 14px", cursor: "pointer",
        transition: "background 0.2s, border 0.2s",
      }}>
      <p style={{ fontFamily:"Roboto,sans-serif", fontWeight:700, fontSize:"8px", letterSpacing:"0.2em", textTransform:"uppercase", color:numColors[idx], marginBottom:"5px" }}>
        — {b.num}
      </p>
      <p style={{ fontFamily:"Roboto,sans-serif", fontWeight:900, fontSize:"clamp(12px,1vw,15px)", color:titleColors[idx], lineHeight:1.1, letterSpacing:"-0.01em", marginBottom:"5px", textTransform:"uppercase" }}>
        {b.title}
      </p>
      <p style={{ fontFamily:"Roboto,sans-serif", fontWeight:400, fontSize:"clamp(9px,0.7vw,11px)", color:"rgba(255,255,255,0.7)", lineHeight:1.5 }}>
        {b.desc}
      </p>
    </motion.div>
  );

  return (
    <div ref={containerRef} className="relative w-full h-full flex flex-col">

      {/* ── Titre centré en haut ── */}
      <div className="flex flex-col items-center text-center pt-2 pb-3 flex-shrink-0">
        <p style={{ fontFamily:"Roboto,sans-serif", fontWeight:400, fontSize:"9px", letterSpacing:"0.3em", textTransform:"uppercase", color: numColors[0], marginBottom:"5px" }}>
          {s.id === "home" ? "ÉCRAN 01 — ACCUEIL" : s.id === "seance" ? "ÉCRAN 02 — SÉANCE" : "ÉCRAN 03 — PROFIL"}
        </p>
        <h2 style={{ fontFamily:"Roboto,sans-serif", fontWeight:900, fontSize:"clamp(20px,2.8vw,38px)", textTransform:"uppercase", letterSpacing:"-0.02em", lineHeight:1, color:"#fff" }}>
          {s.id === "home" ? <><span style={{color:"#fff"}}>L'accueil,</span> ton point de départ</> :
           s.id === "seance" ? <><span style={{color: numColors[0]}}>La séance,</span> ton terrain de jeu</> :
           <><span style={{color:"#fff"}}>Le profil,</span> ton miroir de progrès</>}
        </h2>
      </div>

      {/* ── Zone centrale : blocs gauche | mokup | blocs droite (desktop + paysage) ── */}
      <div className="hidden md:flex flex-1 items-center gap-4 px-4 min-h-0">

        {/* Blocs gauche */}
        <div className="flex flex-col gap-5 flex-shrink-0" style={{ width: "24%", paddingLeft: "2%" }}>
          {s.left.map((b, i) => renderCard(b, i, "left"))}
        </div>

        {/* Mokup centré */}
        <div ref={phoneRef} className="relative flex-1 flex justify-center items-center h-full min-h-0">
          <AnimatePresence mode="wait">
            <motion.div key={`mokup-${s.id}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
              style={{ height: "90%", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Image
                src={s.id === "home" ? "/mokup/mokup_1.png" : s.id === "seance" ? "/mokup/mokup_2.png" : "/mokup/mokup_3.png"}
                alt={`Mockup ${s.label}`}
                width={220} height={476}
                style={{ height: "100%", width: "auto", objectFit: "contain" }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Pastille */}
          <AnimatePresence>
            {activeIdx !== null && (() => {
              const b = allBubbles[activeIdx];
              return (
                <motion.div key={`dot-${activeIdx}`} className="absolute z-20 pointer-events-none"
                  style={{ left: `${b.tx * 100}%`, top: `${b.ty * 100}%`, transform: "translate(-50%,-50%)" }}
                  initial={{ opacity:0, scale:0 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0 }}>
                  <motion.div className="rounded-full"
                    style={{ width:16, height:16, background: dotColor, boxShadow:`0 0 14px 5px ${dotColor}80` }}
                    animate={{ scale:[1,1.5,1], opacity:[1,0.6,1] }}
                    transition={{ duration:0.9, repeat:Infinity, ease:"easeInOut" }} />
                </motion.div>
              );
            })()}
          </AnimatePresence>
        </div>

        {/* Blocs droite */}
        <div className="flex flex-col gap-5 flex-shrink-0" style={{ width: "24%", paddingRight: "2%" }}>
          {s.right.map((b, i) => renderCard(b, i + 3, "right"))}
        </div>
      </div>

      {/* ── MOBILE portrait ── */}
      <div className="md:hidden flex flex-col flex-1 min-h-0">

        {/* Mokup centré */}
        <div ref={phoneRef} className="relative flex-1 flex justify-center items-center min-h-0 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div key={`mob-mokup-${s.id}`} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.3 }}
              style={{ height: "100%", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <Image
                src={s.id === "home" ? "/mokup/mokup_1.png" : s.id === "seance" ? "/mokup/mokup_2.png" : "/mokup/mokup_3.png"}
                alt={`Mockup ${s.label}`}
                width={200} height={433}
                style={{ height:"100%", width:"auto", objectFit:"contain", maxHeight:"100%" }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Pastille mobile */}
          <AnimatePresence>
            {activeIdx !== null && (() => {
              const b = allBubbles[activeIdx];
              return (
                <motion.div key={`mob-dot-${activeIdx}`} className="absolute z-20 pointer-events-none"
                  style={{ left:`${b.tx*100}%`, top:`${b.ty*100}%`, transform:"translate(-50%,-50%)" }}
                  initial={{ opacity:0, scale:0 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0 }}>
                  <motion.div className="rounded-full"
                    style={{ width:14, height:14, background:dotColor, boxShadow:`0 0 12px 4px ${dotColor}80` }}
                    animate={{ scale:[1,1.5,1], opacity:[1,0.6,1] }}
                    transition={{ duration:0.9, repeat:Infinity, ease:"easeInOut" }} />
                </motion.div>
              );
            })()}
          </AnimatePresence>
        </div>

        {/* Détail au clic */}
        <AnimatePresence>
          {activeIdx !== null && (() => {
            const c = numColors[activeIdx];
            return (
              <motion.div key={`mob-desc-${activeIdx}`}
                initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:"auto" }} exit={{ opacity:0, height:0 }}
                transition={{ duration:0.2 }}
                style={{ flexShrink:0, overflow:"hidden", background:"rgba(0,0,0,0.5)", borderTop:`2px solid ${c}`, padding:"6px 10px" }}>
                <p style={{ fontFamily:"Roboto,sans-serif", fontWeight:700, fontSize:"9px", color:c, textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:"2px" }}>
                  {allBubbles[activeIdx].title}
                </p>
                <p style={{ fontFamily:"Roboto,sans-serif", fontWeight:400, fontSize:"8px", color:"rgba(255,255,255,0.7)", lineHeight:1.4 }}>
                  {allBubbles[activeIdx].desc}
                </p>
              </motion.div>
            );
          })()}
        </AnimatePresence>

        {/* 6 blocs footer */}
        <motion.div
          animate={{ scale: activeIdx !== null ? 0.95 : 1, y: activeIdx !== null ? -2 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ flexShrink:0, display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"3px", padding:"3px 3px 5px" }}>
          {allBubbles.map((b, i) => (
            <motion.div key={b.id} onClick={() => setActiveIdx(prev => prev === i ? null : i)}
              initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }}
              transition={{ duration:0.3, delay: i*0.04 }}
              style={{
                background: activeIdx===i ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.25)",
                border:`1px solid ${activeIdx===i ? numColors[i] : "rgba(255,255,255,0.12)"}`,
                borderRadius:"5px", padding:"5px 6px", cursor:"pointer",
                transition:"background 0.2s, border 0.2s",
              }}>
              <p style={{ fontFamily:"Roboto,sans-serif", fontWeight:700, fontSize:"5px", letterSpacing:"0.1em", textTransform:"uppercase", color:numColors[i], marginBottom:"2px" }}>
                {b.num.split(" — ")[1]}
              </p>
              <p style={{ fontFamily:"Roboto,sans-serif", fontWeight:900, fontSize:"7px", color:titleColors[i], lineHeight:1.1, textTransform:"uppercase" }}>
                {b.title}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

    </div>
  );
}

function FullpageFeatures() {
  const [current, setCurrent] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef(0);
  const isAnimatingRef = useRef(false);

  const goTo = (idx: number) => {
    const el = wrapperRef.current;
    if (!el || isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    currentRef.current = idx;
    setCurrent(idx);
    const top = el.getBoundingClientRect().top + window.scrollY + idx * window.innerHeight;
    window.scrollTo({ top, behavior: "smooth" });
    setTimeout(() => { isAnimatingRef.current = false; }, 900);
  };

  // ── Touch swipe mobile
  useEffect(() => {
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
    const onTouchEnd = (e: TouchEvent) => {
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top > 10 || rect.bottom < window.innerHeight - 10) return;
      const diff = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(diff) < 50) return;
      if (diff > 0 && currentRef.current < SLIDES.length - 1) goTo(currentRef.current + 1);
      else if (diff < 0 && currentRef.current > 0) goTo(currentRef.current - 1);
    };
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top > 10 || rect.bottom < window.innerHeight - 10) return;
      if (e.deltaY > 0 && currentRef.current === SLIDES.length - 1) return;
      if (e.deltaY < 0 && currentRef.current === 0) return;
      e.preventDefault();
      if (isAnimatingRef.current) return;
      if (e.deltaY > 0) goTo(currentRef.current + 1);
      else if (e.deltaY < 0) goTo(currentRef.current - 1);
    };

    const onScroll = () => {
      const el = wrapperRef.current;
      if (!el) return;

      const elTop = el.getBoundingClientRect().top + window.scrollY;
      const elBottom = elTop + el.offsetHeight;
      // Marge genereusse : reste "dans les slides" tout le long du wrapper
      const isInSlides = window.scrollY >= elTop - window.innerHeight * 0.5
                      && window.scrollY < elBottom - window.innerHeight * 0.5;

      // Dispatch uniquement hors animation pour eviter les faux slides-leave
      if (!isAnimatingRef.current) {
        if (isInSlides) {
          window.dispatchEvent(new Event("slides-enter"));
        } else {
          window.dispatchEvent(new Event("slides-leave"));
        }
      }

      if (isAnimatingRef.current) return;
      const scrolled = window.scrollY - elTop;
      if (scrolled < 0) return;
      const idx = Math.round(scrolled / window.innerHeight);
      const clamped = Math.max(0, Math.min(SLIDES.length - 1, idx));
      if (clamped !== currentRef.current) { currentRef.current = clamped; setCurrent(clamped); }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      // S'assurer que la navbar réapparaît en quittant la page
      window.dispatchEvent(new Event("slides-leave"));
    };
  }, []);

  const s = SLIDES[current];

  return (
    <div ref={wrapperRef} style={{ height: `${SLIDES.length * 100}vh` }}>
      <div style={{ position:"sticky", top:0, height:"100vh" }}>
        <AnimatePresence mode="wait">
          <motion.div key={s.id} className="absolute inset-0" style={{ background: s.bg }} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.45 }} />
        </AnimatePresence>

        {s.bg === "#0A0A0F" && (
          <div className="absolute inset-0 pointer-events-none">
            <div style={{ position:"absolute", top:0, left:0, width:"600px", height:"600px", background:"radial-gradient(circle, rgba(114,9,183,0.1) 0%, transparent 70%)" }} />
            <div style={{ position:"absolute", bottom:0, right:0, width:"500px", height:"500px", background:"radial-gradient(circle, rgba(181,23,158,0.07) 0%, transparent 70%)" }} />
          </div>
        )}

        <div className="absolute inset-0 z-10" style={{ padding:"0", paddingTop:"64px" }} id="slide-wrapper">
          <Slide s={s} />
        </div>

        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-30">
          {SLIDES.map((_, i) => (
            <div key={i} onClick={() => goTo(i)} className="rounded-full transition-all duration-300 cursor-pointer" style={{ width:5, height: i===current ? 28:5, background: i===current ? "#fff":"rgba(255,255,255,0.3)" }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function FonctionnalitesPage() {
  return (
    <>
      <Navbar />
      <main style={{ position: "relative", zIndex: 1, backgroundColor: "#080010" }}>
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <ResponsiveBg priority={true} />
          <motion.div initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.9, ease:[0.16,1,0.3,1] }} className="relative z-10 flex flex-col items-center text-center gap-6 px-6 max-w-4xl mx-auto pt-20">
            <h1 className="font-roboto font-900 uppercase leading-[0.92] text-white" style={{ fontSize:"clamp(52px,9vw,120px)", letterSpacing:"-0.02em", textShadow:"0 2px 20px rgba(0,0,0,0.25)", lineHeight:"0.95" }}>
              Conçu pour<br /><span style={{ color:"#f72585" }}>créer du lien.</span>
            </h1>
            <p className="font-roboto font-400 max-w-lg text-center" style={{ fontSize:"clamp(15px,1.5vw,18px)", color:"rgba(255,255,255,0.7)" }}>
              Le sport est le prétexte. Ce qu'on construit vraiment, c'est le lien entre les gens.
            </p>
          </motion.div>
        </section>

        <FullpageFeatures />

        <section style={{ background:"#fff" }} className="py-32 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-[600px] h-[400px] pointer-events-none" style={{ background:"radial-gradient(ellipse, rgba(114,9,183,0.06) 0%, transparent 70%)" }} />
          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16">
            <motion.h2 initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:"-100px" }} transition={{ duration:0.8, ease:[0.16,1,0.3,1] }} className="font-roboto font-900 uppercase leading-[0.88] tracking-[-0.03em] text-black mb-4" style={{ fontSize:"clamp(40px,5.5vw,72px)" }}>
              Peu importe<br /><span style={{ color:"#f72585" }}>ton sport.</span>
            </motion.h2>
            <p className="font-roboto font-400 text-black/45 mb-16 max-w-md" style={{ fontSize:"clamp(14px,1.4vw,17px)" }}>
              Mood2Fit s'adapte à toutes les disciplines. Peu importe ton sport, tu trouveras des gens qui pratiquent comme toi.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-px" style={{ background:"rgba(0,0,0,0.08)" }}>
              {activities.map((a, i) => (
                <motion.div key={a.name} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:"-50px" }} transition={{ duration:0.5, delay:i*0.04 }} className="flex flex-col gap-1.5 p-6 md:p-8 group cursor-default bg-white" whileHover={{ backgroundColor:"#faf7ff" }}>
                  <span className="font-roboto font-900 text-black group-hover:text-[#f72585] transition-colors duration-200" style={{ fontSize:"clamp(15px,1.6vw,18px)" }}>{a.name}</span>
                  <span className="font-roboto font-400 text-black/35 text-sm">{a.desc}</span>
                  <div className="h-px w-0 group-hover:w-8 transition-all duration-300 mt-1" style={{ background:"#f72585" }} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative flex items-center justify-center overflow-hidden py-40" style={{ background:"#f72585" }}>
          <div className="absolute bottom-0 left-0 w-[500px] h-[400px] pointer-events-none" style={{ background:"radial-gradient(ellipse, rgba(114,9,183,0.25) 0%, transparent 65%)" }} />
          <div className="absolute top-0 right-0 w-[300px] h-[300px] pointer-events-none" style={{ background:"radial-gradient(circle, rgba(181,23,158,0.2) 0%, transparent 70%)" }} />
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <motion.h2 initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.9, ease:[0.16,1,0.3,1] }} className="font-roboto font-900 text-white uppercase leading-[0.85] tracking-[-0.04em] mb-10" style={{ fontSize:"clamp(56px,9vw,120px)" }}>
              Commence<br />maintenant.
            </motion.h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#" className="flex items-center gap-3 px-9 py-4 rounded-full font-roboto font-700 text-sm text-black bg-white hover:scale-[1.03] active:scale-[0.97] transition-all" style={{ boxShadow:"0 8px 40px rgba(0,0,0,0.2)" }}>
                <Image src="/app/apple.png" alt="Apple" width={22} height={22} style={{ objectFit: "contain", filter: "brightness(0)" }} />
                <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
                  <span style={{ fontSize: "9px", color: "rgba(0,0,0,0.5)", lineHeight: 1 }}>Télécharger sur</span>
                  <span style={{ fontSize: "14px", fontWeight: 700, color: "#000", lineHeight: 1.2 }}>App Store</span>
                </div>
              </Link>
              <Link href="#" className="flex items-center gap-3 px-9 py-4 rounded-full font-roboto font-700 text-sm text-white border-2 border-black/20 hover:border-black/40 active:scale-[0.97] transition-all" style={{ background: "#000" }}>
                <Image src="/app/android.png" alt="Google Play" width={22} height={22} style={{ objectFit: "contain" }} />
                <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
                  <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.6)", lineHeight: 1 }}>Disponible sur</span>
                  <span style={{ fontSize: "14px", fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>Google Play</span>
                </div>
              </Link>
            </div>
            <p className="font-roboto text-xs text-white/40 mt-8 tracking-widest uppercase">Bientôt disponible sur les stores</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}