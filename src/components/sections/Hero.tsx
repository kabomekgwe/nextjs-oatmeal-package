import Link from "next/link";
import { Container, Heading, Lead, Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { ArrowRight, Play } from "lucide-react";

interface HeroProps {
  headline?: string;
  subheadline?: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  backgroundImage?: string;
  showVideoButton?: boolean;
  showBadge?: boolean;
  className?: string;
}

export function Hero({
  headline = "Build beautiful marketing sites with Oatmeal",
  subheadline = "A modern, multi-theme SaaS marketing template built with Next.js, Tailwind CSS, and Headless WordPress. Edit all your content from WordPress and see it instantly reflected on your site.",
  ctaText = "Get Started",
  ctaLink = "/contact",
  secondaryCtaText = "Learn More",
  secondaryCtaLink = "/features",
  backgroundImage,
  showVideoButton = false,
  showBadge = true,
  className,
}: HeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-[#fafaf9] py-20 sm:py-32 lg:pb-32 xl:pb-36",
        className
      )}
    >
      {/* Background Pattern */}
      {backgroundImage ? (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      ) : (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-[#84cc16]/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] bg-[#84cc16]/5 rounded-full blur-3xl" />
        </div>
      )}

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          {showBadge && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ecfccb] text-[#3f6212] text-sm font-medium mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#84cc16] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#84cc16]" />
              </span>
              Now with Next.js 16 & Tailwind CSS 4
            </div>
          )}

          {/* Headline */}
          <Heading as="h1" size="xl" className="mb-6">
            {headline?.includes("Oatmeal") ? (
              <>
                {headline.split("Oatmeal")[0]}
                <span className="text-[#84cc16]">Oatmeal</span>
                {headline.split("Oatmeal")[1]}
              </>
            ) : (
              headline
            )}
          </Heading>

          {/* Subheadline */}
          <Lead size="base" className="mb-10 max-w-2xl mx-auto">
            {subheadline}
          </Lead>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={ctaLink || "/contact"}>
              <Button size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                {ctaText}
              </Button>
            </Link>

            {showVideoButton ? (
              <Button variant="outline" size="lg" leftIcon={<Play className="w-5 h-5" />}>
                Watch Demo
              </Button>
            ) : (
              <Link href={secondaryCtaLink || "/features"}>
                <Button variant="outline" size="lg">
                  {secondaryCtaText}
                </Button>
              </Link>
            )}
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-[#e7e5e4]">
            <p className="text-sm text-[#78716c] mb-4">Trusted by teams at</p>
            <div className="flex items-center justify-center gap-8 opacity-50 grayscale">
              {["Vercel", "Stripe", "Notion", "Linear"].map((company) => (
                <span
                  key={company}
                  className="text-lg font-semibold text-[#57534e]"
                >
                  {company}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
