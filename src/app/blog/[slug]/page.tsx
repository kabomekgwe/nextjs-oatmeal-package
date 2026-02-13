import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Heading, Text, Small } from "@/components/ui";
import { formatDate, calculateReadingTime } from "@/lib/utils";
import { getPostBySlug } from "@/lib/wordpress/service";
import type { Metadata } from "next";
import { ArrowLeft, Twitter, Linkedin, Facebook } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt || "",
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const readingTime = calculateReadingTime(post.content || "");

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
            {post.categories?.nodes?.[0] && (
              <span className="inline-block px-3 py-1 rounded-full bg-[#ecfccb] text-[#3f6212] text-sm font-semibold">
                {post.categories.nodes[0].name}
              </span>
            )}

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
          {post.tags && post.tags.nodes && post.tags.nodes.length > 0 && (
            <div className="mt-12 pt-8 border-t border-[#e7e5e4]">
              <div className="flex flex-wrap gap-2">
                {post.tags.nodes.map((tag) => (
                  <span
                    key={tag.name}
                    className="px-3 py-1 rounded-full bg-[#f5f5f4] text-[#57534e] text-sm"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}

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
      {post.author?.node && (
        <div className="py-16 bg-[#fafaf9]">
          <Container className="max-w-3xl">
            <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-[#e7e5e4]">
              <div className="w-16 h-16 rounded-full bg-[#ecfccb] flex items-center justify-center flex-shrink-0">
                <span className="text-xl font-bold text-[#65a30d]">
                  {post.author.node.name.charAt(0)}
                </span>
              </div>
              <div>
                <Text weight="semibold" className="mb-1">
                  {post.author.node.name}
                </Text>
                {post.author.node.description && (
                  <Text size="sm" color="muted">
                    {post.author.node.description}
                  </Text>
                )}
              </div>
            </div>
          </Container>
        </div>
      )}
    </article>
  );
}
