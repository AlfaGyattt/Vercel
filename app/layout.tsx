import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mood2Fit — Trouve ton partenaire d'entraînement",
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
    <html lang="fr" className={`${syne.variable} ${dmSans.variable}`}>
      <body className="font-dm bg-[#080010] text-text-main antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
