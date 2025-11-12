import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Main_Provider from "@/providers/providers";
import Main_Layout from "@/components/layouts/main-layout";
import { FAVICON } from "@/assets/common";

const InterFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Imaginify | AI Image Platform",
  applicationName: "Imaginify",
  abstract:
    "AI-powered platform for image generation, editing, and transformations",
  description:
    "Imaginify is an AI image platform. Generate, edit, restore, recolor, and replace image backgrounds using Cloudinary AI API. Integrated with Stripe for secure payments and subscription management, optimized for fast performance and responsive SPA experience.",
  keywords: [
    "AI image generation",
    "image editing",
    "image restoration",
    "background removal",
    "background replacement",
    "image recoloring",
    "generative fill",
    "Cloudinary AI API",
    "frontend optimization",
  ],
  authors: [{ name: "Mostafa Ibrahim Mostafa Aljazar" }],
  icons: FAVICON.src,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to important origins to speed up LCP and resource fetches */}
        <link rel="preconnect" href="https://imaginify-1pla.vercel.app" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link
          rel="preconnect"
          href="https://accounts.dev"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${InterFont.variable} antialiased`}>
        <Main_Provider>
          <Main_Layout>{children}</Main_Layout>
        </Main_Provider>
      </body>
    </html>
  );
}
