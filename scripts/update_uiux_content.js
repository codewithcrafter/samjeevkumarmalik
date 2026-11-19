const fs = require('fs');

function updateUIUX(content) {
  let html = content;

  // HERO
  html = html.replace(
    /<div class="section-eyebrow">AESTHETIC ARCHITECTURE &amp; WCAG 2\.2 ACCESSIBILITY<\/div>\s*<h1 class="section-title">[\s\S]*?<\/h1>\s*<p class="section-description" style="max-width: 860px; margin: 0 auto;">[\s\S]*?<\/p>/i,
    `<div class="section-eyebrow">AESTHETIC ARCHITECTURE &amp; WCAG 2.2 ACCESSIBILITY</div>
        <h1 class="section-title">
          UI UX Design Services Delhi | Human Centred UI/UX Design by <span class="gradient-text">Sanjeev Kumar Malik</span>
        </h1>
        <p class="section-description" style="max-width: 860px; margin: 0 auto;">
          Great design is very important. Good design will make your website visitors understand what your product is about in just 5 seconds. Poor design will make them leave after just 3 seconds. My UI UX design services will create beautiful, accessible, mobile responsive designs that convert your visitors to paying customers. Regardless if you require website or mobile app UI UX design services, my aim is to ensure your designs are clear, fast and convert.
        </p>`
  );

  // FEATURE BOX
  html = html.replace(
    /<div class="section-eyebrow" style="margin-bottom: 0\.5rem;">[\s\S]*?<\/div>\s*<h2 style="font-size: 2\.2rem; margin-bottom: 1rem;">[\s\S]*?<\/h2>\s*<p style="color: var\(--text-secondary\); line-height: 1\.7; font-size: 1\.05rem;">[\s\S]*?<\/p>\s*<div style="display: flex; gap: 0\.75rem; margin-top: 1\.5rem; flex-wrap: wrap;">[\s\S]*?<\/div>/i,
    `<div class="section-eyebrow" style="margin-bottom: 0.5rem;">DESIGNED BY AN ARCHITECT</div>
            <h2 style="font-size: 2.2rem; margin-bottom: 1rem;">Closing The Gap Between Figma And Code</h2>
            <p style="color: var(--text-secondary); line-height: 1.7; font-size: 1.05rem;">
              Many designers produce beautiful designs that don’t translate well to code. I have a background in full stack development and UI architecture meaning everything is designed and developed with real data in mind. Every single component is designed with CSS variables, responsive grids and clear break points. You’ll get exactly what you see in Figma, 100% of the time. If you’re looking for a UI UX designer in Delhi who understands real coding this is what separates my UI UX design services in Delhi.
            </p>
            <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem; flex-wrap: wrap;">
              <span class="hero-tech-chip">WCAG 2.2 AA Contrast Compliant</span>
              <span class="hero-tech-chip">One Thumb Mobile Design</span>
              <span class="hero-tech-chip">Haptic Micro Interactions</span>
              <span class="hero-tech-chip">Figma To CSS 1:1 Tokens</span>
            </div>`
  );

  // PILLARS
  const pillarsRegex = /<div class="section-header">\s*<div class="section-eyebrow">Design Disciplines<\/div>\s*<h2 class="section-title">Engineered for Usability &amp; Conversion<\/h2>[\s\S]*?<div class="channels-grid">[\s\S]*?<\/div>\s*<\/div>/i;
  const newPillars = `<div class="section-header">
          <div class="section-eyebrow">DESIGN SERVICES</div>
          <h2 class="section-title">User Friendly &amp; Convertive Design</h2>
        </div>

        <div class="channels-grid">
          <div class="channel-card">
            <div class="channel-icon">📐</div>
            <h3 class="channel-title">Mobile Responsive Design</h3>
            <p class="channel-desc">Most Indian users will be browsing on their phone with one hand. This means all of the key features within your design will be thumb friendly. Buttons will be large (48px) so they are easy to tap and forms will be short and keyboard friendly.</p>
          </div>

          <div class="channel-card">
            <div class="channel-icon">♿</div>
            <h3 class="channel-title">Accessible Design With WCAG 2.2</h3>
            <p class="channel-desc">An accessible website will help broaden your audience and protect your brand. All of our designs will have good contrast, clear focus states, ARIA labels and are fully keyboard friendly.</p>
          </div>

          <div class="channel-card">
            <div class="channel-icon">🎨</div>
            <h3 class="channel-title">Design System &amp; Tokens</h3>
            <p class="channel-desc">All of your colours, fonts, margins and cards are set up in one place in Figma. Everything is mapped to CSS custom properties so your team can easily scale your product without any design issues.</p>
          </div>

          <div class="channel-card">
            <div class="channel-icon">✨</div>
            <h3 class="channel-title">Micro Interactions</h3>
            <p class="channel-desc">All hover states are light and smooth, springs are smooth, skeleton loaders and clear toast messages mean all taps will feel very responsive.</p>
          </div>
        </div>`;
  html = html.replace(pillarsRegex, newPillars);

  // DESIGN MATRIX
  const matrixRegex = /<div class="section-header" style="margin-top: 5rem;">\s*<div class="section-eyebrow">The Engineering Difference<\/div>\s*<h2 class="section-title">Surface-Level UI Studios vs Architect-Led UX Engineering<\/h2>[\s\S]*?<div class="comparison-grid">[\s\S]*?<\/div>\s*<\/div>/i;
  const newMatrix = `<div class="decision-matrix-card" style="margin-top: 5rem;">
          <div class="section-eyebrow" style="background: rgba(37, 99, 235, 0.1);">DESIGN MATRIX</div>
          <h3 style="font-size: 1.85rem; margin-bottom: 0.75rem;">Why Beautiful Designs Often Fail &amp; How We Ensure You Get The Best UI UX Design Services In Delhi</h3>

          <div class="table-responsive" style="margin-top: 1.5rem;">
            <table class="matrix-table">
              <thead>
                <tr>
                  <th>Design Feature</th>
                  <th>Typical Graphic Agency Design</th>
                  <th>Architect Led UI/UX Design (Sanjeev Kumar Malik)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Edge Cases</strong></td>
                  <td>Beautiful design but only works with a 3 word heading. Breaks when real user data is added.</td>
                  <td>We plan for empty states, error messages, long text and overflow.</td>
                </tr>
                <tr>
                  <td><strong>Mobile Responsive</strong></td>
                  <td>Shrunk desktop design. Looks clunky.</td>
                  <td>Designed for mobile first. Thumb zones, bottom sheets and natural gestures.</td>
                </tr>
                <tr>
                  <td><strong>Accessibility (WCAG)</strong></td>
                  <td>Light grey text on white. Difficult to read.</td>
                  <td>WCAG 2.2 compliant. High contrast, clear focus and screen reader friendly.</td>
                </tr>
                <tr>
                  <td><strong>Handover To Developer</strong></td>
                  <td>Flat images or messy Figma design. Random margin values.</td>
                  <td>Clean auto layouts, named tokens and component library.</td>
                </tr>
                <tr>
                  <td><strong>Performance</strong></td>
                  <td>Large video backgrounds and non optimised graphics.</td>
                  <td>Light CSS gradients, SVG icons and fast smooth transitions.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>`;
  html = html.replace(matrixRegex, newMatrix);

  // DESIGN PROCESS
  const processRegex = /<div class="section-header" style="margin-top: 5rem;">\s*<div class="section-eyebrow">Design Process<\/div>\s*<h2 class="section-title">The 4-Stage UX Engineering Lifecycle<\/h2>[\s\S]*?<\/div>\s*<div class="timeline-container"[\s\S]*?<\/div>\s*<\/div>/i;
  const newProcess = `<div class="section-header" style="margin-top: 5rem;">
          <div class="section-eyebrow">DESIGN PROCESS</div>
          <h2 class="section-title">4 STEP UX ENGINEERING PROCESS</h2>
          <p class="section-description">
            We follow a clear process to ensure we deliver quality UI UX design services in Delhi.
          </p>
        </div>

        <div class="timeline-container" style="max-width: 900px; margin: 0 auto;">
          <div class="timeline-item">
            <div class="timeline-badge">01</div>
            <div class="timeline-content">
              <div class="timeline-date">01 | Stage 01 – User Research &amp; Information Architecture</div>
              <p class="timeline-desc">
                Understanding your audience journeys. Find areas of friction and ensure your sitemap has all of your key features within 3 clicks.
              </p>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-badge">02</div>
            <div class="timeline-content">
              <div class="timeline-date">02 | Stage 02 – Low Fidelity Wireframes</div>
              <p class="timeline-desc">
                We test your layouts and information flow early on to avoid weeks of rework and save you money.
              </p>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-badge">03</div>
            <div class="timeline-content">
              <div class="timeline-date">03 | Stage 03 – High Fidelity UI Design</div>
              <p class="timeline-desc">
                We’ll create a beautiful design for your product. Light surfaces, sharp borders, cards and interactive elements to bring your brand to life and build trust.
              </p>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-badge">04</div>
            <div class="timeline-content">
              <div class="timeline-date">04 | Stage 04 – Component Library &amp; Front End</div>
              <p class="timeline-desc">
                Every component is tested in real browsers (Safari, Chrome &amp; Firefox). Final build will match the approved design with no visual issues. Your developers will receive design tokens from Figma.
              </p>
            </div>
          </div>
        </div>`;
  html = html.replace(processRegex, newProcess);

  // CTA BOX
  html = html.replace(
    /Elevate Your Digital Experience/i,
    `BOOST YOUR DIGITAL PRODUCT`
  );
  html = html.replace(
    /Ready for an Awwwards-Tier UI\/UX Transformation\?/i,
    `Want A UI/UX Design That Will Help Boost Sales?`
  );
  html = html.replace(
    /Consult directly with Sanjeev Kumar Malik for a comprehensive UX teardown of your existing software or new product design roadmap\./i,
    `Book A Direct Session To Get An In Depth UX Review Of Your Current Product Or Design Roadmap For A New Product. If you’d like a hands on UX designer in Delhi instead of a large UI UX design agency in Delhi NCR then let’s talk.`
  );
  html = html.replace(
    /Next: Web Development for Startups →/i,
    `Next: Startups &amp; SMEs →`
  );

  return html;
}

const curUIUX = fs.readFileSync('services/ui-ux-design-services.html', 'utf-8');
const updatedUIUX = updateUIUX(curUIUX);

fs.writeFileSync('services/ui-ux-design-services.html', updatedUIUX);
fs.writeFileSync('services/ui-ux-design-services/index.html', updatedUIUX);

console.log('Successfully updated ui-ux-design-services.html and alias!');

