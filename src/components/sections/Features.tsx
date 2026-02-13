import { Container, Heading, Text } from "@/components/ui";
import { cn } from "@/lib/utils";
import {
  Zap,
  Shield,
  Globe,
  Code,
  Smartphone,
  Database,
  BarChart3,
  Layers,
  type LucideIcon,
} from "lucide-react";

interface Feature {
  icon: string;
  title: string;
  description: string;
  link?: string;
}

interface FeaturesProps {
  eyebrow?: string;
  headline: string;
  description?: string;
  features: Feature[];
  className?: string;
}

const iconMap: Record<string, LucideIcon> = {
  zap: Zap,
  shield: Shield,
  globe: Globe,
  code: Code,
  smartphone: Smartphone,
  database: Database,
  "bar-chart": BarChart3,
  layers: Layers,
};

export function Features({
  eyebrow,
  headline,
  description,
  features,
  className,
}: FeaturesProps) {
  if (!features || features.length === 0) {
    return null;
  }
  return (
    <section className={cn("py-20 sm:py-24 bg-white", className)}>
      <Container>
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          {eyebrow && (
            <Text
              size="sm"
              weight="semibold"
              color="primary"
              className="uppercase tracking-wider mb-4"
            >
              {eyebrow}
            </Text>
          )}
          <Heading as="h2" size="lg" className="mb-4">
            {headline}
          </Heading>
          {description && (
            <Text size="lg" color="muted">
              {description}
            </Text>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon.toLowerCase()] || Zap;

            return (
              <div
                key={index}
                className="group p-6 rounded-2xl border border-[#e7e5e4] bg-[#fafaf9] hover:shadow-lg hover:border-[#84cc16]/30 transition-all duration-200"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-[#ecfccb] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                  <IconComponent className="w-6 h-6 text-[#65a30d]" />
                </div>

                {/* Content */}
                <Heading as="h3" size="xs" className="mb-2">
                  {feature.title}
                </Heading>
                <Text color="muted">{feature.description}</Text>

                {/* Link */}
                {feature.link && (
                  <a
                    href={feature.link}
                    className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-[#84cc16] hover:text-[#65a30d] transition-colors"
                  >
                    Learn more
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
