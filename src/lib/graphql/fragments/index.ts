import { gql } from "@apollo/client";

/**
 * Media Item Fragment - for images and other media
 */
export const MEDIA_ITEM_FRAGMENT = gql`
  fragment MediaItemFields on MediaItem {
    id
    databaseId
    altText
    caption
    sourceUrl
    mediaDetails {
      width
      height
    }
  }
`;

/**
 * Author Fragment
 */
export const AUTHOR_FRAGMENT = gql`
  fragment AuthorFields on User {
    id
    databaseId
    name
    firstName
    lastName
    description
    avatar {
      url
      width
      height
    }
  }
`;

/**
 * Category Fragment
 */
export const CATEGORY_FRAGMENT = gql`
  fragment CategoryFields on Category {
    id
    databaseId
    name
    slug
    description
  }
`;

/**
 * Post Fragment - for blog posts
 */
export const POST_FRAGMENT = gql`
  fragment PostFields on Post {
    id
    databaseId
    title
    slug
    uri
    content
    excerpt
    date
    modified
    status
    author {
      node {
        ...AuthorFields
      }
    }
    featuredImage {
      node {
        ...MediaItemFields
      }
    }
    categories {
      nodes {
        ...CategoryFields
      }
    }
    tags {
      nodes {
        id
        name
        slug
      }
    }
    seo {
      title
      metaDesc
      canonical
    }
  }
  ${AUTHOR_FRAGMENT}
  ${MEDIA_ITEM_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;

/**
 * Page Fragment
 */
export const PAGE_FRAGMENT = gql`
  fragment PageFields on Page {
    id
    databaseId
    title
    slug
    uri
    content
    status
    modified
    featuredImage {
      node {
        ...MediaItemFields
      }
    }
    seo {
      title
      metaDesc
      canonical
    }
  }
  ${MEDIA_ITEM_FRAGMENT}
`;