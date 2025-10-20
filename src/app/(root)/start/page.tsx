import StartHeroSection from "@/components/pages/start/start-hero-section";
import StartRecentEditsSection from "@/components/pages/start/start-recent-edits-section";

export default function Start_Page() {
  return (
    <div className="flex flex-col gap-5 pt-5 w-full">
      <StartHeroSection />
      <StartRecentEditsSection />
    </div>
  );
}
