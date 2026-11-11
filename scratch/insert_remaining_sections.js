const fs = require('fs');
const path = require('path');

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

if (!aboutHtml.includes('id="fiduciary-charter"')) {
  const targetA = '<!-- ==========================================================================\n         8. Custodian & Institutional Partners Marquee';
  const targetACRLF = '<!-- ==========================================================================\r\n         8. Custodian & Institutional Partners Marquee';

  if (aboutHtml.includes(targetA)) {
    aboutHtml = aboutHtml.replace(targetA, sectionA + '\n\n    ' + targetA);
    console.log('Inserted Section A (LF match)');
  } else if (aboutHtml.includes(targetACRLF)) {
    aboutHtml = aboutHtml.replace(targetACRLF, sectionA + '\r\n\r\n    ' + targetACRLF);
    console.log('Inserted Section A (CRLF match)');
  } else {
    // String split insertion
    const parts = aboutHtml.split('8. Custodian & Institutional Partners Marquee');
    if (parts.length === 2) {
      const lastCommentIdx = parts[0].lastIndexOf('<!-- ===');
      aboutHtml = parts[0].substring(0, lastCommentIdx) + sectionA + '\n\n    ' + parts[0].substring(lastCommentIdx) + '8. Custodian & Institutional Partners Marquee' + parts[1];
      console.log('Inserted Section A (split match)');
    }
  }
}

if (!aboutHtml.includes('id="global-footprint"')) {
  const targetB = '<!-- ==========================================================================\n         9. Senior Leadership & Advisory Committee';
  const targetBCRLF = '<!-- ==========================================================================\r\n         9. Senior Leadership & Advisory Committee';

  if (aboutHtml.includes(targetB)) {
    aboutHtml = aboutHtml.replace(targetB, sectionB + '\n\n    ' + targetB);
    console.log('Inserted Section B (LF match)');
  } else if (aboutHtml.includes(targetBCRLF)) {
    aboutHtml = aboutHtml.replace(targetBCRLF, sectionB + '\r\n\r\n    ' + targetBCRLF);
    console.log('Inserted Section B (CRLF match)');
  } else {
    const parts = aboutHtml.split('9. Senior Leadership & Advisory Committee');
    if (parts.length === 2) {
      const lastCommentIdx = parts[0].lastIndexOf('<!-- ===');
      aboutHtml = parts[0].substring(0, lastCommentIdx) + sectionB + '\n\n    ' + parts[0].substring(lastCommentIdx) + '9. Senior Leadership & Advisory Committee' + parts[1];
      console.log('Inserted Section B (split match)');
    }
  }
}

fs.writeFileSync(aboutPath, aboutHtml, 'utf8');
console.log('Updated about.html with Section A and Section B successfully!');
