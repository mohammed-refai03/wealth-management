const fs = require('fs');
const path = require('path');

const servicesPath = 'd:\\office-tasks\\wealth-management\\services.html';
const content = fs.readFileSync(servicesPath, 'utf8');

const targetMarker = `    <!-- ==========================================================================
         SECTION 7 of 7: Schedule a Diagnostic Wealth Review (Consultation Form)
         ========================================================================== -->`;

const newSectionsHTML = `    <!-- ==========================================================================
         SECTION 7: Tiered Advisory Architecture (Service Tier Matrix)
         ========================================================================== -->
    <section class="wm-section" id="service-tiers">
      <div class="wm-container">
        <div class="wm-section-header text-center" data-aos="fade-up">
          <div class="wm-tag"><span class="wm-tag-dot"></span>Engagement Architecture</div>
          <h2>Tailored Advisory Tiers for Discerning Capital</h2>
          <p class="wm-section-subtitle">Transparent, fee-only fiduciary mandates scaled to your family's asset volume, liquidity horizon, and governance complexity.</p>
        </div>

        <div class="wm-service-tiers-grid">
          
          <!-- Tier 1 -->
          <div class="wm-tier-card" data-aos="fade-up" data-aos-delay="100">
            <div>
              <div class="wm-tier-header">
                <div class="wm-tier-category">Tier 1 • Core Mandate</div>
                <h3 class="wm-tier-title">Private Wealth Advisory</h3>
                <div class="wm-tier-min-wrap">
                  <span class="wm-tier-min-val">$1M - $5M</span>
                  <span class="wm-tier-min-lbl">Liquid Capital</span>
                </div>
                <span class="wm-tier-fee-badge">0.65% AUM • 100% Fee-Only</span>
              </div>
              <p class="wm-tier-desc">
                Ideal for high-earning tech executives, medical partners, and senior leaders seeking structured capital growth, algorithmic tax mitigation, and disciplined portfolio stewardship.
              </p>
              <ul class="wm-tier-features">
                <li><i class="fa-solid fa-circle-check"></i> <span>Direct custody at Charles Schwab & Fidelity</span></li>
                <li><i class="fa-solid fa-circle-check"></i> <span>Daily automated tax-loss harvesting engine</span></li>
                <li><i class="fa-solid fa-circle-check"></i> <span>Direct indexing & quantitative factor modeling</span></li>
                <li><i class="fa-solid fa-circle-check"></i> <span>Executive stock option (ISO/RSU) liquidation plans</span></li>
                <li><i class="fa-solid fa-circle-check"></i> <span>Semi-annual fiduciary portfolio rebalancing</span></li>
                <li><i class="fa-solid fa-circle-check"></i> <span>Direct access to Senior Wealth Architect</span></li>
              </ul>
            </div>
            <a href="#booking" class="wm-btn wm-btn-outline" style="width: 100%; justify-content: center;">
              <span>Schedule Tier 1 Consultation</span>
              <span class="wm-btn-icon"><i class="fa-solid fa-arrow-right"></i></span>
            </a>
          </div>

          <!-- Tier 2 (Featured / Signature) -->
          <div class="wm-tier-card featured" data-aos="fade-up" data-aos-delay="200">
            <span class="wm-tier-badge-pill"><i class="fa-solid fa-star" style="margin-right: 4px;"></i> Most Preferred for Founders</span>
            <div>
              <div class="wm-tier-header">
                <div class="wm-tier-category">Tier 2 • Signature Mandate</div>
                <h3 class="wm-tier-title">Discretionary Private Client</h3>
                <div class="wm-tier-min-wrap">
                  <span class="wm-tier-min-val">$5M - $25M</span>
                  <span class="wm-tier-min-lbl">Liquid Capital</span>
                </div>
                <span class="wm-tier-fee-badge">0.45% AUM • Zero Commissions</span>
              </div>
              <p class="wm-tier-desc">
                Engineered for accredited founders, exit-stage entrepreneurs, and multi-asset investors requiring bespoke private market allocations, liquidity structuring, and dynasty trusts.
              </p>
              <ul class="wm-tier-features">
                <li><i class="fa-solid fa-circle-check"></i> <span>Everything in Private Wealth Advisory</span></li>
                <li><i class="fa-solid fa-circle-check"></i> <span>Direct access to private credit & venture debt deals</span></li>
                <li><i class="fa-solid fa-circle-check"></i> <span>Pre-IPO & M&A liquidity event tax blueprinting</span></li>
                <li><i class="fa-solid fa-circle-check"></i> <span>Custom Revocable & Irrevocable Living Trust setup</span></li>
                <li><i class="fa-solid fa-circle-check"></i> <span>Quarterly in-person strategy & tax planning summits</span></li>
                <li><i class="fa-solid fa-circle-check"></i> <span>Dedicated 2-person CFA & CFP advisory cell</span></li>
              </ul>
            </div>
            <a href="#booking" class="wm-btn wm-btn-primary" style="width: 100%; justify-content: center;">
              <span>Access Discretionary Mandate</span>
              <span class="wm-btn-icon"><i class="fa-solid fa-arrow-right"></i></span>
            </a>
          </div>

          <!-- Tier 3 -->
          <div class="wm-tier-card" data-aos="fade-up" data-aos-delay="300">
            <div>
              <div class="wm-tier-header">
                <div class="wm-tier-category">Tier 3 • Sovereign Mandate</div>
                <h3 class="wm-tier-title">Multi-Family Office & Dynasty</h3>
                <div class="wm-tier-min-wrap">
                  <span class="wm-tier-min-val">$25M+</span>
                  <span class="wm-tier-min-lbl">Family Capital</span>
                </div>
                <span class="wm-tier-fee-badge">0.30% AUM or Bespoke Retainer</span>
              </div>
              <p class="wm-tier-desc">
                Complete institutional stewardship for ultra-high-net-worth families, enterprise dynasties, and charitable endowments requiring generational firewalls and private foundation governance.
              </p>
              <ul class="wm-tier-features">
                <li><i class="fa-solid fa-circle-check"></i> <span>Everything in Discretionary Private Client</span></li>
                <li><i class="fa-solid fa-circle-check"></i> <span>4-generation dynasty trust & estate tax elimination</span></li>
                <li><i class="fa-solid fa-circle-check"></i> <span>Private foundation & philanthropic trust admin</span></li>
                <li><i class="fa-solid fa-circle-check"></i> <span>Annual multi-generational family governance retreats</span></li>
                <li><i class="fa-solid fa-circle-check"></i> <span>Direct advisory access to Chief Investment Officer (CIO)</span></li>
                <li><i class="fa-solid fa-circle-check"></i> <span>Unlimited concierge legal & tax coordination</span></li>
              </ul>
            </div>
            <a href="#booking" class="wm-btn wm-btn-outline" style="width: 100%; justify-content: center;">
              <span>Inquire for Family Office</span>
              <span class="wm-btn-icon"><i class="fa-solid fa-arrow-right"></i></span>
            </a>
          </div>

        </div>
      </div>
    </section>

    <!-- ==========================================================================
         SECTION 8: Tactical Portfolio Allocation & Alpha Engines (Bento Grid)
         ========================================================================== -->
    <section class="wm-section wm-bg-surface" id="allocation-bento">
      <div class="wm-container">
        <div class="wm-section-header text-center" data-aos="fade-up">
          <div class="wm-tag"><span class="wm-tag-dot"></span>Portfolio Allocation Architecture</div>
          <h2>Institutional Multi-Asset Allocation & Alpha Engines</h2>
          <p class="wm-section-subtitle">A transparent look inside our institutional asset allocation framework engineered for multi-market resilience and upside capture.</p>
        </div>

        <div class="wm-bento-grid">
          
          <!-- Bento Hero Card (Left Column) -->
          <div class="wm-bento-card wm-bento-hero" data-aos="fade-up" data-aos-delay="100">
            <div>
              <div class="wm-bento-hero-header">
                <span class="wm-bento-tag">Flagship Foundation Model</span>
                <h3 class="wm-bento-title">Stackly Core Endowment Framework</h3>
                <p class="wm-bento-desc">
                  Modeled after top sovereign wealth funds, combining liquid global market alpha with illiquid private alternatives to compress volatility while generating sustained cash distributions.
                </p>
              </div>

              <!-- Allocation Progress Bars -->
              <div class="wm-allocation-bars">
                
                <div class="wm-alloc-item">
                  <div class="wm-alloc-labels">
                    <span><i class="fa-solid fa-square" style="color: #195353; margin-right: 6px;"></i> Global Quality Equities & Direct Indexing</span>
                    <strong>40.0%</strong>
                  </div>
                  <div class="wm-alloc-bar-bg">
                    <div class="wm-alloc-bar-fill" style="width: 40%; background: #195353;"></div>
                  </div>
                </div>

                <div class="wm-alloc-item">
                  <div class="wm-alloc-labels">
                    <span><i class="fa-solid fa-square" style="color: #236f6f; margin-right: 6px;"></i> Sovereign & Short-Duration Fixed Income</span>
                    <strong>25.0%</strong>
                  </div>
                  <div class="wm-alloc-bar-bg">
                    <div class="wm-alloc-bar-fill" style="width: 25%; background: #236f6f;"></div>
                  </div>
                </div>

                <div class="wm-alloc-item">
                  <div class="wm-alloc-labels">
                    <span><i class="fa-solid fa-square" style="color: #b0c926; margin-right: 6px;"></i> Private Credit & Direct Real Asset Syndications</span>
                    <strong>15.0%</strong>
                  </div>
                  <div class="wm-alloc-bar-bg">
                    <div class="wm-alloc-bar-fill" style="width: 15%; background: #b0c926;"></div>
                  </div>
                </div>

                <div class="wm-alloc-item">
                  <div class="wm-alloc-labels">
                    <span><i class="fa-solid fa-square" style="color: #021623; margin-right: 6px;"></i> Global Emerging Alpha & Thematic Innovation</span>
                    <strong>12.0%</strong>
                  </div>
                  <div class="wm-alloc-bar-bg">
                    <div class="wm-alloc-bar-fill" style="width: 12%; background: #021623;"></div>
                  </div>
                </div>

                <div class="wm-alloc-item">
                  <div class="wm-alloc-labels">
                    <span><i class="fa-solid fa-square" style="color: #27ae60; margin-right: 6px;"></i> Treasury Yield Sweep & Opportunistic Liquidity</span>
                    <strong>8.0%</strong>
                  </div>
                  <div class="wm-alloc-bar-bg">
                    <div class="wm-alloc-bar-fill" style="width: 8%; background: #27ae60;"></div>
                  </div>
                </div>

              </div>
            </div>

            <div class="wm-bento-stat-banner">
              <div>
                <div style="font-size: 0.75rem; color: var(--wm-body-muted); text-transform: uppercase; font-weight: 700;">Targeted Net Yield</div>
                <div style="font-size: 1.25rem; font-weight: 800; color: var(--wm-primary);">9.4% Annualized</div>
              </div>
              <div>
                <div style="font-size: 0.75rem; color: var(--wm-body-muted); text-transform: uppercase; font-weight: 700;">Historical Drawdown</div>
                <div style="font-size: 1.25rem; font-weight: 800; color: #27ae60;">-42% vs S&P 500</div>
              </div>
              <a href="#booking" class="wm-btn wm-btn-primary" style="padding: 10px 18px; font-size: 0.85rem;">
                <span>View Full Model</span>
              </a>
            </div>
          </div>

          <!-- Bento Subcard 1: Tax-Loss Harvesting Engine -->
          <div class="wm-bento-card" data-aos="fade-up" data-aos-delay="200">
            <div>
              <div class="wm-bento-subcard-icon">
                <i class="fa-solid fa-calculator"></i>
              </div>
              <h4 style="font-size: 1.2rem; font-weight: 700; color: var(--wm-dark); margin-bottom: 8px;">Algorithmic Tax-Loss Engine</h4>
              <p style="font-size: 0.875rem; color: var(--wm-body); line-height: 1.55;">
                Continuous daily algorithmic scanning uncovers fractional market dips, systematically harvesting capital losses to offset ordinary income without deviating from your core factor weightings.
              </p>
            </div>
            <div class="wm-bento-kpi-highlight">
              +1.85% <span style="font-size: 0.8rem; font-weight: 600; color: var(--wm-body-muted); display: block; font-family: var(--wm-font-body);">Net Annualized Tax Alpha Generated</span>
            </div>
          </div>

          <!-- Bento Subcard 2: Downside Tail-Risk Hedging -->
          <div class="wm-bento-card" data-aos="fade-up" data-aos-delay="300">
            <div>
              <div class="wm-bento-subcard-icon">
                <i class="fa-solid fa-shield-halved"></i>
              </div>
              <h4 style="font-size: 1.2rem; font-weight: 700; color: var(--wm-dark); margin-bottom: 8px;">Systematic Tail-Risk Hedging</h4>
              <p style="font-size: 0.875rem; color: var(--wm-body); line-height: 1.55;">
                Downside volatility buffers, index collars, and duration-matched liquidity sweeps engineered to protect generational wealth against severe drawdowns and macro dislocations.
              </p>
            </div>
            <div class="wm-bento-kpi-highlight" style="color: #27ae60;">
              Zero Principal Loss <span style="font-size: 0.8rem; font-weight: 600; color: var(--wm-body-muted); display: block; font-family: var(--wm-font-body);">In 2020 & 2022 Market Corrections</span>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- ==========================================================================
         SECTION 9: Institutional Custody & Security Vault (Split Interactive)
         ========================================================================== -->
    <section class="wm-section" id="custody-vault">
      <div class="wm-container">
        <div class="wm-section-header text-center" data-aos="fade-up">
          <div class="wm-tag"><span class="wm-tag-dot"></span>Safety & Custody Firewall</div>
          <h2>Institutional Custody & Fiduciary Security Vault</h2>
          <p class="wm-section-subtitle">Your assets never sit with Stackly. They remain under your legal ownership at the world's most capitalized institutional custodians.</p>
        </div>

        <div class="wm-vault-split">
          
          <!-- Left: 4 Security Capability Tiles -->
          <div class="wm-vault-tiles-wrap" data-aos="fade-right">
            
            <div class="wm-vault-tile">
              <div class="wm-vault-tile-head">
                <div class="wm-vault-tile-title">
                  <i class="fa-solid fa-building-columns" style="color: var(--wm-primary);"></i>
                  <span>Direct Custody at Charles Schwab & Fidelity</span>
                </div>
                <span class="wm-vault-badge">Segregated Assets</span>
              </div>
              <p class="wm-vault-tile-desc">
                Accounts are registered directly in your legal name or living trust. Stackly maintains limited discretionary trading authority without the ability to withdraw or transfer client capital.
              </p>
            </div>

            <div class="wm-vault-tile">
              <div class="wm-vault-tile-head">
                <div class="wm-vault-tile-title">
                  <i class="fa-solid fa-umbrella" style="color: var(--wm-primary);"></i>
                  <span>SIPC Protection + $150M Excess Policy</span>
                </div>
                <span class="wm-vault-badge">Lloyd's Insured</span>
              </div>
              <p class="wm-vault-tile-desc">
                Securities are protected by SIPC up to $500,000, complemented by custodial excess-SIPC private insurance syndicates at Lloyd's of London providing aggregate coverage up to $150 Million.
              </p>
            </div>

            <div class="wm-vault-tile">
              <div class="wm-vault-tile-head">
                <div class="wm-vault-tile-title">
                  <i class="fa-solid fa-lock" style="color: var(--wm-primary);"></i>
                  <span>256-Bit SSL Data Vault & Biometric 2FA</span>
                </div>
                <span class="wm-vault-badge">SOC-2 Type II</span>
              </div>
              <p class="wm-vault-tile-desc">
                Client communications, quarterly tax filings, and trade orders pass through military-grade AES-256 encrypted protocols backed by hardware WebAuthn and continuous third-party vulnerability audits.
              </p>
            </div>

            <div class="wm-vault-tile">
              <div class="wm-vault-tile-head">
                <div class="wm-vault-tile-title">
                  <i class="fa-solid fa-scale-balanced" style="color: var(--wm-primary);"></i>
                  <span>100% Fee-Only Fiduciary Legal Standard</span>
                </div>
                <span class="wm-vault-badge">Zero Kickbacks</span>
              </div>
              <p class="wm-vault-tile-desc">
                Governed by the Investment Advisers Act of 1940. We accept zero broker commissions, zero 12b-1 kickbacks, and zero proprietary fund incentives—ensuring complete objective alignment.
              </p>
            </div>

          </div>

          <!-- Right: Dark Terminal Security Card -->
          <div class="wm-terminal-card" data-aos="fade-left">
            <div class="wm-terminal-header">
              <div>
                <div style="font-size: 0.72rem; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 0.5px;">Institutional Connection</div>
                <div style="font-size: 1.15rem; font-weight: 700; color: #ffffff;">Fiduciary Infrastructure Hub</div>
              </div>
              <div class="wm-terminal-status-ping">
                <span class="wm-terminal-pulse"></span>
                <span>Active Link</span>
              </div>
            </div>

            <div class="wm-terminal-rows">
              <div class="wm-terminal-row">
                <span class="wm-term-lbl">Primary Custody Hub</span>
                <span class="wm-term-val">Charles Schwab Institutional STP</span>
              </div>
              <div class="wm-terminal-row">
                <span class="wm-term-lbl">Secondary Clearing Vault</span>
                <span class="wm-term-val">Fidelity Wealth Clearing Services</span>
              </div>
              <div class="wm-terminal-row">
                <span class="wm-term-lbl">Custodial Account Tier</span>
                <span class="wm-term-val" style="color: var(--wm-secondary);">Tier 3 Accredited Institutional</span>
              </div>
              <div class="wm-terminal-row">
                <span class="wm-term-lbl">Aggregate Asset Coverage</span>
                <span class="wm-term-val">$150,000,000.00 USD</span>
              </div>
              <div class="wm-terminal-row">
                <span class="wm-term-lbl">Encryption Architecture</span>
                <span class="wm-term-val">AES-256-GCM + Hardware FIDO2</span>
              </div>
              <div class="wm-terminal-row">
                <span class="wm-term-lbl">Fiduciary Audit Standing</span>
                <span class="wm-term-val" style="color: #27ae60;"><i class="fa-solid fa-check"></i> 100% Clean SEC Mandate</span>
              </div>
            </div>

            <div class="wm-terminal-badges-grid">
              <div class="wm-term-badge-item">
                <i class="fa-solid fa-shield-halved" style="color: var(--wm-secondary);"></i>
                <span>SIPC Custodial Protection</span>
              </div>
              <div class="wm-term-badge-item">
                <i class="fa-solid fa-file-contract" style="color: var(--wm-secondary);"></i>
                <span>100% Fee-Only Fiduciary</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- ==========================================================================
         SECTION 10: Private Wealth Transformation Case Studies (Alternating Cards)
         ========================================================================== -->
    <section class="wm-section wm-bg-surface" id="case-studies">
      <div class="wm-container">
        <div class="wm-section-header text-center" data-aos="fade-up">
          <div class="wm-tag"><span class="wm-tag-dot"></span>Fiduciary Impact in Practice</div>
          <h2>Client Transformations & Fiduciary Case Studies</h2>
          <p class="wm-section-subtitle">Real forensic case studies demonstrating how our integrated wealth architecture protects capital, optimizes taxes, and preserves family legacies.</p>
        </div>

        <div class="wm-cases-list">
          
          <!-- Case Study 1: Founder Liquidity Event -->
          <div class="wm-case-card" data-aos="fade-up">
            <div class="wm-case-image-col">
              <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80" alt="Tech Founder Liquidity Advisory">
              <span class="wm-case-tag-overlay">Founder Exit • $42M Transaction</span>
            </div>
            <div class="wm-case-content-col">
              <div>
                <h3 class="wm-case-header-title">The Silicon Valley Enterprise SaaS Acquisition</h3>
                <div class="wm-case-client-meta">Client Profile: 42-Year-Old Founder & Chief Technology Officer, Austin TX</div>
                
                <div class="wm-case-section-block">
                  <div class="wm-case-sub-lbl">The Challenge</div>
                  <p class="wm-case-desc">
                    Approaching a full cash and stock acquisition with $38M in unrealized capital gains. Traditional wirehouse advice offered zero pre-transaction tax structuring, risking over $14M in tax drag.
                  </p>
                </div>

                <div class="wm-case-section-block">
                  <div class="wm-case-sub-lbl">The Stackly Fiduciary Blueprint</div>
                  <p class="wm-case-desc">
                    Orchestrated a pre-sale Charitable Remainder Unitrust (CRUT) paired with an installment Delaware Statutory Trust and custom direct-indexed equity replacement portfolio with daily loss harvesting.
                  </p>
                </div>
              </div>

              <!-- Measured Impact KPIs -->
              <div class="wm-case-metrics-grid">
                <div class="wm-case-metric-item">
                  <div class="wm-case-metric-val">$6.4M</div>
                  <div class="wm-case-metric-lbl">Capital Gains Tax Legally Eliminated</div>
                </div>
                <div class="wm-case-metric-item">
                  <div class="wm-case-metric-val">100%</div>
                  <div class="wm-case-metric-lbl">Single-Stock Concentration Removed</div>
                </div>
                <div class="wm-case-metric-item">
                  <div class="wm-case-metric-val">$1.8M/yr</div>
                  <div class="wm-case-metric-lbl">Tax-Favored Lifetime Cash Distributions</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Case Study 2: Manufacturing Dynasty Succession (Reversed Layout) -->
          <div class="wm-case-card reverse" data-aos="fade-up">
            <div class="wm-case-image-col">
              <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80" alt="Family Dynasty Office">
              <span class="wm-case-tag-overlay">Estate Succession • $85M Enterprise</span>
            </div>
            <div class="wm-case-content-col">
              <div>
                <h3 class="wm-case-header-title">The Multi-Generational Industrial Legacy</h3>
                <div class="wm-case-client-meta">Client Profile: 3rd-Generation Manufacturing Family with 14 Heirs Across 3 Branches</div>
                
                <div class="wm-case-section-block">
                  <div class="wm-case-sub-lbl">The Challenge</div>
                  <p class="wm-case-desc">
                    Looming 40% federal estate tax liability upon patriarch passing, compounded by conflicting investment objectives between senior dividend-dependent elders and younger entrepreneurial heirs.
                  </p>
                </div>

                <div class="wm-case-section-block">
                  <div class="wm-case-sub-lbl">The Stackly Fiduciary Blueprint</div>
                  <p class="wm-case-desc">
                    Engineered an Irrevocable Dynasty Trust operating in Delaware with a formal Family Constitution, segregating capital into a Conservative Yield Bucket and Next-Gen Co-Investment Fund.
                  </p>
                </div>
              </div>

              <!-- Measured Impact KPIs -->
              <div class="wm-case-metrics-grid">
                <div class="wm-case-metric-item">
                  <div class="wm-case-metric-val">$22.0M</div>
                  <div class="wm-case-metric-lbl">Federal Estate Taxes Shielded</div>
                </div>
                <div class="wm-case-metric-item">
                  <div class="wm-case-metric-val">14 Heirs</div>
                  <div class="wm-case-metric-lbl">Unified Under Fiduciary Governance Charter</div>
                </div>
                <div class="wm-case-metric-item">
                  <div class="wm-case-metric-val">4 Gen.</div>
                  <div class="wm-case-metric-lbl">Perpetual Wealth Firewall Protected</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Case Study 3: Specialist Surgical Center Treasury -->
          <div class="wm-case-card" data-aos="fade-up">
            <div class="wm-case-image-col">
              <img src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80" alt="Specialist Medical Treasury">
              <span class="wm-case-tag-overlay">Treasury & Pension • $28M Capital</span>
            </div>
            <div class="wm-case-content-col">
              <div>
                <h3 class="wm-case-header-title">The Specialist Surgical Partnership</h3>
                <div class="wm-case-client-meta">Client Profile: 12-Partner Orthopedic Surgical Center with High Annual 1099 Pass-Through</div>
                
                <div class="wm-case-section-block">
                  <div class="wm-case-sub-lbl">The Challenge</div>
                  <p class="wm-case-desc">
                    Partners paying maximum marginal tax rates while cash reserves sat idle in commercial bank sweep accounts earning sub-1%, drained by 1.45% mutual fund expense ratios.
                  </p>
                </div>

                <div class="wm-case-section-block">
                  <div class="wm-case-sub-lbl">The Stackly Fiduciary Blueprint</div>
                  <p class="wm-case-desc">
                    Integrated a Cash Balance Defined Benefit Pension Plan with low-cost direct indexing, automated high-yield Treasury ladders, and zero-commission institutional custodial fee pricing.
                  </p>
                </div>
              </div>

              <!-- Measured Impact KPIs -->
              <div class="wm-case-metrics-grid">
                <div class="wm-case-metric-item">
                  <div class="wm-case-metric-val">$380K/yr</div>
                  <div class="wm-case-metric-lbl">Direct Tax Deduction Achieved per Partner</div>
                </div>
                <div class="wm-case-metric-item">
                  <div class="wm-case-metric-val">1.15%</div>
                  <div class="wm-case-metric-lbl">Direct Annual Fee Reduction Captured</div>
                </div>
                <div class="wm-case-metric-item">
                  <div class="wm-case-metric-val">+4.95%</div>
                  <div class="wm-case-metric-lbl">Net Annualized Treasury Yield Generated</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- ==========================================================================
         SECTION 11: Schedule a Diagnostic Wealth Review (Consultation Form)
         ========================================================================== -->`;

const normalizedContent = content.replace(/\r\n/g, '\n');
const normalizedMarker = targetMarker.replace(/\r\n/g, '\n');

if (normalizedContent.includes(normalizedMarker)) {
  const updated = normalizedContent.replace(normalizedMarker, newSectionsHTML.replace(/\r\n/g, '\n'));
  fs.writeFileSync(servicesPath, updated.replace(/\n/g, '\r\n'), 'utf8');
  console.log('Successfully inserted 4 new unique sections into services.html!');
} else {
  console.error('Target marker not found in services.html!');
  process.exit(1);
}
