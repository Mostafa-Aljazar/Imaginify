"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, Zap, Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";
import { useState } from "react";
import { toast } from "sonner";
import { Product } from "@/types";

// Stripe Price IDs (replace with actual IDs from Stripe Dashboard)
const STRIPE_PRICE_IDS = {
  pro: "price_1SJYflEv8q3aoRJA2QOqoGiN", // Replace with your Pro package Price ID
  premium: "price_1SJYbeEv8q3aoRJA9XwJ0jqm", // Replace with your Premium package Price ID
};

// Define plans as products
const plans: Product[] = [
  {
    id: "free",
    name: "Free",
    description: "20 Free Credits",
    price: 0,
    quantity: 1,
  },
  {
    id: STRIPE_PRICE_IDS.pro,
    name: "Pro Package",
    description: "120 Credits",
    price: 40,
    quantity: 1,
  },
  {
    id: STRIPE_PRICE_IDS.premium,
    name: "Premium Package",
    description: "2000 Credits",
    price: 199,
    quantity: 1,
  },
];

export default function PricingSection() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handlePurchase = async (product: Product) => {
    if (product.price === 0) {
      toast.info("This is your current free plan");
      return;
    }

    setLoadingPlan(product.name);

    try {
      // Call API to create checkout session
      const response = await fetch("/api/stripe/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: [product] }),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Redirect to Stripe Checkout using the session URL
      // No longer using stripe.redirectToCheckout() - it's been removed in API 2025-09-30.clover
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast.error(
        error.message || "Failed to start checkout. Please try again."
      );
      setLoadingPlan(null);
    }
  };

  return (
    <section className="flex flex-col gap-6 p-4 md:p-6">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-primary text-3xl md:text-4xl">
          Buy Credits
        </h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Choose a credit package that suits your needs!
        </p>
      </div>

      <div className="gap-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
        {plans.map((plan, idx) => (
          <Card
            key={idx}
            className="flex flex-col justify-between bg-secondary-foreground shadow-lg hover:shadow-2xl border-gray-200 transition-all"
          >
            <CardHeader className="flex flex-col items-center">
              <div className="flex justify-center items-center bg-primary/10 mb-3 rounded-full w-12 h-12">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <CardTitle className="font-semibold text-xl">
                {plan.name}
              </CardTitle>
              <p className="mt-2 font-bold text-3xl">${plan.price}</p>
              <p className="text-muted-foreground">{plan.description}</p>
            </CardHeader>

            <CardContent className="flex flex-col gap-3">
              <ul className="space-y-2">
                {[
                  { label: `${plan.description}`, included: true },
                  {
                    label: "Full Access to Services",
                    included: plan.price > 0,
                  },
                  {
                    label: "Priority Customer Support",
                    included: plan.price > 0,
                  },
                  {
                    label: "Priority Updates",
                    included: plan.name === "Premium Package",
                  },
                ].map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    {f.included ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <X className="w-4 h-4 text-red-400" />
                    )}
                    <span
                      className={
                        f.included
                          ? "text-gray-700"
                          : "text-gray-400 line-through"
                      }
                    >
                      {f.label}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.price === 0 ? "outline" : "default"}
                disabled={plan.price === 0 || loadingPlan === plan.name}
                onClick={() => handlePurchase(plan)}
                className={cn(
                  "bg-primary hover:bg-primary/90 mt-4 rounded-xl w-full font-semibold text-white",
                  plan.price === 0 &&
                    "text-primary bg-transparent hover:bg-gray-300 cursor-not-allowed"
                )}
              >
                {loadingPlan === plan.name ? (
                  <>
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : plan.price === 0 ? (
                  "Current Plan"
                ) : (
                  "Buy Credits"
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
