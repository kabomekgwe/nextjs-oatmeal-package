"use client";

import * as React from "react";
import { Heading, Text, Button } from "@/components/ui";
import { Send } from "lucide-react";

interface ContactFormProps {
  successMessage?: string;
}

export function ContactForm({ successMessage = "Thank you for reaching out. We'll get back to you soon." }: ContactFormProps) {
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
    <div className="bg-[#fafaf9] p-8 rounded-2xl border border-[#e7e5e4]">
      {isSubmitted ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-[#ecfccb] flex items-center justify-center mx-auto mb-4">
            <Send className="w-8 h-8 text-[#65a30d]" />
          </div>
          <Heading as="h3" size="sm" className="mb-2">
            Message sent!
          </Heading>
          <Text color="muted">{successMessage}</Text>
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
  );
}
