import { Container, Heading, Lead, Text } from "@/components/ui";
import { getHomepageContent } from "@/lib/wordpress/service";

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

export default async function Home() {
  // Fetch the Homepage from WordPress with ACF fields
  let content = null;
  let fields = null;
  
  try {
    content = await getHomepageContent();
    fields = content?.fields;
  } catch (error) {
    console.log("WordPress not configured, using default content");
  }

  // Get CTA link from ACF connection
  const ctaUrl = fields?.heroCtaLink?.nodes?.[0]?.uri || "/contact";

  return (
    <>
      {/* Hero section with WordPress ACF fields */}
      <section className="relative overflow-hidden bg-[#fafaf9] py-20 sm:py-32 lg:pb-32 xl:pb-36">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-[#84cc16]/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] bg-[#84cc16]/5 rounded-full blur-3xl" />
        </div>

        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            {/* Badge */}
            {(fields?.heroShowBadge !== false) && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ecfccb] text-[#3f6212] text-sm font-medium mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#84cc16] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#84cc16]" />
                </span>
                Now with Next.js 16 & Tailwind CSS 4
              </div>
            )}

            {/* Headline from WordPress ACF */}
            <Heading as="h1" size="xl" className="mb-6">
              {fields?.heroHeadline ? (
                <span>{fields.heroHeadline}</span>
              ) : (
                <>
                  Build beautiful marketing sites with{" "}
                  <span className="text-[#84cc16]">Oatmeal</span>
                </>
              )}
            </Heading>

            {/* Subheadline from WordPress ACF */}
            <Lead size="base" className="mb-10 max-w-2xl mx-auto">
              {fields?.heroSubheadline || 
                "A modern, multi-theme SaaS marketing template built with Next.js, Tailwind CSS, and Headless WordPress."}
            </Lead>

            {/* CTA Button */}
            <a
              href={ctaUrl}
              className="inline-flex items-center justify-center rounded-lg bg-[#84cc16] px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-[#65a30d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#84cc16] transition-colors"
            >
              {fields?.heroCtaText || "Get Started"}
            </a>

            {/* Status indicator */}
            <div className="mt-8 p-4 bg-white rounded-lg border border-[#e7e5e4] inline-block">
              <Text size="sm" color="muted">
                {fields ? (
                  <span className="text-[#84cc16] font-semibold">✓ Connected to WordPress</span>
                ) : (
                  <span>Using default content (WordPress not connected)</span>
                )}
              </Text>
            </div>
          </div>
        </Container>
      </section>

      {/* Features section with ACF fields */}
      <section className="py-20 sm:py-24 bg-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-16">
            <Text size="sm" weight="semibold" color="primary" className="uppercase tracking-wider mb-4">
              {fields?.featuresEyebrow || "Features"}
            </Text>
            <Heading as="h2" size="lg" className="mb-4">
              {fields?.featuresHeadline || "Everything you need to launch"}
            </Heading>
            <Text size="lg" color="muted">
              {fields?.featuresDescription || 
                "Packed with features to help you build and scale your marketing site."}
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Modern Stack",
                description: "Built with Next.js 16, React 19, and Tailwind CSS 4 for the best developer experience.",
              },
              {
                title: "Headless WordPress",
                description: "Manage all your content in WordPress with a powerful GraphQL API for flexible frontends.",
              },
              {
                title: "Lightning Fast",
                description: "Optimized for performance with static generation, image optimization, and edge caching.",
              },
            ].map((feature, index) => (
              <div key={index} className="p-6 rounded-2xl border border-[#e7e5e4] bg-[#fafaf9]">
                <Heading as="h3" size="xs" className="mb-2">
                  {feature.title}
                </Heading>
                <Text color="muted">{feature.description}</Text>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
