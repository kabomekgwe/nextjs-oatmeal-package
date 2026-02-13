import { NextResponse } from "next/server";
import { cookies } from "next/headers";

/**
 * Exit Preview Mode API Route
 * 
 * This route clears the preview cookies and redirects back to the post/page.
 * Useful for editors who want to see the published version after previewing.
 */

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const redirect = searchParams.get("redirect") || "/";

  // Clear preview cookies
  const cookieStore = await cookies();
  cookieStore.delete("wp-preview-token");
  cookieStore.delete("wp-preview-id");

  // Redirect to the specified URL
  return NextResponse.redirect(new URL(redirect, request.url));
}
