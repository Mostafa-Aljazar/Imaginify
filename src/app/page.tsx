import { FAVICON } from "@/assets/common";
import HomePage from "@/components/pages/home/home-page";
import { APP_URL, ROUTES } from "@/constants";
import { Metadata } from "next";

const FALLBACK = {
  TITLE: "Imaginify | AI Image Platform",
  DESCRIPTION:
    "Platform for generating, editing, restoring, recoloring, and replacing image backgrounds using AI with a smooth user experience.",
  IMAGE: FAVICON.src,
};

export const metadata: Metadata = {
  title: FALLBACK.TITLE,
  description: FALLBACK.DESCRIPTION,
  metadataBase: new URL(APP_URL),
  openGraph: {
    siteName: "Imaginify",
    title: FALLBACK.TITLE,
    description: FALLBACK.DESCRIPTION,
    url: `${APP_URL + ROUTES.PAGES.HOME}`,
    images: [
      {
        url: FALLBACK.IMAGE,
        width: 64,
        height: 64,
        alt: "Imaginify favicon",
      },
    ],
    locale: "en",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: FALLBACK.TITLE,
    description: FALLBACK.DESCRIPTION,
    images: [FALLBACK.IMAGE],
  },
};

export default function Home() {
  return (
    <main className="relative bg-background pt-20 min-h-screen text-foreground">
      <HomePage />
    </main>
  );
}
