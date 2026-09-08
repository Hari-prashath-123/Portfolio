import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import fs from "fs"
import path from "path"

const ALLOWED_TYPES: Record<string, { mime: string[]; ext: string[] }> = {
  profile: { mime: ["image/jpeg", "image/png", "image/webp"], ext: [".jpg", ".jpeg", ".png", ".webp"] },
  logo: { mime: ["image/jpeg", "image/png", "image/webp", "image/svg+xml", "image/x-icon"], ext: [".jpg", ".jpeg", ".png", ".webp", ".svg", ".ico"] },
  resume: { mime: ["application/pdf"], ext: [".pdf"] },
}

const FILE_NAMES: Record<string, string> = {
  profile: "Profile.jpeg",
  logo: "logo.jpg",
  resume: "resume.pdf",
}

export async function POST(request: NextRequest) {
  try {
    const session = request.cookies.get("admin_session")
    if (!session || session.value !== "authenticated") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File | null
    const type = formData.get("type") as string | null

    if (!file || !type) {
      return NextResponse.json({ error: "File and type are required" }, { status: 400 })
    }

    if (!ALLOWED_TYPES[type]) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 })
    }

    const allowed = ALLOWED_TYPES[type]
    if (!allowed.mime.includes(file.type)) {
      return NextResponse.json({ error: `Invalid file format. Allowed: ${allowed.ext.join(", ")}` }, { status: 400 })
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large. Maximum size is 10MB" }, { status: 400 })
    }

    const publicDir = path.join(process.cwd(), "public")
    const fileName = FILE_NAMES[type]
    const filePath = path.join(publicDir, fileName)

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    fs.writeFileSync(filePath, buffer)

    return NextResponse.json({ success: true, fileName, url: `/${fileName}` })
  } catch (err) {
    console.error("Upload error:", err)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
