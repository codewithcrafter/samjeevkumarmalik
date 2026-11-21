/**
 * AUTOMATED SITEMAP.XML & LLMS.TXT & LLMS-FULL.TXT GENERATOR
 * Production Domain: https://www.sanjeevkumarmalik.in
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.sanjeevkumarmalik.in';
const ROOT_DIR = path.resolve(__dirname, '..');

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

function extractMeta(html, tag, attr, attrVal, targetAttr = 'content') {
  const regex = new RegExp(`<${tag}[^>]*${attr}=["']${attrVal}["'][^>]*${targetAttr}=["']([^"']*)["']`, 'i');
  const match = html.match(regex);
  return match ? match[1] : '';
}

function extractTitle(html) {
  const match = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return match ? match[1].trim() : '';
}

function extractDescription(html) {
  return extractMeta(html, 'meta', 'name', 'description') || 
         extractMeta(html, 'meta', 'property', 'og:description') || '';
}

function collectHtmlFiles(dir, relativePrefix = '') {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (!['node_modules', '.git', 'scripts', 'assets', 'admin', 'includes', 'config'].includes(file)) {
        results = results.concat(collectHtmlFiles(fullPath, path.join(relativePrefix, file)));
      }
    } else if (file.endsWith('.html')) {
      const relPath = path.join(relativePrefix, file).replace(/\\/g, '/');
      const htmlContent = fs.readFileSync(fullPath, 'utf8');

      const title = extractTitle(htmlContent);
      const description = extractDescription(htmlContent);
      const mtime = stat.mtime;

      let cleanSlug = relPath.replace(/\/index\.html$/, '').replace(/\.html$/, '');
      if (cleanSlug === 'index') cleanSlug = '';

      let priority = '0.8';
      let changefreq = 'weekly';

      if (cleanSlug === '') {
        priority = '1.0';
        changefreq = 'weekly';
      } else if (cleanSlug === 'about-sanjeev-kumar-malik') {
        priority = '0.95';
        changefreq = 'monthly';
      } else if (cleanSlug === 'contact-us') {
        priority = '0.95';
        changefreq = 'monthly';
      } else if (cleanSlug === 'services') {
        priority = '0.9';
        changefreq = 'weekly';
      } else if (cleanSlug.startsWith('services/')) {
        priority = '0.9';
        changefreq = 'weekly';
      } else if (cleanSlug === 'blogs') {
        priority = '0.85';
        changefreq = 'weekly';
      } else if (cleanSlug.startsWith('blogs/')) {
        priority = '0.8';
        changefreq = 'weekly';
      }

      const fullUrl = cleanSlug ? `${BASE_URL}/${cleanSlug}` : `${BASE_URL}/`;

      results.push({
        filePath: fullPath,
        relPath,
        url: fullUrl,
        title,
        description,
        lastmod: formatDate(mtime),
        priority,
        changefreq
      });
    }
  });

  return results;
}

function generateSitemap(pages) {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Sort logically: Home first, then about/contact/services, then service details, blogs, blog articles
  pages.sort((a, b) => {
    if (a.url === `${BASE_URL}/`) return -1;
    if (b.url === `${BASE_URL}/`) return 1;
    return a.url.localeCompare(b.url);
  });

  pages.forEach(page => {
    xml += `  <url>\n`;
    xml += `    <loc>${page.url}</loc>\n`;
    xml += `    <lastmod>${page.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>\n`;

  const sitemapPath = path.join(ROOT_DIR, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, xml, 'utf8');
  console.log(`✓ sitemap.xml updated successfully (${pages.length} URLs with ${BASE_URL})`);
}

function generateLlmsTxt(pages) {
  const home = pages.find(p => p.url === `${BASE_URL}/`) || pages[0];
  const services = pages.filter(p => p.url.includes('/services/'));
  const blogs = pages.filter(p => p.url.includes('/blogs/'));

  let text = `# Sanjeev Kumar Malik — Principal Web Development Architect & Founder\n\n`;
  text += `> Full-Stack Web Development Architect with 15+ years of hands-on experience and 1,700+ delivered websites.\n`;
  text += `> Region: Delhi NCR, India & Global | Direct founder access, zero intermediate agency account layers.\n`;
  text += `> Phone / WhatsApp: +91 97186 04362 | Email: info@sanjeevkumarmalik.in | Website: ${BASE_URL}\n\n`;

  text += `## Core Architectural Principles\n`;
  text += `- **Sub-0.8s Page Speed Target:** Fully optimized for Google Core Web Vitals (LCP < 1.2s, FID/INP < 100ms, CLS < 0.05).\n`;
  text += `- **Zero SEO Ranking Loss:** 100% 1-to-1 HTTP 301 redirection mapping on redesigns preserving indexed organic equity.\n`;
  text += `- **Clean Code Over Bloated Page Builders:** Bespoke PHP, React 19, Next.js 15, and modular WordPress block themes without 40+ conflicting plugins.\n`;
  text += `- **Direct Technical Ownership:** 100% direct founder consultation, planning, and code review.\n`;
  text += `- **100% IP & Repository Handover:** Full Git source code, administrative rights, and credentials transferred upon launch.\n\n`;

  text += `## Primary Service Offerings\n\n`;
  services.forEach(s => {
    const cleanName = s.title.split('|')[0].split('—')[0].trim();
    text += `- [${cleanName}](${s.url}): ${s.description}\n`;
  });

  text += `\n## Core Website Pages\n\n`;
  text += `- [Home](${BASE_URL}/): Official homepage and full-stack web engineering portfolio.\n`;
  text += `- [About Sanjeev Kumar Malik](${BASE_URL}/about-sanjeev-kumar-malik): Principal architect background, career milestones, and engineering ethos.\n`;
  text += `- [Services Directory](${BASE_URL}/services): Directory of all 7 specialized engineering hubs.\n`;
  text += `- [Technical Blogs](${BASE_URL}/blogs): In-depth technical articles on WordPress, performance, UX, and security.\n`;
  text += `- [Contact Us](${BASE_URL}/contact-us): Direct founder consultation scheduling and inquiry form.\n\n`;

  text += `## Markdown Documentation Resources\n\n`;
  text += `- [About Overview (Markdown)](${BASE_URL}/docs/about.md): Comprehensive founder profile and technical credentials.\n`;
  text += `- [Services Guide (Markdown)](${BASE_URL}/docs/services.md): Full breakdown of all seven development service hubs.\n`;
  text += `- [Web Development Architecture (Markdown)](${BASE_URL}/docs/web-development.md): Bespoke WordPress and custom application guidelines.\n`;
  text += `- [Digital Marketing & CRO (Markdown)](${BASE_URL}/docs/digital-marketing.md): Performance marketing and landing page conversion principles.\n`;
  text += `- [Geographic Coverage (Markdown)](${BASE_URL}/docs/geo-services.md): Regional Delhi NCR coverage and global remote delivery.\n`;
  text += `- [Contact & Discovery (Markdown)](${BASE_URL}/docs/contact.md): Booking workflow and communication options.\n\n`;

  text += `## Direct Contact & Discovery\n`;
  text += `- **Phone / WhatsApp:** +91 97186 04362\n`;
  text += `- **Email:** info@sanjeevkumarmalik.in\n`;
  text += `- **Location:** Delhi NCR (Saket, Hauz Khas, Dwarka, Rohini, Noida, Gurugram), India\n`;
  text += `- **Booking:** [Book Founder Session](${BASE_URL}/contact-us)\n`;

  const llmsPath = path.join(ROOT_DIR, 'llms.txt');
  fs.writeFileSync(llmsPath, text, 'utf8');
  console.log(`✓ llms.txt updated successfully`);
}

function run() {
  console.log('Scanning HTML pages in workspace...');
  const allPages = collectHtmlFiles(ROOT_DIR);
  
  // De-duplicate by canonical clean URL
  const seen = new Set();
  const pages = [];
  allPages.forEach(p => {
    if (!seen.has(p.url)) {
      seen.add(p.url);
      pages.push(p);
    }
  });

  console.log(`Found ${pages.length} unique canonical HTML pages.`);

  generateSitemap(pages);
  generateLlmsTxt(pages);
}

run();

module.exports = { run };
