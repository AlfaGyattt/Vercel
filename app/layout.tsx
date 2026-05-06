import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mood2Fit",
  description:
    "L'app qui matche ton énergie du jour avec le bon partenaire de sport. Musculation, street workout, cardio — entraîne-toi avec des gens qui te ressemblent.",
  keywords: [
    "partenaire sport",
    "workout",
    "musculation",
    "street workout",
    "motivation sport",
    "app fitness",
    "co-sport",
  ],
  authors: [{ name: "Mood2Fit" }],
  openGraph: {
    title: "Mood2Fit — Trouve ton partenaire d'entraînement",
    description:
      "L'app qui matche ton énergie du jour avec le bon partenaire de sport.",
    url: "https://mood2fit.app",
    siteName: "Mood2Fit",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mood2Fit — Trouve ton partenaire d'entraînement",
    description:
      "L'app qui matche ton énergie du jour avec le bon partenaire de sport.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={roboto.variable}>
      <body className="font-roboto bg-[#080010] text-text-main antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}