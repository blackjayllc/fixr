"use client"

import type React from "react"

import { useState } from "react"
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
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-accent-foreground font-bold">F</span>
            </div>
            <span className="text-xl font-bold text-foreground">Fixr</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#solutions" className="text-sm font-medium hover:text-primary transition-colors">
              Solutions
            </a>
            <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </a>
            <a href="#team" className="text-sm font-medium hover:text-primary transition-colors">
              Team
            </a>
            <a href="#demo" className="text-sm font-medium hover:text-primary transition-colors">
              <Button size="sm" className="ml-2">
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
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance leading-tight text-foreground">
                AI workflow automation for service businesses
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-10 text-balance leading-relaxed">
                Fixr enables service teams to automate the processes that keep business running, with AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <Button size="lg" className="text-base h-12 px-8 bg-accent text-accent-foreground hover:bg-accent/90">
                  Learn more
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base h-12 px-8 bg-transparent border-accent/50 text-foreground hover:bg-accent/10"
                >
                  Book a Demo
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square relative rounded-2xl overflow-hidden border border-accent/20">
                <img
                  src="/professional-hvac-technician-working-on-air-condit.jpg"
                  alt="Professional service technician at work"
                  className="object-cover w-full h-full"
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
              Your new business command center
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed text-pretty max-w-3xl">
              Still managing calls in spreadsheets and losing revenue? With Fixr, you can automate end-to-end processes
              that handle customer calls, job scheduling, invoicing, and follow-ups.
            </p>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto space-y-32">
            {/* VoicePilot */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 text-primary rounded-xl mb-6">
                  <Phone className="h-7 w-7" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4">Answer every call with AI</h3>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  VoicePilot's AI agents handle customer calls 24/7, answer questions, book appointments, and ensure no
                  revenue opportunity slips through the cracks.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-1" />
                    <span className="text-muted-foreground">24/7 automated call answering and routing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-1" />
                    <span className="text-muted-foreground">Intelligent customer inquiry handling</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-1" />
                    <span className="text-muted-foreground">Automated appointment reminders</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-12 border border-primary/10 flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                  <Phone className="h-24 w-24 text-accent/60 mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground">VoicePilot Interface</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl p-12 border border-accent/20 flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                  <Globe className="h-24 w-24 text-accent/60 mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground">WebPilot Dashboard</p>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-accent/10 text-accent rounded-xl mb-6">
                  <Globe className="h-7 w-7" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Modern websites that convert</h3>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  WebPilot creates professional, mobile-optimized websites for your business with automated SEO, lead
                  capture forms, and service showcase pages.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-1" />
                    <span className="text-muted-foreground">Professional website templates for service businesses</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-1" />
                    <span className="text-muted-foreground">Built-in SEO optimization and local search</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-1" />
                    <span className="text-muted-foreground">Lead capture forms and quote requests</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center justify-center w-14 h-14 bg-chart-3/20 text-accent rounded-xl mb-6">
                  <Star className="h-7 w-7" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Build your 5-star reputation</h3>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  ReviewPilot automates Google review requests after every job, helping you build a strong online rating
                  that attracts more customers.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-1" />
                    <span className="text-muted-foreground">Automated review requests via text and email</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-1" />
                    <span className="text-muted-foreground">Smart timing for maximum response rates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-1" />
                    <span className="text-muted-foreground">Review monitoring and response templates</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl p-12 border border-accent/20 flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-12 w-12 text-accent fill-accent" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">ReviewPilot System</p>
                </div>
              </div>
            </div>

            {/* ClientHub */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 bg-gradient-to-br from-chart-4/5 to-chart-4/10 rounded-2xl p-12 border border-chart-4/10 flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                  <Users className="h-24 w-24 text-chart-4/40 mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground">ClientHub CRM</p>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-chart-4/10 text-chart-4 rounded-xl mb-6">
                  <Users className="h-7 w-7" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4">Manage every customer relationship</h3>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  ClientHub provides centralized CRM support for managing client data, communications, and engagement
                  history to help your team nurture relationships.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-chart-4 shrink-0 mt-1" />
                    <span className="text-muted-foreground">Centralized customer database</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-chart-4 shrink-0 mt-1" />
                    <span className="text-muted-foreground">Communication history tracking</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-chart-4 shrink-0 mt-1" />
                    <span className="text-muted-foreground">Automated follow-up sequences</span>
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
                    Service businesses lose 20–30% of potential revenue due to missed calls and unbooked appointments.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2" />
                    <div>
                      <div className="font-bold text-2xl text-accent mb-1">$10K–$20K</div>
                      <div className="text-sm text-muted-foreground">
                        Small businesses (1-5 employees) lost per year
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2" />
                    <div>
                      <div className="font-bold text-2xl text-accent mb-1">$25K–$60K</div>
                      <div className="text-sm text-muted-foreground">
                        Medium businesses (6-20 employees) lost per year
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-8">
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
              </div>
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
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
              <Card className="p-8 text-center hover:shadow-lg transition-all bg-card border-border">
                <div className="w-24 h-24 bg-gradient-to-br from-accent/20 to-accent/5 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl font-bold text-accent">MS</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground">Max Svejda</h3>
                <p className="text-sm text-accent mb-3">Co-Founder, CEO</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Leading product vision and strategy for blue collar automation.
                </p>
              </Card>
              <Card className="p-8 text-center hover:shadow-lg transition-all bg-card border-border">
                <div className="w-24 h-24 bg-gradient-to-br from-accent/20 to-accent/5 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl font-bold text-accent">CL</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground">Colin Lawless</h3>
                <p className="text-sm text-accent mb-3">Co-Founder, CTO</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Building scalable AI infrastructure and automation systems.
                </p>
              </Card>
              <Card className="p-8 text-center hover:shadow-lg transition-all bg-card border-border">
                <div className="w-24 h-24 bg-gradient-to-br from-accent/20 to-accent/5 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl font-bold text-accent">MM</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground">Michael McCaffrey</h3>
                <p className="text-sm text-accent mb-3">Co-Founder, COO</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Scaling operations and ensuring customer success.
                </p>
              </Card>
              <Card className="p-8 text-center hover:shadow-lg transition-all bg-card border-border">
                <div className="w-24 h-24 bg-gradient-to-br from-accent/20 to-accent/5 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl font-bold text-accent">AG</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground">Anthony Gold</h3>
                <p className="text-sm text-accent mb-3">Chief Trade Advisor</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
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
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Book a Demo</h2>
              <p className="text-xl text-muted-foreground">
                See how Fixr can transform your service business with AI automation
              </p>
            </div>
            <Card className="p-8 bg-background border-border">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">
                      Name *
                    </label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-card border-border text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                      Email *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@company.com"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-card border-border text-foreground"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="company" className="text-sm font-medium text-foreground">
                      Company *
                    </label>
                    <Input
                      id="company"
                      placeholder="ABC Plumbing"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="bg-card border-border text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-foreground">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-card border-border text-foreground"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">
                    Tell us about your business
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your business needs and how many calls you receive daily..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-card border-border text-foreground resize-none"
                  />
                </div>
                <Button type="submit" size="lg" className="w-full">
                  Request Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
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
              className="text-base h-12 px-8 bg-background text-foreground hover:bg-background/90"
              onClick={() => document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })}
            >
              Book a Demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base h-12 px-8 bg-transparent border-accent-foreground/30 text-accent-foreground hover:bg-accent-foreground/10"
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
