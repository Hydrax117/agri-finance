// middleware.ts
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import { UserRole } from "@/types/user";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const path = req.nextUrl.pathname;

  // Public routes that don't require authentication
  if (
    path === "/" ||
    path.startsWith("/login") ||
    path.startsWith("/register") ||
    path.startsWith("/forgot-password") ||
    path.startsWith("/api/")
  ) {
    return NextResponse.next();
  }

  // Check if the user is authenticated
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Role-based route protection
  const userRole = token.role as UserRole;

  if (path.startsWith("/farmer") && userRole !== UserRole.FARMER) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (path.startsWith("/lender") && userRole !== UserRole.LENDER) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (path.startsWith("/admin") && userRole !== UserRole.ADMIN) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};
