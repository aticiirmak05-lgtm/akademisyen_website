import type { Metadata } from "next";
import { Playfair_Display, Space_Mono, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Bahadır Uçan — Karikatürist & Akademisyen",
  description:
    "Karikatürist ve animasyon akademisyeni Bahadır Uçan'ın sanat portfolyosu. Karikatür, illüstrasyon ve animasyon eserleri.",
  keywords: ["karikatür", "animasyon", "akademisyen", "illüstrasyon", "Bahadır Uçan"],
  openGraph: {
    title: "Bahadır Uçan — Karikatürist & Akademisyen",
    description: "Çizginin ve hareketin akademisi.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${playfair.variable} ${spaceMono.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative">{children}</body>
    </html>
  );
}
