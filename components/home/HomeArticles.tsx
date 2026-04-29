"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const articles = [
  {
    id: "a1",
    tag: "Motivation",
    tagColor: "#f72585",
    title: "Pourquoi s'entraîner seul est le meilleur moyen d'abandonner",
    desc: "La science derrière la motivation sociale et comment un partenaire change tout.",
    readTime: "4 min",
    emoji: "🧠",
  },
  {
    id: "a2",
    tag: "Nutrition",
    tagColor: "#06d6a0",
    title: "Manger juste avant la séance : mythe ou réalité ?",
    desc: "Ce que dit vraiment la science sur le timing nutritionnel autour de l'effort.",
    readTime: "5 min",
    emoji: "🥗",
  },
  {
    id: "a3",
    tag: "Santé",
    tagColor: "#4cc9f0",
    title: "Récupération musculaire : les 3 erreurs que tout le monde fait",
    desc: "Sommeil, nutrition, étirements — après la séance, tout compte.",
    readTime: "6 min",
    emoji: "💪",
  },
];

export default function HomeArticles() {
  return (
    <section style={{ background: "#f7f4fb" }} className="py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-16">

        {/* Header */}
        <div className="flex items-end justify-between mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-roboto font-900 uppercase leading-[0.88] tracking-[-0.03em] text-black"
            style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
          >
            Pour aller<br />
            <span style={{ color: "#f72585" }}>plus loin.</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="#"
              className="font-roboto font-700 text-xs tracking-[0.15em] uppercase text-black/35 hover:text-black transition-colors duration-200"
            >
              Voir tout →
            </Link>
          </motion.div>
        </div>

        {/* Cartes — fond blanc sur fond lavande = bon contraste */}
        <div className="grid md:grid-cols-3 gap-5">
          {articles.map((a, i) => (
            <motion.article
              key={a.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col gap-5 p-7 cursor-pointer"
              style={{
                background: "#fff",
                borderRadius: "20px",
                boxShadow: "0 2px 20px rgba(0,0,0,0.06)",
                transition: "box-shadow 0.3s ease, transform 0.3s ease",
              }}
              whileHover={{
                y: -6,
                boxShadow: "0 12px 40px rgba(0,0,0,0.1)",
              }}
            >
              {/* Tag */}
              <span
                className="font-roboto font-700 text-[10px] tracking-[0.2em] uppercase"
                style={{ color: a.tagColor }}
              >
                {a.tag}
              </span>

              {/* Titre */}
              <h3
                className="font-roboto font-700 text-black leading-snug"
                style={{ fontSize: "clamp(16px, 1.6vw, 20px)" }}
              >
                {a.title}
              </h3>

              {/* Desc */}
              <p className="font-roboto font-400 text-black/45 leading-relaxed text-sm flex-1">
                {a.desc}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4"
                style={{ borderTop: `1px solid rgba(0,0,0,0.06)` }}>
                <span className="font-roboto text-[11px] text-black/30">
                  {a.readTime} de lecture
                </span>
                <span
                  className="font-roboto font-700 text-[11px] tracking-[0.1em] uppercase group-hover:translate-x-1 transition-transform duration-200 inline-block"
                  style={{ color: a.tagColor }}
                >
                  Lire →
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}