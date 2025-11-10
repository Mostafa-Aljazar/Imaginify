import { FAVICON } from "@/assets/common";
import Replace_Background_Transformations_Page from "@/components/pages/transformations/replace-background/page";
import { APP_URL, ROUTES } from "@/constants";
import { Metadata } from "next";
import React from "react";

const FALLBACK = {
  TITLE: "Background Replace | Imaginify",
  DESCRIPTION:
    "Replace the background of your images using AI with Imaginify. Create stunning visuals by generating new backgrounds seamlessly.",
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
    url: `${APP_URL + ROUTES.PAGES.TRANSFORMATIONS_REPLACE_BACKGROUND}`,
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

export default function Replace_Background_Page() {
  return <Replace_Background_Transformations_Page />;
}
