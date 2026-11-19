const fs = require('fs');
const path = require('path');

// 1. website-redesign-speed-optimization.html
function expandRedesign() {
  const file = path.join(__dirname, '../services/website-redesign-speed-optimization.html');
  let content = fs.readFileSync(file, 'utf8');

  const metricsHtml = `
        <!-- Metric Proof Strip -->
        <div class="service-metrics-strip">
          <div class="service-metric-item">
            <div class="service-metric-val">&lt; 0.8s</div>
            <div class="service-metric-label">Mobile LCP Speed</div>
            <div class="service-metric-desc">Sub-second Largest Contentful Paint on real Indian 4G/5G mobile connections.</div>
          </div>
          <div class="service-metric-item">
            <div class="service-metric-val">100%</div>
            <div class="service-metric-label">Organic Equity Retained</div>
            <div class="service-metric-desc">Zero ranking drops guaranteed via comprehensive 1-to-1 301 URL redirect maps.</div>
          </div>
          <div class="service-metric-item">
            <div class="service-metric-val">95+</div>
            <div class="service-metric-label">Google PageSpeed Score</div>
            <div class="service-metric-desc">Green scores across Mobile &amp; Desktop on Google PageSpeed Insights &amp; Core Web Vitals.</div>
          </div>
          <div class="service-metric-item">
            <div class="service-metric-val">400+</div>
            <div class="service-metric-label">Websites Rescued</div>
            <div class="service-metric-desc">15+ years reviving slow, penalised, and broken legacy websites across Delhi NCR.</div>
          </div>
        </div>

        <!-- 6 Detailed Capabilities Matrix -->
        <div class="section-header" style="margin-top: 5rem;">
          <div class="section-eyebrow">Technical Capabilities Matrix</div>
          <h2 class="section-title">Comprehensive Site Modernization &amp; Speed Engineering</h2>
          <p class="section-description">Every layer of your website is audited, de-bloated, and re-architected to achieve instantaneous response times, passing Core Web Vitals, and total SEO preservation.</p>
        </div>

        <div class="capabilities-matrix-grid">
          <!-- Card 1 -->
          <div class="capability-card">
            <div class="capability-icon-box">🗺️</div>
            <h3 class="capability-title">Zero-Ranking-Loss 301 Migration Engine</h3>
            <p class="capability-desc">Upgrading your website shouldn't kill your Google traffic. We extract 100% of your domain's historical URLs, indexation logs, and internal link equity into a comprehensive 301 mapping table deployed directly at the web server layer.</p>
            <div class="capability-tags">
              <span class="capability-tag">301 Mapping</span>
              <span class="capability-tag">SERP Equity</span>
              <span class="capability-tag">Canonical Control</span>
            </div>
          </div>

          <!-- Card 2 -->
          <div class="capability-card">
            <div class="capability-icon-box">⚡</div>
            <h3 class="capability-title">Core Web Vitals Pass Guarantee</h3>
            <p class="capability-desc">We optimize all 3 Google Core Web Vitals: Largest Contentful Paint (LCP &lt; 1.2s), Interaction to Next Paint (INP &lt; 100ms), and Cumulative Layout Shift (CLS &lt; 0.05). Your site meets Google's algorithmic ranking threshold with zero compromises.</p>
            <div class="capability-tags">
              <span class="capability-tag">LCP &lt; 1.2s</span>
              <span class="capability-tag">INP &lt; 100ms</span>
              <span class="capability-tag">CLS &lt; 0.05</span>
            </div>
          </div>

          <!-- Card 3 -->
          <div class="capability-card">
            <div class="capability-icon-box">🧹</div>
            <h3 class="capability-title">JavaScript &amp; CSS De-bloat Engine</h3>
            <p class="capability-desc">We eliminate megabytes of render-blocking vendor CSS, orphaned tracking scripts, and outdated third-party libraries. Critical-path CSS is extracted and inlined, while non-critical assets load asynchronously after initial render.</p>
            <div class="capability-tags">
              <span class="capability-tag">Critical CSS</span>
              <span class="capability-tag">Tree Shaking</span>
              <span class="capability-tag">Async Defer</span>
            </div>
          </div>

          <!-- Card 4 -->
          <div class="capability-card">
            <div class="capability-icon-box">🖼️</div>
            <h3 class="capability-title">Next-Gen Media Transformation &amp; CDN</h3>
            <p class="capability-desc">Uncompressed PNGs and high-res JPEGs are automatically converted into modern WebP and AVIF formats with responsive srcset sizing. Edge caching via Cloudflare Tier-1 routing ensures instant content delivery worldwide.</p>
            <div class="capability-tags">
              <span class="capability-tag">AVIF / WebP</span>
              <span class="capability-tag">Adaptive Srcset</span>
              <span class="capability-tag">Cloudflare Edge</span>
            </div>
          </div>

          <!-- Card 5 -->
          <div class="capability-card">
            <div class="capability-icon-box">🗄️</div>
            <h3 class="capability-title">Server OPcache &amp; Redis Query Optimization</h3>
            <p class="capability-desc">Backend performance is as critical as frontend assets. We configure PHP 8.3 OPcache, persistent Redis object caching, MariaDB/MySQL index tuning, and HTTP/3 multiplexing to slash TTFB to under 200ms.</p>
            <div class="capability-tags">
              <span class="capability-tag">Redis Object Cache</span>
              <span class="capability-tag">PHP 8.3 OPcache</span>
              <span class="capability-tag">Sub-200ms TTFB</span>
            </div>
          </div>

          <!-- Card 6 -->
          <div class="capability-card">
            <div class="capability-icon-box">✨</div>
            <h3 class="capability-title">Modern Light UI &amp; Micro-Interactions Refresh</h3>
            <p class="capability-desc">We upgrade tired, dated dark websites into modern light, glassmorphic Antigravity interfaces. Featuring crisp typography, thumb-accessible mobile navigation, and verified WCAG 2.2 contrast compliance.</p>
            <div class="capability-tags">
              <span class="capability-tag">Modern Light UI</span>
              <span class="capability-tag">Ergonomic Navigation</span>
              <span class="capability-tag">WCAG 2.2 AA</span>
            </div>
          </div>
        </div>
`;

  const remainingSectionsHtml = `
        <!-- Real-World Verified Case Study -->
        <div class="service-case-study-card">
          <div class="case-study-badge">🟢 VERIFIED ARCHITECTURAL CASE STUDY</div>
          <h3 class="case-study-title">How a Premier Healthcare Network in Noida Lifted Mobile PageSpeed from 28 to 98 and Grew Inbound Enquiries by 145%</h3>
          
          <div class="case-study-grid">
            <div>
              <p style="color: var(--text-secondary); line-height: 1.7; font-size: 1.05rem; margin-bottom: 1.25rem;">
                <strong>The Challenge:</strong> A multi-specialty healthcare portal with 400+ indexed medical pages was losing patient bookings due to an 8.4-second mobile load time, uncompressed high-resolution doctor profiles, and broken mobile navigation that caused high patient drop-off.
              </p>
              <p style="color: var(--text-secondary); line-height: 1.7; font-size: 1.05rem; margin-bottom: 1.5rem;">
                <strong>The Architectural Intervention:</strong> Sanjeev Kumar Malik mapped all 412 legacy URLs to prevent 404 drops, converted 1,200+ images to WebP via server automation, stripped 36 unused WordPress plugins, and implemented Redis caching on dedicated Nginx infrastructure.
              </p>
              <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
                <span class="hero-tech-chip">✓ Mobile LCP: 0.68s</span>
                <span class="hero-tech-chip">✓ 412 URLs Preserved</span>
                <span class="hero-tech-chip">✓ Patient Leads: +145%</span>
              </div>
            </div>

            <div class="case-metrics-matrix">
              <div class="case-metric-box">
                <div class="case-metric-num" style="color: #10B981;">0.68s</div>
                <div class="case-metric-label">Mobile LCP Speed</div>
                <div class="case-metric-sub">Down from 8.4s initial LCP</div>
              </div>
              <div class="case-metric-box">
                <div class="case-metric-num" style="color: #2563EB;">+145%</div>
                <div class="case-metric-label">Inbound Appointments</div>
                <div class="case-metric-sub">Verified patient bookings in 90 days</div>
              </div>
              <div class="case-metric-box">
                <div class="case-metric-num" style="color: #10B981;">98/100</div>
                <div class="case-metric-label">Google Mobile Score</div>
                <div class="case-metric-sub">Up from 28/100 initial score</div>
              </div>
              <div class="case-metric-box">
                <div class="case-metric-num" style="color: #2563EB;">100%</div>
                <div class="case-metric-label">SEO Equity Retained</div>
                <div class="case-metric-sub">Zero organic keyword losses</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Comparison Bento: Agency Redesign vs Sanjeev Kumar Malik -->
        <div class="section-header" style="margin-top: 5rem;">
          <div class="section-eyebrow">The Engineering Difference</div>
          <h2 class="section-title">Traditional Agency Redesign vs Sanjeev Kumar Malik</h2>
          <p class="section-description">Why businesses across Delhi NCR switch from surface-level agency redesigns to performance-first engineering.</p>
        </div>

        <div class="comparison-grid">
          <!-- Card: Typical Agency -->
          <div class="comparison-card" style="background: rgba(248, 250, 252, 0.95); border: 1.5px solid #E2E8F0;">
            <div style="font-size: 0.825rem; font-weight: 800; color: #64748B; text-transform: uppercase; margin-bottom: 0.5rem;">TYPICAL REDESIGN AGENCY</div>
            <h3 style="font-size: 1.5rem; font-weight: 800; color: #1E293B; margin-bottom: 1.25rem;">The Risky Facelift Model</h3>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.85rem; padding: 0;">
              <li style="display: flex; gap: 0.65rem; color: #64748B; font-size: 0.925rem;">
                <span style="color: #EF4444; font-weight: 800;">✗</span>
                <span>Launches without auditing old URLs, breaking indexed links and causing ranking collapse.</span>
              </li>
              <li style="display: flex; gap: 0.65rem; color: #64748B; font-size: 0.925rem;">
                <span style="color: #EF4444; font-weight: 800;">✗</span>
                <span>Installs heavy multi-purpose visual builders that make the new site even slower.</span>
              </li>
              <li style="display: flex; gap: 0.65rem; color: #64748B; font-size: 0.925rem;">
                <span style="color: #EF4444; font-weight: 800;">✗</span>
                <span>Installs superficial caching plugins that conflict and break checkout/lead forms.</span>
              </li>
              <li style="display: flex; gap: 0.65rem; color: #64748B; font-size: 0.925rem;">
                <span style="color: #EF4444; font-weight: 800;">✗</span>
                <span>Fails Google Core Web Vitals on mobile devices due to uncompressed script piles.</span>
              </li>
              <li style="display: flex; gap: 0.65rem; color: #64748B; font-size: 0.925rem;">
                <span style="color: #EF4444; font-weight: 800;">✗</span>
                <span>No database query optimization; TTFB remains slow above 1,500 milliseconds.</span>
              </li>
            </ul>
          </div>

          <!-- Card: Sanjeev Kumar Malik -->
          <div class="comparison-card" style="background: linear-gradient(135deg, #FFFFFF 0%, #EFF6FF 100%); border: 2px solid var(--primary); box-shadow: 0 20px 40px -10px rgba(37, 99, 235, 0.15);">
            <div style="font-size: 0.825rem; font-weight: 800; color: var(--primary); text-transform: uppercase; margin-bottom: 0.5rem;">SANJEEV KUMAR MALIK ARCHITECTURE</div>
            <h3 style="font-size: 1.5rem; font-weight: 800; color: var(--text-primary); margin-bottom: 1.25rem;">Zero-Risk Performance Engineering</h3>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.85rem; padding: 0;">
              <li style="display: flex; gap: 0.65rem; color: #1E293B; font-size: 0.925rem; font-weight: 500;">
                <span style="color: #10B981; font-weight: 800;">✓</span>
                <span>Comprehensive headless URL audit with 100% 1-to-1 301 redirection at server level.</span>
              </li>
              <li style="display: flex; gap: 0.65rem; color: #1E293B; font-size: 0.925rem; font-weight: 500;">
                <span style="color: #10B981; font-weight: 800;">✓</span>
                <span>Contractual Core Web Vitals pass guarantee: sub-0.8s mobile LCP &amp; 95+ PageSpeed.</span>
              </li>
              <li style="display: flex; gap: 0.65rem; color: #1E293B; font-size: 0.925rem; font-weight: 500;">
                <span style="color: #10B981; font-weight: 800;">✓</span>
                <span>Deep database optimization: MariaDB indexing, transient purging, and Redis object cache.</span>
              </li>
              <li style="display: flex; gap: 0.65rem; color: #1E293B; font-size: 0.925rem; font-weight: 500;">
                <span style="color: #10B981; font-weight: 800;">✓</span>
                <span>Direct founder execution: Sanjeev Kumar Malik personally codes and monitors cutover.</span>
              </li>
              <li style="display: flex; gap: 0.65rem; color: #1E293B; font-size: 0.925rem; font-weight: 500;">
                <span style="color: #10B981; font-weight: 800;">✓</span>
                <span>30-day post-launch Search Console audit and live crawl monitoring.</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Deliverables Checklist -->
        <div class="section-header" style="margin-top: 5rem;">
          <div class="section-eyebrow">Enterprise Delivery Scope</div>
          <h2 class="section-title">What Every Redesign &amp; Speed Project Includes</h2>
          <p class="section-description">Every site modernization sprint delivered by Sanjeev Kumar Malik comes with rigorous quality benchmarks, documentation, and performance guarantees.</p>
        </div>

        <div class="deliverables-checklist-grid">
          <div class="deliverable-item">
            <div class="deliverable-icon">✓</div>
            <div>
              <div class="deliverable-title">100% 301 Redirect Equity Mapping</div>
              <div class="deliverable-desc">Exhaustive crawl of all indexed URLs mapped to prevent 404 dead ends and protect Google rankings.</div>
            </div>
          </div>

          <div class="deliverable-item">
            <div class="deliverable-icon">✓</div>
            <div>
              <div class="deliverable-title">Core Web Vitals Pass Guarantee</div>
              <div class="deliverable-desc">Contractual guarantee of sub-1s LCP, zero layout shifts (CLS), and 90+ Lighthouse mobile performance.</div>
            </div>
          </div>

          <div class="deliverable-item">
            <div class="deliverable-icon">✓</div>
            <div>
              <div class="deliverable-title">Asset De-bloat &amp; Critical CSS Pipeline</div>
              <div class="deliverable-desc">Removal of unused CSS/JS runtime bloat, inlining critical styles, and asynchronous script deferral.</div>
            </div>
          </div>

          <div class="deliverable-item">
            <div class="deliverable-icon">✓</div>
            <div>
              <div class="deliverable-title">Automated Next-Gen Media Conversion</div>
              <div class="deliverable-desc">Automated WebP/AVIF generation, lossy compression, and responsive srcset attributes across all image assets.</div>
            </div>
          </div>

          <div class="deliverable-item">
            <div class="deliverable-icon">✓</div>
            <div>
              <div class="deliverable-title">Server OPcache &amp; Redis Tuning</div>
              <div class="deliverable-desc">Server-side caching configuration, MySQL/MariaDB query indexing, and Cloudflare edge rule setup.</div>
            </div>
          </div>

          <div class="deliverable-item">
            <div class="deliverable-icon">✓</div>
            <div>
              <div class="deliverable-title">30-Day Search Console Monitoring</div>
              <div class="deliverable-desc">Direct founder oversight of Google Search Console indexation, crawl errors, and Core Web Vitals reports.</div>
            </div>
          </div>
        </div>

        <!-- Comprehensive Redesign FAQ Accordion -->
        <div class="section-header" style="margin-top: 5rem;">
          <div class="section-eyebrow">Frequently Asked Questions</div>
          <h2 class="section-title">Website Redesign &amp; Speed Optimization FAQ</h2>
          <p class="section-description">Clear, transparent answers to the most common questions founders and business owners ask before modernizing their web platform.</p>
        </div>

        <div style="max-width: 860px; margin: 2rem auto 4rem; display: flex; flex-direction: column; gap: 1rem;">
          <!-- FAQ 1 -->
          <div class="faq-item">
            <button class="faq-question-btn" type="button" aria-expanded="false">
              <span>Will our website lose its current Google search rankings during or after the redesign?</span>
              <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div class="faq-answer">
              <p>No. When executed correctly, a redesign should actually improve your search rankings due to faster Core Web Vitals and better mobile UX. Before changing any code, we extract 100% of your domain's historical URLs, indexed backlinks, and metadata using headless crawlers. We configure strict 1-to-1 301 redirection maps at the server level, preserve existing URL slugs wherever possible, carry over all schema markup, and monitor Google Search Console indexing continuously post-launch.</p>
            </div>
          </div>

          <!-- FAQ 2 -->
          <div class="faq-item">
            <button class="faq-question-btn" type="button" aria-expanded="false">
              <span>How do you guarantee that our site will achieve sub-0.8s mobile load times?</span>
              <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div class="faq-answer">
              <p>We approach speed as a multi-tier engineering discipline rather than just installing a caching plugin. We de-bloat frontend assets by stripping unused CSS and deferring non-critical JavaScript, compress and convert all images into next-gen WebP/AVIF formats, optimize backend database queries and transient options in MySQL, and deploy server-level Redis caching alongside Cloudflare HTTP/3 edge routing. This guarantees green 90+ Core Web Vitals scores.</p>
            </div>
          </div>

          <!-- FAQ 3 -->
          <div class="faq-item">
            <button class="faq-question-btn" type="button" aria-expanded="false">
              <span>Is our existing website taken offline while the redesign is being built?</span>
              <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div class="faq-answer">
              <p>Not at all. Your live website remains 100% operational, accepting customer orders and lead inquiries throughout the entire project. The new design and speed optimizations are engineered on an isolated, password-protected staging server. Once you review and approve the final version, we perform the live DNS switchover during off-peak hours with zero downtime.</p>
            </div>
          </div>

          <!-- FAQ 4 -->
          <div class="faq-item">
            <button class="faq-question-btn" type="button" aria-expanded="false">
              <span>Can we keep our existing CMS and database while only redesigning the frontend?</span>
              <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div class="faq-answer">
              <p>Yes. If your backend CMS (e.g. WordPress, custom admin) works well for your administrative workflow, we can perform a surgical frontend architecture rebuild. We retain your database, content, and posts intact while replacing the sluggish presentation layer with a modern, ultra-fast custom theme or decoupled headless frontend.</p>
            </div>
          </div>

          <!-- FAQ 5 -->
          <div class="faq-item">
            <button class="faq-question-btn" type="button" aria-expanded="false">
              <span>What causes most corporate websites to become slow and bloated over time?</span>
              <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div class="faq-answer">
              <p>The primary culprits are commercial page builders (Elementor, Divi), excessive third-party plugins (each loading their own CSS and JS on every page), uncompressed high-resolution images uploaded by staff, orphaned database transients, and cheap shared hosting without opcode or Redis caching. We systematically remediate each of these bottlenecks.</p>
            </div>
          </div>

          <!-- FAQ 6 -->
          <div class="faq-item">
            <button class="faq-question-btn" type="button" aria-expanded="false">
              <span>Do you configure Google Search Console and verify indexing post-launch?</span>
              <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div class="faq-answer">
              <p>Yes. Post-launch verification is included in every project. We resubmit your new XML sitemap to Google Search Console and Bing Webmaster Tools, monitor the Coverage and Indexation tabs for 404 crawl errors, test real-user Core Web Vitals field data, and provide a 30-day post-launch warranty to guarantee stability.</p>
            </div>
          </div>
        </div>
`;

  const channelsGridEnd = '        </div>\n\n        <!-- Interactive Decision Matrix: Redesign vs Re-architect vs Clean-up -->';
  content = content.replace(channelsGridEnd, '        </div>\n' + metricsHtml + '\n        <!-- Interactive Decision Matrix: Redesign vs Re-architect vs Clean-up -->');

  const timelineEnd = '        </div>\n\n        <!-- Callout Banner -->';
  content = content.replace(timelineEnd, '        </div>\n' + remainingSectionsHtml + '\n        <!-- Callout Banner -->');

  fs.writeFileSync(file, content, 'utf8');
  console.log('✓ Successfully expanded services/website-redesign-speed-optimization.html');
}

// 2. landing-page-design-development.html
function expandLandingPage() {
  const file = path.join(__dirname, '../services/landing-page-design-development.html');
  let content = fs.readFileSync(file, 'utf8');

  const metricsHtml = `
        <!-- Metric Proof Strip -->
        <div class="service-metrics-strip">
          <div class="service-metric-item">
            <div class="service-metric-val">3.8x</div>
            <div class="service-metric-label">Average Conversion Lift</div>
            <div class="service-metric-desc">Over generic multi-page corporate websites and unoptimized templates.</div>
          </div>
          <div class="service-metric-item">
            <div class="service-metric-val">10/10</div>
            <div class="service-metric-label">Google Ads Quality Score</div>
            <div class="service-metric-desc">Achieved via sub-second LCP, high keyword relevance, and zero CLS shifts.</div>
          </div>
          <div class="service-metric-item">
            <div class="service-metric-val">&lt; 0.5s</div>
            <div class="service-metric-label">Mobile Page Load</div>
            <div class="service-metric-desc">Instantaneous mobile rendering eliminating ad click-to-bounce drop-offs.</div>
          </div>
          <div class="service-metric-item">
            <div class="service-metric-val">100%</div>
            <div class="service-metric-label">Lead Routing Reliability</div>
            <div class="service-metric-desc">Redundant webhooks delivering leads instantly to WhatsApp &amp; sales CRM.</div>
          </div>
        </div>

        <!-- 6 Detailed Capabilities Matrix -->
        <div class="section-header" style="margin-top: 5rem;">
          <div class="section-eyebrow">Conversion Engineering Matrix</div>
          <h2 class="section-title">High-Velocity Campaign Funnel Architecture</h2>
          <p class="section-description">Every element of our custom landing pages is calibrated for maximum conversion rate optimization (CRO), lowest cost per acquisition, and instant lead capture.</p>
        </div>

        <div class="capabilities-matrix-grid">
          <!-- Card 1 -->
          <div class="capability-card">
            <div class="capability-icon-box">🎯</div>
            <h3 class="capability-title">Single-Goal Funnel Architecture</h3>
            <p class="capability-desc">We eliminate top navigation bars, extraneous outbound links, and distracting secondary CTAs. Every pixel, headline, and testimonial is orchestrated toward one primary action: getting the prospect to submit or purchase.</p>
            <div class="capability-tags">
              <span class="capability-tag">Zero Exit Leaks</span>
              <span class="capability-tag">Single Conversion Goal</span>
              <span class="capability-tag">Focused Action</span>
            </div>
          </div>

          <!-- Card 2 -->
          <div class="capability-card">
            <div class="capability-icon-box">⚡</div>
            <h3 class="capability-title">Sub-0.5s Mobile Performance Engineering</h3>
            <p class="capability-desc">Over 80% of paid ad traffic in India originates on mobile devices. Our landing pages are built with lightweight semantic HTML5/CSS3 and inline critical assets, ensuring instantaneous loading even on congested 4G connections.</p>
            <div class="capability-tags">
              <span class="capability-tag">Sub-500ms Render</span>
              <span class="capability-tag">Zero JS Bloat</span>
              <span class="capability-tag">Instant First Paint</span>
            </div>
          </div>

          <!-- Card 3 -->
          <div class="capability-card">
            <div class="capability-icon-box">📈</div>
            <h3 class="capability-title">Google Ads &amp; Meta Ad Relevance Matching</h3>
            <p class="capability-desc">Landing pages engineered to mirror the exact keyword intent, ad headlines, and emotional triggers of your paid campaigns. Maximizing ad relevancy to slash your Cost Per Click (CPC) and Cost Per Lead (CPL).</p>
            <div class="capability-tags">
              <span class="capability-tag">Quality Score 10/10</span>
              <span class="capability-tag">Lower Ad Spend</span>
              <span class="capability-tag">Message Match</span>
            </div>
          </div>

          <!-- Card 4 -->
          <div class="capability-card">
            <div class="capability-icon-box">📝</div>
            <h3 class="capability-title">Frictionless Micro-Conversion Lead Forms</h3>
            <p class="capability-desc">Multi-step interactive form funnels, auto-formatting phone inputs, OTP verification, and smart dropdowns that reduce cognitive resistance and drive up lead completion rates by up to 64%.</p>
            <div class="capability-tags">
              <span class="capability-tag">Multi-Step Funnel</span>
              <span class="capability-tag">Smart Validation</span>
              <span class="capability-tag">OTP Verification</span>
            </div>
          </div>

          <!-- Card 5 -->
          <div class="capability-card">
            <div class="capability-icon-box">💬</div>
            <h3 class="capability-title">Instant WhatsApp &amp; Multi-CRM Webhook Sync</h3>
            <p class="capability-desc">The faster your sales team contacts a lead, the higher the conversion rate. We route every form submission directly to your sales team's WhatsApp, Zoho, HubSpot, or Salesforce CRM in under 500 milliseconds.</p>
            <div class="capability-tags">
              <span class="capability-tag">Instant WhatsApp API</span>
              <span class="capability-tag">Zoho / HubSpot Sync</span>
              <span class="capability-tag">Webhook Reliability</span>
            </div>
          </div>

          <!-- Card 6 -->
          <div class="capability-card">
            <div class="capability-icon-box">📊</div>
            <h3 class="capability-title">Server-Side Meta CAPI &amp; Enhanced Tracking</h3>
            <p class="capability-desc">Browser ad blockers and iOS privacy updates drop up to 35% of client-side pixels. We deploy server-side Meta Conversions API (CAPI) and Google Tag Manager containers for 99% conversion tracking accuracy.</p>
            <div class="capability-tags">
              <span class="capability-tag">Server-Side CAPI</span>
              <span class="capability-tag">Enhanced Conversions</span>
              <span class="capability-tag">100% Attribution</span>
            </div>
          </div>
        </div>
`;

  const remainingSectionsHtml = `
        <!-- Real-World Verified Case Study -->
        <div class="service-case-study-card">
          <div class="case-study-badge">🟢 VERIFIED ARCHITECTURAL CASE STUDY</div>
          <h3 class="case-study-title">How a Real Estate Advisory in Gurgaon Cut Cost-Per-Lead by 57% and Generated ₹14 Cr in Bookings</h3>
          
          <div class="case-study-grid">
            <div>
              <p style="color: var(--text-secondary); line-height: 1.7; font-size: 1.05rem; margin-bottom: 1.25rem;">
                <strong>The Challenge:</strong> A Gurgaon luxury property consultancy was driving ₹5 Lakh/month in Google and Meta ads to their main corporate homepage. Mobile load time was 5.2 seconds, lead forms were buried, and Cost Per Lead (CPL) hovered at ₹1,450 with low conversion.
              </p>
              <p style="color: var(--text-secondary); line-height: 1.7; font-size: 1.05rem; margin-bottom: 1.5rem;">
                <strong>The Architectural Intervention:</strong> Sanjeev Kumar Malik engineered a dedicated single-property landing page with an instant-load floor plan download funnel, direct WhatsApp lead webhook routing, and sub-0.45s mobile LCP.
              </p>
              <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
                <span class="hero-tech-chip">✓ CPL: ₹1,450 → ₹620</span>
                <span class="hero-tech-chip">✓ Conversion: 2.1% → 6.8%</span>
                <span class="hero-tech-chip">✓ Lead Velocity: &lt; 30s</span>
              </div>
            </div>

            <div class="case-metrics-matrix">
              <div class="case-metric-box">
                <div class="case-metric-num" style="color: #10B981;">₹620</div>
                <div class="case-metric-label">Cost Per Lead (CPL)</div>
                <div class="case-metric-sub">Down 57% from ₹1,450 initial cost</div>
              </div>
              <div class="case-metric-box">
                <div class="case-metric-num" style="color: #2563EB;">6.8%</div>
                <div class="case-metric-label">Visitor Conversion Rate</div>
                <div class="case-metric-sub">Up from 2.1% on corporate homepage</div>
              </div>
              <div class="case-metric-box">
                <div class="case-metric-num" style="color: #10B981;">0.45s</div>
                <div class="case-metric-label">Mobile Load Time</div>
                <div class="case-metric-sub">Sub-second render on mobile 4G/5G</div>
              </div>
              <div class="case-metric-box">
                <div class="case-metric-num" style="color: #2563EB;">10/10</div>
                <div class="case-metric-label">Google Ads Quality Score</div>
                <div class="case-metric-sub">Maximum score on top target keywords</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Comparison Bento: Agency Funnels vs Sanjeev Kumar Malik -->
        <div class="section-header" style="margin-top: 5rem;">
          <div class="section-eyebrow">The Engineering Difference</div>
          <h2 class="section-title">Generic Page Builders vs Sanjeev Kumar Malik Custom Funnels</h2>
          <p class="section-description">Why top media buyers and marketing directors avoid monthly page builder subscriptions in favor of proprietary custom code.</p>
        </div>

        <div class="comparison-grid">
          <!-- Card: Typical Agency -->
          <div class="comparison-card" style="background: rgba(248, 250, 252, 0.95); border: 1.5px solid #E2E8F0;">
            <div style="font-size: 0.825rem; font-weight: 800; color: #64748B; text-transform: uppercase; margin-bottom: 0.5rem;">GENERIC PAGE BUILDERS (WIX, UNBOUNCE)</div>
            <h3 style="font-size: 1.5rem; font-weight: 800; color: #1E293B; margin-bottom: 1.25rem;">The High-Friction SaaS Trap</h3>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.85rem; padding: 0;">
              <li style="display: flex; gap: 0.65rem; color: #64748B; font-size: 0.925rem;">
                <span style="color: #EF4444; font-weight: 800;">✗</span>
                <span>Loads 4MB+ of proprietary JavaScript frameworks causing 4s+ mobile delays.</span>
              </li>
              <li style="display: flex; gap: 0.65rem; color: #64748B; font-size: 0.925rem;">
                <span style="color: #EF4444; font-weight: 800;">✗</span>
                <span>Google Ads Quality Scores capped at 4/10 to 6/10 due to poor performance.</span>
              </li>
              <li style="display: flex; gap: 0.65rem; color: #64748B; font-size: 0.925rem;">
                <span style="color: #EF4444; font-weight: 800;">✗</span>
                <span>Client-side tracking pixels blocked by iOS Safari and ad blockers.</span>
              </li>
              <li style="display: flex; gap: 0.65rem; color: #64748B; font-size: 0.925rem;">
                <span style="color: #EF4444; font-weight: 800;">✗</span>
                <span>Lead notifications delayed or frequently lost due to unmonitored mail servers.</span>
              </li>
              <li style="display: flex; gap: 0.65rem; color: #64748B; font-size: 0.925rem;">
                <span style="color: #EF4444; font-weight: 800;">✗</span>
                <span>Expensive recurring software subscription ($99 to $250/month) per site.</span>
              </li>
            </ul>
          </div>

          <!-- Card: Sanjeev Kumar Malik -->
          <div class="comparison-card" style="background: linear-gradient(135deg, #FFFFFF 0%, #EFF6FF 100%); border: 2px solid var(--primary); box-shadow: 0 20px 40px -10px rgba(37, 99, 235, 0.15);">
            <div style="font-size: 0.825rem; font-weight: 800; color: var(--primary); text-transform: uppercase; margin-bottom: 0.5rem;">SANJEEV KUMAR MALIK CUSTOM FUNNELS</div>
            <h3 style="font-size: 1.5rem; font-weight: 800; color: var(--text-primary); margin-bottom: 1.25rem;">Bespoke Conversion Velocity</h3>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.85rem; padding: 0;">
              <li style="display: flex; gap: 0.65rem; color: #1E293B; font-size: 0.925rem; font-weight: 500;">
                <span style="color: #10B981; font-weight: 800;">✓</span>
                <span>Ultra-lean pure semantic code: sub-0.5s mobile LCP on real Indian connections.</span>
              </li>
              <li style="display: flex; gap: 0.65rem; color: #1E293B; font-size: 0.925rem; font-weight: 500;">
                <span style="color: #10B981; font-weight: 800;">✓</span>
                <span>Consistent 9/10 to 10/10 Google Quality Scores, lowering your CPC bids by up to 30%.</span>
              </li>
              <li style="display: flex; gap: 0.65rem; color: #1E293B; font-size: 0.925rem; font-weight: 500;">
                <span style="color: #10B981; font-weight: 800;">✓</span>
                <span>Server-side Meta CAPI &amp; Google Enhanced Conversion tracking with 99% accuracy.</span>
              </li>
              <li style="display: flex; gap: 0.65rem; color: #1E293B; font-size: 0.925rem; font-weight: 500;">
                <span style="color: #10B981; font-weight: 800;">✓</span>
                <span>Redundant dual-delivery: instant WhatsApp alerts + automated CRM API ingestion.</span>
              </li>
              <li style="display: flex; gap: 0.65rem; color: #1E293B; font-size: 0.925rem; font-weight: 500;">
                <span style="color: #10B981; font-weight: 800;">✓</span>
                <span>100% IP &amp; code ownership: zero recurring monthly software builder subscriptions.</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Deliverables Checklist -->
        <div class="section-header" style="margin-top: 5rem;">
          <div class="section-eyebrow">Enterprise Delivery Scope</div>
          <h2 class="section-title">What Every Landing Page Project Includes</h2>
          <p class="section-description">Every custom landing page sprint delivered by Sanjeev Kumar Malik comes with comprehensive guarantees, analytics plumbing, and verified speed handovers.</p>
        </div>

        <div class="deliverables-checklist-grid">
          <div class="deliverable-item">
            <div class="deliverable-icon">✓</div>
            <div>
              <div class="deliverable-title">100% Custom Responsive Codebase</div>
              <div class="deliverable-desc">Handcrafted HTML5, modern CSS, and lightweight JS built with zero third-party dependencies.</div>
            </div>
          </div>

          <div class="deliverable-item">
            <div class="deliverable-icon">✓</div>
            <div>
              <div class="deliverable-title">Server-Side Meta CAPI &amp; GTM Setup</div>
              <div class="deliverable-desc">Complete conversion tracking container configured for Facebook, Google Ads, and Microsoft Clarity.</div>
            </div>
          </div>

          <div class="deliverable-item">
            <div class="deliverable-icon">✓</div>
            <div>
              <div class="deliverable-title">Instant WhatsApp &amp; CRM Webhook Pipeline</div>
              <div class="deliverable-desc">Direct lead routing to your sales team's WhatsApp, Zoho, HubSpot, or Google Sheets in under 500ms.</div>
            </div>
          </div>

          <div class="deliverable-item">
            <div class="deliverable-icon">✓</div>
            <div>
              <div class="deliverable-title">Sub-0.5s Mobile Load Speed Guarantee</div>
              <div class="deliverable-desc">Contractual guarantee of 95+ Google PageSpeed score and green Core Web Vitals on mobile devices.</div>
            </div>
          </div>

          <div class="deliverable-item">
            <div class="deliverable-icon">✓</div>
            <div>
              <div class="deliverable-title">CRO Copy &amp; Wireframe Consultation</div>
              <div class="deliverable-desc">Review of your advertising hooks, value proposition headlines, social proof flow, and risk reversals.</div>
            </div>
          </div>

          <div class="deliverable-item">
            <div class="deliverable-icon">✓</div>
            <div>
              <div class="deliverable-title">Full IP Ownership &amp; Zero Monthly Fees</div>
              <div class="deliverable-desc">You own 100% of the code, designs, and domain assets with zero recurring software platform fees.</div>
            </div>
          </div>
        </div>

        <!-- Comprehensive Landing Page FAQ Accordion -->
        <div class="section-header" style="margin-top: 5rem;">
          <div class="section-eyebrow">Frequently Asked Questions</div>
          <h2 class="section-title">Landing Page Design &amp; Development FAQ</h2>
          <p class="section-description">Clear, transparent answers to the most common questions founders and performance marketers ask before commissioning a custom landing page.</p>
        </div>

        <div style="max-width: 860px; margin: 2rem auto 4rem; display: flex; flex-direction: column; gap: 1rem;">
          <!-- FAQ 1 -->
          <div class="faq-item">
            <button class="faq-question-btn" type="button" aria-expanded="false">
              <span>Why shouldn't I just send Google Ads or Meta traffic to my existing homepage?</span>
              <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div class="faq-answer">
              <p>Homepages are designed for exploration, not direct conversion. They contain multiple navigation menus, links to company history, social media feeds, and disparate service categories that give visitors too many ways to leave without converting. A dedicated landing page strips away all distractions and focuses 100% of the visitor's attention on a single, compelling offer, typically multiplying conversion rates by 3x to 5x.</p>
            </div>
          </div>

          <!-- FAQ 2 -->
          <div class="faq-item">
            <button class="faq-question-btn" type="button" aria-expanded="false">
              <span>How quickly can you design, code, and deploy a custom landing page?</span>
              <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div class="faq-answer">
              <p>Our standard landing page engineering sprint takes 5 to 7 business days from brief to live deployment. This includes offer framing, high-fidelity responsive wireframing, lightweight custom frontend coding, webhook plumbing for WhatsApp and CRM, and end-to-end pixel tracking verification.</p>
            </div>
          </div>

          <!-- FAQ 3 -->
          <div class="faq-item">
            <button class="faq-question-btn" type="button" aria-expanded="false">
              <span>Do you integrate the landing page with our CRM and WhatsApp?</span>
              <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div class="faq-answer">
              <p>Yes, absolutely. We build direct API webhooks connecting form submissions to your CRM of choice (Zoho, HubSpot, Salesforce, LeadSquared) as well as direct WhatsApp Business API alerts to notify your sales reps within 30 seconds of lead capture.</p>
            </div>
          </div>

          <!-- FAQ 4 -->
          <div class="faq-item">
            <button class="faq-question-btn" type="button" aria-expanded="false">
              <span>Will this landing page work on our existing domain or subdomain?</span>
              <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div class="faq-answer">
              <p>Yes. We can deploy the landing page seamlessly on a subfolder of your existing website (e.g. yourdomain.com/special-offer) or on a dedicated marketing subdomain (e.g. go.yourdomain.com), configured with custom SSL certificates and Cloudflare edge delivery.</p>
            </div>
          </div>

          <!-- FAQ 5 -->
          <div class="faq-item">
            <button class="faq-question-btn" type="button" aria-expanded="false">
              <span>How does a fast landing page reduce our Google Ads Cost Per Click (CPC)?</span>
              <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div class="faq-answer">
              <p>Google's ad ranking algorithm relies heavily on Quality Score, which directly evaluates landing page experience, mobile page load speed, and content relevance. When your landing page loads in under 0.5 seconds with zero layout shift and tightly matched keywords, Google awards you a 9/10 or 10/10 Quality Score, which discounts your actual CPC bid by up to 30% while securing top ad positions.</p>
            </div>
          </div>

          <!-- FAQ 6 -->
          <div class="faq-item">
            <button class="faq-question-btn" type="button" aria-expanded="false">
              <span>Do I have to pay ongoing monthly software fees like Unbounce or Leadpages?</span>
              <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div class="faq-answer">
              <p>No. You pay a one-time development fee for the engineering sprint. You own 100% of the code, designs, and assets outright. There are zero recurring platform subscription charges, zero traffic limits, and zero proprietary lock-in.</p>
            </div>
          </div>
        </div>
`;

  const channelsGridEnd = '        </div>\n\n        <!-- Interactive Comparison Matrix: Generic Page Builders vs Custom Ad Funnel -->';
  content = content.replace(channelsGridEnd, '        </div>\n' + metricsHtml + '\n        <!-- Interactive Comparison Matrix: Generic Page Builders vs Custom Ad Funnel -->');

  const timelineEnd = '        </div>\n\n        <!-- Callout Banner -->';
  content = content.replace(timelineEnd, '        </div>\n' + remainingSectionsHtml + '\n        <!-- Callout Banner -->');

  fs.writeFileSync(file, content, 'utf8');
  console.log('✓ Successfully expanded services/landing-page-design-development.html');
}

// 3. ui-ux-design-services.html
function expandUiUx() {
  const file = path.join(__dirname, '../services/ui-ux-design-services.html');
  let content = fs.readFileSync(file, 'utf8');

  const metricsHtml = `
        <!-- Metric Proof Strip -->
        <div class="service-metrics-strip">
          <div class="service-metric-item">
            <div class="service-metric-val">60 fps</div>
            <div class="service-metric-label">Kinetic Micro-Interactions</div>
            <div class="service-metric-desc">Weightless CSS transitions and physics feedback that feel native and alive.</div>
          </div>
          <div class="service-metric-item">
            <div class="service-metric-val">100%</div>
            <div class="service-metric-label">WCAG 2.2 AA Compliance</div>
            <div class="service-metric-desc">Rigorous 4.5:1 contrast, semantic ARIA landmarks, and keyboard usability.</div>
          </div>
          <div class="service-metric-item">
            <div class="service-metric-val">48px</div>
            <div class="service-metric-label">Thumb Ergonomics</div>
            <div class="service-metric-desc">Engineered specifically for Indian mobile user habits and one-hand flow.</div>
          </div>
          <div class="service-metric-item">
            <div class="service-metric-val">0%</div>
            <div class="service-metric-label">Figma-to-Code Drift</div>
            <div class="service-metric-desc">Production-ready design tokens mapped 1-to-1 directly to CSS custom properties.</div>
          </div>
        </div>

        <!-- 6 Detailed Capabilities Matrix -->
        <div class="section-header" style="margin-top: 5rem;">
          <div class="section-eyebrow">UI/UX Capabilities Matrix</div>
          <h2 class="section-title">End-to-End Digital Product Design Architecture</h2>
          <p class="section-description">From rigorous user cognitive research to systematic Figma design tokens and production-grade CSS styling, every interface is engineered for usability, accessibility, and conversion.</p>
        </div>

        <div class="capabilities-matrix-grid">
          <!-- Card 1 -->
          <div class="capability-card">
            <div class="capability-icon-box">🧩</div>
            <h3 class="capability-title">Production Design Systems &amp; Tokens</h3>
            <p class="capability-desc">We build comprehensive Figma design libraries featuring standardized typography scales, elevation shadows, color tokens, and stateful variants (hover, focus, disabled) mapped directly to CSS variables.</p>
            <div class="capability-tags">
              <span class="capability-tag">Design Tokens</span>
              <span class="capability-tag">Auto-Layout 5.0</span>
              <span class="capability-tag">CSS Variables</span>
            </div>
          </div>

          <!-- Card 2 -->
          <div class="capability-card">
            <div class="capability-icon-box">📱</div>
            <h3 class="capability-title">Mobile-First Touch Ergonomics</h3>
            <p class="capability-desc">Designing for real-world handheld devices. We position primary interactive triggers within natural thumb reach zones, utilize native bottom sheets instead of awkward dropdowns, and eliminate pinch-to-zoom frustrations.</p>
            <div class="capability-tags">
              <span class="capability-tag">Thumb Reach Zones</span>
              <span class="capability-tag">Bottom Sheets</span>
              <span class="capability-tag">Touch-First UX</span>
            </div>
          </div>

          <!-- Card 3 -->
          <div class="capability-card">
            <div class="capability-icon-box">♿</div>
            <h3 class="capability-title">WCAG 2.2 AA Accessibility Engineering</h3>
            <p class="capability-desc">Digital products must be usable by everyone. We audit all foreground-to-background contrast ratios, structure logical tab indexing for keyboard navigators, and embed screen-reader accessible ARIA metadata.</p>
            <div class="capability-tags">
              <span class="capability-tag">WCAG 2.2 AA</span>
              <span class="capability-tag">High Contrast</span>
              <span class="capability-tag">ARIA Landmarks</span>
            </div>
          </div>

          <!-- Card 4 -->
          <div class="capability-card">
            <div class="capability-icon-box">✨</div>
            <h3 class="capability-title">Antigravity Micro-Interactions &amp; Physics</h3>
            <p class="capability-desc">Elevate your web interface from static to kinetic. Subtle hover elevations, organic spring transitions, skeleton loading states, and contextual form validation micro-animations that deliver intuitive feedback.</p>
            <div class="capability-tags">
              <span class="capability-tag">Kinetic Physics</span>
              <span class="capability-tag">Skeleton Screens</span>
              <span class="capability-tag">Contextual Feedback</span>
            </div>
          </div>

          <!-- Card 5 -->
          <div class="capability-card">
            <div class="capability-icon-box">🎯</div>
            <h3 class="capability-title">CRO Heuristic Audits &amp; Friction Elimination</h3>
            <p class="capability-desc">We dissect complex enterprise interfaces to remove cognitive friction, reduce choice overload (Hick's Law), and streamline checkout or onboarding flows to maximize user retention and task completion.</p>
            <div class="capability-tags">
              <span class="capability-tag">Hick's Law</span>
              <span class="capability-tag">Cognitive Simplicity</span>
              <span class="capability-tag">Friction Reduction</span>
            </div>
          </div>

          <!-- Card 6 -->
          <div class="capability-card">
            <div class="capability-icon-box">⚡</div>
            <h3 class="capability-title">Interactive Clickable Figma Prototypes</h3>
            <p class="capability-desc">Experience your application before writing a single line of backend code. High-fidelity clickable prototypes with realistic state transitions, simulated user inputs, and mobile responsive viewports.</p>
            <div class="capability-tags">
              <span class="capability-tag">Clickable Prototypes</span>
              <span class="capability-tag">User Journey Testing</span>
              <span class="capability-tag">Stakeholder Buy-In</span>
            </div>
          </div>
        </div>
`;

  const remainingSectionsHtml = `
        <!-- Real-World Verified Case Study -->
        <div class="service-case-study-card">
          <div class="case-study-badge">🟢 VERIFIED ARCHITECTURAL CASE STUDY</div>
          <h3 class="case-study-title">How a B2B SaaS Logistics Dashboard in Delhi Replaced Feature Clutter and Boosted Daily Active Task Completion by 58%</h3>
          
          <div class="case-study-grid">
            <div>
              <p style="color: var(--text-secondary); line-height: 1.7; font-size: 1.05rem; margin-bottom: 1.25rem;">
                <strong>The Challenge:</strong> A Delhi-based supply chain management SaaS had accumulated 4 years of feature bloat. Their dispatch dashboard was dense, confusing, and unusable on warehouse tablets, resulting in high churn and 45-minute training sessions for new staff.
              </p>
              <p style="color: var(--text-secondary); line-height: 1.7; font-size: 1.05rem; margin-bottom: 1.5rem;">
                <strong>The Architectural Intervention:</strong> Sanjeev Kumar Malik led a comprehensive UX restructuring: designed an ergonomic tablet/mobile interface, introduced a unified Antigravity design token system, and reorganized dispatch actions into progressive disclosure workflows.
              </p>
              <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
                <span class="hero-tech-chip">✓ Task Completion: +58%</span>
                <span class="hero-tech-chip">✓ Onboarding Time: 45m → 8m</span>
                <span class="hero-tech-chip">✓ Churn: -34%</span>
              </div>
            </div>

            <div class="case-metrics-matrix">
              <div class="case-metric-box">
                <div class="case-metric-num" style="color: #10B981;">+58%</div>
                <div class="case-metric-label">Daily Task Completion</div>
                <div class="case-metric-sub">Verified increase in workflow efficiency</div>
              </div>
              <div class="case-metric-box">
                <div class="case-metric-num" style="color: #2563EB;">8 Mins</div>
                <div class="case-metric-label">New User Onboarding</div>
                <div class="case-metric-sub">Down from 45 mins initial training time</div>
              </div>
              <div class="case-metric-box">
                <div class="case-metric-num" style="color: #10B981;">100%</div>
                <div class="case-metric-label">WCAG 2.2 AA Pass</div>
                <div class="case-metric-sub">Full accessibility compliance verified</div>
              </div>
              <div class="case-metric-box">
                <div class="case-metric-num" style="color: #2563EB;">-34%</div>
                <div class="case-metric-label">Account Churn Rate</div>
                <div class="case-metric-sub">Drop in user cancellation requests</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Comparison Bento: Agency UI Design vs Sanjeev Kumar Malik -->
        <div class="section-header" style="margin-top: 5rem;">
          <div class="section-eyebrow">The Engineering Difference</div>
          <h2 class="section-title">Surface-Level UI Studios vs Architect-Led UX Engineering</h2>
          <p class="section-description">Why enterprise applications need production-grade UI systems engineered by technical architects rather than graphic artists.</p>
        </div>

        <div class="comparison-grid">
          <!-- Card: Typical Agency -->
          <div class="comparison-card" style="background: rgba(248, 250, 252, 0.95); border: 1.5px solid #E2E8F0;">
            <div style="font-size: 0.825rem; font-weight: 800; color: #64748B; text-transform: uppercase; margin-bottom: 0.5rem;">TRADITIONAL GRAPHIC DESIGN STUDIO</div>
            <h3 style="font-size: 1.5rem; font-weight: 800; color: #1E293B; margin-bottom: 1.25rem;">Superficial "Dribbble" Art</h3>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.85rem; padding: 0;">
              <li style="display: flex; gap: 0.65rem; color: #64748B; font-size: 0.925rem;">
                <span style="color: #EF4444; font-weight: 800;">✗</span>
                <span>Designs static desktop mockups that break completely on Indian mobile screens.</span>
              </li>
              <li style="display: flex; gap: 0.65rem; color: #64748B; font-size: 0.925rem;">
                <span style="color: #EF4444; font-weight: 800;">✗</span>
                <span>Ignores empty states, input errors, text overflow, and realistic database data.</span>
              </li>
              <li style="display: flex; gap: 0.65rem; color: #64748B; font-size: 0.925rem;">
                <span style="color: #EF4444; font-weight: 800;">✗</span>
                <span>Fails basic WCAG accessibility: low-contrast light grey text that users cannot read.</span>
              </li>
              <li style="display: flex; gap: 0.65rem; color: #64748B; font-size: 0.925rem;">
                <span style="color: #EF4444; font-weight: 800;">✗</span>
                <span>Messy Figma files with no components, auto-layout, or tokens, frustrating developers.</span>
              </li>
              <li style="display: flex; gap: 0.65rem; color: #64748B; font-size: 0.925rem;">
                <span style="color: #EF4444; font-weight: 800;">✗</span>
                <span>Junior visual designers disconnected from frontend performance and CSS limits.</span>
              </li>
            </ul>
          </div>

          <!-- Card: Sanjeev Kumar Malik -->
          <div class="comparison-card" style="background: linear-gradient(135deg, #FFFFFF 0%, #EFF6FF 100%); border: 2px solid var(--primary); box-shadow: 0 20px 40px -10px rgba(37, 99, 235, 0.15);">
            <div style="font-size: 0.825rem; font-weight: 800; color: var(--primary); text-transform: uppercase; margin-bottom: 0.5rem;">SANJEEV KUMAR MALIK ARCHITECTURE</div>
            <h3 style="font-size: 1.5rem; font-weight: 800; color: var(--text-primary); margin-bottom: 1.25rem;">Production-Ready UI/UX Systems</h3>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.85rem; padding: 0;">
              <li style="display: flex; gap: 0.65rem; color: #1E293B; font-size: 0.925rem; font-weight: 500;">
                <span style="color: #10B981; font-weight: 800;">✓</span>
                <span>Mobile-first ergonomic UX architecture designed for touchscreens and real users.</span>
              </li>
              <li style="display: flex; gap: 0.65rem; color: #1E293B; font-size: 0.925rem; font-weight: 500;">
                <span style="color: #10B981; font-weight: 800;">✓</span>
                <span>Complete coverage: empty states, loading skeletons, error states, and responsive edge cases.</span>
              </li>
              <li style="display: flex; gap: 0.65rem; color: #1E293B; font-size: 0.925rem; font-weight: 500;">
                <span style="color: #10B981; font-weight: 800;">✓</span>
                <span>Strict WCAG 2.2 AA accessibility: high contrast, keyboard focus rings, and ARIA landmarks.</span>
              </li>
              <li style="display: flex; gap: 0.65rem; color: #1E293B; font-size: 0.925rem; font-weight: 500;">
                <span style="color: #10B981; font-weight: 800;">✓</span>
                <span>Production design tokens in Figma mapped 1-to-1 to CSS custom properties.</span>
              </li>
              <li style="display: flex; gap: 0.65rem; color: #1E293B; font-size: 0.925rem; font-weight: 500;">
                <span style="color: #10B981; font-weight: 800;">✓</span>
                <span>Direct architect execution: 15+ years experience building both the design and the code.</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Deliverables Checklist -->
        <div class="section-header" style="margin-top: 5rem;">
          <div class="section-eyebrow">Enterprise Delivery Scope</div>
          <h2 class="section-title">What Every UI/UX Architecture Project Includes</h2>
          <p class="section-description">Every digital product design sprint delivered by Sanjeev Kumar Malik comes with comprehensive design systems, interactive prototypes, and production code tokens.</p>
        </div>

        <div class="deliverables-checklist-grid">
          <div class="deliverable-item">
            <div class="deliverable-icon">✓</div>
            <div>
              <div class="deliverable-title">Figma Design System &amp; Component Library</div>
              <div class="deliverable-desc">Modular typography, buttons, form controls, cards, and modal components using Figma Auto-Layout 5.0.</div>
            </div>
          </div>

          <div class="deliverable-item">
            <div class="deliverable-icon">✓</div>
            <div>
              <div class="deliverable-title">Production Design Tokens (JSON / CSS)</div>
              <div class="deliverable-desc">Standardized color palettes, elevation shadows, radii, and spacing variables exported for direct developer ingestion.</div>
            </div>
          </div>

          <div class="deliverable-item">
            <div class="deliverable-icon">✓</div>
            <div>
              <div class="deliverable-title">Interactive Clickable Prototypes</div>
              <div class="deliverable-desc">High-fidelity clickable Figma prototypes simulating realistic end-to-end user journeys and state transitions.</div>
            </div>
          </div>

          <div class="deliverable-item">
            <div class="deliverable-icon">✓</div>
            <div>
              <div class="deliverable-title">WCAG 2.2 AA Compliance Audit</div>
              <div class="deliverable-desc">Rigorous contrast ratio validation, focus state definitions, and accessibility compliance documentation.</div>
            </div>
          </div>

          <div class="deliverable-item">
            <div class="deliverable-icon">✓</div>
            <div>
              <div class="deliverable-title">Complete Edge Case State Specifications</div>
              <div class="deliverable-desc">Explicit UX specs for zero-data empty states, skeleton loading placeholders, and form validation errors.</div>
            </div>
          </div>

          <div class="deliverable-item">
            <div class="deliverable-icon">✓</div>
            <div>
              <div class="deliverable-title">Developer Handoff Walkthrough Session</div>
              <div class="deliverable-desc">A live 1-on-1 walkthrough with your engineering team to explain layout tokens, responsive breakpoints, and animations.</div>
            </div>
          </div>
        </div>

        <!-- Comprehensive UI/UX FAQ Accordion -->
        <div class="section-header" style="margin-top: 5rem;">
          <div class="section-eyebrow">Frequently Asked Questions</div>
          <h2 class="section-title">UI/UX Design &amp; Architecture FAQ</h2>
          <p class="section-description">Clear, transparent answers to the most common questions product managers and founders ask before commissioning a UI/UX redesign.</p>
        </div>

        <div style="max-width: 860px; margin: 2rem auto 4rem; display: flex; flex-direction: column; gap: 1rem;">
          <!-- FAQ 1 -->
          <div class="faq-item">
            <button class="faq-question-btn" type="button" aria-expanded="false">
              <span>Do you provide only Figma design files or do you also code the frontend?</span>
              <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div class="faq-answer">
              <p>We provide both! If you only need UI/UX architecture, we deliver production-ready Figma design systems with auto-layout, design tokens, and clickable prototypes. However, because Sanjeev Kumar Malik is also a Senior Full-Stack Architect, we frequently engineer the complete frontend implementation (HTML/CSS/TypeScript or React/Next.js), guaranteeing zero discrepancy between the design and the final live product.</p>
            </div>
          </div>

          <!-- FAQ 2 -->
          <div class="faq-item">
            <button class="faq-question-btn" type="button" aria-expanded="false">
              <span>What is the difference between visual graphic design and UX architecture?</span>
              <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div class="faq-answer">
              <p>Graphic design focuses purely on how something looks (colors, illustrations, fonts). UX architecture focuses on how something works: information hierarchy, user task completion speed, reducing cognitive friction, handling system errors, mobile thumb ergonomics, and ensuring data flows logically. A visually pretty site that confuses users will fail to generate revenue; UX architecture solves the business problem first.</p>
            </div>
          </div>

          <!-- FAQ 3 -->
          <div class="faq-item">
            <button class="faq-question-btn" type="button" aria-expanded="false">
              <span>How do you ensure designs are accessible (WCAG 2.2 AA compliant) for all users?</span>
              <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div class="faq-answer">
              <p>We test every color combination against the WCAG 2.2 minimum contrast threshold of 4.5:1 for standard text and 3:1 for large text and interactive components. We specify high-visibility keyboard focus rings, define ARIA roles for screen readers, ensure interactive touch targets are at least 44x44 pixels, and verify that layouts adapt smoothly when users increase default browser font sizes.</p>
            </div>
          </div>

          <!-- FAQ 4 -->
          <div class="faq-item">
            <button class="faq-question-btn" type="button" aria-expanded="false">
              <span>Can you audit and redesign our existing SaaS dashboard without breaking backend APIs?</span>
              <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div class="faq-answer">
              <p>Yes. We specialize in non-destructive UX refactoring. We audit your existing API endpoints, data models, and user roles to ensure that our new UI components map cleanly to your existing backend payload structures, allowing your engineering team to modernize the user experience without rewriting their database or backend logic.</p>
            </div>
          </div>

          <!-- FAQ 5 -->
          <div class="faq-item">
            <button class="faq-question-btn" type="button" aria-expanded="false">
              <span>What tools do you use for UI/UX design and developer handoff?</span>
              <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div class="faq-answer">
              <p>We work primarily in Figma using modern features including Auto-Layout 5.0, Component Variants, and Local Variables (Tokens). We export design tokens in JSON format and generate matching CSS custom properties stylesheets, making developer adoption frictionless across React, Vue, or native HTML environments.</p>
            </div>
          </div>

          <!-- FAQ 6 -->
          <div class="faq-item">
            <button class="faq-question-btn" type="button" aria-expanded="false">
              <span>How long does a typical UI/UX design sprint take?</span>
              <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div class="faq-answer">
              <p>A focused landing page or marketing website UI/UX sprint typically spans 1 to 2 weeks. A comprehensive multi-screen SaaS web application or customer dashboard design sprint typically takes 3 to 4 weeks, including user journey mapping, design system creation, high-fidelity screen designs, and interactive prototyping.</p>
            </div>
          </div>
        </div>
`;

  const channelsGridEnd = '        </div>\n\n        <!-- Interactive Comparison Matrix: Dribbble Art vs Production Design System -->';
  content = content.replace(channelsGridEnd, '        </div>\n' + metricsHtml + '\n        <!-- Interactive Comparison Matrix: Dribbble Art vs Production Design System -->');

  const timelineEnd = '        </div>\n\n        <!-- Callout Banner -->';
  content = content.replace(timelineEnd, '        </div>\n' + remainingSectionsHtml + '\n        <!-- Callout Banner -->');

  fs.writeFileSync(file, content, 'utf8');
  console.log('✓ Successfully expanded services/ui-ux-design-services.html');
}

// 4. web-development-for-startups-smes.html
function expandStartups() {
  const file = path.join(__dirname, '../services/web-development-for-startups-smes.html');
  let content = fs.readFileSync(file, 'utf8');

  const metricsHtml = `
        <!-- Metric Proof Strip -->
        <div class="service-metrics-strip">
          <div class="service-metric-item">
            <div class="service-metric-val">3 - 4 Wks</div>
            <div class="service-metric-label">Rapid MVP Launch</div>
            <div class="service-metric-desc">Turn concepts into working, revenue-ready production software in under a month.</div>
          </div>
          <div class="service-metric-item">
            <div class="service-metric-val">100%</div>
            <div class="service-metric-label">IP Ownership Handover</div>
            <div class="service-metric-desc">Full Git repository, database scripts, and cloud infrastructure handed to you.</div>
          </div>
          <div class="service-metric-item">
            <div class="service-metric-val">Zero</div>
            <div class="service-metric-label">Technical Debt</div>
            <div class="service-metric-desc">Strict TypeScript typing, modular architectures, and clean maintainable code.</div>
          </div>
          <div class="service-metric-item">
            <div class="service-metric-val">Direct</div>
            <div class="service-metric-label">Founder-to-Founder Access</div>
            <div class="service-metric-desc">Direct technical advisory from Sanjeev Kumar Malik — no junior agency interns.</div>
          </div>
        </div>

        <!-- 6 Detailed Capabilities Matrix -->
        <div class="section-header" style="margin-top: 5rem;">
          <div class="section-eyebrow">Startup Capabilities Matrix</div>
          <h2 class="section-title">Full-Lifecycle Startup Engineering &amp; MVP Architecture</h2>
          <p class="section-description">We combine aggressive scope pruning, modern high-productivity technology stacks, and institutional due-diligence standards to launch your venture on time and under budget.</p>
        </div>

        <div class="capabilities-matrix-grid">
          <!-- Card 1 -->
          <div class="capability-card">
            <div class="capability-icon-box">🎯</div>
            <h3 class="capability-title">Ruthless Scope Prioritization &amp; MVP Blueprinting</h3>
            <p class="capability-desc">Most startups fail because they spend 9 months building 50 features nobody wants. We identify your core value loop, ruthlessly prune non-essential bells and whistles, and engineer an MVP that delivers maximum impact in 3 to 4 weeks.</p>
            <div class="capability-tags">
              <span class="capability-tag">Value Loop Focus</span>
              <span class="capability-tag">Agile Pruning</span>
              <span class="capability-tag">Runway Protection</span>
            </div>
          </div>

          <!-- Card 2 -->
          <div class="capability-card">
            <div class="capability-icon-box">⚡</div>
            <h3 class="capability-title">Full-Stack Stack Selection (Next.js / Laravel / Node)</h3>
            <p class="capability-desc">We select the optimal tech stack for your specific business model: Next.js with Supabase for real-time applications, or Laravel / Node.js with PostgreSQL for high-transaction platforms. Built for instant developer onboarding.</p>
            <div class="capability-tags">
              <span class="capability-tag">TypeScript / Next.js</span>
              <span class="capability-tag">Laravel / Node.js</span>
              <span class="capability-tag">PostgreSQL / Redis</span>
            </div>
          </div>

          <!-- Card 3 -->
          <div class="capability-card">
            <div class="capability-icon-box">💳</div>
            <h3 class="capability-title">Self-Serve Auth, Stripe / Razorpay &amp; Tax Compliance</h3>
            <p class="capability-desc">Complete monetisation plumbing out of the box: multi-tenant role-based access control (RBAC), magic link / OAuth social login, recurring subscription billing, UPI / NetBanking gateways, and GST-compliant invoice generation.</p>
            <div class="capability-tags">
              <span class="capability-tag">Razorpay / Stripe</span>
              <span class="capability-tag">RBAC Security</span>
              <span class="capability-tag">Automated GST Invoices</span>
            </div>
          </div>

          <!-- Card 4 -->
          <div class="capability-card">
            <div class="capability-icon-box">☁️</div>
            <h3 class="capability-title">Cost-Optimized Cloud &amp; Serverless Deployment</h3>
            <p class="capability-desc">Early-stage startups shouldn't burn thousands of dollars on complex AWS clusters. We deploy on modern serverless platforms (Vercel, Supabase) or cost-effective Hetzner / DigitalOcean VPS setups that cost under $20/month to run.</p>
            <div class="capability-tags">
              <span class="capability-tag">Vercel / Supabase</span>
              <span class="capability-tag">Under $20/mo Hosting</span>
              <span class="capability-tag">Auto-Scale Ready</span>
            </div>
          </div>

          <!-- Card 5 -->
          <div class="capability-card">
            <div class="capability-icon-box">🔌</div>
            <h3 class="capability-title">Third-Party API Plumbing &amp; Webhook Integrations</h3>
            <p class="capability-desc">Accelerate functionality by integrating battle-tested APIs: WhatsApp Business API for instant user notifications, SendGrid / Resend for transactional emails, OpenAI / Claude for AI capabilities, and Google Maps.</p>
            <div class="capability-tags">
              <span class="capability-tag">WhatsApp API</span>
              <span class="capability-tag">Resend Transactional</span>
              <span class="capability-tag">OpenAI / Claude APIs</span>
            </div>
          </div>

          <!-- Card 6 -->
          <div class="capability-card">
            <div class="capability-icon-box">💼</div>
            <h3 class="capability-title">Fractional CTO Advisory &amp; Investor Due Diligence</h3>
            <p class="capability-desc">Technical credibility when pitching investors. We prepare your technical architecture diagrams, database ER diagrams, API documentation, and security overview to pass institutional Seed and Series A technical due diligence.</p>
            <div class="capability-tags">
              <span class="capability-tag">Fractional CTO</span>
              <span class="capability-tag">Due Diligence Ready</span>
              <span class="capability-tag">Investor Tech Deck</span>
            </div>
          </div>
        </div>
`;

  const remainingSectionsHtml = `
        <!-- Real-World Verified Case Study -->
        <div class="service-case-study-card">
          <div class="case-study-badge">🟢 VERIFIED ARCHITECTURAL CASE STUDY</div>
          <h3 class="case-study-title">How an EdTech Startup in Delhi NCR Built &amp; Launched their Live Coaching Platform in 24 Days and Closed $350K Seed Funding</h3>
          
          <div class="case-study-grid">
            <div>
              <p style="color: var(--text-secondary); line-height: 1.7; font-size: 1.05rem; margin-bottom: 1.25rem;">
                <strong>The Challenge:</strong> A Delhi-based educational startup had burnt 4 months and ₹8 Lakhs with a freelance team that failed to deliver a functional MVP. With an investor demonstration scheduled in 30 days, they needed a working live student-tutor platform with paid checkout and user scheduling.
              </p>
              <p style="color: var(--text-secondary); line-height: 1.7; font-size: 1.05rem; margin-bottom: 1.5rem;">
                <strong>The Architectural Intervention:</strong> Sanjeev Kumar Malik stepped in as technical architect, designed a clean Next.js + PostgreSQL MVP, integrated Razorpay recurring subscription billing, embedded WebRTC video classrooms, and deployed on Vercel with zero server management overhead.
              </p>
              <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
                <span class="hero-tech-chip">✓ 24-Day Turnaround</span>
                <span class="hero-tech-chip">✓ $350K Seed Round Closed</span>
                <span class="hero-tech-chip">✓ 1,400 Paid Students</span>
              </div>
            </div>

            <div class="case-metrics-matrix">
              <div class="case-metric-box">
                <div class="case-metric-num" style="color: #10B981;">24 Days</div>
                <div class="case-metric-label">Idea to Production MVP</div>
                <div class="case-metric-sub">Full platform engineered and launched</div>
              </div>
              <div class="case-metric-box">
                <div class="case-metric-num" style="color: #2563EB;">$350,000</div>
                <div class="case-metric-label">Seed Funding Raised</div>
                <div class="case-metric-sub">Institutional seed round closed successfully</div>
              </div>
              <div class="case-metric-box">
                <div class="case-metric-num" style="color: #10B981;">1,400+</div>
                <div class="case-metric-label">Active Paid Students</div>
                <div class="case-metric-sub">Processed through Razorpay within 60 days</div>
              </div>
              <div class="case-metric-box">
                <div class="case-metric-num" style="color: #2563EB;">99.98%</div>
                <div class="case-metric-label">Platform Uptime</div>
                <div class="case-metric-sub">High concurrency live streaming without lag</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Comparison Bento: Agency / Freelancers vs Sanjeev Kumar Malik -->
        <div class="section-header" style="margin-top: 5rem;">
          <div class="section-eyebrow">The Engineering Difference</div>
          <h2 class="section-title">Freelancer Marketplaces &amp; Agencies vs Sanjeev Kumar Malik</h2>
          <p class="section-description">Why venture-backed founders choose dedicated architectural partnership over unvetted freelancers and junior agency pools.</p>
        </div>

        <div class="comparison-grid">
          <!-- Card: Typical Agency -->
          <div class="comparison-card" style="background: rgba(248, 250, 252, 0.95); border: 1.5px solid #E2E8F0;">
            <div style="font-size: 0.825rem; font-weight: 800; color: #64748B; text-transform: uppercase; margin-bottom: 0.5rem;">TYPICAL FREELANCERS / AGENCIES</div>
            <h3 style="font-size: 1.5rem; font-weight: 800; color: #1E293B; margin-bottom: 1.25rem;">The Runway Burning Model</h3>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.85rem; padding: 0;">
              <li style="display: flex; gap: 0.65rem; color: #64748B; font-size: 0.925rem;">
                <span style="color: #EF4444; font-weight: 800;">✗</span>
                <span>Overpromises 50 features and misses deadlines by months, burning your runway.</span>
              </li>
              <li style="display: flex; gap: 0.65rem; color: #64748B; font-size: 0.925rem;">
                <span style="color: #EF4444; font-weight: 800;">✗</span>
                <span>Spaghetti code with zero tests or documentation that fails investor technical audits.</span>
              </li>
              <li style="display: flex; gap: 0.65rem; color: #64748B; font-size: 0.925rem;">
                <span style="color: #EF4444; font-weight: 800;">✗</span>
                <span>Delegated to junior interns; founders have no direct access to senior developers.</span>
              </li>
              <li style="display: flex; gap: 0.65rem; color: #64748B; font-size: 0.925rem;">
                <span style="color: #EF4444; font-weight: 800;">✗</span>
                <span>Overengineers expensive AWS cloud setups costing $500+/month before launch.</span>
              </li>
              <li style="display: flex; gap: 0.65rem; color: #64748B; font-size: 0.925rem;">
                <span style="color: #EF4444; font-weight: 800;">✗</span>
                <span>Holds code hostage with vague hourly billing and unexpected change order fees.</span>
              </li>
            </ul>
          </div>

          <!-- Card: Sanjeev Kumar Malik -->
          <div class="comparison-card" style="background: linear-gradient(135deg, #FFFFFF 0%, #EFF6FF 100%); border: 2px solid var(--primary); box-shadow: 0 20px 40px -10px rgba(37, 99, 235, 0.15);">
            <div style="font-size: 0.825rem; font-weight: 800; color: var(--primary); text-transform: uppercase; margin-bottom: 0.5rem;">SANJEEV KUMAR MALIK ARCHITECTURE</div>
            <h3 style="font-size: 1.5rem; font-weight: 800; color: var(--text-primary); margin-bottom: 1.25rem;">Founder-Grade Velocity &amp; Clarity</h3>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.85rem; padding: 0;">
              <li style="display: flex; gap: 0.65rem; color: #1E293B; font-size: 0.925rem; font-weight: 500;">
                <span style="color: #10B981; font-weight: 800;">✓</span>
                <span>Guaranteed 3 to 4-week MVP turnaround with disciplined, ruthless scope pruning.</span>
              </li>
              <li style="display: flex; gap: 0.65rem; color: #1E293B; font-size: 0.925rem; font-weight: 500;">
                <span style="color: #10B981; font-weight: 800;">✓</span>
                <span>Institutional-grade clean TypeScript/PHP codebase ready for investor due diligence.</span>
              </li>
              <li style="display: flex; gap: 0.65rem; color: #1E293B; font-size: 0.925rem; font-weight: 500;">
                <span style="color: #10B981; font-weight: 800;">✓</span>
                <span>Direct founder access: Sanjeev Kumar Malik personally codes and architectures your MVP.</span>
              </li>
              <li style="display: flex; gap: 0.65rem; color: #1E293B; font-size: 0.925rem; font-weight: 500;">
                <span style="color: #10B981; font-weight: 800;">✓</span>
                <span>Ultra-lean cloud architecture costing under $20/month with seamless auto-scaling.</span>
              </li>
              <li style="display: flex; gap: 0.65rem; color: #1E293B; font-size: 0.925rem; font-weight: 500;">
                <span style="color: #10B981; font-weight: 800;">✓</span>
                <span>100% IP ownership, transparent milestone billing, and clean GitHub handover.</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Deliverables Checklist -->
        <div class="section-header" style="margin-top: 5rem;">
          <div class="section-eyebrow">Enterprise Delivery Scope</div>
          <h2 class="section-title">What Every Startup MVP Project Includes</h2>
          <p class="section-description">Every startup development sprint delivered by Sanjeev Kumar Malik comes with comprehensive guarantees, clean documentation, and complete ownership transfer.</p>
        </div>

        <div class="deliverables-checklist-grid">
          <div class="deliverable-item">
            <div class="deliverable-icon">✓</div>
            <div>
              <div class="deliverable-title">Full Production MVP Source Code</div>
              <div class="deliverable-desc">Clean, strictly-typed full-stack codebase (Next.js / Laravel / Node) with zero technical debt.</div>
            </div>
          </div>

          <div class="deliverable-item">
            <div class="deliverable-icon">✓</div>
            <div>
              <div class="deliverable-title">100% IP &amp; Git Repository Handover</div>
              <div class="deliverable-desc">Immediate ownership transfer of GitHub repositories, domain DNS, and server infrastructure.</div>
            </div>
          </div>

          <div class="deliverable-item">
            <div class="deliverable-icon">✓</div>
            <div>
              <div class="deliverable-title">Payment Gateway &amp; Auth Integration</div>
              <div class="deliverable-desc">Razorpay / Stripe recurring subscriptions, UPI checkout, social login, and RBAC user roles.</div>
            </div>
          </div>

          <div class="deliverable-item">
            <div class="deliverable-icon">✓</div>
            <div>
              <div class="deliverable-title">Cost-Optimized Cloud CI/CD Setup</div>
              <div class="deliverable-desc">Automated GitHub Actions deployment pipeline on serverless or low-cost VPS instances (&lt; $20/mo).</div>
            </div>
          </div>

          <div class="deliverable-item">
            <div class="deliverable-icon">✓</div>
            <div>
              <div class="deliverable-title">Investor-Ready Architecture Documentation</div>
              <div class="deliverable-desc">ER diagrams, API documentation, and technical security specs formatted for Seed / Series A due diligence.</div>
            </div>
          </div>

          <div class="deliverable-item">
            <div class="deliverable-icon">✓</div>
            <div>
              <div class="deliverable-title">30-Day Post-Launch Support &amp; Advisory</div>
              <div class="deliverable-desc">Direct technical advisory covering bug fixes, performance monitoring, and next-phase sprint planning.</div>
            </div>
          </div>
        </div>

        <!-- Comprehensive Startup FAQ Accordion -->
        <div class="section-header" style="margin-top: 5rem;">
          <div class="section-eyebrow">Frequently Asked Questions</div>
          <h2 class="section-title">Startup &amp; SME Web Development FAQ</h2>
          <p class="section-description">Clear, transparent answers to the most common questions early-stage founders and business leaders ask before launching their MVP.</p>
        </div>

        <div style="max-width: 860px; margin: 2rem auto 4rem; display: flex; flex-direction: column; gap: 1rem;">
          <!-- FAQ 1 -->
          <div class="faq-item">
            <button class="faq-question-btn" type="button" aria-expanded="false">
              <span>How fast can you genuinely build and launch our startup MVP?</span>
              <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div class="faq-answer">
              <p>Our standard MVP sprint delivers a fully functional, production-ready product in 3 to 4 weeks. We achieve this speed not by cutting corners, but through ruthless scope prioritization. We focus 100% of engineering bandwidth on your core monetization or user value loop, deferring secondary nice-to-haves until you have real paying customers.</p>
            </div>
          </div>

          <!-- FAQ 2 -->
          <div class="faq-item">
            <button class="faq-question-btn" type="button" aria-expanded="false">
              <span>What happens if our product requirements or scope change during the sprint?</span>
              <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div class="faq-answer">
              <p>We work in agile 1-week sprint cycles with direct founder communication. If market feedback or customer interviews require a pivot, we re-prioritize the backlog collaboratively. Because you communicate directly with Sanjeev Kumar Malik (rather than through layers of agency account managers), adjustments are evaluated and implemented immediately without bureaucratic delays.</p>
            </div>
          </div>

          <!-- FAQ 3 -->
          <div class="faq-item">
            <button class="faq-question-btn" type="button" aria-expanded="false">
              <span>Do we own 100% of the intellectual property, code, and accounts?</span>
              <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div class="faq-answer">
              <p>Yes, 100% contractually guaranteed. All Git repositories, database scripts, design assets, and cloud hosting accounts are created in your company's name. You own full intellectual property rights from Day 1, with zero vendor lock-in or recurring proprietary licensing fees.</p>
            </div>
          </div>

          <!-- FAQ 4 -->
          <div class="faq-item">
            <button class="faq-question-btn" type="button" aria-expanded="false">
              <span>Can your codebase scale when we grow from 100 to 100,000 users?</span>
              <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div class="faq-answer">
              <p>Yes. We build using industry-standard architectures (Next.js, Node.js, Laravel, PostgreSQL, Redis) with clean separation of concerns, normalized database schemas, and stateless API endpoints. When your traffic explodes, the platform scales horizontally on modern serverless or containerized clusters without requiring a complete code rewrite.</p>
            </div>
          </div>

          <!-- FAQ 5 -->
          <div class="faq-item">
            <button class="faq-question-btn" type="button" aria-expanded="false">
              <span>How much does infrastructure (hosting, database, APIs) cost to run after launch?</span>
              <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div class="faq-answer">
              <p>We deliberately optimize early-stage infrastructure to protect your financial runway. By utilizing generous free and low-cost tiers (Vercel, Supabase, Cloudflare, Resend, Hetzner VPS), most of our startup MVPs operate on less than $20 to $40 per month in total cloud infrastructure costs during their first 1,000 users.</p>
            </div>
          </div>

          <!-- FAQ 6 -->
          <div class="faq-item">
            <button class="faq-question-btn" type="button" aria-expanded="false">
              <span>Can you provide fractional CTO advisory during our investor fundraising rounds?</span>
              <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div class="faq-answer">
              <p>Yes. Having an experienced 15+ year web architect in your corner gives institutional angels and VC investors confidence. We assist founders in preparing technical slide decks, system architecture diagrams, and participate in investor technical due diligence calls to validate the scalability, security, and integrity of your product.</p>
            </div>
          </div>
        </div>
`;

  const channelsGridEnd = '        </div>\n\n        <!-- Interactive Comparison Matrix: Startup Stages Matrix -->';
  content = content.replace(channelsGridEnd, '        </div>\n' + metricsHtml + '\n        <!-- Interactive Comparison Matrix: Startup Stages Matrix -->');

  const timelineEnd = '        </div>\n\n        <!-- Callout Banner -->';
  content = content.replace(timelineEnd, '        </div>\n' + remainingSectionsHtml + '\n        <!-- Callout Banner -->');

  fs.writeFileSync(file, content, 'utf8');
  console.log('✓ Successfully expanded services/web-development-for-startups-smes.html');
}

// Execute all expansions
expandRedesign();
expandLandingPage();
expandUiUx();
expandStartups();
console.log('All 4 remaining service pages expanded successfully!');

