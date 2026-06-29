import { NextResponse } from "next/server";
import { auth } from "@/lib/auth"; // Import your auth instance
import { headers } from "next/headers";

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  // 1. Use the auth instance to get the session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // 2. Logic for protecting dashboard routes
  if (!session) {
    if (pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  // 3. RBAC Redirects
  const role = session.user.role;
  const rolePaths = {
    admin: "/dashboard/admin",
    client: "/dashboard/client",
    freelancer: "/dashboard/freelancer",
  };

  const targetPath = rolePaths[role];

  if (pathname.startsWith("/dashboard") && !pathname.startsWith(targetPath)) {
    return NextResponse.redirect(new URL(targetPath, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};