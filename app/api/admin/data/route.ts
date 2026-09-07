import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { readPortfolioData, writePortfolioData } from "@/lib/portfolio-data"
import type { PortfolioData } from "@/lib/portfolio-data"

export async function GET() {
  try {
    const data = readPortfolioData()
    return NextResponse.json(data)
  } catch {
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
    writePortfolioData(data)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to save data" }, { status: 500 })
  }
}
