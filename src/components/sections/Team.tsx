import { Container, Heading, Text } from "@/components/ui";
import { cn } from "@/lib/utils";
import { Twitter, Linkedin, Github } from "lucide-react";

interface SocialLink {
  platform: string;
  url: string;
}

interface TeamMember {
  name: string;
  role: string;
  bio?: string;
  photo?: string;
  socialLinks?: SocialLink[];
}

interface TeamProps {
  headline?: string;
  description?: string;
  members?: TeamMember[];
  className?: string;
}

const defaultMembers: TeamMember[] = [
  {
    name: "Sarah Chen",
    role: "CEO & Founder",
    bio: "Former tech lead at Vercel, passionate about developer experience.",
    socialLinks: [
      { platform: "twitter", url: "#" },
      { platform: "linkedin", url: "#" },
    ],
  },
  {
    name: "Marcus Johnson",
    role: "CTO",
    bio: "Open source enthusiast and expert in headless CMS architectures.",
    socialLinks: [
      { platform: "twitter", url: "#" },
      { platform: "github", url: "#" },
    ],
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Design",
    bio: "Award-winning designer focused on accessible, beautiful interfaces.",
    socialLinks: [
      { platform: "twitter", url: "#" },
      { platform: "linkedin", url: "#" },
    ],
  },
  {
    name: "David Kim",
    role: "Lead Developer",
    bio: "Full-stack engineer with a passion for performance optimization.",
    socialLinks: [
      { platform: "github", url: "#" },
      { platform: "linkedin", url: "#" },
    ],
  },
];

const getSocialIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case "twitter":
      return <Twitter className="w-4 h-4" />;
    case "linkedin":
      return <Linkedin className="w-4 h-4" />;
    case "github":
      return <Github className="w-4 h-4" />;
    default:
      return null;
  }
};

export function Team({
  headline = "Meet the team",
  description = "The people behind Oatmeal who are passionate about building the best marketing site experience.",
  members = defaultMembers,
  className,
}: TeamProps) {
  return (
    <section className={cn("py-20 sm:py-24 bg-white", className)}>
      <Container>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Heading as="h2" size="lg" className="mb-4">
            {headline}
          </Heading>
          {description && (
            <Text size="lg" color="muted">
              {description}
            </Text>
          )}
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((member, index) => (
            <div key={index} className="text-center">
              {/* Photo */}
              <div className="mb-4">
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-32 h-32 rounded-full object-cover mx-auto"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-[#ecfccb] flex items-center justify-center mx-auto">
                    <span className="text-3xl font-bold text-[#65a30d]">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <Heading as="h3" size="xs" className="mb-1">
                {member.name}
              </Heading>
              <Text color="primary" className="font-medium text-sm mb-2">
                {member.role}
              </Text>
              {member.bio && (
                <Text size="sm" color="muted" className="mb-4">
                  {member.bio}
                </Text>
              )}

              {/* Social Links */}
              {member.socialLinks && member.socialLinks.length > 0 && (
                <div className="flex items-center justify-center gap-3">
                  {member.socialLinks.map((link, linkIndex) => (
                    <a
                      key={linkIndex}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#78716c] hover:text-[#84cc16] transition-colors"
                      aria-label={`${member.name} on ${link.platform}`}
                    >
                      {getSocialIcon(link.platform)}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
