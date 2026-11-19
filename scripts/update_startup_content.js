const fs = require('fs');

function updateStartup(content) {
  let html = content;

  // HERO
  html = html.replace(
    /<div class="section-eyebrow">AGILE MVP ENGINEERING &amp; FOUNDER VELOCITY<\/div>\s*<h1 class="section-title">[\s\S]*?<\/h1>\s*<p class="section-description" style="max-width: 860px; margin: 0 auto;">[\s\S]*?<\/p>/i,
    `<div class="section-eyebrow">AGILE MVP ENGINEERING &amp; FOUNDER VELOCITY</div>
        <h1 class="section-title">
          Web Development for Startups in Delhi | Get MVP to Market Fast – <span class="gradient-text">Sanjeev Kumar Malik</span>
        </h1>
        <p class="section-description" style="max-width: 860px; margin: 0 auto;">
          As an early-stage founder you have to be fast but also avoid technical debt. At Sanjeev Kumar Malik we work with founders based in Delhi NCR to help them plan and create a lean, scalable MVP in 3-4 weeks.
        </p>`
  );

  // HERO CARD LEFT
  html = html.replace(
    /<div class="section-eyebrow" style="margin-bottom: 0\.5rem;">[\s\S]*?<\/div>\s*<h2 style="font-size: 2\.2rem; margin-bottom: 1rem;">[\s\S]*?<\/h2>\s*<p style="color: var\(--text-secondary\); line-height: 1\.7; font-size: 1\.05rem;">[\s\S]*?<\/p>\s*<div style="display: flex; gap: 0\.75rem; margin-top: 1\.5rem; flex-wrap: wrap;">[\s\S]*?<\/div>/i,
    `<div class="section-eyebrow" style="margin-bottom: 0.5rem;">FOUNDER-TO-FOUNDER PARTNERSHIP</div>
            <h2 style="font-size: 2.2rem; margin-bottom: 1rem;">Fractional CTO for Your Startup</h2>
            <p style="color: var(--text-secondary); line-height: 1.7; font-size: 1.05rem;">
              A full-time CTO will eat up your runway while you are attempting to find product-market fit. Don’t waste money by hiring an expensive agency to guess what your MVP should be. With our web development for startups in Delhi, I act as your senior technical co-founder, providing clean architecture, weekly demos and clean code ready for investor checks.
            </p>
            <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem; flex-wrap: wrap;">
              <span class="hero-tech-chip">3 to 4-Week Rapid MVP Delivery</span>
              <span class="hero-tech-chip">100% IP &amp; Code Ownership</span>
              <span class="hero-tech-chip">Upfront Milestone Billing</span>
              <span class="hero-tech-chip">Zero Technical Debt Guarantee</span>
            </div>`
  );

  // HERO CARD RIGHT (MOCKUP)
  html = html.replace(
    /<span>3 to 4-Week Rapid MVP Sprint • Production Architecture<\/span>/i,
    `<span>3-4 Week Rapid MVP Sprint • Zero Tech Debt</span>`
  );

  // PILLARS
  const pillarsRegex = /<div class="section-header">\s*<div class="section-eyebrow">Startup Acceleration Pillars<\/div>\s*<h2 class="section-title">Tailored for Founder Velocity &amp; Runway Protection<\/h2>[\s\S]*?<div class="channels-grid">[\s\S]*?<\/div>\s*<\/div>/i;
  const newPillars = `<div class="section-header">
          <div class="section-eyebrow">STARTUP ACCELERATION PILLARS</div>
          <h2 class="section-title">Tailored for Founder Velocity &amp; Runway Protection</h2>
        </div>

        <div class="channels-grid">
          <div class="channel-card">
            <div class="channel-icon">⏱️</div>
            <h3 class="channel-title">Fast 3-4 Week MVP Development</h3>
            <p class="channel-desc">By removing any unnecessary functionality your MVP will be built in 3-4 weeks to get to paid customers.</p>
          </div>

          <div class="channel-card">
            <div class="channel-icon">🏗️</div>
            <h3 class="channel-title">Clean Architecture</h3>
            <p class="channel-desc">All of our code will be clean with strict TypeScript, clean folder structure, automated testing and clean documentation to allow for easy pickup for future senior staff.</p>
          </div>

          <div class="channel-card">
            <div class="channel-icon">💎</div>
            <h3 class="channel-title">Transparent Deliverables</h3>
            <p class="channel-desc">No hourly rates. No hidden charges. All deliverables are clearly defined for each stage of the project. You will only pay once you are happy.</p>
          </div>

          <div class="channel-card">
            <div class="channel-icon">☁️</div>
            <h3 class="channel-title">Affordable Cloud Infrastructure</h3>
            <p class="channel-desc">Our web development for startups in Delhi uses affordable infrastructure. Serverless or cheap VPS infrastructure ($20 or less per month). Easily scalable as traffic increases.</p>
          </div>
        </div>`;
  html = html.replace(pillarsRegex, newPillars);

  // GROWTH MATRIX SECTION
  const matrixRegex = /<div class="section-header" style="margin-top: 5rem;">\s*<div class="section-eyebrow">The Engineering Difference<\/div>\s*<h2 class="section-title">Freelancer Marketplaces &amp; Agencies vs Sanjeev Kumar Malik<\/h2>[\s\S]*?<div class="comparison-grid">[\s\S]*?<\/div>\s*<\/div>/i;
  const newMatrix = `<div class="decision-matrix-card" style="margin-top: 5rem;">
          <div class="section-eyebrow" style="background: rgba(37, 99, 235, 0.1);">STARTUP GROWTH MATRIX</div>
          <h2 style="font-size: 1.85rem; margin-bottom: 0.75rem;">Delhi Web Development for Startups at Every Funding Stage</h2>
          <p style="color: var(--text-secondary); margin-bottom: 2rem;">
            As your startup progresses through funding levels, we ensure you get the right infrastructure. This includes the features, development speed and cost of your cloud provider.
          </p>

          <div class="table-responsive">
            <table class="matrix-table">
              <thead>
                <tr>
                  <th>Growth Stage</th>
                  <th>Primary Technical Objective</th>
                  <th>Recommended Stack</th>
                  <th>Typical Timeline</th>
                  <th>Infrastructure Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Pre-Seed / Ideation</strong></td>
                  <td>We will build an interactive prototype, waiting list landing page and investor deck.</td>
                  <td>Using Next.js / HTML5 &amp; Supabase / Airtable.</td>
                  <td>Take 1-2 weeks to complete.</td>
                  <td>Cost 0-15 per month.</td>
                </tr>
                <tr>
                  <td><strong>Seed (First 500 Users)</strong></td>
                  <td>Build a functional MVP with self-signup and payments.</td>
                  <td>Using React / Next.js, Node / Laravel &amp; PostgreSQL.</td>
                  <td>Takes 3-4 weeks to complete.</td>
                  <td>Costs 20-60 per month.</td>
                </tr>
                <tr>
                  <td><strong>Product Market Fit</strong></td>
                  <td>Analytics events, onboarding automation and webhook integration.</td>
                  <td>Uses decoupled API, Redis Queues &amp; AWS S3.</td>
                  <td>Ongoing sprints.</td>
                  <td>Costs 100-300 per month.</td>
                </tr>
                <tr>
                  <td><strong>Series A</strong></td>
                  <td>Auto scaling high concurrent clusters, SOC-2 compliant and CI/CD.</td>
                  <td>Uses Kubernetes / ECS &amp; Multi region database replication.</td>
                  <td>Dedicated Engineering Team.</td>
                  <td>Custom Cloud Tier.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>`;
  html = html.replace(matrixRegex, newMatrix);

  // SPRINT SECTION
  const sprintRegex = /<div class="section-header" style="margin-top: 5rem;">\s*<div class="section-eyebrow">Agile Sprint Cadence<\/div>\s*<h2 class="section-title">The 4-Stage MVP Sprint Protocol<\/h2>[\s\S]*?<\/div>\s*<div class="timeline-container"[\s\S]*?<\/div>\s*<\/div>/i;
  const newSprint = `<div class="section-header" style="margin-top: 5rem;">
          <div class="section-eyebrow">AGILE SPRINT CADENCE</div>
          <h2 class="section-title">4 Step MVP Sprint Process</h2>
          <p class="section-description">
            This is how we Build Your MVP
          </p>
        </div>

        <div class="timeline-container" style="max-width: 900px; margin: 0 auto;">
          <div class="timeline-item">
            <div class="timeline-badge">01</div>
            <div class="timeline-content">
              <div class="timeline-date">01 | Step 01: MVP Scoping &amp; Architecture Planning</div>
              <h3 class="timeline-title">Feature Removal, User Journey &amp; Schema</h3>
              <p class="timeline-desc">
                We will identify which features are essential and which are nice to have. We will then create the user journey, main data tables and third party APIs required.
              </p>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-badge">02</div>
            <div class="timeline-content">
              <div class="timeline-date">02 | Step 02: Fast MVP Development Sprints</div>
              <h3 class="timeline-title">Weekly Deployment to Staging &amp; Feedback</h3>
              <p class="timeline-desc">
                From day 7 we will provide you with a private link to see your MVP in action. Every Friday we will go over the new features in action and make changes. This ensures your custom web application development stays on budget and on track.
              </p>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-badge">03</div>
            <div class="timeline-content">
              <div class="timeline-date">03 | Step 03: Payment Integration, Third Party APIs &amp; Security</div>
              <h3 class="timeline-title">Payment Gateway, Third Party APIs &amp; QA Testing</h3>
              <p class="timeline-desc">
                To ensure your web development for startups in Delhi is successful we will integrate payment gateways like Razorpay or Stripe. We will also add email and WhatsApp services and analytics. We will then perform multi-device and security testing.
              </p>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-badge">04</div>
            <div class="timeline-content">
              <div class="timeline-date">04 | Step 04: Live &amp; Handover</div>
              <h3 class="timeline-title">Live, Repository, Credentials &amp; Documentation Handover</h3>
              <p class="timeline-desc">
                Once your MVP is complete we will deploy it live. We will then hand over the repository, credentials and documentation. We will also be on hand to make any post live changes. As a startup website development company in Delhi NCR we ensure you own everything.
              </p>
            </div>
          </div>
        </div>`;
  html = html.replace(sprintRegex, newSprint);

  // CTA SECTION
  html = html.replace(
    /<h2 style="font-size: 2rem; margin-bottom: 0\.5rem;">Have a Startup Concept Ready to Build\?<\/h2>\s*<p style="color: var\(--text-secondary\); max-width: 600px;">[\s\S]*?<\/p>/i,
    `<h2 style="font-size: 2rem; margin-bottom: 0.5rem;">Start Building Your MVP</h2>
            <p style="color: var(--text-secondary); max-width: 600px;">
              Book a 30 minute 1-1 with Sanjeev Kumar Malik to discuss your web development for startups in Delhi. We will give you an honest opinion on whether it is feasible and a clear plan on how we will deliver your MVP. Whether you are a seed stage founder or a growing business looking for website development for SMEs in Delhi we will have a plan in place with clear milestones.
            </p>`
  );
  html = html.replace(
    /Next: Custom Web Applications →/i,
    `Explore WordPress Development →`
  );

  return html;
}

const curStartup = fs.readFileSync('services/web-development-for-startups-smes.html', 'utf-8');
const updatedStartup = updateStartup(curStartup);

fs.writeFileSync('services/web-development-for-startups-smes.html', updatedStartup);
fs.writeFileSync('services/web-development-for-startups-smes/index.html', updatedStartup);

console.log('Successfully updated web-development-for-startups-smes.html and alias!');

