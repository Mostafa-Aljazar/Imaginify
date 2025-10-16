"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { NAVBAR_LINKS } from "@/constants";
import { cn } from "@/lib/cn";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col bg-background shadow-lg w-full md:w-64 h-[calc(100vh-4rem)]">
      <div className="flex flex-col flex-1 px-4 py-6 h-full">
        {NAVBAR_LINKS.map((link) => {
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
