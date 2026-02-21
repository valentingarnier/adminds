import type { Metadata } from "next";
import { Inter, DM_Serif_Display, Instrument_Serif } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const dmSerif = DM_Serif_Display({
  variable: "--font-serif",
  weight: "400",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Adminds — Rapports médicaux assistés par IA",
    template: "%s | Adminds",
  },
  description:
    "Rédigez vos rapports d'assurance invalidité en minutes, pas en heures. Assisté par IA, conforme au droit, médicalement précis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${dmSerif.variable} ${instrumentSerif.variable}`}>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-EM2F3EN3LV"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-EM2F3EN3LV');
        `}
      </Script>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
