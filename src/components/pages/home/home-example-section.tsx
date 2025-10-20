import { AFTER_EDIT, BEFORE_EDIT } from "@/assets/common";
import Image from "next/image";

export default function HomeExampleSection() {
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
