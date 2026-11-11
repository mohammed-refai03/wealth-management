const fs = require('fs');

const adminHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Wealth Management Console | Stackly</title>
  <meta name="description" content="Institutional Admin Dashboard for Stackly Wealth Management. Manage client portfolios, asset allocation, capital inflows, transactions, and risk analytics.">
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%23195353'/><path d='M30 70 L50 30 L70 70 Z' fill='%23E5FF5E'/></svg>">
  
  <!-- Font Awesome 6 (Strict Rule: Font Awesome Icons Only) -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  
  <!-- Chart.js CDN -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  
  <!-- Core Stylesheet -->
  <link rel="stylesheet" href="css/styles.css">
</head>
<body class="wm-dash-body">

  <!-- ==========================================================================
       Dashboard Top Navigation Bar
       ========================================================================== -->
  <header class="wm-dash-header">
    <div class="wm-dash-header-left">
      <button id="sidebarToggle" class="wm-sidebar-toggle-btn" aria-label="Toggle Sidebar Navigation">
        <i class="fa-solid fa-bars"></i>
      </button>
      <a href="index.html" class="wm-logo" style="text-decoration:none;">
        <div class="wm-logo-icon">
          <i class="fa-solid fa-chart-line"></i>
        </div>
        <div class="wm-logo-text">STACK<span>LY</span></div>
      </a>
      <span class="wm-dash-badge">Institutional Admin</span>
      <span style="font-size:0.75rem; color:var(--wm-body-muted); display:none; @media(min-width:1200px){display:inline;}">
        <i class="fa-solid fa-circle-check" style="color:#27ae60; margin-right:4px;"></i> Schwab & Fidelity Custody Active
      </span>
    </div>

    <div class="wm-dash-header-right">
      <!-- Notification Button -->
      <button class="wm-notif-btn" id="notifBtn" title="View System Notifications" aria-label="Notifications">
        <i class="fa-regular fa-bell"></i>
        <span class="wm-notif-dot"></span>
      </button>

      <!-- Profile Pill -->
      <div class="wm-dash-profile-pill">
        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80" alt="Marcus Vance" class="wm-dash-profile-avatar">
        <div>
          <div class="wm-dash-profile-name">Marcus Vance, CFA</div>
          <div class="wm-dash-profile-role">Chief Investment Officer</div>
        </div>
      </div>

      <!-- Sign Out Button -->
      <a href="login.html" class="wm-dash-logout-btn" title="Sign out of advisory console">
        <i class="fa-solid fa-arrow-right-from-bracket"></i>
        <span>Sign Out</span>
      </a>
    </div>
  </header>

  <!-- ==========================================================================
       Dashboard Container & Exactly 5 Sidebar Navigation Items
       ========================================================================== -->
  <div class="wm-dash-container">
    
    <!-- Sidebar -->
    <aside class="wm-dash-sidebar" id="dashSidebar">
      <nav class="wm-sidebar-nav">
        <!-- STRICT CONSTRAINT: EXACTLY 5 MENU OPTIONS -->
        <button class="wm-sidebar-btn active" data-tab="tab-overview">
          <i class="fa-solid fa-chart-pie"></i>
          <span>Overview</span>
        </button>
        <button class="wm-sidebar-btn" data-tab="tab-clients">
          <i class="fa-solid fa-users"></i>
          <span>Clients</span>
        </button>
        <button class="wm-sidebar-btn" data-tab="tab-investments">
          <i class="fa-solid fa-chart-line"></i>
          <span>Investments</span>
        </button>
        <button class="wm-sidebar-btn" data-tab="tab-transactions">
          <i class="fa-solid fa-receipt"></i>
          <span>Transactions</span>
        </button>
        <button class="wm-sidebar-btn" data-tab="tab-analytics">
          <i class="fa-solid fa-chart-simple"></i>
          <span>Analytics</span>
        </button>
      </nav>

      <div class="wm-sidebar-footer">
        <div style="font-weight:700; color:var(--wm-white); margin-bottom:4px;">Stackly Advisory v2.4</div>
        <div style="display:flex; align-items:center; gap:6px; margin-bottom:6px;">
          <i class="fa-solid fa-shield-halved" style="color:var(--wm-secondary);"></i>
          <span>Fiduciary Standard 100%</span>
        </div>
        <div>Custody: Schwab & Fidelity</div>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="wm-dash-main">

      <!-- ====================================================================
           TAB 1: OVERVIEW (Active by default)
           ==================================================================== -->
      <section id="tab-overview" class="wm-tab-view active">
        <!-- Page Title & Actions -->
        <div class="wm-dash-title-bar">
          <div>
            <h1 class="wm-dash-page-title">Executive Wealth Advisory Overview</h1>
            <p class="wm-dash-page-subtitle">Real-time consolidated assets, capital inflows, liquidity reserves, and performance metrics.</p>
          </div>
          <div style="display:flex; gap:10px; flex-wrap:wrap;">
            <button class="wm-btn wm-btn-secondary" style="padding:10px 18px; font-size:0.85rem;" onclick="triggerToast('Quarterly Institutional Portfolio Review generated and exported to PDF.')">
              <i class="fa-solid fa-file-pdf"></i> Generate Q3 Report
            </button>
            <button class="wm-btn wm-btn-primary" style="padding:10px 18px; font-size:0.85rem;" onclick="triggerToast('Automated custody reconciliation completed. Zero discrepancies across all custodians.')">
              <i class="fa-solid fa-arrows-rotate"></i> Custody Reconcile
            </button>
          </div>
        </div>

        <!-- 6 KPI Cards -->
        <div class="wm-kpi-grid">
          <div class="wm-kpi-card">
            <div class="wm-kpi-top">
              <div class="wm-kpi-icon"><i class="fa-solid fa-building-columns"></i></div>
              <span class="wm-kpi-trend wm-trend-up"><i class="fa-solid fa-arrow-trend-up"></i> +14.2% YoY</span>
            </div>
            <div class="wm-kpi-val">$2,842,500,000</div>
            <div class="wm-kpi-lbl">Total Assets Under Management (AUM)</div>
          </div>

          <div class="wm-kpi-card">
            <div class="wm-kpi-top">
              <div class="wm-kpi-icon"><i class="fa-solid fa-users"></i></div>
              <span class="wm-kpi-trend wm-trend-up"><i class="fa-solid fa-arrow-trend-up"></i> +86 Q3</span>
            </div>
            <div class="wm-kpi-val">1,428</div>
            <div class="wm-kpi-lbl">Active Institutional & HNW Clients</div>
          </div>

          <div class="wm-kpi-card">
            <div class="wm-kpi-top">
              <div class="wm-kpi-icon"><i class="fa-solid fa-money-bill-trend-up"></i></div>
              <span class="wm-kpi-trend wm-trend-up"><i class="fa-solid fa-arrow-trend-up"></i> +22.8% MoM</span>
            </div>
            <div class="wm-kpi-val">$48,650,000</div>
            <div class="wm-kpi-lbl">Monthly Capital Inflows & Deployed</div>
          </div>

          <div class="wm-kpi-card">
            <div class="wm-kpi-top">
              <div class="wm-kpi-icon"><i class="fa-solid fa-coins"></i></div>
              <span class="wm-kpi-trend wm-trend-up"><i class="fa-solid fa-arrow-trend-up"></i> +9.5%</span>
            </div>
            <div class="wm-kpi-val">$19,890,000</div>
            <div class="wm-kpi-lbl">Advisory Fee Revenue (YTD)</div>
          </div>

          <div class="wm-kpi-card">
            <div class="wm-kpi-top">
              <div class="wm-kpi-icon"><i class="fa-solid fa-chart-line"></i></div>
              <span class="wm-kpi-trend wm-trend-up"><i class="fa-solid fa-arrow-trend-up"></i> Alpha +4.2%</span>
            </div>
            <div class="wm-kpi-val">+18.4%</div>
            <div class="wm-kpi-lbl">Average Weighted Portfolio Alpha</div>
          </div>

          <div class="wm-kpi-card">
            <div class="wm-kpi-top">
              <div class="wm-kpi-icon"><i class="fa-solid fa-shield-halved"></i></div>
              <span class="wm-kpi-trend wm-trend-up"><i class="fa-solid fa-check"></i> Tier 1</span>
            </div>
            <div class="wm-kpi-val">2.42</div>
            <div class="wm-kpi-lbl">Risk-Adjusted Sharpe Ratio</div>
          </div>
        </div>

        <!-- 4 Charts Grid -->
        <div class="wm-charts-grid">
          <!-- Chart 1: AUM Growth -->
          <div class="wm-chart-card">
            <div class="wm-chart-header">
              <div>
                <div class="wm-chart-title">AUM Historical Growth (2020 – 2026)</div>
                <div style="font-size:0.8rem; color:var(--wm-body-muted);">Capital accumulation trajectory in USD Billions</div>
              </div>
              <span class="wm-status-pill wm-pill-active">Compound CAGR 22.4%</span>
            </div>
            <div class="wm-chart-canvas-wrap">
              <canvas id="adminChartAUM"></canvas>
            </div>
          </div>

          <!-- Chart 2: Capital Inflows vs Outflows -->
          <div class="wm-chart-card">
            <div class="wm-chart-header">
              <div>
                <div class="wm-chart-title">Monthly Capital Inflows vs Rebalancing</div>
                <div style="font-size:0.8rem; color:var(--wm-body-muted);">Past 12 months institutional cash movements ($M)</div>
              </div>
              <span class="wm-status-pill wm-pill-active">Net Inflow +$310M</span>
            </div>
            <div class="wm-chart-canvas-wrap">
              <canvas id="adminChartInflows"></canvas>
            </div>
          </div>

          <!-- Chart 3: HNW Client Growth -->
          <div class="wm-chart-card">
            <div class="wm-chart-header">
              <div>
                <div class="wm-chart-title">HNW & Family Office Client Growth</div>
                <div style="font-size:0.8rem; color:var(--wm-body-muted);">Quarterly client account expansion</div>
              </div>
              <span class="wm-status-pill wm-pill-active">99.2% Retention</span>
            </div>
            <div class="wm-chart-canvas-wrap">
              <canvas id="adminChartClients"></canvas>
            </div>
          </div>

          <!-- Chart 4: Revenue Stream Breakdown -->
          <div class="wm-chart-card">
            <div class="wm-chart-header">
              <div>
                <div class="wm-chart-title">Revenue Streams by Asset Category</div>
                <div style="font-size:0.8rem; color:var(--wm-body-muted);">YTD advisory and management fee distribution</div>
              </div>
              <span class="wm-status-pill wm-pill-active">Diversified</span>
            </div>
            <div class="wm-chart-canvas-wrap">
              <canvas id="adminChartRevenue"></canvas>
            </div>
          </div>
        </div>

        <!-- Recent Transactions Table & Live Operations Grid -->
        <div style="display:grid; grid-template-columns: 2fr 1fr; gap:24px; margin-bottom:30px;">
          <!-- Recent High-Value Table -->
          <div class="wm-table-card" style="margin-bottom:0;">
            <div class="wm-table-header">
              <div>
                <div style="font-size:1.05rem; font-weight:700; color:var(--wm-dark);">Recent Institutional Transactions</div>
                <div style="font-size:0.8rem; color:var(--wm-body-muted);">Settlements and capital movements across Charles Schwab & Fidelity</div>
              </div>
              <button class="wm-btn wm-btn-outline" style="padding:6px 14px; font-size:0.8rem;" onclick="switchTab('tab-transactions')">
                View All Ledger <i class="fa-solid fa-arrow-right" style="margin-left:4px;"></i>
              </button>
            </div>
            <div style="overflow-x:auto;">
              <table class="wm-dash-table">
                <thead>
                  <tr>
                    <th>Ref ID</th>
                    <th>Client Account</th>
                    <th>Asset / Strategy</th>
                    <th>Amount</th>
                    <th>Custody</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>#TX-99401</strong></td>
                    <td>Sterling Heritage Trust</td>
                    <td>Apex Private Equity IV</td>
                    <td><strong>$4,500,000</strong></td>
                    <td>Schwab Inst.</td>
                    <td><span class="wm-status-pill wm-pill-completed">Settled</span></td>
                    <td>
                      <button class="wm-action-btn" title="View Transaction Audit Slip" onclick="openDetailsModal('Transaction #TX-99401', 'Client: Sterling Heritage Trust<br>Strategy: Apex Private Equity IV<br>Amount: $4,500,000.00 USD<br>Settlement: Same-Day Fedwire FedLine<br>Custody: Charles Schwab Institutional #SCH-88219<br>Reconciliation: Matched 100%<br>Timestamp: 2026-11-04 09:15:22 EST')">
                        <i class="fa-solid fa-eye"></i>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td><strong>#TX-99388</strong></td>
                    <td>Dr. Vikram Patel</td>
                    <td>Stackly Global Alpha Equities</td>
                    <td><strong>$1,850,000</strong></td>
                    <td>Fidelity Inst.</td>
                    <td><span class="wm-status-pill wm-pill-completed">Settled</span></td>
                    <td>
                      <button class="wm-action-btn" title="View Transaction Audit Slip" onclick="openDetailsModal('Transaction #TX-99388', 'Client: Dr. Vikram Patel<br>Strategy: Stackly Global Alpha Equities<br>Amount: $1,850,000.00 USD<br>Custody: Fidelity Institutional Clearing<br>Status: Settled & Confirmed<br>Timestamp: 2026-11-03 16:40:11 EST')">
                        <i class="fa-solid fa-eye"></i>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td><strong>#TX-99375</strong></td>
                    <td>Anandha Krishnan</td>
                    <td>Sovereign Treasury Plus</td>
                    <td><strong>$250,000</strong></td>
                    <td>Schwab Inst.</td>
                    <td><span class="wm-status-pill wm-pill-completed">Settled</span></td>
                    <td>
                      <button class="wm-action-btn" title="View Transaction Audit Slip" onclick="openDetailsModal('Transaction #TX-99375', 'Client: Anandha Krishnan<br>Strategy: Sovereign Treasury Plus<br>Amount: $250,000.00 USD<br>Yield: 7.4% APY Locked<br>Custody: Charles Schwab #SCH-7729-19<br>Timestamp: 2026-11-02 11:24:00 EST')">
                        <i class="fa-solid fa-eye"></i>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td><strong>#TX-99360</strong></td>
                    <td>Geneva Horizon Fund</td>
                    <td>Nordic Renewable REIT</td>
                    <td><strong>$3,200,000</strong></td>
                    <td>BNY Mellon</td>
                    <td><span class="wm-status-pill wm-pill-pending">Clearing</span></td>
                    <td>
                      <button class="wm-action-btn" title="View Transaction Audit Slip" onclick="openDetailsModal('Transaction #TX-99360', 'Client: Geneva Horizon Fund<br>Strategy: Nordic Renewable REIT<br>Amount: $3,200,000.00 USD<br>Custody: BNY Mellon Institutional<br>Status: Clearing T+1 Window<br>Estimated Settlement: 2026-11-05 10:00:00 EST')">
                        <i class="fa-solid fa-eye"></i>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td><strong>#TX-99342</strong></td>
                    <td>Marcus Aurelius Trust</td>
                    <td>Quant Market Neutral Fund</td>
                    <td><strong>$6,100,000</strong></td>
                    <td>Schwab Inst.</td>
                    <td><span class="wm-status-pill wm-pill-completed">Settled</span></td>
                    <td>
                      <button class="wm-action-btn" title="View Transaction Audit Slip" onclick="openDetailsModal('Transaction #TX-99342', 'Client: Marcus Aurelius Trust<br>Strategy: Quant Market Neutral Fund<br>Amount: $6,100,000.00 USD<br>Custody: Charles Schwab Institutional<br>Status: Fully Settled<br>Timestamp: 2026-11-01 14:10:00 EST')">
                        <i class="fa-solid fa-eye"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Live Activity Feed & Custodian Health -->
          <div style="display:flex; flex-direction:column; gap:20px;">
            <div class="wm-chart-card" style="padding:20px;">
              <div style="font-weight:700; color:var(--wm-dark); margin-bottom:14px; font-size:1rem; display:flex; align-items:center; justify-content:space-between;">
                <span>Advisory Activity Feed</span>
                <i class="fa-solid fa-bolt" style="color:var(--wm-primary);"></i>
              </div>
              <div class="wm-activity-list">
                <div class="wm-activity-item">
                  <div class="wm-activity-icon wm-act-green"><i class="fa-solid fa-check"></i></div>
                  <div class="wm-activity-info">
                    <div class="wm-activity-text">Form 13F Institutional Filing verified with SEC EDGAR.</div>
                    <div class="wm-activity-time">32 mins ago • Compliance Dept</div>
                  </div>
                </div>
                <div class="wm-activity-item">
                  <div class="wm-activity-icon wm-act-teal"><i class="fa-solid fa-money-bill-transfer"></i></div>
                  <div class="wm-activity-info">
                    <div class="wm-activity-text">Q3 Dividend yield distribution ($3.95M) auto-credited to 1,428 client accounts.</div>
                    <div class="wm-activity-time">2 hours ago • Treasury Desk</div>
                  </div>
                </div>
                <div class="wm-activity-item">
                  <div class="wm-activity-icon wm-act-blue"><i class="fa-solid fa-sliders"></i></div>
                  <div class="wm-activity-info">
                    <div class="wm-activity-text">Portfolio rebalance completed for 312 Ultra-HNW accounts (5% re-weighted to Fixed Income).</div>
                    <div class="wm-activity-time">5 hours ago • Investment Committee</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Custody Health Card -->
            <div class="wm-chart-card" style="padding:20px;">
              <div style="font-weight:700; color:var(--wm-dark); margin-bottom:12px; font-size:0.95rem;">
                <i class="fa-solid fa-server" style="color:var(--wm-primary); margin-right:6px;"></i> Institutional Custody Links
              </div>
              <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:0.85rem;">
                <span>Charles Schwab Institutional</span>
                <span style="color:#27ae60; font-weight:700;"><i class="fa-solid fa-circle" style="font-size:0.5rem; vertical-align:middle;"></i> 100% Operational</span>
              </div>
              <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:0.85rem;">
                <span>Fidelity Clearing Canada/US</span>
                <span style="color:#27ae60; font-weight:700;"><i class="fa-solid fa-circle" style="font-size:0.5rem; vertical-align:middle;"></i> 100% Operational</span>
              </div>
              <div style="display:flex; justify-content:space-between; font-size:0.85rem;">
                <span>BNY Mellon Global Custody</span>
                <span style="color:#27ae60; font-weight:700;"><i class="fa-solid fa-circle" style="font-size:0.5rem; vertical-align:middle;"></i> 100% Operational</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ====================================================================
           TAB 2: CLIENTS
           ==================================================================== -->
      <section id="tab-clients" class="wm-tab-view">
        <div class="wm-dash-title-bar">
          <div>
            <h1 class="wm-dash-page-title">Client Portfolio Directory</h1>
            <p class="wm-dash-page-subtitle">Manage high-net-worth accounts, fiduciary assignments, risk tolerance levels, and KYC documentation.</p>
          </div>
          <div style="display:flex; gap:10px;">
            <button class="wm-btn wm-btn-secondary" style="padding:10px 18px; font-size:0.85rem;" onclick="triggerToast('Client audit records exported to CSV spreadsheet.')">
              <i class="fa-solid fa-file-excel"></i> Export Client Roster
            </button>
            <button class="wm-btn wm-btn-primary" style="padding:10px 18px; font-size:0.85rem;" onclick="triggerToast('Annual fiduciary disclosure packages dispatched to all 1,428 clients.')">
              <i class="fa-solid fa-paper-plane"></i> Dispatch Fiduciary Notices
            </button>
          </div>
        </div>

        <!-- 4 KPI Cards -->
        <div class="wm-kpi-grid">
          <div class="wm-kpi-card">
            <div class="wm-kpi-top">
              <div class="wm-kpi-icon"><i class="fa-solid fa-address-book"></i></div>
              <span class="wm-kpi-trend wm-trend-up">+6.4% YoY</span>
            </div>
            <div class="wm-kpi-val">1,428</div>
            <div class="wm-kpi-lbl">Total Managed Client Accounts</div>
          </div>

          <div class="wm-kpi-card">
            <div class="wm-kpi-top">
              <div class="wm-kpi-icon"><i class="fa-solid fa-crown"></i></div>
              <span class="wm-kpi-trend wm-trend-up">Tier 1</span>
            </div>
            <div class="wm-kpi-val">312</div>
            <div class="wm-kpi-lbl">Ultra-HNW ($10M+ AUM) Accounts</div>
          </div>

          <div class="wm-kpi-card">
            <div class="wm-kpi-top">
              <div class="wm-kpi-icon"><i class="fa-solid fa-handshake"></i></div>
              <span class="wm-kpi-trend wm-trend-up">Industry Top 1%</span>
            </div>
            <div class="wm-kpi-val">99.2%</div>
            <div class="wm-kpi-lbl">Annual Fiduciary Retention Rate</div>
          </div>

          <div class="wm-kpi-card">
            <div class="wm-kpi-top">
              <div class="wm-kpi-icon"><i class="fa-solid fa-clipboard-check"></i></div>
              <span class="wm-kpi-trend wm-trend-up">SEC / FINRA</span>
            </div>
            <div class="wm-kpi-val">100%</div>
            <div class="wm-kpi-lbl">KYC / AML Regulatory Compliance</div>
          </div>
        </div>

        <!-- Client Charts Grid -->
        <div class="wm-charts-grid">
          <div class="wm-chart-card">
            <div class="wm-chart-header">
              <div class="wm-chart-title">Client Accounts by Capital Tier</div>
              <span class="wm-status-pill wm-pill-active">AUM Distribution</span>
            </div>
            <div class="wm-chart-canvas-wrap">
              <canvas id="adminChartClientTiers"></canvas>
            </div>
          </div>

          <div class="wm-chart-card">
            <div class="wm-chart-header">
              <div class="wm-chart-title">Investor Entity Classification</div>
              <span class="wm-status-pill wm-pill-active">Entity Structure</span>
            </div>
            <div class="wm-chart-canvas-wrap">
              <canvas id="adminChartInvestorType"></canvas>
            </div>
          </div>
        </div>

        <!-- Comprehensive Clients Table -->
        <div class="wm-table-card">
          <div class="wm-table-header">
            <div>
              <div style="font-size:1.1rem; font-weight:700; color:var(--wm-dark);">Institutional & Private Client Directory</div>
              <div style="font-size:0.8rem; color:var(--wm-body-muted);">Real-time portfolios, assigned fiduciary managers, and compliance ratings</div>
            </div>
            <div class="wm-table-controls">
              <input type="text" id="clientSearchInput" class="wm-table-search" placeholder="Search client name or ID..." onkeyup="filterClientsTable()">
              <select id="clientTierFilter" class="wm-table-select" onchange="filterClientsTable()">
                <option value="all">All Tiers</option>
                <option value="Ultra-HNW">Ultra-HNW ($10M+)</option>
                <option value="Family Office">Family Office</option>
                <option value="Corporate">Corporate Treasury</option>
                <option value="Private Client">Private Client</option>
              </select>
              <select id="clientRiskFilter" class="wm-table-select" onchange="filterClientsTable()">
                <option value="all">All Risk Profiles</option>
                <option value="Aggressive">Aggressive Growth</option>
                <option value="Moderate">Moderate Growth</option>
                <option value="Conservative">Conservative Yield</option>
              </select>
            </div>
          </div>

          <div style="overflow-x:auto;">
            <table class="wm-dash-table" id="clientsTable">
              <thead>
                <tr>
                  <th>Client Account & ID</th>
                  <th>Entity Type</th>
                  <th>Total Portfolio (AUM)</th>
                  <th>Assigned Advisor</th>
                  <th>Risk Profile</th>
                  <th>KYC Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr data-tier="Ultra-HNW" data-risk="Moderate">
                  <td>
                    <div style="font-weight:700; color:var(--wm-dark);">Katherine Sterling</div>
                    <div style="font-size:0.75rem; color:var(--wm-body-muted);">ID: #STK-99014 • London / New York</div>
                  </td>
                  <td><span class="wm-status-pill wm-pill-active">Ultra-HNW</span></td>
                  <td><strong style="color:var(--wm-primary); font-size:1rem;">$48,500,000</strong></td>
                  <td>Marcus Vance, CFA</td>
                  <td>Moderate Growth</td>
                  <td><span class="wm-status-pill wm-pill-completed">Verified Tier 3</span></td>
                  <td>
                    <div class="wm-action-btn-group">
                      <button class="wm-action-btn" title="View Detailed Portfolio" onclick="openDetailsModal('Katherine Sterling Portfolio', 'Account: #STK-99014<br>AUM: $48,500,000 USD<br>Equities: 45% ($21.8M)<br>Fixed Income: 25% ($12.1M)<br>Private Equity: 20% ($9.7M)<br>Real Assets: 10% ($4.8M)<br>YTD Return: +17.2%<br>Custody: Charles Schwab Institutional')"><i class="fa-solid fa-eye"></i></button>
                      <button class="wm-action-btn" title="Send Monthly Briefing" onclick="triggerToast('Private briefing memo dispatched to Katherine Sterling.')"><i class="fa-solid fa-envelope"></i></button>
                      <button class="wm-action-btn" title="Generate Tax Loss Harvesting Report" onclick="triggerToast('Tax-loss harvesting analysis generated for #STK-99014.')"><i class="fa-solid fa-file-invoice-dollar"></i></button>
                    </div>
                  </td>
                </tr>

                <tr data-tier="Family Office" data-risk="Aggressive">
                  <td>
                    <div style="font-weight:700; color:var(--wm-dark);">Dr. Vikram Patel</div>
                    <div style="font-size:0.75rem; color:var(--wm-body-muted);">ID: #STK-88241 • Mumbai / San Francisco</div>
                  </td>
                  <td><span class="wm-status-pill wm-pill-active">Family Office</span></td>
                  <td><strong style="color:var(--wm-primary); font-size:1rem;">$24,200,000</strong></td>
                  <td>Elena Chen, CFP</td>
                  <td>Aggressive Growth</td>
                  <td><span class="wm-status-pill wm-pill-completed">Verified Tier 3</span></td>
                  <td>
                    <div class="wm-action-btn-group">
                      <button class="wm-action-btn" title="View Detailed Portfolio" onclick="openDetailsModal('Dr. Vikram Patel Portfolio', 'Account: #STK-88241<br>AUM: $24,200,000 USD<br>Focus: Venture Capital, AI Disruption & Tech Equities<br>YTD Return: +26.8%<br>Custody: Fidelity Institutional')"><i class="fa-solid fa-eye"></i></button>
                      <button class="wm-action-btn" title="Send Monthly Briefing" onclick="triggerToast('Private briefing memo dispatched to Dr. Vikram Patel.')"><i class="fa-solid fa-envelope"></i></button>
                      <button class="wm-action-btn" title="Generate Tax Report" onclick="triggerToast('Tax statement generated for #STK-88241.')"><i class="fa-solid fa-file-invoice-dollar"></i></button>
                    </div>
                  </td>
                </tr>

                <tr data-tier="Ultra-HNW" data-risk="Moderate">
                  <td>
                    <div style="font-weight:700; color:var(--wm-dark);">Harrison & Vance Legacy Trust</div>
                    <div style="font-size:0.75rem; color:var(--wm-body-muted);">ID: #STK-77102 • Boston, MA</div>
                  </td>
                  <td><span class="wm-status-pill wm-pill-active">Ultra-HNW</span></td>
                  <td><strong style="color:var(--wm-primary); font-size:1rem;">$62,000,000</strong></td>
                  <td>Marcus Vance, CFA</td>
                  <td>Moderate Growth</td>
                  <td><span class="wm-status-pill wm-pill-completed">Verified Tier 3</span></td>
                  <td>
                    <div class="wm-action-btn-group">
                      <button class="wm-action-btn" title="View Detailed Portfolio" onclick="openDetailsModal('Harrison & Vance Trust Portfolio', 'Account: #STK-77102<br>AUM: $62,000,000 USD<br>Focus: Multi-Generational Wealth Preservation & Dividend Growth<br>YTD Return: +14.8%<br>Custody: Charles Schwab')"><i class="fa-solid fa-eye"></i></button>
                      <button class="wm-action-btn" title="Send Monthly Briefing" onclick="triggerToast('Private briefing memo dispatched to Harrison Trust.')"><i class="fa-solid fa-envelope"></i></button>
                      <button class="wm-action-btn" title="Generate Tax Report" onclick="triggerToast('Trust tax schedule generated.')"><i class="fa-solid fa-file-invoice-dollar"></i></button>
                    </div>
                  </td>
                </tr>

                <tr data-tier="Private Client" data-risk="Moderate">
                  <td>
                    <div style="font-weight:700; color:var(--wm-dark);">Anandha Krishnan</div>
                    <div style="font-size:0.75rem; color:var(--wm-body-muted);">ID: #STK-8849201 • Salem, Tamil Nadu</div>
                  </td>
                  <td><span class="wm-status-pill wm-pill-active">Private Client</span></td>
                  <td><strong style="color:var(--wm-primary); font-size:1rem;">$1,482,900</strong></td>
                  <td>Marcus Vance, CFA</td>
                  <td>Moderate Growth</td>
                  <td><span class="wm-status-pill wm-pill-completed">Verified Tier 3</span></td>
                  <td>
                    <div class="wm-action-btn-group">
                      <button class="wm-action-btn" title="View Detailed Portfolio" onclick="openDetailsModal('Anandha Krishnan Portfolio', 'Account: #STK-8849201<br>AUM: $1,482,900 USD<br>Invested Capital: $1,220,000<br>Unrealized Gains: +$262,900 (+21.5%)<br>YTD Return: +12.6%<br>Custody: Charles Schwab #SCH-7729-19<br>Risk Score: 82/100 (Moderate Growth)')"><i class="fa-solid fa-eye"></i></button>
                      <button class="wm-action-btn" title="Send Advisory Message" onclick="triggerToast('Encrypted advisory message sent to Anandha Krishnan.')"><i class="fa-solid fa-envelope"></i></button>
                      <button class="wm-action-btn" title="Generate Tax Report" onclick="triggerToast('Tax summary dispatched to Anandha Krishnan.')"><i class="fa-solid fa-file-invoice-dollar"></i></button>
                    </div>
                  </td>
                </tr>

                <tr data-tier="Family Office" data-risk="Conservative">
                  <td>
                    <div style="font-weight:700; color:var(--wm-dark);">Elena Rostova</div>
                    <div style="font-size:0.75rem; color:var(--wm-body-muted);">ID: #STK-66519 • Zurich, Switzerland</div>
                  </td>
                  <td><span class="wm-status-pill wm-pill-active">Family Office</span></td>
                  <td><strong style="color:var(--wm-primary); font-size:1rem;">$31,800,000</strong></td>
                  <td>Julian Rossi, CAIA</td>
                  <td>Conservative Yield</td>
                  <td><span class="wm-status-pill wm-pill-completed">Verified Tier 3</span></td>
                  <td>
                    <div class="wm-action-btn-group">
                      <button class="wm-action-btn" title="View Detailed Portfolio" onclick="openDetailsModal('Elena Rostova Portfolio', 'Account: #STK-66519<br>AUM: $31,800,000 USD<br>Focus: Sovereign Debt & Swiss Franc Hedged Liquidity<br>Custody: BNY Mellon')"><i class="fa-solid fa-eye"></i></button>
                      <button class="wm-action-btn" title="Send Monthly Briefing" onclick="triggerToast('Briefing dispatched to Elena Rostova.')"><i class="fa-solid fa-envelope"></i></button>
                      <button class="wm-action-btn" title="Generate Tax Report" onclick="triggerToast('International tax schedule prepared.')"><i class="fa-solid fa-file-invoice-dollar"></i></button>
                    </div>
                  </td>
                </tr>

                <tr data-tier="Ultra-HNW" data-risk="Moderate">
                  <td>
                    <div style="font-weight:700; color:var(--wm-dark);">Arthur Pendelton III</div>
                    <div style="font-size:0.75rem; color:var(--wm-body-muted);">ID: #STK-55140 • Philadelphia, PA</div>
                  </td>
                  <td><span class="wm-status-pill wm-pill-active">Ultra-HNW</span></td>
                  <td><strong style="color:var(--wm-primary); font-size:1rem;">$18,400,000</strong></td>
                  <td>Elena Chen, CFP</td>
                  <td>Moderate Growth</td>
                  <td><span class="wm-status-pill wm-pill-completed">Verified Tier 3</span></td>
                  <td>
                    <div class="wm-action-btn-group">
                      <button class="wm-action-btn" title="View Portfolio" onclick="openDetailsModal('Arthur Pendelton Portfolio', 'Account: #STK-55140<br>AUM: $18,400,000 USD<br>YTD Return: +15.2%<br>Custody: Schwab')"><i class="fa-solid fa-eye"></i></button>
                      <button class="wm-action-btn" title="Send Message" onclick="triggerToast('Update sent.')"><i class="fa-solid fa-envelope"></i></button>
                      <button class="wm-action-btn" title="Tax Report" onclick="triggerToast('Tax report generated.')"><i class="fa-solid fa-file-invoice-dollar"></i></button>
                    </div>
                  </td>
                </tr>

                <tr data-tier="Corporate" data-risk="Conservative">
                  <td>
                    <div style="font-weight:700; color:var(--wm-dark);">Claire Beauchamp Holdings</div>
                    <div style="font-size:0.75rem; color:var(--wm-body-muted);">ID: #STK-44912 • Edinburgh, UK</div>
                  </td>
                  <td><span class="wm-status-pill wm-pill-active">Corporate</span></td>
                  <td><strong style="color:var(--wm-primary); font-size:1rem;">$12,900,000</strong></td>
                  <td>Julian Rossi, CAIA</td>
                  <td>Conservative Yield</td>
                  <td><span class="wm-status-pill wm-pill-completed">Verified Tier 3</span></td>
                  <td>
                    <div class="wm-action-btn-group">
                      <button class="wm-action-btn" title="View Portfolio" onclick="openDetailsModal('Claire Beauchamp Portfolio', 'Account: #STK-44912<br>AUM: $12,900,000 USD<br>Focus: Corporate Treasury Liquidity Shield<br>Custody: Fidelity')"><i class="fa-solid fa-eye"></i></button>
                      <button class="wm-action-btn" title="Send Message" onclick="triggerToast('Update sent.')"><i class="fa-solid fa-envelope"></i></button>
                      <button class="wm-action-btn" title="Tax Report" onclick="triggerToast('Corporate tax summary generated.')"><i class="fa-solid fa-file-invoice-dollar"></i></button>
                    </div>
                  </td>
                </tr>

                <tr data-tier="Ultra-HNW" data-risk="Aggressive">
                  <td>
                    <div style="font-weight:700; color:var(--wm-dark);">Kenji Takahashi</div>
                    <div style="font-size:0.75rem; color:var(--wm-body-muted);">ID: #STK-33819 • Tokyo, Japan</div>
                  </td>
                  <td><span class="wm-status-pill wm-pill-active">Ultra-HNW</span></td>
                  <td><strong style="color:var(--wm-primary); font-size:1rem;">$29,750,000</strong></td>
                  <td>Marcus Vance, CFA</td>
                  <td>Aggressive Growth</td>
                  <td><span class="wm-status-pill wm-pill-completed">Verified Tier 3</span></td>
                  <td>
                    <div class="wm-action-btn-group">
                      <button class="wm-action-btn" title="View Portfolio" onclick="openDetailsModal('Kenji Takahashi Portfolio', 'Account: #STK-33819<br>AUM: $29,750,000 USD<br>Focus: Global Alpha Equities & Robotics Private Equity<br>Custody: Schwab')"><i class="fa-solid fa-eye"></i></button>
                      <button class="wm-action-btn" title="Send Message" onclick="triggerToast('Update sent.')"><i class="fa-solid fa-envelope"></i></button>
                      <button class="wm-action-btn" title="Tax Report" onclick="triggerToast('Tax report generated.')"><i class="fa-solid fa-file-invoice-dollar"></i></button>
                    </div>
                  </td>
                </tr>

                <tr data-tier="Family Office" data-risk="Moderate">
                  <td>
                    <div style="font-weight:700; color:var(--wm-dark);">Marcus Aurelius Trust</div>
                    <div style="font-size:0.75rem; color:var(--wm-body-muted);">ID: #STK-22901 • New York, NY</div>
                  </td>
                  <td><span class="wm-status-pill wm-pill-active">Family Office</span></td>
                  <td><strong style="color:var(--wm-primary); font-size:1rem;">$84,000,000</strong></td>
                  <td>Marcus Vance, CFA</td>
                  <td>Moderate Growth</td>
                  <td><span class="wm-status-pill wm-pill-completed">Verified Tier 3</span></td>
                  <td>
                    <div class="wm-action-btn-group">
                      <button class="wm-action-btn" title="View Portfolio" onclick="openDetailsModal('Marcus Aurelius Trust Portfolio', 'Account: #STK-22901<br>AUM: $84,000,000 USD<br>Focus: Multi-Strategy Hedge & Infrastructure REITs<br>Custody: Charles Schwab')"><i class="fa-solid fa-eye"></i></button>
                      <button class="wm-action-btn" title="Send Message" onclick="triggerToast('Trust memo sent.')"><i class="fa-solid fa-envelope"></i></button>
                      <button class="wm-action-btn" title="Tax Report" onclick="triggerToast('Tax report generated.')"><i class="fa-solid fa-file-invoice-dollar"></i></button>
                    </div>
                  </td>
                </tr>

                <tr data-tier="Corporate" data-risk="Moderate">
                  <td>
                    <div style="font-weight:700; color:var(--wm-dark);">Rajeshwar Singhania</div>
                    <div style="font-size:0.75rem; color:var(--wm-body-muted);">ID: #STK-11409 • New Delhi / Singapore</div>
                  </td>
                  <td><span class="wm-status-pill wm-pill-active">Ultra-HNW</span></td>
                  <td><strong style="color:var(--wm-primary); font-size:1rem;">$41,200,000</strong></td>
                  <td>Marcus Vance, CFA</td>
                  <td>Moderate Growth</td>
                  <td><span class="wm-status-pill wm-pill-completed">Verified Tier 3</span></td>
                  <td>
                    <div class="wm-action-btn-group">
                      <button class="wm-action-btn" title="View Portfolio" onclick="openDetailsModal('Rajeshwar Singhania Portfolio', 'Account: #STK-11409<br>AUM: $41,200,000 USD<br>Focus: Infrastructure Debt & Clean Energy REITs<br>Custody: Fidelity')"><i class="fa-solid fa-eye"></i></button>
                      <button class="wm-action-btn" title="Send Message" onclick="triggerToast('Memo sent.')"><i class="fa-solid fa-envelope"></i></button>
                      <button class="wm-action-btn" title="Tax Report" onclick="triggerToast('Tax report generated.')"><i class="fa-solid fa-file-invoice-dollar"></i></button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- ====================================================================
           TAB 3: INVESTMENTS
           ==================================================================== -->
      <section id="tab-investments" class="wm-tab-view">
        <div class="wm-dash-title-bar">
          <div>
            <h1 class="wm-dash-page-title">Global Investment Strategies & Funds</h1>
            <p class="wm-dash-page-subtitle">Multi-asset portfolio allocation, yield benchmarks, liquidity tiers, and fund inventory.</p>
          </div>
          <div style="display:flex; gap:10px;">
            <button class="wm-btn wm-btn-secondary" style="padding:10px 18px; font-size:0.85rem;" onclick="triggerToast('Fund inventory factsheets exported to institutional compendium.')">
              <i class="fa-solid fa-download"></i> Download Factsheets
            </button>
            <button class="wm-btn wm-btn-primary" style="padding:10px 18px; font-size:0.85rem;" onclick="triggerToast('Target rebalancing allocations calculated across 1,428 portfolios.')">
              <i class="fa-solid fa-scale-balanced"></i> Rebalance Model Targets
            </button>
          </div>
        </div>

        <!-- 6 KPI Cards -->
        <div class="wm-kpi-grid">
          <div class="wm-kpi-card">
            <div class="wm-kpi-top">
              <div class="wm-kpi-icon"><i class="fa-solid fa-arrow-trend-up"></i></div>
              <span class="wm-kpi-trend wm-trend-up">41.5% AUM</span>
            </div>
            <div class="wm-kpi-val">$1.18B</div>
            <div class="wm-kpi-lbl">Global Equities Portfolio</div>
          </div>

          <div class="wm-kpi-card">
            <div class="wm-kpi-top">
              <div class="wm-kpi-icon"><i class="fa-solid fa-landmark"></i></div>
              <span class="wm-kpi-trend wm-trend-up">24.0% AUM</span>
            </div>
            <div class="wm-kpi-val">$682M</div>
            <div class="wm-kpi-lbl">Fixed Income & Sovereign Debt</div>
          </div>

          <div class="wm-kpi-card">
            <div class="wm-kpi-top">
              <div class="wm-kpi-icon"><i class="fa-solid fa-briefcase"></i></div>
              <span class="wm-kpi-trend wm-trend-up">18.0% AUM</span>
            </div>
            <div class="wm-kpi-val">$512M</div>
            <div class="wm-kpi-lbl">Private Equity & Venture</div>
          </div>

          <div class="wm-kpi-card">
            <div class="wm-kpi-top">
              <div class="wm-kpi-icon"><i class="fa-solid fa-city"></i></div>
              <span class="wm-kpi-trend wm-trend-up">11.0% AUM</span>
            </div>
            <div class="wm-kpi-val">$312.5M</div>
            <div class="wm-kpi-lbl">Real Assets & Prime Infrastructure</div>
          </div>

          <div class="wm-kpi-card">
            <div class="wm-kpi-top">
              <div class="wm-kpi-icon"><i class="fa-solid fa-gem"></i></div>
              <span class="wm-kpi-trend wm-trend-up">5.5% AUM</span>
            </div>
            <div class="wm-kpi-val">$156M</div>
            <div class="wm-kpi-lbl">Alternatives & Commodities</div>
          </div>

          <div class="wm-kpi-card">
            <div class="wm-kpi-top">
              <div class="wm-kpi-icon"><i class="fa-solid fa-trophy"></i></div>
              <span class="wm-kpi-trend wm-trend-up">Top Quartile</span>
            </div>
            <div class="wm-kpi-val">+16.8%</div>
            <div class="wm-kpi-lbl">3-Year Annualized Return</div>
          </div>
        </div>

        <!-- Charts Grid (3 charts) -->
        <div class="wm-charts-grid">
          <!-- Chart 1: Performance Benchmark -->
          <div class="wm-chart-card" style="grid-column: 1 / -1;">
            <div class="wm-chart-header">
              <div>
                <div class="wm-chart-title">Multi-Asset Strategy vs Global Benchmarks (S&P 500 / Bloomberg Global Agg)</div>
                <div style="font-size:0.8rem; color:var(--wm-body-muted);">Consolidated performance showing continuous alpha generation</div>
              </div>
              <span class="wm-status-pill wm-pill-active">Alpha +4.2%</span>
            </div>
            <div class="wm-chart-canvas-wrap" style="height:320px;">
              <canvas id="adminChartPerfBenchmark"></canvas>
            </div>
          </div>

          <!-- Chart 2: Strategic Allocation -->
          <div class="wm-chart-card">
            <div class="wm-chart-header">
              <div class="wm-chart-title">Strategic Multi-Asset Allocation</div>
              <span class="wm-status-pill wm-pill-active">Consolidated</span>
            </div>
            <div class="wm-chart-canvas-wrap">
              <canvas id="adminChartAssetAllocation"></canvas>
            </div>
          </div>

          <!-- Chart 3: Fund Returns -->
          <div class="wm-chart-card">
            <div class="wm-chart-header">
              <div class="wm-chart-title">1-Year Return by Strategy Fund</div>
              <span class="wm-status-pill wm-pill-active">Yield Comparison</span>
            </div>
            <div class="wm-chart-canvas-wrap">
              <canvas id="adminChartStrategyYield"></canvas>
            </div>
          </div>
        </div>

        <!-- Master Fund Inventory Table -->
        <div class="wm-table-card">
          <div class="wm-table-header">
            <div>
              <div style="font-size:1.1rem; font-weight:700; color:var(--wm-dark);">Institutional Fund & Asset Inventory</div>
              <div style="font-size:0.8rem; color:var(--wm-body-muted);">Proprietary and curated fiduciary vehicles available across client portfolios</div>
            </div>
            <div class="wm-table-controls">
              <input type="text" id="fundSearchInput" class="wm-table-search" placeholder="Search strategy or fund..." onkeyup="filterFundsTable()">
              <select id="fundCategoryFilter" class="wm-table-select" onchange="filterFundsTable()">
                <option value="all">All Asset Classes</option>
                <option value="Equities">Equities</option>
                <option value="Fixed Income">Fixed Income</option>
                <option value="Private Equity">Private Equity</option>
                <option value="Real Assets">Real Assets</option>
                <option value="Alternative">Alternative Strategies</option>
              </select>
            </div>
          </div>

          <div style="overflow-x:auto;">
            <table class="wm-dash-table" id="fundsTable">
              <thead>
                <tr>
                  <th>Strategy / Fund Name</th>
                  <th>Category</th>
                  <th>Capital Deployed</th>
                  <th>1-Yr Return</th>
                  <th>3-Yr Return</th>
                  <th>Risk Level</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr data-cat="Equities">
                  <td><strong>Stackly Global Alpha Equities</strong><div style="font-size:0.75rem; color:var(--wm-body-muted);">Focus: Large Cap Quality Growth & AI Enablers</div></td>
                  <td>Equities</td>
                  <td><strong>$420,000,000</strong></td>
                  <td><span class="wm-kpi-trend wm-trend-up">+24.2%</span></td>
                  <td><strong>+68.4%</strong></td>
                  <td>Aggressive</td>
                  <td><span class="wm-status-pill wm-pill-completed">Open</span></td>
                  <td><button class="wm-action-btn" title="View Factsheet" onclick="openDetailsModal('Stackly Global Alpha Equities', 'Strategy: Large-Cap Quality Growth<br>AUM: $420,000,000 USD<br>1Y Alpha: +5.8% vs S&P 500<br>Sharpe: 2.38<br>Min Investment: $100,000<br>Expense Ratio: 0.65%<br>Liquidity: Daily')"><i class="fa-solid fa-eye"></i></button></td>
                </tr>
                <tr data-cat="Fixed Income">
                  <td><strong>Sovereign Treasury Yield Plus</strong><div style="font-size:0.75rem; color:var(--wm-body-muted);">Focus: US & G7 Sovereign Debt + TIPS Hedge</div></td>
                  <td>Fixed Income</td>
                  <td><strong>$290,000,000</strong></td>
                  <td><span class="wm-kpi-trend wm-trend-up">+7.4%</span></td>
                  <td><strong>+18.2%</strong></td>
                  <td>Low Risk</td>
                  <td><span class="wm-status-pill wm-pill-completed">Open</span></td>
                  <td><button class="wm-action-btn" title="View Factsheet" onclick="openDetailsModal('Sovereign Treasury Yield Plus', 'Strategy: Sovereign Debt & Inflation Shield<br>AUM: $290,000,000 USD<br>Duration: 4.8 Years<br>Yield to Maturity: 7.4%<br>Liquidity: Daily T+1')"><i class="fa-solid fa-eye"></i></button></td>
                </tr>
                <tr data-cat="Private Equity">
                  <td><strong>Apex Private Equity Syndicate IV</strong><div style="font-size:0.75rem; color:var(--wm-body-muted);">Focus: B2B Enterprise SaaS & MedTech Buyouts</div></td>
                  <td>Private Equity</td>
                  <td><strong>$260,000,000</strong></td>
                  <td><span class="wm-kpi-trend wm-trend-up">+28.5%</span></td>
                  <td><strong>+84.0%</strong></td>
                  <td>High Risk</td>
                  <td><span class="wm-status-pill wm-pill-pending">Cap Met (Closed)</span></td>
                  <td><button class="wm-action-btn" title="View Factsheet" onclick="openDetailsModal('Apex Private Equity IV', 'Fund IV: Fully Deployed<br>Committed Capital: $260,000,000 USD<br>IRR: 28.5% Net<br>Lockup: 5-Year Closed-End<br>Custodian: Schwab Institutional')"><i class="fa-solid fa-eye"></i></button></td>
                </tr>
                <tr data-cat="Real Assets">
                  <td><strong>Green Infrastructure Real Estate Trust</strong><div style="font-size:0.75rem; color:var(--wm-body-muted);">Focus: Solar Farms, Grid Storage & Data Centers</div></td>
                  <td>Real Assets</td>
                  <td><strong>$185,000,000</strong></td>
                  <td><span class="wm-kpi-trend wm-trend-up">+14.6%</span></td>
                  <td><strong>+42.1%</strong></td>
                  <td>Moderate</td>
                  <td><span class="wm-status-pill wm-pill-completed">Open</span></td>
                  <td><button class="wm-action-btn" title="View Factsheet" onclick="openDetailsModal('Green Infrastructure REIT', 'Focus: Clean Energy & Hyperscale Infrastructure<br>AUM: $185,000,000 USD<br>Dividend Yield: 6.8% Cash Flow<br>Liquidity: Monthly Redemption')"><i class="fa-solid fa-eye"></i></button></td>
                </tr>
                <tr data-cat="Alternative">
                  <td><strong>Quantitative Market Neutral Arbitrage</strong><div style="font-size:0.75rem; color:var(--wm-body-muted);">Focus: Statistical Arbitrage & High-Frequency Yield</div></td>
                  <td>Alternative</td>
                  <td><strong>$140,000,000</strong></td>
                  <td><span class="wm-kpi-trend wm-trend-up">+16.2%</span></td>
                  <td><strong>+39.5%</strong></td>
                  <td>Moderate</td>
                  <td><span class="wm-status-pill wm-pill-completed">Open</span></td>
                  <td><button class="wm-action-btn" title="View Factsheet" onclick="openDetailsModal('Quantitative Market Neutral Arbitrage', 'Beta to Market: 0.08<br>AUM: $140,000,000 USD<br>Downside Deviation: 1.4%<br>Liquidity: Weekly')"><i class="fa-solid fa-eye"></i></button></td>
                </tr>
                <tr data-cat="Fixed Income">
                  <td><strong>High Yield Corporate Senior Debt</strong><div style="font-size:0.75rem; color:var(--wm-body-muted);">Focus: Senior Secured First-Lien Corporate Loans</div></td>
                  <td>Fixed Income</td>
                  <td><strong>$210,000,000</strong></td>
                  <td><span class="wm-kpi-trend wm-trend-up">+9.8%</span></td>
                  <td><strong>+26.4%</strong></td>
                  <td>Moderate</td>
                  <td><span class="wm-status-pill wm-pill-completed">Open</span></td>
                  <td><button class="wm-action-btn" title="View Factsheet" onclick="openDetailsModal('High Yield Senior Debt', 'Senior Secured First-Lien Portfolio<br>AUM: $210,000,000 USD<br>Average Coupon: 9.8% p.a.<br>Default Rate: 0.02%')"><i class="fa-solid fa-eye"></i></button></td>
                </tr>
                <tr data-cat="Real Assets">
                  <td><strong>Nordic Renewable Logistics REIT</strong><div style="font-size:0.75rem; color:var(--wm-body-muted);">Focus: Automated Logistics & Cold Storage Hubs</div></td>
                  <td>Real Assets</td>
                  <td><strong>$127,500,000</strong></td>
                  <td><span class="wm-kpi-trend wm-trend-up">+13.1%</span></td>
                  <td><strong>+38.0%</strong></td>
                  <td>Moderate</td>
                  <td><span class="wm-status-pill wm-pill-completed">Open</span></td>
                  <td><button class="wm-action-btn" title="View Factsheet" onclick="openDetailsModal('Nordic Renewable REIT', 'Focus: European Port & Cold Storage Logistics<br>AUM: $127,500,000 USD<br>Occupancy: 99.4%<br>Yield: 7.2% Net')"><i class="fa-solid fa-eye"></i></button></td>
                </tr>
                <tr data-cat="Private Equity">
                  <td><strong>Silicon Valley AI & Tech Venture</strong><div style="font-size:0.75rem; color:var(--wm-body-muted);">Focus: Foundation Models, Semiconductors & Robotics</div></td>
                  <td>Private Equity</td>
                  <td><strong>$175,000,000</strong></td>
                  <td><span class="wm-kpi-trend wm-trend-up">+34.2%</span></td>
                  <td><strong>+112.5%</strong></td>
                  <td>High Risk</td>
                  <td><span class="wm-status-pill wm-pill-completed">Open</span></td>
                  <td><button class="wm-action-btn" title="View Factsheet" onclick="openDetailsModal('Silicon Valley AI Venture', 'Venture Stage: Series A to Growth<br>AUM: $175,000,000 USD<br>Unrealized MOIC: 2.8x<br>Lead Advisor: Marcus Vance')"><i class="fa-solid fa-eye"></i></button></td>
                </tr>
                <tr data-cat="Alternative">
                  <td><strong>Swiss Franc Hedged Liquidity Shield</strong><div style="font-size:0.75rem; color:var(--wm-body-muted);">Focus: CHF Sovereign Paper & Gold Collateral</div></td>
                  <td>Alternative</td>
                  <td><strong>$156,000,000</strong></td>
                  <td><span class="wm-kpi-trend wm-trend-up">+4.8%</span></td>
                  <td><strong>+12.6%</strong></td>
                  <td>Very Low</td>
                  <td><span class="wm-status-pill wm-pill-completed">Open</span></td>
                  <td><button class="wm-action-btn" title="View Factsheet" onclick="openDetailsModal('Swiss Franc Liquidity Shield', 'Purpose: Tail-Risk Hedge & Currency Shield<br>AUM: $156,000,000 USD<br>Underlying: Swiss Confederation Bonds & Physical Bullion')"><i class="fa-solid fa-eye"></i></button></td>
                </tr>
                <tr data-cat="Equities">
                  <td><strong>Global Emerging Markets Growth</strong><div style="font-size:0.75rem; color:var(--wm-body-muted);">Focus: India, Southeast Asia & LatAm Consumer Titans</div></td>
                  <td>Equities</td>
                  <td><strong>$195,000,000</strong></td>
                  <td><span class="wm-kpi-trend wm-trend-up">+19.4%</span></td>
                  <td><strong>+51.2%</strong></td>
                  <td>High Risk</td>
                  <td><span class="wm-status-pill wm-pill-completed">Open</span></td>
                  <td><button class="wm-action-btn" title="View Factsheet" onclick="openDetailsModal('Global Emerging Markets', 'Demographic Dividend Strategy<br>AUM: $195,000,000 USD<br>Overweight: India & Southeast Asia<br>1Y Return: +19.4%')"><i class="fa-solid fa-eye"></i></button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- ====================================================================
           TAB 4: TRANSACTIONS
           ==================================================================== -->
      <section id="tab-transactions" class="wm-tab-view">
        <div class="wm-dash-title-bar">
          <div>
            <h1 class="wm-dash-page-title">Institutional Transaction Ledger</h1>
            <p class="wm-dash-page-subtitle">Real-time custody inflows, dividend payouts, securities clearance, and Fedwire settlements.</p>
          </div>
          <div style="display:flex; gap:10px;">
            <button class="wm-btn wm-btn-secondary" style="padding:10px 18px; font-size:0.85rem;" onclick="triggerToast('Daily settlement statement exported to CSV.')">
              <i class="fa-solid fa-file-csv"></i> Export Settlement Log
            </button>
            <button class="wm-btn wm-btn-primary" style="padding:10px 18px; font-size:0.85rem;" onclick="triggerToast('All pending custody clearance queues executed and verified with clearing houses.')">
              <i class="fa-solid fa-circle-check"></i> Execute Clearance Queue
            </button>
          </div>
        </div>

        <!-- 5 KPI Cards -->
        <div class="wm-kpi-grid">
          <div class="wm-kpi-card">
            <div class="wm-kpi-top">
              <div class="wm-kpi-icon"><i class="fa-solid fa-receipt"></i></div>
              <span class="wm-kpi-trend wm-trend-up">Today</span>
            </div>
            <div class="wm-kpi-val">$14,820,000</div>
            <div class="wm-kpi-lbl">Today's Settled Volume</div>
          </div>

          <div class="wm-kpi-card">
            <div class="wm-kpi-top">
              <div class="wm-kpi-icon"><i class="fa-solid fa-hourglass-half"></i></div>
              <span class="wm-kpi-trend" style="background:#fef9e7; color:#f39c12;">T+1 Window</span>
            </div>
            <div class="wm-kpi-val">$6,240,000</div>
            <div class="wm-kpi-lbl">Pending Custody Clearance</div>
          </div>

          <div class="wm-kpi-card">
            <div class="wm-kpi-top">
              <div class="wm-kpi-icon"><i class="fa-solid fa-hand-holding-dollar"></i></div>
              <span class="wm-kpi-trend wm-trend-up">Oct 2026</span>
            </div>
            <div class="wm-kpi-val">$3,950,000</div>
            <div class="wm-kpi-lbl">Monthly Dividends Disbursed</div>
          </div>

          <div class="wm-kpi-card">
            <div class="wm-kpi-top">
              <div class="wm-kpi-icon"><i class="fa-solid fa-vault"></i></div>
              <span class="wm-kpi-trend wm-trend-up">Instant</span>
            </div>
            <div class="wm-kpi-val">$142,500,000</div>
            <div class="wm-kpi-lbl">Liquid Cash Reserves</div>
          </div>

          <div class="wm-kpi-card">
            <div class="wm-kpi-top">
              <div class="wm-kpi-icon"><i class="fa-solid fa-circle-check"></i></div>
              <span class="wm-kpi-trend wm-trend-up">Zero Errors</span>
            </div>
            <div class="wm-kpi-val">100.0%</div>
            <div class="wm-kpi-lbl">Reconciliation Score</div>
          </div>
        </div>

        <!-- Charts Grid (3 charts) -->
        <div class="wm-charts-grid">
          <div class="wm-chart-card">
            <div class="wm-chart-header">
              <div class="wm-chart-title">30-Day Daily Settled Volume ($M)</div>
              <span class="wm-status-pill wm-pill-active">Volume Trend</span>
            </div>
            <div class="wm-chart-canvas-wrap">
              <canvas id="adminChartDailyVolume"></canvas>
            </div>
          </div>

          <div class="wm-chart-card">
            <div class="wm-chart-header">
              <div class="wm-chart-title">Settlement Status Distribution</div>
              <span class="wm-status-pill wm-pill-active">T+0 / T+1 Status</span>
            </div>
            <div class="wm-chart-canvas-wrap">
              <canvas id="adminChartTxStatus"></canvas>
            </div>
          </div>

          <div class="wm-chart-card" style="grid-column: 1 / -1;">
            <div class="wm-chart-header">
              <div class="wm-chart-title">Transaction Volume by Classification Type</div>
              <span class="wm-status-pill wm-pill-active">Classification Breakdown</span>
            </div>
            <div class="wm-chart-canvas-wrap" style="height:300px;">
              <canvas id="adminChartTxTypes"></canvas>
            </div>
          </div>
        </div>

        <!-- Master Transaction Ledger Table -->
        <div class="wm-table-card">
          <div class="wm-table-header">
            <div>
              <div style="font-size:1.1rem; font-weight:700; color:var(--wm-dark);">Institutional Transaction Records</div>
              <div style="font-size:0.8rem; color:var(--wm-body-muted);">Immutable audit trail synced with Federal Reserve wire and clearing partners</div>
            </div>
            <div class="wm-table-controls">
              <input type="text" id="txSearchInput" class="wm-table-search" placeholder="Search ref ID or client..." onkeyup="filterTxTable()">
              <select id="txTypeFilter" class="wm-table-select" onchange="filterTxTable()">
                <option value="all">All Types</option>
                <option value="Capital Inflow">Capital Inflow</option>
                <option value="Dividend Payout">Dividend Payout</option>
                <option value="Securities Acquisition">Securities Acquisition</option>
                <option value="Bond Redemption">Bond Redemption</option>
                <option value="Private Equity Call">Private Equity Call</option>
              </select>
              <select id="txStatusFilter" class="wm-table-select" onchange="filterTxTable()">
                <option value="all">All Statuses</option>
                <option value="Settled">Settled</option>
                <option value="Clearing">Clearing</option>
              </select>
            </div>
          </div>

          <div style="overflow-x:auto;">
            <table class="wm-dash-table" id="transactionsTable">
              <thead>
                <tr>
                  <th>Ref ID & Timestamp</th>
                  <th>Client Account</th>
                  <th>Transaction Type</th>
                  <th>Gross Amount</th>
                  <th>Custody Platform</th>
                  <th>Status</th>
                  <th>Audit Action</th>
                </tr>
              </thead>
              <tbody>
                <tr data-type="Private Equity Call" data-status="Settled">
                  <td><strong>#TX-99401</strong><div style="font-size:0.75rem; color:var(--wm-body-muted);">2026-11-04 09:15 EST</div></td>
                  <td>Sterling Heritage Trust (#STK-99014)</td>
                  <td>Private Equity Call</td>
                  <td><strong style="color:var(--wm-primary); font-size:1rem;">$4,500,000</strong></td>
                  <td>Charles Schwab Inst.</td>
                  <td><span class="wm-status-pill wm-pill-completed">Settled</span></td>
                  <td><button class="wm-action-btn" title="View Audit Slip" onclick="openDetailsModal('Audit Voucher #TX-99401', 'Reference: #TX-99401<br>Client: Sterling Heritage Trust<br>Type: Capital Call for Apex PE IV<br>Amount: $4,500,000.00 USD<br>Clearing: Schwab DTC 0164<br>Confirmation: FEDWIRE-99401827<br>Reconciled by: Custody Desk')"><i class="fa-solid fa-receipt"></i></button></td>
                </tr>

                <tr data-type="Capital Inflow" data-status="Settled">
                  <td><strong>#TX-99388</strong><div style="font-size:0.75rem; color:var(--wm-body-muted);">2026-11-03 16:40 EST</div></td>
                  <td>Dr. Vikram Patel (#STK-88241)</td>
                  <td>Capital Inflow</td>
                  <td><strong style="color:var(--wm-primary); font-size:1rem;">$1,850,000</strong></td>
                  <td>Fidelity Institutional</td>
                  <td><span class="wm-status-pill wm-pill-completed">Settled</span></td>
                  <td><button class="wm-action-btn" title="View Audit Slip" onclick="openDetailsModal('Audit Voucher #TX-99388', 'Reference: #TX-99388<br>Client: Dr. Vikram Patel<br>Type: Direct Wire Deposit<br>Amount: $1,850,000.00 USD<br>Custody: Fidelity Clearing Canada/US<br>Allocation: Stackly Global Alpha')"><i class="fa-solid fa-receipt"></i></button></td>
                </tr>

                <tr data-type="Securities Acquisition" data-status="Settled">
                  <td><strong>#TX-99375</strong><div style="font-size:0.75rem; color:var(--wm-body-muted);">2026-11-02 11:24 EST</div></td>
                  <td>Anandha Krishnan (#STK-8849201)</td>
                  <td>Securities Acquisition</td>
                  <td><strong style="color:var(--wm-primary); font-size:1rem;">$250,000</strong></td>
                  <td>Charles Schwab Inst.</td>
                  <td><span class="wm-status-pill wm-pill-completed">Settled</span></td>
                  <td><button class="wm-action-btn" title="View Audit Slip" onclick="openDetailsModal('Audit Voucher #TX-99375', 'Reference: #TX-99375<br>Client: Anandha Krishnan<br>Type: Sovereign Treasury 10Y Buy<br>Amount: $250,000.00 USD<br>Units: 2,500 @ $100.00<br>Custody: Charles Schwab #SCH-7729-19')"><i class="fa-solid fa-receipt"></i></button></td>
                </tr>

                <tr data-type="Dividend Payout" data-status="Clearing">
                  <td><strong>#TX-99360</strong><div style="font-size:0.75rem; color:var(--wm-body-muted);">2026-11-02 08:30 EST</div></td>
                  <td>Geneva Horizon Fund (#STK-66519)</td>
                  <td>Dividend Payout</td>
                  <td><strong style="color:var(--wm-primary); font-size:1rem;">$3,200,000</strong></td>
                  <td>BNY Mellon</td>
                  <td><span class="wm-status-pill wm-pill-pending">Clearing</span></td>
                  <td><button class="wm-action-btn" title="View Audit Slip" onclick="openDetailsModal('Audit Voucher #TX-99360', 'Reference: #TX-99360<br>Client: Geneva Horizon Fund<br>Type: Nordic REIT Distribution<br>Amount: $3,200,000.00 USD<br>Window: T+1 International Clearing<br>Custody: BNY Mellon')"><i class="fa-solid fa-receipt"></i></button></td>
                </tr>

                <tr data-type="Securities Acquisition" data-status="Settled">
                  <td><strong>#TX-99342</strong><div style="font-size:0.75rem; color:var(--wm-body-muted);">2026-11-01 14:10 EST</div></td>
                  <td>Marcus Aurelius Trust (#STK-22901)</td>
                  <td>Securities Acquisition</td>
                  <td><strong style="color:var(--wm-primary); font-size:1rem;">$6,100,000</strong></td>
                  <td>Charles Schwab Inst.</td>
                  <td><span class="wm-status-pill wm-pill-completed">Settled</span></td>
                  <td><button class="wm-action-btn" title="View Audit Slip" onclick="openDetailsModal('Audit Voucher #TX-99342', 'Reference: #TX-99342<br>Client: Marcus Aurelius Trust<br>Type: Quant Arbitrage Allocation<br>Amount: $6,100,000.00 USD<br>Custodian: Schwab Institutional')"><i class="fa-solid fa-receipt"></i></button></td>
                </tr>

                <tr data-type="Bond Redemption" data-status="Settled">
                  <td><strong>#TX-99318</strong><div style="font-size:0.75rem; color:var(--wm-body-muted);">2026-10-31 15:00 EST</div></td>
                  <td>Harrison & Vance Trust (#STK-77102)</td>
                  <td>Bond Redemption</td>
                  <td><strong style="color:var(--wm-primary); font-size:1rem;">$8,000,000</strong></td>
                  <td>Charles Schwab Inst.</td>
                  <td><span class="wm-status-pill wm-pill-completed">Settled</span></td>
                  <td><button class="wm-action-btn" title="View Audit Slip" onclick="openDetailsModal('Audit Voucher #TX-99318', 'Reference: #TX-99318<br>Client: Harrison & Vance Trust<br>Type: Maturity Redemption of 5Y Treasury<br>Principal: $8,000,000.00 USD<br>Settled: FedLine Wire Direct')"><i class="fa-solid fa-receipt"></i></button></td>
                </tr>

                <tr data-type="Dividend Payout" data-status="Settled">
                  <td><strong>#TX-99295</strong><div style="font-size:0.75rem; color:var(--wm-body-muted);">2026-10-30 10:15 EST</div></td>
                  <td>Elena Rostova (#STK-66519)</td>
                  <td>Dividend Payout</td>
                  <td><strong style="color:var(--wm-primary); font-size:1rem;">$750,000</strong></td>
                  <td>BNY Mellon</td>
                  <td><span class="wm-status-pill wm-pill-completed">Settled</span></td>
                  <td><button class="wm-action-btn" title="View Audit Slip" onclick="openDetailsModal('Audit Voucher #TX-99295', 'Reference: #TX-99295<br>Client: Elena Rostova<br>Type: Swiss Franc Yield Payout<br>Amount: $750,000.00 USD<br>Custody: BNY Mellon Zurich')"><i class="fa-solid fa-receipt"></i></button></td>
                </tr>

                <tr data-type="Capital Inflow" data-status="Settled">
                  <td><strong>#TX-99270</strong><div style="font-size:0.75rem; color:var(--wm-body-muted);">2026-10-29 11:45 EST</div></td>
                  <td>Rajeshwar Singhania (#STK-11409)</td>
                  <td>Capital Inflow</td>
                  <td><strong style="color:var(--wm-primary); font-size:1rem;">$5,000,000</strong></td>
                  <td>Fidelity Institutional</td>
                  <td><span class="wm-status-pill wm-pill-completed">Settled</span></td>
                  <td><button class="wm-action-btn" title="View Audit Slip" onclick="openDetailsModal('Audit Voucher #TX-99270', 'Reference: #TX-99270<br>Client: Rajeshwar Singhania<br>Type: Inflow into Clean Energy REIT<br>Amount: $5,000,000.00 USD<br>Custody: Fidelity')"><i class="fa-solid fa-receipt"></i></button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- ====================================================================
           TAB 5: ANALYTICS
           ==================================================================== -->
      <section id="tab-analytics" class="wm-tab-view">
        <div class="wm-dash-title-bar">
          <div>
            <h1 class="wm-dash-page-title">Advanced Quantitative Analytics & Risk Modeling</h1>
            <p class="wm-dash-page-subtitle">Monte Carlo capital projections, factor exposures, scenario stress testing, and alpha attribution.</p>
          </div>
          <div style="display:flex; gap:10px;">
            <button class="wm-btn wm-btn-secondary" style="padding:10px 18px; font-size:0.85rem;" onclick="triggerToast('Monte Carlo simulation package (10,000 paths) exported.')">
              <i class="fa-solid fa-chart-column"></i> Export Monte Carlo Data
            </button>
            <button class="wm-btn wm-btn-primary" style="padding:10px 18px; font-size:0.85rem;" onclick="triggerToast('Macroeconomic stress tests refreshed. Portfolio resilience rating: AAA.')">
              <i class="fa-solid fa-flask"></i> Run Macro Stress Test
            </button>
          </div>
        </div>

        <!-- 6 KPI Cards -->
        <div class="wm-kpi-grid">
          <div class="wm-kpi-card">
            <div class="wm-kpi-top">
              <div class="wm-kpi-icon"><i class="fa-solid fa-dice-d20"></i></div>
              <span class="wm-kpi-trend wm-trend-up">10,000 Runs</span>
            </div>
            <div class="wm-kpi-val">98.4%</div>
            <div class="wm-kpi-lbl">Monte Carlo Goal Probability</div>
          </div>

          <div class="wm-kpi-card">
            <div class="wm-kpi-top">
              <div class="wm-kpi-icon"><i class="fa-solid fa-scale-balanced"></i></div>
              <span class="wm-kpi-trend wm-trend-up">Defensive</span>
            </div>
            <div class="wm-kpi-val">0.74</div>
            <div class="wm-kpi-lbl">Portfolio Beta to S&P 500</div>
          </div>

          <div class="wm-kpi-card">
            <div class="wm-kpi-top">
              <div class="wm-kpi-icon"><i class="fa-solid fa-chart-line"></i></div>
              <span class="wm-kpi-trend wm-trend-up">Index -18.2%</span>
            </div>
            <div class="wm-kpi-val">-4.8%</div>
            <div class="wm-kpi-lbl">Maximum 3-Year Drawdown</div>
          </div>

          <div class="wm-kpi-card">
            <div class="wm-kpi-top">
              <div class="wm-kpi-icon"><i class="fa-solid fa-calculator"></i></div>
              <span class="wm-kpi-trend wm-trend-up">Institutional</span>
            </div>
            <div class="wm-kpi-val">1.88</div>
            <div class="wm-kpi-lbl">Portfolio Information Ratio</div>
          </div>

          <div class="wm-kpi-card">
            <div class="wm-kpi-top">
              <div class="wm-kpi-icon"><i class="fa-solid fa-shield-virus"></i></div>
              <span class="wm-kpi-trend wm-trend-up">Downside Shield</span>
            </div>
            <div class="wm-kpi-val">3.15</div>
            <div class="wm-kpi-lbl">Sortino Ratio (Downside Alpha)</div>
          </div>

          <div class="wm-kpi-card">
            <div class="wm-kpi-top">
              <div class="wm-kpi-icon"><i class="fa-solid fa-leaf"></i></div>
              <span class="wm-kpi-trend wm-trend-up">Verified Offset</span>
            </div>
            <div class="wm-kpi-val">42,000 MT</div>
            <div class="wm-kpi-lbl">Carbon Abatement Impact (CO2e)</div>
          </div>
        </div>

        <!-- 4 Analytics Charts Grid -->
        <div class="wm-charts-grid">
          <!-- Chart 1: Monte Carlo Simulation -->
          <div class="wm-chart-card">
            <div class="wm-chart-header">
              <div>
                <div class="wm-chart-title">10-Year Monte Carlo Projections</div>
                <div style="font-size:0.8rem; color:var(--wm-body-muted);">Median expectation vs 95th & 5th percentile confidence bands</div>
              </div>
              <span class="wm-status-pill wm-pill-active">98.4% Confidence</span>
            </div>
            <div class="wm-chart-canvas-wrap">
              <canvas id="adminChartMonteCarlo"></canvas>
            </div>
          </div>

          <!-- Chart 2: Net Flows Rolling 12 Months -->
          <div class="wm-chart-card">
            <div class="wm-chart-header">
              <div>
                <div class="wm-chart-title">Rolling 12-Month Net Capital Absorption</div>
                <div style="font-size:0.8rem; color:var(--wm-body-muted);">Capital additions vs rebalancing redeployments ($M)</div>
              </div>
              <span class="wm-status-pill wm-pill-active">+$310M Net</span>
            </div>
            <div class="wm-chart-canvas-wrap">
              <canvas id="adminChartNetFlows"></canvas>
            </div>
          </div>

          <!-- Chart 3: Client Risk Appetite -->
          <div class="wm-chart-card">
            <div class="wm-chart-header">
              <div>
                <div class="wm-chart-title">Client Portfolio Risk Mandates</div>
                <div style="font-size:0.8rem; color:var(--wm-body-muted);">Risk tolerance classification across 1,428 accounts</div>
              </div>
              <span class="wm-status-pill wm-pill-active">Fiduciary Mandates</span>
            </div>
            <div class="wm-chart-canvas-wrap">
              <canvas id="adminChartRiskAppetite"></canvas>
            </div>
          </div>

          <!-- Chart 4: Geographic Exposure -->
          <div class="wm-chart-card">
            <div class="wm-chart-header">
              <div>
                <div class="wm-chart-title">Global Sovereign & Asset Exposure</div>
                <div style="font-size:0.8rem; color:var(--wm-body-muted);">Jurisdictional risk distribution</div>
              </div>
              <span class="wm-status-pill wm-pill-active">Global Reach</span>
            </div>
            <div class="wm-chart-canvas-wrap">
              <canvas id="adminChartGeoExposure"></canvas>
            </div>
          </div>
        </div>

        <!-- Strategy Performance Comparison Matrix Table -->
        <div class="wm-table-card">
          <div class="wm-table-header">
            <div>
              <div style="font-size:1.1rem; font-weight:700; color:var(--wm-dark);">Flagship Strategy Risk-Adjusted Comparison Matrix</div>
              <div style="font-size:0.8rem; color:var(--wm-body-muted);">Standardized comparison against S&P 500, MSCI World, and Bloomberg Global Aggregate</div>
            </div>
          </div>

          <div style="overflow-x:auto;">
            <table class="wm-dash-table">
              <thead>
                <tr>
                  <th>Strategy Model</th>
                  <th>1-Yr Return</th>
                  <th>3-Yr Annualized</th>
                  <th>Annual Volatility</th>
                  <th>Sharpe Ratio</th>
                  <th>Max Drawdown</th>
                  <th>Benchmark Alpha</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Stackly Global Alpha Equities</strong></td>
                  <td><span class="wm-kpi-trend wm-trend-up">+24.2%</span></td>
                  <td><strong>+18.4%</strong></td>
                  <td>11.2%</td>
                  <td><strong>2.38</strong></td>
                  <td>-4.8%</td>
                  <td><span class="wm-status-pill wm-pill-completed">+5.8% vs S&P 500</span></td>
                </tr>
                <tr>
                  <td><strong>Sovereign Treasury Yield Plus</strong></td>
                  <td><span class="wm-kpi-trend wm-trend-up">+7.4%</span></td>
                  <td><strong>+5.8%</strong></td>
                  <td>3.6%</td>
                  <td><strong>2.05</strong></td>
                  <td>-1.2%</td>
                  <td><span class="wm-status-pill wm-pill-completed">+2.4% vs Agg</span></td>
                </tr>
                <tr>
                  <td><strong>Apex Private Equity IV</strong></td>
                  <td><span class="wm-kpi-trend wm-trend-up">+28.5%</span></td>
                  <td><strong>+24.1%</strong></td>
                  <td>14.0%</td>
                  <td><strong>2.44</strong></td>
                  <td>-3.5%</td>
                  <td><span class="wm-status-pill wm-pill-completed">+11.2% vs Russell</span></td>
                </tr>
                <tr>
                  <td><strong>Green Infrastructure Real Assets</strong></td>
                  <td><span class="wm-kpi-trend wm-trend-up">+14.6%</span></td>
                  <td><strong>+12.8%</strong></td>
                  <td>7.8%</td>
                  <td><strong>2.18</strong></td>
                  <td>-2.9%</td>
                  <td><span class="wm-status-pill wm-pill-completed">+4.6% vs MSCI REIT</span></td>
                </tr>
                <tr>
                  <td><strong>Market Neutral Quant Arbitrage</strong></td>
                  <td><span class="wm-kpi-trend wm-trend-up">+16.2%</span></td>
                  <td><strong>+11.9%</strong></td>
                  <td>4.2%</td>
                  <td><strong>2.82</strong></td>
                  <td>-0.8%</td>
                  <td><span class="wm-status-pill wm-pill-completed">+8.4% vs Cash</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

    </main>
  </div>

  <!-- ==========================================================================
       Interactive Details Modal (Reusable across tables)
       ========================================================================== -->
  <div class="wm-modal-overlay" id="detailsModal">
    <div class="wm-modal-card">
      <button class="wm-modal-close" onclick="closeDetailsModal()" aria-label="Close modal">
        <i class="fa-solid fa-xmark"></i>
      </button>
      <div style="display:flex; align-items:center; gap:12px; margin-bottom:16px;">
        <div class="wm-logo-icon" style="width:40px; height:40px; font-size:1rem;">
          <i class="fa-solid fa-file-lines"></i>
        </div>
        <div>
          <h3 id="modalTitle" style="font-size:1.25rem; font-weight:700; color:var(--wm-dark); margin:0;">Record Details</h3>
          <span style="font-size:0.75rem; color:var(--wm-body-muted);">Verified Stackly Institutional Audit Record</span>
        </div>
      </div>
      <div id="modalBody" style="background:var(--wm-surface); padding:20px; border-radius:var(--wm-radius-md); font-size:0.9rem; line-height:1.7; color:var(--wm-dark); margin-bottom:20px; font-family:monospace;">
        <!-- Injected details -->
      </div>
      <div style="display:flex; justify-content:flex-end; gap:10px;">
        <button class="wm-btn wm-btn-secondary" style="padding:8px 18px; font-size:0.85rem;" onclick="triggerToast('Record exported to signed audit PDF.'); closeDetailsModal();">
          <i class="fa-solid fa-file-pdf"></i> Download PDF
        </button>
        <button class="wm-btn wm-btn-primary" style="padding:8px 18px; font-size:0.85rem;" onclick="closeDetailsModal()">
          Close
        </button>
      </div>
    </div>
  </div>

  <!-- Reusable Toast Notification -->
  <div class="wm-toast" id="dashToast">
    <i class="fa-solid fa-circle-check" style="color:var(--wm-secondary); font-size:1.2rem;"></i>
    <span id="dashToastText">Action completed successfully.</span>
  </div>

  <!-- ==========================================================================
       Dashboard JavaScript (Tab Toggling, Chart.js, Search/Filter, Mobile Nav)
       ========================================================================== -->
  <script>
    // --- 1. Tab Toggling System (5 Strict Tabs) ---
    const sidebarBtns = document.querySelectorAll('.wm-sidebar-btn');
    const tabViews = document.querySelectorAll('.wm-tab-view');

    function switchTab(targetTabId) {
      sidebarBtns.forEach(btn => {
        if (btn.getAttribute('data-tab') === targetTabId) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });

      tabViews.forEach(view => {
        if (view.id === targetTabId) {
          view.classList.add('active');
        } else {
          view.classList.remove('active');
        }
      });

      // Close mobile sidebar on tab switch
      const sidebar = document.getElementById('dashSidebar');
      if (sidebar && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
      }

      // Trigger Chart.js resize/render on newly revealed canvas
      window.dispatchEvent(new Event('resize'));
    }

    sidebarBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        switchTab(targetTab);
      });
    });

    // --- 2. Mobile Sidebar Toggle ---
    const sidebarToggle = document.getElementById('sidebarToggle');
    const dashSidebar = document.getElementById('dashSidebar');
    if (sidebarToggle && dashSidebar) {
      sidebarToggle.addEventListener('click', () => {
        dashSidebar.classList.toggle('open');
      });
    }

    // --- 3. Toast Notification Helper ---
    function triggerToast(message) {
      const toast = document.getElementById('dashToast');
      const text = document.getElementById('dashToastText');
      if (toast && text) {
        text.innerText = message;
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
        }, 4000);
      }
    }

    // --- 4. Modal Open / Close Helper ---
    function openDetailsModal(title, htmlContent) {
      const modal = document.getElementById('detailsModal');
      const titleEl = document.getElementById('modalTitle');
      const bodyEl = document.getElementById('modalBody');
      if (modal && titleEl && bodyEl) {
        titleEl.innerText = title;
        bodyEl.innerHTML = htmlContent;
        modal.classList.add('active');
      }
    }

    function closeDetailsModal() {
      const modal = document.getElementById('detailsModal');
      if (modal) modal.classList.remove('active');
    }

    // --- 5. Notifications Bell Handler ---
    const notifBtn = document.getElementById('notifBtn');
    if (notifBtn) {
      notifBtn.addEventListener('click', () => {
        triggerToast('All 14 custody accounts reconciled with zero variance. Schwab statements ready.');
      });
    }

    // --- 6. Table Filter Functions (No Embedded Forms) ---
    function filterClientsTable() {
      const search = document.getElementById('clientSearchInput').value.toLowerCase();
      const tier = document.getElementById('clientTierFilter').value;
      const risk = document.getElementById('clientRiskFilter').value;
      const rows = document.querySelectorAll('#clientsTable tbody tr');

      rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        const rowTier = row.getAttribute('data-tier') || '';
        const rowRisk = row.getAttribute('data-risk') || '';

        const matchesSearch = text.includes(search);
        const matchesTier = (tier === 'all' || rowTier === tier);
        const matchesRisk = (risk === 'all' || rowRisk === risk);

        if (matchesSearch && matchesTier && matchesRisk) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    }

    function filterFundsTable() {
      const search = document.getElementById('fundSearchInput').value.toLowerCase();
      const cat = document.getElementById('fundCategoryFilter').value;
      const rows = document.querySelectorAll('#fundsTable tbody tr');

      rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        const rowCat = row.getAttribute('data-cat') || '';

        const matchesSearch = text.includes(search);
        const matchesCat = (cat === 'all' || rowCat === cat);

        if (matchesSearch && matchesCat) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    }

    function filterTxTable() {
      const search = document.getElementById('txSearchInput').value.toLowerCase();
      const type = document.getElementById('txTypeFilter').value;
      const status = document.getElementById('txStatusFilter').value;
      const rows = document.querySelectorAll('#transactionsTable tbody tr');

      rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        const rowType = row.getAttribute('data-type') || '';
        const rowStatus = row.getAttribute('data-status') || '';

        const matchesSearch = text.includes(search);
        const matchesType = (type === 'all' || rowType === type);
        const matchesStatus = (status === 'all' || rowStatus === status);

        if (matchesSearch && matchesType && matchesStatus) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    }

    // --- 7. Initialize Chart.js Charts ---
    document.addEventListener('DOMContentLoaded', () => {
      // Global Chart.js styling
      Chart.defaults.font.family = "'Outfit', sans-serif";
      Chart.defaults.color = '#6c757d';

      // --- Chart 1: Overview AUM Line Chart ---
      const ctxAUM = document.getElementById('adminChartAUM');
      if (ctxAUM) {
        new Chart(ctxAUM, {
          type: 'line',
          data: {
            labels: ['2020', '2021', '2022', '2023', '2024', '2025', '2026'],
            datasets: [{
              label: 'AUM ($ Billions)',
              data: [0.85, 1.20, 1.55, 1.95, 2.30, 2.58, 2.84],
              borderColor: '#195353',
              backgroundColor: 'rgba(25, 83, 83, 0.12)',
              borderWidth: 3,
              fill: true,
              tension: 0.35,
              pointBackgroundColor: '#E5FF5E',
              pointBorderColor: '#195353',
              pointRadius: 5
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              y: {
                ticks: { callback: v => '$' + v + 'B' },
                grid: { color: 'rgba(0,0,0,0.05)' }
              },
              x: { grid: { display: false } }
            }
          }
        });
      }

      // --- Chart 2: Overview Inflows vs Outflows ---
      const ctxInflows = document.getElementById('adminChartInflows');
      if (ctxInflows) {
        new Chart(ctxInflows, {
          type: 'bar',
          data: {
            labels: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
            datasets: [
              {
                label: 'Inflows ($M)',
                data: [38, 42, 35, 48, 52, 45, 50, 47, 54, 51, 49, 48.6],
                backgroundColor: '#195353',
                borderRadius: 4
              },
              {
                label: 'Rebalanced ($M)',
                data: [12, 15, 11, 18, 14, 16, 15, 13, 19, 14, 16, 14.8],
                backgroundColor: '#E5FF5E',
                borderRadius: 4
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: { ticks: { callback: v => '$' + v + 'M' }, grid: { color: 'rgba(0,0,0,0.05)' } },
              x: { grid: { display: false } }
            }
          }
        });
      }

      // --- Chart 3: Client Growth ---
      const ctxClients = document.getElementById('adminChartClients');
      if (ctxClients) {
        new Chart(ctxClients, {
          type: 'line',
          data: {
            labels: ['Q1 24', 'Q2 24', 'Q3 24', 'Q4 24', 'Q1 25', 'Q2 25', 'Q3 25', 'Q4 25', 'Q1 26', 'Q2 26', 'Q3 26'],
            datasets: [{
              label: 'Institutional Accounts',
              data: [920, 975, 1040, 1110, 1180, 1245, 1310, 1360, 1395, 1412, 1428],
              borderColor: '#236f6f',
              backgroundColor: 'rgba(35, 111, 111, 0.1)',
              fill: true,
              tension: 0.3,
              pointBackgroundColor: '#195353',
              pointRadius: 4
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              y: { grid: { color: 'rgba(0,0,0,0.05)' } },
              x: { grid: { display: false } }
            }
          }
        });
      }

      // --- Chart 4: Revenue Streams Doughnut ---
      const ctxRevenue = document.getElementById('adminChartRevenue');
      if (ctxRevenue) {
        new Chart(ctxRevenue, {
          type: 'doughnut',
          data: {
            labels: ['Equities Alpha (42%)', 'Fixed Income (25%)', 'Private Equity (18%)', 'Real Assets (10%)', 'ESG / Alts (5%)'],
            datasets: [{
              data: [42, 25, 18, 10, 5],
              backgroundColor: ['#195353', '#236f6f', '#E5FF5E', '#021623', '#27ae60'],
              borderWidth: 2,
              borderColor: '#ffffff'
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: 'right', labels: { boxWidth: 12 } }
            }
          }
        });
      }

      // --- Tab 2: Client Tiers Bar ---
      const ctxTiers = document.getElementById('adminChartClientTiers');
      if (ctxTiers) {
        new Chart(ctxTiers, {
          type: 'bar',
          data: {
            labels: ['$1M–$5M', '$5M–$10M', '$10M–$25M', '$25M–$50M', '$50M+'],
            datasets: [{
              label: 'Account Count',
              data: [610, 506, 184, 88, 40],
              backgroundColor: '#195353',
              borderRadius: 6
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              y: { grid: { color: 'rgba(0,0,0,0.05)' } },
              x: { grid: { display: false } }
            }
          }
        });
      }

      // --- Tab 2: Investor Type Pie ---
      const ctxInvType = document.getElementById('adminChartInvestorType');
      if (ctxInvType) {
        new Chart(ctxInvType, {
          type: 'pie',
          data: {
            labels: ['Family Offices (38%)', 'Accredited Individuals (34%)', 'Corporate Treasuries (18%)', 'Endowments & Trusts (10%)'],
            datasets: [{
              data: [38, 34, 18, 10],
              backgroundColor: ['#195353', '#E5FF5E', '#236f6f', '#021623'],
              borderColor: '#ffffff',
              borderWidth: 2
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'bottom', labels: { boxWidth: 12 } } }
          }
        });
      }

      // --- Tab 3: Performance Benchmark ---
      const ctxPerf = document.getElementById('adminChartPerfBenchmark');
      if (ctxPerf) {
        new Chart(ctxPerf, {
          type: 'line',
          data: {
            labels: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
            datasets: [
              {
                label: 'Stackly Flagship Composite (+18.4%)',
                data: [100, 102.4, 104.1, 107.0, 109.8, 111.4, 113.2, 114.8, 116.5, 117.2, 118.0, 118.4],
                borderColor: '#195353',
                backgroundColor: 'rgba(25, 83, 83, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.3
              },
              {
                label: 'S&P 500 Index (+14.2%)',
                data: [100, 101.8, 102.5, 104.2, 106.1, 108.0, 109.5, 110.8, 112.4, 113.1, 113.8, 114.2],
                borderColor: '#6c757d',
                borderDash: [5, 5],
                borderWidth: 2,
                tension: 0.3
              },
              {
                label: 'Bloomberg Global Agg (+4.8%)',
                data: [100, 100.5, 101.0, 101.8, 102.4, 103.0, 103.5, 103.8, 104.2, 104.5, 104.6, 104.8],
                borderColor: '#e74c3c',
                borderDash: [3, 3],
                borderWidth: 1.5,
                tension: 0.3
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: { ticks: { callback: v => v + ' pts' }, grid: { color: 'rgba(0,0,0,0.05)' } },
              x: { grid: { display: false } }
            }
          }
        });
      }

      // --- Tab 3: Asset Allocation Pie ---
      const ctxAssetAlloc = document.getElementById('adminChartAssetAllocation');
      if (ctxAssetAlloc) {
        new Chart(ctxAssetAlloc, {
          type: 'doughnut',
          data: {
            labels: ['Equities (41.5%)', 'Fixed Income (24.0%)', 'Private Equity (18.0%)', 'Real Assets (11.0%)', 'Alternatives (5.5%)'],
            datasets: [{
              data: [41.5, 24.0, 18.0, 11.0, 5.5],
              backgroundColor: ['#195353', '#236f6f', '#E5FF5E', '#021623', '#27ae60'],
              borderWidth: 2
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'bottom', labels: { boxWidth: 10 } } }
          }
        });
      }

      // --- Tab 3: Strategy Yield Bar ---
      const ctxStratYield = document.getElementById('adminChartStrategyYield');
      if (ctxStratYield) {
        new Chart(ctxStratYield, {
          type: 'bar',
          data: {
            labels: ['Global Alpha', 'Treasury Plus', 'Apex PE IV', 'Green REIT', 'Quant Arb', 'High Yield', 'Nordic Log.', 'AI Venture'],
            datasets: [{
              label: '1-Year Return (%)',
              data: [24.2, 7.4, 28.5, 14.6, 16.2, 9.8, 13.1, 34.2],
              backgroundColor: '#195353',
              borderRadius: 6
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: { ticks: { callback: v => v + '%' }, grid: { color: 'rgba(0,0,0,0.05)' } },
              x: { grid: { display: false } }
            }
          }
        });
      }

      // --- Tab 4: Daily Volume Line ---
      const ctxDailyVol = document.getElementById('adminChartDailyVolume');
      if (ctxDailyVol) {
        new Chart(ctxDailyVol, {
          type: 'line',
          data: {
            labels: ['1', '3', '5', '7', '9', '11', '13', '15', '17', '19', '21', '23', '25', '27', '29', '31'],
            datasets: [{
              label: 'Settled Volume ($M)',
              data: [12.4, 14.2, 10.8, 18.5, 16.0, 11.2, 13.5, 19.8, 22.0, 15.4, 14.8, 17.2, 13.9, 16.5, 18.1, 14.8],
              borderColor: '#195353',
              backgroundColor: 'rgba(25, 83, 83, 0.15)',
              fill: true,
              tension: 0.35,
              pointRadius: 3
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              y: { ticks: { callback: v => '$' + v + 'M' }, grid: { color: 'rgba(0,0,0,0.05)' } },
              x: { grid: { display: false } }
            }
          }
        });
      }

      // --- Tab 4: Tx Status Doughnut ---
      const ctxTxStat = document.getElementById('adminChartTxStatus');
      if (ctxTxStat) {
        new Chart(ctxTxStat, {
          type: 'doughnut',
          data: {
            labels: ['Settled & Cleared (94%)', 'Clearing T+1 (4%)', 'Escrow Hold (2%)'],
            datasets: [{
              data: [94, 4, 2],
              backgroundColor: ['#27ae60', '#f39c12', '#021623'],
              borderWidth: 2
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'bottom', labels: { boxWidth: 10 } } }
          }
        });
      }

      // --- Tab 4: Tx Types Bar ---
      const ctxTxTypes = document.getElementById('adminChartTxTypes');
      if (ctxTxTypes) {
        new Chart(ctxTxTypes, {
          type: 'bar',
          data: {
            labels: ['Capital Inflow', 'Securities Buy', 'Dividend Payout', 'PE Capital Call', 'Bond Redemption', 'Rebalance Transfer'],
            datasets: [{
              label: 'Volume ($M)',
              data: [48.6, 32.4, 19.8, 14.5, 8.0, 16.2],
              backgroundColor: '#195353',
              borderRadius: 6
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: { ticks: { callback: v => '$' + v + 'M' }, grid: { color: 'rgba(0,0,0,0.05)' } },
              x: { grid: { display: false } }
            }
          }
        });
      }

      // --- Tab 5: Monte Carlo Line ---
      const ctxMonte = document.getElementById('adminChartMonteCarlo');
      if (ctxMonte) {
        new Chart(ctxMonte, {
          type: 'line',
          data: {
            labels: ['Year 0', 'Year 2', 'Year 4', 'Year 6', 'Year 8', 'Year 10'],
            datasets: [
              {
                label: '95th Percentile ($4.8M)',
                data: [1.48, 1.95, 2.65, 3.45, 4.10, 4.85],
                borderColor: '#27ae60',
                borderWidth: 2,
                tension: 0.3
              },
              {
                label: 'Median Path ($3.2M)',
                data: [1.48, 1.75, 2.15, 2.55, 2.90, 3.25],
                borderColor: '#195353',
                backgroundColor: 'rgba(25, 83, 83, 0.12)',
                fill: true,
                borderWidth: 3,
                tension: 0.3
              },
              {
                label: '5th Percentile ($2.1M)',
                data: [1.48, 1.55, 1.70, 1.85, 1.98, 2.12],
                borderColor: '#e74c3c',
                borderDash: [4, 4],
                borderWidth: 1.5,
                tension: 0.3
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: { ticks: { callback: v => '$' + v + 'M' }, grid: { color: 'rgba(0,0,0,0.05)' } },
              x: { grid: { display: false } }
            }
          }
        });
      }

      // --- Tab 5: Net Flows Bar ---
      const ctxNetFlows = document.getElementById('adminChartNetFlows');
      if (ctxNetFlows) {
        new Chart(ctxNetFlows, {
          type: 'bar',
          data: {
            labels: ['Q1 24', 'Q2 24', 'Q3 24', 'Q4 24', 'Q1 25', 'Q2 25', 'Q3 25', 'Q4 25', 'Q1 26', 'Q2 26', 'Q3 26'],
            datasets: [{
              label: 'Net Absorbed Capital ($M)',
              data: [58, 64, 72, 80, 85, 92, 98, 105, 112, 118, 126],
              backgroundColor: '#195353',
              borderRadius: 5
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: { ticks: { callback: v => '$' + v + 'M' }, grid: { color: 'rgba(0,0,0,0.05)' } },
              x: { grid: { display: false } }
            }
          }
        });
      }

      // --- Tab 5: Client Risk Appetite Doughnut ---
      const ctxRiskApp = document.getElementById('adminChartRiskAppetite');
      if (ctxRiskApp) {
        new Chart(ctxRiskApp, {
          type: 'doughnut',
          data: {
            labels: ['Moderate Growth (38%)', 'Aggressive Growth (32%)', 'Conservative Yield (18%)', 'Capital Preservation (12%)'],
            datasets: [{
              data: [38, 32, 18, 12],
              backgroundColor: ['#195353', '#E5FF5E', '#236f6f', '#021623'],
              borderWidth: 2
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'bottom', labels: { boxWidth: 10 } } }
          }
        });
      }

      // --- Tab 5: Geographic Exposure Bar ---
      const ctxGeoExp = document.getElementById('adminChartGeoExposure');
      if (ctxGeoExp) {
        new Chart(ctxGeoExp, {
          type: 'bar',
          data: {
            labels: ['North America (52%)', 'Western Europe (24%)', 'Asia Pacific (16%)', 'LatAm & Middle East (8%)'],
            datasets: [{
              label: 'Geographic Weight (%)',
              data: [52, 24, 16, 8],
              backgroundColor: ['#195353', '#236f6f', '#E5FF5E', '#021623'],
              borderRadius: 6
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              y: { ticks: { callback: v => v + '%' }, grid: { color: 'rgba(0,0,0,0.05)' } },
              x: { grid: { display: false } }
            }
          }
        });
      }
    });
  </script>
</body>
</html>
`;

fs.writeFileSync('admin-dashboard.html', adminHtml, 'utf8');
console.log('admin-dashboard.html successfully generated! Length:', adminHtml.length);
