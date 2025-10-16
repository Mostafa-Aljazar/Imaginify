import { NAVBAR_LINKS } from "@/constants";
import { cn } from "@/lib/cn";
import { Sparkles } from "lucide-react";

export default function Hero_Section() {
  const features = NAVBAR_LINKS.slice(1, 7);
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

        <div className="gap-x-2 sm:gap-4 grid grid-cols-3 sm:grid-cols-6 w-full">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className={cn(
                  "flex flex-col items-center gap-2 col-span-1 p-2"
                )}
              >
                <div className="flex justify-center items-center bg-white rounded-full w-12 h-12">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <p className="max-w-[80px] font-medium text-white text-xs sm:text-sm text-center break-words whitespace-normal">
                  {feature.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
