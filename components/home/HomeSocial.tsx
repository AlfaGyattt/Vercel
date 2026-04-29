"use client";

import { motion } from "framer-motion";

const proof = [
  { stat: "94%", label: "taux de matching réussi", icon: "🎯" },
  { stat: "3 mois", label: "de streak moyen", icon: "🔥" },
  { stat: "2 400+", label: "sur la liste d'attente", icon: "⚡" },
];

export default function HomeSocial() {
  return (
    <section style={{ background: "#fff" }}>

      {/* Phrase centrale */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 pt-32 pb-20">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-roboto font-900 uppercase leading-[0.88] tracking-[-0.03em] text-black"
          style={{ fontSize: "clamp(44px, 7.5vw, 104px)" }}
        >
          Seul on va<br />plus vite.<br />
          <span style={{ color: "#f72585" }}>Ensemble<br />on va plus loin.</span>
        </motion.h2>
      </div>

      {/* 3 stats — style carte épurée */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 pb-32">
        <div className="grid md:grid-cols-3 gap-px bg-black/10">
          {proof.map((p, i) => (
            <motion.div
              key={p.stat}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-4 p-10 md:p-14 bg-white group"
              whileHover={{ backgroundColor: "#fafafa" }}
            >
              <span className="text-4xl">{p.icon}</span>
              <span
                className="font-roboto font-900 leading-none tracking-[-0.04em]"
                style={{ fontSize: "clamp(48px, 6vw, 76px)", color: "#f72585" }}
              >
                {p.stat}
              </span>
              <span className="font-roboto font-400 text-black/50 text-base">
                {p.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}