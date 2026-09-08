import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { Resend } from "resend"

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey || apiKey === "re_your_api_key_here") {
      console.error("RESEND_API_KEY is not configured")
      return NextResponse.json(
        { error: "Email service not configured. Please add RESEND_API_KEY to environment variables." },
        { status: 503 }
      )
    }

    const { name, email, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    const resend = new Resend(apiKey)

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["hariprashath321@gmail.com"],
      subject: `New Contact Form Message from ${name}`,
      reply_to: email,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #0f172a; color: #e2e8f0; border-radius: 12px;">
          <h2 style="color: #60a5fa; margin-bottom: 24px; font-size: 24px;">📬 New Message from Your Portfolio</h2>
          
          <div style="background: #1e293b; border-radius: 8px; padding: 20px; margin-bottom: 16px; border-left: 4px solid #60a5fa;">
            <p style="margin: 0 0 8px; color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Name</p>
            <p style="margin: 0; font-size: 18px; font-weight: 600; color: #f1f5f9;">${name}</p>
          </div>
          
          <div style="background: #1e293b; border-radius: 8px; padding: 20px; margin-bottom: 16px; border-left: 4px solid #60a5fa;">
            <p style="margin: 0 0 8px; color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Email</p>
            <a href="mailto:${email}" style="margin: 0; font-size: 16px; color: #60a5fa; text-decoration: none;">${email}</a>
          </div>
          
          <div style="background: #1e293b; border-radius: 8px; padding: 20px; margin-bottom: 24px; border-left: 4px solid #60a5fa;">
            <p style="margin: 0 0 8px; color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Message</p>
            <p style="margin: 0; font-size: 16px; line-height: 1.6; white-space: pre-wrap; color: #f1f5f9;">${message}</p>
          </div>
          
          <div style="text-align: center; padding-top: 20px; border-top: 1px solid #334155;">
            <p style="color: #64748b; font-size: 12px;">Sent from <a href="https://hari-prashath.vercel.app" style="color: #60a5fa; text-decoration: none;">hari-prashath.vercel.app</a></p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error("Resend API error:", JSON.stringify(error))
      return NextResponse.json({ error: `Failed to send email: ${error.message}` }, { status: 500 })
    }

    console.log("Email sent successfully, id:", data?.id)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Contact route error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
