const fs = require('fs');

function updateRedesign(content) {
  let html = content;

  // HERO
  html = html.replace(
    /<div class="section-eyebrow">SEO PRESERVATION &amp; CORE WEB VITALS REBUILD<\/div>\s*<h1 class="section-title">[\s\S]*?<\/h1>\s*<p class="section-description" style="max-width: 860px; margin: 0 auto;">[\s\S]*?<\/p>/i,
    `<div class="section-eyebrow">SEO Preservation &amp; Core Web Vitals Rebuild</div>
        <h1 class="section-title">
          Website Redesign Services Delhi | Speed Optimised &amp; No SEO Loss – <span class="gradient-text">Sanjeev Kumar Malik</span>
        </h1>
        <p style="font-size: 1.15rem; font-weight: 700; color: var(--brand-primary); margin-top: 0.5rem; margin-bottom: 0.5rem;">
          Worry No More About Lost Enquiries After Website Redesign!
        </p>
        <p class="section-description" style="max-width: 860px; margin: 0 auto;">
          As a reliable Website Redesign Company Delhi NCR, I redesign your slow and outdated website to make it fast and modern. All of your ranking signals will be transferred to your new site, meaning you lose no rankings in Google.
        </p>`
  );

  // BOX 1: TRAFFIC PRESERVATION
  html = html.replace(
    /<div class="section-eyebrow" style="margin-bottom: 0\.5rem;">The Traffic Preservation Protocol<\/div>\s*<h2 style="font-size: 2\.2rem; margin-bottom: 1rem;">[\s\S]*?<\/h2>\s*<p style="color: var\(--text-secondary\); line-height: 1\.7; font-size: 1\.05rem;">[\s\S]*?<\/p>\s*<div style="display: flex; gap: 0\.75rem; margin-top: 1\.5rem; flex-wrap: wrap;">[\s\S]*?<\/div>/i,
    `<div class="section-eyebrow" style="margin-bottom: 0.5rem;">The Traffic Preservation Protocol</div>
            <h2 style="font-size: 2.2rem; margin-bottom: 1rem;">Why You Will Lose 40% Of Organic Traffic With A Website Redesign</h2>
            <p style="color: var(--text-secondary); line-height: 1.7; font-size: 1.05rem;">
              Most agencies will simply create a nice looking template and hand it over. No-one will check what happens to the existing URLs. 404 errors will appear for all the Google indexed pages. Internal links will break and schema will be lost. To avoid losing any SEO during a Website Redesign I ensure all indexed URLs are crawled and recorded. Title tags, schema and backlink anchor texts are all noted. We then map out 301 redirects to ensure we get a PageSpeed score of 99/100.
            </p>
            <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem; flex-wrap: wrap;">
              <span class="hero-tech-chip">100% 301 URL Retention</span>
              <span class="hero-tech-chip">LCP Under 0.8s On Key Pages</span>
              <span class="hero-tech-chip">100% Mobile Friendly</span>
              <span class="hero-tech-chip">35-50% Less Bounces</span>
            </div>`
  );

  // SECTION 2: PILLARS
  const pillarsRegex = /<div class="section-header">\s*<div class="section-eyebrow">Technical Optimization Pillars<\/div>\s*<h2 class="section-title">Engineered for Search Engines &amp; Human Users<\/h2>[\s\S]*?<div class="channels-grid">[\s\S]*?<\/div>\s*<\/div>/i;
  const newPillars = `<div class="section-header">
          <div class="section-eyebrow">Technical Optimization Pillars</div>
          <h2 class="section-title">SEO Friendly &amp; User Friendly Website</h2>
        </div>

        <div class="channels-grid">
          <div class="channel-card">
            <div class="channel-icon">🗺️</div>
            <h3 class="channel-title">URL 301 Mapping</h3>
            <p class="channel-desc">A proper 301 mapping is done. Every existing URL, canonical and internal link will be mapped to their new location.</p>
          </div>

          <div class="channel-card">
            <div class="channel-icon">⚡</div>
            <h3 class="channel-title">Core Web Vitals Passed</h3>
            <p class="channel-desc">Core Web Vitals are optimised during our Website Redesign Services Delhi. LCP will be &lt;1.2s, INP &lt;100ms and CLS &lt;0.05. This means Google sees a fast and stable page.</p>
          </div>

          <div class="channel-card">
            <div class="channel-icon">📦</div>
            <h3 class="channel-title">Asset Optimization</h3>
            <p class="channel-desc">Unused theme scripts, large fonts, bulky icon packs and tracking pixels are removed. Render blocking CSS files are also removed and replaced with inlined critical CSS.</p>
          </div>

          <div class="channel-card">
            <div class="channel-icon">🖼️</div>
            <h3 class="channel-title">Next Gen Images &amp; Edge Cache</h3>
            <p class="channel-desc">All images will be optimized to WebP/AVIF format. They will be responsive using srcset. The images will also be cached on our CDN edge servers. This will help speed up your site for users in any city. All of our Website Redesign Services Delhi guarantee fast and lightweight pages.</p>
          </div>
        </div>`;
  html = html.replace(pillarsRegex, newPillars);

  // SECTION 3: MATRIX
  const matrixRegex = /<div class="decision-matrix-card">[\s\S]*?Architectural Audit Matrix[\s\S]*?<\/table>\s*<\/div>/i;
  const newMatrix = `<div class="decision-matrix-card">
          <div class="section-eyebrow" style="background: rgba(37, 99, 235, 0.1);">Architectural Audit Matrix</div>
          <h2 style="font-size: 1.85rem; margin-bottom: 0.75rem;">Do You Need A Reskin, Rebuild Or Speed Optimisation?</h2>
          <p style="color: var(--text-secondary); margin-bottom: 2rem;">
            Before spending money on a complete Website Revamp or any Website Redesign Services Delhi, we’ll determine if you need a reskin, rebuild or speed improvement.
          </p>

          <table class="matrix-table">
            <thead>
              <tr>
                <th>Audit Parameter</th>
                <th>Reskin Only</th>
                <th>Rebuild</th>
                <th>Speed Improvement</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Symptoms</strong></td>
                <td>Everything is working well on the backend but your website doesn’t look modern.</td>
                <td>Website crashing often, plugin clashes or technical debt.</td>
                <td>Design is okay but you want to improve your PageSpeed score as your mobile results are below 50 and your ads are getting expensive.</td>
              </tr>
              <tr>
                <td><strong>CMS Impact</strong></td>
                <td>No changes to your backend. Just an upgrade to the frontend and CSS framework.</td>
                <td>Complete move to a lightweight custom build using WordPress, Next.js or Laravel.</td>
                <td>No changes to your CMS. We will optimize caching, database querying and script loading order.</td>
              </tr>
              <tr>
                <td><strong>SEO Risk</strong></td>
                <td>Very Low. No changes to your URLs, headings or schema tags.</td>
                <td>We will do a strict 301 mapping and monitor your Search Console. All done by us.</td>
                <td>Improvement! No changes to URLs and an early improvement to Core Web Vitals.</td>
              </tr>
              <tr>
                <td><strong>Timeframe</strong></td>
                <td>1-2 Weeks</td>
                <td>3-6 Weeks</td>
                <td>4-7 Working Days</td>
              </tr>
              <tr>
                <td><strong>Conversion Improvements</strong></td>
                <td>+20-35% On Page Engagement</td>
                <td>+40-80% Funnel Conversions</td>
                <td>+15-25% Less Cart/Lead Form Abandonment</td>
              </tr>
            </tbody>
          </table>
        </div>`;
  html = html.replace(matrixRegex, newMatrix);

  // SECTION 4: PROTOCOL
  const protoRegex = /<div class="section-header" style="margin-top: 5rem;">\s*<div class="section-eyebrow">Zero-Downtime Blueprint<\/div>\s*<h2 class="section-title">The 4-Step Site Modernization Protocol<\/h2>[\s\S]*?<\/div>\s*<div class="timeline-container"[\s\S]*?<\/div>\s*<\/div>/i;
  const newProto = `<div class="section-header" style="margin-top: 5rem;">
          <div class="section-eyebrow">Zero-Downtime Blueprint</div>
          <h2 class="section-title">4 Step Website Update Process</h2>
          <p class="section-description">
            How my Website Redesign Services Delhi clients get a zero downtime site migration.
          </p>
        </div>

        <div class="timeline-container" style="max-width: 900px; margin: 0 auto;">
          <div class="timeline-item">
            <div class="timeline-badge">01</div>
            <div class="timeline-content">
              <div class="timeline-date">01 | Stage 01 • Detailed SEO Crawl</div>
              <h3 class="timeline-title">Full URL List &amp; Ranking Overview</h3>
              <p class="timeline-desc">
                We will crawl your entire site to collect a list of all indexed pages. Metadata, internal links and current keyword rankings will be noted. This will form our Website Redesign SEO Checklist. We will use this for every project.
              </p>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-badge">02</div>
            <div class="timeline-content">
              <div class="timeline-date">02 | Stage 02 • Secure Design On Staging</div>
              <h3 class="timeline-title">Light Modern Design On Staging</h3>
              <p class="timeline-desc">
                We will never play around on a live site. We will create your new build on a secure staging domain. Clean fonts, soft glass cards and responsive design across all browsers and devices.
              </p>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-badge">03</div>
            <div class="timeline-content">
              <div class="timeline-date">03 | Stage 03 • Server Optimization &amp; 301</div>
              <h3 class="timeline-title">Gzip/Brotli Compression &amp; Cloudflare Rewrite Rules</h3>
              <p class="timeline-desc">
                We will write your rewrite rules. We will enable HTTP/3, Gzip/Brotli, optimize your database queries and ensure all responses take less than 0.8s. We will also do a mobile page speed improvement.
              </p>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-badge">04</div>
            <div class="timeline-content">
              <div class="timeline-date">04 | Stage 04 • Zero Downtime DNS Switch</div>
              <h3 class="timeline-title">DNS Switch, SSL Check &amp; Search Console Check</h3>
              <p class="timeline-desc">
                This should be how you end your Website Migration. We always finish all of our Website Redesign Services Delhi with a DNS switch during off peak hours. We will check your SSL, ensure all redirects work and re-submit your sitemap. We will keep an eye on your Search Console for the next few weeks.
              </p>
            </div>
          </div>
        </div>`;
  html = html.replace(protoRegex, newProto);

  return html;
}

const curRedesign = fs.readFileSync('services/website-redesign-speed-optimization.html', 'utf-8');
const updatedRedesign = updateRedesign(curRedesign);

fs.writeFileSync('services/website-redesign-speed-optimization.html', updatedRedesign);
fs.writeFileSync('services/website-redesign-speed-optimization/index.html', updatedRedesign);

console.log('Successfully updated website-redesign-speed-optimization.html and alias!');

