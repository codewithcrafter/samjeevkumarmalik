const fs = require('fs');

function updateWP(content) {
  let html = content;

  // HERO
  html = html.replace(
    /<div class="section-eyebrow">ENTERPRISE CMS &amp; GUTENBERG ARCHITECTURE<\/div>\s*<h1 class="section-title">[\s\S]*?<\/h1>\s*<p class="section-description" style="max-width: 860px; margin: 0 auto;">[\s\S]*?<\/p>/i,
    `<div class="section-eyebrow">ENTERPRISE CMS &amp; GUTENBERG ARCHITECTURE</div>
        <h1 class="section-title">
          WordPress Web Development Services in Delhi | Custom WordPress Development Company – <span class="gradient-text">Sanjeev Kumar Malik</span>
        </h1>
        <p class="section-description" style="max-width: 860px; margin: 0 auto;">
          Looking for wordpress web development services in delhi that won't slow your business down? We build custom WordPress websites from scratch, with hand-coded themes, purpose-built plugins and clean SEO structure, so your site loads fast, ranks well and brings in enquiries instead of excuses.
        </p>`
  );

  // MAIN CARD
  html = html.replace(
    /<div class="section-eyebrow" style="margin-bottom: 0\.5rem;">[\s\S]*?<\/div>\s*<h2 style="font-size: 2\.2rem; margin-bottom: 1rem;">[\s\S]*?<\/h2>\s*<p style="color: var\(--text-secondary\); line-height: 1\.7; font-size: 1\.05rem;">[\s\S]*?<\/p>\s*<div style="display: flex; gap: 0\.75rem; margin-top: 1\.5rem; flex-wrap: wrap;">[\s\S]*?<\/div>/i,
    `<div class="section-eyebrow" style="margin-bottom: 0.5rem;">THE DELHI-NCR ENGINEERING STANDARD</div>
            <h2 style="font-size: 2.2rem; margin-bottom: 1rem;">Stop Patching Slow Sites Built on Page Builders</h2>
            <p style="color: var(--text-secondary); line-height: 1.7; font-size: 1.05rem;">
              A slow, cluttered website quietly costs you enquiries every day. Our wordpress web development services in delhi fix that at the root: Sanjeev Kumar Malik delivers a custom wordpress website without elementor, with hand-written PHP, lean CSS and only the plugins your project truly needs. It is lightweight wordpress theme development focused on speed, clean markup and edits your team can make without calling a developer.
            </p>
            <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem; flex-wrap: wrap;">
              <span class="hero-tech-chip">Fast Mobile Loading</span>
              <span class="hero-tech-chip">Hand-Coded Themes</span>
              <span class="hero-tech-chip">SEO-Ready Markup</span>
              <span class="hero-tech-chip">Hardened Security</span>
            </div>`
  );

  // BADGES CODE BOX
  html = html.replace(
    /<span>Zero-Bloat Core • Custom Gutenberg Blocks<\/span>/i,
    `<span>Hand-Coded Core • Custom Gutenberg Blocks</span>`
  );
  html = html.replace(
    /<span>🛡️ 100% ThemeForest &amp; Elementor Free<\/span>/i,
    `<span>🛡️ 100% Elementor-Free Build</span>`
  );

  // PILLARS
  const pillarsRegex = /<div class="section-header">\s*<div class="section-eyebrow">Architectural Pillars<\/div>\s*<h2 class="section-title">Engineered for Velocity &amp; Independence<\/h2>[\s\S]*?<div class="channels-grid">[\s\S]*?<\/div>\s*<\/div>/i;
  const newPillars = `<div class="section-header">
          <div class="section-eyebrow">ARCHITECTURAL PILLARS</div>
          <h2 class="section-title">Is Your WordPress Site Engineered for Velocity?</h2>
        </div>

        <div class="channels-grid">
          <div class="channel-card">
            <div class="channel-icon">🧩</div>
            <h3 class="channel-title">Gutenberg Custom Block Development</h3>
            <p class="channel-desc">Reusable blocks designed around your content, so your team edits layouts safely without breaking the design or adding page-builder weight.</p>
          </div>

          <div class="channel-card">
            <div class="channel-icon">🎨</div>
            <h3 class="channel-title">Custom Theme Architecture</h3>
            <p class="channel-desc">Our custom wordpress theme development starts from an empty folder: semantic HTML, minimal CSS and only the scripts each page needs.</p>
          </div>

          <div class="channel-card">
            <div class="channel-icon">⚡</div>
            <h3 class="channel-title">Purpose-Built Plugins</h3>
            <p class="channel-desc">Our wordpress plugin development services replace three or four generic plugins with one focused plugin that does exactly your job.</p>
          </div>
        </div>`;
  html = html.replace(pillarsRegex, newPillars);

  // MATRIX / COMPARISON
  const matrixRegex = /<div class="section-header" style="margin-top: 5rem;">\s*<div class="section-eyebrow">The Engineering Difference<\/div>\s*<h2 class="section-title">Traditional Agency WordPress vs Sanjeev Kumar Malik<\/h2>[\s\S]*?<div class="comparison-grid">[\s\S]*?<\/div>\s*<\/div>/i;
  const newMatrix = `<div class="decision-matrix-card" style="margin-top: 5rem;">
          <div class="section-eyebrow" style="background: rgba(37, 99, 235, 0.1);">WORDPRESS VS CUSTOM CODE</div>
          <h2 style="font-size: 1.85rem; margin-bottom: 0.75rem;">WordPress vs Custom Code — Which Fits Your Business?</h2>
          <p style="color: var(--text-secondary); margin-bottom: 2rem;">
            Comparing wordpress web development services in delhi with a fully coded stack? Here is a plain breakdown of cost, speed and upkeep, so you can invest in the right build.
          </p>

          <div class="table-responsive">
            <table class="matrix-table">
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>WordPress Web Development</th>
                  <th>Custom Stack (React, Next.js, Node, Laravel)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Primary Business Use-Case</strong></td>
                  <td>Business sites, blogs, service pages and online stores through woocommerce website development delhi.</td>
                  <td>SaaS dashboards, booking engines, marketplaces and apps with heavy custom logic.</td>
                </tr>
                <tr>
                  <td><strong>Content Editability</strong></td>
                  <td>Excellent. Your team edits text, images and blocks without a developer.</td>
                  <td>Moderate. Needs a headless CMS or developer help for most changes.</td>
                </tr>
                <tr>
                  <td><strong>Build Speed &amp; Deployment</strong></td>
                  <td>Faster. Most projects go live in 2 to 4 weeks.</td>
                  <td>Slower. Usually 4 to 8 weeks depending on features.</td>
                </tr>
                <tr>
                  <td><strong>Performance &amp; PageSpeed</strong></td>
                  <td>Very fast when built custom and kept free of extra plugins.</td>
                  <td>Fast by design, but needs careful engineering to stay that way.</td>
                </tr>
                <tr>
                  <td><strong>Initial Engineering Cost</strong></td>
                  <td>Budget-friendly custom wordpress development delhi businesses can afford, with strong returns for small and mid-sized firms.</td>
                  <td>Higher upfront cost, suited to funded products and high-traffic platforms.</td>
                </tr>
                <tr>
                  <td><strong>Long-term Maintenance</strong></td>
                  <td>Simple updates and affordable monthly support.</td>
                  <td>Needs a developer for most updates and releases.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>`;
  html = html.replace(matrixRegex, newMatrix);

  // CTA
  html = html.replace(
    /Ready to Build\?/i,
    `READY TO BUILD?`
  );
  html = html.replace(
    /Get a Custom WordPress Architecture Quote/i,
    `Get a Quote for WordPress Web Development Services in Delhi`
  );
  html = html.replace(
    /Consult directly with Sanjeev Kumar Malik for a complete audit of your current WordPress site or new build scope\./i,
    `Looking for a wordpress website development company delhi ncr brands can rely on? Talk directly to Sanjeev Kumar Malik, a wordpress developer in delhi, and get a clear scope, timeline and price for your new site or rebuild.`
  );

  return html;
}

const curWP = fs.readFileSync('services/wordpress-web-development.html', 'utf-8');
const updatedWP = updateWP(curWP);

fs.writeFileSync('services/wordpress-web-development.html', updatedWP);
fs.writeFileSync('services/wordpress-web-development/index.html', updatedWP);

console.log('Successfully updated wordpress-web-development.html and alias!');

