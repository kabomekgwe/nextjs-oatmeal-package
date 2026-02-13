import { gql } from "@apollo/client";
import { MEDIA_ITEM_FRAGMENT } from "../fragments";

/**
 * Get Homepage Content from WordPress ACF Fields
 */
export const GET_HOMEPAGE_CONTENT = gql`
  query GetHomepageContent {
    page(id: "homepage", idType: URI) {
      id
      title
      homepageFields {
        heroHeadline
        heroSubheadline
        heroCtaText
        heroCtaLink {
          nodes {
            uri
          }
        }
        heroShowBadge
        featuresEyebrow
        featuresHeadline
        featuresDescription
      }
    }
  }
`;

/**
 * Alternative: Get by page ID if homepage slug doesn't work
 */
export const GET_HOMEPAGE_BY_ID = gql`
  query GetHomepageById($id: ID!) {
    page(id: $id, idType: DATABASE_ID) {
      id
      title
      homepageFields {
        heroHeadline
        heroSubheadline
        heroCtaText
        heroCtaLink {
          nodes {
            uri
          }
        }
        heroShowBadge
        featuresEyebrow
        featuresHeadline
        featuresDescription
      }
    }
  }
`;