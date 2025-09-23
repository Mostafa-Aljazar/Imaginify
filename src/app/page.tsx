"use client";
import Home_Section from "@/components/pages/home/home-section";
import { useAuth } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default function Home() {
  const { isSignedIn } = useAuth();
  console.log("🚀 ~ Home ~ isSignedIn:", isSignedIn);
  return <Home_Section />;
}
