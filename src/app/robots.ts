import type { MetadataRoute } from "next";

/**
 * robots.txt Generation
 * 
 * This controls how search engines crawl the site.
 * - Allow: All pages are indexable by default
 * - Disallow: Admin/preview routes
 * - Sitemap: Points to the generated sitemap
 */

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/preview",
          "/_next/",
          "/private/",
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
