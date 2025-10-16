"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import { NAVBAR_LINKS, ROUTES } from "@/constants";
import { cn } from "@/lib/cn";
import { useAuth } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { LogIn, LogOut, UserPlus } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

export default function Drawer() {
  const { isSignedIn, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <ScrollArea className="bg-gray-100 px-2 py-4 w-full h-screen overflow-y-auto">
      <nav className="flex flex-col gap-1 w-full">
        {NAVBAR_LINKS.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center justify-start pl-5 py-2 gap-3 m-2 flex-1 rounded-lg text-sm font-medium transition-colors ${
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
      </nav>

      <div className="flex flex-col gap-3 mt-4 px-6">
        {isSignedIn ? (
          <Button
            size="sm"
            className="flex items-center gap-2 w-full hover:scale-105 transition-transform duration-200"
            onClick={() => signOut()}
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        ) : (
          <div className="flex flex-row gap-3 w-full">
            <Button
              size="sm"
              variant="secondary"
              className="flex flex-1 items-center gap-2 hover:scale-105 transition-transform duration-200"
              onClick={() => router.push(ROUTES.AUTH_ROUTES.SIGN_IN)}
            >
              <LogIn className="w-4 h-4" />
              Login
            </Button>
            <Button
              size="sm"
              className="flex flex-1 items-center gap-2 bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-200"
              onClick={() => router.push(ROUTES.AUTH_ROUTES.SIGN_UP)}
            >
              <UserPlus className="w-4 h-4" />
              Sign Up
            </Button>
          </div>
        )}
      </div>
    </ScrollArea>
  );
}
