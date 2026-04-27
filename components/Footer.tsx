import Link from "next/link";
import { Instagram, Twitter, Youtube } from "lucide-react";
import { footerContent } from "@/data/content";

// Map icônes sociales
const socialIcons: Record<string, React.ReactNode> = {
  instagram: <Instagram size={18} strokeWidth={1.8} />,
  tiktok: (
    // TikTok n'est pas dans Lucide — icône SVG custom minimaliste
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
    </svg>
  ),
  twitter: <Twitter size={18} strokeWidth={1.8} />,
  youtube: <Youtube size={18} strokeWidth={1.8} />,
};

export default function Footer() {
  return (
    <footer
      className="relative bg-[#080010] border-t border-[rgba(247,37,133,0.1)]"
      role="contentinfo"
    >
      {/* Ligne décorative haut */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(247,37,133,0.2)] to-transparent" />

      <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {/* Colonne 1 — Brand */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-5">
            {/* Logo */}
            <Link
              href="/"
              className="inline-flex items-center gap-0.5 group w-fit"
              aria-label="Mood2Fit — retour à l'accueil"
            >
              <span className="font-syne font-800 text-2xl text-[#faf4ff]">
                {footerContent.brand.logoText}
              </span>
              <span className="font-syne font-800 text-2xl gradient-text">
                {footerContent.brand.logoAccent}
              </span>
              <span className="ml-1.5 w-1.5 h-1.5 rounded-full bg-[#f72585] animate-pulse-glow" />
            </Link>

            {/* Tagline */}
            <p className="text-sm font-dm font-300 text-[rgba(250,244,255,0.5)] leading-relaxed max-w-[220px]">
              {footerContent.brand.tagline}
            </p>

            {/* Icônes sociales */}
            <div className="flex items-center gap-3" role="list">
              {footerContent.socials.map((social) => (
                <Link
                  key={social.platform}
                  href={social.href}
                  role="listitem"
                  aria-label={social.ariaLabel}
                  className="w-9 h-9 rounded-xl bg-[rgba(250,244,255,0.05)] border border-[rgba(250,244,255,0.08)] flex items-center justify-center text-[rgba(250,244,255,0.5)] hover:text-[#f72585] hover:border-[rgba(247,37,133,0.3)] hover:bg-[rgba(247,37,133,0.06)] active:scale-95 transition-all duration-200"
                >
                  {socialIcons[social.platform] ?? (
                    <span className="text-xs">{social.platform[0].toUpperCase()}</span>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Colonnes de liens */}
          {footerContent.columns.map((col) => (
            <nav key={col.title} aria-label={`Navigation ${col.title}`}>
              <h3 className="text-xs font-dm font-500 text-[rgba(250,244,255,0.4)] uppercase tracking-widest mb-5">
                {col.title}
              </h3>
              <ul className="flex flex-col gap-3" role="list">
                {col.links.map((link) => (
                  <li key={link.label} role="listitem">
                    <Link
                      href={link.href}
                      className="text-sm font-dm font-400 text-[rgba(250,244,255,0.55)] hover:text-[#faf4ff] transition-colors duration-200 relative group inline-flex"
                    >
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-brand group-hover:w-full transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Barre copyright */}
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-3 mt-14 pt-8 border-t border-[rgba(250,244,255,0.06)]">
          <p className="text-xs font-dm text-[rgba(250,244,255,0.3)]">
            {footerContent.copyright}
          </p>
          <p className="text-xs font-dm text-[rgba(250,244,255,0.2)]">
            Fait avec ❤️ à Paris
          </p>
        </div>
      </div>
    </footer>
  );
}
