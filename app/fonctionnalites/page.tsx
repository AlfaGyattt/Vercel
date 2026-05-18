import type { Metadata } from "next";
import FonctionnalitesPage from "./FonctionnalitesPage";

export const metadata: Metadata = {
  title: "Fonctionnalités",
  description:
    "Découvre toutes les fonctionnalités de Mood2Fit : matching par mood, défis, carte des sportifs, profil et progression.",
  openGraph: {
    title: "Fonctionnalités Mood2Fit — Conçu pour créer du lien",
    description:
      "Matching par mood, défis, carte, profil — tout ce qu'il faut pour s'entraîner avec les bonnes personnes.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <FonctionnalitesPage />;
}