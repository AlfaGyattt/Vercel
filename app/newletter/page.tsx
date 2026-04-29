"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Mail,
  CheckCircle,
  Loader2,
  ChevronRight,
  Calendar,
  MapPin,
  Users,
  Zap,
  ArrowRight,
  Bell,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fadeInUp, staggerContainer } from "@/lib/utils";

// ─── SCHÉMA ZOD ─────────────────────────────────────────────
const schema = z.object({
  firstname: z
    .string()
    .min(2, "Au moins 2 caractères")
    .max(50, "Trop long")
    .trim(),
  email: z.string().email("Email invalide").max(100),
  interests: z.array(z.string()).min(1, "Choisis au moins un intérêt"),
});

type FormData = z.infer<typeof schema>;

// ─── DONNÉES ────────────────────────────────────────────────
const benefits = [
  {
    emoji: "",
    title: "Avant tout le monde",
    desc: "Accède aux nouvelles fonctionnalités en beta avant le reste de la communauté.",
    color: "#f72585",
  },
  {
    emoji: "",
    title: "Tips sport exclusifs",
    desc: "Chaque semaine, un conseil actionnable de nos experts en sport et motivation.",
    color: "#7209b7",
  },
  {
    emoji: "",
    title: "Événements en avant-première",
    desc: "Sois le premier informé des meetups, sessions collectives et défis communautaires.",
    color: "#4cc9f0",
  },
  {
    emoji: "",
    title: "Challenges exclusifs",
    desc: "Des défis réservés aux abonnés newsletter avec des récompenses à la clé.",
    color: "#06d6a0",
  },
];

const events = [
  {
    id: "e1",
    date: { day: "15", month: "Fév", year: "2025" },
    title: "Session Street Workout — Buttes-Chaumont",
    desc: "Rejoins 30+ sportifs pour une session ouverte à tous les niveaux. Débutants bienvenus.",
    location: "Paris 19e",
    type: "Street Workout",
    typeEmoji: "",
    spots: 12,
    totalSpots: 30,
    color: "#f72585",
    hot: true,
  },
  {
    id: "e2",
    date: { day: "22", month: "Fév", year: "2025" },
    title: "Run collectif — Bords de Marne",
    desc: "10km en groupe à allure libre. Chacun son rythme, tous ensemble. Point de départ : Joinville.",
    location: "Joinville-le-Pont",
    type: "Running",
    typeEmoji: "",
    spots: 8,
    totalSpots: 20,
    color: "#4cc9f0",
    hot: false,
  },
  {
    id: "e3",
    date: { day: "01", month: "Mar", year: "2025" },
    title: "Challenge Mood2Fit — Lancement officiel",
    desc: "Le premier grand challenge communautaire. 30 jours, des équipes, des prix. Inscris-toi tôt.",
    location: "En ligne + Paris",
    type: "Challenge",
    typeEmoji: "",
    spots: 45,
    totalSpots: 100,
    color: "#06d6a0",
    hot: true,
  },
  {
    id: "e4",
    date: { day: "08", month: "Mar", year: "2025" },
    title: "Meetup Communauté — Afterwork Sport",
    desc: "Se retrouver IRL, partager son expérience Mood2Fit autour d'un verre. Pas de séance, juste du lien.",
    location: "Paris 11e",
    type: "Meetup",
    typeEmoji: "",
    spots: 20,
    totalSpots: 50,
    color: "#7209b7",
    hot: false,
  },
];

const archives = [
  {
    id: "a1",
    date: "Jan 2025",
    title: "Comment Karim a trouvé son groupe de street workout en 20 minutes",
    tag: "Histoire",
    tagColor: "#f72585",
    reads: "1 240",
    emoji: "",
  },
  {
    id: "a2",
    date: "Déc 2024",
    title: "Les 5 erreurs qui te font abandonner le sport (et comment les éviter)",
    tag: "Tips",
    tagColor: "#4cc9f0",
    reads: "2 100",
    emoji: "",
  },
  {
    id: "a3",
    date: "Nov 2024",
    title: "Mood2Fit en 2025 : ce qui arrive bientôt sur l'app",
    tag: "Produit",
    tagColor: "#06d6a0",
    reads: "3 400",
    emoji: "",
  },
];

const interestOptions = [
  { value: "musculation", label: " Musculation" },
  { value: "street", label: " Street Workout" },
  { value: "running", label: " Running" },
  { value: "hiit", label: " HIIT" },
  { value: "crossfit", label: " CrossFit" },
  { value: "yoga", label: " Yoga" },
];

// ─── COMPOSANTS ─────────────────────────────────────────────

function EventCard({ event }: { event: typeof events[0] }) {
  const progress = Math.round(((event.totalSpots - event.spots) / event.totalSpots) * 100);

  return (
    <motion.article
      variants={fadeInUp}
      className="flex gap-5 p-5 md:p-6 rounded-brand bg-[#0f0018] border border-[rgba(250,244,255,0.07)] hover:border-[rgba(247,37,133,0.2)] transition-all duration-300 group"
    >
      {/* Date */}
      <div
        className="flex-shrink-0 w-14 h-14 rounded-xl flex flex-col items-center justify-center border"
        style={{ background: `${event.color}15`, borderColor: `${event.color}30` }}
      >
        <span className="font-syne font-800 text-xl leading-none" style={{ color: event.color }}>
          {event.date.day}
        </span>
        <span className="text-[9px] font-dm font-500 text-[rgba(250,244,255,0.5)] uppercase tracking-widest">
          {event.date.month}
        </span>
      </div>

      {/* Contenu */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="text-xs px-2.5 py-0.5 rounded-pill font-dm font-500 border"
              style={{ background: `${event.color}15`, borderColor: `${event.color}30`, color: event.color }}
            >
              {event.typeEmoji} {event.type}
            </span>
            {event.hot && (
              <span className="text-xs px-2.5 py-0.5 rounded-pill bg-[rgba(248,210,16,0.1)] border border-[rgba(248,210,16,0.3)] text-[#f8d210] font-dm font-500">
                 Populaire
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-[rgba(250,244,255,0.4)] flex-shrink-0">
            <MapPin size={11} />
            {event.location}
          </div>
        </div>

        <h3 className="font-syne font-700 text-base text-[#faf4ff] leading-snug mb-1 group-hover:text-[#f72585] transition-colors duration-200">
          {event.title}
        </h3>
        <p className="text-xs font-dm text-[rgba(250,244,255,0.5)] leading-relaxed mb-3">
          {event.desc}
        </p>

        {/* Jauge places */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-1.5 rounded-full bg-[rgba(250,244,255,0.07)]">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${event.color}, ${event.color}88)` }}
            />
          </div>
          <span className="text-xs font-dm text-[rgba(250,244,255,0.4)] flex-shrink-0">
            <Users size={11} className="inline mr-1" />
            {event.spots} places restantes
          </span>
        </div>
      </div>
    </motion.article>
  );
}

function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { interests: [] },
  });

  const toggleInterest = (value: string) => {
    const updated = selectedInterests.includes(value)
      ? selectedInterests.filter((i) => i !== value)
      : [...selectedInterests, value];
    setSelectedInterests(updated);
    setValue("interests", updated, { shouldValidate: true });
  };

  const onSubmit = async (data: FormData) => {
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch {}
    setSubmitted(true);
    reset();
    setSelectedInterests([]);
  };

  return (
    <div className="relative p-6 md:p-10 rounded-brand glow-border bg-gradient-card overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#f72585]/08 blur-[80px] rounded-full pointer-events-none" />

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
                Tu es dans la boucle. 
              </p>
              <p className="text-sm font-dm text-[rgba(250,244,255,0.55)]">
                Vérifie ton email pour confirmer ton inscription.
              </p>
            </div>
            <button
              onClick={() => setSubmitted(false)}
              className="text-xs font-dm text-[rgba(250,244,255,0.35)] hover:text-[#f72585] transition-colors"
            >
              S'inscrire avec un autre email
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit(onSubmit)}
            className="relative z-10 flex flex-col gap-6"
            noValidate
          >
            <div className="grid md:grid-cols-2 gap-5">
              {/* Prénom */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="nl-firstname" className="text-xs font-dm font-500 text-[rgba(250,244,255,0.5)] uppercase tracking-widest">
                  Prénom
                </label>
                <input
                  id="nl-firstname"
                  type="text"
                  autoComplete="given-name"
                  placeholder="Alex"
                  className={`w-full px-4 py-3.5 rounded-brand bg-[rgba(250,244,255,0.04)] border text-sm font-dm text-[#faf4ff] placeholder-[rgba(250,244,255,0.25)] focus:outline-none transition-all duration-200 ${
                    errors.firstname
                      ? "border-[#f72585]"
                      : "border-[rgba(250,244,255,0.1)] focus:border-[rgba(247,37,133,0.4)]"
                  }`}
                  {...register("firstname")}
                />
                {errors.firstname && (
                  <p className="text-xs text-[#f72585]">{errors.firstname.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="nl-email" className="text-xs font-dm font-500 text-[rgba(250,244,255,0.5)] uppercase tracking-widest">
                  Email
                </label>
                <div className="relative">
                  <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[rgba(250,244,255,0.3)]" />
                  <input
                    id="nl-email"
                    type="email"
                    autoComplete="email"
                    placeholder="alex@exemple.com"
                    className={`w-full pl-10 pr-4 py-3.5 rounded-brand bg-[rgba(250,244,255,0.04)] border text-sm font-dm text-[#faf4ff] placeholder-[rgba(250,244,255,0.25)] focus:outline-none transition-all duration-200 ${
                      errors.email
                        ? "border-[#f72585]"
                        : "border-[rgba(250,244,255,0.1)] focus:border-[rgba(247,37,133,0.4)]"
                    }`}
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-[#f72585]">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Intérêts */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-dm font-500 text-[rgba(250,244,255,0.5)] uppercase tracking-widest">
                Tes disciplines
              </label>
              <div className="flex flex-wrap gap-2">
                {interestOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => toggleInterest(opt.value)}
                    className={`px-3.5 py-2 rounded-pill text-xs font-dm font-500 border transition-all duration-200 ${
                      selectedInterests.includes(opt.value)
                        ? "bg-[rgba(247,37,133,0.2)] border-[rgba(247,37,133,0.5)] text-[#f72585]"
                        : "bg-[rgba(250,244,255,0.04)] border-[rgba(250,244,255,0.1)] text-[rgba(250,244,255,0.55)] hover:border-[rgba(247,37,133,0.3)]"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              {errors.interests && (
                <p className="text-xs text-[#f72585]">{errors.interests.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 w-full py-4 rounded-brand bg-gradient-brand text-[#faf4ff] font-dm font-500 text-sm hover:opacity-90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-glow"
            >
              {isSubmitting ? (
                <><Loader2 size={16} className="animate-spin" />Envoi en cours…</>
              ) : (
                <><Bell size={16} />Je m&apos;abonne — c&apos;est gratuit<ChevronRight size={16} /></>
              )}
            </button>

            <p className="text-xs font-dm text-[rgba(250,244,255,0.3)] text-center">
              Zéro spam. Désabonnement en un clic. Tes données restent privées.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── PAGE ────────────────────────────────────────────────────
export default function NewsletterPage() {
  const eventsRef = useRef<HTMLDivElement>(null);
  const eventsInView = useInView(eventsRef, { once: true, margin: "-100px" });
  const archivesRef = useRef<HTMLDivElement>(null);
  const archivesInView = useInView(archivesRef, { once: true, margin: "-100px" });
  const formRef = useRef<HTMLDivElement>(null);
  const formInView = useInView(formRef, { once: true, margin: "-100px" });

  return (
    <>
      <Navbar />
      <main>
        {/* HERO + FORM */}
        <section className="relative pt-32 pb-20 overflow-hidden bg-[#080010]">
          <div className="absolute inset-0 bg-gradient-hero opacity-60 pointer-events-none" />
          <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#7209b7]/12 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Gauche — Texte */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-7"
              >
                <motion.span variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-[rgba(247,37,133,0.1)] border border-[rgba(247,37,133,0.25)] text-xs font-dm font-500 text-[#f72585] tracking-widest uppercase w-fit">
                  <Mail size={12} /> Newsletter
                </motion.span>

                <motion.h1 variants={fadeInUp} className="font-syne font-800 text-5xl md:text-6xl text-[#faf4ff] leading-tight tracking-tight">
                  Dans la boucle<br />
                  <span className="gradient-text">avant tout le monde.</span>
                </motion.h1>

                <motion.p variants={fadeInUp} className="text-base font-dm font-300 text-[rgba(250,244,255,0.6)] leading-relaxed max-w-md">
                  Chaque semaine, l'essentiel de la communauté Mood2Fit directement dans ta boîte mail. Événements, tips, nouveautés — zéro bruit.
                </motion.p>

                {/* Bénéfices */}
                <motion.div variants={staggerContainer} className="grid grid-cols-2 gap-4">
                  {benefits.map((b) => (
                    <motion.div
                      key={b.title}
                      variants={fadeInUp}
                      className="flex items-start gap-3 p-4 rounded-brand bg-[rgba(250,244,255,0.03)] border border-[rgba(250,244,255,0.06)] hover:border-[rgba(247,37,133,0.2)] transition-all duration-200"
                    >
                      <span
                        className="w-8 h-8 rounded-xl flex items-center justify-center text-base flex-shrink-0 border"
                        style={{ background: `${b.color}15`, borderColor: `${b.color}25` }}
                      >
                        {b.emoji}
                      </span>
                      <div>
                        <p className="text-xs font-syne font-700 text-[#faf4ff] mb-0.5">{b.title}</p>
                        <p className="text-[11px] font-dm text-[rgba(250,244,255,0.45)] leading-snug">{b.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Preuve sociale */}
                <motion.div variants={fadeInUp} className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {["#f72585", "#7209b7", "#4cc9f0", "#06d6a0"].map((c, i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-[#080010]" style={{ background: c }} />
                    ))}
                  </div>
                  <p className="text-sm font-dm text-[rgba(250,244,255,0.5)]">
                    <span className="text-[#faf4ff] font-500">2 400+</span> abonnés nous font déjà confiance
                  </p>
                </motion.div>
              </motion.div>

              {/* Droite — Formulaire */}
              <motion.div
                ref={formRef}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <NewsletterForm />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ÉVÉNEMENTS */}
        <section className="section-padding relative overflow-hidden bg-[#0f0018]" ref={eventsRef}>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(247,37,133,0.15)] to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(247,37,133,0.15)] to-transparent" />
          <div className="absolute top-1/2 left-0 w-[400px] h-[400px] -translate-y-1/2 bg-[#f72585]/05 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8">
            <motion.div
              className="mb-14"
              variants={staggerContainer}
              initial="hidden"
              animate={eventsInView ? "visible" : "hidden"}
            >
              <motion.span variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-[rgba(247,37,133,0.1)] border border-[rgba(247,37,133,0.25)] text-xs font-dm font-500 text-[#f72585] tracking-widest uppercase mb-5">
                <Calendar size={12} /> Événements à venir
              </motion.span>
              <motion.h2 variants={fadeInUp} className="font-syne font-800 text-4xl md:text-5xl text-[#faf4ff] leading-tight">
                Rejoins-nous<br />
                <span className="gradient-text">en vrai.</span>
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-base font-dm font-300 text-[rgba(250,244,255,0.55)] max-w-lg mt-4">
                Le digital c'est bien. Se retrouver en vrai c'est mieux. Voici les prochains événements de la communauté.
              </motion.p>
            </motion.div>

            <motion.div
              className="flex flex-col gap-4"
              variants={staggerContainer}
              initial="hidden"
              animate={eventsInView ? "visible" : "hidden"}
            >
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* ARCHIVES */}
        <section className="section-padding relative overflow-hidden bg-[#080010]" ref={archivesRef}>
          <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-[#4cc9f0]/04 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8">
            <motion.div
              className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
              variants={staggerContainer}
              initial="hidden"
              animate={archivesInView ? "visible" : "hidden"}
            >
              <div>
                <motion.span variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-[rgba(76,201,240,0.1)] border border-[rgba(76,201,240,0.25)] text-xs font-dm font-500 text-[#4cc9f0] tracking-widest uppercase mb-5">
                  <Zap size={12} /> Archives
                </motion.span>
                <motion.h2 variants={fadeInUp} className="font-syne font-800 text-4xl md:text-5xl text-[#faf4ff] leading-tight">
                  Les dernières éditions.
                </motion.h2>
              </div>
              <motion.div variants={fadeInUp}>
                <Link href="#" className="inline-flex items-center gap-2 text-sm font-dm text-[rgba(250,244,255,0.4)] hover:text-[#4cc9f0] transition-colors duration-200 group">
                  Voir toutes les archives
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-3 gap-5"
              variants={staggerContainer}
              initial="hidden"
              animate={archivesInView ? "visible" : "hidden"}
            >
              {archives.map((a) => (
                <motion.article
                  key={a.id}
                  variants={fadeInUp}
                  className="group flex flex-col gap-4 p-6 rounded-brand bg-[#0f0018] border border-[rgba(250,244,255,0.07)] hover:border-[rgba(247,37,133,0.2)] transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="text-xs px-2.5 py-0.5 rounded-pill font-dm font-500 border"
                      style={{ background: `${a.tagColor}15`, borderColor: `${a.tagColor}30`, color: a.tagColor }}
                    >
                      {a.tag}
                    </span>
                    <span className="text-xs font-dm text-[rgba(250,244,255,0.3)]">{a.date}</span>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{a.emoji}</span>
                    <h3 className="font-syne font-700 text-sm text-[#faf4ff] leading-snug group-hover:text-[#f72585] transition-colors duration-200">
                      {a.title}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[rgba(250,244,255,0.06)] mt-auto">
                    <span className="text-xs font-dm text-[rgba(250,244,255,0.35)]">
                      {a.reads} lecteurs
                    </span>
                    <ArrowRight size={15} className="text-[rgba(250,244,255,0.3)] group-hover:text-[#f72585] group-hover:translate-x-1 transition-all duration-200" />
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
