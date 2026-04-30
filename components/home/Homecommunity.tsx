"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
 
const BASE = [
  {
    id: "t1",
    quote: "Mood2Fit m'a redonné une raison de remettre mes baskets. Je n'ai pas annulé une seule séance depuis.",
    name: "Inès", city: "Lyon", sport: "Musculation 💪",
    color: "#f72585", streak: "3 mois", initials: "IN",
  },
  {
    id: "t2",
    quote: "Un groupe de street workout trouvé en 20 minutes. On s'entraîne ensemble depuis 3 mois. Mon niveau a explosé.",
    name: "Karim", city: "Paris 19e", sport: "Street Workout 🏋️",
    color: "#b5179e", streak: "12 semaines", initials: "KA",
  },
  {
    id: "t3",
    quote: "J'attends le vendredi pour le run avec Léa. C'est devenu mon rituel préféré de la semaine.",
    name: "Maxime", city: "Bordeaux", sport: "Running 🏃",
    color: "#7209b7", streak: "9 semaines", initials: "MA",
  },
  {
    id: "t4",
    quote: "Premier cours HIIT en groupe trouvé sur Mood2Fit. Tout le monde était bienveillant. Je reviens chaque vendredi.",
    name: "Sofia", city: "Paris 15e", sport: "HIIT 🔥",
    color: "#4cc9f0", streak: "6 semaines", initials: "SO",
  },
];

// Tripler les items pour scroll infini fluide
const testimonials = [...BASE, ...BASE, ...BASE];
const OFFSET = BASE.length; // index de départ = milieu

const CARD_WIDTH = 380;
const CARD_GAP = 20;
const TOTAL = CARD_WIDTH + CARD_GAP;

export default function HomeCommunity() {
  const [current, setCurrent] = useState(OFFSET);
  const x = useMotionValue(-OFFSET * TOTAL);
  const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const isAnimating = useRef(false);

  const goTo = (index: number, instant = false) => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setCurrent(index);
    animate(x, -index * TOTAL, {
      type: "spring", stiffness: 300, damping: 35,
      onComplete: () => {
        isAnimating.current = false;
        // Repositionnement silencieux si on sort de la zone centrale
        if (index <= OFFSET - 1) {
          const adjusted = index + BASE.length;
          setCurrent(adjusted);
          x.set(-adjusted * TOTAL);
        } else if (index >= OFFSET + BASE.length * 2 - 1) {
          const adjusted = index - BASE.length;
          setCurrent(adjusted);
          x.set(-adjusted * TOTAL);
        }
      },
    });
  };

  const startAutoScroll = () => {
    stopAutoScroll();
    autoTimer.current = setInterval(() => {
      setCurrent((prev) => {
        const next = prev + 1;
        animate(x, -next * TOTAL, {
          type: "spring", stiffness: 300, damping: 35,
          onComplete: () => {
            // Si on arrive trop loin, on repositionne silencieusement
            if (next >= OFFSET + BASE.length * 2) {
              const adjusted = next - BASE.length;
              setCurrent(adjusted);
              x.set(-adjusted * TOTAL);
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
    if (info.offset.x < -80 || info.velocity.x < -400) goTo(current + 1);
    else if (info.offset.x > 80 || info.velocity.x > 400) goTo(current - 1);
    else goTo(current);
    resetInactivity();
  };

  const handleNav = (delta: number) => {
    goTo(current + delta);
    resetInactivity();
  };

  // Index réel pour les dots (modulo BASE)
  const dotIndex = ((current - OFFSET) % BASE.length + BASE.length) % BASE.length;

  return (
    <section style={{ background: "#fff" }} className="py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="flex items-end justify-between mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-roboto font-900 uppercase leading-[0.88] tracking-[-0.03em] text-black"
            style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
          >
            Pas des avis.<br />
            <span style={{ color: "#f72585" }}>Des vraies histoires.</span>
          </motion.h2>

          <div className="hidden md:flex items-center gap-3">
            {[-1, 1].map((delta) => (
              <button
                key={delta}
                onClick={() => handleNav(delta)}
                className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105"
                style={{ border: "1.5px solid rgba(0,0,0,0.15)" }}
                aria-label={delta === -1 ? "Précédent" : "Suivant"}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d={delta === -1 ? "M10 3L5 8L10 13" : "M6 3L11 8L6 13"}
                    stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                  />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="pl-6 md:pl-16">
        <motion.div
          className="flex cursor-grab active:cursor-grabbing"
          style={{ x, gap: CARD_GAP }}
          drag="x"
          dragConstraints={{ left: -99999, right: 0 }}
          dragElastic={0.03}
          onDragStart={stopAutoScroll}
          onDragEnd={handleDragEnd}
        >
          {testimonials.map((t, i) => {
            const isActive = i === current;
            return (
              <motion.div
                key={`${t.id}-${i}`}
                className="flex-shrink-0 flex flex-col justify-between p-7 select-none"
                style={{
                  width: CARD_WIDTH,
                  borderRadius: "20px",
                  background: isActive ? "#000" : "#f7f4fb",
                  minHeight: "280px",
                  transition: "background 0.4s ease",
                }}
                animate={{ scale: isActive ? 1 : 0.96, opacity: isActive ? 1 : 0.6 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="font-roboto font-400 leading-relaxed italic"
                  style={{ fontSize: "16px", color: isActive ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.65)" }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center justify-between mt-6 pt-5"
                  style={{ borderTop: `1px solid ${isActive ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}` }}>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center font-roboto font-700 text-white text-xs flex-shrink-0"
                      style={{ background: `linear-gradient(135deg, ${t.color}, #7209b7)` }}>
                      {t.initials}
                    </div>
                    <div>
                      <p className="font-roboto font-700 text-sm" style={{ color: isActive ? "#fff" : "#000" }}>
                        {t.name} · {t.city}
                      </p>
                      <p className="font-roboto text-xs mt-0.5" style={{ color: isActive ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.35)" }}>
                        {t.sport}
                      </p>
                    </div>
                  </div>
                  <span className="font-roboto font-700 text-[10px] tracking-[0.1em] uppercase px-2.5 py-1.5 rounded-full flex-shrink-0"
                    style={{ background: `${t.color}18`, color: t.color }}>
                    {t.streak}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Dots — basés sur BASE uniquement */}
        <div className="flex items-center gap-2 mt-8">
          {BASE.map((_, i) => (
            <button
              key={i}
              onClick={() => { goTo(OFFSET + i); resetInactivity(); }}
              aria-label={`Témoignage ${i + 1}`}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === dotIndex ? 28 : 7,
                height: 7,
                background: i === dotIndex ? "#f72585" : "rgba(0,0,0,0.15)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}