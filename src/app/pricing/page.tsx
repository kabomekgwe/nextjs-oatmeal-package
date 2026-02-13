import { Container, Heading, Lead } from "@/components/ui";
import { PricingTiers } from "@/components/sections/PricingTiers";
import { FAQSection } from "@/components/sections/FAQSection";
import { getPricingPageContent } from "@/lib/wordpress/service";
import type { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPricingPageContent();
  return {
    title: content?.page?.title || "Pricing",
    description: content?.fields?.heroDescription || "Choose the perfect plan for your needs.",
  };
}

export default async function PricingPage() {
  const content = await getPricingPageContent();
  const fields = content?.fields;

  if (!fields) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafaf9]">
        <div className="text-center p-8">
          <Heading as="h1" size="lg" className="text-red-600 mb-4">
            WordPress Connection Error
          </Heading>
          <p className="text-[#78716c]">
            Unable to load pricing content from WordPress.
          </p>
        </div>
      </div>
    );
  }

  // Transform pricing tiers for the component
  const tiers = fields.pricingTiers?.map((tier: any) => ({
    name: tier.name,
    price: tier.price,
    period: tier.period,
    description: tier.description,
    highlighted: tier.highlighted,
    features: tier.features || [],
    buttonText: tier.buttonText,
    buttonLink: tier.buttonLink?.nodes?.[0]?.uri || "/contact",
  })) || [];

  // Transform FAQs
  const faqs = fields.faqs?.map((faq: any) => ({
    question: faq.question,
    answer: faq.answer,
  })) || [];

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-[#fafaf9]">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <Heading as="h1" size="xl" className="mb-6">
              {fields.heroHeadline}
            </Heading>
            <Lead size="base" color="muted">
              {fields.heroDescription}
            </Lead>
          </div>
        </Container>
      </section>

      <PricingTiers tiers={tiers} />
      
      {faqs.length > 0 && (
        <FAQSection headline={fields.faqHeadline} faqs={faqs} />
      )}
    </>
  );
}
