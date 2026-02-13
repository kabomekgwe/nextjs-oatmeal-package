import { Container, Heading, Lead, Text } from "@/components/ui";
import { getHomepageContent } from "@/lib/wordpress/service";

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

// Force dynamic rendering if WordPress is not available during build
export const dynamicParams = true;

export default async function Home() {
  // Fetch the Homepage from WordPress - this will throw if WordPress is not available
  const content = await getHomepageContent();
  const fields = content?.fields;

  // If no WordPress content, show error
  if (!fields) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafaf9]">
        <div className="text-center p-8">
          <Heading as="h1" size="lg" className="text-red-600 mb-4">
            WordPress Connection Error
          </Heading>
          <Text color="muted">
            Unable to load content from WordPress. Please ensure WordPress is running and configured correctly.
          </Text>
        </div>
      </div>
    );
  }

  // Get CTA link from ACF connection
  const ctaUrl = fields.heroCtaLink?.nodes?.[0]?.uri || "/contact";

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
            {fields.heroShowBadge && (
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
              {fields.heroHeadline}
            </Heading>

            {/* Subheadline from WordPress ACF */}
            <Lead size="base" className="mb-10 max-w-2xl mx-auto">
              {fields.heroSubheadline}
            </Lead>

            {/* CTA Button */}
            <a
              href={ctaUrl}
              className="inline-flex items-center justify-center rounded-lg bg-[#84cc16] px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-[#65a30d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#84cc16] transition-colors"
            >
              {fields.heroCtaText}
            </a>

            {/* Status indicator */}
            <div className="mt-8 p-4 bg-white rounded-lg border border-[#e7e5e4] inline-block">
              <Text size="sm" color="muted">
                <span className="text-[#84cc16] font-semibold">✓ Connected to WordPress</span>
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
              {fields.featuresEyebrow}
            </Text>
            <Heading as="h2" size="lg" className="mb-4">
              {fields.featuresHeadline}
            </Heading>
            <Text size="lg" color="muted">
              {fields.featuresDescription}
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Features are hardcoded for now - they should come from WordPress ACF repeater field */}
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
            ].map((feature, idx) => (
              <div key={feature.title} className="p-6 rounded-2xl border border-[#e7e5e4] bg-[#fafaf9]">
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
