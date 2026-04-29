"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "Mood2Fit m'a redonné une raison de remettre mes baskets.",
    name: "Inès",
    city: "Lyon · Musculation",
    color: "#f72585",
  },
  {
    quote: "Un groupe de street workout trouvé en 20 minutes. On s'entraîne ensemble depuis 3 mois.",
    name: "Karim",
    city: "Paris 19e · Street Workout",
    color: "#b5179e",
  },
  {
    quote: "J'attends le vendredi pour le run avec Léa. C'est devenu mon rituel.",
    name: "Maxime",
    city: "Bordeaux · Running",
    color: "#7209b7",
  },
];

export default function HomeTestimonials() {
  return (
    <section style={{ background: "#000" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-32">

        {/* Label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-roboto font-700 text-xs tracking-[0.2em] uppercase text-white/40 mb-16"
        >
          Ce qu&apos;ils disent
        </motion.p>

        {/* Citations empilées — style Nike */}
        <div className="flex flex-col divide-y divide-white/10">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col md:flex-row md:items-center gap-6 md:gap-16 py-10 md:py-14 group cursor-default"
            >
              {/* Numéro */}
              <span
                className="font-roboto font-900 text-2xl flex-shrink-0 md:w-16"
                style={{ color: t.color }}
              >
                0{i + 1}
              </span>

              {/* Citation */}
              <p
                className="font-roboto font-700 leading-tight tracking-[-0.02em] text-white flex-1 group-hover:text-white/90 transition-colors"
                style={{ fontSize: "clamp(22px, 3.5vw, 44px)" }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Auteur */}
              <div className="flex-shrink-0 md:text-right">
                <p className="font-roboto font-700 text-base text-white">{t.name}</p>
                <p className="font-roboto font-400 text-sm text-white/40 mt-0.5">{t.city}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}