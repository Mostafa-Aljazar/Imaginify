import HomeHeroSection from "./home-hero-section";
import HomeExampleSection from "./home-example-section";

export default function HomePage() {
  return (
    <main className="relative bg-background pt-20 min-h-screen text-foreground">
      <HomeHeroSection />
      <HomeExampleSection />
    </main>
  );
}
