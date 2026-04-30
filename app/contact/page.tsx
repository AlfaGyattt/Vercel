"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, MessageSquare, Send, CheckCircle, Loader2, ChevronDown, Instagram, Twitter, Youtube, MapPin, Clock, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const schema = z.object({
  name: z.string().min(2, "Au moins 2 caractères").max(80).trim(),
  email: z.string().email("Email invalide").max(100),
  subject: z.string().min(1, "Choisis un sujet"),
  message: z.string().min(20, "Au moins 20 caractères").max(2000).trim(),
});
type FormData = z.infer<typeof schema>;

const subjects = ["Question générale", "Signaler un bug", "Partenariat", "Presse & médias", "Investissement", "Autre"];

const faqs = [
  { id: "f1", question: "Mood2Fit est-il gratuit ?", answer: "Oui, Mood2Fit est gratuit. L'accès à toutes les fonctionnalités (matching, challenges, feed) est inclus sans frais. Une offre premium avec des fonctionnalités avancées est prévue." },
  { id: "f2", question: "Comment fonctionne le matching ?", answer: "Notre algorithme prend en compte ton mood, ta discipline, ton niveau, ta localisation et tes disponibilités. Il croise ces données avec les profils autour de toi pour te proposer les partenaires les plus compatibles." },
  { id: "f3", question: "Mes données personnelles sont-elles protégées ?", answer: "Absolument. Mood2Fit est conforme au RGPD. Ta localisation n'est jamais partagée en temps réel — seule ta zone approximative est visible. Tu peux supprimer ton compte à tout moment." },
  { id: "f4", question: "Quand l'application sera-t-elle disponible ?", answer: "Mood2Fit est en phase beta fermée. Inscris-toi sur la liste d'attente depuis la homepage pour être parmi les premiers à y accéder. Le lancement public est prévu dans les prochains mois." },
  { id: "f5", question: "Puis-je utiliser Mood2Fit pour trouver un coach ?", answer: "Pour l'instant, Mood2Fit est centré sur le co-sport entre pairs — trouver des partenaires d'entraînement, pas des coachs professionnels. Cette fonctionnalité est dans notre roadmap." },
  { id: "f6", question: "L'app fonctionne-t-elle en dehors des grandes villes ?", answer: "Oui. L'algorithme s'adapte à la densité de ta zone. En zone moins dense, le rayon s'élargit automatiquement pour maximiser tes chances de trouver un partenaire." },
];

const contactInfo = [
  { label: "Email", value: "hello@mood2fit.app", color: "#f72585", icon: Mail },
  { label: "Basé à", value: "Paris, France 🇫🇷", color: "#f72585", icon: MapPin },
  { label: "Réponse sous", value: "48h", color: "#f72585", icon: Clock },
  { label: "Support principal", value: "Instagram", color: "#f72585", icon: Zap },
];

const socials = [
  { platform: "Instagram", handle: "@mood2fit", desc: "Coulisses, stories et commu", color: "#f72585", icon: Instagram, href: "/" },
  { platform: "Twitter / X", handle: "@mood2fit", desc: "Actus & réflexions sport", color: "#b5179e", icon: Twitter, href: "/" },
  { platform: "YouTube", handle: "Mood2Fit", desc: "Tutos et documentaires", color: "#7209b7", icon: Youtube, href: "/" },
];

function FaqItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }} className="last:border-0">
      <button onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-5 text-left gap-4 group"
        aria-expanded={open}>
        <span className="flex items-center gap-4">
          <span className="font-roboto font-900 text-sm flex-shrink-0"
            style={{ color: open ? "#f72585" : "rgba(0,0,0,0.2)" }}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-roboto font-500 text-sm md:text-base text-black group-hover:text-[#f72585] transition-colors duration-200">
            {faq.question}
          </span>
        </span>
        <ChevronDown size={18}
          className={`flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          style={{ color: open ? "#f72585" : "rgba(0,0,0,0.3)" }} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden">
            <p className="pb-5 pl-10 font-roboto font-400 text-sm text-black/55 leading-relaxed">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (_data: FormData) => {
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitted(true);
    reset();
  };

  const inputClass = (hasError: boolean) =>
    `w-full px-5 py-4 font-roboto font-400 text-black placeholder-black/25 focus:outline-none transition-all duration-200 rounded-xl text-sm bg-white ${hasError
      ? "border-2 border-[#f72585]"
      : "border border-black/12 focus:border-[#f72585]"
    }`;

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div key="success" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-5 py-20 text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ background: "rgba(247,37,133,0.08)", border: "1px solid rgba(247,37,133,0.2)" }}>
            <CheckCircle size={36} style={{ color: "#f72585" }} />
          </div>
          <h3 className="font-roboto font-900 uppercase text-2xl tracking-[-0.02em] text-black">Message envoyé.</h3>
          <p className="font-roboto font-400 text-black/45 text-sm">On te répond dans les 48h.</p>
          <button onClick={() => setSubmitted(false)}
            className="font-roboto text-xs text-black/30 hover:text-[#f72585] transition-colors mt-2">
            Envoyer un autre message
          </button>
        </motion.div>
      ) : (
        <motion.form key="form" onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-4" noValidate>
          <div className="flex flex-col gap-1.5">
            <label className="font-roboto font-700 text-[10px] tracking-[0.15em] uppercase text-black/40">Nom complet</label>
            <input type="text" placeholder="Alex Martin" className={inputClass(!!errors.name)} {...register("name")} />
            {errors.name && <p className="font-roboto text-xs text-[#f72585]">{errors.name.message}</p>}
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-roboto font-700 text-[10px] tracking-[0.15em] uppercase text-black/40">Email</label>
            <input type="email" placeholder="alex@exemple.com" className={inputClass(!!errors.email)} {...register("email")} />
            {errors.email && <p className="font-roboto text-xs text-[#f72585]">{errors.email.message}</p>}
          </div>
          <div className="md:col-span-2 flex flex-col gap-1.5">
            <label className="font-roboto font-700 text-[10px] tracking-[0.15em] uppercase text-black/40">Sujet</label>
            <select className={inputClass(!!errors.subject) + " cursor-pointer appearance-none"} {...register("subject")}>
              <option value="">Sélectionner un sujet…</option>
              {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            {errors.subject && <p className="font-roboto text-xs text-[#f72585]">{errors.subject.message}</p>}
          </div>
          <div className="md:col-span-2 flex flex-col gap-1.5">
            <label className="font-roboto font-700 text-[10px] tracking-[0.15em] uppercase text-black/40 flex items-center gap-1.5">
              <MessageSquare size={11} /> Message
            </label>
            <textarea rows={5} placeholder="Ton message…" className={inputClass(!!errors.message) + " resize-none"} {...register("message")} />
            {errors.message && <p className="font-roboto text-xs text-[#f72585]">{errors.message.message}</p>}
          </div>
          <div className="md:col-span-2">
            <button type="submit" disabled={isSubmitting}
              className="flex items-center gap-2.5 px-8 py-4 rounded-full font-roboto font-700 text-sm text-white transition-all duration-150 hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
              style={{ background: "linear-gradient(135deg, #f72585, #7209b7)" }}>
              {isSubmitting ? <><Loader2 size={16} className="animate-spin" />Envoi…</> : <><Send size={15} />Envoyer le message</>}
            </button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* PAGE 1 — Hero + infos contact (pattern communauté) */}
        {/* HERO — plein écran avec fond fonds.png */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src="/fonds.png" alt="" aria-hidden="true" className="w-full h-full object-cover" />
            <div className="absolute inset-0"
              style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.85) 100%)" }} />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center text-center gap-6 px-6 max-w-4xl mx-auto pt-20"
          >
            <span className="font-roboto font-700 text-[10px] tracking-[0.25em] uppercase" style={{ color: "rgba(255,255,255,0.7)" }}>
              Contact
            </span>
            <h1 className="font-roboto font-900 uppercase leading-[0.88] tracking-[-0.04em] text-white"
              style={{ fontSize: "clamp(56px, 10vw, 130px)", textShadow: "0 2px 20px rgba(0,0,0,0.25)" }}>
              On est<br />
              <span style={{ color: "#f72585" }}>à l'écoute.</span>
            </h1>
            <p className="font-roboto font-400 max-w-lg text-center"
              style={{ fontSize: "clamp(15px, 1.5vw, 18px)", color: "rgba(255,255,255,0.7)" }}>
              Une question, une idée, un partenariat ? On lit chaque message personnellement.
            </p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2" aria-hidden="true">
              <motion.div className="w-px h-12 mx-auto"
                style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.6), transparent)" }}
                animate={{ scaleY: [0, 1, 0], originY: 0 }}
                transition={{ duration: 1.6, repeat: Infinity }} />
            </motion.div>
          </motion.div>
        </section>

        {/* PAGE 2 — Formulaire + réseaux, couleurs changées */}
        <section style={{ background: "#fff" }} className="py-32">
          <div className="max-w-7xl mx-auto px-6 md:px-16">
            <div className="grid lg:grid-cols-5 gap-16 lg:gap-24">

              {/* Formulaire — 3 colonnes */}
              <motion.div className="lg:col-span-3"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
                <h2 className="font-roboto font-900 uppercase leading-[0.88] tracking-[-0.03em] text-black mb-12"
                  style={{ fontSize: "clamp(36px, 5vw, 60px)" }}>
                  Écris-nous.<br />
                  <span style={{ color: "#f72585" }}>On répond.</span>
                </h2>
                <ContactForm />
              </motion.div>

              {/* Réseaux — 2 colonnes */}
              <motion.div className="lg:col-span-2 flex flex-col gap-8"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}>
                <div>
                  <h2 className="font-roboto font-900 uppercase leading-[0.88] tracking-[-0.03em] text-black mb-3"
                    style={{ fontSize: "clamp(28px, 3.5vw, 44px)" }}>
                    Suis-nous.
                  </h2>
                  <p className="font-roboto font-400 text-black/45 text-sm">La communauté est aussi là-bas.</p>
                </div>

                <div className="flex flex-col" style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}>
                  {socials.map((s, i) => (
                    <motion.div key={s.platform}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.08 }}>
                      <Link href={s.href}
                        className="flex items-center justify-between py-5 group transition-colors duration-200"
                        style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ background: `${s.color}12`, color: s.color }}>
                            <s.icon size={18} />
                          </div>
                          <div>
                            <p className="font-roboto font-700 text-sm text-black group-hover:text-[#f72585] transition-colors duration-200">{s.platform}</p>
                            <p className="font-roboto text-xs text-black/35">{s.handle} · {s.desc}</p>
                          </div>
                        </div>
                        <span className="font-roboto font-900 text-sm" style={{ color: s.color }}>→</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="p-5 rounded-2xl" style={{ background: "rgba(247,37,133,0.05)", border: "1px solid rgba(247,37,133,0.15)" }}>
                  <p className="font-roboto font-400 text-sm text-black/55 leading-relaxed">
                    Pour un support urgent, envoie-nous un DM sur Instagram — c'est là qu'on répond le plus vite.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* PAGE 3 — FAQ fond noir */}
        <section style={{ background: "#000" }} className="py-32">
          <div className="max-w-4xl mx-auto px-6 md:px-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-roboto font-900 uppercase leading-[0.88] tracking-[-0.03em] text-white mb-20"
              style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
              Les questions<br />
              <span style={{ color: "#f72585" }}>qu'on nous pose.</span>
            </motion.h2>

            <div className="rounded-2xl overflow-hidden bg-white">
              <div className="px-6 md:px-10">
                {faqs.map((faq, i) => (
                  <FaqItem key={faq.id} faq={faq} index={i} />
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-center mt-12">
              <p className="font-roboto font-400 text-white/35 text-sm mb-4">Tu n'as pas trouvé ta réponse ?</p>
              <Link href="mailto:hello@mood2fit.app"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-roboto font-700 text-sm text-white transition-all duration-150 hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #f72585, #7209b7)" }}>
                <Mail size={15} /> Écris-nous directement
              </Link>
            </motion.div>
          </div>
        </section>

        {/* PAGE 4 — CTA fond rose */}
        <section className="relative flex items-center justify-center overflow-hidden py-40" style={{ background: "#f72585" }}>
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-roboto font-900 text-white uppercase leading-[0.85] tracking-[-0.04em] mb-10"
              style={{ fontSize: "clamp(56px, 9vw, 120px)" }}>
              On est là<br />pour toi.
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <Link href="mailto:hello@mood2fit.app"
                className="inline-flex items-center gap-3 px-9 py-4 rounded-full font-roboto font-700 text-sm text-[#f72585] bg-white hover:scale-[1.03] active:scale-[0.97] transition-all"
                style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.2)" }}>
                <Mail size={18} /> hello@mood2fit.app
              </Link>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}