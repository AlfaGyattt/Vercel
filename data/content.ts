// ========================================
// MOOD2FIT — CONTENT DATA
// Toutes les données statiques centralisées
// ========================================

// --- NAVBAR ---
export interface NavLink {
  label: string;
  href: string;
}

export interface NavContent {
  logoText: string;
  logoAccent: string;
  links: NavLink[];
  ctaLabel: string;
  ctaHref: string;
}

export const navContent: NavContent = {
  logoText: "Mood",
  logoAccent: "2Fit",
  links: [
    { label: "Fonctionnalités", href: "/fonctionnalites" },
    { label: "Communauté", href: "/communaute" },
    { label: "Newsletter", href: "/newletter" },
    { label: "Contact", href: "/contact" },
    { label: "A propos", href: "/apropos" },
  ],
  ctaLabel: "Télécharger",
  ctaHref: "/",
};

// --- HERO ---
export interface HeroStat {
  value: string;
  label: string;
}

export interface StoreButton {
  platform: "ios" | "android";
  label: string;
  sublabel: string;
  href: string;
}

export interface HeroContent {
  eyebrow: string;
  title: string[];
  titleAccent: string;
  subtitle: string;
  storeButtons: StoreButton[];
  socialProof: {
    count: string;
    label: string;
    avatarColors: string[];
  };
  videoSrc: string;
}

export const heroContent: HeroContent = {
  eyebrow: "Application mobile",
  title: ["Entraîne-toi", "avec les bons"],
  titleAccent: "au bon moment.",
  subtitle:
    "Mood2Fit matche ton énergie du jour avec le parfait partenaire de sport. Musculation, street workout, cardio — plus jamais seul.",
  storeButtons: [
    {
      platform: "ios",
      label: "App Store",
      sublabel: "Bientôt disponible",
      href: "/",
    },
    {
      platform: "android",
      label: "Google Play",
      sublabel: "Bientôt disponible",
      href: "/",
    },
  ],
  socialProof: {
    count: "2 400+",
    label: "inscrits sur la liste d'attente",
    avatarColors: ["#f72585", "#7209b7", "#4cc9f0", "#06d6a0"],
  },
  videoSrc: "/acceuil.mp4",
};

// --- STATS ---
export interface Stat {
  value: number;
  suffix: string;
  label: string;
  source: string;
}

export const statsContent: Stat[] = [
  {
    value: 5600,
    suffix: "+",
    label: "salles de sport en France",
    source: "FSCF 2024",
  },
  {
    value: 800,
    suffix: "+",
    label: "parks de street workout",
    source: "WorldUrbanGames",
  },
  {
    value: 7,
    suffix: "M+",
    label: "abonnés salle de sport",
    source: "IHRSA 2024",
  },
  {
    value: 29,
    suffix: "%",
    label: "abandonnent faute de motivation",
    source: "Étude Decathlon 2023",
  },
];

// --- APP SHOWCASE ---
export interface ShowcaseFeature {
  id: string;
  emoji: string;
  title: string;
  description: string;
  accentColor: string;
  screenBg: string;
  isCentral?: boolean;
}

export const showcaseContent: {
  eyebrow: string;
  title: string;
  features: ShowcaseFeature[];
} = {
  eyebrow: "L'application",
  title: "Tout ce dont tu as besoin.",
  features: [
    {
      id: "mood",
      emoji: "⚡",
      title: "Mood du jour",
      description:
        "Indique ton énergie, tes objectifs du moment et trouve des partenaires qui matchent exactement avec toi.",
      accentColor: "#f72585",
      screenBg: "from-[#f72585]/20 to-[#7209b7]/20",
    },
    {
      id: "matching",
      emoji: "🎯",
      title: "Matching intelligent",
      description:
        "Algorithme de matching basé sur ta discipline, ton niveau, ta localisation et ton humeur.",
      accentColor: "#4cc9f0",
      screenBg: "from-[#4cc9f0]/20 to-[#7209b7]/20",
      isCentral: true,
    },
    {
      id: "challenges",
      emoji: "🏆",
      title: "Challenges",
      description:
        "Défis hebdomadaires en solo ou en équipe. Progresse, classe-toi, gagne des badges.",
      accentColor: "#06d6a0",
      screenBg: "from-[#06d6a0]/20 to-[#4cc9f0]/20",
    },
  ],
};

// --- TESTIMONIALS ---
export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  city: string;
  sport: string;
  sportEmoji: string;
  avatarBg: string;
  avatarInitials: string;
}

export const testimonialsContent: {
  eyebrow: string;
  title: string;
  testimonials: Testimonial[];
} = {
  eyebrow: "Communauté",
  title: "Pas des avis. Des vraies histoires.",
  testimonials: [
    {
      id: "t1",
      quote:
        "J'avais arrêté la salle depuis 6 mois. Mood2Fit m'a redonné une raison de remettre mes baskets — et une partenaire qui me donne envie de pas cancel.",
      name: "Inès",
      city: "Lyon",
      sport: "Musculation",
      sportEmoji: "💪",
      avatarBg: "#f72585",
      avatarInitials: "IN",
    },
    {
      id: "t2",
      quote:
        "L'algo est bluffant. J'ai trouvé un groupe pour le street workout le samedi matin en 20 minutes. On s'entraîne ensemble depuis 3 mois.",
      name: "Karim",
      city: "Paris 19e",
      sport: "Street Workout",
      sportEmoji: "🏋️",
      avatarBg: "#7209b7",
      avatarInitials: "KA",
    },
    {
      id: "t3",
      quote:
        "Je pensais pas que une app de sport pouvait changer autant ma routine. Maintenant j'attends le vendredi pour le run avec Léa — c'est mon rituel.",
      name: "Maxime",
      city: "Bordeaux",
      sport: "Running",
      sportEmoji: "🏃",
      avatarBg: "#4cc9f0",
      avatarInitials: "MA",
    },
  ],
};

// --- ARTICLES ---
export interface Article {
  id: string;
  tag: string;
  tagColor: string;
  title: string;
  description: string;
  readTime: string;
  imageBg: string;
  imageEmoji: string;
}

export const articlesContent: {
  eyebrow: string;
  title: string;
  articles: Article[];
} = {
  eyebrow: "Magazine",
  title: "Pour aller plus loin.",
  articles: [
    {
      id: "a1",
      tag: "Motivation",
      tagColor: "#f72585",
      title: "Pourquoi s'entraîner seul est le meilleur moyen d'abandonner",
      description:
        "La science derrière la motivation sociale et comment un partenaire multiplie tes chances de tenir sur la durée.",
      readTime: "4 min",
      imageBg: "from-[#f72585]/30 to-[#7209b7]/30",
      imageEmoji: "🧠",
    },
    {
      id: "a2",
      tag: "Street Workout",
      tagColor: "#4cc9f0",
      title: "Les 5 meilleurs parks de Paris pour progresser en callisthénie",
      description:
        "Notre sélection des spots incontournables, des débutants aux confirmés. Avec les horaires et l'ambiance.",
      readTime: "6 min",
      imageBg: "from-[#4cc9f0]/30 to-[#7209b7]/30",
      imageEmoji: "🏙️",
    },
    {
      id: "a3",
      tag: "Nutrition",
      tagColor: "#06d6a0",
      title: "Manger juste avant la séance : mythe ou réalité ?",
      description:
        "Ce que dit vraiment la science sur le timing nutritionnel autour de l'effort. Sans blabla.",
      readTime: "5 min",
      imageBg: "from-[#06d6a0]/30 to-[#4cc9f0]/30",
      imageEmoji: "🥗",
    },
  ],
};

// --- PARTNERS ---
export interface Partner {
  id: string;
  name: string;
  description: string;
}

export const partnersContent: {
  label: string;
  partners: Partner[];
} = {
  label: "Ils nous font confiance",
  partners: [
    { id: "p1", name: "Decathlon Pro", description: "Équipementier officiel" },
    { id: "p2", name: "Basic-Fit", description: "Réseau de salles partenaire" },
    { id: "p3", name: "My Protein", description: "Nutrition sportive" },
    { id: "p4", name: "GymLib", description: "Accès multi-salles" },
    { id: "p5", name: "Kipsta", description: "Accessoires sport" },
  ],
};

// --- NEWSLETTER ---
export interface NewsletterContent {
  eyebrow: string;
  title: string;
  benefits: string[];
  formLabels: {
    firstname: string;
    email: string;
    submit: string;
    submitting: string;
    success: string;
    successSub: string;
  };
}

export const newsletterContent: NewsletterContent = {
  eyebrow: "Newsletter",
  title: "Dans la boucle avant tout le monde.",
  benefits: [
    "Accès en avant-première aux nouvelles features",
    "Conseils sport exclusifs chaque semaine",
    "Invitations aux événements communautaires",
  ],
  formLabels: {
    firstname: "Prénom",
    email: "Email",
    submit: "Je m'abonne",
    submitting: "Envoi en cours…",
    success: "Tu es dans la boucle. 🔥",
    successSub: "Vérifie ton email pour confirmer ton inscription.",
  },
};

// --- FINAL CTA ---
export interface CtaContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  mention: string;
  storeButtons: StoreButton[];
}

export const ctaContent: CtaContent = {
  eyebrow: "C'est l'heure",
  title: "Ton partenaire t'attend.",
  subtitle:
    "Rejoins des milliers de sportifs qui s'entraînent mieux, ensemble.",
  mention: "Bientôt disponible sur les stores",
  storeButtons: [
    {
      platform: "ios",
      label: "App Store",
      sublabel: "Disponible sur iOS",
      href: "/",
    },
    {
      platform: "android",
      label: "Google Play",
      sublabel: "Disponible sur Android",
      href: "/",
    },
  ],
};

// --- FOOTER ---
export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  platform: string;
  href: string;
  ariaLabel: string;
}

export interface FooterContent {
  brand: {
    logoText: string;
    logoAccent: string;
    tagline: string;
  };
  socials: SocialLink[];
  columns: FooterColumn[];
  copyright: string;
}

export const footerContent: FooterContent = {
  brand: {
    logoText: "Mood",
    logoAccent: "2Fit",
    tagline: "Entraîne-toi avec les bons, au bon moment.",
  },
  socials: [
    { platform: "instagram", href: "/", ariaLabel: "Mood2Fit sur Instagram" },
    { platform: "tiktok", href: "/", ariaLabel: "Mood2Fit sur TikTok" },
    { platform: "twitter", href: "/", ariaLabel: "Mood2Fit sur X (Twitter)" },
  ],
  columns: [
    {
      title: "Application",
      links: [
        { label: "Fonctionnalités", href: "#features" },
        { label: "Comment ça marche", href: "#" },
        { label: "Télécharger", href: "/" },
        { label: "Changelog", href: "#" },
      ],
    },
    {
      title: "Entreprise",
      links: [
        { label: "À propos", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Presse", href: "#" },
        { label: "Nous contacter", href: "#contact" },
      ],
    },
    {
      title: "Légal",
      links: [
        { label: "Mentions légales", href: "#" },
        { label: "CGU", href: "#" },
        { label: "Politique de confidentialité", href: "#" },
        { label: "Cookies", href: "#" },
      ],
    },
  ],
  copyright: `© ${new Date().getFullYear()} Mood2Fit. Tous droits réservés.`,
};

// --- CONTACT ---
export interface ContactContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  formLabels: {
    name: string;
    email: string;
    subject: string;
    message: string;
    submit: string;
    submitting: string;
    success: string;
    successSub: string;
  };
}

export const contactContent: ContactContent = {
  eyebrow: "Contact",
  title: "On est à l'écoute.",
  subtitle:
    "Une question, une idée, un partenariat ? Écris-nous — on répond sous 48h.",
  formLabels: {
    name: "Nom complet",
    email: "Email",
    subject: "Sujet",
    message: "Ton message",
    submit: "Envoyer",
    submitting: "Envoi…",
    success: "Message envoyé. 👋",
    successSub: "On te répond dans les 48h.",
  },
};
