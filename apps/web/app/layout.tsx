import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "GenLayer Prediction Market",
  description: "Mock Next.js frontend demonstrating the full prediction market lifecycle for hackathon judging."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="page-shell">
          <Header />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
