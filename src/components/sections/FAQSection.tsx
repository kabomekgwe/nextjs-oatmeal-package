"use client";

import * as React from "react";
import { Container, Heading, Text } from "@/components/ui";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  headline?: string;
  faqs?: FAQ[];
  className?: string;
}

const defaultFAQs: FAQ[] = [
  {
    question: "What's included in the free plan?",
    answer:
      "The free Starter plan includes up to 3 projects, basic components, community support, and basic analytics. It's perfect for trying out Oatmeal and building personal projects.",
  },
  {
    question: "Can I upgrade or downgrade my plan?",
    answer:
      "Yes! You can upgrade or downgrade your plan at any time. When you upgrade, you'll be charged the prorated difference. When you downgrade, you'll receive credit toward future billing.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "Yes, we offer a 30-day money-back guarantee for all paid plans. If you're not satisfied with Oatmeal for any reason, contact our support team for a full refund.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual Enterprise plans.",
  },
  {
    question: "Is there a discount for annual billing?",
    answer:
      "Yes! You can save 20% by choosing annual billing instead of monthly. This discount is automatically applied when you select the annual option.",
  },
];

export function FAQSection({
  headline = "Frequently asked questions",
  faqs = defaultFAQs,
  className,
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={cn("py-20 sm:py-24 bg-[#fafaf9]", className)}>
      <Container>
        <div className="max-w-3xl mx-auto">
          <Heading as="h2" size="lg" className="text-center mb-12">
            {headline}
          </Heading>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-[#e7e5e4] overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-[#fafaf9] transition-colors"
                  aria-expanded={openIndex === index}
                >
                  <span className="font-semibold text-[#1c1917] pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 text-[#78716c] flex-shrink-0 transition-transform duration-200",
                      openIndex === index && "rotate-180"
                    )}
                  />
                </button>

                <div
                  className={cn(
                    "grid transition-all duration-200",
                    openIndex === index
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 pt-0">
                      <Text color="muted">{faq.answer}</Text>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
