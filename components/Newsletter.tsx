"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle, Loader2, ChevronRight } from "lucide-react";
import { newsletterContent } from "@/data/content";
import { fadeInUp, staggerContainer } from "@/lib/utils";

// Schéma Zod
const newsletterSchema = z.object({
  firstname: z
    .string()
    .min(2, "Le prénom doit contenir au moins 2 caractères")
    .max(50, "Le prénom est trop long")
    .trim(),
  email: z
    .string()
    .email("Adresse email invalide")
    .max(100, "L'email est trop long"),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

const bulletIcons = ["🔥", "📬", "🎯"];

export default function Newsletter() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterFormData) => {
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSubmitted(true);
        reset();
      }
    } catch {
      // Fallback : on affiche quand même la confirmation pour la démo
      setSubmitted(true);
      reset();
    }
  };

  const { eyebrow, title, benefits, formLabels } = newsletterContent;

  return (
    <section
      id="newsletter"
      className="section-padding relative overflow-hidden"
      aria-label="Inscription à la newsletter Mood2Fit"
    >
      {/* Fond */}
      <div className="absolute inset-0 bg-[#080010]" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] -translate-y-1/2 bg-[#7209b7]/08 blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8" ref={ref}>
        <motion.div
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Colonne gauche */}
          <div className="flex flex-col gap-6">
            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-[rgba(247,37,133,0.1)] border border-[rgba(247,37,133,0.25)] text-xs font-dm font-500 text-[#f72585] tracking-widest uppercase w-fit"
            >
              {eyebrow}
            </motion.span>

            <motion.h2
              variants={fadeInUp}
              className="font-syne font-800 text-4xl md:text-5xl text-[#faf4ff] leading-tight"
            >
              {title}
            </motion.h2>

            <motion.ul
              variants={staggerContainer}
              className="flex flex-col gap-4 mt-2"
              role="list"
            >
              {benefits.map((benefit, i) => (
                <motion.li
                  key={i}
                  variants={fadeInUp}
                  className="flex items-start gap-3"
                >
                  <span
                    className="flex-shrink-0 w-7 h-7 rounded-lg bg-[rgba(247,37,133,0.1)] border border-[rgba(247,37,133,0.2)] flex items-center justify-center text-sm"
                    aria-hidden="true"
                  >
                    {bulletIcons[i]}
                  </span>
                  <span className="text-sm md:text-base font-dm font-400 text-[rgba(250,244,255,0.7)] leading-snug pt-0.5">
                    {benefit}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Colonne droite — Formulaire */}
          <motion.div variants={fadeInUp}>
            <div className="relative p-6 md:p-8 rounded-brand glow-border bg-gradient-card overflow-hidden">
              {/* Glow décoratif dans la carte */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#f72585]/10 blur-[60px] rounded-full" />

              <AnimatePresence mode="wait">
                {submitted ? (
                  // État succès
                  <motion.div
                    key="success"
                    className="flex flex-col items-center gap-4 py-8 text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  >
                    <div className="w-16 h-16 rounded-full bg-[rgba(6,214,160,0.15)] border border-[rgba(6,214,160,0.3)] flex items-center justify-center">
                      <CheckCircle
                        size={32}
                        className="text-[#06d6a0]"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <p className="font-syne font-700 text-xl text-[#faf4ff] mb-1">
                        {formLabels.success}
                      </p>
                      <p className="text-sm font-dm text-[rgba(250,244,255,0.55)]">
                        {formLabels.successSub}
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  // Formulaire
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit(onSubmit)}
                    className="relative z-10 flex flex-col gap-5"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    noValidate
                    aria-label="Formulaire d'inscription newsletter"
                  >
                    {/* Prénom */}
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="newsletter-firstname"
                        className="text-xs font-dm font-500 text-[rgba(250,244,255,0.6)] uppercase tracking-widest"
                      >
                        {formLabels.firstname}
                      </label>
                      <input
                        id="newsletter-firstname"
                        type="text"
                        autoComplete="given-name"
                        className={`w-full px-4 py-3.5 rounded-brand bg-[rgba(250,244,255,0.04)] border text-sm font-dm text-[#faf4ff] placeholder-[rgba(250,244,255,0.25)] focus:outline-none transition-all duration-200 ${
                          errors.firstname
                            ? "border-[#f72585] focus:border-[#f72585]"
                            : "border-[rgba(250,244,255,0.1)] focus:border-[rgba(247,37,133,0.4)] hover:border-[rgba(250,244,255,0.15)]"
                        }`}
                        placeholder="Alex"
                        {...register("firstname")}
                        aria-describedby={
                          errors.firstname ? "firstname-error" : undefined
                        }
                        aria-invalid={!!errors.firstname}
                      />
                      {errors.firstname && (
                        <p
                          id="firstname-error"
                          role="alert"
                          className="text-xs text-[#f72585] font-dm"
                        >
                          {errors.firstname.message}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="newsletter-email"
                        className="text-xs font-dm font-500 text-[rgba(250,244,255,0.6)] uppercase tracking-widest"
                      >
                        {formLabels.email}
                      </label>
                      <input
                        id="newsletter-email"
                        type="email"
                        autoComplete="email"
                        className={`w-full px-4 py-3.5 rounded-brand bg-[rgba(250,244,255,0.04)] border text-sm font-dm text-[#faf4ff] placeholder-[rgba(250,244,255,0.25)] focus:outline-none transition-all duration-200 ${
                          errors.email
                            ? "border-[#f72585] focus:border-[#f72585]"
                            : "border-[rgba(250,244,255,0.1)] focus:border-[rgba(247,37,133,0.4)] hover:border-[rgba(250,244,255,0.15)]"
                        }`}
                        placeholder="alex@exemple.com"
                        {...register("email")}
                        aria-describedby={
                          errors.email ? "email-error" : undefined
                        }
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && (
                        <p
                          id="email-error"
                          role="alert"
                          className="text-xs text-[#f72585] font-dm"
                        >
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center justify-center gap-2 w-full py-4 rounded-brand bg-gradient-brand text-[#faf4ff] font-dm font-500 text-sm hover:opacity-90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 transition-all duration-200 shadow-glow"
                      aria-label={isSubmitting ? "Envoi en cours" : "S'abonner à la newsletter"}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2
                            size={16}
                            className="animate-spin"
                            aria-hidden="true"
                          />
                          {formLabels.submitting}
                        </>
                      ) : (
                        <>
                          {formLabels.submit}
                          <ChevronRight
                            size={16}
                            className="group-hover:translate-x-1"
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </button>

                    <p className="text-xs font-dm text-[rgba(250,244,255,0.3)] text-center">
                      Zéro spam. Désabonnement en un clic.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
