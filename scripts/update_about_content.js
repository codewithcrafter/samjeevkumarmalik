const fs = require('fs');

function updateAbout(content) {
  let html = content;

  // 1. HERO BADGE, H1, SUBTEXT
  // Replace eyebrow badge
  html = html.replace(
    /<div class="about-eyebrow-badge">[\s\S]*?<\/div>/i,
    `<div class="about-eyebrow-badge">
              <span class="live-radar-dot" style="width: 8px; height: 8px;"></span>
              <span>FULL-STACK ARCHITECT • LEADERSHIP PROFILE</span>
            </div>`
  );

  // Replace H1
  html = html.replace(
    /<h1 class="about-hero-title">[\s\S]*?<\/h1>/i,
    `<h1 class="about-hero-title">About Sanjeev Kumar Malik — <span class="gradient-text">Founder &amp; Web Development Expert in Delhi</span></h1>`
  );

  // Replace Hero Subtext
  html = html.replace(
    /<p class="about-hero-lead">[\s\S]*?<\/p>\s*<p class="about-hero-sublead">[\s\S]*?<\/p>/i,
    `<p class="about-hero-lead">
              Fifteen years of building revenue-driven websites for businesses that want one accountable person, not a chain of account managers. Talk to the founder directly.
            </p>`
  );

  // 2. PROFILE NARRATIVE & STATS
  // In the hero profile card or in founderProfile section:
  // Let's check profile glass badge or card:
  html = html.replace(
    /<span class="profile-meta-sub">Principal Web Development Architect<\/span>/g,
    `<span class="profile-meta-sub">Lead Architect</span>`
  );

  // In #founderProfile: let's include the 3 narrative paragraphs if not present, and update the stats strip
  const profileSectionRegex = /<section class="section"[^>]*id="founderProfile"[^>]*>([\s\S]*?)<\/section>/i;
  const newProfileSection = `<section class="section" style="padding-top: 1rem; padding-bottom: 4rem;" id="founderProfile">
      <div class="container">
        
        <!-- Founder Profile Card & Narrative -->
        <div class="card" style="padding: 2.5rem; margin-bottom: 3rem; background: var(--surface); border: 1px solid var(--border-subtle); border-radius: 16px;">
          <div style="display: inline-block; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--brand-primary); margin-bottom: 1rem;">
            Lead Architect
          </div>
          <div style="display: flex; flex-direction: column; gap: 1rem; color: var(--text-secondary); font-size: 1.05rem; line-height: 1.7;">
            <p>
              Sanjeev Kumar Malik is a full-stack web developer who has spent 15 years building websites for businesses across different industries. As a web development expert in Delhi, he has personally planned, coded and delivered more than 1,700 projects, working in HTML, CSS, JavaScript, React, Node.js and Next.js, along with WordPress and Shopify builds and Angular or PHP applications whenever a project calls for them.
            </p>
            <p>
              Every site that comes through his studio is built with search in mind from the first wireframe. Clean code, a sensible URL structure and fast-loading pages are part of the build itself, never something patched on after launch.
            </p>
            <p>
              When you hire a web development expert in Delhi who works without a middle layer, you get answers from the person who actually scopes, writes and reviews your project, not from a support ticket queue.
            </p>
          </div>
        </div>

        <div class="stats-strip">
          <div class="stat-item">
            <div class="stat-number-wrap">
              <span class="stat-number" data-target="15">15</span>
              <span class="stat-suffix">+</span>
            </div>
            <span class="stat-label">Years Experience</span>
            <span class="stat-caption">Production full-stack engineering</span>
          </div>

          <div class="stat-item">
            <div class="stat-number-wrap">
              <span class="stat-number" data-target="1700">1700</span>
              <span class="stat-suffix">+</span>
            </div>
            <span class="stat-label">Websites Delivered</span>
            <span class="stat-caption">Startups, D2C brands, and enterprises</span>
          </div>

          <div class="stat-item">
            <div class="stat-number-wrap">
              <span class="stat-number" data-target="100">100</span>
              <span class="stat-suffix">%</span>
            </div>
            <span class="stat-label">Direct Founder Access</span>
            <span class="stat-caption">Zero junior developer handoffs</span>
          </div>

          <div class="stat-item">
            <div class="stat-number-wrap">
              <span class="stat-number" data-target="98">98</span>
              <span class="stat-suffix">%</span>
            </div>
            <span class="stat-label">On-Time Delivery</span>
            <span class="stat-caption">Milestone-driven sprint velocity</span>
          </div>
        </div>

      </div>
    </section>`;

  html = html.replace(profileSectionRegex, newProfileSection);

  // 3. TIMELINE SECTION
  const timelineRegex = /<section class="section" id="timeline">([\s\S]*?)<\/section>/i;
  const newTimeline = `<section class="section" id="timeline">
      <div class="container">
        
        <div class="section-header">
          <div class="section-eyebrow">PROVEN TECHNICAL TRACK RECORD</div>
          <h2 class="section-title">15 Years in the Trenches</h2>
          <p class="section-description">
            See how a web development expert in Delhi moved from basic LAMP servers to fast headless builds that load in under a second.
          </p>
        </div>

        <div class="timeline-container">
          <div class="timeline-line"></div>
          
          <!-- Milestone 01 -->
          <div class="timeline-item">
            <div class="timeline-node"><div class="timeline-node-inner">01</div></div>
            <div class="timeline-card">
              <span class="timeline-year-tag">2009 – 2013</span>
              <h3 class="timeline-title">The Foundation: Core Architecture &amp; LAMP Stack</h3>
              <p class="timeline-narrative">
                Started with core PHP, semantic HTML, CSS and JavaScript, tuning MySQL queries and server-side speed. Built custom website development projects, database-driven online stores and hand-coded layouts that held up in every browser of that era, ending the period with 400+ websites delivered.
              </p>
              <div class="timeline-chips">
                <span class="timeline-chip">LAMP Stack</span>
                <span class="timeline-chip">MySQL Optimisation</span>
                <span class="timeline-chip">Cross-Browser Builds</span>
                <span class="timeline-chip">400+ Custom Websites</span>
              </div>
            </div>
          </div>

          <!-- Milestone 02 -->
          <div class="timeline-item">
            <div class="timeline-node"><div class="timeline-node-inner">02</div></div>
            <div class="timeline-card">
              <span class="timeline-year-tag">2014 – 2018</span>
              <h3 class="timeline-title">Enterprise CMS &amp; Custom WordPress Engineering</h3>
              <p class="timeline-narrative">
                Moved into custom themes, in-house plugins and Magento, then high-traffic WooCommerce stores with secure payment gateways. WordPress development services became the heart of the studio, and the 500+ site mark was crossed during these years.
              </p>
              <div class="timeline-chips">
                <span class="timeline-chip">Enterprise WordPress</span>
                <span class="timeline-chip">Custom Plugins</span>
                <span class="timeline-chip">WooCommerce Integration</span>
                <span class="timeline-chip">500+ Milestone</span>
              </div>
            </div>
          </div>

          <!-- Milestone 03 -->
          <div class="timeline-item">
            <div class="timeline-node"><div class="timeline-node-inner">03</div></div>
            <div class="timeline-card">
              <span class="timeline-year-tag">2019 – 2022</span>
              <h3 class="timeline-title">Modern JavaScript, MERN Stack &amp; SaaS Applications</h3>
              <p class="timeline-narrative">
                Shifted to React, Node.js, Express and MongoDB, building web apps, client dashboards and microservices that run on live data. More than 1,200 projects were delivered, including real-time dashboards for funded startups.
              </p>
              <div class="timeline-chips">
                <span class="timeline-chip">React &amp; Node.js</span>
                <span class="timeline-chip">MERN / MEAN Stack</span>
                <span class="timeline-chip">REST &amp; GraphQL APIs</span>
                <span class="timeline-chip">1,200+ Milestone</span>
              </div>
            </div>
          </div>

          <!-- Milestone 04 -->
          <div class="timeline-item">
            <div class="timeline-node"><div class="timeline-node-inner">04</div></div>
            <div class="timeline-card">
              <span class="timeline-year-tag">2023 – Present</span>
              <h3 class="timeline-title">Next.js, Headless Architecture &amp; High-Conversion CRO</h3>
              <p class="timeline-narrative">
                Building headless platforms on the Next.js App Router with TypeScript and Tailwind CSS, plus headless Shopify and edge delivery. Pages load in under a second and carry structured data for AI search. Over 1,700 sites are now live, and Next.js development is where most new briefs begin.
              </p>
              <div class="timeline-chips">
                <span class="timeline-chip">Next.js 15 App Router</span>
                <span class="timeline-chip">Headless Shopify &amp; WP</span>
                <span class="timeline-chip">AI-Search Schema</span>
                <span class="timeline-chip">1,700+ Verified Flagships</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>`;

  html = html.replace(timelineRegex, newTimeline);

  // 4. COMPARISON SECTION (#difference)
  const diffRegex = /<section class="section" id="difference">([\s\S]*?)<\/section>/i;
  const newDiff = `<section class="section" id="difference">
      <div class="container">
        
        <div class="section-header">
          <div class="section-eyebrow">AGENCY MODEL VS SANJEEV’S STANDARD</div>
          <h2 class="section-title">Why Direct Founder Architecture Wins</h2>
          <p class="section-description">
            Traditional digital agencies charge enterprise retainers to pay for account executives, sales commissions, and middle managers while passing actual code execution to entry-level juniors.
          </p>
        </div>

        <div class="comparison-grid">
          
          <!-- Agency Model Card -->
          <div class="comparison-card comparison-agency">
            <div class="comparison-badge badge-agency">The Typical Agency Model</div>
            <h3 class="comparison-heading">Costly Layers &amp; Diluted Quality</h3>
            <p class="comparison-subhead">Where premium budgets fund multi-tier overhead, non-technical liaisons, and bloated, fragile template architectures.</p>

            <ul class="comparison-list">
              <li class="comparison-list-item">
                <div class="icon-cross" aria-hidden="true">✕</div>
                <div>
                  <h4 class="comparison-item-title strike-title">Layered Handoffs</h4>
                  <p class="comparison-item-desc">Your brief travels from sales to a project manager to a junior developer, and details get lost along the way.</p>
                </div>
              </li>

              <li class="comparison-list-item">
                <div class="icon-cross" aria-hidden="true">✕</div>
                <div>
                  <h4 class="comparison-item-title strike-title">Bloated Page Builders</h4>
                  <p class="comparison-item-desc">Generic builders patched with 45+ unchecked plugins, leading to 8-second loads and open security gaps.</p>
                </div>
              </li>

              <li class="comparison-list-item">
                <div class="icon-cross" aria-hidden="true">✕</div>
                <div>
                  <h4 class="comparison-item-title strike-title">Hidden Post-Launch Invoicing</h4>
                  <p class="comparison-item-desc">Vague scopes turn into surprise charges for basic tweaks, mobile fixes and speed work.</p>
                </div>
              </li>
            </ul>
          </div>

          <!-- Sanjeev's Direct Standard -->
          <div class="comparison-card comparison-sanjeev">
            <div class="comparison-badge badge-sanjeev">Sanjeev’s Direct Standard</div>
            <h3 class="comparison-heading">Direct Architecture &amp; Verified Precision</h3>
            <p class="comparison-subhead">Pure founder-level technical accountability where every rupee is invested in high-performance code and conversion outcomes.</p>

            <ul class="comparison-list">
              <li class="comparison-list-item">
                <div class="icon-check" aria-hidden="true">✓</div>
                <div>
                  <h4 class="comparison-item-title">One Accountable Developer</h4>
                  <p class="comparison-item-desc">You speak with the web development expert in Delhi writing the code, from kickoff to launch day.</p>
                </div>
              </li>

              <li class="comparison-list-item">
                <div class="icon-check" aria-hidden="true">✓</div>
                <div>
                  <h4 class="comparison-item-title">Zero Bloat &amp; Custom Stacks</h4>
                  <p class="comparison-item-desc">Lean, production-grade custom builds that do not break when third-party updates land. Sub-0.8s loads and 100% IP ownership.</p>
                </div>
              </li>

              <li class="comparison-list-item">
                <div class="icon-check" aria-hidden="true">✓</div>
                <div>
                  <h4 class="comparison-item-title">Semantic, Search-Ready Code</h4>
                  <p class="comparison-item-desc">Clean HTML, JSON-LD structured data and hierarchical URLs built into the repository from day one.</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </section>`;

  html = html.replace(diffRegex, newDiff);

  // 5. CTA BOX
  html = html.replace(
    /<span>Direct Technical Discovery<\/span>/g,
    `<span>DIRECT TECHNICAL ALIGNMENT</span>`
  );
  html = html.replace(
    /Book an upfront 30-minute technical discovery session[\s\S]*?just practical engineering guidance\./i,
    `Book an upfront discovery session with a web development expert in Delhi. No sales pitch, just clear milestone roadmaps and transparent pricing.`
  );

  return html;
}

const curAbout = fs.readFileSync('about-sanjeev-kumar-malik.html', 'utf-8');
const updatedAbout = updateAbout(curAbout);

fs.writeFileSync('about-sanjeev-kumar-malik.html', updatedAbout);
fs.writeFileSync('about-sanjeev-kumar-malik/index.html', updatedAbout);

console.log('Successfully updated about-sanjeev-kumar-malik.html and alias!');
