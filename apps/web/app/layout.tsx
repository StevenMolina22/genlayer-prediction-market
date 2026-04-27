import type { Metadata } from "next";
import { JetBrains_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap"
});

export const metadata: Metadata = {
  title: "GenLayer Prediction Market",
  description: "Premium mock frontend demonstrating the full prediction market lifecycle for hackathon judging."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${jetbrainsMono.variable}`}>
        <div className="ambient-shell" aria-hidden="true">
          <div className="ambient-orb ambient-orb-one" />
          <div className="ambient-orb ambient-orb-two" />
          <div className="ambient-grid" />
        </div>
        <div className="page-shell">
          <Header />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
