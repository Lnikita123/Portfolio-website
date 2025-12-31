import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nikita Lilhore | Software Engineer Portfolio",
  description: "Portfolio of Nikita Lilhore - A passionate Software Engineer specializing in building scalable backend systems, high-throughput messaging platforms, and full-stack applications.",
  keywords: ["Software Engineer", "Full Stack Developer", "Node.js", "PostgreSQL", "MongoDB", "Docker", "AWS", "Backend Developer"],
  authors: [{ name: "Nikita Lilhore" }],
  openGraph: {
    title: "Nikita Lilhore | Software Engineer Portfolio",
    description: "Portfolio of Nikita Lilhore - A passionate Software Engineer building scalable systems",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0f0f0f] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
