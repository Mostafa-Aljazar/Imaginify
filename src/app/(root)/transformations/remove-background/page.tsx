import { FAVICON } from "@/assets/common";
import Remove_Background_Transformations_Page from "@/components/pages/transformations/remove-background/page";
import { APP_URL, ROUTES } from "@/constants";
import { Metadata } from "next";

const FALLBACK = {
  TITLE: "Background Remove | Imaginify",
  DESCRIPTION:
    "Remove the background from your images effortlessly using AI with Imaginify. Achieve clean and professional visuals instantly.",
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
    url: `${APP_URL + ROUTES.PAGES.TRANSFORMATIONS_REMOVE_BACKGROUND}`,
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

export default function Remove_Background_Page() {
  return <Remove_Background_Transformations_Page />;
}
