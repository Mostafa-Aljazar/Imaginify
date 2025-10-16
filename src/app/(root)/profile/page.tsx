import Profile_Card from "@/components/pages/profile/profile-card";
import Profile_Header from "@/components/pages/profile/profile-header";
import Profile_Recent_Edits from "@/components/pages/profile/profile-recent-edits";

export default function Profile_Page() {
  return (
    <div className="flex flex-col gap-12 mx-auto p-4 md:p-6 max-w-6xl">
      <Profile_Header />
      <Profile_Card />
      <Profile_Recent_Edits />
    </div>
  );
}
