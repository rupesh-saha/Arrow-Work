import { NextResponse } from "next/server";
import { auth } from "@/lib/auth"; 
import { headers } from "next/headers";

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    if (pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  const role = session.user.role;
  const rolePaths = {
    admin: "/dashboard/admin",
    client: "/dashboard/client",
    freelancer: "/dashboard/freelancer",
  };

  const targetPath = rolePaths[role];

  const isSuccessPage = pathname.startsWith("/dashboard/success");

  if (pathname.startsWith("/dashboard") && !pathname.startsWith(targetPath) && !isSuccessPage) {
    return NextResponse.redirect(new URL(targetPath, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};