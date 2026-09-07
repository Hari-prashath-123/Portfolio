import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const ADMIN_ROUTES = ["/admin"]
const LOGIN_ROUTE = "/admin/login"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isAdminRoute = ADMIN_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  )
  const isLoginPage = pathname === LOGIN_ROUTE

  if (isAdminRoute && !isLoginPage) {
    const session = request.cookies.get("admin_session")
    if (!session || session.value !== "authenticated") {
      return NextResponse.redirect(new URL(LOGIN_ROUTE, request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
