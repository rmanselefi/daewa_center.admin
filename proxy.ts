import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
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
  const isLoginPage = pathname === "/login" || pathname === "/";

  // 2️⃣ Logged-in user should not see /login or root
  if (isLoginPage && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // 3️⃣ Everything except /login and root requires token
  if (!isLoginPage && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 4️⃣ Root path without token should show login
  if (pathname === "/" && !token) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

