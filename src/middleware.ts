import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isLocale, locales } from "@/i18n/config";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    // Skip admin routes from locale middleware
    if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
      return NextResponse.next();
    }
    
    const locale = "en"; // Default locale
    return NextResponse.redirect(
      new URL(`/${locale}${pathname}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};