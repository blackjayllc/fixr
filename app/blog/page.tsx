import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Calendar, Clock } from "lucide-react"
import { getBlogPosts } from "@/lib/blog-posts"
import { Navbar } from "@/components/navbar"

export const metadata = {
  title: "Blog | Fixr Solutions",
  description: "Insights and updates on blue collar automation, AI technology, and business growth strategies for trade businesses.",
  keywords: "blue collar automation, trade business blog, AI for contractors, HVAC automation, plumbing software, contractor CRM",
  openGraph: {
    title: "Blog | Fixr Solutions",
    description: "Insights and updates on blue collar automation, AI technology, and business growth strategies for trade businesses.",
    url: "https://fixrsolutions.com/blog",
    siteName: "Fixr Solutions",
    type: "website",
    images: [
      {
        url: "/FIXR Full Black Logo.png",
        width: 1200,
        height: 630,
        alt: "Fixr Solutions Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Fixr Solutions",
    description: "Insights and updates on blue collar automation, AI technology, and business growth strategies for trade businesses.",
    images: ["/FIXR Full Black Logo.png"],
  },
}

export default function BlogPage() {
  const posts = getBlogPosts()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-accent/10 via-accent/5 to-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
              Fixr Blog
            </h1>
            <p className="text-xl text-muted-foreground">
              Insights on automation, AI technology, and growth strategies for blue collar businesses
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-muted-foreground">No blog posts yet. Check back soon!</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <Card key={post.slug} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4" />
                          {new Date(post.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4" />
                          {post.readTime}
                        </div>
                      </div>
                      
                      <h2 className="text-2xl font-bold mb-3 text-foreground line-clamp-2">
                        {post.title}
                      </h2>
                      
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground">
                          By {post.author}
                        </span>
                        <Link href={`/blog/${post.slug}`}>
                          <Button 
                            variant="ghost" 
                            className="group text-accent hover:text-accent hover:bg-accent/10"
                          >
                            Read more
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-accent via-accent/95 to-accent/90 text-accent-foreground">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to automate your business?
          </h2>
          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
            See how Fixr can help you capture every revenue opportunity
          </p>
          <Link href="/#consultation">
            <Button
              size="lg"
              variant="secondary"
              className="text-base h-12 px-8 bg-background text-foreground hover:bg-background/90 hover:shadow-lg group"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border bg-card">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/FIXR Full Black Logo.png"
                alt="Fixr Logo"
                width={360}
                height={90}
                unoptimized={true}
                className="h-32 w-auto"
              />
            </Link>
            <div className="text-sm text-muted-foreground">© 2025 Fixr Solutions. All rights reserved.</div>
            <div className="text-sm font-medium">
              <a href="mailto:contact@fixrsolutions.com" className="text-foreground hover:text-accent transition-colors">
                contact@fixrsolutions.com
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
