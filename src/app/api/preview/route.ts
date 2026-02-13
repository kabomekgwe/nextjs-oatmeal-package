import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

/**
 * WordPress Preview Mode API Route
 * 
 * This route handles preview requests from WordPress.
 * When an editor clicks "Preview" in WordPress, they're redirected here
 * with a token and post ID. We validate the token and set a cookie
 * that allows viewing draft content.
 * 
 * Query params:
 * - id: WordPress post ID
 * - token: JWT token from WordPress
 * - slug: Post slug (optional, for redirect)
 * 
 * Example URL:
 * /api/preview?id=123&token=xyz&slug=my-post
 */

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
  const token = searchParams.get("token");
  const slug = searchParams.get("slug");
  const postType = searchParams.get("postType") || "post";

  // Validate required params
  if (!id || !token) {
    return NextResponse.json(
      { error: "Missing required parameters: id and token" },
      { status: 400 }
    );
  }

  try {
    // Verify the token by making a test request to WordPress
    const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || "http://localhost:8080";
    const verifyResponse = await fetch(`${wpUrl}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: `
          query VerifyToken {
            viewer {
              id
              name
            }
          }
        `,
      }),
    });

    if (!verifyResponse.ok) {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      );
    }

    // Set preview cookie
    // This cookie will be used by the GraphQL client to fetch draft content
    const cookieStore = await cookies();
    cookieStore.set("wp-preview-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60, // 1 hour
      path: "/",
    });

    cookieStore.set("wp-preview-id", id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60, // 1 hour
      path: "/",
    });

    // Redirect to the preview page
    let redirectUrl: string;
    
    if (postType === "page") {
      // For pages
      redirectUrl = slug ? `/${slug}` : "/";
    } else {
      // For posts
      redirectUrl = slug ? `/blog/${slug}` : `/blog/preview/${id}`;
    }

    // Add preview mode indicator
    const finalUrl = new URL(redirectUrl, request.url);
    finalUrl.searchParams.set("preview", "true");
    finalUrl.searchParams.set("id", id);

    return NextResponse.redirect(finalUrl);
  } catch (error) {
    console.error("Preview mode error:", error);
    return NextResponse.json(
      { error: "Failed to enable preview mode" },
      { status: 500 }
    );
  }
}

/**
 * Disable preview mode
 * Call this route with POST to clear preview cookies
 */
export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete("wp-preview-token");
  cookieStore.delete("wp-preview-id");

  return NextResponse.json({ message: "Preview mode disabled" });
}
