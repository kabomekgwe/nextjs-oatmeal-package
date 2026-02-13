import { getServerClient } from "@/lib/graphql/client";
import {
  GET_GENERAL_SETTINGS,
  GET_POSTS,
  GET_POST_BY_SLUG,
  GET_PAGES,
  GET_PAGE_BY_SLUG,
  GET_MENU_ITEMS,
  SEARCH_POSTS,
  GET_CATEGORIES,
  GET_POSTS_BY_CATEGORY,
  GET_PREVIEW_POST,
  GET_PRICING_PAGE_CONTENT,
  GET_ABOUT_PAGE_CONTENT,
  GET_SITE_OPTIONS,
} from "@/lib/graphql/queries";
import { GET_HOMEPAGE_CONTENT } from "@/lib/graphql/queries/homepage";
import type {
  Post,
  Page,
  MenuItem,
  Category,
  HomepageFields,
  PricingFields,
  AboutFields,
  SiteOptions,
} from "@/types";

/**
 * WordPress Service - Server-side data fetching
 */

/**
 * Get General Site Settings
 */
export async function getGeneralSettings() {
  const client = getServerClient();
  const { data } = await client.query({
    query: GET_GENERAL_SETTINGS,
  });
  return (data as any)?.generalSettings;
}

/**
 * Get All Posts
 */
export async function getPosts(first = 10, after?: string) {
  const client = getServerClient();
  const { data } = await client.query({
    query: GET_POSTS,
    variables: { first, after },
  });
  const typedData = data as any;
  return {
    posts: typedData?.posts?.nodes as Post[] | undefined,
    pageInfo: typedData?.posts?.pageInfo,
  };
}

/**
 * Get Single Post by Slug
 */
export async function getPostBySlug(slug: string) {
  const client = getServerClient();
  const { data } = await client.query({
    query: GET_POST_BY_SLUG,
    variables: { slug },
  });
  return (data as any)?.post as Post | undefined;
}

/**
 * Get All Pages
 */
export async function getPages() {
  const client = getServerClient();
  const { data } = await client.query({
    query: GET_PAGES,
  });
  return (data as any)?.pages?.nodes as Page[] | undefined;
}

/**
 * Get Single Page by Slug
 */
export async function getPageBySlug(slug: string) {
  const client = getServerClient();
  const { data } = await client.query({
    query: GET_PAGE_BY_SLUG,
    variables: { slug },
  });
  return (data as any)?.page as Page | undefined;
}

/**
 * Get Menu Items
 */
export async function getMenuItems(location: string) {
  const client = getServerClient();
  const { data } = await client.query({
    query: GET_MENU_ITEMS,
    variables: { location },
  });
  return (data as any)?.menuItems?.nodes as MenuItem[] | undefined;
}

/**
 * Search Posts
 */
export async function searchPosts(search: string, first = 10) {
  const client = getServerClient();
  const { data } = await client.query({
    query: SEARCH_POSTS,
    variables: { search, first },
  });
  return (data as any)?.posts?.nodes as Post[] | undefined;
}

/**
 * Get Categories
 */
export async function getCategories() {
  const client = getServerClient();
  const { data } = await client.query({
    query: GET_CATEGORIES,
  });
  return (data as any)?.categories?.nodes as Category[] | undefined;
}

/**
 * Get Posts by Category
 */
export async function getPostsByCategory(category: string, first = 10) {
  const client = getServerClient();
  const { data } = await client.query({
    query: GET_POSTS_BY_CATEGORY,
    variables: { category, first },
  });
  return (data as any)?.posts?.nodes as Post[] | undefined;
}

/**
 * Get Preview Post (for draft preview)
 */
export async function getPreviewPost(id: string, token: string) {
  const client = getServerClient();
  const { data } = await client.query({
    query: GET_PREVIEW_POST,
    variables: { id },
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  });
  return (data as any)?.post as Post | undefined;
}

/**
 * Get Homepage Content
 */
export async function getHomepageContent() {
  const client = getServerClient();
  const { data } = await client.query({
    query: GET_HOMEPAGE_CONTENT,
  });
  const typedData = data as any;
  return {
    page: typedData?.page,
    fields: typedData?.page?.homepageFields as HomepageFields | undefined,
  };
}

/**
 * Get Pricing Page Content
 */
export async function getPricingPageContent() {
  const client = getServerClient();
  const { data } = await client.query({
    query: GET_PRICING_PAGE_CONTENT,
  });
  const typedData = data as any;
  return {
    page: typedData?.page,
    fields: typedData?.page?.pricingFields as PricingFields | undefined,
  };
}

/**
 * Get About Page Content
 */
export async function getAboutPageContent() {
  const client = getServerClient();
  const { data } = await client.query({
    query: GET_ABOUT_PAGE_CONTENT,
  });
  const typedData = data as any;
  return {
    page: typedData?.page,
    fields: typedData?.page?.aboutFields as AboutFields | undefined,
  };
}

/**
 * Get Site Options (Global Settings)
 */
export async function getSiteOptions() {
  const client = getServerClient();
  const { data } = await client.query({
    query: GET_SITE_OPTIONS,
  });
  return (data as any)?.siteOptions as SiteOptions | undefined;
}