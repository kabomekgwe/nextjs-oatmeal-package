import { gql } from "@apollo/client";
import {
  POST_FRAGMENT,
  PAGE_FRAGMENT,
  MEDIA_ITEM_FRAGMENT,
  AUTHOR_FRAGMENT,
  CATEGORY_FRAGMENT,
} from "../fragments";

/**
 * Get General Site Settings
 */
export const GET_GENERAL_SETTINGS = gql`
  query GetGeneralSettings {
    generalSettings {
      title
      description
      url
    }
  }
`;

/**
 * Get All Posts (for blog listing)
 */
export const GET_POSTS = gql`
  query GetPosts($first: Int = 10, $after: String) {
    posts(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        ...PostFields
      }
    }
  }
  ${POST_FRAGMENT}
`;

/**
 * Get Single Post by Slug
 */
export const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      ...PostFields
    }
  }
  ${POST_FRAGMENT}
`;

/**
 * Get All Pages
 */
export const GET_PAGES = gql`
  query GetPages {
    pages {
      nodes {
        ...PageFields
      }
    }
  }
  ${PAGE_FRAGMENT}
`;

/**
 * Get Single Page by Slug
 */
export const GET_PAGE_BY_SLUG = gql`
  query GetPageBySlug($slug: ID!) {
    page(id: $slug, idType: URI) {
      ...PageFields
    }
  }
  ${PAGE_FRAGMENT}
`;

/**
 * Get Menu Items
 */
export const GET_MENU_ITEMS = gql`
  query GetMenuItems($location: MenuLocationEnum!) {
    menuItems(where: { location: $location }, first: 100) {
      nodes {
        id
        databaseId
        label
        url
        path
        parentId
        cssClasses
      }
    }
  }
`;

/**
 * Search Posts
 */
export const SEARCH_POSTS = gql`
  query SearchPosts($search: String!, $first: Int = 10) {
    posts(where: { search: $search }, first: $first) {
      nodes {
        ...PostFields
      }
    }
  }
  ${POST_FRAGMENT}
`;

/**
 * Get Categories
 */
export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      nodes {
        ...CategoryFields
      }
    }
  }
  ${CATEGORY_FRAGMENT}
`;

/**
 * Get Posts by Category
 */
export const GET_POSTS_BY_CATEGORY = gql`
  query GetPostsByCategory($category: String!, $first: Int = 10) {
    posts(where: { categoryName: $category }, first: $first) {
      nodes {
        ...PostFields
      }
    }
  }
  ${POST_FRAGMENT}
`;

/**
 * Get Preview Post (for draft preview)
 */
export const GET_PREVIEW_POST = gql`
  query GetPreviewPost($id: ID!) {
    post(id: $id, idType: DATABASE_ID, asPreview: true) {
      ...PostFields
    }
  }
  ${POST_FRAGMENT}
`;