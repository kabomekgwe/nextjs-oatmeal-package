import { Container, Heading, Lead, Text } from "@/components/ui";
import { Stats } from "@/components/sections/Stats";
import { Team } from "@/components/sections/Team";
import { getAboutPageContent } from "@/lib/wordpress/service";
import type { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getAboutPageContent();
  return {
    title: content?.page?.title || "About",
    description: content?.fields?.heroDescription || "Learn about our mission.",
  };
}

export default async function AboutPage() {
  const content = await getAboutPageContent();
  const fields = content?.fields;

  if (!fields) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafaf9]">
        <div className="text-center p-8">
          <Heading as="h1" size="lg" className="text-red-600 mb-4">
            WordPress Connection Error
          </Heading>
          <p className="text-[#78716c]">
            Unable to load about content from WordPress.
          </p>
        </div>
      </div>
    );
  }

  // Transform stats
  const stats = fields.stats?.map((stat: any) => ({
    number: stat.number,
    label: stat.label,
  })) || [];

  // Transform team members
  const teamMembers = fields.teamMembers?.map((member: any) => ({
    name: member.name,
    role: member.role,
    bio: member.bio,
    photo: member.photo?.node?.sourceUrl,
    socialLinks: member.socialLinks?.map((link: any) => ({
      platform: link.platform,
      url: link.url,
    })) || [],
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

      {stats.length > 0 && <Stats stats={stats} />}

      {/* Story Section */}
      {fields.storyItems && fields.storyItems.length > 0 && (
        <section className="py-20 sm:py-24 bg-white">
          <Container>
            <div className="max-w-3xl mx-auto">
              <Heading as="h2" size="lg" className="text-center mb-12">
                {fields.storyHeadline}
              </Heading>

              <div className="space-y-8">
                {fields.storyItems.map((item: any, index: number) => (
                  <div key={index} className="flex gap-8">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-2xl bg-[#84cc16] flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">
                          {item.number}
                        </span>
                      </div>
                    </div>
                    <div>
                      <Heading as="h3" size="sm" className="mb-2">
                        {item.title}
                      </Heading>
                      <Text color="muted">{item.description}</Text>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {teamMembers.length > 0 && (
        <Team
          headline={fields.teamHeadline}
          description={fields.teamDescription}
          members={teamMembers}
        />
      )}
    </>
  );
}
