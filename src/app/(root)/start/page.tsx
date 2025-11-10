import { IMG_START_PAGE } from "@/assets/common";
import StartHeroSection from "@/components/pages/start/start-hero-section";
import StartRecentEditsSection from "@/components/pages/start/start-recent-edits-section";
import { APP_URL, ROUTES } from "@/constants";
import { Metadata } from "next";

const FALLBACK = {
  TITLE: "Recent Edits | Imaginify",
  DESCRIPTION:
    "View the latest edits and enhancements on your images using the Imaginify AI platform.",
  IMAGE: IMG_START_PAGE.src,
};

export const metadata: Metadata = {
  title: FALLBACK.TITLE,
  description: FALLBACK.DESCRIPTION,
  metadataBase: new URL(APP_URL),
  openGraph: {
    siteName: "Imaginify",
    title: FALLBACK.TITLE,
    description: FALLBACK.DESCRIPTION,
    url: `${APP_URL + ROUTES.PAGES.START}`,
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

export default function Start_Page() {
  return (
    <div className="flex flex-col gap-5 pt-5 w-full">
      <StartHeroSection />
      <StartRecentEditsSection />
    </div>
  );
}
