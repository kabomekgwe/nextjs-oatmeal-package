import { gql } from "@apollo/client";

export const GET_CONTACT_PAGE_CONTENT = gql`
  query GetContactPageContent {
    page(id: "contact", idType: URI) {
      id
      title
      content
      contactFields {
        heroHeadline
        heroDescription
        contactInfo {
          email
          phone
          address
        }
        formTitle
        formDescription
        successMessage
      }
    }
  }
`;
