"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { statsContent } from "@/data/content";
import { fadeInUp, staggerContainer } from "@/lib/utils";

// Hook compteur animé
function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;

    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, duration, active]);

  return count;
}

// Composant stat individuel
interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
  source: string;
  index: number;
  active: boolean;
}

function StatItem({ value, suffix, label, source, active }: StatItemProps) {
  const count = useCountUp(value, 2000, active);

  return (
    <motion.div
      variants={fadeInUp}
      className="flex flex-col items-center md:items-start gap-2 relative group"
    >
      {/* Valeur */}
      <div className="flex items-baseline gap-0.5">
        <span className="font-syne font-800 text-5xl md:text-6xl gradient-text stat-number tabular-nums">
          {count.toLocaleString("fr-FR")}
        </span>
        <span className="font-syne font-800 text-3xl md:text-4xl gradient-text">
          {suffix}
        </span>
      </div>

      {/* Label */}
      <p className="text-sm md:text-base font-dm font-400 text-[rgba(250,244,255,0.7)] text-center md:text-left leading-snug max-w-[180px] md:max-w-none">
        {label}
      </p>

      {/* Source */}
      <p className="text-xs font-dm text-[rgba(250,244,255,0.3)] uppercase tracking-widest">
        {source}
      </p>

      {/* Ligne décorative */}
      <div className="absolute -bottom-0 left-0 w-0 h-px bg-gradient-brand group-hover:w-full transition-all duration-500 hidden md:block" />
    </motion.div>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="stats"
      aria-label="Chiffres clés du marché sport"
      className="relative py-16 md:py-24 overflow-hidden"
    >
      {/* Fond légèrement différent */}
      <div className="absolute inset-0 bg-[#0f0018]" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(247,37,133,0.03)] to-transparent" />

      {/* Ligne décorative haut */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(247,37,133,0.2)] to-transparent" />
      {/* Ligne décorative bas */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(247,37,133,0.2)] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8" ref={ref}>
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {statsContent.map((stat, i) => (
            <StatItem key={stat.label} {...stat} index={i} active={isInView} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
