import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = [
  "/cart",
  "/wishlist",
  "/allorders",
  "/checkout",
  "/profile",
];

const authRoutes = ["/signUp", "/signIn"];

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isProductDetailPath = path.startsWith("/products/");

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (
    !token &&
    (protectedRoutes.some((p) => path.startsWith(p)) || isProductDetailPath)
  ) {
    return NextResponse.redirect(new URL("/signIn", request.url));
  }

  if (token && authRoutes.some((p) => path.startsWith(p))) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/cart/:path*",
    "/wishlist/:path*",
    "/products/:path*",
    "/allorders/:path*",
    "/checkout/:path*",
    "/profile/:path*",
    "/signUp/:path*",
    "/signIn/:path*",
  ],
};
