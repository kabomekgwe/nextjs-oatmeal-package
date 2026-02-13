import { gql } from "@apollo/client";
import { MEDIA_ITEM_FRAGMENT } from "../fragments";

/**
 * Get Pricing Page Content from ACF Fields
 */
export const GET_PRICING_PAGE_CONTENT = gql`
  query GetPricingPageContent {
    page(id: "pricing", idType: URI) {
      id
      title
      pricingFields {
        hero {
          headline
          description
        }
        pricingTiers {
          name
          price
          period
          description
          highlighted
          features
          buttonText
          buttonLink
        }
        faqSection {
          headline
          faqs {
            question
            answer
          }
        }
      }
    }
  }
`;

/**
 * Get About Page Content from ACF Fields
 */
export const GET_ABOUT_PAGE_CONTENT = gql`
  query GetAboutPageContent {
    page(id: "about", idType: URI) {
      id
      title
      aboutFields {
        hero {
          headline
          description
        }
        story {
          content
          image {
            node {
              ...MediaItemFields
            }
          }
        }
        stats {
          number
          label
        }
        teamMembers {
          name
          role
          bio
          photo {
            node {
              ...MediaItemFields
            }
          }
          socialLinks {
            platform
            url
          }
        }
      }
    }
  }
  ${MEDIA_ITEM_FRAGMENT}
`;

/**
 * Get Site Options (Global Settings)
 */
export const GET_SITE_OPTIONS = gql`
  query GetSiteOptions {
    siteOptions {
      header {
        logo {
          node {
            ...MediaItemFields
          }
        }
        navigation {
          label
          url
          children {
            label
            url
          }
        }
      }
      footer {
        copyright
        socialLinks {
          platform
          url
          icon
        }
        footerColumns {
          title
          links {
            label
            url
          }
        }
      }
      seo {
        defaultTitle
        defaultDescription
        socialImage {
          node {
            ...MediaItemFields
          }
        }
      }
    }
  }
  ${MEDIA_ITEM_FRAGMENT}
`;