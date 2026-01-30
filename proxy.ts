import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Proxy runs before routes are rendered. Used for auth: protect app routes
 * and redirect unauthenticated users to /login.
 * @see https://nextjs.org/docs/app/building-your-application/routing/middleware
 */
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1️⃣ Allow Next.js internals and static files
  if (
    pathname.startsWith("/_next") ||          // JS, CSS, chunks
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/images") ||         // if you use /public/images
    pathname.match(/\.[a-z0-9]+$/i) // static files: .png, .ico, .css, .js, etc.
  ) {
    return NextResponse.next();
  }

  const token = req.cookies.get("access_token")?.value;
  const isLoginPage = pathname === "/login" || pathname === "/";

  // 2️⃣ Logged-in user should not see /login or root
  if (isLoginPage && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // 3️⃣ Everything except /login and root requires token
  // BUT: Allow navigation to dashboard even without token if coming from login
  // This handles the case where router.push() happens before cookie is available
  const referer = req.headers.get("referer");
  const isComingFromLogin = referer?.includes("/login");
  const isDashboard = pathname === "/dashboard";
  
  if (!isLoginPage && !token) {
   
    // Special case: Allow dashboard access if coming from login page
    // This handles the timing issue with client-side navigation
    if (isDashboard && isComingFromLogin) {
      return NextResponse.next();
    }
    console.log("Redirecting to login", isDashboard, isComingFromLogin);
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 4️⃣ Root path without token should show login
  if (pathname === "/" && !token) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

/**
 * Matcher limits which paths invoke the proxy. Excludes API, static files,
 * and static assets so the proxy only runs where auth is needed.
 */
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
