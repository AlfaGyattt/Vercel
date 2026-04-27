"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle, Loader2, Send, Mail, MessageSquare } from "lucide-react";
import { contactContent } from "@/data/content";
import { fadeInUp, staggerContainer } from "@/lib/utils";

const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(80, "Le nom est trop long")
    .trim(),
  email: z
    .string()
    .email("Adresse email invalide")
    .max(100, "L'email est trop long"),
  subject: z
    .string()
    .min(3, "Le sujet doit contenir au moins 3 caractères")
    .max(150, "Le sujet est trop long")
    .trim(),
  message: z
    .string()
    .min(20, "Le message doit contenir au moins 20 caractères")
    .max(2000, "Le message est trop long")
    .trim(),
});

type ContactFormData = z.infer<typeof contactSchema>;

const SUBJECTS = [
  "Question générale",
  "Signaler un bug",
  "Partenariat",
  "Presse",
  "Autre",
];

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (_data: ContactFormData) => {
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitted(true);
    reset();
  };

  const { eyebrow, title, subtitle, formLabels } = contactContent;

  return (
    <section
      id="contact"
      className="section-padding relative overflow-hidden"
      aria-label="Formulaire de contact Mood2Fit"
    >
      {/* Fond */}
      <div className="absolute inset-0 bg-[#0f0018]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(247,37,133,0.15)] to-transparent" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] -translate-y-1/2 bg-[#f72585]/05 blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-5xl mx-auto px-5 md:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.span
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-[rgba(247,37,133,0.1)] border border-[rgba(247,37,133,0.25)] text-xs font-dm font-500 text-[#f72585] tracking-widest uppercase mb-5"
          >
            {eyebrow}
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="font-syne font-800 text-4xl md:text-5xl text-[#faf4ff] leading-tight mb-4"
          >
            {title}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-base font-dm font-300 text-[rgba(250,244,255,0.55)] max-w-md mx-auto"
          >
            {subtitle}
          </motion.p>
        </motion.div>

        {/* Formulaire */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="p-6 md:p-10 rounded-brand glow-border bg-gradient-card relative overflow-hidden">
            {/* Décoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#7209b7]/10 blur-[80px] rounded-full pointer-events-none" />

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  className="flex flex-col items-center gap-5 py-16 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="w-20 h-20 rounded-full bg-[rgba(6,214,160,0.12)] border border-[rgba(6,214,160,0.3)] flex items-center justify-center">
                    <CheckCircle size={40} className="text-[#06d6a0]" />
                  </div>
                  <div>
                    <p className="font-syne font-700 text-2xl text-[#faf4ff] mb-2">
                      {formLabels.success}
                    </p>
                    <p className="text-base font-dm text-[rgba(250,244,255,0.55)]">
                      {formLabels.successSub}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="relative z-10 grid md:grid-cols-2 gap-5"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  noValidate
                  aria-label="Formulaire de contact"
                >
                  {/* Nom */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-name"
                      className="text-xs font-dm font-500 text-[rgba(250,244,255,0.6)] uppercase tracking-widest"
                    >
                      {formLabels.name}
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      autoComplete="name"
                      className={`w-full px-4 py-3.5 rounded-brand bg-[rgba(250,244,255,0.04)] border text-sm font-dm text-[#faf4ff] placeholder-[rgba(250,244,255,0.25)] focus:outline-none transition-all duration-200 ${
                        errors.name
                          ? "border-[#f72585]"
                          : "border-[rgba(250,244,255,0.1)] focus:border-[rgba(247,37,133,0.4)]"
                      }`}
                      placeholder="Alex Martin"
                      {...register("name")}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" role="alert" className="text-xs text-[#f72585] font-dm">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-email"
                      className="text-xs font-dm font-500 text-[rgba(250,244,255,0.6)] uppercase tracking-widest"
                    >
                      {formLabels.email}
                    </label>
                    <div className="relative">
                      <Mail
                        size={14}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[rgba(250,244,255,0.3)]"
                        aria-hidden="true"
                      />
                      <input
                        id="contact-email"
                        type="email"
                        autoComplete="email"
                        className={`w-full pl-10 pr-4 py-3.5 rounded-brand bg-[rgba(250,244,255,0.04)] border text-sm font-dm text-[#faf4ff] placeholder-[rgba(250,244,255,0.25)] focus:outline-none transition-all duration-200 ${
                          errors.email
                            ? "border-[#f72585]"
                            : "border-[rgba(250,244,255,0.1)] focus:border-[rgba(247,37,133,0.4)]"
                        }`}
                        placeholder="alex@exemple.com"
                        {...register("email")}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "contact-email-error" : undefined}
                      />
                    </div>
                    {errors.email && (
                      <p id="contact-email-error" role="alert" className="text-xs text-[#f72585] font-dm">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Sujet — pleine largeur */}
                  <div className="md:col-span-2 flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-subject"
                      className="text-xs font-dm font-500 text-[rgba(250,244,255,0.6)] uppercase tracking-widest"
                    >
                      {formLabels.subject}
                    </label>
                    <select
                      id="contact-subject"
                      className={`w-full px-4 py-3.5 rounded-brand bg-[rgba(250,244,255,0.04)] border text-sm font-dm text-[#faf4ff] focus:outline-none transition-all duration-200 appearance-none cursor-pointer ${
                        errors.subject
                          ? "border-[#f72585]"
                          : "border-[rgba(250,244,255,0.1)] focus:border-[rgba(247,37,133,0.4)]"
                      }`}
                      {...register("subject")}
                      aria-invalid={!!errors.subject}
                      aria-describedby={errors.subject ? "subject-error" : undefined}
                    >
                      <option value="" className="bg-[#0f0018]">
                        Sélectionner un sujet…
                      </option>
                      {SUBJECTS.map((s) => (
                        <option key={s} value={s} className="bg-[#0f0018]">
                          {s}
                        </option>
                      ))}
                    </select>
                    {errors.subject && (
                      <p id="subject-error" role="alert" className="text-xs text-[#f72585] font-dm">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  {/* Message — pleine largeur */}
                  <div className="md:col-span-2 flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-message"
                      className="flex items-center gap-1.5 text-xs font-dm font-500 text-[rgba(250,244,255,0.6)] uppercase tracking-widest"
                    >
                      <MessageSquare size={12} aria-hidden="true" />
                      {formLabels.message}
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      className={`w-full px-4 py-3.5 rounded-brand bg-[rgba(250,244,255,0.04)] border text-sm font-dm text-[#faf4ff] placeholder-[rgba(250,244,255,0.25)] focus:outline-none transition-all duration-200 resize-none ${
                        errors.message
                          ? "border-[#f72585]"
                          : "border-[rgba(250,244,255,0.1)] focus:border-[rgba(247,37,133,0.4)]"
                      }`}
                      placeholder="Ton message…"
                      {...register("message")}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "message-error" : undefined}
                    />
                    {errors.message && (
                      <p id="message-error" role="alert" className="text-xs text-[#f72585] font-dm">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Submit — pleine largeur */}
                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center justify-center gap-2 w-full md:w-auto md:px-10 py-4 rounded-brand bg-gradient-brand text-[#faf4ff] font-dm font-500 text-sm hover:opacity-90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-glow"
                      aria-label={isSubmitting ? "Envoi en cours" : "Envoyer le message"}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                          {formLabels.submitting}
                        </>
                      ) : (
                        <>
                          <Send size={16} aria-hidden="true" />
                          {formLabels.submit}
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
