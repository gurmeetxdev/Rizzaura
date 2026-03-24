import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import SparkleCursor from "@/components/SparkleCursor";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["700", "500"], variable: '--font-space-grotesk' });

export const metadata: Metadata = {
  title: "Rizzaura",
  description: "AI that audits your flirting game.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${inter.className} font-sans`}>
        <SparkleCursor />
        {children}
      </body>
    </html>
  );
}
