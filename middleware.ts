import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1️⃣ Allow Next.js internals and static files
  if (
    pathname.startsWith("/_next") ||          // JS, CSS, chunks
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/images") ||         // if you use /public/images
    pathname.match(/\.(.*)$/)                 // any file with extension: .png, .jpg, .css, .js, etc.
  ) {
    return NextResponse.next();
  }

  const token = req.cookies.get("access_token")?.value;
  const isLoginPage = pathname === "/login";

  // 2️⃣ Logged-in user should not see /login
  if (isLoginPage && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // 3️⃣ Everything except /login requires token
  if (!isLoginPage && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// You can keep this matcher:
export const config = {
  matcher: ["/:path*"],
};
