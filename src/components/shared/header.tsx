"use client";

import { useState, useEffect } from "react";
import { AI_LOGO } from "@/assets/common";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Menu, X, LogIn, UserPlus, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";

export default function Header() {
  const { isSignedIn, signOut } = useAuth();
  const router = useRouter();
  const [showHeader, setShowHeader] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll < 100) {
        setShowHeader(true);
      } else if (currentScroll > lastScroll) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      } bg-background/90 backdrop-blur-md border-b border-border shadow-md`}
    >
      <div className="flex justify-between items-center mx-auto px-4 sm:px-6 md:px-12 py-3 sm:py-4 max-w-7xl">
        <Link href={ROUTES.PAGES.HOME} className="flex items-center gap-3">
          <Image
            src={AI_LOGO}
            alt="Imaginify Logo"
            width={36}
            height={36}
            className="drop-shadow-md"
          />
          <span className="font-bold text-primary text-xl sm:text-2xl">
            Imaginify
          </span>
        </Link>

        <nav className="hidden sm:flex items-center gap-6">
          <a
            href="#features"
            className="font-medium text-foreground hover:text-primary transition-colors duration-300"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="font-medium text-foreground hover:text-primary transition-colors duration-300"
          >
            Pricing
          </a>
          <a
            href="#about"
            className="font-medium text-foreground hover:text-primary transition-colors duration-300"
          >
            About
          </a>
        </nav>

        <div className="hidden sm:flex items-center gap-3">
          {isSignedIn ? (
            <Button
              size="sm"
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-200"
              onClick={() => signOut()}
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          ) : (
            <>
              <Button
                size="sm"
                variant="secondary"
                className="flex items-center gap-2 hover:scale-105 transition-transform duration-200"
                onClick={() => router.push(ROUTES.AUTH_ROUTES.SIGN_IN)}
              >
                <LogIn className="w-4 h-4" />
                Login
              </Button>
              <Button
                size="sm"
                className="flex items-center gap-2 bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-200"
                onClick={() => router.push(ROUTES.AUTH_ROUTES.SIGN_UP)}
              >
                <UserPlus className="w-4 h-4" />
                Sign Up
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="sm:hidden hover:bg-primary/10 p-1 rounded-md text-foreground transition-colors duration-200"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`sm:hidden absolute top-full left-0 w-full bg-background border-t border-border shadow-lg overflow-hidden transition-all duration-300 ${
          isMenuOpen
            ? "max-h-[500px] opacity-100 pt-4 pb-6"
            : "max-h-0 opacity-0 pt-0 pb-0"
        }`}
      >
        <div className="flex flex-col gap-3 px-6">
          <a
            href="#features"
            className="font-medium text-foreground hover:text-primary transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Features
          </a>
          <a
            href="#pricing"
            className="font-medium text-foreground hover:text-primary transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Pricing
          </a>
          <a
            href="#about"
            className="font-medium text-foreground hover:text-primary transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </a>

          {isSignedIn ? (
            <Button
              size="sm"
              className="flex items-center gap-2 mt-2 w-full hover:scale-105 transition-transform duration-200"
              onClick={() => signOut()}
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          ) : (
            <>
              <Button
                size="sm"
                variant="secondary"
                className="flex items-center gap-2 mt-2 w-full hover:scale-105 transition-transform duration-200"
                onClick={() => router.push(ROUTES.AUTH_ROUTES.SIGN_IN)}
              >
                <LogIn className="w-4 h-4" />
                Login
              </Button>
              <Button
                size="sm"
                className="flex items-center gap-2 bg-primary hover:bg-primary/90 mt-2 w-full hover:scale-105 transition-all duration-200"
                onClick={() => router.push(ROUTES.AUTH_ROUTES.SIGN_UP)}
              >
                <UserPlus className="w-4 h-4" />
                Sign Up
              </Button>
            </>
          )}

          {isSignedIn && (
            <Button
              size="sm"
              className="flex items-center gap-2 mt-2 w-full hover:scale-105 transition-transform duration-200"
              onClick={() => signOut()}
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
