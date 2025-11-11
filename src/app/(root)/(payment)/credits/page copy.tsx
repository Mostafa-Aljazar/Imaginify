"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, Zap } from "lucide-react";
import { cn } from "@/lib/cn";
import { toast } from "sonner";
import { Product } from "@/types";
import Image from "next/image";
import { LOGO } from "@/assets/common";

const plans: Product[] = [
  {
    id: "free",
    name: "Free",
    description: "20 Free Credits",
    price: 0,
    credits: 20,
    quantity: 1,
    imageUrl: "",
  },
  {
    id: "pro",
    name: "Pro Package",
    description: "120 Credits",
    price: 40,
    credits: 120,
    quantity: 1,
    imageUrl: "",
  },
  {
    id: "premium",
    name: "Premium Package",
    description: "2000 Credits",
    price: 199,
    credits: 2000,
    quantity: 1,
    imageUrl: "",
  },
];

export default function PricingSection() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handlePurchase = async (product: Product) => {
    if (product.price === 0) {
      toast.info("This is your current free plan");
      return;
    }

    setLoadingPlan(product.id);
    try {
      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item: product }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create checkout session");
      }

      const { url } = await response.json();

      // Use window.location.href instead of redirectToCheckout
      if (url) {
        window.location.href = url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (err: any) {
      toast.error(err.message);
      setLoadingPlan(null);
    }
    // Note: Don't set loadingPlan to null here as the page will redirect
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
              <Image
                src={LOGO}
                alt={`${plan.name} image`}
                width={100}
                height={100}
                className="rounded-t-lg object-cover"
              />
              <div className="flex justify-center items-center bg-primary/10 mt-4 mb-3 rounded-full w-12 h-12">
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
                    included: plan.name.includes("Premium"),
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
                disabled={plan.price === 0 || loadingPlan === plan.id}
                onClick={() => handlePurchase(plan)}
                className={cn(
                  "bg-primary hover:bg-primary/90 mt-4 rounded-xl w-full font-semibold text-white",
                  plan.price === 0 &&
                    "text-primary bg-transparent hover:bg-gray-300 cursor-not-allowed"
                )}
              >
                {loadingPlan === plan.id
                  ? "Processing..."
                  : plan.price === 0
                  ? "Current Plan"
                  : "Buy Credits"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
