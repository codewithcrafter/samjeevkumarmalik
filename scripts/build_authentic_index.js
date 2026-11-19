const fs = require('fs');

// Read current index.html and old main
const curHtml = fs.readFileSync('index.html', 'utf-8');
const oldRaw = fs.readFileSync('scripts/old_index_pasted.html', 'utf-8');
const oldHtmlMatch = oldRaw.match(/<USER_REQUEST>([\s\S]*?)<\/html>/i);
const oldHtml = oldHtmlMatch ? (oldHtmlMatch[1] + '</html>') : oldRaw;

// Extract old main
const oldMainMatch = oldHtml.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
if (!oldMainMatch) {
  console.error('Could not find old main!');
  process.exit(1);
}

let oldMainBody = oldMainMatch[1];

// Clean all URLs in oldMainBody to match clean URL guidelines (no .html, no trailing slash, root relative)
// 1. contact-us.html -> /contact-us
oldMainBody = oldMainBody.replace(/href=["']contact-us\.html["']/g, 'href="/contact-us"');
oldMainBody = oldMainBody.replace(/href=["']about-sanjeev-kumar-malik\.html["']/g, 'href="/about-sanjeev-kumar-malik"');
oldMainBody = oldMainBody.replace(/href=["']blogs\.html["']/g, 'href="/blogs"');
oldMainBody = oldMainBody.replace(/href=["']index\.html["']/g, 'href="/"');

// 2. services/*.html -> /services/*
oldMainBody = oldMainBody.replace(/href=["']services\/([a-zA-Z0-9_-]+)\.html["']/g, 'href="/services/$1"');

// 3. Make assets paths root relative for safety (/assets/...)
oldMainBody = oldMainBody.replace(/src=["']assets\//g, 'src="/assets/');

// Let's inspect the conversion banner in oldHtml. Is it inside oldMainBody?
// Let's check:
const hasBanner = oldMainBody.includes('Ready To Create Your High Converting Digital Presence');
console.log('Old main includes conversion banner:', hasBanner);

// Now let's extract the header from curHtml (it has the full-width dual-tier sticky header)
const headerMatch = curHtml.match(/(<!-- =+[\s\S]*?1\. GLOBAL FULL-WIDTH DUAL-TIER STICKY NAVIGATION[\s\S]*?<\/header>[\s\S]*?<!-- Mobile Navigation Drawer -->[\s\S]*?<\/div>)/i) ||
  curHtml.match(/(<header[\s\S]*?<\/header>[\s\S]*?<div class="mobile-nav-drawer"[\s\S]*?<\/div>)/i);

if (!headerMatch) {
  console.error('Could not find header in curHtml!');
  process.exit(1);
}
const fullHeaderHtml = headerMatch[0];

// Extract head from curHtml or update head with old metadata
const headMatch = curHtml.match(/<head[\s\S]*?<\/head>/i);

// Build the new index.html
const ambientAndCanvas = `  <!-- Background Ambient Glow & Light Grid Pattern -->
  <div class="ambient-canvas-wrapper" aria-hidden="true">
    <div class="ambient-orb orb-1"></div>
    <div class="ambient-orb orb-2"></div>
    <div class="ambient-orb orb-3"></div>
    <div class="subtle-grid-pattern"></div>
  </div>`;

// Footer from curHtml (has clean URLs)
const footerMatch = curHtml.match(/<footer[\s\S]*?<\/footer>/i);
const modalMatch = curHtml.match(/<!-- Interactive Booking Modal[\s\S]*?<\/div>\s*<\/div>/i);

const newIndexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- SEO Meta Tags -->
  <title>Web Development Company in Delhi | Custom Website Design &amp; Development – Sanjeev Kumar Malik</title>
  <meta name="description" content="Looking for a Web Development Company in Delhi? Get custom, responsive and SEO-friendly websites, ecommerce stores and web applications built for business growth by veteran architect Sanjeev Kumar Malik (15+ Years, 1700+ websites delivered).">
  <meta name="keywords" content="Web Development Company in Delhi, Sanjeev Kumar Malik, Custom Website Design Delhi, WordPress Development Delhi, Ecommerce Website Development, Next.js, React, Node.js, Saket, Hauz Khas, Dwarka, Rohini, South Delhi, Delhi NCR">
  <meta name="author" content="Sanjeev Kumar Malik">
  <link rel="canonical" href="https://sanjeevkumarmalik.in/">

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://sanjeevkumarmalik.in/">
  <meta property="og:title" content="Web Development Company in Delhi | Custom Website Design &amp; Development – Sanjeev Kumar Malik">
  <meta property="og:description" content="Engineering websites that drive revenue, not just pageviews. 15+ years experience, 1,700+ verified websites delivered across Delhi NCR.">
  <meta property="og:image" content="/assets/images/Sanjeev-Kumar-Malik.webp">

  <!-- Twitter Meta -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Web Development Company in Delhi | Sanjeev Kumar Malik">
  <meta name="twitter:description" content="Custom, responsive and SEO-friendly websites, ecommerce stores and web applications built for business growth.">
  <meta name="twitter:image" content="/assets/images/Sanjeev-Kumar-Malik.webp">

  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='48' fill='%232563EB'/><text x='50' y='64' font-size='42' font-family='sans-serif' font-weight='bold' fill='white' text-anchor='middle'>S</text></svg>">

  <!-- Stylesheet -->
  <link rel="stylesheet" href="/assets/css/style.css">

  <!-- Structured Data (JSON-LD) -->
  <script type="application/ld+json">
  {
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
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Delhi NCR",
          "addressCountry": "India"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://sanjeevkumarmalik.in/#website",
        "url": "https://sanjeevkumarmalik.in",
        "name": "Sanjeev Kumar Malik — Web Development Company in Delhi"
      }
    ]
  }
  </script>
</head>
<body>

${ambientAndCanvas}

${fullHeaderHtml}

  <!-- ==========================================================================
       MAIN CONTENT: AUTHENTIC ARCHITECTURE & SECTIONS
       ========================================================================== -->
  <main id="mainContent">
${oldMainBody}
  </main>

${footerMatch[0]}

${modalMatch[0]}

  <!-- Scripts -->
  <script src="/assets/js/app.js"></script>
</body>
</html>
`;

fs.writeFileSync('scripts/new_index_candidate.html', newIndexHtml);
console.log('Wrote candidate to scripts/new_index_candidate.html, length:', newIndexHtml.length);