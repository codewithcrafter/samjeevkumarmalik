const fs = require('fs');
const path = require('path');

function stripHtml(html) {
  if (!html) return '';
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim();
}

function extractMeta(html) {
  const title = stripHtml(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || '');
  const description = stripHtml(html.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i)?.[1] || '');
  const canonical = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i)?.[1] || '';
  const image = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i)?.[1] || '/assets/images/Sanjeev-Kumar-Malik.webp';
  return { title, description, canonical, image };
}

function extractFAQs(html) {
  const faqMatches = [...html.matchAll(/<div class="faq-item[\s\S]*?<button[^>]*>([\s\S]*?)<\/button>[\s\S]*?<div class="faq-answer">([\s\S]*?)<\/div>/gi)];
  return faqMatches.map(m => {
    const q = stripHtml(m[1]).replace(/^[0-9.]+\s*/, '');
    const a = stripHtml(m[2]);
    return {
      "@type": "Question",
      "name": q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": a
      }
    };
  });
}

function insertOrReplaceSchema(html, schemaObj) {
  const schemaStr = `  <!-- Structured Data (JSON-LD) -->\n  <script type="application/ld+json">\n${JSON.stringify(schemaObj, null, 2)}\n  </script>\n`;
  
  if (html.includes('<script type="application/ld+json">')) {
    return html.replace(/<script type=["']application\/ld\+json["']>[\s\S]*?<\/script>/i, schemaStr.trim());
  } else {
    return html.replace('</head>', `${schemaStr}</head>`);
  }
}

// 1. HOMEPAGE SCHEMA
function buildHomeSchema(html) {
  const meta = extractMeta(html);
  const faqs = extractFAQs(html);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://sanjeevkumarmalik.in/#person",
        "name": "Sanjeev Kumar Malik",
        "jobTitle": "Principal Web Development Architect & Founder",
        "url": "https://sanjeevkumarmalik.in",
        "telephone": "+919718604362",
        "email": "info@sanjeevkumarmalik.in",
        "image": "https://sanjeevkumarmalik.in/assets/images/Sanjeev-Kumar-Malik.webp",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Delhi NCR",
          "addressCountry": "India"
        },
        "knowsAbout": [
          "Web Development",
          "Next.js",
          "React",
          "WordPress Custom Theme Development",
          "Shopify & WooCommerce",
          "PHP & Laravel",
          "MERN Stack",
          "Core Web Vitals Optimization",
          "Technical SEO & 301 Migrations"
        ]
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://sanjeevkumarmalik.in/#business",
        "name": "Sanjeev Kumar Malik — Web Development Company in Delhi",
        "url": "https://sanjeevkumarmalik.in",
        "telephone": "+919718604362",
        "email": "info@sanjeevkumarmalik.in",
        "priceRange": "₹₹",
        "founder": {
          "@id": "https://sanjeevkumarmalik.in/#person"
        },
        "image": "https://sanjeevkumarmalik.in/assets/images/Sanjeev-Kumar-Malik.webp",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Delhi NCR",
          "addressCountry": "India"
        },
        "areaServed": [
          "Delhi",
          "South Delhi",
          "Saket",
          "Hauz Khas",
          "Dwarka",
          "Rohini",
          "Gurugram",
          "Noida",
          "Delhi NCR",
          "India"
        ],
        "openingHours": "Mo-Sa 09:00-20:00"
      },
      {
        "@type": "WebSite",
        "@id": "https://sanjeevkumarmalik.in/#website",
        "url": "https://sanjeevkumarmalik.in",
        "name": "Sanjeev Kumar Malik — Web Development Company in Delhi",
        "publisher": {
          "@id": "https://sanjeevkumarmalik.in/#person"
        }
      },
      ...(faqs.length > 0 ? [{
        "@type": "FAQPage",
        "@id": "https://sanjeevkumarmalik.in/#faq",
        "mainEntity": faqs
      }] : [])
    ]
  };
}

// 2. ABOUT PAGE SCHEMA
function buildAboutSchema(html) {
  const meta = extractMeta(html);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": "https://sanjeevkumarmalik.in/about-sanjeev-kumar-malik#page",
        "url": "https://sanjeevkumarmalik.in/about-sanjeev-kumar-malik",
        "name": meta.title,
        "description": meta.description,
        "mainEntity": {
          "@type": "Person",
          "@id": "https://sanjeevkumarmalik.in/#person",
          "name": "Sanjeev Kumar Malik",
          "jobTitle": "Principal Web Development Architect & Founder",
          "url": "https://sanjeevkumarmalik.in/about-sanjeev-kumar-malik",
          "telephone": "+919718604362",
          "email": "info@sanjeevkumarmalik.in",
          "image": "https://sanjeevkumarmalik.in/assets/images/Sanjeev-Kumar-Malik.webp",
          "description": "Full-stack web developer with 15+ years experience and 1,700+ delivered websites across Delhi NCR and globally.",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Delhi NCR",
            "addressCountry": "India"
          },
          "knowsAbout": [
            "Full-Stack Web Development",
            "React & Next.js",
            "WordPress Architecture",
            "WooCommerce & Shopify",
            "PHP & Laravel",
            "MERN Stack",
            "Core Web Vitals",
            "Technical SEO"
          ]
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://sanjeevkumarmalik.in/about-sanjeev-kumar-malik#breadcrumbs",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://sanjeevkumarmalik.in/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "About Sanjeev Kumar Malik",
            "item": "https://sanjeevkumarmalik.in/about-sanjeev-kumar-malik"
          }
        ]
      }
    ]
  };
}

// 3. CONTACT PAGE SCHEMA
function buildContactSchema(html) {
  const meta = extractMeta(html);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": "https://sanjeevkumarmalik.in/contact-us#page",
        "url": "https://sanjeevkumarmalik.in/contact-us",
        "name": meta.title,
        "description": meta.description
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://sanjeevkumarmalik.in/#business",
        "name": "Sanjeev Kumar Malik — Web Development Company in Delhi",
        "url": "https://sanjeevkumarmalik.in",
        "telephone": "+919718604362",
        "email": "info@sanjeevkumarmalik.in",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Delhi NCR",
          "addressCountry": "India"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+919718604362",
          "contactType": "Direct Architecture Consultation & Founder Desk",
          "availableLanguage": ["English", "Hindi"],
          "areaServed": "Delhi NCR, India & Global"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://sanjeevkumarmalik.in/contact-us#breadcrumbs",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://sanjeevkumarmalik.in/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Contact Us",
            "item": "https://sanjeevkumarmalik.in/contact-us"
          }
        ]
      }
    ]
  };
}

// 4. SERVICE PAGE SCHEMA
function buildServiceSchema(html, slug) {
  const meta = extractMeta(html);
  const faqs = extractFAQs(html);
  const pageUrl = `https://sanjeevkumarmalik.in/services/${slug}`;

  const serviceNames = {
    'wordpress-web-development': 'WordPress Web Development Services in Delhi',
    'ecommerce-website-development': 'E-Commerce Website Development Company in Delhi',
    'custom-web-application-development': 'Custom Web Application Development in Delhi',
    'website-redesign-speed-optimization': 'Website Redesign & Speed Optimization Services Delhi',
    'landing-page-design-development': 'Landing Page Design & Development Company in Delhi',
    'ui-ux-design-services': 'UI/UX Design Services in Delhi',
    'web-development-for-startups-smes': 'Web Development for Startups & SMEs in Delhi'
  };

  const currentServiceName = serviceNames[slug] || meta.title.split('|')[0].trim();

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        "name": currentServiceName,
        "serviceType": currentServiceName,
        "description": meta.description,
        "url": pageUrl,
        "provider": {
          "@type": "Person",
          "@id": "https://sanjeevkumarmalik.in/#person",
          "name": "Sanjeev Kumar Malik",
          "url": "https://sanjeevkumarmalik.in/about-sanjeev-kumar-malik",
          "telephone": "+919718604362",
          "email": "info@sanjeevkumarmalik.in"
        },
        "areaServed": {
          "@type": "State",
          "name": "Delhi NCR, India"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumbs`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://sanjeevkumarmalik.in/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Services",
            "item": "https://sanjeevkumarmalik.in/#servicesOverview"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": currentServiceName,
            "item": pageUrl
          }
        ]
      },
      ...(faqs.length > 0 ? [{
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        "mainEntity": faqs
      }] : [])
    ]
  };
}

// 5. BLOGS INDEX SCHEMA
function buildBlogsIndexSchema(html) {
  const meta = extractMeta(html);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": "https://sanjeevkumarmalik.in/blogs#blog",
        "url": "https://sanjeevkumarmalik.in/blogs",
        "name": "Technical Web Engineering Blogs & Insights — Sanjeev Kumar Malik",
        "description": meta.description,
        "publisher": {
          "@type": "Person",
          "@id": "https://sanjeevkumarmalik.in/#person",
          "name": "Sanjeev Kumar Malik",
          "url": "https://sanjeevkumarmalik.in"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://sanjeevkumarmalik.in/blogs#breadcrumbs",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://sanjeevkumarmalik.in/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Technical Blogs",
            "item": "https://sanjeevkumarmalik.in/blogs"
          }
        ]
      }
    ]
  };
}

// 6. BLOG POST SCHEMA
function buildBlogPostSchema(html, slug) {
  const meta = extractMeta(html);
  const pageUrl = `https://sanjeevkumarmalik.in/blogs/${slug}`;
  const h1 = stripHtml(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || meta.title);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${pageUrl}#article`,
        "headline": h1,
        "description": meta.description,
        "url": pageUrl,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": pageUrl
        },
        "author": {
          "@type": "Person",
          "@id": "https://sanjeevkumarmalik.in/#person",
          "name": "Sanjeev Kumar Malik",
          "jobTitle": "Principal Web Development Architect & Founder",
          "url": "https://sanjeevkumarmalik.in/about-sanjeev-kumar-malik"
        },
        "publisher": {
          "@type": "Person",
          "@id": "https://sanjeevkumarmalik.in/#person",
          "name": "Sanjeev Kumar Malik",
          "url": "https://sanjeevkumarmalik.in"
        },
        "image": meta.image.startsWith('http') ? meta.image : `https://sanjeevkumarmalik.in${meta.image}`,
        "datePublished": "2026-07-01T08:00:00+05:30",
        "dateModified": "2026-11-18T12:00:00+05:30",
        "inLanguage": "en"
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumbs`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://sanjeevkumarmalik.in/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Technical Blogs",
            "item": "https://sanjeevkumarmalik.in/blogs"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": h1,
            "item": pageUrl
          }
        ]
      }
    ]
  };
}

// APPLY SCHEMAS TO ALL FILES AND ALIASES
function applySchema(filePath, schemaObj) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf-8');
  const updated = insertOrReplaceSchema(content, schemaObj);
  fs.writeFileSync(filePath, updated);
  console.log(`✓ Schema injected into ${filePath}`);
}

// 1. Homepage
const homeSchema = buildHomeSchema(fs.readFileSync('index.html', 'utf-8'));
applySchema('index.html', homeSchema);

// 2. About
const aboutSchema = buildAboutSchema(fs.readFileSync('about-sanjeev-kumar-malik.html', 'utf-8'));
applySchema('about-sanjeev-kumar-malik.html', aboutSchema);
applySchema('about-sanjeev-kumar-malik/index.html', aboutSchema);

// 3. Contact
const contactSchema = buildContactSchema(fs.readFileSync('contact-us.html', 'utf-8'));
applySchema('contact-us.html', contactSchema);
applySchema('contact-us/index.html', contactSchema);

// 4. Services
const services = [
  'wordpress-web-development',
  'ecommerce-website-development',
  'custom-web-application-development',
  'website-redesign-speed-optimization',
  'landing-page-design-development',
  'ui-ux-design-services',
  'web-development-for-startups-smes'
];

services.forEach(slug => {
  const file1 = `services/${slug}.html`;
  const file2 = `services/${slug}/index.html`;
  if (fs.existsSync(file1)) {
    const sSchema = buildServiceSchema(fs.readFileSync(file1, 'utf-8'), slug);
    applySchema(file1, sSchema);
    applySchema(file2, sSchema);
  }
});

// 5. Blogs Index
const blogsIndexSchema = buildBlogsIndexSchema(fs.readFileSync('blogs.html', 'utf-8'));
applySchema('blogs.html', blogsIndexSchema);
applySchema('blogs/index.html', blogsIndexSchema);

// 6. Blog Posts
const blogDir = 'blogs';
const blogEntries = fs.readdirSync(blogDir).filter(f => f.endsWith('.html'));
blogEntries.forEach(bFile => {
  const slug = bFile.replace('.html', '');
  const file1 = `blogs/${bFile}`;
  const file2 = `blogs/${slug}/index.html`;
  if (fs.existsSync(file1)) {
    const bSchema = buildBlogPostSchema(fs.readFileSync(file1, 'utf-8'), slug);
    applySchema(file1, bSchema);
    applySchema(file2, bSchema);
  }
});

console.log('\nAll schemas successfully injected across all pages and directory aliases!');

