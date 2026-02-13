import Link from "next/link";
import { Container, Heading, Text, Button } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <Container className="text-center">
        <div className="space-y-6">
          {/* 404 Number */}
          <div className="relative">
            <span className="text-9xl font-bold text-[#e7e5e4]">404</span>
          </div>
          
          {/* Content */}
          <div className="space-y-4 max-w-lg mx-auto">
            <Heading as="h1" size="lg">
              Page not found
            </Heading>
            <Text size="lg" color="muted">
              Sorry, we couldn&apos;t find the page you&apos;re looking for. 
              It might have been moved, deleted, or never existed.
            </Text>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/">
              <Button>Go back home</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline">Contact support</Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
