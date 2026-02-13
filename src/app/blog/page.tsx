import { Container, Heading, Lead } from "@/components/ui";
import { BlogCard } from "@/components/blog/BlogCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Latest news, tutorials, and insights about Next.js, WordPress, and modern web development.",
};

// Sample blog posts (will be replaced with WordPress data)
const samplePosts = [
  {
    id: 1,
    title: "Getting Started with Next.js 16 and Tailwind CSS 4",
    excerpt:
      "Learn how to build modern web applications with the latest versions of Next.js and Tailwind CSS. We'll cover setup, configuration, and best practices.",
    slug: "getting-started-nextjs-16-tailwind-4",
    date: "2026-02-10",
    author: { name: "Sarah Chen" },
    category: "Tutorial",
  },
  {
    id: 2,
    title: "Why Headless WordPress is the Future of Content Management",
    excerpt:
      "Discover the benefits of decoupling your frontend from WordPress. Learn how GraphQL and modern frameworks are changing the CMS landscape.",
    slug: "headless-wordpress-future-cms",
    date: "2026-02-08",
    author: { name: "Marcus Johnson" },
    category: "Insights",
  },
  {
    id: 3,
    title: "Building Accessible Marketing Sites with ARIA and Semantic HTML",
    excerpt:
      "Accessibility is crucial for modern websites. Learn how to implement ARIA labels, semantic HTML, and keyboard navigation in your marketing sites.",
    slug: "building-accessible-marketing-sites",
    date: "2026-02-05",
    author: { name: "Emily Rodriguez" },
    category: "Tutorial",
  },
  {
    id: 4,
    title: "Performance Optimization Tips for Next.js Applications",
    excerpt:
      "Speed matters. Learn proven techniques to optimize your Next.js applications for better Core Web Vitals and user experience.",
    slug: "performance-optimization-nextjs",
    date: "2026-02-03",
    author: { name: "David Kim" },
    category: "Development",
  },
  {
    id: 5,
    title: "The Complete Guide to WPGraphQL and Custom Post Types",
    excerpt:
      "Master WPGraphQL by learning how to create custom post types and expose them in your GraphQL schema for headless WordPress sites.",
    slug: "complete-guide-wpgraphql-custom-post-types",
    date: "2026-01-30",
    author: { name: "Marcus Johnson" },
    category: "Tutorial",
  },
  {
    id: 6,
    title: "Design Systems in 2026: Trends and Best Practices",
    excerpt:
      "Explore the latest trends in design systems and learn how to build scalable, maintainable component libraries for your projects.",
    slug: "design-systems-2026-trends",
    date: "2026-01-28",
    author: { name: "Emily Rodriguez" },
    category: "Design",
  },
];

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-[#fafaf9]">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <Heading as="h1" size="xl" className="mb-6">
              Blog
            </Heading>
            <Lead size="base" color="muted">
              Latest news, tutorials, and insights about Next.js, WordPress, and
              modern web development.
            </Lead>
          </div>
        </Container>
      </section>

      {/* Blog Grid */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {samplePosts.map((post) => (
              <BlogCard
                key={post.id}
                title={post.title}
                excerpt={post.excerpt}
                slug={post.slug}
                date={post.date}
                author={post.author}
                category={post.category}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-16 flex items-center justify-center gap-2">
            <button
              disabled
              className="px-4 py-2 rounded-lg border border-[#e7e5e4] text-[#78716c] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button className="px-4 py-2 rounded-lg bg-[#84cc16] text-[#1c1917] font-medium">
              1
            </button>
            <button className="px-4 py-2 rounded-lg border border-[#e7e5e4] text-[#57534e] hover:bg-[#f5f5f4]">
              2
            </button>
            <button className="px-4 py-2 rounded-lg border border-[#e7e5e4] text-[#57534e] hover:bg-[#f5f5f4]">
              3
            </button>
            <button className="px-4 py-2 rounded-lg border border-[#e7e5e4] text-[#57534e] hover:bg-[#f5f5f4]">
              Next
            </button>
          </div>
        </Container>
      </section>
    </>
  );
}
