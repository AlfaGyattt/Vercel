"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { articlesContent } from "@/data/content";
import { fadeInUp, staggerContainer } from "@/lib/utils";

export default function Articles() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="magazine"
      className="section-padding relative overflow-hidden"
      aria-label="Articles et conseils Mood2Fit"
    >
      {/* Fond */}
      <div className="absolute inset-0 bg-[#080010]" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#4cc9f0]/05 blur-[100px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div>
            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-[rgba(76,201,240,0.1)] border border-[rgba(76,201,240,0.25)] text-xs font-dm font-500 text-[#4cc9f0] tracking-widest uppercase mb-5"
            >
              {articlesContent.eyebrow}
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="font-syne font-800 text-4xl md:text-5xl lg:text-6xl text-[#faf4ff] leading-tight"
            >
              {articlesContent.title}
            </motion.h2>
          </div>

          <motion.div variants={fadeInUp}>
            <Link
              href="#"
              className="inline-flex items-center gap-2 text-sm font-dm font-500 text-[rgba(250,244,255,0.5)] hover:text-[#4cc9f0] transition-colors duration-200 group"
              aria-label="Voir tous les articles"
            >
              Voir tout
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </Link>
          </motion.div>
        </motion.div>

        {/* Cartes */}
        <motion.div
          className="grid md:grid-cols-3 gap-5 md:gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {articlesContent.articles.map((article) => (
            <motion.article
              key={article.id}
              variants={fadeInUp}
              className="group flex flex-col rounded-brand bg-[#0f0018] border border-[rgba(250,244,255,0.06)] hover:border-[rgba(247,37,133,0.2)] overflow-hidden transition-all duration-300 hover:shadow-card cursor-pointer"
              aria-label={`Article : ${article.title}`}
            >
              {/* Image placeholder */}
              <div
                className={`relative h-48 bg-gradient-to-br ${article.imageBg} flex items-center justify-center overflow-hidden`}
                aria-hidden="true"
              >
                <span className="text-6xl opacity-50 group-hover:scale-110 transition-transform duration-500">
                  {article.imageEmoji}
                </span>

                {/* Overlay hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0018]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Tag catégorie */}
                <div className="absolute top-4 left-4">
                  <span
                    className="px-3 py-1 rounded-pill text-xs font-dm font-500 border"
                    style={{
                      background: `${article.tagColor}20`,
                      borderColor: `${article.tagColor}40`,
                      color: article.tagColor,
                    }}
                  >
                    {article.tag}
                  </span>
                </div>
              </div>

              {/* Contenu */}
              <div className="flex flex-col flex-1 p-5 md:p-6 gap-3">
                {/* Titre */}
                <h3 className="font-syne font-700 text-base md:text-lg text-[#faf4ff] leading-snug group-hover:gradient-text transition-all duration-300">
                  {article.title}
                </h3>

                {/* Description */}
                <p className="text-sm font-dm font-300 text-[rgba(250,244,255,0.55)] leading-relaxed flex-1">
                  {article.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-[rgba(250,244,255,0.06)]">
                  <div className="flex items-center gap-1.5 text-xs font-dm text-[rgba(250,244,255,0.35)]">
                    <Clock size={12} aria-hidden="true" />
                    {article.readTime} de lecture
                  </div>
                  <ArrowRight
                    size={16}
                    className="text-[rgba(250,244,255,0.3)] group-hover:text-[#f72585] group-hover:translate-x-1 transition-all duration-200"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
