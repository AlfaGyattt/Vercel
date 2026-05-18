import type { Metadata } from "next";
import AProposPage from "./AProposPage";

export const metadata: Metadata = {
  title: "À propos",
  description: "Mood2Fit est née d'une conviction simple : le sport est meilleur quand il se partage. Découvre l'histoire et l'équipe.",
  openGraph: {
    title: "À propos — Mood2Fit",
    description: "Nés d'une séance ratée. L'histoire de Mood2Fit et de l'équipe derrière l'app.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <AProposPage />;
}