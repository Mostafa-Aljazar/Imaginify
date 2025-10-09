"use client";

import { AI_LOGO } from "@/assets/common";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants";

export default function Hero_Section() {
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
