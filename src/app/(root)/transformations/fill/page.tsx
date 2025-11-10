import { FAVICON } from "@/assets/common";
import Fill_Transformations_Page from "@/components/pages/transformations/fill/fill-page";
import { APP_URL, ROUTES } from "@/constants";
import { Metadata } from "next";
import React from "react";

const FALLBACK = {
  TITLE: "Generative Fill | Imaginify",
  DESCRIPTION:
    "Enhance your images with AI-powered generative fill. Add new elements or expand your images seamlessly using Imaginify.",
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
    url: `${APP_URL + ROUTES.PAGES.TRANSFORMATIONS_FILL}`,
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

export default function Fill_Page() {
  return <Fill_Transformations_Page />;
}
