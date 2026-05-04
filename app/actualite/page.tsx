"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle, Loader2, Bell, ChevronRight, ChevronLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const categories = [
  { id: "humeur",     label: "Par humeur" },
  { id: "partenaire", label: "Trouve ton partenaire" },
  { id: "tendances",  label: "Tendances sport" },
  { id: "conseils",   label: "Conseils & bien-être" },
  { id: "evenements", label: "Événements" },
  { id: "stories",    label: "Success stories" },
];

const rows: Record<string, { id: string; title: string; tag: string; desc: string; read: string }[]> = {
  humeur: [
    { id: "h1", title: "S'entraîner quand t'es motivé", tag: "Full Power", desc: "Les meilleures séances pour exploiter ton énergie au max.", read: "4 min" },
    { id: "h2", title: "Se défouler après une journée stressante", tag: "Défouloir", desc: "Comment transformer le stress en carburant d'entraînement.", read: "5 min" },
    { id: "h3", title: "Sport chill & détente", tag: "Mode Zen", desc: "Yoga, stretching, marche active. Le sport peut aussi être doux.", read: "3 min" },
    { id: "h4", title: "Boost d'énergie express", tag: "5 min chrono", desc: "Quand t'as 10 minutes et zéro motivation, le plan B.", read: "3 min" },
    { id: "h5", title: "Séance de récup active", tag: "Récupération", desc: "Après une semaine intense, comment s'entraîner sans s'épuiser.", read: "4 min" },
    { id: "h6", title: "Motivation à zéro ? Ce que font les pros", tag: "Mental", desc: "Discipline, rituels, environnement. Les vraies clés de la régularité.", read: "6 min" },
  ],
  partenaire: [
    { id: "p1", title: "Les matchs de la semaine", tag: "Matchs", desc: "847 duos formés cette semaine à Paris, Lyon, Bordeaux.", read: "3 min" },
    { id: "p2", title: "Karim & Lucas : de inconnus à partenaires béton", tag: "Témoignage", desc: "Deux inconnus au parc. 6 mois plus tard, une routine solide.", read: "6 min" },
    { id: "p3", title: "430 nouveaux profils actifs près de toi", tag: "Nouveaux", desc: "Ton prochain partenaire est peut-être là cette semaine.", read: "2 min" },
    { id: "p4", title: "Comment maximiser ton profil pour matcher vite", tag: "Tips", desc: "Les 3 choses que les profils qui matchent en 24h ont en commun.", read: "5 min" },
    { id: "p5", title: "Inès & Sofia : 3 mois de squat ensemble", tag: "Duo", desc: "De la première rencontre aux records personnels partagés.", read: "7 min" },
    { id: "p6", title: "Le duo qui s'est retrouvé après 2 ans de pause", tag: "Histoire", desc: "Matchés, séparés, puis retrouvés. La vraie force du co-sport.", read: "5 min" },
  ],
  tendances: [
    { id: "t1", title: "Le street workout explose en France", tag: "Tendance", desc: "+62% de recherches en 1 an. Une nouvelle génération aux barres de parc.", read: "5 min" },
    { id: "t2", title: "HYROX : le nouveau sport hybride qui cartonne", tag: "Nouveau", desc: "Mi-running mi-fitness. Ce qu'il faut savoir avant de se lancer.", read: "6 min" },
    { id: "t3", title: "Le challenge 75 Hard : mythe ou réalité ?", tag: "Viral", desc: "75 jours de discipline absolue. Ce qui marche, ce qui fait mal.", read: "8 min" },
    { id: "t4", title: "Zone 2 : le cardio qui change tout", tag: "Science", desc: "La tendance silencieuse qui transforme les athlètes de fond.", read: "7 min" },
    { id: "t5", title: "Crossfit ou muscu classique en 2025 ?", tag: "Débat", desc: "Arguments, données, contextes. Lequel choisir selon ton profil.", read: "6 min" },
    { id: "t6", title: "Le sleep training, nouvelle obsession des sportifs", tag: "Tendance", desc: "Optimiser son sommeil pour performer. La science et les pratiques.", read: "5 min" },
  ],
  conseils: [
    { id: "c1", title: "Manger avant la séance : ce que dit la science", tag: "Nutrition", desc: "Timing, quantité, type d'aliments. Le guide factuel.", read: "5 min" },
    { id: "c2", title: "Récupération : les 3 erreurs que tout le monde fait", tag: "Récup", desc: "Sommeil, hydratation, étirements. Ce qu'on fait tous mal.", read: "6 min" },
    { id: "c3", title: "Rester motivé même les jours sans", tag: "Mental", desc: "Discipline vs motivation. Ce que les athlètes font différemment.", read: "5 min" },
    { id: "c4", title: "Le sommeil, premier facteur de performance", tag: "Santé", desc: "7h vs 9h. Ce que les données disent sur le sport et le repos.", read: "4 min" },
    { id: "c5", title: "Créatine, whey, caféine : ce qui marche vraiment", tag: "Supps", desc: "Sans marketing. Sans influenceurs. Juste les études.", read: "7 min" },
    { id: "c6", title: "Pourquoi tu stagnes et comment en sortir", tag: "Progression", desc: "Plateau de progression : causes, solutions, méthodes prouvées.", read: "6 min" },
  ],
  evenements: [
    { id: "e1", title: "Session Street Workout — Buttes-Chaumont", tag: "15 Fév · Paris 19e", desc: "30+ sportifs, ouvert à tous les niveaux. 12 places restantes.", read: "12 places" },
    { id: "e2", title: "Run collectif — Bords de Marne", tag: "22 Fév · Joinville", desc: "10km en groupe à allure libre. Chacun son rythme, tous ensemble.", read: "8 places" },
    { id: "e3", title: "Challenge Mood2Fit — Lancement officiel", tag: "1 Mar · En ligne", desc: "30 jours, des équipes, des récompenses. Le premier grand challenge.", read: "45 places" },
    { id: "e4", title: "Meetup Communauté — Afterwork Sport", tag: "8 Mar · Paris 11e", desc: "Se retrouver en vrai autour d'un verre. Pas de séance, juste du lien.", read: "20 places" },
    { id: "e5", title: "Bootcamp Muscu — Niveau intermédiaire", tag: "15 Mar · Paris 15e", desc: "2h de muscu encadrée en petit groupe. Programme personnalisé.", read: "6 places" },
    { id: "e6", title: "Trail du Bois de Vincennes", tag: "22 Mar · Paris 12e", desc: "8km de trail urbain en groupe mixte. Débutants acceptés.", read: "15 places" },
  ],
  stories: [
    { id: "s1", title: "Thomas a perdu 18kg en trouvant son groupe", tag: "Transformation", desc: "De la sédentarité à 3 sorties par semaine. 11 mois de régularité.", read: "8 min" },
    { id: "s2", title: "Amina a décroché sa première compét de CrossFit", tag: "Objectif atteint", desc: "Elle cherchait un partenaire. Elle a trouvé une coach et une amie.", read: "6 min" },
    { id: "s3", title: "Le duo qui a couru son premier marathon ensemble", tag: "Duo légendaire", desc: "Matchés en octobre, arrivée à Paris en avril. 42km de complicité.", read: "7 min" },
    { id: "s4", title: "Sofia : de je déteste le sport à 4 séances par semaine", tag: "Parcours", desc: "La clé ? La bonne compagnie au bon moment.", read: "5 min" },
    { id: "s5", title: "Le groupe de 6 formé en 3 semaines", tag: "Communauté", desc: "6 inconnus, 1 parc, 1 app. Aujourd'hui 5 entraînements par semaine.", read: "6 min" },
    { id: "s6", title: "Maxime : du canapé au semi-marathon en 6 mois", tag: "Parcours", desc: "Un match sur Mood2Fit. Un pari tenu. Une vie qui change.", read: "7 min" },
  ],
};

const schema = z.object({ email: z.string().email("Email invalide") });
type FormData = z.infer<typeof schema>;

function NewsletterBanner() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });
  const onSubmit = async (_: FormData) => { await new Promise(r => setTimeout(r, 800)); setSubmitted(true); };
  return (
    <div className="mt-20 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row md:items-center gap-8" style={{ background: "#f72585" }}>
      <div className="flex flex-col gap-3 flex-1">
        <h2 className="font-roboto font-900 uppercase text-white leading-[0.9] tracking-[-0.03em]" style={{ fontSize: "clamp(28px, 4vw, 52px)" }}>
          Dans la boucle avant tout le monde.
        </h2>
        <p className="font-roboto font-400 text-white/70 text-sm max-w-md">Chaque semaine, l'essentiel de la communauté Mood2Fit. Zéro bruit.</p>
      </div>
      <div className="flex-shrink-0 w-full md:w-[380px]">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div key="ok" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 text-white">
              <CheckCircle size={22} />
              <span className="font-roboto font-700 text-sm">Tu es dans la boucle !</span>
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={handleSubmit(onSubmit)} className="flex gap-3" noValidate>
              <input type="email" placeholder="ton@email.com"
                className="flex-1 px-5 py-3.5 rounded-full font-roboto font-400 text-black placeholder-black/35 focus:outline-none text-sm bg-white"
                {...register("email")} />
              <button type="submit" disabled={isSubmitting}
                className="flex-shrink-0 flex items-center gap-2 px-6 py-3.5 rounded-full font-roboto font-700 text-sm text-[#f72585] bg-white hover:scale-[1.03] active:scale-[0.97] transition-all disabled:opacity-50"
                style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
                {isSubmitting ? <Loader2 size={15} className="animate-spin" /> : <><Bell size={15} />S'abonner</>}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
        {errors.email && <p className="font-roboto text-xs text-white mt-2">{errors.email.message}</p>}
      </div>
    </div>
  );
}

function Card({ item, index }: { item: typeof rows["humeur"][0]; index: number }) {
  return (
    <article
      className="flex-shrink-0 w-[300px] md:w-[320px] flex flex-col cursor-pointer group/card overflow-hidden rounded-2xl"
      style={{ background: "#f7f4fb", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
    >
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <span className="font-roboto font-700 text-[11px] tracking-[0.15em] uppercase px-2.5 py-1 rounded-full"
          style={{ background: "rgba(247,37,133,0.08)", color: "#f72585" }}>
          {item.tag}
        </span>
        <span className="font-roboto text-[11px] text-black/30 font-500">{item.read}</span>
      </div>
      <div className="px-5 pb-3">
        <h3 className="font-roboto font-700 text-black leading-tight group-hover/card:text-[#f72585] transition-colors duration-200" style={{ fontSize: "16px" }}>
          {item.title}
        </h3>
      </div>
      <div className="px-5 pb-5 flex-1">
        <p className="font-roboto font-400 text-black/55 leading-relaxed" style={{ fontSize: "13px" }}>{item.desc}</p>
      </div>
      <div className="flex items-center gap-2 px-5 py-3 group-hover/card:bg-[#f72585] transition-colors duration-200" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        <span className="font-roboto font-700 text-[11px] uppercase tracking-[0.1em] text-black/40 group-hover/card:text-white transition-colors duration-200">Lire</span>
        <ArrowRight size={13} className="text-black/30 group-hover/card:text-white group-hover/card:translate-x-1 transition-all duration-200" />
      </div>
    </article>
  );
}

function ContentRow({ catId }: { catId: string }) {
  const items = rows[catId] || [];
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: "left" | "right") =>
    scrollRef.current?.scrollBy({ left: dir === "right" ? 340 : -340, behavior: "smooth" });
  return (
    <div className="relative group/row">
      <button onClick={() => scroll("left")} aria-label="Gauche"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all duration-200 hover:scale-110"
        style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.12)", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
        <ChevronLeft size={16} className="text-black" />
      </button>
      <div ref={scrollRef} className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
        {items.map((item, i) => <Card key={item.id} item={item} index={i} />)}
      </div>
      <button onClick={() => scroll("right")} aria-label="Droite"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all duration-200 hover:scale-110"
        style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.12)", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
        <ChevronRight size={16} className="text-black" />
      </button>
    </div>
  );
}

// ─── HERO avec scroll darkness ────────────────────────────────
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const darkness = useTransform(scrollYProgress, [0, 1], ["rgba(0,0,0,0)", "rgba(0,0,0,0.8)"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0px", "-80px"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="/fonds.png" alt="" aria-hidden="true" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.9) 100%)" }} />
        {/* Overlay qui s'assombrit au scroll */}
        <motion.div className="absolute inset-0" style={{ background: darkness }} />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 flex flex-col items-center text-center gap-6 px-6 max-w-4xl mx-auto pt-20"
      >
        <h1 className="font-roboto font-900 uppercase leading-[0.88] tracking-[-0.04em] text-white"
          style={{ fontSize: "clamp(56px, 10vw, 130px)", textShadow: "0 2px 20px rgba(0,0,0,0.25)" }}>
          Tout ce qui<br />
          <span style={{ color: "#f72585" }}>se passe.</span>
        </h1>
        <p className="font-roboto font-400 max-w-lg" style={{ fontSize: "clamp(15px, 1.5vw, 18px)", color: "rgba(255,255,255,0.7)" }}>
          Tips, témoignages, tendances et événements. Le fil de la communauté.
        </p>
      </motion.div>
    </section>
  );
}

export default function ActualitePage() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const visibleCategories = activeFilter ? categories.filter(c => c.id === activeFilter) : categories;

  return (
    <>
      <Navbar />
      <main style={{ background: "#fff", minHeight: "100vh" }}>

        <HeroSection />

        {/* FILTRES STICKY */}
        <div className="relative px-6 md:px-16 py-3"
          style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(24px)", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
          <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            <button onClick={() => setActiveFilter(null)}
              className="flex-shrink-0 px-4 py-1.5 rounded-full font-roboto font-700 text-xs transition-all duration-200"
              style={{ background: activeFilter === null ? "#000" : "rgba(0,0,0,0.07)", color: activeFilter === null ? "#fff" : "rgba(0,0,0,0.6)" }}>
              Tout
            </button>
            {categories.map((cat) => (
              <button key={cat.id}
                onClick={() => setActiveFilter(activeFilter === cat.id ? null : cat.id)}
                className="flex-shrink-0 px-4 py-1.5 rounded-full font-roboto font-700 text-xs transition-all duration-200 whitespace-nowrap"
                style={{ background: activeFilter === cat.id ? "#f72585" : "rgba(0,0,0,0.07)", color: activeFilter === cat.id ? "#fff" : "rgba(0,0,0,0.6)" }}>
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* CONTENU */}
        <div className="px-6 md:px-16 max-w-7xl mx-auto py-10 flex flex-col gap-12">
          {visibleCategories.map((cat, i) => (
            <motion.section key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.04 }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-roboto font-700 text-black hover:underline cursor-pointer" style={{ fontSize: "16px" }}>
                  {cat.label}
                </h2>
                <Link href="#" className="font-roboto font-700 text-[10px] tracking-[0.12em] uppercase text-black/30 hover:text-black transition-colors duration-200">
                  Tout afficher
                </Link>
              </div>
              <ContentRow catId={cat.id} />
            </motion.section>
          ))}
          <NewsletterBanner />
        </div>

        <div className="h-16" />
      </main>
      <Footer />
    </>
  );
}