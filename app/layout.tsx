import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Hari Prashath - AI & Data Science Portfolio",
  description:
    "AI & Data Science student specializing in Generative AI and Agentic AI projects. Explore my portfolio featuring AutoFixHub, Wire EDM simulations, and data-driven solutions.",

  icons: {
    icon: "/logo.jpg",
  },
  openGraph: {
    title: "Hari Prashath - AI & Data Science Portfolio",
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
      <body className={`font-sans antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
