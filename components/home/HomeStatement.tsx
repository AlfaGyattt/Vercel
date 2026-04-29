"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 7000000, display: "7M+", label: "sportifs en salle en France" },
  { value: 29, display: "29%", label: "abandonnent faute de motivation" },
  { value: 2400, display: "2 400+", label: "sur la liste d'attente" },
];

export default function HomeStatement() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-150px" });

  return (
    <section ref={ref} style={{ background: "#fff" }}>

      {/* Phrase choc — fond blanc, style Nike */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-32 md:py-48">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-roboto font-900 uppercase leading-[0.9] tracking-[-0.03em] text-black"
          style={{ fontSize: "clamp(48px, 8vw, 110px)" }}
        >
          Trouver un<br />partenaire de sport<br />ne devrait pas être<br />
          <span style={{ color: "#f72585" }}>compliqué.</span>
        </motion.h2>
      </div>

      {/* Bande stats — fond noir */}
      <div style={{ background: "#000" }} className="py-1">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.15 * i, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-2 py-14 px-10 md:px-14"
              >
                <span
                  className="font-roboto font-900 leading-none tracking-[-0.04em]"
                  style={{ fontSize: "clamp(56px, 7vw, 88px)", color: "#f72585" }}
                >
                  {s.display}
                </span>
                <span className="font-roboto font-400 text-white/50 text-base leading-snug mt-1">
                  {s.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}