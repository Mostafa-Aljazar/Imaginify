"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface PaymentDetails {
  status: string;
  amount: number;
  currency: string;
  planName: string | null;
}

export default function SuccessPage() {
  const searchParams = useSearchParams();
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
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (!sessionId || !details || details.status !== "paid") {
    return (
      <div className="flex justify-center items-center h-screen">
        Invalid or failed payment.
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center bg-gray-100 min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Thank you for your purchase.</p>
          <p>Plan: {details.planName}</p>
          <p>
            Amount: ${details.amount} {details.currency?.toUpperCase()}
          </p>
          <p>Your credits have been added.</p>
        </CardContent>
      </Card>
    </div>
  );
}
