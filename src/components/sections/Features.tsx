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
  headline?: string;
  description?: string;
  features?: Feature[];
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

const defaultFeatures: Feature[] = [
  {
    icon: "code",
    title: "Modern Stack",
    description:
      "Built with Next.js 16, React 19, and Tailwind CSS 4 for the best developer experience.",
  },
  {
    icon: "globe",
    title: "Headless WordPress",
    description:
      "Manage all your content in WordPress with a powerful GraphQL API for flexible frontends.",
  },
  {
    icon: "zap",
    title: "Lightning Fast",
    description:
      "Optimized for performance with static generation, image optimization, and edge caching.",
  },
  {
    icon: "smartphone",
    title: "Fully Responsive",
    description:
      "Looks great on any device with mobile-first design and smooth animations.",
  },
  {
    icon: "shield",
    title: "Secure by Default",
    description:
      "JWT authentication, secure headers, and type-safe code for peace of mind.",
  },
  {
    icon: "bar-chart",
    title: "SEO Optimized",
    description:
      "Built-in SEO features including meta tags, sitemaps, and structured data.",
  },
];

export function Features({
  eyebrow = "Features",
  headline = "Everything you need to launch",
  description = "Packed with features to help you build and scale your marketing site faster than ever before.",
  features = defaultFeatures,
  className,
}: FeaturesProps) {
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
