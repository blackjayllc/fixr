import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"
import { getBlogPost, getBlogPosts } from "@/lib/blog-posts"
import { Navbar } from "@/components/navbar"

export async function generateStaticParams() {
  const posts = getBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPost(slug)
  
  if (!post) {
    return {
      title: "Post Not Found | Fixr Solutions",
    }
  }

  return {
    title: `${post.title} | Fixr Solutions Blog`,
    description: post.excerpt,
    keywords: "blue collar automation, trade business, AI automation, missed calls, contractor software, lead generation",
    authors: [{ name: post.author }],
    openGraph: {
      title: `${post.title} | Fixr Solutions Blog`,
      description: post.excerpt,
      url: `https://fixrsolutions.com/blog/${slug}`,
      siteName: "Fixr Solutions",
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: "/FIXR Full Black Logo.png",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Fixr Solutions Blog`,
      description: post.excerpt,
      images: ["/FIXR Full Black Logo.png"],
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    notFound()
  }

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": post.date,
    "author": {
      "@type": "Organization",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Fixr Solutions",
      "logo": {
        "@type": "ImageObject",
        "url": "https://fixrsolutions.com/FIXR Full Black Logo.png"
      }
    }
  }

  // Helper function to process inline markdown (bold text and links)
  const processInlineMarkdown = (text: string) => {
    const parts: (string | JSX.Element)[] = []
    let currentText = text
    let key = 0

    // Process both links [text](url) and bold **text**
    const combinedRegex = /(\[([^\]]+)\]\(([^)]+)\))|(\*\*([^*]+)\*\*)/g
    let match
    let lastIndex = 0

    while ((match = combinedRegex.exec(text)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index))
      }

      // Check if it's a link or bold
      if (match[1]) {
        // It's a link [text](url)
        const linkText = match[2]
        const linkUrl = match[3]
        parts.push(
          <a
            key={key++}
            href={linkUrl}
            className="text-accent hover:text-accent/80 underline font-medium transition-colors"
            target={linkUrl.startsWith('http') ? '_blank' : undefined}
            rel={linkUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            {linkText}
          </a>
        )
      } else if (match[4]) {
        // It's bold **text**
        const boldText = match[5]
        parts.push(<strong key={key++} className="font-bold text-foreground">{boldText}</strong>)
      }

      lastIndex = match.index + match[0].length
    }
    
    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex))
    }
    
    return parts.length > 0 ? parts : text
  }

  // Simple markdown-to-HTML converter for basic formatting
  const formatContent = (content: string) => {
    return content
      .split('\n\n')
      .map((paragraph, index) => {
        // Images - format: ![alt text](image-path)
        const imageMatch = paragraph.match(/^!\[(.*?)\]\((.*?)\)$/)
        if (imageMatch) {
          const [, altText, imagePath] = imageMatch
          return (
            <div key={index} className="my-8">
              <Image
                src={imagePath}
                alt={altText}
                width={1200}
                height={600}
                className="rounded-lg w-full h-auto"
                unoptimized={true}
              />
            </div>
          )
        }

        // Headers
        if (paragraph.startsWith('# ')) {
          return <h1 key={index} className="text-4xl md:text-5xl font-bold mb-6 text-foreground">{processInlineMarkdown(paragraph.replace('# ', ''))}</h1>
        }
        if (paragraph.startsWith('## ')) {
          return <h2 key={index} className="text-3xl md:text-4xl font-bold mb-4 mt-12 text-foreground">{processInlineMarkdown(paragraph.replace('## ', ''))}</h2>
        }
        if (paragraph.startsWith('### ')) {
          return <h3 key={index} className="text-2xl md:text-3xl font-bold mb-3 mt-8 text-foreground">{processInlineMarkdown(paragraph.replace('### ', ''))}</h3>
        }
        
        // Lists
        if (paragraph.includes('\n- ') || paragraph.startsWith('- ')) {
          const items = paragraph.split('\n').filter(line => line.trim().startsWith('- '))
          return (
            <ul key={index} className="list-disc list-inside space-y-2 mb-6 text-muted-foreground">
              {items.map((item, i) => (
                <li key={i} className="ml-4">{processInlineMarkdown(item.replace('- ', ''))}</li>
              ))}
            </ul>
          )
        }
        
        // Regular paragraphs
        return (
          <p key={index} className="text-lg text-muted-foreground leading-relaxed mb-6">
            {processInlineMarkdown(paragraph)}
          </p>
        )
      })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Header */}
      <Navbar />

      {/* Back Button */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <Link href="/blog">
              <Button variant="ghost" className="group text-muted-foreground hover:text-foreground">
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Article Header */}
      <section className="py-12 bg-gradient-to-br from-accent/10 via-accent/5 to-background">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>
                  {new Date(post.date).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto prose prose-lg">
            {formatContent(post.content)}
          </div>
        </div>
      </article>

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
              className="text-base h-12 px-8 bg-background text-foreground hover:bg-background/90 hover:shadow-lg"
            >
              Get Started
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
