const fs = require('fs');
const path = require('path');

// 1. Read CSS
const cssPath = path.join(__dirname, '..', 'css', 'styles.css');
const newCss = fs.readFileSync(path.join(__dirname, 'section34_about_styles.css'), 'utf8');

let currentCss = fs.readFileSync(cssPath, 'utf8');
if (!currentCss.includes('Section 34: Four Unique Layouts for About Page')) {
  currentCss = currentCss.trimEnd() + '\n\n' + newCss + '\n';
  fs.writeFileSync(cssPath, currentCss, 'utf8');
  console.log('Appended Section 34 styles to css/styles.css successfully!');
} else {
  console.log('Section 34 styles already in css/styles.css');
}

// 2. Read about.html
const aboutPath = path.join(__dirname, '..', 'about.html');
let aboutHtml = fs.readFileSync(aboutPath, 'utf8');

// Section A: Interactive Fiduciary Oath & Governance Charter
const sectionA = `
    <!-- ==========================================================================
         NEW SECTION A: Interactive Fiduciary Oath & Governance Charter
         ========================================================================== -->
    <section class="wm-fiduciary-charter-section" id="fiduciary-charter">
      <div class="wm-container">
        <div class="wm-section-header text-center" data-aos="fade-up">
          <div class="wm-tag"><span class="wm-tag-dot"></span>Institutional Governance</div>
          <h2>The Stackly Fiduciary Charter & Legal Covenants</h2>
          <p class="wm-section-subtitle">
            A legally binding standard of undivided loyalty, absolute fee transparency, and conflict-free execution.
          </p>
        </div>

        <div class="wm-charter-layout">
          <!-- Left: Solemn Oath & SEC Fiduciary Seal -->
          <div class="wm-charter-oath-card" data-aos="fade-right">
            <div>
              <div class="wm-charter-seal-badge">
                <i class="fa-solid fa-scale-balanced"></i>
                <span>SEC Registered RIA Mandate</span>
              </div>
              <div class="wm-charter-quote">
                "We hold zero proprietary inventory, collect zero broker rebates, and legally obligate ourselves to put client prosperity <mark>strictly before our own</mark> in every market cycle."
              </div>
            </div>

            <div>
              <div class="wm-charter-meta-grid">
                <div class="wm-charter-meta-item">
                  <div class="label">Regulatory Mandate</div>
                  <div class="value">Investment Advisers Act 1940</div>
                </div>
                <div class="wm-charter-meta-item">
                  <div class="label">SEC Registration</div>
                  <div class="value">CRD #284910 / RIA #801</div>
                </div>
                <div class="wm-charter-meta-item">
                  <div class="label">Revenue Model</div>
                  <div class="value">100% Fee-Only Direct</div>
                </div>
                <div class="wm-charter-meta-item">
                  <div class="label">Custody Security</div>
                  <div class="value">Independent 3rd-Party Ring-Fence</div>
                </div>
              </div>

              <a href="#contact" class="wm-charter-adv-download" data-open-modal="consultation">
                <div class="wm-charter-adv-left">
                  <div class="wm-charter-adv-icon">
                    <i class="fa-solid fa-file-shield"></i>
                  </div>
                  <div>
                    <div class="wm-charter-adv-title">SEC Form ADV Part 2A Disclosure</div>
                    <div class="wm-charter-adv-sub">Verified Regulatory Filing Brochure • 48 Pages</div>
                  </div>
                </div>
                <i class="fa-solid fa-arrow-down-to-bracket" style="color: var(--wm-secondary); font-size: 1.1rem;"></i>
              </a>
            </div>
          </div>

          <!-- Right: Four Core Fiduciary Covenants -->
          <div class="wm-charter-covenants-list" data-aos="fade-left">
            <!-- Covenant 1 -->
            <div class="wm-covenant-card">
              <div class="wm-covenant-header">
                <div class="wm-covenant-title-wrap">
                  <div class="wm-covenant-icon">
                    <i class="fa-solid fa-receipt"></i>
                  </div>
                  <h3 class="wm-covenant-title">Covenant I: The 100% Fee-Only Doctrine</h3>
                </div>
                <span class="wm-covenant-badge">Zero Commission</span>
              </div>
              <p class="wm-covenant-desc">
                Every dollar earned by Stackly is directly invoiced to the client as an agreed percentage of assets under management. We refuse 100% of 12b-1 mutual fund trails, broker-dealer soft dollars, and placement bounties.
              </p>
            </div>

            <!-- Covenant 2 -->
            <div class="wm-covenant-card">
              <div class="wm-covenant-header">
                <div class="wm-covenant-title-wrap">
                  <div class="wm-covenant-icon">
                    <i class="fa-solid fa-diagram-project"></i>
                  </div>
                  <h3 class="wm-covenant-title">Covenant II: Non-Proprietary Architecture</h3>
                </div>
                <span class="wm-covenant-badge">Open Universe</span>
              </div>
              <p class="wm-covenant-desc">
                Stackly does not manufacture, sponsor, or issue internal financial products. Our investment committee scans the global universe of 35,000+ institutional vehicles solely on risk-adjusted merits without in-house bias.
              </p>
            </div>

            <!-- Covenant 3 -->
            <div class="wm-covenant-card">
              <div class="wm-covenant-header">
                <div class="wm-covenant-title-wrap">
                  <div class="wm-covenant-icon">
                    <i class="fa-solid fa-vault"></i>
                  </div>
                  <h3 class="wm-covenant-title">Covenant III: Institutional Segregated Custody</h3>
                </div>
                <span class="wm-covenant-badge">SIPC Insured</span>
              </div>
              <p class="wm-covenant-desc">
                Client securities and cash are never commingled with Stackly capital. Assets are safeguarded directly at Charles Schwab Institutional, Fidelity, or BNY Mellon Pershing under the client's own legal tax identification.
              </p>
            </div>

            <!-- Covenant 4 -->
            <div class="wm-covenant-card">
              <div class="wm-covenant-header">
                <div class="wm-covenant-title-wrap">
                  <div class="wm-covenant-icon">
                    <i class="fa-solid fa-shield-halved"></i>
                  </div>
                  <h3 class="wm-covenant-title">Covenant IV: Quarterly Independent Compliance Audits</h3>
                </div>
                <span class="wm-covenant-badge">Forensic Oversight</span>
              </div>
              <p class="wm-covenant-desc">
                Quarterly unannounced mock-audits conducted by forensic compliance counsel ensure flawless adherence to state and federal fiduciary regulations with zero conflict exceptions and full whistleblower protection.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
`;

// Section B: Global Advisory Footprint & Institutional Custody Network
const sectionB = `
    <!-- ==========================================================================
         NEW SECTION B: Global Advisory Footprint & Institutional Custody Network
         ========================================================================== -->
    <section class="wm-footprint-section" id="global-footprint">
      <div class="wm-container">
        <div class="wm-section-header text-center" data-aos="fade-up">
          <div class="wm-tag" style="background-color: rgba(229, 255, 94, 0.15); color: var(--wm-secondary);">
            <span class="wm-tag-dot"></span>Spatial Architecture
          </div>
          <h2 style="color: var(--wm-white);">Strategic Footprint & Institutional Custody Hubs</h2>
          <p class="wm-section-subtitle" style="color: rgba(255, 255, 255, 0.7);">
            Headquartered in Salem with dedicated private market execution desks and European multi-currency custody.
          </p>
        </div>

        <div class="wm-footprint-grid">
          <!-- Hub 1: Salem Flagship -->
          <div class="wm-hub-card flagship" data-aos="fade-up" data-aos-delay="100">
            <div>
              <div class="wm-hub-top">
                <div class="wm-hub-icon-wrap">
                  <i class="fa-solid fa-landmark"></i>
                </div>
                <div class="wm-hub-status-live">
                  <span class="pulse-dot"></span> Flagship HQ
                </div>
              </div>
              <div class="wm-hub-city">Salem, Tamil Nadu</div>
              <div class="wm-hub-role">Global Headquarters & Family Office Operations</div>
            </div>

            <div class="wm-hub-metrics">
              <div class="wm-hub-stat-row">
                <span class="wm-hub-stat-lbl">Advisory Team</span>
                <span class="wm-hub-stat-val">45 Wealth Strategists</span>
              </div>
              <div class="wm-hub-stat-row">
                <span class="wm-hub-stat-lbl">Primary Focus</span>
                <span class="wm-hub-stat-val">Dynasty Trusts & Tax Alpha</span>
              </div>
              <div class="wm-hub-stat-row">
                <span class="wm-hub-stat-lbl">Regional AUM</span>
                <span class="wm-hub-stat-val">$280M+ Under Counsel</span>
              </div>
            </div>

            <div class="wm-hub-footer">
              <i class="fa-solid fa-location-dot" style="color: var(--wm-secondary);"></i>
              <span>Salem Financial District Hub</span>
            </div>
          </div>

          <!-- Hub 2: New York -->
          <div class="wm-hub-card" data-aos="fade-up" data-aos-delay="200">
            <div>
              <div class="wm-hub-top">
                <div class="wm-hub-icon-wrap">
                  <i class="fa-solid fa-chart-line"></i>
                </div>
                <div class="wm-hub-status-live">
                  <span class="pulse-dot"></span> Trading Desk
                </div>
              </div>
              <div class="wm-hub-city">New York, USA</div>
              <div class="wm-hub-role">Institutional Markets & Liquid Capital Desk</div>
            </div>

            <div class="wm-hub-metrics">
              <div class="wm-hub-stat-row">
                <span class="wm-hub-stat-lbl">Desk Specialists</span>
                <span class="wm-hub-stat-val">18 Quant Executioners</span>
              </div>
              <div class="wm-hub-stat-row">
                <span class="wm-hub-stat-lbl">Direct Colocation</span>
                <span class="wm-hub-stat-val">NYSE & NASDAQ Direct</span>
              </div>
              <div class="wm-hub-stat-row">
                <span class="wm-hub-stat-lbl">Liquidity Coverage</span>
                <span class="wm-hub-stat-val">US Equities & Syndicated Debt</span>
              </div>
            </div>

            <div class="wm-hub-footer">
              <i class="fa-solid fa-location-dot" style="color: var(--wm-secondary);"></i>
              <span>Financial Center, Manhattan</span>
            </div>
          </div>

          <!-- Hub 3: Zurich -->
          <div class="wm-hub-card" data-aos="fade-up" data-aos-delay="300">
            <div>
              <div class="wm-hub-top">
                <div class="wm-hub-icon-wrap">
                  <i class="fa-solid fa-shield-heart"></i>
                </div>
                <div class="wm-hub-status-live">
                  <span class="pulse-dot"></span> Swiss Depository
                </div>
              </div>
              <div class="wm-hub-city">Zurich, Switzerland</div>
              <div class="wm-hub-role">Cross-Border Sovereign Vault & Multi-Currency</div>
            </div>

            <div class="wm-hub-metrics">
              <div class="wm-hub-stat-row">
                <span class="wm-hub-stat-lbl">Vault Security</span>
                <span class="wm-hub-stat-val">Allocated Physical Bullion</span>
              </div>
              <div class="wm-hub-stat-row">
                <span class="wm-hub-stat-lbl">Currencies Hedged</span>
                <span class="wm-hub-stat-val">CHF, EUR, USD, GBP</span>
              </div>
              <div class="wm-hub-stat-row">
                <span class="wm-hub-stat-lbl">Jurisdiction Law</span>
                <span class="wm-hub-stat-val">Swiss Banking Act Standard</span>
              </div>
            </div>

            <div class="wm-hub-footer">
              <i class="fa-solid fa-location-dot" style="color: var(--wm-secondary);"></i>
              <span>Paradeplatz Banking Quarter</span>
            </div>
          </div>

          <!-- Hub 4: Singapore -->
          <div class="wm-hub-card" data-aos="fade-up" data-aos-delay="400">
            <div>
              <div class="wm-hub-top">
                <div class="wm-hub-icon-wrap">
                  <i class="fa-solid fa-globe"></i>
                </div>
                <div class="wm-hub-status-live">
                  <span class="pulse-dot"></span> APAC Desk
                </div>
              </div>
              <div class="wm-hub-city">Singapore</div>
              <div class="wm-hub-role">Asia-Pacific Wealth Structuring & VCC Hub</div>
            </div>

            <div class="wm-hub-metrics">
              <div class="wm-hub-stat-row">
                <span class="wm-hub-stat-lbl">Entity Framework</span>
                <span class="wm-hub-stat-val">Variable Capital Co (VCC)</span>
              </div>
              <div class="wm-hub-stat-row">
                <span class="wm-hub-stat-lbl">Tax Treaties</span>
                <span class="wm-hub-stat-val">90+ Bilateral Pacts</span>
              </div>
              <div class="wm-hub-stat-row">
                <span class="wm-hub-stat-lbl">Cross-Border</span>
                <span class="wm-hub-stat-val">ASEAN & India Corridor</span>
              </div>
            </div>

            <div class="wm-hub-footer">
              <i class="fa-solid fa-location-dot" style="color: var(--wm-secondary);"></i>
              <span>Marina Bay Financial Centre</span>
            </div>
          </div>
        </div>

        <!-- Institutional Clearing Connectivity Bar -->
        <div class="wm-custody-clearing-bar" data-aos="fade-up">
          <div class="wm-custody-clearing-title">
            <i class="fa-solid fa-building-shield"></i>
            <span>Institutional Clearing & Direct Custody Connectivity:</span>
          </div>
          <div class="wm-clearing-badges-row">
            <div class="wm-clearing-badge-item">
              <i class="fa-solid fa-check-circle"></i> Charles Schwab Institutional
            </div>
            <div class="wm-clearing-badge-item">
              <i class="fa-solid fa-check-circle"></i> Fidelity Institutional Clearing
            </div>
            <div class="wm-clearing-badge-item">
              <i class="fa-solid fa-check-circle"></i> BNY Mellon Pershing
            </div>
            <div class="wm-clearing-badge-item">
              <i class="fa-solid fa-check-circle"></i> Interactive Brokers LLC
            </div>
          </div>
        </div>
      </div>
    </section>
`;

// Section C: Academic Advisory & Investment Committee Dossiers
const sectionC = `
    <!-- ==========================================================================
         NEW SECTION C: Academic Advisory & Investment Committee Dossiers
         ========================================================================== -->
    <section class="wm-committee-section" id="academic-committee">
      <div class="wm-container">
        <div class="wm-section-header text-center" data-aos="fade-up">
          <div class="wm-tag"><span class="wm-tag-dot"></span>Quantitative Rigor</div>
          <h2>Investment Committee & Academic Research Board</h2>
          <p class="wm-section-subtitle">
            Independent economic scholars and quantitative strategists directing our capital allocation models.
          </p>
        </div>

        <div class="wm-committee-grid">
          <!-- Scholar 1 -->
          <div class="wm-committee-card" data-aos="fade-up" data-aos-delay="100">
            <div class="wm-committee-top">
              <div class="wm-committee-avatar-wrap">
                <div class="wm-committee-avatar">
                  <i class="fa-solid fa-graduation-cap"></i>
                </div>
                <span class="wm-committee-seat-pill">Committee Chair</span>
              </div>
              <h3 class="wm-committee-name">Dr. Henrik Lindqvist, Ph.D.</h3>
              <div class="wm-committee-role">Chair, Global Macro & Factor Allocation</div>
              <div class="wm-committee-tags">
                <span class="wm-cred-badge">Ph.D. MIT Economics</span>
                <span class="wm-cred-badge">Ex-Fed Fellow</span>
                <span class="wm-cred-badge">28 Yrs Research</span>
              </div>
            </div>

            <div class="wm-committee-body">
              <p class="wm-committee-bio">
                Renowned monetary economist and former visiting fellow at the Federal Reserve Board. Formulates our proprietary sovereign yield curve models and strategic inflation-hedging matrices.
              </p>

              <div class="wm-monograph-box">
                <div class="wm-monograph-lbl"><i class="fa-solid fa-book-open"></i> Key Research Monograph</div>
                <div class="wm-monograph-title">"Dynamic Duration & Real-Asset Factor Premiums in Sticky Inflation Regimes"</div>
              </div>
            </div>

            <div class="wm-committee-footer">
              <span>Published Q3 2024</span>
              <a href="#contact" class="wm-committee-btn" data-open-modal="consultation">
                <span>Request Paper</span>
                <i class="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          </div>

          <!-- Scholar 2 -->
          <div class="wm-committee-card" data-aos="fade-up" data-aos-delay="200">
            <div class="wm-committee-top">
              <div class="wm-committee-avatar-wrap">
                <div class="wm-committee-avatar">
                  <i class="fa-solid fa-chart-pie"></i>
                </div>
                <span class="wm-committee-seat-pill">Risk Architect</span>
              </div>
              <h3 class="wm-committee-name">Dr. Elena Rostova, Ph.D., CFA</h3>
              <div class="wm-committee-role">Head of Quantitative Volatility & Tail-Risk</div>
              <div class="wm-committee-tags">
                <span class="wm-cred-badge">Ph.D. Applied Math ETH</span>
                <span class="wm-cred-badge">CFA Charter</span>
                <span class="wm-cred-badge">FRM Certified</span>
              </div>
            </div>

            <div class="wm-committee-body">
              <p class="wm-committee-bio">
                Specializes in non-linear stochastic risk modeling and asymmetric portfolio convexity. Leads the quarterly stress-testing engine simulating 10,000+ extreme tail-risk scenarios.
              </p>

              <div class="wm-monograph-box">
                <div class="wm-monograph-lbl"><i class="fa-solid fa-book-open"></i> Key Research Monograph</div>
                <div class="wm-monograph-title">"Multi-Asset Asymmetry: Convexity Hedging via Systematic Options Collars"</div>
              </div>
            </div>

            <div class="wm-committee-footer">
              <span>Published Q1 2025</span>
              <a href="#contact" class="wm-committee-btn" data-open-modal="consultation">
                <span>Request Paper</span>
                <i class="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          </div>

          <!-- Scholar 3 -->
          <div class="wm-committee-card" data-aos="fade-up" data-aos-delay="300">
            <div class="wm-committee-top">
              <div class="wm-committee-avatar-wrap">
                <div class="wm-committee-avatar">
                  <i class="fa-solid fa-landmark-dome"></i>
                </div>
                <span class="wm-committee-seat-pill">Trust Fellow</span>
              </div>
              <h3 class="wm-committee-name">Marcus Vance, LL.M., TEP</h3>
              <div class="wm-committee-role">Chair, Dynasty Trust & Intergenerational Law</div>
              <div class="wm-committee-tags">
                <span class="wm-cred-badge">LL.M. Georgetown Law</span>
                <span class="wm-cred-badge">TEP Fellow</span>
                <span class="wm-cred-badge">CFP® Practitioner</span>
              </div>
            </div>

            <div class="wm-committee-body">
              <p class="wm-committee-bio">
                Preeminent trust jurisprudence authority focusing on generation-skipping transfer (GST) taxation, statutory dynasty trust longevity, and multi-jurisdictional family charters.
              </p>

              <div class="wm-monograph-box">
                <div class="wm-monograph-lbl"><i class="fa-solid fa-book-open"></i> Key Research Monograph</div>
                <div class="wm-monograph-title">"Perpetual Dynasty Trusts & Cross-Border Wealth Transfer in the 21st Century"</div>
              </div>
            </div>

            <div class="wm-committee-footer">
              <span>Published Q4 2024</span>
              <a href="#contact" class="wm-committee-btn" data-open-modal="consultation">
                <span>Request Paper</span>
                <i class="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
`;

// Section D: Co-Investment "Skin in the Game" Bento Alignment Matrix
const sectionD = `
    <!-- ==========================================================================
         NEW SECTION D: Co-Investment "Skin in the Game" Bento Alignment Matrix
         ========================================================================== -->
    <section class="wm-skin-alignment-section" id="skin-in-the-game">
      <div class="wm-container">
        <div class="wm-section-header text-center" data-aos="fade-up">
          <div class="wm-tag"><span class="wm-tag-dot"></span>Absolute Alignment</div>
          <h2>Skin in the Game: The Stackly Co-Investment Model</h2>
          <p class="wm-section-subtitle">
            We do not recommend any portfolio allocation we do not personally hold with our own family capital.
          </p>
        </div>

        <!-- Comparative Bento Grid: Broker-Dealer vs Stackly -->
        <div class="wm-alignment-split-bento" data-aos="fade-up">
          <!-- Traditional Brokerage Model -->
          <div class="wm-broker-card">
            <div>
              <div class="wm-broker-header">
                <div class="wm-broker-badge">
                  <i class="fa-solid fa-triangle-exclamation"></i> Traditional Broker-Dealer
                </div>
                <h3 class="wm-broker-title">The Sales Commission Paradox</h3>
              </div>

              <ul class="wm-broker-list">
                <li class="wm-broker-item">
                  <i class="fa-solid fa-circle-xmark"></i>
                  <span><strong>Proprietary Fund Sales Quotas:</strong> Brokers are financially incentivized to distribute high-margin in-house products.</span>
                </li>
                <li class="wm-broker-item">
                  <i class="fa-solid fa-circle-xmark"></i>
                  <span><strong>Hidden 12b-1 Trail Rebates:</strong> Fund companies pay ongoing kickbacks behind the scenes to brokerage sales reps.</span>
                </li>
                <li class="wm-broker-item">
                  <i class="fa-solid fa-circle-xmark"></i>
                  <span><strong>Suitability Loophole:</strong> Legally required only to provide advice that is "suitable", not strictly in the client's best interest.</span>
                </li>
                <li class="wm-broker-item">
                  <i class="fa-solid fa-circle-xmark"></i>
                  <span><strong>Zero Advisor Co-Investment:</strong> Broker representatives rarely hold personal wealth in the complex syndications they sell.</span>
                </li>
              </ul>
            </div>

            <div style="margin-top: 24px; padding-top: 18px; border-top: 1px solid #E5E7EB; font-size: 0.8rem; color: #9CA3AF;">
              Incentivized by transaction volume and distributor kickbacks.
            </div>
          </div>

          <!-- The Stackly Covenant -->
          <div class="wm-stackly-covenant-card">
            <div>
              <div class="wm-covenant-header-top">
                <div class="wm-covenant-badge-active">
                  <i class="fa-solid fa-shield-check"></i> Stackly Fiduciary Covenant
                </div>
                <div class="wm-covenant-seal-icon">
                  <i class="fa-solid fa-award"></i>
                </div>
              </div>

              <h3 class="wm-covenant-big-title">Uncompromising Co-Investment & Fiduciary Mandate</h3>

              <ul class="wm-stackly-list">
                <li class="wm-stackly-item">
                  <i class="fa-solid fa-circle-check"></i>
                  <span><strong>Mandatory Personal Co-Investment:</strong> Stackly senior partners invest 60%+ of their personal liquid net worth in the exact same client models.</span>
                </li>
                <li class="wm-stackly-item">
                  <i class="fa-solid fa-circle-check"></i>
                  <span><strong>100% Fee-Only Independence:</strong> Zero kickbacks, zero 12b-1 trailers, and zero soft dollars. All institutional rebates flow 100% to clients.</span>
                </li>
                <li class="wm-stackly-item">
                  <i class="fa-solid fa-circle-check"></i>
                  <span><strong>Strict Fiduciary Legal Duty:</strong> Bound by federal law under the 1940 Act to exercise undivided loyalty and full disclosure at all times.</span>
                </li>
                <li class="wm-stackly-item">
                  <i class="fa-solid fa-circle-check"></i>
                  <span><strong>Ring-Fenced Account Isolation:</strong> Discretionary client assets reside safely in your name at world-class institutional custodians.</span>
                </li>
              </ul>
            </div>

            <div style="margin-top: 24px; padding-top: 18px; border-top: 1px solid rgba(255, 255, 255, 0.12); font-size: 0.82rem; color: rgba(229, 255, 94, 0.9);">
              We win only when you win. Complete alignment of financial destiny.
            </div>
          </div>
        </div>

        <!-- Metric Bento Ribbon -->
        <div class="wm-skin-metrics-ribbon" data-aos="fade-up">
          <div class="wm-skin-metric-card">
            <div class="wm-skin-val">$42.5M+</div>
            <div class="wm-skin-lbl">Advisor Co-Investment</div>
            <div class="wm-skin-sub">Partner personal capital deployed alongside clients</div>
          </div>

          <div class="wm-skin-metric-card">
            <div class="wm-skin-val">$0.00</div>
            <div class="wm-skin-lbl">Commission Revenue</div>
            <div class="wm-skin-sub">100% fee-only transparency with zero hidden spreads</div>
          </div>

          <div class="wm-skin-metric-card">
            <div class="wm-skin-val">100%</div>
            <div class="wm-skin-lbl">Legal Fiduciary Oath</div>
            <div class="wm-skin-sub">Zero suitability compromises or third-party conflicts</div>
          </div>

          <div class="wm-skin-metric-card">
            <div class="wm-skin-val">99.2%</div>
            <div class="wm-skin-lbl">Generational Retention</div>
            <div class="wm-skin-sub">Multi-decade wealth preservation across family lineages</div>
          </div>
        </div>
      </div>
    </section>
`;

// Insert sections if not present
if (!aboutHtml.includes('id="fiduciary-charter"')) {
  // Insert Section A after the stats section (id="stats" parent section)
  // Search for the end of the stats section:
  const statsSectionEnd = '</section>\n\n    <!-- ==========================================================================\n         8. Marquee: Institutional Custody & Partner Trust';
  const statsSectionEndAlt = '</section>\r\n\r\n    <!-- ==========================================================================\r\n         8. Marquee: Institutional Custody & Partner Trust';

  if (aboutHtml.includes(statsSectionEnd)) {
    aboutHtml = aboutHtml.replace(statsSectionEnd, '</section>\n' + sectionA + '\n    <!-- ==========================================================================\n         8. Marquee: Institutional Custody & Partner Trust');
    console.log('Inserted Section A (LF)');
  } else if (aboutHtml.includes(statsSectionEndAlt)) {
    aboutHtml = aboutHtml.replace(statsSectionEndAlt, '</section>\r\n' + sectionA + '\r\n    <!-- ==========================================================================\r\n         8. Marquee: Institutional Custody & Partner Trust');
    console.log('Inserted Section A (CRLF)');
  } else {
    // Regex fallback
    aboutHtml = aboutHtml.replace(/(<\/div>\s*<\/section>\s*<!-- [=\s\d.]*8\.\s*Marquee)/i, '</div>\n    </section>\n' + sectionA + '\n\n    <!-- ==========================================================================\n         8. Marquee');
    console.log('Inserted Section A (Regex)');
  }
}

if (!aboutHtml.includes('id="global-footprint"')) {
  // Insert Section B after the marquee section (wm-marquee-section)
  aboutHtml = aboutHtml.replace(/(<\/section>\s*<!-- [=\s\d.]*9\.\s*Leadership)/i, '</section>\n' + sectionB + '\n\n    <!-- ==========================================================================\n         9. Leadership');
  console.log('Inserted Section B');
}

if (!aboutHtml.includes('id="academic-committee"')) {
  // Insert Section C after the team section (id="team")
  // Let's insert Section C right before id="contact"
  // And Section D right after Section C
  aboutHtml = aboutHtml.replace(/(<!-- [=\s\d.]*10\.\s*Contact \/ Consultation Form Section)/i, sectionC + '\n\n' + sectionD + '\n\n    $1');
  console.log('Inserted Section C and Section D');
}

fs.writeFileSync(aboutPath, aboutHtml, 'utf8');
console.log('about.html updated successfully!');
