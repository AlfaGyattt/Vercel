"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Mail,
  MessageSquare,
  Send,
  CheckCircle,
  Loader2,
  ChevronDown,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  MapPin,
  Clock,
  Zap,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fadeInUp, staggerContainer } from "@/lib/utils";

// ─── SCHÉMA ZOD ─────────────────────────────────────────────
const schema = z.object({
  name: z.string().min(2, "Au moins 2 caractères").max(80).trim(),
  email: z.string().email("Email invalide").max(100),
  subject: z.string().min(1, "Choisis un sujet"),
  message: z.string().min(20, "Au moins 20 caractères").max(2000).trim(),
});

type FormData = z.infer<typeof schema>;

// ─── DONNÉES ────────────────────────────────────────────────
const subjects = [
  "Question générale",
  "Signaler un bug",
  "Partenariat",
  "Presse & médias",
  "Investissement",
  "Autre",
];

const faqs = [
  {
    id: "f1",
    question: "Mood2Fit est-il gratuit ?",
    answer:
      "Oui, Mood2Fit est gratuit; l'accès à toutes les fonctionnalités (matching, challenges, feed) est inclus sans frais. Il existe toutefois une offre premium qui inclut des fonctionnalités plus avancées.",
  },
  {
    id: "f2",
    question: "Comment fonctionne le matching ?",
    answer:
      "Notre algorithme prend en compte ton mood du jour, ta discipline, ton niveau, ta localisation et tes disponibilités. Il les croise avec les profils disponibles autour de toi pour te proposer les partenaires les plus compatibles. Plus tu utilises l'app, plus les suggestions s'affinent.",
  },
  {
    id: "f3",
    question: "Mes données personnelles sont-elles protégées ?",
    answer:
      "Absolument. Mood2Fit est conforme au RGPD. Ta localisation n'est jamais partagée en temps réel, seule ta zone approximative est visible. Tu peux supprimer ton compte et toutes tes données à tout moment depuis l'application.",
  },
  {
    id: "f4",
    question: "Quand l'application sera-t-elle disponible ?",
    answer:
      "Mood2Fit est actuellement en phase beta fermée. Inscris-toi sur la liste d'attente depuis la homepage pour être parmi les premiers à y accéder. Le lancement public est prévu dans les prochains mois.",
  },
  {
    id: "f5",
    question: "Puis-je utiliser Mood2Fit pour trouver un coach ?",
    answer:
      "Pour l'instant, Mood2Fit est centré sur le co-sport entre pairs. Trouver des partenaires d'entraînement, pas des coachs professionnels. Cette fonctionnalité est dans notre roadmap et pourrait arriver dans une version future.",
  },
  {
    id: "f6",
    question: "L'app fonctionne-t-elle en dehors des grandes villes ?",
    answer:
      "Oui. L'algorithme s'adapte à la densité de ta zone. En ville, tu auras plus de matchs immédiats. En zone moins dense, le rayon de recherche s'élargit automatiquement pour maximiser tes chances de trouver un partenaire.",
  },
];

const socials = [
  {
    platform: "Instagram",
    handle: "@mood2fit",
    desc: "Coulisses, stories et commu",
    color: "#f72585",
    icon: Instagram,
    href: "/",
    followers: "4.2k",
  },
  {
    platform: "TikTok",
    handle: "@mood2fit",
    desc: "Vidéos sport & motivation",
    color: "#7209b7",
    icon: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
      </svg>
    ),
    href: "/",
    followers: "8.1k",
  },
  {
    platform: "Twitter / X",
    handle: "@mood2fit",
    desc: "Actus & réflexions sport",
    color: "#4cc9f0",
    icon: Twitter,
    href: "/",
    followers: "2.8k",
  },
  {
    platform: "YouTube",
    handle: "Mood2Fit",
    desc: "Tutos et documentaires",
    color: "#06d6a0",
    icon: Youtube,
    href: "/",
    followers: "1.3k",
  },
];

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@mood2fit.app",
    color: "#f72585",
  },
  {
    icon: MapPin,
    label: "Basé à",
    value: "Paris, France 🇫🇷",
    color: "#4cc9f0",
  },
  {
    icon: Clock,
    label: "Réponse sous",
    value: "48h",
    color: "#06d6a0",
  },
  {
    icon: Zap,
    label: "Support principal",
    value: "Instagram",
    color: "#7209b7",
  },
];

// ─── COMPOSANTS ─────────────────────────────────────────────
function FaqItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      variants={fadeInUp}
      className="border-b border-[rgba(250,244,255,0.07)] last:border-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-5 text-left gap-4 group"
        aria-expanded={open}
      >
        <span className="flex items-center gap-3">
          <span
            className="flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-xs font-syne font-700 text-[rgba(250,244,255,0.3)] group-hover:text-[#f72585] transition-colors duration-200"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-sm md:text-base font-dm font-500 text-[rgba(250,244,255,0.8)] group-hover:text-[#faf4ff] transition-colors duration-200">
            {faq.question}
          </span>
        </span>
        <ChevronDown
          size={18}
          className={`flex-shrink-0 text-[rgba(250,244,255,0.3)] group-hover:text-[#f72585] transition-all duration-300 ${open ? "rotate-180 text-[#f72585]" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 pl-9 text-sm font-dm font-300 text-[rgba(250,244,255,0.6)] leading-relaxed">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (_data: FormData) => {
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitted(true);
    reset();
  };

  return (
    <div className="relative p-6 md:p-10 rounded-brand glow-border bg-gradient-card overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#7209b7]/08 blur-[80px] rounded-full pointer-events-none" />

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            className="flex flex-col items-center gap-5 py-16 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
          >
            <div className="w-20 h-20 rounded-full bg-[rgba(6,214,160,0.12)] border border-[rgba(6,214,160,0.3)] flex items-center justify-center">
              <CheckCircle size={40} className="text-[#06d6a0]" />
            </div>
            <div>
              <p className="font-syne font-700 text-2xl text-[#faf4ff] mb-2">
                Message envoyé. 👋
              </p>
              <p className="text-sm font-dm text-[rgba(250,244,255,0.55)]">
                On te répond dans les 48h.
              </p>
            </div>
            <button
              onClick={() => setSubmitted(false)}
              className="text-xs font-dm text-[rgba(250,244,255,0.35)] hover:text-[#f72585] transition-colors"
            >
              Envoyer un autre message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit(onSubmit)}
            className="relative z-10 grid md:grid-cols-2 gap-5"
            noValidate
          >
            {/* Nom */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="c-name" className="text-xs font-dm font-500 text-[rgba(250,244,255,0.5)] uppercase tracking-widest">
                Nom complet
              </label>
              <input
                id="c-name"
                type="text"
                autoComplete="name"
                placeholder="Alex Martin"
                className={`w-full px-4 py-3.5 rounded-brand bg-[rgba(250,244,255,0.04)] border text-sm font-dm text-[#faf4ff] placeholder-[rgba(250,244,255,0.25)] focus:outline-none transition-all duration-200 ${
                  errors.name ? "border-[#f72585]" : "border-[rgba(250,244,255,0.1)] focus:border-[rgba(247,37,133,0.4)]"
                }`}
                {...register("name")}
              />
              {errors.name && <p className="text-xs text-[#f72585]">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="c-email" className="text-xs font-dm font-500 text-[rgba(250,244,255,0.5)] uppercase tracking-widest">
                Email
              </label>
              <div className="relative">
                <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[rgba(250,244,255,0.3)]" />
                <input
                  id="c-email"
                  type="email"
                  autoComplete="email"
                  placeholder="alex@exemple.com"
                  className={`w-full pl-10 pr-4 py-3.5 rounded-brand bg-[rgba(250,244,255,0.04)] border text-sm font-dm text-[#faf4ff] placeholder-[rgba(250,244,255,0.25)] focus:outline-none transition-all duration-200 ${
                    errors.email ? "border-[#f72585]" : "border-[rgba(250,244,255,0.1)] focus:border-[rgba(247,37,133,0.4)]"
                  }`}
                  {...register("email")}
                />
              </div>
              {errors.email && <p className="text-xs text-[#f72585]">{errors.email.message}</p>}
            </div>

            {/* Sujet — pleine largeur */}
            <div className="md:col-span-2 flex flex-col gap-1.5">
              <label htmlFor="c-subject" className="text-xs font-dm font-500 text-[rgba(250,244,255,0.5)] uppercase tracking-widest">
                Sujet
              </label>
              <select
                id="c-subject"
                className={`w-full px-4 py-3.5 rounded-brand bg-[rgba(250,244,255,0.04)] border text-sm font-dm text-[#faf4ff] focus:outline-none transition-all duration-200 cursor-pointer appearance-none ${
                  errors.subject ? "border-[#f72585]" : "border-[rgba(250,244,255,0.1)] focus:border-[rgba(247,37,133,0.4)]"
                }`}
                {...register("subject")}
              >
                <option value="" className="bg-[#0f0018]">Sélectionner un sujet…</option>
                {subjects.map((s) => (
                  <option key={s} value={s} className="bg-[#0f0018]">{s}</option>
                ))}
              </select>
              {errors.subject && <p className="text-xs text-[#f72585]">{errors.subject.message}</p>}
            </div>

            {/* Message — pleine largeur */}
            <div className="md:col-span-2 flex flex-col gap-1.5">
              <label htmlFor="c-message" className="flex items-center gap-1.5 text-xs font-dm font-500 text-[rgba(250,244,255,0.5)] uppercase tracking-widest">
                <MessageSquare size={12} />
                Message
              </label>
              <textarea
                id="c-message"
                rows={5}
                placeholder="Ton message…"
                className={`w-full px-4 py-3.5 rounded-brand bg-[rgba(250,244,255,0.04)] border text-sm font-dm text-[#faf4ff] placeholder-[rgba(250,244,255,0.25)] focus:outline-none transition-all duration-200 resize-none ${
                  errors.message ? "border-[#f72585]" : "border-[rgba(250,244,255,0.1)] focus:border-[rgba(247,37,133,0.4)]"
                }`}
                {...register("message")}
              />
              {errors.message && <p className="text-xs text-[#f72585]">{errors.message.message}</p>}
            </div>

            {/* Submit */}
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 w-full md:w-auto md:px-10 py-4 rounded-brand bg-gradient-brand text-[#faf4ff] font-dm font-500 text-sm hover:opacity-90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-glow"
              >
                {isSubmitting ? (
                  <><Loader2 size={16} className="animate-spin" />Envoi…</>
                ) : (
                  <><Send size={16} />Envoyer le message</>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── PAGE ────────────────────────────────────────────────────
export default function ContactPage() {
  const faqRef = useRef<HTMLDivElement>(null);
  const faqInView = useInView(faqRef, { once: true, margin: "-100px" });
  const socialsRef = useRef<HTMLDivElement>(null);
  const socialsInView = useInView(socialsRef, { once: true, margin: "-100px" });
  const formRef = useRef<HTMLDivElement>(null);
  const formInView = useInView(formRef, { once: true, margin: "-100px" });

  return (
    <>
      <Navbar />
      <main>
        {/* HERO */}
        <section className="relative pt-32 pb-20 overflow-hidden bg-[#080010]">
          <div className="absolute inset-0 bg-gradient-hero opacity-60 pointer-events-none" />
          <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#f72585]/08 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center text-center gap-6"
            >
              <motion.span variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-[rgba(247,37,133,0.1)] border border-[rgba(247,37,133,0.25)] text-xs font-dm font-500 text-[#f72585] tracking-widest uppercase">
                <Mail size={12} /> Contact
              </motion.span>
              <motion.h1 variants={fadeInUp} className="font-syne font-800 text-5xl md:text-7xl text-[#faf4ff] leading-tight tracking-tight">
                On est<br />
                <span className="gradient-text">à l&apos;écoute.</span>
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-lg font-dm font-300 text-[rgba(250,244,255,0.6)] max-w-xl leading-relaxed">
                Une question, une idée, un partenariat ? Écris-nous.
              </motion.p>

              {/* Infos contact rapides */}
              <motion.div
                variants={staggerContainer}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl mt-4"
              >
                {contactInfo.map((info) => {
                  const Icon = info.icon;
                  return (
                    <motion.div
                      key={info.label}
                      variants={fadeInUp}
                      className="flex flex-col items-center gap-2 p-4 rounded-brand bg-[rgba(250,244,255,0.03)] border border-[rgba(250,244,255,0.07)]"
                    >
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center border"
                        style={{ background: `${info.color}15`, borderColor: `${info.color}25` }}
                      >
                        <Icon size={16} style={{ color: info.color }} />
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] font-dm text-[rgba(250,244,255,0.4)] uppercase tracking-widest">{info.label}</p>
                        <p className="text-xs font-dm font-500 text-[#faf4ff] mt-0.5">{info.value}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* FORMULAIRE + RÉSEAUX */}
        <section className="section-padding relative overflow-hidden bg-[#0f0018]" ref={formRef}>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(247,37,133,0.15)] to-transparent" />
          <div className="absolute top-1/2 right-0 w-[400px] h-[400px] -translate-y-1/2 bg-[#7209b7]/06 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8">
            <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
              {/* Formulaire — 3 colonnes */}
              <motion.div
                className="lg:col-span-3"
                initial={{ opacity: 0, y: 40 }}
                animate={formInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="mb-8">
                  <h2 className="font-syne font-800 text-3xl md:text-4xl text-[#faf4ff] leading-tight mb-3">
                    Écris-nous.
                  </h2>
                  <p className="text-sm font-dm text-[rgba(250,244,255,0.5)]">
                    On lit chaque message personnellement.
                  </p>
                </div>
                <ContactForm />
              </motion.div>

              {/* Réseaux sociaux — 2 colonnes */}
              <motion.div
                className="lg:col-span-2 flex flex-col gap-6"
                ref={socialsRef}
                variants={staggerContainer}
                initial="hidden"
                animate={socialsInView ? "visible" : "hidden"}
              >
                <motion.div variants={fadeInUp}>
                  <h2 className="font-syne font-800 text-3xl md:text-4xl text-[#faf4ff] leading-tight mb-3">
                    Suis-nous.
                  </h2>
                  <p className="text-sm font-dm text-[rgba(250,244,255,0.5)]">
                    La communauté est aussi là-bas.
                  </p>
                </motion.div>

                <div className="flex flex-col gap-3">
                  {socials.map((s) => {
                    const Icon = s.icon;
                    return (
                      <motion.div key={s.platform} variants={fadeInUp}>
                        <Link
                          href={s.href}
                          className="flex items-center gap-4 p-4 rounded-brand bg-[rgba(250,244,255,0.03)] border border-[rgba(250,244,255,0.07)] hover:border-[rgba(247,37,133,0.25)] hover:bg-[rgba(247,37,133,0.04)] transition-all duration-200 group"
                        >
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border"
                            style={{ background: `${s.color}15`, borderColor: `${s.color}25`, color: s.color }}
                          >
                            <Icon />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-dm font-500 text-[#faf4ff] group-hover:text-[#f72585] transition-colors duration-200">
                              {s.platform}
                            </p>
                            <p className="text-xs font-dm text-[rgba(250,244,255,0.4)]">
                              {s.handle} · {s.desc}
                            </p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-sm font-syne font-700" style={{ color: s.color }}>{s.followers}</p>
                            <p className="text-[10px] text-[rgba(250,244,255,0.3)]">abonnés</p>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Note */}
                <motion.div
                  variants={fadeInUp}
                  className="p-4 rounded-brand bg-[rgba(247,37,133,0.06)] border border-[rgba(247,37,133,0.15)]"
                >
                  <p className="text-xs font-dm text-[rgba(250,244,255,0.6)] leading-relaxed">
                    Pour un support urgent, envoie nous un DM sur Instagram, c'est là qu'on répond le plus vite.
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-padding relative overflow-hidden bg-[#080010]" ref={faqRef}>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(247,37,133,0.15)] to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(247,37,133,0.15)] to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#7209b7]/06 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto px-5 md:px-8">
            <motion.div
              className="mb-14 text-center"
              variants={staggerContainer}
              initial="hidden"
              animate={faqInView ? "visible" : "hidden"}
            >
              <motion.span variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-[rgba(247,37,133,0.1)] border border-[rgba(247,37,133,0.25)] text-xs font-dm font-500 text-[#f72585] tracking-widest uppercase mb-5">
                <Zap size={12} /> FAQ
              </motion.span>
              <motion.h2 variants={fadeInUp} className="font-syne font-800 text-4xl md:text-5xl text-[#faf4ff] leading-tight">
                Les questions<br />
                <span className="gradient-text">qu&apos;on nous pose.</span>
              </motion.h2>
            </motion.div>

            <motion.div
              className="rounded-brand bg-[#0f0018] border border-[rgba(250,244,255,0.07)] overflow-hidden px-6 md:px-8"
              variants={staggerContainer}
              initial="hidden"
              animate={faqInView ? "visible" : "hidden"}
            >
              {faqs.map((faq, i) => (
                <FaqItem key={faq.id} faq={faq} index={i} />
              ))}
            </motion.div>

            {/* Pas trouvé ta réponse */}
            <motion.div
              className="text-center mt-10"
              initial={{ opacity: 0 }}
              animate={faqInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
            >
              <p className="text-sm font-dm text-[rgba(250,244,255,0.4)] mb-3">
                Tu n&apos;as pas trouvé ta réponse ?
              </p>
              <Link
                href="#"
                onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-pill border border-[rgba(247,37,133,0.3)] text-[rgba(250,244,255,0.6)] hover:text-[#f72585] hover:border-[rgba(247,37,133,0.6)] transition-all duration-200 text-sm font-dm"
              >
                <Mail size={15} />
                Écris-nous directement
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
