import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Project Details | Hari Prashath",
  description: "Detailed view of my AI and Data Science projects",
}

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
