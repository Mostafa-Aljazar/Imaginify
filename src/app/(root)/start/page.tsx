import Hero_Section from "@/components/pages/start/hero-section";
import Recent_Edits from "@/components/pages/start/recent-edits";
import React from "react";

export default function Start_Page() {
  return (
    <div className="flex flex-col gap-5 pt-5 w-full">
      <Hero_Section />
      <Recent_Edits />
    </div>
  );
}
