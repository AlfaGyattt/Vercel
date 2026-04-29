"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/utils";

const steps = [
  {
    num: "1",
    emoji: "👤",
    title: "Crée ton profil",
    desc: "Indique tes disciplines, ton niveau, tes disponibilités et tes objectifs. Plus ton profil est précis, meilleur est le matching.",
  },
  {
    num: "2",
    emoji: "⚡",
    title: "Reçois des matchs",
    desc: "Notre algorithme analyse ton profil et te propose des partenaires compatibles autour de toi en fonction de ton mood du moment.",
  },
  {
    num: "3",
    emoji: "🏋️",
    title: "Entraîne-toi ensemble",
    desc: "Contacte ton partenaire, fixez un créneau, lancez-vous. Suivez vos progrès et relevez des challenges en duo.",
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 overflow-hidden bg-[#0f0018]" ref={ref}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(247,37,133,0.15)] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(247,37,133,0.15)] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8">
        <motion.div
          className="text-center mb-14"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.span variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-[rgba(247,37,133,0.1)] border border-[rgba(247,37,133,0.25)] text-xs font-dm font-500 text-[#f72585] tracking-widest uppercase mb-5">
            Comment ça marche
          </motion.span>
          <motion.h2 variants={fadeInUp} className="font-syne font-800 text-4xl md:text-5xl text-[#faf4ff] leading-tight">
            3 étapes pour trouver<br />
            <span className="gradient-text">ton partenaire idéal</span>
          </motion.h2>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 border border-[rgba(247,37,133,0.12)] rounded-brand overflow-hidden gap-px bg-[rgba(247,37,133,0.08)]"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {steps.map((step) => (
            <motion.div
              key={step.num}
              variants={fadeInUp}
              className="flex flex-col gap-4 p-8 md:p-11 bg-[#0f0018] hover:bg-[#160022] transition-colors duration-300 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[rgba(247,37,133,0.12)] border border-[rgba(247,37,133,0.25)] flex items-center justify-center font-syne font-800 text-[#f72585] text-lg">
                  {step.num}
                </div>
              </div>
              <div className="text-[34px]">{step.emoji}</div>
              <h3 className="font-syne font-700 text-lg text-[#faf4ff]">{step.title}</h3>
              <p className="text-sm font-dm text-[rgba(250,244,255,0.55)] leading-[1.65]">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}