"use client";

import { AFTER_EDIT, AI_LOGO, BEFORE_EDIT } from "@/assets/common";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants";

function Hero_Section() {
  const router = useRouter();

  return (
    <section className="relative flex flex-col justify-center items-center bg-gradient-to-b from-background via-primary/5 to-background shadow-xs px-4 sm:px-6 md:px-12 sm:pt-14 pb-10 text-center">
      <div className="-z-10 absolute inset-0 bg-[radial-gradient(ellipse_at_center,theme(colors.primary/15),transparent_70%)]"></div>

      <div className="mb-5 animate-pulse1">
        <Image
          src={AI_LOGO}
          alt="Imaginify Logo"
          width={120}
          height={120}
          className="drop-shadow-lg mx-auto w-[60px] sm:w-[100px] md:w-[120px] h-[60px] sm:h-[100px] md:h-[120px]"
          priority
        />
      </div>

      <h1 className="bg-clip-text bg-gradient-to-r from-primary to-accent mb-3 sm:mb-5 md:mb-6 font-extrabold text-transparent text-2xl sm:text-5xl md:text-6xl lg:text-7xl text-nowrap leading-tight tracking-tight animate-slide-up">
        Unleash Your Imagination
      </h1>

      <p className="mb-6 sm:mb-8 px-2 max-w-md sm:max-w-2xl md:max-w-3xl text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed animate-fade-in-delay">
        AI-powered creativity at your fingertips. Generate, edit, and transform
        images instantly with
        <span className="font-semibold text-foreground"> Imaginify</span>
      </p>

      <div className="flex sm:flex-row flex-col justify-center gap-3 sm:gap-4 px-2 w-full sm:w-auto">
        <Button
          size="lg"
          className="group bg-primary hover:bg-primary/90 shadow-lg w-full sm:w-auto text-primary-foreground hover:scale-105 transition-all duration-300"
          onClick={() => {
            router.push(ROUTES.PAGES.START);
          }}
        >
          Try Editing Now
          <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </section>
  );
}

function Example_Section() {
  return (
    <section className="mx-auto px-4 sm:px-6 md:px-12 py-10 max-w-7xl">
      <h2 className="bg-clip-text bg-gradient-to-r from-primary to-accent mb-6 sm:mb-8 font-bold text-transparent text-2xl sm:text-3xl md:text-4xl text-center">
        Before and After with AI
      </h2>

      <div className="gap-5 sm:gap-6 grid grid-cols-1 md:grid-cols-2">
        <div className="group relative shadow-lg rounded-xl overflow-hidden hover:scale-[1.02] transition-transform duration-300">
          <Image
            src={BEFORE_EDIT}
            alt="Before Editing - Original"
            width={600}
            height={400}
            className="w-full h-auto object-cover"
            priority
          />
          <div className="top-3 sm:top-4 left-3 sm:left-4 absolute bg-gray-200 shadow px-3 sm:px-4 py-1 rounded-full font-medium text-gray-700 text-xs sm:text-sm">
            Before
          </div>
          <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <div className="group relative shadow-lg rounded-xl overflow-hidden hover:scale-[1.02] transition-transform duration-300">
          <Image
            src={AFTER_EDIT}
            alt="After Editing - AI Enhanced"
            width={600}
            height={400}
            className="w-full h-auto object-cover"
            priority
          />
          <div className="top-3 sm:top-4 left-3 sm:left-4 absolute bg-primary shadow px-3 sm:px-4 py-1 rounded-full font-medium text-xs sm:text-sm text-accent-foreground">
            After
          </div>
          <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>
    </section>
  );
}
export default function Home_Section() {
  return (
    <main className="relative bg-background pt-20 min-h-screen text-foreground">
      <Hero_Section />
      <Example_Section />
    </main>
  );
}
