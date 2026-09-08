import type React from "react"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "Hariprashath B — AI Engineer & Full-Stack Developer",
  description:
    "AI & Data Science student specializing in Generative AI and Agentic AI projects. Explore my portfolio featuring AutoFixHub, Wire EDM simulations, and data-driven solutions.",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Hariprashath B — AI Engineer & Full-Stack Developer",
    description: "Explore my AI and Data Science projects",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "var(--hud-font-body)", background: "var(--hud-bg)" }}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
