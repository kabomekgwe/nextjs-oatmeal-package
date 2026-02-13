/**
 * WordPress Media Types
 */
export interface MediaItem {
  id: string;
  databaseId: number;
  altText?: string;
  caption?: string;
  sourceUrl: string;
  mediaDetails?: {
    width: number;
    height: number;
  };
}

/**
 * WordPress Author Types
 */
export interface Author {
  id: string;
  databaseId: number;
  name: string;
  firstName?: string;
  lastName?: string;
  description?: string;
  avatar?: {
    url: string;
    width: number;
    height: number;
  };
}

/**
 * WordPress Category Types
 */
export interface Category {
  id: string;
  databaseId: number;
  name: string;
  slug: string;
  description?: string;
}

/**
 * WordPress Tag Types
 */
export interface Tag {
  id: string;
  name: string;
  slug: string;
}

/**
 * SEO Types
 */
export interface SEO {
  title?: string;
  metaDesc?: string;
  canonical?: string;
}

/**
 * WordPress Post Types
 */
export interface Post {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  uri: string;
  content?: string;
  excerpt?: string;
  date: string;
  modified: string;
  status: string;
  author?: {
    node: Author;
  };
  featuredImage?: {
    node: MediaItem;
  };
  categories?: {
    nodes: Category[];
  };
  tags?: {
    nodes: Tag[];
  };
  seo?: SEO;
}

/**
 * WordPress Page Types
 */
export interface Page {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  uri: string;
  content?: string;
  status: string;
  modified: string;
  featuredImage?: {
    node: MediaItem;
  };
  seo?: SEO;
}

/**
 * Menu Item Types
 */
export interface MenuItem {
  id: string;
  databaseId: number;
  label: string;
  url: string;
  path: string;
  parentId?: string;
  cssClasses?: string[];
}

/**
 * Homepage ACF Fields
 */
export interface HomepageFields {
  hero: {
    headline: string;
    subheadline: string;
    ctaText: string;
    ctaLink: string;
    secondaryCtaText?: string;
    secondaryCtaLink?: string;
    backgroundImage?: {
      node: MediaItem;
    };
  };
  featuresSection: {
    eyebrow?: string;
    headline: string;
    description?: string;
    features: Array<{
      icon: string;
      title: string;
      description: string;
      link?: string;
    }>;
  };
  testimonialsSection?: {
    eyebrow?: string;
    headline?: string;
    testimonials: Array<{
      quote: string;
      authorName: string;
      authorTitle?: string;
      authorCompany?: string;
      avatar?: {
        node: MediaItem;
      };
    }>;
  };
  ctaSection?: {
    headline: string;
    description?: string;
    buttonText: string;
    buttonLink: string;
  };
}

/**
 * Pricing Page ACF Fields
 */
export interface PricingFields {
  hero: {
    headline: string;
    description?: string;
  };
  pricingTiers: Array<{
    name: string;
    price: string;
    period: string;
    description?: string;
    highlighted: boolean;
    features: string[];
    buttonText: string;
    buttonLink: string;
  }>;
  faqSection?: {
    headline?: string;
    faqs: Array<{
      question: string;
      answer: string;
    }>;
  };
}

/**
 * About Page ACF Fields
 */
export interface AboutFields {
  hero: {
    headline: string;
    description?: string;
  };
  story?: {
    content: string;
    image?: {
      node: MediaItem;
    };
  };
  stats?: Array<{
    number: string;
    label: string;
  }>;
  teamMembers?: Array<{
    name: string;
    role: string;
    bio?: string;
    photo?: {
      node: MediaItem;
    };
    socialLinks?: Array<{
      platform: string;
      url: string;
    }>;
  }>;
}

/**
 * Site Options (Global Settings)
 */
export interface SiteOptions {
  header: {
    logo?: {
      node: MediaItem;
    };
    navigation: Array<{
      label: string;
      url: string;
      children?: Array<{
        label: string;
        url: string;
      }>;
    }>;
  };
  footer: {
    copyright: string;
    socialLinks: Array<{
      platform: string;
      url: string;
      icon: string;
    }>;
    footerColumns: Array<{
      title: string;
      links: Array<{
        label: string;
        url: string;
      }>;
    }>;
  };
  seo: {
    defaultTitle: string;
    defaultDescription: string;
    socialImage?: {
      node: MediaItem;
    };
  };
}