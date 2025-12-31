import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "sonner"
import { PortalCleanup } from "@/components/portal-cleanup"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Fixr Solutions - Blue Collar Automation Starts Here",
  description:
    "AI-powered automation for HVAC, plumbing, electrical, and contracting businesses. Automate calls, scheduling, invoicing, and follow-ups.",
  generator: "v0.app",
  keywords:
    "HVAC software, plumbing automation, electrical business tools, contractor CRM, service business automation",
  icons: {
    icon: [
      {
        url: "/FIXR Orange F Logo.ico",
        type: "image/x-icon",
      },
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
        <Toaster />
        <PortalCleanup />
      </body>
    </html>
  )
}
