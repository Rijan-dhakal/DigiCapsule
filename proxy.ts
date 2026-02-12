import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const pathName = request.nextUrl.pathname;

  try {
    const session = getSessionCookie(request);

    if (!session && pathName === "/login") {
      return NextResponse.next();
    }

    if (!session && pathName === "/") {
      return NextResponse.next();
    }

    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const sessionResponse = await fetch(
      `${process.env.BASE_URL || request.nextUrl.origin}/api/auth/get-session`,
      {
        headers: {
          Cookie: `better-auth.session_token=${session}`,
        },
      },
    );

    if (!sessionResponse.ok && pathName === "/login") {
      return NextResponse.next();
    }

    if (!sessionResponse.ok && pathName === "/") {
      return NextResponse.next();
    }

    if (!sessionResponse.ok) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (sessionResponse.ok && pathName === "/login") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (sessionResponse.ok && pathName === "/") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
  } catch (error: any) {
    console.log(error.message);

    if (pathName === "/auth") {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/", "/login", "/dashboard"],
};
