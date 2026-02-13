import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { cookies } from "next/headers";

/**
 * WordPress GraphQL Endpoint
 */
const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || "http://localhost:8080";
const GRAPHQL_ENDPOINT = process.env.WORDPRESS_GRAPHQL_ENDPOINT || "/graphql";

/**
 * Create HTTP Link
 */
const httpLink = createHttpLink({
  uri: `${WORDPRESS_URL}${GRAPHQL_ENDPOINT}`,
});

/**
 * Auth Link - Adds JWT token for authenticated requests (preview mode)
 */
const authLink = setContext(async (_, { headers }) => {
  // Get token from environment (server-side) or cookie (client-side)
  const token = process.env.WORDPRESS_AUTH_TOKEN;
  
  // Try to get from cookie if available (for preview mode)
  let cookieToken = null;
  try {
    const cookieStore = await cookies();
    cookieToken = cookieStore.get("wp-preview-token")?.value;
  } catch {
    // Cookies not available (client-side)
  }

  return {
    headers: {
      ...headers,
      authorization: cookieToken || token ? `Bearer ${cookieToken || token}` : "",
    },
  };
});

/**
 * Apollo Client for Server Components
 */
export const getServerClient = () => {
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "no-cache",
      },
      query: {
        fetchPolicy: "no-cache",
      },
    },
  });
};

/**
 * Apollo Client for Client Components
 */
export const getClientClient = () => {
  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-first",
      },
    },
  });
};

/**
 * Default client export (for client components)
 */
export const apolloClient = getClientClient();