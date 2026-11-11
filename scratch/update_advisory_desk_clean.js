const fs = require('fs');

let html = fs.readFileSync('user-dashboard.html', 'utf8');

// Find start and end of Tab 3
const oldTabStartMarker = '<!-- ====================================================================\n           TAB 3: ADVISORY DESK';
const tab4StartMarker = '<!-- ====================================================================\n           TAB 4: FINANCIAL PRODUCTS';

const idxStart = html.indexOf(oldTabStartMarker);
const idxEnd = html.indexOf(tab4StartMarker);

if (idxStart === -1 || idxEnd === -1) {
  console.error('Failed to locate Tab 3 boundary markers!');
  process.exit(1);
}

const newAdvisorySection = `<!-- ====================================================================
           TAB 3: ADVISORY DESK (Professional Wealth Management Advisory Services)
           ==================================================================== -->
      <section id="tab-user-advisory" class="wm-tab-view">
        <div class="wm-dash-title-bar">
          <div>
            <h1 class="wm-dash-page-title">Private Wealth Advisory Desk</h1>
            <p class="wm-dash-page-subtitle">Dedicated fiduciary wealth advisors, strategic portfolio recommendations, estate counsel, and scheduled consultations.</p>
          </div>
          <div style="display:flex; gap:10px; flex-wrap:wrap;">
            <button class="wm-btn wm-btn-secondary" style="padding:10px 18px; font-size:0.85rem;" onclick="openConsultationBookingModal()">
              <i class="fa-solid fa-calendar-plus"></i> Book Advisory Consultation
            </button>
            <button class="wm-btn wm-btn-primary" style="padding:10px 18px; font-size:0.85rem;" onclick="triggerToast('Comprehensive Q4 Fiduciary Portfolio & Tax Review requested. Report will be delivered to your document vault within 24 hours.')">
              <i class="fa-solid fa-file-signature"></i> Request Fiduciary Report
            </button>
          </div>
        </div>

        <!-- 4 Advisory Governance KPI Cards -->
        <div class="wm-kpi-grid" style="grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); margin-bottom:28px;">
          <div class="wm-kpi-card">
            <div class="wm-kpi-top">
              <div class="wm-kpi-icon"><i class="fa-solid fa-user-tie"></i></div>
              <span class="wm-kpi-trend wm-trend-up">Assigned</span>
            </div>
            <div class="wm-kpi-val" style="font-size:1.35rem;">Marcus Vance, CFA</div>
            <div class="wm-kpi-lbl">Lead Fiduciary Wealth Architect</div>
          </div>

          <div class="wm-kpi-card">
            <div class="wm-kpi-top">
              <div class="wm-kpi-icon"><i class="fa-solid fa-scale-balanced"></i></div>
              <span class="wm-kpi-trend wm-trend-up">SEC Regulated</span>
            </div>
            <div class="wm-kpi-val" style="font-size:1.35rem;">Discretionary Mandate</div>
            <div class="wm-kpi-lbl">Form ADV Part 2A Certified</div>
          </div>

          <div class="wm-kpi-card">
            <div class="wm-kpi-top">
              <div class="wm-kpi-icon"><i class="fa-solid fa-shield-halved"></i></div>
              <span class="wm-kpi-trend wm-trend-up">Fee-Only</span>
            </div>
            <div class="wm-kpi-val" style="font-size:1.35rem;">0.65% Flat AUM</div>
            <div class="wm-kpi-lbl">Zero Commissions / Fiduciary Oath</div>
          </div>

          <div class="wm-kpi-card">
            <div class="wm-kpi-top">
              <div class="wm-kpi-icon"><i class="fa-solid fa-calendar-check"></i></div>
              <span class="wm-kpi-trend wm-trend-up">Upcoming</span>
            </div>
            <div class="wm-kpi-val" style="font-size:1.35rem;">Nov 18, 2026</div>
            <div class="wm-kpi-lbl">Next Scheduled Quarterly Review</div>
          </div>
        </div>

        <!-- Dedicated Advisory Committee Roster (4 Specialist Cards) -->
        <div style="margin-bottom:30px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
            <div>
              <h2 style="font-size:1.2rem; font-weight:700; color:var(--wm-dark); margin-bottom:2px;">Your Dedicated Fiduciary Committee</h2>
              <p style="font-size:0.825rem; color:var(--wm-body-muted);">Multi-disciplinary wealth management architects providing customized portfolio, estate, tax, and custody governance.</p>
            </div>
          </div>

          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:20px;">
            
            <!-- Specialist 1: Marcus Vance -->
            <div class="wm-kpi-card" style="border-top: 4px solid var(--wm-primary);">
              <div style="display:flex; align-items:center; gap:14px; margin-bottom:14px;">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80" alt="Marcus Vance" style="width:54px; height:54px; border-radius:50%; object-fit:cover; border:2px solid var(--wm-primary);">
                <div>
                  <div style="font-weight:700; color:var(--wm-dark); font-size:1.05rem;">Marcus Vance, CFA</div>
                  <div style="font-size:0.75rem; color:var(--wm-primary); font-weight:700;">Chief Investment Officer</div>
                  <div style="font-size:0.72rem; color:var(--wm-body-muted);">18+ Years Institutional Advisory</div>
                </div>
              </div>
              <p style="font-size:0.825rem; color:var(--wm-body); line-height:1.5; margin-bottom:14px;">
                Responsible for holistic asset allocation, alpha generation, equity strategies, and macroeconomic portfolio positioning.
              </p>
              <div style="font-size:0.8rem; color:var(--wm-body-muted); display:flex; flex-direction:column; gap:6px; margin-bottom:16px; border-top:1px solid var(--wm-border-light); padding-top:12px;">
                <div><i class="fa-solid fa-envelope" style="width:16px; color:var(--wm-primary);"></i> marcus.v@stackly.com</div>
                <div><i class="fa-solid fa-phone" style="width:16px; color:var(--wm-primary);"></i> +1 (800) 555-0199 ext. 402</div>
              </div>
              <div style="display:flex; gap:8px;">
                <button class="wm-btn wm-btn-primary" style="flex:1; padding:7px; font-size:0.8rem;" onclick="openDetailsModal('Marcus Vance, CFA — Lead Fiduciary Bio', 'Role: Chief Investment Officer & Fiduciary Architect<br>Experience: 18+ Years (Former Senior Strategist at Goldman Sachs Private Wealth)<br>Credentials: CFA Charterholder, Master of Finance (MIT Sloan)<br>Managed Client AUM: $2.84 Billion USD<br>Fiduciary Duty: Complete legal duty of care and loyalty.<br><br>Direct Office: Suite 400, Financial District / Salem Advisory Center.<br>Direct Line: +1 (800) 555-0199 ext 402')">
                  <i class="fa-solid fa-id-card"></i> View Bio
                </button>
                <button class="wm-btn wm-btn-outline" style="padding:7px 12px; font-size:0.8rem;" title="Schedule Consultation" onclick="triggerToast('Consultation request sent to Marcus Vance, CFA.')">
                  <i class="fa-solid fa-calendar-check"></i>
                </button>
              </div>
            </div>

            <!-- Specialist 2: Sarah Jenkins -->
            <div class="wm-kpi-card" style="border-top: 4px solid #236f6f;">
              <div style="display:flex; align-items:center; gap:14px; margin-bottom:14px;">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80" alt="Sarah Jenkins" style="width:54px; height:54px; border-radius:50%; object-fit:cover; border:2px solid #236f6f;">
                <div>
                  <div style="font-weight:700; color:var(--wm-dark); font-size:1.05rem;">Sarah Jenkins, JD</div>
                  <div style="font-size:0.75rem; color:var(--wm-primary); font-weight:700;">Senior Estate & Trust Counsel</div>
                  <div style="font-size:0.72rem; color:var(--wm-body-muted);">15+ Years Estate Jurisprudence</div>
                </div>
              </div>
              <p style="font-size:0.825rem; color:var(--wm-body); line-height:1.5; margin-bottom:14px;">
                Oversees multi-generational trust structures, probate avoidance, dynasty planning, and durable legal powers of attorney.
              </p>
              <div style="font-size:0.8rem; color:var(--wm-body-muted); display:flex; flex-direction:column; gap:6px; margin-bottom:16px; border-top:1px solid var(--wm-border-light); padding-top:12px;">
                <div><i class="fa-solid fa-envelope" style="width:16px; color:var(--wm-primary);"></i> sarah.j@stackly.com</div>
                <div><i class="fa-solid fa-phone" style="width:16px; color:var(--wm-primary);"></i> +1 (800) 555-0199 ext. 418</div>
              </div>
              <div style="display:flex; gap:8px;">
                <button class="wm-btn wm-btn-primary" style="flex:1; padding:7px; font-size:0.8rem;" onclick="openDetailsModal('Sarah Jenkins, JD — Estate Counsel Bio', 'Role: Senior Estate & Family Trust Counsel<br>Experience: 15+ Years Trust & Estate Practice<br>Credentials: Juris Doctor (Harvard Law School), Member American College of Trust and Estate Counsel<br>Focus: Living Trusts, Generation-Skipping Transfer Trusts, Asset Protection<br><br>Direct Office: Legal Advisory Annex.<br>Direct Line: +1 (800) 555-0199 ext 418')">
                  <i class="fa-solid fa-id-card"></i> View Bio
                </button>
                <button class="wm-btn wm-btn-outline" style="padding:7px 12px; font-size:0.8rem;" title="Schedule Consultation" onclick="triggerToast('Estate consultation request sent to Sarah Jenkins, JD.')">
                  <i class="fa-solid fa-calendar-check"></i>
                </button>
              </div>
            </div>

            <!-- Specialist 3: David Sterling -->
            <div class="wm-kpi-card" style="border-top: 4px solid #27ae60;">
              <div style="display:flex; align-items:center; gap:14px; margin-bottom:14px;">
                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=120&q=80" alt="David Sterling" style="width:54px; height:54px; border-radius:50%; object-fit:cover; border:2px solid #27ae60;">
                <div>
                  <div style="font-weight:700; color:var(--wm-dark); font-size:1.05rem;">David Sterling, CPA</div>
                  <div style="font-size:0.75rem; color:var(--wm-primary); font-weight:700;">Tax Optimization Strategist</div>
                  <div style="font-size:0.72rem; color:var(--wm-body-muted);">16+ Years Wealth Taxation</div>
                </div>
              </div>
              <p style="font-size:0.825rem; color:var(--wm-body); line-height:1.5; margin-bottom:14px;">
                Directs automated tax-loss harvesting algorithms, capital gains reduction, cross-border treaty credits, and annual IRS filings.
              </p>
              <div style="font-size:0.8rem; color:var(--wm-body-muted); display:flex; flex-direction:column; gap:6px; margin-bottom:16px; border-top:1px solid var(--wm-border-light); padding-top:12px;">
                <div><i class="fa-solid fa-envelope" style="width:16px; color:var(--wm-primary);"></i> david.s@stackly.com</div>
                <div><i class="fa-solid fa-phone" style="width:16px; color:var(--wm-primary);"></i> +1 (800) 555-0199 ext. 425</div>
              </div>
              <div style="display:flex; gap:8px;">
                <button class="wm-btn wm-btn-primary" style="flex:1; padding:7px; font-size:0.8rem;" onclick="openDetailsModal('David Sterling, CPA — Tax Strategist Bio', 'Role: Senior Wealth Tax Strategist<br>Experience: 16+ Years (Former Tax Director at Ernst & Young Private Client Services)<br>Credentials: Certified Public Accountant (CPA), Master of Science in Taxation (MST)<br>Specialty: Systematic Tax-Loss Harvesting, Qualified Opportunity Zones, Foreign Tax Credits<br><br>Direct Office: Tax Compliance & Strategy Suite.<br>Direct Line: +1 (800) 555-0199 ext 425')">
                  <i class="fa-solid fa-id-card"></i> View Bio
                </button>
                <button class="wm-btn wm-btn-outline" style="padding:7px 12px; font-size:0.8rem;" title="Schedule Consultation" onclick="triggerToast('Tax strategy consultation request sent to David Sterling, CPA.')">
                  <i class="fa-solid fa-calendar-check"></i>
                </button>
              </div>
            </div>

            <!-- Specialist 4: Sophia Laurent -->
            <div class="wm-kpi-card" style="border-top: 4px solid #f39c12;">
              <div style="display:flex; align-items:center; gap:14px; margin-bottom:14px;">
                <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80" alt="Sophia Laurent" style="width:54px; height:54px; border-radius:50%; object-fit:cover; border:2px solid #f39c12;">
                <div>
                  <div style="font-weight:700; color:var(--wm-dark); font-size:1.05rem;">Sophia Laurent</div>
                  <div style="font-size:0.75rem; color:var(--wm-primary); font-weight:700;">Charles Schwab Custody Officer</div>
                  <div style="font-size:0.72rem; color:var(--wm-body-muted);">Institutional Clearing Liaison</div>
                </div>
              </div>
              <p style="font-size:0.825rem; color:var(--wm-body); line-height:1.5; margin-bottom:14px;">
                Oversees independent segregated custody account #SCH-7729-19, wire settlements, securities clearing, and SIPC asset insurance.
              </p>
              <div style="font-size:0.8rem; color:var(--wm-body-muted); display:flex; flex-direction:column; gap:6px; margin-bottom:16px; border-top:1px solid var(--wm-border-light); padding-top:12px;">
                <div><i class="fa-solid fa-envelope" style="width:16px; color:var(--wm-primary);"></i> custody@stackly.com</div>
                <div><i class="fa-solid fa-phone" style="width:16px; color:var(--wm-primary);"></i> +1 (800) 555-0199 ext. 400</div>
              </div>
              <div style="display:flex; gap:8px;">
                <button class="wm-btn wm-btn-primary" style="flex:1; padding:7px; font-size:0.8rem;" onclick="openDetailsModal('Sophia Laurent — Custody Liaison Bio', 'Role: Institutional Custodial Relations Officer<br>Affiliation: Charles Schwab & Co. Institutional Services<br>Credentials: Series 7, 63 Licensed Custody Specialist<br>Direct Oversight: Account #SCH-7729-19<br>Asset Protection: SIPC insured to $500,000 + $150 Million Excess Protection Policy<br><br>Institutional Custody Hotline: +1 (800) 555-0199 ext 400')">
                  <i class="fa-solid fa-id-card"></i> View Bio
                </button>
                <button class="wm-btn wm-btn-outline" style="padding:7px 12px; font-size:0.8rem;" title="Schedule Consultation" onclick="triggerToast('Custody inquiry routed to Sophia Laurent.')">
                  <i class="fa-solid fa-calendar-check"></i>
                </button>
              </div>
            </div>

          </div>
        </div>

        <!-- Strategic Advisory Recommendations & Action Items Table -->
        <div class="wm-table-card">
          <div class="wm-table-header">
            <div>
              <div style="font-size:1.1rem; font-weight:700; color:var(--wm-dark);">Strategic Portfolio Recommendations & Fiduciary Action Items</div>
              <div style="font-size:0.8rem; color:var(--wm-body-muted);">Custom advisory directives formulated specifically for Anandha Krishnan's $1.48M portfolio</div>
            </div>
            <span class="wm-status-pill wm-pill-active">2 Pending Action</span>
          </div>

          <div style="overflow-x:auto;">
            <table class="wm-dash-table">
              <thead>
                <tr>
                  <th>Recommendation Directive</th>
                  <th>Lead Strategist</th>
                  <th>Expected Impact</th>
                  <th>Action Horizon</th>
                  <th>Governance Status</th>
                  <th>Fiduciary Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>Deploy $50K Cash into Sovereign Treasury Plus</strong>
                    <div style="font-size:0.75rem; color:var(--wm-body-muted);">Rebalance $50,000 from Schwab cash sweep (5.1%) into 7.4% locked APY sovereign notes before rate cut.</div>
                  </td>
                  <td>Marcus Vance, CFA</td>
                  <td><strong style="color:#27ae60;">+$3,700 / Year Yield</strong></td>
                  <td>Immediate (T+1)</td>
                  <td><span class="wm-status-pill wm-pill-pending">Pending Authorization</span></td>
                  <td>
                    <button class="wm-btn wm-btn-primary" style="padding:6px 14px; font-size:0.8rem;" onclick="openDetailsModal('Authorization: Capital Deployment', 'Recommendation Directive: Allocate $50,000.00 USD to Sovereign Treasury Yield Plus<br>Custody Account: Charles Schwab #SCH-7729-19<br>Source: Available Cash Sweep ($94,500 available)<br>Target APY: 7.40% Fixed Semi-Annual<br>Fiduciary Rationale: Locks in yield premium ahead of anticipated Federal Reserve monetary easing.<br><br>Status: Execution voucher dispatched to Marcus Vance, CFA.')">
                      <i class="fa-solid fa-check"></i> Authorize
                    </button>
                  </td>
                </tr>

                <tr>
                  <td>
                    <strong>Execute Q4 Systematic Tax-Loss Harvesting</strong>
                    <div style="font-size:0.75rem; color:var(--wm-body-muted);">Harvest $18,400 in selective capital losses across secondary equity lots to offset realized gains for 2026.</div>
                  </td>
                  <td>David Sterling, CPA</td>
                  <td><strong style="color:var(--wm-primary);">Saves ~$4,600 Taxes</strong></td>
                  <td>Before Dec 15, 2026</td>
                  <td><span class="wm-status-pill wm-pill-pending">Recommended</span></td>
                  <td>
                    <button class="wm-btn wm-btn-primary" style="padding:6px 14px; font-size:0.8rem;" onclick="triggerToast('Tax-loss harvesting strategy signed and transmitted to David Sterling, CPA for Schwab execution.')">
                      <i class="fa-solid fa-file-signature"></i> Authorize
                    </button>
                  </td>
                </tr>

                <tr>
                  <td>
                    <strong>Living Trust Beneficiary Schedule Audit</strong>
                    <div style="font-size:0.75rem; color:var(--wm-body-muted);">Verify secondary and contingent beneficiary clauses on Schwab account matching 2026 Living Trust.</div>
                  </td>
                  <td>Sarah Jenkins, JD</td>
                  <td><strong>100% Probate Shield</strong></td>
                  <td>Annual Review</td>
                  <td><span class="wm-status-pill wm-pill-completed">Completed & Filed</span></td>
                  <td>
                    <button class="wm-btn wm-btn-outline" style="padding:6px 14px; font-size:0.8rem;" onclick="triggerToast('Verified Living Trust Beneficiary Schedule downloaded.')">
                      <i class="fa-solid fa-file-pdf"></i> View Schedule
                    </button>
                  </td>
                </tr>

                <tr>
                  <td>
                    <strong>Quarterly Risk Profile Calibration (Score 82)</strong>
                    <div style="font-size:0.75rem; color:var(--wm-body-muted);">Annual stress-test reconfirmation: 40% Equities, 25% Fixed Income, 15% Real Assets, 12% International, 8% Cash.</div>
                  </td>
                  <td>Investment Committee</td>
                  <td><strong>Target Balanced</strong></td>
                  <td>Completed Q3</td>
                  <td><span class="wm-status-pill wm-pill-completed">Compliant</span></td>
                  <td>
                    <button class="wm-btn wm-btn-outline" style="padding:6px 14px; font-size:0.8rem;" onclick="openDetailsModal('Risk Calibration Mandate', 'Client Mandate: Moderate Growth with Capital Preservation<br>Risk Score: 82 / 100<br>Maximum Tolerated Drawdown: -8.0%<br>Asset Rebalancing Bands: +/- 3.0% trigger<br>Custodial Verification: Charles Schwab Institutional Compliant')">
                      <i class="fa-solid fa-eye"></i> View Audit
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Consultations Calendar & Advisory Intelligence Grid -->
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:24px; margin-bottom:30px;">
          
          <!-- Upcoming Advisory Consultations Card -->
          <div class="wm-chart-card">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
              <div style="font-weight:700; color:var(--wm-dark); font-size:1.05rem;">
                <i class="fa-solid fa-calendar-days" style="color:var(--wm-primary); margin-right:8px;"></i> Scheduled Consultations
              </div>
              <button class="wm-btn wm-btn-outline" style="padding:5px 12px; font-size:0.75rem;" onclick="openConsultationBookingModal()">
                <i class="fa-solid fa-plus"></i> Schedule New
              </button>
            </div>

            <div style="display:flex; flex-direction:column; gap:14px;">
              
              <!-- Consultation 1 -->
              <div style="background:var(--wm-surface); padding:16px; border-radius:var(--wm-radius-md); border-left:4px solid var(--wm-primary);">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:6px;">
                  <div>
                    <strong style="color:var(--wm-dark); font-size:0.95rem;">Q4 Comprehensive Wealth & Tax Review</strong>
                    <div style="font-size:0.78rem; color:var(--wm-primary); font-weight:600;">
                      <i class="fa-solid fa-clock"></i> Nov 18, 2026 • 2:00 PM – 3:00 PM EST
                    </div>
                  </div>
                  <span class="wm-status-pill wm-pill-completed">Confirmed</span>
                </div>
                <div style="font-size:0.8rem; color:var(--wm-body); margin-bottom:12px;">
                  Advisors: Marcus Vance, CFA & David Sterling, CPA • Format: Encrypted Video Session
                </div>
                <div style="display:flex; gap:8px;">
                  <button class="wm-btn wm-btn-outline" style="padding:5px 12px; font-size:0.75rem;" onclick="triggerToast('Calendar invitation (.ics) downloaded for Nov 18 review.')">
                    <i class="fa-solid fa-calendar-plus"></i> Add to Calendar
                  </button>
                  <button class="wm-btn wm-btn-outline" style="padding:5px 12px; font-size:0.75rem;" onclick="triggerToast('Reschedule request submitted to Marcus Vance.')">
                    <i class="fa-solid fa-arrows-rotate"></i> Reschedule
                  </button>
                </div>
              </div>

              <!-- Consultation 2 -->
              <div style="background:var(--wm-surface); padding:16px; border-radius:var(--wm-radius-md); border-left:4px solid #236f6f;">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:6px;">
                  <div>
                    <strong style="color:var(--wm-dark); font-size:0.95rem;">Annual Estate & Dynasty Trust Review</strong>
                    <div style="font-size:0.78rem; color:var(--wm-primary); font-weight:600;">
                      <i class="fa-solid fa-clock"></i> Dec 12, 2026 • 10:30 AM – 11:30 AM EST
                    </div>
                  </div>
                  <span class="wm-status-pill wm-pill-active">Scheduled</span>
                </div>
                <div style="font-size:0.8rem; color:var(--wm-body); margin-bottom:12px;">
                  Advisor: Sarah Jenkins, JD • Format: In-Person Consultation / Salem Advisory Suite
                </div>
                <div style="display:flex; gap:8px;">
                  <button class="wm-btn wm-btn-outline" style="padding:5px 12px; font-size:0.75rem;" onclick="triggerToast('Calendar invitation (.ics) downloaded for Dec 12 review.')">
                    <i class="fa-solid fa-calendar-plus"></i> Add to Calendar
                  </button>
                  <button class="wm-btn wm-btn-outline" style="padding:5px 12px; font-size:0.75rem;" onclick="triggerToast('Reschedule request submitted to Sarah Jenkins.')">
                    <i class="fa-solid fa-arrows-rotate"></i> Reschedule
                  </button>
                </div>
              </div>

            </div>
          </div>

          <!-- Institutional Research & Intelligence Briefings -->
          <div class="wm-chart-card">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
              <div style="font-weight:700; color:var(--wm-dark); font-size:1.05rem;">
                <i class="fa-solid fa-newspaper" style="color:var(--wm-primary); margin-right:8px;"></i> Institutional Advisory Briefings
              </div>
              <span style="font-size:0.75rem; color:var(--wm-body-muted);">Private Client Access</span>
            </div>

            <div style="display:flex; flex-direction:column; gap:12px;">
              
              <!-- Briefing 1 -->
              <div style="display:flex; justify-content:space-between; align-items:center; padding:12px 14px; background:var(--wm-surface); border-radius:var(--wm-radius-sm);">
                <div style="display:flex; align-items:center; gap:12px;">
                  <i class="fa-solid fa-file-pdf" style="color:#c0392b; font-size:1.3rem;"></i>
                  <div>
                    <strong style="color:var(--wm-dark); font-size:0.85rem;">Macroeconomic Outlook Q4 2026: Sovereign Debt & AI Infrastructure.pdf</strong>
                    <div style="font-size:0.72rem; color:var(--wm-body-muted);">Stackly Investment Committee • 14 Pages</div>
                  </div>
                </div>
                <button class="wm-btn wm-btn-outline" style="padding:5px 12px; font-size:0.75rem;" onclick="triggerToast('Downloading Q4 2026 Macroeconomic Outlook...')">
                  <i class="fa-solid fa-download"></i> Read
                </button>
              </div>

              <!-- Briefing 2 -->
              <div style="display:flex; justify-content:space-between; align-items:center; padding:12px 14px; background:var(--wm-surface); border-radius:var(--wm-radius-sm);">
                <div style="display:flex; align-items:center; gap:12px;">
                  <i class="fa-solid fa-file-pdf" style="color:#c0392b; font-size:1.3rem;"></i>
                  <div>
                    <strong style="color:var(--wm-dark); font-size:0.85rem;">Systematic Tax-Loss Harvesting Guide: Capital Shielding Strategy.pdf</strong>
                    <div style="font-size:0.72rem; color:var(--wm-body-muted);">David Sterling, CPA • 8 Pages</div>
                  </div>
                </div>
                <button class="wm-btn wm-btn-outline" style="padding:5px 12px; font-size:0.75rem;" onclick="triggerToast('Downloading Tax Loss Harvesting Guide...')">
                  <i class="fa-solid fa-download"></i> Read
                </button>
              </div>

              <!-- Briefing 3 -->
              <div style="display:flex; justify-content:space-between; align-items:center; padding:12px 14px; background:var(--wm-surface); border-radius:var(--wm-radius-sm);">
                <div style="display:flex; align-items:center; gap:12px;">
                  <i class="fa-solid fa-file-shield" style="color:var(--wm-primary); font-size:1.3rem;"></i>
                  <div>
                    <strong style="color:var(--wm-dark); font-size:0.85rem;">Fiduciary Mandate & Custody Protection Whitepaper 2026.pdf</strong>
                    <div style="font-size:0.72rem; color:var(--wm-body-muted);">Stackly Fiduciary Committee • 10 Pages</div>
                  </div>
                </div>
                <button class="wm-btn wm-btn-outline" style="padding:5px 12px; font-size:0.75rem;" onclick="triggerToast('Downloading Fiduciary Protection Whitepaper...')">
                  <i class="fa-solid fa-download"></i> Read
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>\n\n      `;

html = html.substring(0, idxStart) + newAdvisorySection + html.substring(idxEnd);
console.log('Replaced Tab 3 with comprehensive message-free Advisory Desk section.');

// Also add consultation booking modal helper if not present
if (!html.includes('function openConsultationBookingModal()')) {
  const modalHelper = `
    // --- Consultation Booking Modal Helper ---
    function openConsultationBookingModal() {
      const modalContent = '<strong>Client:</strong> Anandha Krishnan (#STK-8849201)<br>' +
        '<strong>Available Advisors:</strong> Marcus Vance (CIO), Sarah Jenkins (Legal), David Sterling (Tax)<br><br>' +
        '<strong>Select Consultation Topic:</strong><br>' +
        '• Q4 Portfolio Rebalance & Capital Deployment<br>' +
        '• Year-End Systematic Tax-Loss Harvesting<br>' +
        '• Living Trust & Estate Beneficiary Review<br><br>' +
        '<strong>Preferred Session Format:</strong> Secure Video Conference / Salem Advisory Suite<br><br>' +
        '<span style="color:#27ae60; font-weight:700;"><i class="fa-solid fa-shield-check"></i> Fiduciary Priority Booking Active</span>';
      openDetailsModal('Schedule Advisory Consultation', modalContent);
    }\n`;
  const insertMarker = 'function openDetailsModal(';
  html = html.replace(insertMarker, modalHelper + insertMarker);
  console.log('Added openConsultationBookingModal helper function.');
}

fs.writeFileSync('user-dashboard.html', html, 'utf8');
console.log('user-dashboard.html written successfully!');
