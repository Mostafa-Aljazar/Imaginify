"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Check, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserStore } from "@/stores/store-user-data";

// Credit amounts for each plan
const CREDIT_PACKAGES = {
  "Pro Package": 120,
  "Premium Package": 2000,
} as const;

function SuccessContent() {
  const searchParams = useSearchParams();
  const { user: clerkUser } = useUser();
  const { fetchUser, incrementCredits } = useUserStore();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [sessionData, setSessionData] = useState<any>(null);

  useEffect(() => {
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      setStatus("error");
      return;
    }

    // Verify the session
    fetch(`/api/stripe/verify-session?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "paid") {
          setStatus("success");
          setSessionData(data);

          // Update local store with new credits
          const planName = data.planName as keyof typeof CREDIT_PACKAGES;
          if (planName && CREDIT_PACKAGES[planName]) {
            const creditsToAdd = CREDIT_PACKAGES[planName];
            incrementCredits(creditsToAdd);

            // Optionally refetch user data to ensure sync
            if (clerkUser?.id) {
              setTimeout(() => {
                fetchUser(clerkUser.id);
              }, 1000);
            }
          }
        } else {
          setStatus("error");
        }
      })
      .catch((error) => {
        console.error("Verification error:", error);
        setStatus("error");
      });
  }, [searchParams, incrementCredits, fetchUser, clerkUser]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 w-12 h-12 text-primary animate-spin" />
          <p className="text-muted-foreground text-lg">
            Verifying your payment...
          </p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex justify-center items-center bg-gradient-to-br from-red-50 to-red-100 p-4 min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center items-center bg-red-100 mx-auto mb-4 rounded-full w-16 h-16">
              <X className="w-8 h-8 text-red-600" />
            </div>
            <CardTitle className="text-2xl">
              Payment Verification Failed
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-6 text-muted-foreground">
              We couldn't verify your payment. Please contact support if you
              were charged.
            </p>
            <Button asChild>
              <Link href="/pricing">Back to Pricing</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const planName = sessionData?.planName as keyof typeof CREDIT_PACKAGES;
  const creditsAdded = planName ? CREDIT_PACKAGES[planName] : 0;

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-green-50 to-emerald-100 p-4 min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center bg-green-100 mx-auto mb-4 rounded-full w-16 h-16">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-6 text-muted-foreground">
            Thank you for your purchase. Your credits have been added to your
            account.
          </p>

          {sessionData?.planName && (
            <div className="space-y-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="mb-1 text-muted-foreground text-sm">
                  Plan Purchased
                </p>
                <p className="font-semibold text-lg">{sessionData.planName}</p>
              </div>

              <div className="bg-green-50 p-4 border border-green-200 rounded-lg">
                <p className="mb-1 text-green-700 text-sm">Credits Added</p>
                <p className="font-bold text-green-600 text-2xl">
                  +{creditsAdded} Credits
                </p>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3">
            <Button asChild className="w-full">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
