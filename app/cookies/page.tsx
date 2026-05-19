import type { Metadata } from "next";
import CookiesPage from "./CookiesPage";

export const metadata: Metadata = {
  title: "Politique cookies",
  description: "Politique cookies de Mood2Fit — cookies utilisés, gestion et paramétrage.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <CookiesPage />;
}