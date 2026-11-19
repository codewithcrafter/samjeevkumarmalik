const fs = require('fs');
const path = require('path');

// Ensure content directory exists
if (!fs.existsSync('content')) fs.mkdirSync('content', { recursive: true });
if (!fs.existsSync('content/services')) fs.mkdirSync('content/services', { recursive: true });
if (!fs.existsSync('content/blogs')) fs.mkdirSync('content/blogs', { recursive: true });

function stripHtml(html) {
  if (!html) return '';
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<li[^>]*>/gi, '- ')
    .replace(/<\/li>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function parseTable(tableHtml) {
  const rows = [...tableHtml.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)];
  if (rows.length === 0) return '';
  
  let md = '';
  rows.forEach((r, idx) => {
    const cells = [...r[1].matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/gi)].map(m => stripHtml(m[1]).replace(/\n/g, ' '));
    if (cells.length > 0) {
      md += '| ' + cells.join(' | ') + ' |\n';
      if (idx === 0) {
        md += '| ' + cells.map(() => '---').join(' | ') + ' |\n';
      }
    }
  });
  return md;
}

// 1. PROCESS ABOUT PAGE
function generateAboutMd() {
  const html = fs.readFileSync('about-sanjeev-kumar-malik.html', 'utf-8');
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || 'About Sanjeev Kumar Malik';
  const desc = html.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i)?.[1] || '';

  const md = `---
title: "${title.replace(/"/g, '\\"')}"
description: "${desc.replace(/"/g, '\\"')}"
url: "https://sanjeevkumarmalik.in/about-sanjeev-kumar-malik"
author: "Sanjeev Kumar Malik"
role: "Principal Full-Stack Web Development Architect & Founder"
experience: "15+ Years (2009 – Present)"
websites_delivered: "1,700+"
headquarters: "Delhi NCR, India"
phone: "+91 97186 04362"
email: "info@sanjeevkumarmalik.in"
---

# About Sanjeev Kumar Malik — Founder & Web Development Expert in Delhi

> **FULL-STACK ARCHITECT • LEADERSHIP PROFILE**  
> Fifteen years of building revenue-driven websites for businesses that want one accountable person, not a chain of account managers. Talk to the founder directly.

---

## Lead Architect Profile

Sanjeev Kumar Malik is a full-stack web developer who has spent 15 years building websites for businesses across different industries. As a web development expert in Delhi, he has personally planned, coded and delivered more than 1,700 projects, working in HTML, CSS, JavaScript, React, Node.js and Next.js, along with WordPress and Shopify builds and Angular or PHP applications whenever a project calls for them.

Every site that comes through his studio is built with search in mind from the first wireframe. Clean code, a sensible URL structure and fast-loading pages are part of the build itself, never something patched on after launch.

When you hire a web development expert in Delhi who works without a middle layer, you get answers from the person who actually scopes, writes and reviews your project, not from a support ticket queue.

### Verified Key Metrics
- **15+ Years Experience:** Continuous production engineering across Delhi NCR since 2009.
- **1,700+ Websites Delivered:** Startups, D2C brands, and high-revenue enterprises.
- **100% Direct Founder Access:** Direct technical ownership with zero junior developer handoffs.
- **98% On-Time Delivery:** Milestone-driven sprint velocity with predictable delivery.

---

## 15 Years in the Trenches

*See how a web development expert in Delhi moved from basic LAMP servers to fast headless builds that load in under a second.*

### 01 · 2009 – 2013: The Foundation — Core Architecture & LAMP Stack
- **Narrative:** Started with core PHP, semantic HTML, CSS and JavaScript, tuning MySQL queries and server-side speed. Built custom website development projects, database-driven online stores and hand-coded layouts that held up in every browser of that era, ending the period with 400+ websites delivered.
- **Competencies:** \`LAMP Stack\` | \`MySQL Optimisation\` | \`Cross-Browser Builds\` | \`400+ Custom Websites\`

### 02 · 2014 – 2018: Enterprise CMS & Custom WordPress Engineering
- **Narrative:** Moved into custom themes, in-house plugins and Magento, then high-traffic WooCommerce stores with secure payment gateways. WordPress development services became the heart of the studio, and the 500+ site mark was crossed during these years.
- **Competencies:** \`Enterprise WordPress\` | \`Custom Plugins\` | \`WooCommerce Integration\` | \`500+ Milestone\`

### 03 · 2019 – 2022: Modern JavaScript, MERN Stack & SaaS Applications
- **Narrative:** Shifted to React, Node.js, Express and MongoDB, building web apps, client dashboards and microservices that run on live data. More than 1,200 projects were delivered, including real-time dashboards for funded startups.
- **Competencies:** \`React & Node.js\` | \`MERN / MEAN Stack\` | \`REST & GraphQL APIs\` | \`1,200+ Milestone\`

### 04 · 2023 – Present: Next.js, Headless Architecture & High-Conversion CRO
- **Narrative:** Building headless platforms on the Next.js App Router with TypeScript and Tailwind CSS, plus headless Shopify and edge delivery. Pages load in under a second and carry structured data for AI search. Over 1,700 sites are now live, and Next.js development is where most new briefs begin.
- **Competencies:** \`Next.js 15 App Router\` | \`Headless Shopify & WP\` | \`AI-Search Schema\` | \`1,700+ Verified Flagships\`

---

## Agency Model vs Sanjeev’s Standard: Why Direct Founder Architecture Wins

| Parameter | The Typical Agency Model | Sanjeev's Direct Standard |
| :--- | :--- | :--- |
| **Accountability & Handoffs** | **Layered Handoffs:** Your brief travels from sales to a project manager to a junior developer, and details get lost along the way. | **One Accountable Developer:** You speak with the web development expert in Delhi writing the code, from kickoff to launch day. |
| **Codebase & Tech Stack** | **Bloated Page Builders:** Generic builders patched with 45+ unchecked plugins, leading to 8-second loads and open security gaps. | **Zero Bloat & Custom Stacks:** Lean, production-grade custom builds that do not break when third-party updates land. Sub-0.8s loads and 100% IP ownership. |
| **Search Engine Optimization** | **Surface-Level Plugin Slapping:** SEO treated as an afterthought with third-party tags and broken redirects. | **Semantic, Search-Ready Code:** Clean HTML, JSON-LD structured data and hierarchical URLs built into the repository from day one. |
| **Billing & Invoicing** | **Hidden Post-Launch Invoicing:** Vague scopes turn into surprise charges for basic tweaks, mobile fixes and speed work. | **Transparent Milestone Pricing:** Clear deliverables, upfront costs, and zero surprise fees. |

---

## Plan Your Architecture Directly With Sanjeev

Book an upfront discovery session with a web development expert in Delhi. No sales pitch, just clear milestone roadmaps and transparent pricing.

- **Founder:** Sanjeev Kumar Malik
- **Phone / WhatsApp:** [+91 97186 04362](tel:+919718604362)
- **Email:** [info@sanjeevkumarmalik.in](mailto:info@sanjeevkumarmalik.in)
- **Location:** Delhi NCR (Saket, Hauz Khas, Malviya Nagar, Dwarka, Rohini, Gurugram, Noida)
- **Direct Consultation:** [https://sanjeevkumarmalik.in/contact-us](https://sanjeevkumarmalik.in/contact-us)
`;

  fs.writeFileSync('about-sanjeev-kumar-malik.md', md);
  fs.writeFileSync('content/about-sanjeev-kumar-malik.md', md);
  console.log('✓ Created about-sanjeev-kumar-malik.md');
}

// 2. PROCESS CONTACT US PAGE
function generateContactMd() {
  const html = fs.readFileSync('contact-us.html', 'utf-8');
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || 'Contact Us | Sanjeev Kumar Malik';
  const desc = html.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i)?.[1] || '';

  const md = `---
title: "${title.replace(/"/g, '\\"')}"
description: "${desc.replace(/"/g, '\\"')}"
url: "https://sanjeevkumarmalik.in/contact-us"
author: "Sanjeev Kumar Malik"
role: "Principal Full-Stack Web Development Architect"
headquarters: "Delhi NCR, India"
response_time: "< 4 Hours"
phone: "+91 97186 04362"
email: "info@sanjeevkumarmalik.in"
alternate_email: "info@sanjeevmalik.dev"
---

# Contact Sanjeev Kumar Malik — Direct Founder Consultation

> **< 4 HOURS RESPONSE TIME • 100% DIRECT FOUNDER REVIEW • DELHI NCR**  
> Book an Architecture Session & Start Your Project. Connect directly with veteran architect Sanjeev Kumar Malik. Zero intermediate account managers, zero sales fluff — just straightforward technical planning, transparent scopes, and sub-second execution.

---

## Direct Communication Channels

- **Primary Phone & WhatsApp:** [+91 97186 04362](tel:+919718604362) (Immediate direct response)
- **Primary Technical Email:** [info@sanjeevkumarmalik.in](mailto:info@sanjeevkumarmalik.in)
- **Engineering Desk Email:** [info@sanjeevmalik.dev](mailto:info@sanjeevmalik.dev)
- **Direct WhatsApp Chat:** [https://wa.me/919718604362](https://wa.me/919718604362)
- **Regional Discovery Hubs:** Delhi NCR (Saket, Hauz Khas, Malviya Nagar, Green Park, GK, Dwarka, Rohini, Gurugram Cyber City, Noida Expressway)

---

## Consultation Scope & What to Expect

1. **Direct Founder Review:** You will speak directly with Sanjeev Kumar Malik, Senior Full-Stack Architect with 15+ years of experience and 1,700+ delivered websites. No sales reps, no junior developers.
2. **Transparent Architectural Audit:** We analyze your functional requirements, existing tech stack, database scalability, and Core Web Vitals speed bottlenecks.
3. **Fixed Milestone Scope:** Every project receives a written statement of work with exact sprint deliverables, timeline, and fixed milestone pricing with zero surprise invoices.
4. **Strict Confidentiality:** Comprehensive NDA and IP protection assured from day one.

---

## Services Available for Direct Booking

- **Custom WordPress Development:** Bespoke Gutenberg block themes and proprietary PHP plugins without Elementor bloat.
- **E-Commerce Store Engineering:** Shopify Liquid, WooCommerce high-SKU catalogs, headless commerce, Razorpay/UPI checkout.
- **Custom Web Applications:** Laravel, Node.js, React, and Next.js internal portals, SaaS platforms, and booking engines.
- **Website Redesign & Speed Optimization:** 100% 301 SEO ranking preservation, sub-0.8s mobile LCP guarantee.
- **Landing Page Design & Development:** High-velocity Google/Meta ad funnels with WhatsApp and CRM integration.
- **UI/UX Design Systems:** Mobile-first, WCAG 2.2 accessible interfaces with 1:1 Figma-to-CSS tokens.
- **Web Development for Startups & SMEs:** Rapid 3-4 week MVP builds, zero technical debt, venture-ready codebases.

---

## Direct Founder Intake

To schedule a dedicated architecture session:
- **Online Booking:** [https://sanjeevkumarmalik.in/contact-us](https://sanjeevkumarmalik.in/contact-us)
- **Office Location:** Delhi NCR, India
`;

  fs.writeFileSync('contact-us.md', md);
  fs.writeFileSync('content/contact-us.md', md);
  console.log('✓ Created contact-us.md');
}

// 3. PROCESS ALL 7 SERVICE PAGES
const serviceList = [
  'wordpress-web-development',
  'ecommerce-website-development',
  'custom-web-application-development',
  'website-redesign-speed-optimization',
  'landing-page-design-development',
  'ui-ux-design-services',
  'web-development-for-startups-smes'
];

function generateServicesMd() {
  serviceList.forEach(slug => {
    const filePath = `services/${slug}.html`;
    if (!fs.existsSync(filePath)) return;
    const html = fs.readFileSync(filePath, 'utf-8');

    const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || '';
    const desc = html.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i)?.[1] || '';
    const h1 = stripHtml(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || '');
    const eyebrow = stripHtml(html.match(/<div class="section-eyebrow">([\s\S]*?)<\/div>/i)?.[1] || '');
    const leadP = stripHtml(html.match(/<p class="section-description"[^>]*>([\s\S]*?)<\/p>/i)?.[1] || '');

    // Extract table
    const tableMatch = html.match(/<table[\s\S]*?<\/table>/i);
    const tableMd = tableMatch ? parseTable(tableMatch[0]) : '';

    // Extract FAQs
    const faqItems = [...html.matchAll(/<div class="faq-item[\s\S]*?<button[^>]*>([\s\S]*?)<\/button>[\s\S]*?<div class="faq-answer">([\s\S]*?)<\/div>/gi)];
    let faqsMd = '';
    if (faqItems.length > 0) {
      faqsMd = '## Frequently Asked Questions\n\n' + faqItems.map((f, i) => {
        const q = stripHtml(f[1]).replace(/^[0-9.]+\s*/, '');
        const a = stripHtml(f[2]);
        return `### Q${i+1}: ${q}\n\n${a}\n`;
      }).join('\n');
    }

    // Extract channels / pillars
    const channels = [...html.matchAll(/<div class="channel-card">[\s\S]*?<h3[^>]*>([\s\S]*?)<\/h3>[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/gi)];
    let channelsMd = '';
    if (channels.length > 0) {
      channelsMd = '## Architectural Pillars & Core Capabilities\n\n' + channels.map(c => {
        const h = stripHtml(c[1]);
        const p = stripHtml(c[2]);
        return `### ${h}\n${p}\n`;
      }).join('\n');
    }

    // Extract timeline / sprint
    const timelineItems = [...html.matchAll(/<div class="timeline-item">[\s\S]*?<div class="timeline-date">([\s\S]*?)<\/div>[\s\S]*?<h3[^>]*>([\s\S]*?)<\/h3>[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/gi)];
    let timelineMd = '';
    if (timelineItems.length > 0) {
      timelineMd = '## Delivery Framework & Sprints\n\n' + timelineItems.map(t => {
        const date = stripHtml(t[1]);
        const th = stripHtml(t[2]);
        const tp = stripHtml(t[3]);
        return `### ${date}: ${th}\n${tp}\n`;
      }).join('\n');
    }

    const md = `---
title: "${title.replace(/"/g, '\\"')}"
description: "${desc.replace(/"/g, '\\"')}"
url: "https://sanjeevkumarmalik.in/services/${slug}"
service_name: "${h1.split('|')[0].trim()}"
eyebrow: "${eyebrow.replace(/"/g, '\\"')}"
author: "Sanjeev Kumar Malik"
role: "Principal Web Development Architect"
phone: "+91 97186 04362"
email: "info@sanjeevkumarmalik.in"
location: "Delhi NCR, India"
---

# ${h1}

> **${eyebrow}**  
> ${leadP}

---

${channelsMd}

---

${tableMd ? '## Technical Comparison Matrix\n\n' + tableMd + '\n---\n\n' : ''}

${timelineMd}

---

${faqsMd}

---

## Direct Founder Consultation

- **Architect:** Sanjeev Kumar Malik (15+ Years Hands-On Experience, 1,700+ Verified Websites)
- **Phone / WhatsApp:** [+91 97186 04362](tel:+919718604362)
- **Email:** [info@sanjeevkumarmalik.in](mailto:info@sanjeevkumarmalik.in)
- **Web:** [https://sanjeevkumarmalik.in/services/${slug}](https://sanjeevkumarmalik.in/services/${slug})
- **Direct Booking:** [Schedule Architecture Session](https://sanjeevkumarmalik.in/contact-us)
`;

    fs.writeFileSync(`services/${slug}.md`, md);
    fs.writeFileSync(`content/services/${slug}.md`, md);
    console.log(`✓ Created services/${slug}.md`);
  });
}

// 4. PROCESS BLOG ARTICLES
function generateBlogsMd() {
  const blogDir = 'blogs';
  const blogEntries = fs.readdirSync(blogDir).filter(f => f.endsWith('.html'));

  // Main blogs index page
  const indexHtml = fs.readFileSync('blogs.html', 'utf-8');
  const indexTitle = indexHtml.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || 'Technical Web Engineering Blogs';
  const indexDesc = indexHtml.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i)?.[1] || '';

  const mainBlogsMd = `---
title: "${indexTitle.replace(/"/g, '\\"')}"
description: "${indexDesc.replace(/"/g, '\\"')}"
url: "https://sanjeevkumarmalik.in/blogs"
author: "Sanjeev Kumar Malik"
total_articles: 10
category: "Web Engineering, Architecture & CRO"
---

# Technical Web Engineering Blogs & Insights

> Written for founders, CTOs, and technical teams seeking production-grade architectural analysis, Core Web Vitals optimization, and revenue-driven web development standards.

---

## Featured Technical Articles

1. [Custom WordPress Plugin Development vs Off-the-Shelf Plugins](https://sanjeevkumarmalik.in/blogs/custom-wordpress-plugin-vs-off-the-shelf) — WordPress Engineering (10 min read)
2. [Dark Mode Website Design: Is It Actually Worth Building for Businesses?](https://sanjeevkumarmalik.in/blogs/dark-mode-website-design-worth-building) — UI/UX Strategy (7 min read)
3. [Designing for Trust: UX Patterns That Make Visitors Comfortable Buying](https://sanjeevkumarmalik.in/blogs/designing-for-trust-ux-patterns) — Conversion Optimization (9 min read)
4. [Ecommerce Website Checkout Flow: What Slows Indian Shoppers Down](https://sanjeevkumarmalik.in/blogs/ecommerce-checkout-flow-indian-shoppers) — E-Commerce Architecture (12 min read)
5. [Headless WordPress: When It Makes Sense and When It Doesn't](https://sanjeevkumarmalik.in/blogs/headless-wordpress-when-it-makes-sense) — Full-Stack Architecture (11 min read)
6. [How AI Overviews Are Affecting WordPress SEO Setup in 2026](https://sanjeevkumarmalik.in/blogs/how-ai-overviews-affect-wordpress-seo-2026) — Technical SEO (8 min read)
7. [Micro-Interactions in UI Design: Small Details That Change User Behavior](https://sanjeevkumarmalik.in/blogs/micro-interactions-ui-design) — UI/UX Engineering (6 min read)
8. [Multi-Currency and Multi-Language Ecommerce Websites for Indian Brands](https://sanjeevkumarmalik.in/blogs/multi-currency-multi-language-ecommerce) — Global Commerce (10 min read)
9. [Web Accessibility: What WCAG 2.2 Compliance Actually Means for Your Website](https://sanjeevkumarmalik.in/blogs/web-accessibility-wcag-2-2-compliance) — Compliance & Accessibility (8 min read)
10. [WordPress Security Hardening: A Practical Checklist for Business Websites](https://sanjeevkumarmalik.in/blogs/wordpress-security-hardening-checklist) — DevOps & Security (14 min read)
`;

  fs.writeFileSync('blogs/blogs.md', mainBlogsMd);
  fs.writeFileSync('content/blogs/blogs.md', mainBlogsMd);
  console.log('✓ Created blogs/blogs.md');

  // Each individual blog
  blogEntries.forEach(bFile => {
    const slug = bFile.replace('.html', '');
    const html = fs.readFileSync(path.join(blogDir, bFile), 'utf-8');

    const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || '';
    const desc = html.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i)?.[1] || '';
    const category = stripHtml(html.match(/<span class="blog-category-tag"[^>]*>([\s\S]*?)<\/span>/i)?.[1] || 'Web Engineering');
    const readTime = stripHtml(html.match(/<span>([0-9]+\s*min\s*read)<\/span>/i)?.[1] || '10 min read');
    const date = stripHtml(html.match(/<span>Published\s+([A-Za-z0-9\s,]+)<\/span>/i)?.[1] || 'July 2026');

    // Extract main article content
    const articleMatch = html.match(/<article class="blog-article-content">([\s\S]*?)<\/article>/i);
    let bodyMd = '';
    if (articleMatch) {
      const artHtml = articleMatch[1];
      // Convert h1, h2, h3, p, ul, li
      const h1Match = artHtml.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
      const h1Text = stripHtml(h1Match ? h1Match[1] : title);
      
      // Clean content
      let contentClean = artHtml
        .replace(/<header[\s\S]*?<\/header>/i, '')
        .replace(/<div class="article-featured-image-box"[\s\S]*?<\/div>/i, '')
        .replace(/<div class="article-author-card"[\s\S]*?<\/div>/i, '')
        .replace(/<div class="article-cta-box"[\s\S]*?<\/div>/i, '');

      // Parse headings
      contentClean = contentClean.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '\n\n## $1\n\n');
      contentClean = contentClean.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '\n\n### $1\n\n');
      contentClean = contentClean.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, '\n\n#### $1\n\n');
      contentClean = contentClean.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, '`$1`');
      contentClean = contentClean.replace(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi, '\n\n```\n$1\n```\n\n');

      bodyMd = `# ${h1Text}\n\n` + stripHtml(contentClean);
    }

    const md = `---
title: "${title.replace(/"/g, '\\"')}"
description: "${desc.replace(/"/g, '\\"')}"
url: "https://sanjeevkumarmalik.in/blogs/${slug}"
category: "${category}"
reading_time: "${readTime}"
publish_date: "${date}"
author: "Sanjeev Kumar Malik"
role: "Principal Full-Stack Web Development Architect"
phone: "+91 97186 04362"
email: "info@sanjeevkumarmalik.in"
---

${bodyMd}

---

## Author & Architecture Inquiries

**Sanjeev Kumar Malik** is a senior web architect with 15+ years of hands-on production experience and over 1,700 delivered websites. He works directly with founders and technical leaders across Delhi NCR and globally.

- **Phone / WhatsApp:** [+91 97186 04362](tel:+919718604362)
- **Email:** [info@sanjeevkumarmalik.in](mailto:info@sanjeevkumarmalik.in)
- **Article Link:** [https://sanjeevkumarmalik.in/blogs/${slug}](https://sanjeevkumarmalik.in/blogs/${slug})
`;

    fs.writeFileSync(`blogs/${slug}.md`, md);
    fs.writeFileSync(`content/blogs/${slug}.md`, md);
    console.log(`✓ Created blogs/${slug}.md`);
  });
}

generateAboutMd();
generateContactMd();
generateServicesMd();
generateBlogsMd();

console.log('\nAll Markdown files successfully generated!');

