import type { Metadata } from "next";
import ActualitePage from "./ActualitePage";

export const metadata: Metadata = {
  title: "Actualités",
  description: "Tips, tendances sport, nutrition et événements. Le fil de la communauté Mood2Fit mis à jour chaque mois.",
  openGraph: {
    title: "Actualités Sport — Mood2Fit",
    description: "Tips, tendances, nutrition et événements. Le meilleur de l'actu sport chaque mois.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <ActualitePage />;
}