import type { Metadata } from "next";
import CommunautePage from "./CommunautePage";

export const metadata: Metadata = {
  title: "Communauté",
  description:
    "Rejoins des sportifs qui s'entraînent ensemble. Feed, témoignages, carte des sportifs près de toi.",
  openGraph: {
    title: "Communauté Mood2Fit — Entraîne-toi avec d'autres",
    description:
      "Rejoins des sportifs qui s'entraînent ensemble. Feed, témoignages, carte.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <CommunautePage />;
}