import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const runtime = "nodejs"; // ✅ correct for Kubernetes

export default clerkMiddleware((auth, req) => {
  // ✅ allow public routes
  if (
    req.nextUrl.pathname === "/" ||
    req.nextUrl.pathname.startsWith("/_next") ||
    req.nextUrl.pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  // ✅ protect everything else
  auth().protect();
});

export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)",
    "/(api|trpc)(.*)",
  ],
};
