"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-6 h-32 flex items-center justify-center md:justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/FIXR Full Black Logo.png"
            alt="Fixr Logo"
            width={234}
            height={59}
            unoptimized={true}
          />
        </Link>
        <nav className="hidden md:flex items-center gap-12">
          <Link 
            href="/#products"
            className="text-lg font-semibold hover:text-accent transition-colors"
          >
            Products
          </Link>
          <Link 
            href="/#team"
            className="text-lg font-semibold hover:text-accent transition-colors"
          >
            Team
          </Link>
          <Link 
            href="/blog"
            className="text-lg font-semibold hover:text-accent transition-colors"
          >
            Blog
          </Link>
          <Link href="/#try-it-yourself">
            <Button 
              size="lg" 
              className="ml-2 bg-accent text-accent-foreground hover:bg-accent/90 hover:shadow-md"
            >
              Try the Demo
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}
