import type { Metadata } from "next";
import MentionsLegalesPage from "./MentionsLegalesPage";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site Mood2Fit — éditeur, hébergeur, propriété intellectuelle.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <MentionsLegalesPage />;
}