"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AddPasswordPage() {
  const { isLoaded, user } = useUser();
  const [pw, setPw] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Clerk still loading
  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="size-8 text-primary animate-spin" />
      </div>
    );
  }

  // No user found
  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle>No user session</CardTitle>
            <CardDescription>
              Please sign in before setting your password
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await user?.updatePassword({ newPassword: pw });
      router.replace("/");
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="justify-center items-center grid bg-background px-4 min-h-screen">
      <Card className="md:bg-gray-50 md:shadow-lg border-none w-full sm:w-96">
        <CardHeader>
          <CardTitle className="text-center">Set your password</CardTitle>
          <CardDescription className="text-center">
            Add a password to secure your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full">
          <CardContent className="gap-y-4 grid">
            <Input
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              required
              minLength={8}
              placeholder="New password"
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <Loader className="size-4 animate-spin" />
              ) : (
                "Save password"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
