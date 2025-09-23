"use client";

import { ClerkProvider } from "@clerk/nextjs";

export default function Clerk_Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ClerkProvider>{children}</ClerkProvider>;
}
