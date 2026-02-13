import { gql } from "@apollo/client";

export const GET_PRICING_PAGE_CONTENT = gql`
  query GetPricingPageContent {
    page(id: "pricing", idType: URI) {
      id
      title
      content
      pricingFields {
        heroHeadline
        heroDescription
        pricingTiers {
          name
          price
          period
          description
          highlighted
          features
          buttonText
          buttonLink {
            nodes {
              uri
            }
          }
        }
        faqHeadline
        faqs {
          question
          answer
        }
      }
    }
  }
`;
