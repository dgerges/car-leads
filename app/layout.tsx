import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nettoyage Voiture Rennes | Service Pro à Domicile",
  description:
    "Service de nettoyage et lavage voiture à Rennes et Ille-et-Vilaine. Professionnel, rapide, à domicile. Devis gratuit en 2 minutes.",
  keywords: [
    "nettoyage voiture Rennes",
    "lavage auto Rennes",
    "nettoyage voiture Ille-et-Vilaine",
    "detailing auto Rennes",
    "nettoyage intérieur voiture Rennes",
    "polish voiture Rennes",
  ],
  openGraph: {
    title: "Nettoyage Voiture Rennes | Service Pro à Domicile",
    description:
      "Service de nettoyage et lavage voiture à Rennes. Professionnel, rapide, à domicile. Devis gratuit.",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={geist.className}>
      <body>
        {children}
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
          <Script
            defer
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.js"
          />
        )}
      </body>
    </html>
  );
}
