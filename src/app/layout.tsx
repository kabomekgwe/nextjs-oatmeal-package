import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Oatmeal - Modern SaaS Marketing Template",
    template: "%s | Oatmeal",
  },
  description: "A beautiful, multi-theme SaaS marketing website built with Next.js, Tailwind CSS, and Headless WordPress.",
  keywords: ["SaaS", "marketing", "template", "Next.js", "Tailwind CSS", "WordPress"],
  authors: [{ name: "Oatmeal Team" }],
  creator: "Oatmeal Team",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Oatmeal",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${instrumentSans.variable} font-sans antialiased`}>
        <Header />
        <main className="pt-16 lg:pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
