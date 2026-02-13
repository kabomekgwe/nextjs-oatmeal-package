/**
 * SEO Utility Functions
 * 
 * Helper functions for generating SEO metadata and structured data.
 */

interface SEOMetadata {
  title: string;
  description: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
  canonical?: string;
}

/**
 * Generate page title with site name
 */
export function generateTitle(title: string): string {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Oatmeal";
  return title ? `${title} | ${siteName}` : siteName;
}

/**
 * Generate meta description (truncated if too long)
 */
export function generateDescription(description: string): string {
  const maxLength = 160;
  if (description.length <= maxLength) return description;
  return description.slice(0, maxLength - 3).trim() + "...";
}

/**
 * Generate canonical URL
 */
export function generateCanonical(path: string = "/"): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return `${siteUrl}${path}`;
}

/**
 * Generate Open Graph image URL
 */
export function generateOGImage(title: string, description?: string): string {
  // In production, this would use a service like Vercel OG Image
  // or generate dynamic images
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return `${siteUrl}/og-image.png`;
}

/**
 * Generate Article structured data (JSON-LD)
 */
export function generateArticleStructuredData({
  title,
  description,
  publishedTime,
  modifiedTime,
  author,
  tags,
}: SEOMetadata): object {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Oatmeal";

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    image: generateOGImage(title, description),
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: {
      "@type": "Person",
      name: author || "Oatmeal Team",
    },
    publisher: {
      "@type": "Organization",
      name: siteName,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
      },
    },
    keywords: tags?.join(", "),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": siteUrl,
    },
  };
}

/**
 * Generate Organization structured data (JSON-LD)
 */
export function generateOrganizationStructuredData(): object {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Oatmeal";

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    sameAs: [
      // Add social media URLs when available
      // "https://twitter.com/oatmeal",
      // "https://linkedin.com/company/oatmeal",
      // "https://github.com/oatmeal",
    ],
  };
}

/**
 * Generate WebSite structured data (JSON-LD)
 */
export function generateWebsiteStructuredData(): object {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Oatmeal";

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Generate Breadcrumb structured data (JSON-LD)
 */
export function generateBreadcrumbStructuredData(
  items: Array<{ name: string; url: string }>
): object {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${siteUrl}${item.url}`,
    })),
  };
}
