import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yashkumar U Kolekar — Tutor | B.E. Robotics & AI",
  description:
    "Portfolio of Yashkumar U Kolekar — dedicated tutor with 3 years of experience teaching Mathematics, Physics, Chemistry and Biology (Grades 6–10). AWS AI/ML Scholar, Reliance Foundation Scholar, Stanford Code in Place alumnus.",
  keywords: [
    "Yashkumar Kolekar",
    "Tutor",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Robotics",
    "AI",
    "Bengaluru",
    "Portfolio",
  ],
  authors: [{ name: "Yashkumar U Kolekar" }],
  openGraph: {
    title: "Yashkumar U Kolekar — Tutor | B.E. Robotics & AI",
    description:
      "3 years of tutoring experience. AWS AI/ML Scholar. Stanford Code in Place alumnus.",
    type: "website",
  },
};

import SmoothScroll from "@/components/SmoothScroll";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${inter.variable} antialiased bg-background text-foreground`}
        style={{ background: "#050505", color: "#FDFCF0" }}
      >
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <Toaster />
      </body>
    </html>
  );
}
