import { FAVICON } from "@/assets/common";
import Restore_Transformations_Page from "@/components/pages/transformations/restore/page";
import { APP_URL, ROUTES } from "@/constants";
import { Metadata } from "next";
import React from "react";

const FALLBACK = {
  TITLE: "Image Restore | Imaginify",
  DESCRIPTION:
    "Restore and enhance your images using AI with Imaginify. Remove noise, fix imperfections, and improve image quality instantly.",
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
    url: `${APP_URL + ROUTES.PAGES.TRANSFORMATIONS_RESTORE}`,
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

export default function Restore_Page() {
  return <Restore_Transformations_Page />;
}
