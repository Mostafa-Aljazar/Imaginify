import { FAVICON } from "@/assets/common";
import Recolor_Transformations_Page from "@/components/pages/transformations/recolor/page";
import { APP_URL, ROUTES } from "@/constants";
import { Metadata } from "next";

const FALLBACK = {
  TITLE: "Object Recolor | Imaginify",
  DESCRIPTION:
    "Recolor specific objects in your images using AI with Imaginify. Change colors seamlessly and enhance your images instantly.",
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
    url: `${APP_URL + ROUTES.PAGES.TRANSFORMATIONS_RECOLOR}`,
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

export default function Recolor_Page() {
  return <Recolor_Transformations_Page />;
}
