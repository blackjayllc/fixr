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
  metadataBase: new URL('https://fixrsolutions.com'),
  title: "Fixr Solutions - Blue Collar Automation Starts Here",
  description:
    "AI-powered automation for HVAC, plumbing, electrical, and contracting businesses. Automate calls, scheduling, invoicing, and follow-ups.",
  keywords:
    "HVAC software, plumbing automation, electrical business tools, contractor CRM, service business automation",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Fixr Solutions - Blue Collar Automation Starts Here",
    description:
      "AI-powered automation for HVAC, plumbing, electrical, and contracting businesses. Automate calls, scheduling, invoicing, and follow-ups.",
    images: [
      {
        url: "/FIXR Full Black Logo.png",
        width: 1200,
        height: 630,
        alt: "Fixr Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fixr Solutions - Blue Collar Automation Starts Here",
    description:
      "AI-powered automation for HVAC, plumbing, electrical, and contracting businesses. Automate calls, scheduling, invoicing, and follow-ups.",
    images: ["/FIXR Full Black Logo.png"],
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
