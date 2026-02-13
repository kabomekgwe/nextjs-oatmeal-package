import { gql } from "@apollo/client";

export const GET_ABOUT_PAGE_CONTENT = gql`
  query GetAboutPageContent {
    page(id: "about", idType: URI) {
      id
      title
      content
      aboutFields {
        heroHeadline
        heroDescription
        stats {
          number
          label
        }
        storyHeadline
        storyItems {
          number
          title
          description
        }
        teamHeadline
        teamDescription
        teamMembers {
          name
          role
          bio
          photo {
            node {
              sourceUrl
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
`;
