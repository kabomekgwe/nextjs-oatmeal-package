"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Container, Heading, Text, Button } from "@/components/ui";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <Container className="text-center">
        <div className="space-y-6">
          {/* Error Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#fef2f2] text-[#ef4444] mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>

          {/* Content */}
          <div className="space-y-4 max-w-lg mx-auto">
            <Heading as="h1" size="lg">
              Something went wrong
            </Heading>
            <Text size="lg" color="muted">
              We apologize for the inconvenience. Our team has been notified 
              and we&apos;re working to fix the issue.
            </Text>
            {error.digest && (
              <Text size="sm" color="muted">
                Error ID: {error.digest}
              </Text>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button onClick={reset}>Try again</Button>
            <Link href="/">
              <Button variant="outline">Go back home</Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
