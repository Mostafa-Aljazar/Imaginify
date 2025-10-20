import { Instagram, Mail, Twitter } from "lucide-react";
import { Button } from "../ui/button";
import { AI_LOGO } from "@/assets/common";
import Image from "next/image";

export default function Footer() {
  return (
    <footer
      id="contact" // this is now the contact section
      className="bg-card px-4 sm:px-6 md:px-12 py-10 border-t border-border text-card-foreground transition-opacity duration-700"
    >
      <div className="gap-6 sm:gap-6 grid grid-cols-1 sm:grid-cols-3 mx-auto max-w-7xl">
        <div className="sm:col-span-2 md:col-span-1 animate-fade-up">
          <div className="flex items-center gap-2 mb-3">
            <Image src={AI_LOGO} alt="Imaginify Logo" width={28} height={28} />
            <span className="font-bold text-primary text-lg">Imaginify</span>
          </div>
          <p className="max-w-xs text-muted-foreground text-sm leading-relaxed">
            Empowering creativity with AI-powered image editing tools for
            everyone.
          </p>
        </div>

        <div className="animate-fade-up delay-200">
          <h3 className="mb-3 font-semibold text-foreground text-base">
            Connect / Contact
          </h3>
          <div className="flex gap-3 mb-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary hover:scale-110 transition-transform duration-300"
              aria-label="Follow Imaginify on Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary hover:scale-110 transition-transform duration-300"
              aria-label="Follow Imaginify on Twitter"
            >
              <Twitter size={20} />
            </a>
            <a
              href="mailto:support@imaginify.com"
              className="text-muted-foreground hover:text-primary hover:scale-110 transition-transform duration-300"
              aria-label="Email Imaginify support"
            >
              <Mail size={20} />
            </a>
          </div>
          <div>
            <h4 className="mb-1.5 font-semibold text-foreground text-sm">
              Newsletter
            </h4>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-input px-3 py-2 border border-border rounded-md focus:outline-none hover:ring-primary/50 focus:ring-2 focus:ring-primary text-foreground text-sm transition-all duration-300"
                aria-label="Email for newsletter"
              />
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 whitespace-nowrap hover:scale-105 transition-transform duration-200"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-border text-muted-foreground text-sm text-center animate-fade-up delay-300">
        © 2025 Imaginify. All rights reserved.
      </div>
    </footer>
  );
}
