import type { Metadata } from "next";
import CguPage from "./CguPage";

export const metadata: Metadata = {
  title: "CGU",
  description: "Conditions générales d'utilisation de Mood2Fit.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <CguPage />;
}