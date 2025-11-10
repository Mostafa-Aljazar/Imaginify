import { FAVICON } from "@/assets/common";
import Profile_Card from "@/components/pages/profile/profile-card";
import Profile_Header from "@/components/pages/profile/profile-header";
import Profile_Recent_Edits from "@/components/pages/profile/profile-recent-edits";
import { APP_URL, ROUTES } from "@/constants";
import { Metadata } from "next";

const FALLBACK = {
  TITLE: "Profile | Imaginify",
  DESCRIPTION:
    "Manage your account, view your profile details, and track your recent image edits on Imaginify.",
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
    url: `${APP_URL + ROUTES.PAGES.PROFILE}`,
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

export default function Profile_Page() {
  return (
    <div className="flex flex-col gap-12 mx-auto p-4 md:p-6 max-w-6xl">
      <Profile_Header />
      <Profile_Card />
      <Profile_Recent_Edits />
    </div>
  );
}
