import type { Metadata } from "next";
import ConfidentialitePage from "./ConfidentialitePage";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité de Mood2Fit — données collectées, vos droits RGPD, prestataires tiers.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ConfidentialitePage />;
}