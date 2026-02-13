"use client";

import * as React from "react";
import { Container, Heading, Lead, Text, Button } from "@/components/ui";
import { Mail, MapPin, Phone, Send } from "lucide-react";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-[#fafaf9]">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <Heading as="h1" size="xl" className="mb-6">
              Get in touch
            </Heading>
            <Lead size="base" color="muted">
              Have a question or want to work together? We&apos;d love to hear
              from you.
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
                Contact information
              </Heading>
              <Text color="muted" className="mb-8">
                Fill out the form and our team will get back to you within 24
                hours.
              </Text>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#ecfccb] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#65a30d]" />
                  </div>
                  <div>
                    <Text weight="semibold" className="mb-1">
                      Email
                    </Text>
                    <a
                      href="mailto:hello@oatmeal.com"
                      className="text-[#84cc16] hover:text-[#65a30d] transition-colors"
                    >
                      hello@oatmeal.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#ecfccb] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#65a30d]" />
                  </div>
                  <div>
                    <Text weight="semibold" className="mb-1">
                      Phone
                    </Text>
                    <a
                      href="tel:+1234567890"
                      className="text-[#84cc16] hover:text-[#65a30d] transition-colors"
                    >
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#ecfccb] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#65a30d]" />
                  </div>
                  <div>
                    <Text weight="semibold" className="mb-1">
                      Office
                    </Text>
                    <Text color="muted">
                      123 Innovation Drive
                      <br />
                      San Francisco, CA 94105
                    </Text>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-[#fafaf9] p-8 rounded-2xl border border-[#e7e5e4]">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-[#ecfccb] flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-[#65a30d]" />
                  </div>
                  <Heading as="h3" size="sm" className="mb-2">
                    Message sent!
                  </Heading>
                  <Text color="muted">
                    Thank you for reaching out. We&apos;ll get back to you soon.
                  </Text>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-[#1c1917] mb-2"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-[#e7e5e4] bg-white text-[#1c1917] placeholder:text-[#a8a29e] focus:outline-none focus:ring-2 focus:ring-[#84cc16] focus:border-transparent transition-all"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-[#1c1917] mb-2"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-[#e7e5e4] bg-white text-[#1c1917] placeholder:text-[#a8a29e] focus:outline-none focus:ring-2 focus:ring-[#84cc16] focus:border-transparent transition-all"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-[#1c1917] mb-2"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-[#e7e5e4] bg-white text-[#1c1917] placeholder:text-[#a8a29e] focus:outline-none focus:ring-2 focus:ring-[#84cc16] focus:border-transparent transition-all"
                      placeholder="How can we help?"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-[#1c1917] mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-[#e7e5e4] bg-white text-[#1c1917] placeholder:text-[#a8a29e] focus:outline-none focus:ring-2 focus:ring-[#84cc16] focus:border-transparent transition-all resize-none"
                      placeholder="Tell us more about your project..."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    isLoading={isSubmitting}
                  >
                    Send message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
