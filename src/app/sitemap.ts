import type { MetadataRoute } from "next";

/**
 * Dynamic Sitemap Generation
 * 
 * This generates a sitemap.xml file with all pages and blog posts.
 * When connected to WordPress, this should fetch all pages and posts
 * dynamically from the GraphQL API.
 */

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // Static pages
  const staticPages = [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${siteUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ];

  // TODO: Fetch blog posts from WordPress GraphQL
  // When connected to WordPress, uncomment and use this:
  /*
  const { getPosts } = await import("@/lib/wordpress/service");
  const posts = await getPosts(100);
  
  const blogPosts = posts?.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.modified),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  })) || [];
  */

  // Sample blog posts (remove when connected to WordPress)
  const blogPosts = [
    {
      url: `${siteUrl}/blog/getting-started-nextjs-16-tailwind-4`,
      lastModified: new Date("2026-02-10"),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    },
  ];

  return [...staticPages, ...blogPosts];
}
