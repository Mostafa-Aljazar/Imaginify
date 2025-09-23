"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home,
  History,
  Sparkles,
  Eraser,
  Palette,
  Image as ImageIcon,
  User as UserIcon,
  CreditCard,
} from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

const navbarLinks = [
  { name: "Start", href: ROUTES.PAGES.START, icon: Home },
  {
    name: "Image Restore",
    href: ROUTES.PAGES.TRANSFORMATIONS_RESTORE,
    icon: History,
  },
  {
    name: "Generative Fill",
    href: ROUTES.PAGES.TRANSFORMATIONS_FILL,
    icon: Sparkles,
  },
  {
    name: "Object Remove",
    href: ROUTES.PAGES.TRANSFORMATIONS_REMOVE,
    icon: Eraser,
  },
  {
    name: "Object Recolor",
    href: ROUTES.PAGES.TRANSFORMATIONS_RECOLOR,
    icon: Palette,
  },
  {
    name: "Background Remove",
    href: ROUTES.PAGES.TRANSFORMATIONS_REMOVE_BACKGROUND,
    icon: ImageIcon,
  },
  { name: "Profile", href: ROUTES.PAGES.PROFILE, icon: UserIcon },
  { name: "Buy Credits", href: ROUTES.PAGES.CREDITS, icon: CreditCard },
] as const;

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex flex-col bg-background shadow-lg w-64 h-[calc(100vh-4rem)]">
      <div className="flex flex-col flex-1 px-4 py-6 h-full">
        {navbarLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center justify-start pl-5 gap-3 m-2 flex-1 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary/20 text-primary"
                  : "text-foreground hover:bg-primary/10 hover:text-primary"
              }`}
            >
              <link.icon
                className={cn(
                  "w-5 h-5",
                  isActive ? "text-primary" : "hover:text-primary"
                )}
              />
              {link.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
