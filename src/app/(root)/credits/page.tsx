"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Free",
    price: "$0",
    credits: "20 Credits",
    features: [
      { label: "20 Free Credits", included: true },
      { label: "Basic Access to Services", included: true },
      { label: "Priority Customer Support", included: false },
      { label: "Priority Updates", included: false },
    ],
    button: "Free Consumable",
  },
  {
    name: "Pro Package",
    price: "$40",
    credits: "120 Credits",
    features: [
      { label: "120 Credits", included: true },
      { label: "Full Access to Services", included: true },
      { label: "Priority Customer Support", included: true },
      { label: "Priority Updates", included: false },
    ],
    button: "Buy Credit",
  },
  {
    name: "Premium Package",
    price: "$199",
    credits: "2000 Credits",
    features: [
      { label: "2000 Credits", included: true },
      { label: "Full Access to Services", included: true },
      { label: "Priority Customer Support", included: true },
      { label: "Priority Updates", included: true },
    ],
    button: "Buy Credit",
  },
];

export default function PricingSection() {
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
              <p className="mt-2 font-bold text-3xl">{plan.price}</p>
              <p className="text-muted-foreground">{plan.credits}</p>
            </CardHeader>

            <CardContent className="flex flex-col gap-3">
              <ul className="space-y-2">
                {plan.features.map((f, i) => (
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
                variant={plan.name === "Free" ? "outline" : "default"}
                className={cn(
                  "bg-primary hover:bg-primary/90 mt-4 rounded-xl w-full font-semibold text-white",
                  plan.name === "Free" &&
                    "text-primary bg-transparent hover:bg-gray-300 cursor-not-allowed"
                )}
              >
                {plan.button}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
