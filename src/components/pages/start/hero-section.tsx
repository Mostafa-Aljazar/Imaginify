import { cn } from "@/lib/utils";
import { ImagePlus, Sparkles, ScanEye, Palette, ImageIcon } from "lucide-react";
import React from "react";

const features = [
  { icon: ImagePlus, label: "Image Restore" },
  { icon: Sparkles, label: "Generative Fill" },
  { icon: ScanEye, label: "Object Remove" },
  { icon: Palette, label: "Object Recolor" },
  { icon: ImageIcon, label: "Remove Background" },
];

export default function Hero_Section() {
  return (
    <section className="flex justify-center items-center">
      <div className="flex flex-col items-center bg-gradient-to-br from-[#8a2be2] to-[#4682b4] shadow-lg p-6 md:p-8 rounded-2xl w-full max-w-4xl text-center">
        <div className="flex mb-3 w-full">
          <Sparkles className="self-start mb-2 w-4 sm:w-5 h-4 sm:h-5 text-white" />
          <h1 className="flex-1 font-bold text-white text-xl sm:text-2xl md:text-3xl leading-tight tracking-wide">
            <span>Unleash Your Creative</span>
            <br />
            <span>Vision with Imaginify</span>
          </h1>
        </div>

        <div className="gap-x-2 sm:gap-4 grid grid-cols-6 sm:grid-cols-5 w-full">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className={cn(
                  "flex flex-col items-center gap-2 col-span-2 sm:col-span-1 p-2",
                  idx === 3 && "col-span-3",
                  idx === 4 && "col-span-3"
                )}
              >
                <div className="flex justify-center items-center bg-white rounded-full w-12 h-12">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <p className="max-w-[80px] font-medium text-white text-xs sm:text-sm text-center break-words whitespace-normal">
                  {feature.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
