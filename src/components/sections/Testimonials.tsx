import { Container, Heading, Text } from "@/components/ui";
import { cn } from "@/lib/utils";
import { Quote } from "lucide-react";

interface Testimonial {
  quote: string;
  authorName: string;
  authorTitle?: string;
  authorCompany?: string;
  avatar?: string;
}

interface TestimonialsProps {
  eyebrow?: string;
  headline: string;
  testimonials: Testimonial[];
  className?: string;
}

export function Testimonials({
  eyebrow,
  headline,
  testimonials,
  className,
}: TestimonialsProps) {
  if (!testimonials || testimonials.length === 0) {
    return null;
  }
  return (
    <section className={cn("py-20 sm:py-24 bg-[#fafaf9]", className)}>
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
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative p-6 bg-white rounded-2xl border border-[#e7e5e4] shadow-sm"
            >
              {/* Quote Icon */}
              <div className="absolute -top-3 left-6">
                <div className="w-8 h-8 rounded-full bg-[#84cc16] flex items-center justify-center">
                  <Quote className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Quote */}
              <blockquote className="mt-4 mb-6">
                <Text color="default" className="italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </Text>
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3">
                {testimonial.avatar ? (
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.authorName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#ecfccb] flex items-center justify-center">
                    <span className="text-sm font-semibold text-[#65a30d]">
                      {testimonial.authorName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                )}
                <div>
                  <Text weight="semibold" className="text-sm">
                    {testimonial.authorName}
                  </Text>
                  {(testimonial.authorTitle || testimonial.authorCompany) && (
                    <Text size="sm" color="muted">
                      {testimonial.authorTitle}
                      {testimonial.authorTitle && testimonial.authorCompany &&
                        " at "}
                      {testimonial.authorCompany}
                    </Text>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
