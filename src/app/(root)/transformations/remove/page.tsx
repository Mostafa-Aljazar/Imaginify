import { FAVICON } from "@/assets/common";
import Remove_Transformations_Page from "@/components/pages/transformations/remove/page";
import { APP_URL, ROUTES } from "@/constants";
import { Metadata } from "next";

const FALLBACK = {
  TITLE: "Object Remove | Imaginify",
  DESCRIPTION:
    "Remove unwanted objects from your images seamlessly using AI with Imaginify. Enhance your visuals instantly and effortlessly.",
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
    url: `${APP_URL + ROUTES.PAGES.TRANSFORMATIONS_REMOVE}`,
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

export default function Remove_Page() {
  return <Remove_Transformations_Page />;
}
