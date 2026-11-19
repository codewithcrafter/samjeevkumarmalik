const fs = require('fs');

function updateWebApp(content) {
  let html = content;

  // HERO
  html = html.replace(
    /<div class="section-eyebrow">ENTERPRISE SAAS &amp; APPLICATION ARCHITECTURE<\/div>\s*<h1 class="section-title">[\s\S]*?<\/h1>\s*<p class="section-description" style="max-width: 860px; margin: 0 auto;">[\s\S]*?<\/p>/i,
    `<div class="section-eyebrow">ENTERPRISE SAAS &amp; APPLICATION ARCHITECTURE</div>
        <h1 class="section-title">
          Custom Web Application Development in Delhi | Scalable SaaS &amp; Enterprise Portals – <span class="gradient-text">Sanjeev Kumar Malik</span>
        </h1>
        <p class="section-description" style="max-width: 860px; margin: 0 auto;">
          Off-the-shelf software rarely fits the way your business actually runs. If you need custom web application development in Delhi, we build bespoke web applications, multi-tenant SaaS platforms, customer booking engines and internal ERP dashboards on proven stacks: Laravel, Node.js, React and Next.js.
        </p>`
  );

  // SECTION 1: BESPOKE LOGIC BOX
  html = html.replace(
    /<div class="section-eyebrow" style="margin-bottom: 0\.5rem;">[\s\S]*?<\/div>\s*<h2 style="font-size: 2\.2rem; margin-bottom: 1rem;">[\s\S]*?<\/h2>\s*<p style="color: var\(--text-secondary\); line-height: 1\.7; font-size: 1\.05rem;">[\s\S]*?<\/p>\s*<div style="display: flex; gap: 0\.75rem; margin-top: 1\.5rem; flex-wrap: wrap;">[\s\S]*?<\/div>/i,
    `<div class="section-eyebrow" style="margin-bottom: 0.5rem;">BESPOKE LOGIC WITHOUT SAAS LOCK-IN</div>
            <h2 style="font-size: 2.2rem; margin-bottom: 1rem;">Replace Clunky Spreadsheets With Purpose-Built Software</h2>
            <p style="color: var(--text-secondary); line-height: 1.7; font-size: 1.05rem;">
              When your workflows outgrow generic tools, hours disappear into manual reconciliation and copy-pasting between sheets. Our custom web application development in Delhi replaces that mess with full-stack software designed around your process. You get role-based access control, clean multi-tenant data isolation, secure REST and GraphQL APIs, and real-time dashboards that show your leadership team exactly what is happening across operations. As a web application developer in Delhi NCR, I build these systems to be owned by you, with no per-seat licence fees and no vendor lock-in.
            </p>
            <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem; flex-wrap: wrap;">
              <span class="hero-tech-chip">Granular RBAC &amp; JWT Auth</span>
              <span class="hero-tech-chip">Interactive React / Next.js Dashboards</span>
              <span class="hero-tech-chip">Sub-100ms API Response Times</span>
              <span class="hero-tech-chip">SQL Injection &amp; CSRF Protected</span>
            </div>`
  );

  // SECTION 2: CAPABILITIES
  const capRegex = /<div class="section-header">\s*<div class="section-eyebrow">Full-Stack Capabilities<\/div>\s*<h2 class="section-title">Built for Enterprise Concurrency &amp; Data Integrity<\/h2>[\s\S]*?<div class="channels-grid">[\s\S]*?<\/div>\s*<\/div>/i;
  const newCap = `<div class="section-header">
          <div class="section-eyebrow">FULL-STACK CAPABILITIES</div>
          <h2 class="section-title">Built for Enterprise Concurrency &amp; Data Integrity</h2>
        </div>

        <div class="channels-grid">
          <div class="channel-card">
            <div class="channel-icon">💻</div>
            <h3 class="channel-title">Client &amp; Vendor Portals</h3>
            <p class="channel-desc">Secure portals where clients and vendors share documents, approve quotes, raise tickets and view encrypted payment history. Every user type gets its own permission tier. This is custom client portal development built for real business use.</p>
          </div>

          <div class="channel-card">
            <div class="channel-icon">📅</div>
            <h3 class="channel-title">Custom Booking &amp; Scheduling Engines</h3>
            <p class="channel-desc">Live slot availability, conflict-free calendar sync, SMS and WhatsApp reminders, and automatic deposit collection. Our booking engine development for service businesses keeps your calendar full and your front desk free.</p>
          </div>

          <div class="channel-card">
            <div class="channel-icon">🔄</div>
            <h3 class="channel-title">API Integration &amp; Middleware</h3>
            <p class="channel-desc">Link legacy systems, CRMs (HubSpot, Salesforce, Zoho), banking APIs (ICICI, HDFC, RazorpayX) and GST e-invoicing into one reliable data pipeline.</p>
          </div>

          <div class="channel-card">
            <div class="channel-icon">☁️</div>
            <h3 class="channel-title">High-Concurrency Cloud Architecture</h3>
            <p class="channel-desc">Deployed on AWS (EC2, RDS, S3), DigitalOcean or Docker containers, with Redis queues that process heavy background jobs without slowing down your users.</p>
          </div>
        </div>`;
  html = html.replace(capRegex, newCap);

  // SECTION 3: STACK COMPARISON
  const matrixRegex = /<div class="decision-matrix-card">[\s\S]*?Laravel vs MERN Stack vs Next\.js Fullstack — Choosing the Right Foundation[\s\S]*?<\/table>[\s\S]*?<\/div>/i;
  const newMatrix = `<div class="decision-matrix-card">
          <div class="section-eyebrow" style="background: rgba(37, 99, 235, 0.1);">STACK ARCHITECTURE COMPARISON</div>
          <h2 style="font-size: 1.85rem; margin-bottom: 0.75rem;">Laravel vs MERN Stack vs Next.js Fullstack — Choosing the Right Foundation</h2>
          <p style="color: var(--text-secondary); margin-bottom: 2rem;">
            The stack you pick decides your build speed, server cost and the developers you can hire later. For custom web application development in Delhi NCR, here is how I decide between the three.
          </p>

          <table class="matrix-table">
            <thead>
              <tr>
                <th>Evaluation Metric</th>
                <th>PHP / Laravel Stack</th>
                <th>MERN Stack (MongoDB, Express, React, Node)</th>
                <th>Next.js + TypeScript Fullstack</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Primary Sweet Spot</strong></td>
                <td>Data-heavy business software: ERPs, billing systems and rule-driven workflows.</td>
                <td>Live chat tools, flexible data models and high-volume event streams.</td>
                <td>Modern SaaS products and fast web tools that also need strong SEO.</td>
              </tr>
              <tr>
                <td><strong>Data Consistency &amp; Relations</strong></td>
                <td>10/10. Eloquent ORM with strict ACID guarantees on MySQL or PostgreSQL.</td>
                <td>7/10. NoSQL flexibility, but relational rules must be enforced in code.</td>
                <td>9/10. Type-safe queries through Prisma or Drizzle on a relational database.</td>
              </tr>
              <tr>
                <td><strong>Built-in Security Modules</strong></td>
                <td>CSRF, encrypted sessions, SQL injection protection and rate limiting come ready to use.</td>
                <td>Each security package has to be chosen, tested and wired in manually.</td>
                <td>NextAuth / Auth.js with middleware-level request protection.</td>
              </tr>
              <tr>
                <td><strong>Background Jobs &amp; Queues</strong></td>
                <td>Native queue workers, delayed dispatching and Horizon monitoring.</td>
                <td>Needs BullMQ or Redis plus a process supervisor.</td>
                <td>Handled by serverless functions or tools like Inngest and Trigger.dev.</td>
              </tr>
              <tr>
                <td><strong>Long-term Maintainability</strong></td>
                <td>Very high. Strong framework conventions make onboarding new developers easy.</td>
                <td>Medium. Code quality depends entirely on the architecture discipline of the team.</td>
                <td>Very high when strict TypeScript is used across frontend and backend.</td>
              </tr>
            </tbody>
          </table>
          <p style="margin-top: 1.5rem; font-size: 0.925rem; color: var(--text-secondary); line-height: 1.6;">
            Whether you need Laravel development services in Delhi for a billing-heavy ERP, MERN stack development in Delhi NCR for a real-time product, or Next.js development services in India for a search-friendly SaaS, the choice is made around your use case, never around trend.
          </p>
        </div>`;
  html = html.replace(matrixRegex, newMatrix);

  // SECTION 4: LIFECYCLE
  const lifeRegex = /<div class="section-header" style="margin-top: 5rem;">\s*<div class="section-eyebrow">Lifecycle Architecture<\/div>\s*<h2 class="section-title">The 4-Stage Software Engineering Protocol<\/h2>[\s\S]*?<\/div>\s*<div class="timeline-container"[\s\S]*?<\/div>\s*<\/div>/i;
  const newLife = `<div class="section-header" style="margin-top: 5rem;">
          <div class="section-eyebrow">LIFECYCLE ARCHITECTURE</div>
          <h2 class="section-title">The 4-Stage Software Engineering Protocol</h2>
          <p class="section-description">
            How Sanjeev Kumar Malik takes mission-critical software from idea to live launch without downtime.
          </p>
        </div>

        <div class="timeline-container" style="max-width: 900px; margin: 0 auto;">
          <div class="timeline-item">
            <div class="timeline-badge">01</div>
            <div class="timeline-content">
              <div class="timeline-date">01 | Phase 01 • System Architecture &amp; ERD</div>
              <h3 class="timeline-title">Entity Relationship Diagrams &amp; API Contracts</h3>
              <p class="timeline-desc">
                Every custom web application development in Delhi project starts on paper. We map your business entities, database relationships and foreign keys, then write a formal OpenAPI specification before any code is written.
              </p>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-badge">02</div>
            <div class="timeline-content">
              <div class="timeline-date">02 | Phase 02 • High-Fidelity UI &amp; Component System</div>
              <h3 class="timeline-title">Interactive Wireframes &amp; Tailwind Design Tokens</h3>
              <p class="timeline-desc">
                We design responsive dashboard layouts with accessible data tables, search filters, modal forms and notification toasts, tested against how your team will actually use them every day.
              </p>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-badge">03</div>
            <div class="timeline-content">
              <div class="timeline-date">03 | Phase 03 • Core Logic &amp; Integration Pipelines</div>
              <h3 class="timeline-title">Backend API Engineering, Role Management &amp; Webhooks</h3>
              <p class="timeline-desc">
                Backend services are built with unit tests, transactional rollbacks and webhook handlers with retry queues, so third-party failures never corrupt your data. This is also where multi-tenant SaaS development and custom ERP dashboard development take their final shape.
              </p>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-badge">04</div>
            <div class="timeline-content">
              <div class="timeline-date">04 | Phase 04 • Deployment &amp; Continuous Integration</div>
              <h3 class="timeline-title">Automated CI/CD, Backups &amp; Monitoring</h3>
              <p class="timeline-desc">
                We set up GitHub Actions pipelines, automatic SSL renewals, hourly offsite database backups and Sentry error tracking, so your application stays up and you hear about problems before your users do.
              </p>
            </div>
          </div>
        </div>`;
  html = html.replace(lifeRegex, newLife);

  // CTA BOX
  html = html.replace(
    /Discuss your feature roadmap directly with Sanjeev Kumar Malik for a technical feasibility assessment and architecture roadmap\./i,
    `Share your feature list and get a technical feasibility review and architecture roadmap from Sanjeev Kumar Malik. Whether it is SaaS application development in Delhi or a private portal for your own team, custom web application development in Delhi starts with one honest conversation.`
  );
  html = html.replace(
    /Next: Website Redesign &amp; Speed Optimization →/i,
    `Next: Website Redesign &amp; Speed →`
  );

  return html;
}

const curWebApp = fs.readFileSync('services/custom-web-application-development.html', 'utf-8');
const updatedWebApp = updateWebApp(curWebApp);

fs.writeFileSync('services/custom-web-application-development.html', updatedWebApp);
fs.writeFileSync('services/custom-web-application-development/index.html', updatedWebApp);

console.log('Successfully updated custom-web-application-development.html and alias!');

