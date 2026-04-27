"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Apple, Play, Heart, MessageCircle, Share2, MapPin, Users, Flame, Trophy, ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fadeInUp, staggerContainer } from "@/lib/utils";

// ─── DONNÉES ────────────────────────────────────────────────

const feedPosts = [
  {
    id: "p1",
    user: { name: "Karim B.", city: "Paris 19e", initials: "KB", color: "#f72585" },
    time: "il y a 2h",
    sport: "Street Workout",
    sportEmoji: "🏋️",
    mood: "⚡ Full Power",
    content: "Séance de dips + tractions au parc des Buttes-Chaumont. On était 4 ce matin grâce à Mood2Fit — ambiance de folie. Si vous cherchez un groupe le samedi matin, venez !",
    likes: 47,
    comments: 12,
    achievement: null,
    image: true,
    imageBg: "from-[#f72585]/20 to-[#7209b7]/20",
    imageEmoji: "🤸",
  },
  {
    id: "p2",
    user: { name: "Inès M.", city: "Lyon 6e", initials: "IM", color: "#7209b7" },
    time: "il y a 5h",
    sport: "Musculation",
    sportEmoji: "💪",
    mood: "🔥 Motivée",
    content: "3 mois que je m'entraîne avec Sofia. On s'est trouvées via l'app un soir où j'allais annuler ma séance. Aujourd'hui on a battu notre record sur le squat. Le meilleur investissement que j'ai fait.",
    likes: 89,
    comments: 23,
    achievement: "🏆 Record personnel",
    image: false,
    imageBg: "",
    imageEmoji: "",
  },
  {
    id: "p3",
    user: { name: "Maxime L.", city: "Bordeaux", initials: "ML", color: "#4cc9f0" },
    time: "il y a 1j",
    sport: "Running",
    sportEmoji: "🏃",
    mood: "💜 Zen",
    content: "10km avec Léa ce matin. On parle autant qu'on court — c'est ça la magie. Le sport devient un prétexte pour des vraies conversations.",
    likes: 134,
    comments: 31,
    achievement: "✅ Challenge semaine terminé",
    image: true,
    imageBg: "from-[#4cc9f0]/20 to-[#06d6a0]/20",
    imageEmoji: "🌅",
  },
  {
    id: "p4",
    user: { name: "Sofia R.", city: "Paris 15e", initials: "SR", color: "#06d6a0" },
    time: "il y a 2j",
    sport: "HIIT",
    sportEmoji: "🔥",
    mood: "⚡ Chargée",
    content: "Premier cours HIIT en groupe trouvé sur Mood2Fit. J'avais peur de pas être au niveau — tout le monde était bienveillant. Je reviens vendredi.",
    likes: 62,
    comments: 18,
    achievement: null,
    image: false,
    imageBg: "",
    imageEmoji: "",
  },
];

const testimonials = [
  {
    id: "t1",
    name: "Inès",
    age: 26,
    city: "Lyon",
    sport: "Musculation",
    sportEmoji: "💪",
    avatarColor: "#f72585",
    initials: "IN",
    shortQuote: "Mood2Fit m'a redonné une raison de remettre mes baskets.",
    fullStory: "J'avais arrêté la salle depuis 6 mois. Burn-out, motivation à zéro. J'ai téléchargé Mood2Fit un soir sans trop y croire. En 20 minutes j'avais matchée avec Sofia — même niveau, même quartier, même galère. Ça fait maintenant 3 mois qu'on s'entraîne ensemble deux fois par semaine. Je n'ai pas annulé une seule séance depuis.",
    stats: { sessions: "48", streak: "12 sem", partner: "Sofia R." },
  },
  {
    id: "t2",
    name: "Karim",
    age: 24,
    city: "Paris 19e",
    sport: "Street Workout",
    sportEmoji: "🏋️",
    avatarColor: "#7209b7",
    initials: "KA",
    shortQuote: "L'algo est bluffant. Un groupe en 20 minutes.",
    fullStory: "Je faisais du street workout seul depuis 2 ans. Bon niveau, mais pas de progression parce que personne pour me pousser. J'ai entré mes critères sur Mood2Fit un samedi matin — niveau intermédiaire, Buttes-Chaumont, 8h du mat. En 20 minutes j'avais 3 matchs. On s'entraîne ensemble depuis 3 mois. Mon niveau a explosé.",
    stats: { sessions: "72", streak: "14 sem", partner: "Groupe de 4" },
  },
  {
    id: "t3",
    name: "Maxime",
    age: 29,
    city: "Bordeaux",
    sport: "Running",
    sportEmoji: "🏃",
    avatarColor: "#4cc9f0",
    initials: "MA",
    shortQuote: "Le sport devient un prétexte pour de vraies conversations.",
    fullStory: "Le running c'était mon truc solo, mon moment. Mais après le confinement j'avais du mal à retrouver la régularité. Mood2Fit m'a mis en contact avec Léa — même pace, même parcours, même humour. Maintenant j'attends le vendredi pour notre run. C'est devenu mon rituel préféré de la semaine.",
    stats: { sessions: "36", streak: "9 sem", partner: "Léa D." },
  },
];

const mapUsers = [
  { id: 1, x: 28, y: 35, name: "Lucas", sport: "Muscu", color: "#f72585" },
  { id: 2, x: 45, y: 22, name: "Amina", sport: "CrossFit", color: "#7209b7" },
  { id: 3, x: 62, y: 48, name: "Tom", sport: "Running", color: "#4cc9f0" },
  { id: 4, x: 35, y: 60, name: "Sofia", sport: "HIIT", color: "#06d6a0" },
  { id: 5, x: 72, y: 30, name: "Karim", sport: "Street WO", color: "#f8d210" },
  { id: 6, x: 55, y: 68, name: "Inès", sport: "Muscu", color: "#b5179e" },
  { id: 7, x: 20, y: 52, name: "Alex", sport: "Cardio", color: "#f72585" },
  { id: 8, x: 80, y: 55, name: "Léa", sport: "Yoga", color: "#06d6a0" },
];

const stats = [
  { value: "2 400+", label: "membres actifs", emoji: "👥" },
  { value: "18 000+", label: "séances partagées", emoji: "🏋️" },
  { value: "94%", label: "taux de rétention", emoji: "🔥" },
  { value: "4.9/5", label: "satisfaction", emoji: "⭐" },
];

// ─── COMPOSANTS ─────────────────────────────────────────────

function FeedPost({ post, index }: { post: typeof feedPosts[0]; index: number }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  return (
    <motion.article
      variants={fadeInUp}
      className="rounded-brand bg-[#0f0018] border border-[rgba(250,244,255,0.07)] hover:border-[rgba(247,37,133,0.2)] transition-all duration-300 overflow-hidden"
      aria-label={`Post de ${post.user.name}`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 p-5 pb-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-syne font-700 text-white flex-shrink-0"
          style={{ background: `linear-gradient(135deg, ${post.user.color}, #7209b7)` }}
        >
          {post.user.initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-dm font-500 text-[#faf4ff]">{post.user.name}</span>
            <span className="text-xs text-[rgba(250,244,255,0.35)]">·</span>
            <span className="text-xs text-[rgba(250,244,255,0.4)]">{post.user.city}</span>
          </div>
          <div className="flex items-center gap-2 mt-0.5 flex-wrap">
            <span className="text-xs text-[rgba(250,244,255,0.35)]">{post.time}</span>
            <span className="text-xs px-2 py-0.5 rounded-pill" style={{ background: `${post.user.color}15`, color: post.user.color, border: `1px solid ${post.user.color}30` }}>
              {post.sportEmoji} {post.sport}
            </span>
            <span className="text-xs text-[rgba(250,244,255,0.4)]">{post.mood}</span>
          </div>
        </div>
      </div>

      {/* Image optionnelle */}
      {post.image && (
        <div className={`mx-5 mb-3 h-32 rounded-xl bg-gradient-to-br ${post.imageBg} flex items-center justify-center`}>
          <span className="text-5xl opacity-60">{post.imageEmoji}</span>
        </div>
      )}

      {/* Contenu */}
      <div className="px-5 pb-3">
        {post.achievement && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill bg-[rgba(248,210,16,0.1)] border border-[rgba(248,210,16,0.2)] text-[#f8d210] text-xs font-dm font-500 mb-2">
            {post.achievement}
          </div>
        )}
        <p className="text-sm font-dm font-300 text-[rgba(250,244,255,0.75)] leading-relaxed">
          {post.content}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 px-5 py-3 border-t border-[rgba(250,244,255,0.05)]">
        <button
          onClick={handleLike}
          className="flex items-center gap-1.5 text-xs font-dm transition-colors duration-200 group"
          style={{ color: liked ? "#f72585" : "rgba(250,244,255,0.4)" }}
          aria-label={liked ? "Je n'aime plus" : "J'aime"}
        >
          <Heart
            size={15}
            fill={liked ? "#f72585" : "none"}
            className="group-hover:scale-110 transition-transform duration-200"
          />
          {likes}
        </button>
        <button className="flex items-center gap-1.5 text-xs font-dm text-[rgba(250,244,255,0.4)] hover:text-[#4cc9f0] transition-colors duration-200" aria-label="Commenter">
          <MessageCircle size={15} />
          {post.comments}
        </button>
        <button className="flex items-center gap-1.5 text-xs font-dm text-[rgba(250,244,255,0.4)] hover:text-[#06d6a0] transition-colors duration-200 ml-auto" aria-label="Partager">
          <Share2 size={15} />
          Partager
        </button>
      </div>
    </motion.article>
  );
}

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.article
      variants={fadeInUp}
      className="flex flex-col gap-5 p-6 md:p-8 rounded-brand bg-gradient-card glow-border hover:border-[rgba(247,37,133,0.3)] transition-all duration-300"
    >
      {/* Quote */}
      <blockquote>
        <p className="font-dm font-300 text-base text-[rgba(250,244,255,0.8)] leading-relaxed italic">
          &ldquo;{t.shortQuote}&rdquo;
        </p>
      </blockquote>

      {/* Histoire complète */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="font-dm font-300 text-sm text-[rgba(250,244,255,0.6)] leading-relaxed border-t border-[rgba(250,244,255,0.06)] pt-4">
              {t.fullStory}
            </p>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="text-center p-2 rounded-xl bg-[rgba(247,37,133,0.08)] border border-[rgba(247,37,133,0.15)]">
                <p className="text-sm font-syne font-700 text-[#f72585]">{t.stats.sessions}</p>
                <p className="text-[10px] text-[rgba(250,244,255,0.4)]">séances</p>
              </div>
              <div className="text-center p-2 rounded-xl bg-[rgba(114,9,183,0.08)] border border-[rgba(114,9,183,0.15)]">
                <p className="text-sm font-syne font-700 text-[#7209b7]">{t.stats.streak}</p>
                <p className="text-[10px] text-[rgba(250,244,255,0.4)]">streak</p>
              </div>
              <div className="text-center p-2 rounded-xl bg-[rgba(76,201,240,0.08)] border border-[rgba(76,201,240,0.15)]">
                <p className="text-xs font-syne font-700 text-[#4cc9f0] leading-tight">{t.stats.partner}</p>
                <p className="text-[10px] text-[rgba(250,244,255,0.4)]">partenaire</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className="flex items-center gap-3 pt-4 border-t border-[rgba(250,244,255,0.06)]">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-syne font-700 text-white flex-shrink-0"
          style={{ background: `linear-gradient(135deg, ${t.avatarColor}, #7209b7)` }}
        >
          {t.initials}
        </div>
        <div className="flex-1">
          <p className="text-sm font-dm font-500 text-[#faf4ff]">{t.name}, {t.age} ans</p>
          <p className="text-xs text-[rgba(250,244,255,0.4)]">{t.city}</p>
        </div>
        <span
          className="flex items-center gap-1 px-2.5 py-1 rounded-pill text-xs font-dm font-500 border"
          style={{ background: `${t.avatarColor}15`, borderColor: `${t.avatarColor}30`, color: t.avatarColor }}
        >
          {t.sportEmoji} {t.sport}
        </span>
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-1.5 text-xs font-dm text-[rgba(250,244,255,0.4)] hover:text-[#f72585] transition-colors duration-200 self-start"
        aria-expanded={expanded}
      >
        {expanded ? "Réduire" : "Lire l'histoire complète"}
        <ChevronDown
          size={14}
          className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
        />
      </button>
    </motion.article>
  );
}

function MapSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredUser, setHoveredUser] = useState<typeof mapUsers[0] | null>(null);

  return (
    <section ref={ref} className="section-padding relative overflow-hidden bg-[#080010]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(76,201,240,0.2)] to-transparent" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] -translate-y-1/2 bg-[#4cc9f0]/05 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Texte */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col gap-6"
          >
            <motion.span variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-[rgba(76,201,240,0.1)] border border-[rgba(76,201,240,0.25)] text-xs font-dm font-500 text-[#4cc9f0] tracking-widest uppercase w-fit">
              <MapPin size={12} /> Autour de toi
            </motion.span>
            <motion.h2 variants={fadeInUp} className="font-syne font-800 text-4xl md:text-5xl text-[#faf4ff] leading-tight">
              Des sportifs<br />
              <span className="gradient-text-cyan">partout près de toi.</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-base font-dm font-300 text-[rgba(250,244,255,0.6)] leading-relaxed max-w-md">
              La carte Mood2Fit te montre les sportifs disponibles autour de toi en temps réel. Même discipline, même énergie, à 500m de chez toi.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col gap-3">
              {[
                { icon: "📍", text: "Sportifs disponibles dans un rayon de 1 à 10km" },
                { icon: "⚡", text: "Filtrés par mood, discipline et niveau" },
                { icon: "💬", text: "Contacte-les directement depuis la carte" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm font-dm text-[rgba(250,244,255,0.65)]">
                  <span className="text-base">{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Carte stylisée */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute inset-0 blur-[40px] bg-[#4cc9f0]/10 rounded-brand" />
            <div className="relative rounded-brand bg-[#0f0018] border border-[rgba(76,201,240,0.2)] overflow-hidden aspect-square max-w-[480px] mx-auto">
              {/* Grille de fond style carte */}
              <div className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(76,201,240,0.3) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(76,201,240,0.3) 1px, transparent 1px)
                  `,
                  backgroundSize: "40px 40px",
                }}
              />
              {/* Cercles de rayon */}
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(76,201,240,0.1)]"
                  style={{ width: `${i * 30}%`, height: `${i * 30}%` }}
                />
              ))}
              {/* Point central — toi */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <motion.div
                  className="w-5 h-5 rounded-full bg-[#4cc9f0] border-2 border-white shadow-glow-cyan"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] text-[#4cc9f0] whitespace-nowrap font-dm font-500">Toi</div>
              </div>
              {/* Points utilisateurs */}
              {mapUsers.map((user, i) => (
                <motion.div
                  key={user.id}
                  className="absolute z-10 cursor-pointer"
                  style={{ left: `${user.x}%`, top: `${user.y}%` }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  onMouseEnter={() => setHoveredUser(user)}
                  onMouseLeave={() => setHoveredUser(null)}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-700 text-white border-2 border-[#080010] hover:scale-125 transition-transform duration-200"
                    style={{ background: user.color }}
                  >
                    {user.name[0]}
                  </div>
                  <AnimatePresence>
                    {hoveredUser?.id === user.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 5, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.9 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#0f0018] border border-[rgba(250,244,255,0.15)] rounded-xl px-3 py-2 whitespace-nowrap z-30"
                      >
                        <p className="text-[10px] font-500 text-[#faf4ff]">{user.name}</p>
                        <p className="text-[9px] text-[rgba(250,244,255,0.5)]">{user.sport}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
              {/* Label */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="text-[10px] font-dm text-[rgba(250,244,255,0.3)]">
                  <MapPin size={10} className="inline mr-1" />
                  Paris, France
                </span>
                <span className="text-[10px] font-dm text-[#4cc9f0]">{mapUsers.length} sportifs disponibles</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── PAGE ────────────────────────────────────────────────────
export default function CommunautePage() {
  const feedRef = useRef<HTMLDivElement>(null);
  const feedInView = useInView(feedRef, { once: true, margin: "-100px" });
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const testimonialsInView = useInView(testimonialsRef, { once: true, margin: "-100px" });
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });

  return (
    <>
      <Navbar />
      <main>
        {/* HERO */}
        <section className="relative pt-32 pb-20 overflow-hidden bg-[#080010]">
          <div className="absolute inset-0 bg-gradient-hero opacity-60 pointer-events-none" />
          <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#f72585]/08 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 text-center">
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col items-center gap-6">
              <motion.span variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-[rgba(247,37,133,0.1)] border border-[rgba(247,37,133,0.25)] text-xs font-dm font-500 text-[#f72585] tracking-widest uppercase">
                <Users size={12} /> Communauté
              </motion.span>
              <motion.h1 variants={fadeInUp} className="font-syne font-800 text-5xl md:text-7xl text-[#faf4ff] leading-tight tracking-tight">
                Seul on va plus vite.<br />
                <span className="gradient-text">Ensemble on va plus loin.</span>
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-lg font-dm font-300 text-[rgba(250,244,255,0.6)] max-w-xl leading-relaxed">
                Mood2Fit c'est avant tout une communauté de gens qui se soutiennent. Le sport, c'est le prétexte.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* STATS BANDE */}
        <section ref={statsRef} className="relative py-12 bg-[#0f0018] border-y border-[rgba(247,37,133,0.1)]">
          <motion.div
            className="max-w-7xl mx-auto px-5 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
          >
            {stats.map((s) => (
              <motion.div key={s.label} variants={fadeInUp} className="text-center">
                <div className="text-2xl mb-1">{s.emoji}</div>
                <div className="font-syne font-800 text-3xl gradient-text">{s.value}</div>
                <div className="text-xs font-dm text-[rgba(250,244,255,0.5)] mt-1">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* FEED */}
        <section className="section-padding relative overflow-hidden bg-[#080010]">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#7209b7]/06 blur-[100px] rounded-full pointer-events-none" />
          <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8" ref={feedRef}>
            <motion.div
              className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
              variants={staggerContainer}
              initial="hidden"
              animate={feedInView ? "visible" : "hidden"}
            >
              <div>
                <motion.span variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-[rgba(247,37,133,0.1)] border border-[rgba(247,37,133,0.25)] text-xs font-dm font-500 text-[#f72585] tracking-widest uppercase mb-5">
                  <Flame size={12} /> Feed
                </motion.span>
                <motion.h2 variants={fadeInUp} className="font-syne font-800 text-4xl md:text-5xl text-[#faf4ff] leading-tight">
                  Ce qui se passe<br />dans la commu.
                </motion.h2>
              </div>
              <motion.p variants={fadeInUp} className="text-sm font-dm text-[rgba(250,244,255,0.4)] max-w-xs">
                Des vraies personnes, des vraies séances. Pas de contenu sponsorisé, pas de faux profils.
              </motion.p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-2 gap-5"
              variants={staggerContainer}
              initial="hidden"
              animate={feedInView ? "visible" : "hidden"}
            >
              {feedPosts.map((post, i) => (
                <FeedPost key={post.id} post={post} index={i} />
              ))}
            </motion.div>

            <motion.div
              className="text-center mt-10"
              initial={{ opacity: 0 }}
              animate={feedInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-pill border border-[rgba(247,37,133,0.3)] text-[rgba(250,244,255,0.6)] hover:text-[#f72585] hover:border-[rgba(247,37,133,0.6)] transition-all duration-200 text-sm font-dm"
              >
                Voir plus de posts
              </Link>
            </motion.div>
          </div>
        </section>

        {/* TÉMOIGNAGES */}
        <section className="section-padding relative overflow-hidden bg-[#0f0018]">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(247,37,133,0.15)] to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(247,37,133,0.15)] to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8" ref={testimonialsRef}>
            <motion.div
              className="mb-14"
              variants={staggerContainer}
              initial="hidden"
              animate={testimonialsInView ? "visible" : "hidden"}
            >
              <motion.span variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-[rgba(247,37,133,0.1)] border border-[rgba(247,37,133,0.25)] text-xs font-dm font-500 text-[#f72585] tracking-widest uppercase mb-5">
                <Trophy size={12} /> Histoires vraies
              </motion.span>
              <motion.h2 variants={fadeInUp} className="font-syne font-800 text-4xl md:text-5xl text-[#faf4ff] leading-tight max-w-2xl">
                Pas des avis.<br />
                <span className="gradient-text">Des vraies histoires.</span>
              </motion.h2>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-3 gap-5 md:gap-6"
              variants={staggerContainer}
              initial="hidden"
              animate={testimonialsInView ? "visible" : "hidden"}
            >
              {testimonials.map((t) => (
                <TestimonialCard key={t.id} t={t} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* CARTE */}
        <MapSection />

        {/* CTA */}
        <section className="relative py-24 md:py-36 overflow-hidden animated-gradient-bg">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 60%)" }} />
          <div className="absolute top-0 left-0 right-0 h-px bg-white/20" />

          <div className="relative z-10 max-w-4xl mx-auto px-5 md:px-8 text-center">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col items-center gap-6"
            >
              <motion.h2 variants={fadeInUp} className="font-syne font-800 text-5xl md:text-6xl text-white leading-tight">
                Rejoins la communauté.
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-base font-dm font-300 text-white/75 max-w-md">
                2 400 sportifs t'attendent déjà. Trouve ton partenaire aujourd'hui.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 mt-2">
                {[
                  { platform: "ios", label: "App Store", sub: "Disponible sur iOS" },
                  { platform: "android", label: "Google Play", sub: "Disponible sur Android" },
                ].map((btn) => (
                  <Link
                    key={btn.platform}
                    href="/"
                    className="flex items-center gap-4 px-7 py-4 rounded-brand bg-white/10 backdrop-blur-sm border border-white/25 hover:bg-white/20 active:scale-[0.97] transition-all duration-200"
                  >
                    {btn.platform === "ios" ? <Apple size={24} className="text-white" /> : <Play size={24} className="text-white" />}
                    <div className="text-left">
                      <p className="text-[10px] text-white/60">{btn.sub}</p>
                      <p className="text-base font-syne font-700 text-white">{btn.label}</p>
                    </div>
                  </Link>
                ))}
              </motion.div>
              <motion.p variants={fadeInUp} className="text-xs text-white/40">Bientôt disponible sur les stores</motion.p>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
