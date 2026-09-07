import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    const validUsername = process.env.ADMIN_USERNAME || "sharp"
    const validPassword = process.env.ADMIN_PASSWORD || "@Hulk3029s"

    if (username === validUsername && password === validPassword) {
      const response = NextResponse.json({ success: true })
      response.cookies.set("admin_session", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 24 hours
        path: "/",
      })
      return response
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}
