export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  author: string
  readTime: string
  content: string
  published: boolean
}

// Images for blog posts should be stored in: /public/blog/{slug}/
// Example: /public/blog/how-trades-lose-jobs-before-work-starts/image1.jpg
// In your content, reference them as: ![Alt text](/blog/how-trades-lose-jobs-before-work-starts/image1.jpg)

export const blogPosts: BlogPost[] = [
  {
    slug: "how-trades-lose-jobs-before-work-starts",
    title: "How Trades Lose Jobs Before the Work Even Starts",
    excerpt: "If you're working in a trade, missed calls are missed jobs. It's that simple. Learn how Fixr Solutions helps skilled trade businesses capture every opportunity.",
    date: "2025-01-08",
    author: "Fixr Team",
    readTime: "4 min read",
    published: true,
    content: `
If you are working in a trade, missed calls are missed jobs. It is that simple.

Fixr Solutions is built because too many skilled trade businesses lose real revenue every day, not because they are bad at their work, but because they cannot keep up with demand or don't have the systems in place to capture it consistently.

## Missed Calls Are Killing Growth

Most trade businesses don't lose jobs because of low skill. They lose them because a competitor has a better website, or because calls, forms, and inquiries go unanswered.

A homeowner or property owner calls once. If no one answers, they move on.

Fixr Solutions leverages automation and AI-driven workflows to make sure every call, form, and inquiry is captured and followed up on immediately.

![Fixr Solutions](/blog/how-trades-lose-jobs-before-work-starts/image1.webp)

**This is not about replacing people. It is about making sure demand does not outpace your ability to respond.**

## Website Optimization That Actually Captures Demand

For most trade businesses, the website is the front door. The problem is that it rarely tells you who walked in, where they came from, or why they left.

Fixr Solutions treats websites and landing pages as operational tools, not just marketing assets.

We optimize and build landing pages that capture demand as it emerges. Every click, call, and form submission is tracked and attributed to its source, giving you clear visibility into what drives real leads and what wastes time and money.

## What Fixr Solutions Delivers at Launch

Fixr Solutions isn't a generic marketing agency. We act as a hands-on partner for trades that want more control over their growth.

Our launch services include:

- Google Review Builder / Rep Management Automation
- AI voice pilot
- AI chatbot
- Automated Scheduling / Dispatch / Route Automation
- Invoice Automation
- CRM Pipeline Automation
- Lead Generation Automation

![Fixr Solutions](/blog/how-trades-lose-jobs-before-work-starts/image2.webp)

Everything is built around one outcome: **More qualified jobs with fewer missed opportunities.**

Our landing pages are built to:

- Capture calls and inquiries even when no one is available
- Track exactly where each lead originated
- Identify which campaigns and platforms are performing
- Feed clean data directly into CRM and automation workflows

This data allows Fixr Solutions to automate follow-ups, scheduling, and lead routing without losing context. Instead of guessing which marketing efforts work, trades can make decisions based on real performance and real jobs booked.

## Meet the Fixrs

**Max Svejda** serves as the CEO. With extensive experience in sales and business development, Max has a proven track record of building and scaling teams, driving operational efficiency, and delivering results for businesses.

**Colin Lawless, Co-Founder & CTO**, builds the systems that keep everything running reliably. Has hands-on experience developing custom software and websites, managing complex projects, and building tools that automate and track data across various platforms. He has led software and data integration projects at Blackjay, which he founded, and has built scalable systems that help businesses operate more efficiently.

**Michael McCaffrey, Co-Founder & COO**, started in the trades as a laborer, giving firsthand insight into the challenges tradespeople face. Later built four years of experience in FinTech, leading business development. He has extensive experience building brands, growing social media presence, streamlining processes, and capturing more opportunities for businesses.

**Anthony Gold, Chief Trade Advisor (CTA)**, brings over a decade of trade experience and operational insight from time in the field. He has owned and managed multiple construction and demolition businesses, including Valley Demolition and Modern Build LLC, where he oversaw projects, managed vendors, and ensured operational excellence. His deep understanding of trade workflows and client needs helps Fixr Solutions build systems that actually work for tradespeople.

## Capture the Work You Are Already Earning

The calls are coming in.

The clicks are happening.

The work is there.

**Fixr Solutions ensures you don't miss it.**

[Book a consultation](/#consultation) to see how Fixr Solutions can help your business capture more leads, respond faster, and turn demand into booked jobs.

You can also reach out by email to start the conversation at [max@fixrsolutions.com](mailto:max@fixrsolutions.com) or visit us at [fixrsolutions.com](https://fixrsolutions.com).
    `.trim(),
  },
]

export function getBlogPosts() {
  return blogPosts.filter(post => post.published)
}

export function getBlogPost(slug: string) {
  return blogPosts.find(post => post.slug === slug && post.published)
}
