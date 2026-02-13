import { Container, Heading, Lead, Text } from "@/components/ui";
import { Stats } from "@/components/sections/Stats";
import { Team } from "@/components/sections/Team";
import { CTASection } from "@/components/sections/CTASection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about our mission to help developers build beautiful marketing sites with Next.js and WordPress.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-[#fafaf9]">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <Heading as="h1" size="xl" className="mb-6">
              Building the future of marketing sites
            </Heading>
            <Lead size="base" color="muted">
              We believe that creating beautiful, performant marketing sites
              should be easy for everyone. Our mission is to empower developers
              and content creators with the best tools possible.
            </Lead>
          </div>
        </Container>
      </section>

      <Stats />

      {/* Story Section */}
      <section className="py-20 sm:py-24 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            <Heading as="h2" size="lg" className="text-center mb-12">
              Our story
            </Heading>

            <div className="space-y-8">
              <div className="flex gap-8">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-[#84cc16] flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">1</span>
                  </div>
                </div>
                <div>
                  <Heading as="h3" size="sm" className="mb-2">
                    The beginning
                  </Heading>
                  <Text color="muted">
                    Oatmeal started in 2024 when our founders realized there was
                    a gap between powerful headless CMS solutions and beautiful,
                    easy-to-use templates. We wanted to bridge that gap.
                  </Text>
                </div>
              </div>

              <div className="flex gap-8">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-[#84cc16] flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">2</span>
                  </div>
                </div>
                <div>
                  <Heading as="h3" size="sm" className="mb-2">
                    The evolution
                  </Heading>
                  <Text color="muted">
                    What started as a simple template grew into a comprehensive
                    marketing site solution. We listened to our users and kept
                    improving, adding features like GraphQL integration, preview
                    mode, and multi-theme support.
                  </Text>
                </div>
              </div>

              <div className="flex gap-8">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-[#84cc16] flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">3</span>
                  </div>
                </div>
                <div>
                  <Heading as="h3" size="sm" className="mb-2">
                    Today and beyond
                  </Heading>
                  <Text color="muted">
                    Today, Oatmeal powers thousands of marketing sites worldwide.
                    We&apos;re constantly innovating, with plans for AI-powered
                    content suggestions, advanced analytics, and more.
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Team />
      <CTASection />
    </>
  );
}
