import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground overflow-x-hidden`}
        style={{ background: "#000000", color: "#ffffff" }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
