import { Container, Heading, Lead } from "@/components/ui";
import { BlogCard } from "@/components/blog/BlogCard";
import { getPosts } from "@/lib/wordpress/service";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Latest news, tutorials, and insights about Next.js, WordPress, and modern web development.",
};

export const revalidate = 60;

export default async function BlogPage() {
  const { posts } = await getPosts();
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
          {(!posts || posts.length === 0) ? (
            <div className="text-center py-12">
              <p className="text-[#78716c]">No posts found. Add posts in WordPress to see them here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogCard
                  key={post.id}
                  title={post.title}
                  excerpt={post.excerpt || ""}
                  slug={post.slug}
                  date={post.date}
                  author={post.author?.node || { name: "Unknown" }}
                  category={post.categories?.nodes?.[0]?.name || "Uncategorized"}
                />
              ))}
            </div>
          )}

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
