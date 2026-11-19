const fs = require('fs');

function updateLanding(content) {
  let html = content;

  // HERO
  html = html.replace(
    /<div class="section-eyebrow">LANDING PAGE DESIGN COMPANY IN DELHI<\/div>\s*<h1 class="section-title">[\s\S]*?<\/h1>\s*<p class="section-description" style="max-width: 860px; margin: 0 auto;">[\s\S]*?<\/p>/i,
    `<div class="section-eyebrow">LANDING PAGE DESIGN COMPANY IN DELHI</div>
        <h1 class="section-title">
          Landing Page Design Company in Delhi | Professional Landing Page Design &amp; Development - <span class="gradient-text">Sanjeev Kumar Malik</span>
        </h1>
        <p class="section-description" style="max-width: 860px; margin: 0 auto;">
          By sending leads from Google, Meta, LinkedIn Ads to a generic landing page you will lose most of your budget. We are a Professional Landing Page Design company in Delhi who create laser targeted landing pages that have fast loading speeds to keep visitors engaged and focused on your sales team.
        </p>`
  );

  // HERO BOX LEFT
  html = html.replace(
    /<div class="section-eyebrow" style="margin-bottom: 0\.5rem;">High-Intent Conversion Focus<\/div>\s*<h2 style="font-size: 2\.2rem; margin-bottom: 1rem;">[\s\S]*?<\/h2>\s*<p style="color: var\(--text-secondary\); line-height: 1\.7; font-size: 1\.05rem;">[\s\S]*?<\/p>\s*<div style="display: flex; gap: 0\.75rem; margin-top: 1\.5rem; flex-wrap: wrap;">[\s\S]*?<\/div>/i,
    `<div class="section-eyebrow" style="margin-bottom: 0.5rem;">HIGH-INTENT CONVERSION FOCUS</div>
            <h2 style="font-size: 2.2rem; margin-bottom: 1rem;">One Person, One Action, Zero Leaks</h2>
            <p style="color: var(--text-secondary); line-height: 1.7; font-size: 1.05rem;">
              A landing page design company in Delhi should never allow users to get distracted by menus or other offers. We use a bespoke landing page design and development service that provides engaging hooks, authentic social proof, interactive components and short forms to turn your cold paid traffic into warm buyer leads.
            </p>
            <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem; flex-wrap: wrap;">
              <span class="hero-tech-chip">Google Quality Score Optimization</span>
              <span class="hero-tech-chip">Fast Mobile Load on 4G</span>
              <span class="hero-tech-chip">Instant WhatsApp &amp; CRM Webhooks</span>
              <span class="hero-tech-chip">A/B Split-Testing Ready</span>
            </div>`
  );

  // MOCKUP CARD RIGHT
  html = html.replace(
    /<div class="mockup-form-heading">.*?<\/div>/i,
    `<div class="mockup-form-heading">Get More Qualified Leads in 30 Days</div>`
  );
  html = html.replace(
    /<div class="mockup-form-sub">.*?<\/div>/i,
    `<div class="mockup-form-sub">Proven Direct-Response Blueprint • Zero Long-Term Retainers</div>`
  );
  html = html.replace(
    /placeholder="name@company\.com"/i,
    `placeholder="founder@enterprise.com"`
  );
  html = html.replace(
    /<button type="button" class="mockup-submit-btn" id="demoFunnelSubmitBtn">[\s\S]*?<\/button>/i,
    `<button type="button" class="mockup-submit-btn" id="demoFunnelSubmitBtn">
                      <span>Free Audit →</span>
                    </button>`
  );
  html = html.replace(
    /Instant Lead Delivery &amp; CRM Webhook Activated/i,
    `Instant WhatsApp Alert • Zoho CRM Sync`
  );
  html = html.replace(
    /10\/10 Quality Score • 99\/100 PageSpeed • 14\.2% CVR/i,
    `10/10 Quality Score | 99/100 PageSpeed | 14.2% Conversion`
  );

  // PILLARS
  const pillarsRegex = /<div class="section-eyebrow">Conversion Engineering Pillars<\/div>\s*<h2 class="section-title">Crafted for Conversion Velocity &amp; Ad Rank<\/h2>[\s\S]*?<div class="channels-grid">[\s\S]*?<\/div>\s*<\/div>/i;
  const newPillars = `<div class="section-eyebrow">CONVERSION ENGINEERING PILLARS</div>
          <h2 class="section-title">Fast Conversion Rates</h2>
        </div>

        <div class="channels-grid">
          <div class="channel-card">
            <div class="channel-icon">💎</div>
            <h3 class="channel-title">Above The Fold Hero Section</h3>
            <p class="channel-desc">We create a strong headline, badges and lines to reverse risk along with a prominent CTA to ensure your offer is in the first 3 seconds of the page.</p>
          </div>

          <div class="channel-card">
            <div class="channel-icon">⚡</div>
            <h3 class="channel-title">Google Ads Quality Score Booster</h3>
            <p class="channel-desc">Our landing pages for Google Ads are created with keywords in mind, they are fast loading and clean to improve your cost per click and maintain top positions.</p>
          </div>

          <div class="channel-card">
            <div class="channel-icon">📱</div>
            <h3 class="channel-title">Quick Lead Delivery</h3>
            <p class="channel-desc">Your leads will be delivered to your team instantly via WhatsApp, Zoho/Hubspot CRM, Google Sheets.</p>
          </div>

          <div class="channel-card">
            <div class="channel-icon">🎯</div>
            <h3 class="channel-title">Perfect Conversion Tracking</h3>
            <p class="channel-desc">We use Meta Conversions API using server-side tracking, Google Enhanced Conversions and Microsoft Clarity heatmaps. Perfect for any Meta Ads landing pages.</p>
          </div>
        </div>`;
  html = html.replace(pillarsRegex, newPillars);

  // MATRIX
  const matrixRegex = /<div class="decision-matrix-card">[\s\S]*?<\/table>\s*<\/div>/i;
  const newMatrix = `<div class="decision-matrix-card">
          <div class="section-eyebrow" style="background: rgba(37, 99, 235, 0.1);">FUNNEL PERFORMANCE MATRIX</div>
          <h2 style="font-size: 1.85rem; margin-bottom: 0.75rem;">Heavy Drag &amp; Drop Builders vs Bespoke Funnel</h2>
          <p style="color: var(--text-secondary); margin-bottom: 2rem;">
            Why using drag and drop builders can impact your ad ROI and how our bespoke landing pages will keep your marketing budget safe.
          </p>

          <table class="matrix-table">
            <thead>
              <tr>
                <th>Evaluation Metric</th>
                <th>Standard Builder (Wix, Unbounce, Elementor)</th>
                <th>Custom Engineered Funnel (Sanjeev Kumar Malik)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Slow Mobile Page Loading</strong></td>
                <td>Using a standard builder will cause your page to load between 3.8s - 6.2s. This is due to the bloat of multiple vendor JS scripts.</td>
                <td>Using our bespoke funnel pages will speed up your page to around 0.7 seconds thanks to minimal CSS in-line coding, modern WebP images and no bloat.</td>
              </tr>
              <tr>
                <td><strong>Google Ads Quality Score Rating</strong></td>
                <td>Using a standard builder will give you an average score of 4/10 - 6/10 due to slow loading times and JS lag.</td>
                <td>Whereas using our bespoke funnel will provide you a consistent score of 9/10+ helping you reduce your cost per click by up to 30%.</td>
              </tr>
              <tr>
                <td><strong>Reliable Lead Delivery</strong></td>
                <td>Using a standard builder can lead to issues with email delivery, spamming and failed webhooks.</td>
                <td>Using our bespoke funnel will deliver your leads twice, once as a WhatsApp alert, and secondly via CRM API.</td>
              </tr>
              <tr>
                <td><strong>Accurate Ad Tracking</strong></td>
                <td>Using a standard builder will mean you need to use tracking pixels. These can often be blocked by iOS safari browsers and ad blockers.</td>
                <td>Using a bespoke funnel means we can use Meta CAPI &amp; Google Enhanced Conversion tracking using server-side tracking.</td>
              </tr>
              <tr>
                <td><strong>Monthly Cost</strong></td>
                <td>Using a standard builder will mean paying a monthly fee of 99-250 per workspace.</td>
                <td>Whereas our bespoke funnel has no monthly software costs and you will have full ownership over the code.</td>
              </tr>
            </tbody>
          </table>
        </div>`;
  html = html.replace(matrixRegex, newMatrix);

  // SPRINT
  const sprintRegex = /<div class="section-header" style="margin-top: 5rem;">\s*<div class="section-eyebrow">Agile Deployment<\/div>\s*<h2 class="section-title">The 4-Stage Funnel Engineering Sprint<\/h2>[\s\S]*?<\/div>\s*<div class="timeline-container"[\s\S]*?<\/div>\s*<\/div>/i;
  const newSprint = `<div class="section-header" style="margin-top: 5rem;">
          <div class="section-eyebrow">AGILE DEPLOYMENT</div>
          <h2 class="section-title">4 Step Funnel Creation Sprint</h2>
          <p class="section-description">
            We should never take months to create your landing page. Our landing page design company in Delhi will create you a high converting landing page in 5-7 working days.
          </p>
        </div>

        <div class="timeline-container" style="max-width: 900px; margin: 0 auto;">
          <div class="timeline-item">
            <div class="timeline-badge">01</div>
            <div class="timeline-content">
              <div class="timeline-date">01 | Stage 01 • Campaign Offer &amp; Conversion Framing</div>
              <h3 class="timeline-title">Clarify Hook, Identify Objections &amp; Write Copy</h3>
              <p class="timeline-desc">
                We start our landing page design services in Delhi by identifying what your offer is, what objections your buyers may have and creating strong benefit driven headlines.
              </p>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-badge">02</div>
            <div class="timeline-content">
              <div class="timeline-date">02 | Stage 02 • High-Fidelity UI &amp; Social Proof Flow</div>
              <h3 class="timeline-title">Wireframe &amp; Add Trust Badges</h3>
              <p class="timeline-desc">
                We will create a one page story using our landing page design and development service. This includes a hero section with hook, trust metrics, client proof cards, video testimonials, FAQ accordion and mobile sticky CTAs.
              </p>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-badge">03</div>
            <div class="timeline-content">
              <div class="timeline-date">03 | Stage 03 • Ultra-Fast Code &amp; Webhook Plumbing</div>
              <h3 class="timeline-title">HTML5/CSS3 Landing Page &amp; CRM Integration</h3>
              <p class="timeline-desc">
                Our landing page developer in Delhi will create you a clean semantic landing page that will be optimised with good Core Web Vitals. The landing page will also be integrated with your CRM, WhatsApp Business API and autoresponder.
              </p>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-badge">04</div>
            <div class="timeline-content">
              <div class="timeline-date">04 | Stage 04 • Pixel Validation &amp; Ad Campaign Launch</div>
              <h3 class="timeline-title">Test Meta CAPI &amp; Google Tag Manager</h3>
              <p class="timeline-desc">
                We will carry out test submissions to ensure your pixels are tracking, UTM’s are captured and your leads are being delivered. Your paid campaign is now ready to scale!
              </p>
            </div>
          </div>
        </div>`;
  html = html.replace(sprintRegex, newSprint);

  // CTA BOX
  html = html.replace(
    /Planning a Paid Google or Meta Ad Campaign\?/i,
    `Paid Google or Meta Ad Campaign?`
  );
  html = html.replace(
    /Don't let slow pages waste your ad budget\. Consult with Sanjeev Kumar Malik for a high-converting custom landing page sprint\./i,
    `Don’t waste your ad budget on slow pages. Speak to Sanjeev Kumar Malik your landing page design company in Delhi about creating a high converting bespoke landing page.`
  );

  return html;
}

const curLanding = fs.readFileSync('services/landing-page-design-development.html', 'utf-8');
const updatedLanding = updateLanding(curLanding);

fs.writeFileSync('services/landing-page-design-development.html', updatedLanding);
fs.writeFileSync('services/landing-page-design-development/index.html', updatedLanding);

console.log('Successfully updated landing-page-design-development.html and alias!');
