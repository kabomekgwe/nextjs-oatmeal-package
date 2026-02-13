import { Container, Heading, Lead, Text } from "@/components/ui";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { ContactForm } from "./ContactForm";

interface ContactPageClientProps {
  headline?: string;
  description?: string;
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  formTitle?: string;
  formDescription?: string;
  successMessage?: string;
}

export function ContactPageClient({
  headline = "Get in touch",
  description = "Have a question or want to work together? We'd love to hear from you.",
  contactInfo,
  formTitle = "Contact information",
  formDescription = "Fill out the form and our team will get back to you within 24 hours.",
  successMessage = "Thank you for reaching out. We'll get back to you soon.",
}: ContactPageClientProps) {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-[#fafaf9]">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <Heading as="h1" size="xl" className="mb-6">
              {headline}
            </Heading>
            <Lead size="base" color="muted">
              {description}
            </Lead>
          </div>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <Heading as="h2" size="sm" className="mb-6">
                {formTitle}
              </Heading>
              <Text color="muted" className="mb-8">
                {formDescription}
              </Text>

              <div className="space-y-6">
                {contactInfo?.email && (
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#ecfccb] flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-[#65a30d]" />
                    </div>
                    <div>
                      <Text weight="semibold" className="mb-1">
                        Email
                      </Text>
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="text-[#84cc16] hover:text-[#65a30d] transition-colors"
                      >
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>
                )}

                {contactInfo?.phone && (
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#ecfccb] flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-[#65a30d]" />
                    </div>
                    <div>
                      <Text weight="semibold" className="mb-1">
                        Phone
                      </Text>
                      <a
                        href={`tel:${contactInfo.phone.replace(/\D/g, "")}`}
                        className="text-[#84cc16] hover:text-[#65a30d] transition-colors"
                      >
                        {contactInfo.phone}
                      </a>
                    </div>
                  </div>
                )}

                {contactInfo?.address && (
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#ecfccb] flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-[#65a30d]" />
                    </div>
                    <div>
                      <Text weight="semibold" className="mb-1">
                        Office
                      </Text>
                      <Text color="muted" className="whitespace-pre-line">
                        {contactInfo.address}
                      </Text>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Form */}
            <ContactForm successMessage={successMessage} />
          </div>
        </Container>
      </section>
    </>
  );
}
