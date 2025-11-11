"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2, User } from "lucide-react";
import { ROUTES } from "@/constants";

interface PaymentDetails {
  status: string;
  amount: number;
  currency: string;
  planName: string | null;
}

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");
  const [details, setDetails] = useState<PaymentDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }

    const fetchDetails = async () => {
      try {
        const res = await fetch(
          `/api/stripe/verify-session?session_id=${sessionId}`
        );
        if (!res.ok) throw new Error("Failed to verify session");
        const data: PaymentDetails = await res.json();
        setDetails(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center bg-background h-screen">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!sessionId || !details || details.status !== "paid") {
    return (
      <div className="flex justify-center items-center bg-background h-screen text-muted-foreground text-lg">
        Invalid or failed payment.
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center to-muted px-4 min-h-screen">
      <Card className="shadow-xl border border-border rounded-2xl w-full max-w-md overflow-hidden animate-in duration-300 fade-in-50">
        <CardHeader className="flex flex-col items-center gap-3 pt-10 pb-4">
          <div className="bg-green-100 p-3 rounded-full">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <CardTitle className="font-semibold text-2xl text-center">
            Payment Successful
          </CardTitle>
          <p className="text-muted-foreground text-sm text-center">
            Your transaction has been completed successfully.
          </p>
        </CardHeader>

        <CardContent className="space-y-4 px-6 pb-8 text-center">
          <div className="space-y-2 bg-muted p-4 rounded-lg text-sm">
            <p>
              <span className="font-medium text-foreground">Plan:</span>{" "}
              {details.planName}
            </p>
            <p>
              <span className="font-medium text-foreground">Amount:</span> $
              {details.amount} {details.currency?.toUpperCase()}
            </p>
            <p className="text-muted-foreground">
              Your credits have been successfully added.
            </p>
          </div>

          <Button
            onClick={() => router.push(ROUTES.PAGES.PROFILE)}
            className="flex justify-center items-center gap-2 w-full font-medium text-base"
          >
            <User className="w-4 h-4" />
            Go to Profile
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
