"use client";
import Hero_Section from "@/components/pages/start/hero-section";
import Recent_Edits from "@/components/pages/start/recent-edits";
import { useUserStore } from "@/stores/store-user-data";
import React from "react";

export default function Start_Page() {
  const { user } = useUserStore();
  return (
    <div className="flex flex-col gap-5 pt-5 w-full">
      <Hero_Section />
      <Recent_Edits />
    </div>
  );
}
