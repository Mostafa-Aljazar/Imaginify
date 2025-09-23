"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Redirect_After_Auth() {
  const { isLoaded, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded || !user) return;

    if (user.passwordEnabled) {
      // Email/password signup
      router.replace("/");
    } else {
      // OAuth signup without password
      router.replace("/add-password");
    }
  }, [isLoaded, user, router]);

  return null;
}
