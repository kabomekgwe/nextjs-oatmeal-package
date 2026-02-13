import Link from "next/link";
import { Container, Heading, Lead, Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { ArrowRight, Sparkles } from "lucide-react";

interface CTASectionProps {
  headline?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  showSecondaryCta?: boolean;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  className?: string;
}

export function CTASection({
  headline = "Ready to get started?",
  description = "Join thousands of developers building with Oatmeal today. Get started in minutes with our comprehensive documentation and examples.",
  buttonText = "Start Building Now",
  buttonLink = "/contact",
  showSecondaryCta = true,
  secondaryCtaText = "View Documentation",
  secondaryCtaLink = "#",
  className,
}: CTASectionProps) {
  return (
    <section className={cn("relative py-20 sm:py-24 overflow-hidden", className)}>
      {/* Background */}
      <div className="absolute inset-0 bg-[#84cc16]" />
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      </div>

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm mb-8">
            <Sparkles className="w-8 h-8 text-white" />
          </div>

          {/* Content */}
          <Heading as="h2" size="lg" className="mb-4 text-[#1c1917]">
            {headline}
          </Heading>
          <Lead size="sm" className="mb-8 text-[#1c1917]/80 max-w-2xl mx-auto">
            {description}
          </Lead>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={buttonLink}>
              <Button
                size="lg"
                className="bg-[#1c1917] text-white hover:bg-[#292524] border-none"
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                {buttonText}
              </Button>
            </Link>

            {showSecondaryCta && (
              <Link href={secondaryCtaLink}>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[#1c1917]/30 text-[#1c1917] hover:bg-[#1c1917]/10"
                >
                  {secondaryCtaText}
                </Button>
              </Link>
            )}
          </div>

          {/* Trust Text */}
          <p className="mt-8 text-sm text-[#1c1917]/60">
            No credit card required. Free forever for open source projects.
          </p>
        </div>
      </Container>
    </section>
  );
}
