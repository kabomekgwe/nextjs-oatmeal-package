import { Container, Heading, Lead } from "@/components/ui";
import { PricingTiers } from "@/components/sections/PricingTiers";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Choose the perfect plan for your needs. From free to enterprise, we have options for every team size.",
};

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-[#fafaf9]">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <Heading as="h1" size="xl" className="mb-6">
              Simple, transparent pricing
            </Heading>
            <Lead size="base" color="muted">
              Choose the perfect plan for your needs. All plans include a 30-day
              free trial with no credit card required.
            </Lead>
          </div>
        </Container>
      </section>

      <PricingTiers />
      <FAQSection />
      <CTASection />
    </>
  );
}
