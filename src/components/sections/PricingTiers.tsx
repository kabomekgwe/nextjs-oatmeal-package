"use client";

import * as React from "react";
import { Container, Heading, Text, Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface PricingTier {
  name: string;
  price: string;
  period: string;
  description?: string;
  highlighted?: boolean;
  features: string[];
  buttonText: string;
  buttonLink: string;
}

interface PricingTiersProps {
  tiers: PricingTier[];
  className?: string;
}

export function PricingTiers({
  tiers,
  className,
}: PricingTiersProps) {
  if (!tiers || tiers.length === 0) {
    return null;
  }
  const [isAnnual, setIsAnnual] = React.useState(false);

  return (
    <section className={cn("py-20 sm:py-24 bg-white", className)}>
      <Container>
        {/* Toggle */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <span
            className={cn(
              "text-sm font-medium transition-colors",
              !isAnnual ? "text-[#1c1917]" : "text-[#78716c]"
            )}
          >
            Monthly
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="relative w-14 h-7 rounded-full bg-[#e7e5e4] transition-colors"
            aria-label="Toggle annual billing"
          >
            <span
              className={cn(
                "absolute top-1 left-1 w-5 h-5 rounded-full bg-[#84cc16] transition-transform duration-200",
                isAnnual && "translate-x-7"
              )}
            />
          </button>
          <span
            className={cn(
              "text-sm font-medium transition-colors",
              isAnnual ? "text-[#1c1917]" : "text-[#78716c]"
            )}
          >
            Annual
            <span className="ml-1.5 text-xs text-[#84cc16]">Save 20%</span>
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={cn(
                "relative p-8 rounded-2xl border transition-all duration-200",
                tier.highlighted
                  ? "border-[#84cc16] bg-[#fafaf9] shadow-lg scale-105 z-10"
                  : "border-[#e7e5e4] bg-white hover:shadow-md"
              )}
            >
              {/* Popular Badge */}
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 rounded-full bg-[#84cc16] text-[#1c1917] text-xs font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Tier Info */}
              <div className="text-center mb-8">
                <Heading as="h3" size="sm" className="mb-2">
                  {tier.name}
                </Heading>
                {tier.description && (
                  <Text size="sm" color="muted" className="mb-4">
                    {tier.description}
                  </Text>
                )}
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-[#1c1917]">
                    {isAnnual
                      ? tier.price.replace(
                          "$",
                          "$"
                        )
                      : tier.price}
                  </span>
                  <span className="text-[#78716c]">/{isAnnual ? "year" : "mo"}</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <div
                      className={cn(
                        "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center",
                        tier.highlighted
                          ? "bg-[#84cc16]"
                          : "bg-[#ecfccb]"
                      )}
                    >
                      <Check
                        className={cn(
                          "w-3 h-3",
                          tier.highlighted ? "text-white" : "text-[#65a30d]"
                        )}
                      />
                    </div>
                    <Text size="sm">{feature}</Text>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <a href={tier.buttonLink} className="block">
                <Button
                  variant={tier.highlighted ? "primary" : "outline"}
                  className="w-full"
                >
                  {tier.buttonText}
                </Button>
              </a>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
