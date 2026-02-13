import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Heading, Text, Small } from "@/components/ui";
import { formatDate, calculateReadingTime } from "@/lib/utils";
import type { Metadata } from "next";
import { ArrowLeft, Twitter, Linkedin, Facebook } from "lucide-react";

// Sample posts data (will be fetched from WordPress)
const samplePosts = [
  {
    id: 1,
    title: "Getting Started with Next.js 16 and Tailwind CSS 4",
    excerpt:
      "Learn how to build modern web applications with the latest versions of Next.js and Tailwind CSS.",
    content: `
      <p>Next.js 16 and Tailwind CSS 4 represent a major leap forward in web development. With improved performance, better developer experience, and new features, there's never been a better time to upgrade your stack.</p>
      
      <h2>What's New in Next.js 16?</h2>
      <p>Next.js 16 brings several exciting improvements:</p>
      <ul>
        <li>React 19 support with new features</li>
        <li>Improved caching and revalidation</li>
        <li>Better error handling</li>
        <li>Enhanced developer tools</li>
      </ul>
      
      <h2>Tailwind CSS 4: CSS-First Configuration</h2>
      <p>Tailwind CSS 4 introduces a CSS-first configuration approach, eliminating the need for a JavaScript configuration file. This brings several benefits:</p>
      <ul>
        <li>Faster build times</li>
        <li>Zero JavaScript runtime</li>
        <li>Better IDE support</li>
        <li>Easier theming</li>
      </ul>
      
      <h2>Getting Started</h2>
      <p>To start a new project with Next.js 16 and Tailwind CSS 4, run:</p>
      <pre><code>npx create-next-app@latest my-app --typescript --tailwind</code></pre>
      
      <h2>Conclusion</h2>
      <p>The combination of Next.js 16 and Tailwind CSS 4 provides a powerful foundation for building modern web applications. With improved performance and developer experience, it's the perfect stack for your next project.</p>
    `,
    slug: "getting-started-nextjs-16-tailwind-4",
    date: "2026-02-10",
    author: {
      name: "Sarah Chen",
      bio: "Senior Developer Advocate at Oatmeal, passionate about modern web technologies.",
    },
    category: "Tutorial",
    tags: ["Next.js", "Tailwind CSS", "React", "Tutorial"],
  },
];

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = samplePosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = samplePosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const readingTime = calculateReadingTime(post.content);

  return (
    <article className="min-h-screen">
      {/* Header */}
      <header className="pt-32 pb-16 bg-[#fafaf9]">
        <Container className="max-w-4xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#78716c] hover:text-[#1c1917] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to blog
          </Link>

          <div className="space-y-6">
            {/* Category */}
            <span className="inline-block px-3 py-1 rounded-full bg-[#ecfccb] text-[#3f6212] text-sm font-semibold">
              {post.category}
            </span>

            {/* Title */}
            <Heading as="h1" size="xl">
              {post.title}
            </Heading>

            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-[#78716c]">
              <span>{formatDate(post.date)}</span>
              <span>·</span>
              <span>{readingTime} min read</span>
            </div>
          </div>
        </Container>
      </header>

      {/* Content */}
      <div className="py-16 bg-white">
        <Container className="max-w-3xl">
          {/* Article Content */}
          <div
            className="prose prose-lg max-w-none prose-headings:text-[#1c1917] prose-p:text-[#57534e] prose-a:text-[#84cc16] hover:prose-a:text-[#65a30d] prose-strong:text-[#1c1917] prose-code:text-[#84cc16] prose-pre:bg-[#fafaf9] prose-pre:border prose-pre:border-[#e7e5e4]"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-[#e7e5e4]">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-[#f5f5f4] text-[#57534e] text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Share */}
          <div className="mt-8 flex items-center gap-4">
            <Text size="sm" weight="medium">
              Share this article:
            </Text>
            <div className="flex items-center gap-2">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  post.title
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-[#f5f5f4] text-[#57534e] hover:bg-[#84cc16] hover:text-white transition-colors"
                aria-label="Share on Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                  `https://example.com/blog/${post.slug}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-[#f5f5f4] text-[#57534e] hover:bg-[#84cc16] hover:text-white transition-colors"
                aria-label="Share on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  `https://example.com/blog/${post.slug}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-[#f5f5f4] text-[#57534e] hover:bg-[#84cc16] hover:text-white transition-colors"
                aria-label="Share on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>
        </Container>
      </div>

      {/* Author */}
      <div className="py-16 bg-[#fafaf9]">
        <Container className="max-w-3xl">
          <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-[#e7e5e4]">
            <div className="w-16 h-16 rounded-full bg-[#ecfccb] flex items-center justify-center flex-shrink-0">
              <span className="text-xl font-bold text-[#65a30d]">
                {post.author.name.charAt(0)}
              </span>
            </div>
            <div>
              <Text weight="semibold" className="mb-1">
                {post.author.name}
              </Text>
              <Text size="sm" color="muted">
                {post.author.bio}
              </Text>
            </div>
          </div>
        </Container>
      </div>
    </article>
  );
}
