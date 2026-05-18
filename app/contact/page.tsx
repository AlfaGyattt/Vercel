import type { Metadata } from "next";
import ContactPage from "./ContactPage";

export const metadata: Metadata = {
  title: "Contact",
  description: "Une question, une idée, un partenariat ? L'équipe Mood2Fit répond à chaque message personnellement.",
  openGraph: {
    title: "Contact — Mood2Fit",
    description: "Une question, une idée, un partenariat ? On lit chaque message personnellement.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <ContactPage />;
}