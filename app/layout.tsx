import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ASILO Builds · Diablo 4 BR",
  description: "Builds verificadas por jogadores top ranked do servidor brasileiro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className={`${inter.className} min-h-full flex flex-col bg-bg-primary text-text-primary`}>
        <Header />
        <main className="flex-grow pt-16">
          {children}
        </main>
      </body>
    </html>
  );
}
