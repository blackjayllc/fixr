"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Zap, Globe, Star, Users, ArrowRight, CheckCircle } from "lucide-react"

export default function Home() {
  const [formData, setFormData] = useState({ name: "", email: "", company: "", phone: "", message: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Demo request:", formData)
    // Handle form submission
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 h-32 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/FIXR Full Black Logo.png"
              alt="Fixr Logo"
              width={360}
              height={90}
              unoptimized={true}
            />
          </div>
          <nav className="hidden md:flex items-center gap-12">
            <a href="#solutions" className="text-lg font-semibold hover:text-accent transition-colors">
              Products
            </a>
            <a href="#team" className="text-lg font-semibold hover:text-accent transition-colors">
              Team
            </a>
            <a href="#demo" className="text-lg font-semibold hover:text-primary transition-colors">
              <Button size="lg" className="ml-2 bg-accent text-accent-foreground hover:bg-accent/90 hover:shadow-md">
                Book a Demo
              </Button>
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 md:py-32 lg:py-40 relative overflow-hidden bg-background">
        <div className="absolute inset-0 bg-grid-pattern" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/10 border border-accent/20 rounded-full mb-8 text-sm font-medium text-accent">
                <Zap className="h-3.5 w-3.5" />
                Blue Collar Automation Starts Here
              </div>
              <h1 className="text-5xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance leading-tight text-foreground">
                AI workflow automation for service businesses
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-10 text-balance leading-relaxed">
                Fixr uses AI to automate the essential processes that keep your service business running smoothly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <Button size="lg" className="text-base h-12 px-8 bg-accent text-accent-foreground hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20">
                  Learn more
                </Button>
                <Button
                  variant="outline"
                  className="text-base h-12 px-8 border-accent/50 text-foreground hover:bg-accent/10 hover:text-foreground hover:border-accent/70 hover:shadow-sm"
                >
                  Book a Demo
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square relative rounded-2xl overflow-hidden border border-accent/20 bg-accent/5">
                <Image
                  src="/professional-hvac-technician-working-on-air-condit.jpg"
                  alt="Professional service technician at work"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 576px) 19vw, (max-width: 768px) 17vw, (max-width: 1024px) 13vw, 8vw"
                  unoptimized={true}
                  onError={(e) => {
                    console.error("Image failed to load:", e)
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-card">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance text-foreground">
              Your Digital Toolbox
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed text-pretty max-w-3xl">
              From AI-powered call answering and professional websites to automated review requests and customer relationship
              management, Fixr replaces spreadsheets with intelligent automation that captures every revenue opportunity.
            </p>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">Our product stack</h2>
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2">
              {/* VoicePilot */}
              <div className="p-8 bg-card">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">Answer every call with AI</h3>
                <p className="text-base text-muted-foreground leading-relaxed mb-6">
                  VoicePilot's AI agents handle customer calls 24/7, answer questions, book appointments, and ensure no
                  revenue opportunity slips through the cracks.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-1" />
                    <span className="text-sm text-muted-foreground">24/7 automated call answering and routing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-1" />
                    <span className="text-sm text-muted-foreground">Intelligent customer inquiry handling</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-1" />
                    <span className="text-sm text-muted-foreground">Automated appointment reminders</span>
                  </li>
                </ul>
              </div>

              {/* WebPilot */}
              <div className="p-8 bg-white">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">Modern websites that convert</h3>
                <p className="text-base text-muted-foreground leading-relaxed mb-6">
                  WebPilot creates professional, mobile-optimized websites for your business with automated SEO, lead
                  capture forms, and service showcase pages.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-1" />
                    <span className="text-sm text-muted-foreground">Professional website templates for service businesses</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-1" />
                    <span className="text-sm text-muted-foreground">Built-in SEO optimization and local search</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-1" />
                    <span className="text-sm text-muted-foreground">Lead capture forms and quote requests</span>
                  </li>
                </ul>
              </div>

              {/* ReviewPilot */}
              <div className="p-8 bg-white">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">Build your 5-star reputation</h3>
                <p className="text-base text-muted-foreground leading-relaxed mb-6">
                  ReviewPilot automates Google review requests after every job, helping you build a strong online rating
                  that attracts more customers.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-1" />
                    <span className="text-sm text-muted-foreground">Automated review requests via text and email</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-1" />
                    <span className="text-sm text-muted-foreground">Smart timing for maximum response rates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-1" />
                    <span className="text-sm text-muted-foreground">Review monitoring and response templates</span>
                  </li>
                </ul>
              </div>

              {/* ClientHub */}
              <div className="p-8 bg-card">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">Manage every customer relationship</h3>
                <p className="text-base text-muted-foreground leading-relaxed mb-6">
                  ClientHub provides centralized CRM support for managing client data, communications, and engagement
                  history to help your team nurture relationships.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-chart-4 shrink-0 mt-1" />
                    <span className="text-sm text-muted-foreground">Centralized customer database</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-chart-4 shrink-0 mt-1" />
                    <span className="text-sm text-muted-foreground">Communication history tracking</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-chart-4 shrink-0 mt-1" />
                    <span className="text-sm text-muted-foreground">Automated follow-up sequences</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">{/* Pricing content here */}</div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Real business results</h2>
            </div>

            <Card className="p-8 md:p-12 bg-background border-border">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground">The Hidden Cost of No Answer</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Trades lose 20 - 30% of potential revenue due to missed calls and unbooked appointments.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2" />
                    <div>
                      <div className="font-bold text-2xl text-red-500 mb-1">$10K-$20K</div>
                      <div className="text-sm text-muted-foreground">
                        Small businesses (1-5 employees) lost per year
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2" />
                    <div>
                      <div className="font-bold text-2xl text-red-500 mb-1">$25K-$60K</div>
                      <div className="text-sm text-muted-foreground">
                        Medium businesses (6-20 employees) lost per year
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/*<div className="border-t border-border pt-8">
                <p className="text-lg text-muted-foreground italic leading-relaxed mb-6">
                  "Before Fixr, we were missing 3-4 calls per day during busy seasons. Now, every call gets answered,
                  scheduled, and followed up automatically. We've recovered over $30K in revenue this year alone."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">JD</span>
                  </div>
                  <div>
                    <div className="font-semibold">John Davis</div>
                    <div className="text-sm text-muted-foreground">Owner, Davis HVAC Solutions</div>
                  </div>
                </div>
              </div>*/}
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Built by experts</h2>
              <p className="text-xl text-muted-foreground">A team dedicated to transforming service businesses</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 md:p-8 text-center hover:shadow-lg transition-all bg-card border-border">
                <div className="w-40 h-[200px] md:w-[180px] md:h-[220px] bg-gradient-to-br from-accent/20 to-accent/5 rounded-lg mx-auto mb-6 flex flex-col overflow-hidden">
                  <div className="h-[12%]"></div>
                  <div className="flex-1 w-full">
                    <Image
                      src="/max.png"
                      alt="Max Svejda"
                      width={180}
                      height={180}
                      className="w-full h-full object-cover rounded-lg"
                      unoptimized={true}
                    />
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-1 text-foreground">Max Svejda</h3>
                <p className="text-lg md:text-xl font-bold text-accent mb-2">Co-Founder, CEO</p>
                <p className="text-lg md:text-xl font-semibold text-muted-foreground leading-tight">
                  Leading product vision and strategy for blue collar automation.
                </p>
              </Card>
              <Card className="p-6 md:p-8 text-center hover:shadow-lg transition-all bg-card border-border">
                <div className="w-40 h-[200px] md:w-[180px] md:h-[220px] bg-gradient-to-br from-accent/20 to-accent/5 rounded-lg mx-auto mb-6 flex flex-col overflow-hidden">
                  <div className="h-[12%]"></div>
                  <div className="flex-1 w-full">
                    <Image
                      src="/michael.png"
                      alt="Michael McCaffrey"
                      width={180}
                      height={180}
                      className="w-full h-full object-cover rounded-lg"
                      unoptimized={true}
                    />
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-1 text-foreground">Michael McCaffrey</h3>
                <p className="text-lg md:text-xl font-bold text-accent mb-2">Co-Founder, COO</p>
                <p className="text-lg md:text-xl font-semibold text-muted-foreground leading-tight">
                  Scaling operations and ensuring customer success.
                </p>
              </Card>
              <Card className="p-6 md:p-8 text-center hover:shadow-lg transition-all bg-card border-border">
                <div className="w-40 h-[200px] md:w-[180px] md:h-[220px] bg-gradient-to-br from-accent/20 to-accent/5 rounded-lg mx-auto mb-6 flex flex-col overflow-hidden">
                  <div className="h-[12%]"></div>
                  <div className="flex-1 w-full">
                    <Image
                      src="/colin.png"
                      alt="Colin Lawless"
                      width={180}
                      height={180}
                      className="w-full h-full object-cover rounded-lg"
                      unoptimized={true}
                    />
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-1 text-foreground">Colin Lawless</h3>
                <p className="text-lg md:text-xl font-bold text-accent mb-2">Co-Founder, CTO</p>
                <p className="text-lg md:text-xl font-semibold text-muted-foreground leading-tight">
                  Building scalable AI infrastructure and automation systems.
                </p>
              </Card>
              <Card className="p-6 md:p-8 text-center hover:shadow-lg transition-all bg-card border-border">
                <div className="w-40 h-[200px] md:w-[180px] md:h-[220px] bg-gradient-to-br from-accent/20 to-accent/5 rounded-lg mx-auto mb-6 flex flex-col overflow-hidden">
                  <div className="h-[12%]"></div>
                  <div className="flex-1 w-full">
                    <Image
                      src="/anthony.png"
                      alt="Anthony Gold"
                      width={180}
                      height={180}
                      className="w-full h-full object-cover rounded-lg"
                      unoptimized={true}
                    />
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-1 text-foreground">Anthony Gold</h3>
                <p className="text-lg md:text-xl font-bold text-accent mb-2">Chief Trade Advisor</p>
                <p className="text-lg md:text-xl font-semibold text-muted-foreground leading-tight">
                  Bringing real-world trade expertise to product development.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Book a Demo Section */}
      <section id="demo" className="py-24 bg-card">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Book a Demo</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                See how Fixr can transform your service business with AI automation
              </p>
            </div>
            <Card className="p-8 md:p-10 bg-background border-border shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2.5">
                    <label htmlFor="name" className="text-sm font-semibold text-foreground block">
                      Name *
                    </label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-card border-border/60 text-foreground h-11 focus-visible:border-accent focus-visible:ring-accent/20"
                    />
                  </div>
                  <div className="space-y-2.5">
                    <label htmlFor="email" className="text-sm font-semibold text-foreground block">
                      Email *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@company.com"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-card border-border/60 text-foreground h-11 focus-visible:border-accent focus-visible:ring-accent/20"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2.5">
                    <label htmlFor="company" className="text-sm font-semibold text-foreground block">
                      Company *
                    </label>
                    <Input
                      id="company"
                      placeholder="ABC Plumbing"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="bg-card border-border/60 text-foreground h-11 focus-visible:border-accent focus-visible:ring-accent/20"
                    />
                  </div>
                  <div className="space-y-2.5">
                    <label htmlFor="phone" className="text-sm font-semibold text-foreground block">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-card border-border/60 text-foreground h-11 focus-visible:border-accent focus-visible:ring-accent/20"
                    />
                  </div>
                </div>
                <div className="space-y-2.5">
                  <label htmlFor="message" className="text-sm font-semibold text-foreground block">
                    Tell us about your business
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your business needs and current challenges..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-card border-border/60 text-foreground resize-none focus-visible:border-accent focus-visible:ring-accent/20"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-12 text-base font-semibold bg-accent text-accent-foreground hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/25 group"
                >
                  Request Demo
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1" />
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-32 bg-gradient-to-br from-accent via-accent/95 to-accent/90 text-accent-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
            Stop losing revenue to missed calls
          </h2>
          <p className="text-xl md:text-2xl mb-10 opacity-90 text-balance max-w-2xl mx-auto">
            Join service businesses already automating with Fixr
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="text-base h-12 px-8 bg-background text-foreground hover:bg-background/90 hover:shadow-lg group"
              onClick={() => document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })}
            >
              Book a Demo
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base h-12 px-8 bg-transparent border-accent-foreground/30 text-accent-foreground hover:bg-accent-foreground/10 hover:border-accent-foreground/50 hover:shadow-sm"
              onClick={() => document.getElementById("solutions")?.scrollIntoView({ behavior: "smooth" })}
            >
              Learn more
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border bg-card">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-bold">F</span>
              </div>
              <span className="font-bold text-foreground">Fixr Solutions</span>
            </div>
            <div className="text-sm text-muted-foreground">© 2025 Fixr Solutions. All rights reserved.</div>
            <div className="text-sm font-medium">
              <a href="mailto:info@fixrsolutions.com" className="text-foreground hover:text-accent transition-colors">
                info@fixrsolutions.com
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
