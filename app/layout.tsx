import type React from "react"
import type { Metadata } from "next"
import { Inter, Caveat } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat" })

export const metadata: Metadata = {
  title: "Vendor Management System",
  description: "Comprehensive vendor tracking and management platform",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${caveat.variable} bg-texture`}>{children}</body>
    </html>
  )
}
