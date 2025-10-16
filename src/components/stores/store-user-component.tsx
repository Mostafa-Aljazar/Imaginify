"use client";

import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useUserStore } from "@/stores/store-user-data";

export default function StoreUserComponent() {
  const { userId } = useAuth();
  const { fetchUser, user: storedUser } = useUserStore();

  useEffect(() => {
    if (!userId) return;
    fetchUser(userId);
  }, [userId, fetchUser]);

  return null;
}
