import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { revalidatePath } from "next/cache"
import { readPortfolioData, writePortfolioData } from "@/lib/portfolio-data"
import type { PortfolioData } from "@/lib/portfolio-data"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET() {
  try {
    const data = await readPortfolioData()
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    })
  } catch (error) {
    console.error("[API GET /api/admin/data] error:", error)
    return NextResponse.json({ error: "Failed to read data" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = request.cookies.get("admin_session")
    if (!session || session.value !== "authenticated") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data: PortfolioData = await request.json()
    await writePortfolioData(data)

    // Invalidate Next.js cache so the homepage and admin portal immediately reflect new data
    try {
      revalidatePath("/")
      revalidatePath("/admin")
    } catch (revalidateErr) {
      console.warn("revalidatePath warning:", revalidateErr)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[API POST /api/admin/data] error:", error)
    return NextResponse.json({ error: "Failed to save data" }, { status: 500 })
  }
}
