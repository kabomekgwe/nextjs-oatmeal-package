import { Button, Container, Heading, Text, Lead } from "@/components/ui";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#fafaf9] py-20 sm:py-32 lg:pb-32 xl:pb-36">
        <Container className="relative">
          <div className="mx-auto max-w-2xl text-center">
            <Heading as="h1" size="xl" className="mb-6">
              Build beautiful marketing sites with{" "}
              <span className="text-[#84cc16]">Oatmeal</span>
            </Heading>
            <Lead size="base" className="mb-8">
              A modern, multi-theme SaaS marketing template built with Next.js,
              Tailwind CSS, and Headless WordPress. Edit all your content from
              WordPress and see it instantly reflected on your site.
            </Lead>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" rightIcon={<span>→</span>}>
                Get Started
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Features Preview */}
      <section className="py-20 sm:py-24 bg-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-16">
            <Heading as="h2" size="lg" className="mb-4">
              Everything you need to launch
            </Heading>
            <Text size="lg" color="muted">
              Packed with features to help you build and scale your marketing site.
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Headless WordPress",
                description:
                  "Manage all your content in WordPress with a powerful GraphQL API.",
              },
              {
                title: "Tailwind CSS 4",
                description:
                  "Built with the latest Tailwind CSS featuring CSS-first configuration.",
              },
              {
                title: "Next.js 16",
                description:
                  "Leverage the power of React 19 with App Router and Server Components.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl border border-[#e7e5e4] bg-[#fafaf9] hover:shadow-lg transition-shadow"
              >
                <Heading as="h3" size="sm" className="mb-3">
                  {feature.title}
                </Heading>
                <Text color="muted">{feature.description}</Text>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-24 bg-[#84cc16]">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Heading
              as="h2"
              size="lg"
              className="mb-4 text-[#1c1917]"
            >
              Ready to get started?
            </Heading>
            <Lead size="sm" className="mb-8 text-[#1c1917]/80">
              Join thousands of developers building with Oatmeal today.
            </Lead>
            <Button
              variant="secondary"
              size="lg"
              className="bg-[#1c1917] text-white hover:bg-[#292524] border-none"
            >
              Start Building Now
            </Button>
          </div>
        </Container>
      </section>
    </main>
  );
}
