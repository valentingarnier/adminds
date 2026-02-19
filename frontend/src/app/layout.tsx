import type { Metadata } from "next";
import { Inter, DM_Serif_Display, Instrument_Serif } from "next/font/google";
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
    default: "Adminds — AI-Powered Medical Reports",
    template: "%s | Adminds",
  },
  description:
    "Write disability insurance reports in minutes, not hours. AI-powered, legally compliant, medically precise.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSerif.variable} ${instrumentSerif.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
