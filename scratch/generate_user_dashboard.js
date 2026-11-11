const fs = require('fs');

const userHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Client Wealth Portal | Stackly Wealth Management</title>
  <meta name="description" content="Secure client portal for Stackly Wealth Management. Review investment performance, track financial goals, message your dedicated fiduciary advisor, and explore curated financial products.">
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
       Client Portal Top Navigation Bar
       ========================================================================== -->
  <header class="wm-dash-header">
    <div class="wm-dash-header-left">
      <button id="userSidebarToggle" class="wm-sidebar-toggle-btn" aria-label="Toggle Sidebar Navigation">
        <i class="fa-solid fa-bars"></i>
      </button>
      <a href="index.html" class="wm-logo" style="text-decoration:none;">
        <div class="wm-logo-icon">
          <i class="fa-solid fa-chart-line"></i>
        </div>
        <div class="wm-logo-text">STACK<span>LY</span></div>
      </a>
      <span class="wm-dash-badge">Client Portal</span>
      <div style="background:var(--wm-surface); border:1px solid var(--wm-border-light); padding:4px 12px; border-radius:var(--wm-radius-full); font-size:0.75rem; color:var(--wm-dark); display:none; @media(min-width:1100px){display:flex; align-items:center; gap:8px;}">
        <span style="color:var(--wm-body-muted);">Net Worth:</span>
        <strong style="color:var(--wm-primary); font-size:0.85rem;">$1,482,900.00</strong>
        <span class="wm-kpi-trend wm-trend-up" style="font-size:0.7rem; padding:1px 6px;">+12.6% YTD</span>
      </div>
    </div>

    <div class="wm-dash-header-right">
      <!-- Notification Button -->
      <button class="wm-notif-btn" id="userNotifBtn" title="View Notifications" aria-label="Notifications">
        <i class="fa-regular fa-bell"></i>
        <span class="wm-notif-dot"></span>
      </button>

      <!-- Profile Pill -->
      <div class="wm-dash-profile-pill">
        <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80" alt="Anandha Krishnan" class="wm-dash-profile-avatar">
        <div>
          <div class="wm-dash-profile-name">Anandha Krishnan</div>
          <div class="wm-dash-profile-role">Private Wealth Client</div>
        </div>
      </div>

      <!-- Sign Out Button -->
      <a href="login.html" class="wm-dash-logout-btn" title="Sign out of portal">
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
    <aside class="wm-dash-sidebar" id="userDashSidebar">
      <nav class="wm-sidebar-nav">
        <!-- STRICT CONSTRAINT: EXACTLY 5 MENU OPTIONS -->
        <button class="wm-sidebar-btn active" data-tab="tab-user-overview">
          <i class="fa-solid fa-gauge-high"></i>
          <span>Overview</span>
        </button>
        <button class="wm-sidebar-btn" data-tab="tab-user-investments">
          <i class="fa-solid fa-wallet"></i>
          <span>My Investments</span>
        </button>
        <button class="wm-sidebar-btn" data-tab="tab-user-messages">
          <i class="fa-solid fa-comments"></i>
          <span>Messages</span>
        </button>
        <button class="wm-sidebar-btn" data-tab="tab-user-products">
          <i class="fa-solid fa-cubes"></i>
          <span>Financial Products</span>
        </button>
        <button class="wm-sidebar-btn" data-tab="tab-user-profile">
          <i class="fa-solid fa-user-shield"></i>
          <span>Profile</span>
        </button>
      </nav>

      <div class="wm-sidebar-footer">
        <div style="font-weight:700; color:var(--wm-white); margin-bottom:4px;">Private Client Services</div>
        <div style="margin-bottom:6px; font-size:0.75rem; color:rgba(255,255,255,0.7);">Dedicated Fiduciary Advisor:</div>
        <div style="display:flex; align-items:center; gap:8px; background:rgba(255,255,255,0.06); padding:8px; border-radius:6px;">
          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80" alt="Marcus Vance" style="width:28px; height:28px; border-radius:50%; object-fit:cover;">
          <div>
            <div style="font-weight:700; color:var(--wm-white); font-size:0.8rem;">Marcus Vance, CFA</div>
            <div style="font-size:0.68rem; color:var(--wm-secondary);"><i class="fa-solid fa-circle" style="font-size:0.4rem; vertical-align:middle;"></i> Online Now</div>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="wm-dash-main">

      <!-- ====================================================================
           TAB 1: USER OVERVIEW (Active by default)
           ==================================================================== -->
      <section id="tab-user-overview" class="wm-tab-view active">
        <!-- Page Title & Actions -->
        <div class="wm-dash-title-bar">
          <div>
            <h1 class="wm-dash-page-title">Welcome back, Anandha Krishnan</h1>
            <p class="wm-dash-page-subtitle">Account #STK-8849201 • Custody: Charles Schwab Institutional • Tier 3 Accredited</p>
          </div>
          <div style="display:flex; gap:10px; flex-wrap:wrap;">
            <button class="wm-btn wm-btn-secondary" style="padding:10px 18px; font-size:0.85rem;" onclick="triggerToast('Official Charles Schwab October 2026 Statement downloaded.')">
              <i class="fa-solid fa-file-invoice-dollar"></i> October Statement
            </button>
            <button class="wm-btn wm-btn-primary" style="padding:10px 18px; font-size:0.85rem;" onclick="triggerToast('Consultation request sent to Marcus Vance, CFA. Your advisor will confirm via Messages.')">
              <i class="fa-solid fa-calendar-plus"></i> Request Advisory Call
            </button>
          </div>
        </div>

        <!-- 5 KPI Cards -->
        <div class="wm-kpi-grid">
          <div class="wm-kpi-card">
            <div class="wm-kpi-top">
              <div class="wm-kpi-icon"><i class="fa-solid fa-vault"></i></div>
              <span class="wm-kpi-trend wm-trend-up"><i class="fa-solid fa-arrow-trend-up"></i> +12.6% YTD</span>
            </div>
            <div class="wm-kpi-val">$1,482,900</div>
            <div class="wm-kpi-lbl">Total Net Portfolio Value</div>
          </div>

          <div class="wm-kpi-card">
            <div class="wm-kpi-top">
              <div class="wm-kpi-icon"><i class="fa-solid fa-seedling"></i></div>
              <span class="wm-kpi-trend wm-trend-up">Cost Basis</span>
            </div>
            <div class="wm-kpi-val">$1,220,000</div>
            <div class="wm-kpi-lbl">Total Invested Principal</div>
          </div>

          <div class="wm-kpi-card">
            <div class="wm-kpi-top">
              <div class="wm-kpi-icon"><i class="fa-solid fa-chart-line"></i></div>
              <span class="wm-kpi-trend wm-trend-up">+21.5% ROI</span>
            </div>
            <div class="wm-kpi-val">+$262,900</div>
            <div class="wm-kpi-lbl">Unrealized Capital Gains</div>
          </div>

          <div class="wm-kpi-card">
            <div class="wm-kpi-top">
              <div class="wm-kpi-icon"><i class="fa-solid fa-hand-holding-dollar"></i></div>
              <span class="wm-kpi-trend wm-trend-up">3.25% Yield</span>
            </div>
            <div class="wm-kpi-val">$48,250</div>
            <div class="wm-kpi-lbl">Annual Projected Dividend Yield</div>
          </div>

          <div class="wm-kpi-card">
            <div class="wm-kpi-top">
              <div class="wm-kpi-icon"><i class="fa-solid fa-coins"></i></div>
              <span class="wm-kpi-trend wm-trend-up">5.1% APY</span>
            </div>
            <div class="wm-kpi-val">$94,500</div>
            <div class="wm-kpi-lbl">Liquid Cash Sweep Reserves</div>
          </div>
        </div>

        <!-- Charts Grid (2 Charts) -->
        <div class="wm-charts-grid">
          <!-- Chart 1: Portfolio Growth -->
          <div class="wm-chart-card">
            <div class="wm-chart-header">
              <div>
                <div class="wm-chart-title">Portfolio Capital Growth (Past 24 Months)</div>
                <div style="font-size:0.8rem; color:var(--wm-body-muted);">Compounded returns including dividend reinvestment</div>
              </div>
              <span class="wm-status-pill wm-pill-active">+$332,900 Gain</span>
            </div>
            <div class="wm-chart-canvas-wrap">
              <canvas id="userChartGrowth"></canvas>
            </div>
          </div>

          <!-- Chart 2: Asset Allocation -->
          <div class="wm-chart-card">
            <div class="wm-chart-header">
              <div>
                <div class="wm-chart-title">Strategic Asset Allocation</div>
                <div style="font-size:0.8rem; color:var(--wm-body-muted);">Multi-asset diversification breakdown</div>
              </div>
              <span class="wm-status-pill wm-pill-active">Target Balanced</span>
            </div>
            <div class="wm-chart-canvas-wrap">
              <canvas id="userChartAlloc"></canvas>
            </div>
          </div>
        </div>

        <!-- Goals Progress & Advisor Recommendation Grid -->
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:24px; margin-bottom:30px;">
          <!-- Financial Goals -->
          <div class="wm-chart-card">
            <div style="font-weight:700; color:var(--wm-dark); font-size:1.05rem; margin-bottom:16px; display:flex; justify-content:space-between; align-items:center;">
              <span>Active Financial Goals</span>
              <span style="font-size:0.75rem; color:var(--wm-primary); font-weight:700;">Monte Carlo: 98.4% On Track</span>
            </div>

            <!-- Goal 1 -->
            <div class="wm-goal-card">
              <div class="wm-goal-head">
                <span class="wm-goal-title"><i class="fa-solid fa-umbrella-beach" style="color:var(--wm-primary); margin-right:8px;"></i> Early Retirement Fund (Target: $2.5M)</span>
                <span style="font-weight:700; color:var(--wm-primary);">59%</span>
              </div>
              <div class="wm-goal-amounts">$1,482,900 of $2,500,000 funded • Target: Year 2035</div>
              <div class="wm-progress-bar-bg">
                <div class="wm-progress-fill" style="width:59%;"></div>
              </div>
            </div>

            <!-- Goal 2 -->
            <div class="wm-goal-card">
              <div class="wm-goal-head">
                <span class="wm-goal-title"><i class="fa-solid fa-graduation-cap" style="color:var(--wm-primary); margin-right:8px;"></i> Child Ivy League Trust (Target: $500K)</span>
                <span style="font-weight:700; color:var(--wm-primary);">74%</span>
              </div>
              <div class="wm-goal-amounts">$370,000 of $500,000 funded • Target: Year 2030</div>
              <div class="wm-progress-bar-bg">
                <div class="wm-progress-fill" style="width:74%;"></div>
              </div>
            </div>

            <!-- Goal 3 -->
            <div class="wm-goal-card" style="margin-bottom:0;">
              <div class="wm-goal-head">
                <span class="wm-goal-title"><i class="fa-solid fa-house-chimney-window" style="color:var(--wm-primary); margin-right:8px;"></i> Coastal Estate Acquisition (Target: $1.0M)</span>
                <span style="font-weight:700; color:var(--wm-primary);">42%</span>
              </div>
              <div class="wm-goal-amounts">$420,000 of $1,000,000 funded • Target: Year 2028</div>
              <div class="wm-progress-bar-bg">
                <div class="wm-progress-fill" style="width:42%;"></div>
              </div>
            </div>
          </div>

          <!-- Advisor Recommendation & Recent Activity -->
          <div style="display:flex; flex-direction:column; gap:20px;">
            <!-- Advisor Memo Card -->
            <div class="wm-chart-card" style="border-left: 4px solid var(--wm-primary);">
              <div style="display:flex; align-items:center; gap:12px; margin-bottom:12px;">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80" alt="Marcus Vance" style="width:40px; height:40px; border-radius:50%; object-fit:cover;">
                <div>
                  <div style="font-weight:700; color:var(--wm-dark); font-size:0.95rem;">Advisor Recommendation from Marcus Vance</div>
                  <div style="font-size:0.75rem; color:var(--wm-body-muted);">Fiduciary Advisory Note • Yesterday</div>
                </div>
              </div>
              <p style="font-size:0.875rem; color:var(--wm-body); line-height:1.6; margin-bottom:14px;">
                "Hi Anandha, your portfolio is up +12.6% YTD, outpacing your target benchmark. With $94.5K in cash reserves earning 5.1%, we recommend allocating $50K into the <strong>Sovereign Treasury Yield Plus</strong> fund to lock in 7.4% fixed yields before the Federal Reserve's next policy cycle."
              </p>
              <button class="wm-btn wm-btn-primary" style="padding:8px 16px; font-size:0.825rem;" onclick="switchTab('tab-user-messages')">
                <i class="fa-solid fa-comments"></i> Reply to Marcus in Messages
              </button>
            </div>

            <!-- Recent Portfolio Activity -->
            <div class="wm-chart-card">
              <div style="font-weight:700; color:var(--wm-dark); font-size:0.95rem; margin-bottom:14px;">Recent Distributions & Activity</div>
              <div class="wm-activity-list">
                <div class="wm-activity-item">
                  <div class="wm-activity-icon wm-act-green"><i class="fa-solid fa-dollar-sign"></i></div>
                  <div class="wm-activity-info">
                    <div class="wm-activity-text">Dividend payment received: $1,420.00 from Vanguard S&P 500 (VOO).</div>
                    <div class="wm-activity-time">Nov 01, 2026 • Auto-reinvested</div>
                  </div>
                </div>
                <div class="wm-activity-item">
                  <div class="wm-activity-icon wm-act-teal"><i class="fa-solid fa-arrows-spin"></i></div>
                  <div class="wm-activity-info">
                    <div class="wm-activity-text">Quarterly portfolio rebalancing executed across Schwab custody.</div>
                    <div class="wm-activity-time">Oct 28, 2026 • Marcus Vance, CFA</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ====================================================================
           TAB 2: MY INVESTMENTS
           ==================================================================== -->
      <section id="tab-user-investments" class="wm-tab-view">
        <div class="wm-dash-title-bar">
          <div>
            <h1 class="wm-dash-page-title">My Investment Holdings & Positions</h1>
            <p class="wm-dash-page-subtitle">Detailed breakdown of 14 active wealth assets across equities, debt, private equity, and REITs.</p>
          </div>
          <div style="display:flex; gap:10px;">
            <button class="wm-btn wm-btn-secondary" style="padding:10px 18px; font-size:0.85rem;" onclick="triggerToast('Holdings portfolio exported to PDF.')">
              <i class="fa-solid fa-file-pdf"></i> Export Positions PDF
            </button>
            <button class="wm-btn wm-btn-primary" style="padding:10px 18px; font-size:0.85rem;" onclick="triggerToast('Automatic dividend reinvestment enabled across all 14 holdings.')">
              <i class="fa-solid fa-rotate"></i> Auto-Reinvest All
            </button>
          </div>
        </div>

        <!-- 5 KPI Cards -->
        <div class="wm-kpi-grid">
          <div class="wm-kpi-card">
            <div class="wm-kpi-top">
              <div class="wm-kpi-icon"><i class="fa-solid fa-layer-group"></i></div>
              <span class="wm-kpi-trend wm-trend-up">Diversified</span>
            </div>
            <div class="wm-kpi-val">14 Assets</div>
            <div class="wm-kpi-lbl">Active Holdings Positions</div>
          </div>

          <div class="wm-kpi-card">
            <div class="wm-kpi-top">
              <div class="wm-kpi-icon"><i class="fa-solid fa-trophy"></i></div>
              <span class="wm-kpi-trend wm-trend-up">+28.4%</span>
            </div>
            <div class="wm-kpi-val">Global Alpha</div>
            <div class="wm-kpi-lbl">Top Performing Holding</div>
          </div>

          <div class="wm-kpi-card">
            <div class="wm-kpi-top">
              <div class="wm-kpi-icon"><i class="fa-solid fa-percent"></i></div>
              <span class="wm-kpi-trend wm-trend-up">Annualized</span>
            </div>
            <div class="wm-kpi-val">6.4% p.a.</div>
            <div class="wm-kpi-lbl">Weighted Portfolio Yield</div>
          </div>

          <div class="wm-kpi-card">
            <div class="wm-kpi-top">
              <div class="wm-kpi-icon"><i class="fa-solid fa-calendar-check"></i></div>
              <span class="wm-kpi-trend wm-trend-up">Nov 15</span>
            </div>
            <div class="wm-kpi-val">$4,120</div>
            <div class="wm-kpi-lbl">Next Expected Dividend Payout</div>
          </div>

          <div class="wm-kpi-card">
            <div class="wm-kpi-top">
              <div class="wm-kpi-icon"><i class="fa-solid fa-shield-halved"></i></div>
              <span class="wm-kpi-trend wm-trend-up">82% USD</span>
            </div>
            <div class="wm-kpi-val">AAA Hedged</div>
            <div class="wm-kpi-lbl">Currency & Geopolitical Shield</div>
          </div>
        </div>

        <!-- 14 Positions Table -->
        <div class="wm-table-card">
          <div class="wm-table-header">
            <div>
              <div style="font-size:1.1rem; font-weight:700; color:var(--wm-dark);">Holdings Portfolio Ledger (14 Assets)</div>
              <div style="font-size:0.8rem; color:var(--wm-body-muted);">Real-time market values, unrealized profit/loss, and dividend metrics</div>
            </div>
            <div class="wm-table-controls">
              <input type="text" id="userHoldingsSearch" class="wm-table-search" placeholder="Search asset or ticker..." onkeyup="filterUserHoldings()">
              <select id="userHoldingsCategoryFilter" class="wm-table-select" onchange="filterUserHoldings()">
                <option value="all">All Asset Classes</option>
                <option value="Equities">Equities</option>
                <option value="Fixed Income">Fixed Income</option>
                <option value="Private Equity">Private Equity</option>
                <option value="Real Assets">Real Assets</option>
                <option value="Cash">Cash Reserves</option>
              </select>
            </div>
          </div>

          <div style="overflow-x:auto;">
            <table class="wm-dash-table" id="userHoldingsTable">
              <thead>
                <tr>
                  <th>Asset / Security Name</th>
                  <th>Class</th>
                  <th>Units Held</th>
                  <th>Avg Cost</th>
                  <th>Current Market Value</th>
                  <th>Unrealized P&L</th>
                  <th>1-Yr Return</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr data-cat="Equities">
                  <td><strong>Stackly Global Alpha Equities</strong><div style="font-size:0.75rem; color:var(--wm-body-muted);">Flagship Quality Growth Fund</div></td>
                  <td>Equities</td>
                  <td>1,450 Units</td>
                  <td>$182.40</td>
                  <td><strong style="color:var(--wm-primary); font-size:0.95rem;">$310,000.00</strong></td>
                  <td><span class="wm-kpi-trend wm-trend-up">+$45,520 (+17.2%)</span></td>
                  <td><strong>+24.2%</strong></td>
                  <td><button class="wm-action-btn" title="View Position Details" onclick="openDetailsModal('Stackly Global Alpha Equities', 'Holding: 1,450 Units<br>Current Value: $310,000.00 USD<br>Unrealized Profit: +$45,520.00<br>Expense Ratio: 0.65%<br>Custody: Charles Schwab Institutional #SCH-7729-19')"><i class="fa-solid fa-eye"></i></button></td>
                </tr>

                <tr data-cat="Equities">
                  <td><strong>Vanguard S&P 500 ETF (VOO)</strong><div style="font-size:0.75rem; color:var(--wm-body-muted);">US Large-Cap Core Index</div></td>
                  <td>Equities</td>
                  <td>380 Shares</td>
                  <td>$410.00</td>
                  <td><strong style="color:var(--wm-primary); font-size:0.95rem;">$192,500.00</strong></td>
                  <td><span class="wm-kpi-trend wm-trend-up">+$36,700 (+23.5%)</span></td>
                  <td><strong>+14.2%</strong></td>
                  <td><button class="wm-action-btn" title="View Position Details" onclick="openDetailsModal('Vanguard S&P 500 ETF (VOO)', 'Holding: 380 Shares<br>Current Value: $192,500.00 USD<br>Dividend Yield: 1.55%<br>Custody: Charles Schwab')"><i class="fa-solid fa-eye"></i></button></td>
                </tr>

                <tr data-cat="Equities">
                  <td><strong>Schwab US Dividend Equity (SCHD)</strong><div style="font-size:0.75rem; color:var(--wm-body-muted);">High Dividend Yield & Cash Flow</div></td>
                  <td>Equities</td>
                  <td>1,100 Shares</td>
                  <td>$74.50</td>
                  <td><strong style="color:var(--wm-primary); font-size:0.95rem;">$92,400.00</strong></td>
                  <td><span class="wm-kpi-trend wm-trend-up">+$10,450 (+12.7%)</span></td>
                  <td><strong>+11.8%</strong></td>
                  <td><button class="wm-action-btn" title="View Position Details" onclick="openDetailsModal('Schwab US Dividend Equity (SCHD)', 'Holding: 1,100 Shares<br>Current Value: $92,400.00 USD<br>Quarterly Dividend: ~$820.00<br>Custody: Charles Schwab')"><i class="fa-solid fa-eye"></i></button></td>
                </tr>

                <tr data-cat="Fixed Income">
                  <td><strong>US 10-Year Treasury Sovereign Notes</strong><div style="font-size:0.75rem; color:var(--wm-body-muted);">US Govt Backed Fixed Income</div></td>
                  <td>Fixed Income</td>
                  <td>2,500 Bonds</td>
                  <td>$98.20</td>
                  <td><strong style="color:var(--wm-primary); font-size:0.95rem;">$250,000.00</strong></td>
                  <td><span class="wm-kpi-trend wm-trend-up">+$4,500 (+1.8%)</span></td>
                  <td><strong>+7.4%</strong></td>
                  <td><button class="wm-action-btn" title="View Position Details" onclick="openDetailsModal('US 10Y Treasury Notes', 'Holding: 2,500 Bonds ($100 Par)<br>Current Value: $250,000.00 USD<br>Coupon: 4.85% Semi-Annual<br>Maturity: August 2034<br>Custody: Charles Schwab')"><i class="fa-solid fa-eye"></i></button></td>
                </tr>

                <tr data-cat="Private Equity">
                  <td><strong>Apex Private Equity Syndicate IV</strong><div style="font-size:0.75rem; color:var(--wm-body-muted);">Growth Tech & MedTech Buyouts</div></td>
                  <td>Private Equity</td>
                  <td>1 Commitment</td>
                  <td>$150,000</td>
                  <td><strong style="color:var(--wm-primary); font-size:0.95rem;">$182,000.00</strong></td>
                  <td><span class="wm-kpi-trend wm-trend-up">+$32,000 (+21.3%)</span></td>
                  <td><strong>+28.5%</strong></td>
                  <td><button class="wm-action-btn" title="View Position Details" onclick="openDetailsModal('Apex Private Equity IV', 'Committed: $150,000.00 USD<br>Reported Net Asset Value: $182,000.00 USD<br>Net Internal Rate of Return (IRR): 28.5%<br>Lockup: 5 Years (Closed)')"><i class="fa-solid fa-eye"></i></button></td>
                </tr>

                <tr data-cat="Real Assets">
                  <td><strong>Green Infrastructure Real Estate Trust</strong><div style="font-size:0.75rem; color:var(--wm-body-muted);">Renewable Solar & Data Centers REIT</div></td>
                  <td>Real Assets</td>
                  <td>850 Units</td>
                  <td>$110.00</td>
                  <td><strong style="color:var(--wm-primary); font-size:0.95rem;">$118,000.00</strong></td>
                  <td><span class="wm-kpi-trend wm-trend-up">+$24,500 (+26.2%)</span></td>
                  <td><strong>+14.6%</strong></td>
                  <td><button class="wm-action-btn" title="View Position Details" onclick="openDetailsModal('Green Infrastructure REIT', 'Holding: 850 Units<br>Current Value: $118,000.00 USD<br>Dividend Yield: 6.8% Cash Flow<br>Custody: Charles Schwab')"><i class="fa-solid fa-eye"></i></button></td>
                </tr>

                <tr data-cat="Real Assets">
                  <td><strong>Brookfield Renewable Infrastructure</strong><div style="font-size:0.75rem; color:var(--wm-body-muted);">Global Hydro & Clean Energy Assets</div></td>
                  <td>Real Assets</td>
                  <td>720 Shares</td>
                  <td>$82.00</td>
                  <td><strong style="color:var(--wm-primary); font-size:0.95rem;">$68,400.00</strong></td>
                  <td><span class="wm-kpi-trend wm-trend-up">+$9,360 (+15.8%)</span></td>
                  <td><strong>+13.4%</strong></td>
                  <td><button class="wm-action-btn" title="View Position Details" onclick="openDetailsModal('Brookfield Renewable Infrastructure', 'Holding: 720 Shares<br>Current Value: $68,400.00 USD<br>Dividend Yield: 5.2%<br>Custody: Charles Schwab')"><i class="fa-solid fa-eye"></i></button></td>
                </tr>

                <tr data-cat="Fixed Income">
                  <td><strong>BlackRock Total Return Bond Fund</strong><div style="font-size:0.75rem; color:var(--wm-body-muted);">Investment Grade Corporate Debt</div></td>
                  <td>Fixed Income</td>
                  <td>800 Units</td>
                  <td>$96.00</td>
                  <td><strong style="color:var(--wm-primary); font-size:0.95rem;">$78,500.00</strong></td>
                  <td><span class="wm-kpi-trend wm-trend-up">+$1,700 (+2.2%)</span></td>
                  <td><strong>+6.8%</strong></td>
                  <td><button class="wm-action-btn" title="View Position Details" onclick="openDetailsModal('BlackRock Total Return Bond', 'Holding: 800 Units<br>Current Value: $78,500.00 USD<br>Yield to Maturity: 6.8%<br>Custody: Charles Schwab')"><i class="fa-solid fa-eye"></i></button></td>
                </tr>

                <tr data-cat="Equities">
                  <td><strong>Apple Inc. (AAPL)</strong><div style="font-size:0.75rem; color:var(--wm-body-muted);">Direct Equity Holding</div></td>
                  <td>Equities</td>
                  <td>180 Shares</td>
                  <td>$165.00</td>
                  <td><strong style="color:var(--wm-primary); font-size:0.95rem;">$41,200.00</strong></td>
                  <td><span class="wm-kpi-trend wm-trend-up">+$11,500 (+38.7%)</span></td>
                  <td><strong>+28.4%</strong></td>
                  <td><button class="wm-action-btn" title="View Position Details" onclick="openDetailsModal('Apple Inc. (AAPL)', 'Holding: 180 Shares<br>Current Value: $41,200.00 USD<br>Cost Basis: $29,700.00<br>Custody: Charles Schwab')"><i class="fa-solid fa-eye"></i></button></td>
                </tr>

                <tr data-cat="Equities">
                  <td><strong>Microsoft Corporation (MSFT)</strong><div style="font-size:0.75rem; color:var(--wm-body-muted);">Direct Equity Holding</div></td>
                  <td>Equities</td>
                  <td>90 Shares</td>
                  <td>$315.00</td>
                  <td><strong style="color:var(--wm-primary); font-size:0.95rem;">$38,400.00</strong></td>
                  <td><span class="wm-kpi-trend wm-trend-up">+$10,050 (+35.4%)</span></td>
                  <td><strong>+26.1%</strong></td>
                  <td><button class="wm-action-btn" title="View Position Details" onclick="openDetailsModal('Microsoft Corp. (MSFT)', 'Holding: 90 Shares<br>Current Value: $38,400.00 USD<br>Cost Basis: $28,350.00<br>Custody: Charles Schwab')"><i class="fa-solid fa-eye"></i></button></td>
                </tr>

                <tr data-cat="Equities">
                  <td><strong>Berkshire Hathaway Class B (BRK.B)</strong><div style="font-size:0.75rem; color:var(--wm-body-muted);">Diversified Conglomerate Core</div></td>
                  <td>Equities</td>
                  <td>65 Shares</td>
                  <td>$340.00</td>
                  <td><strong style="color:var(--wm-primary); font-size:0.95rem;">$29,500.00</strong></td>
                  <td><span class="wm-kpi-trend wm-trend-up">+$7,400 (+33.5%)</span></td>
                  <td><strong>+18.9%</strong></td>
                  <td><button class="wm-action-btn" title="View Position Details" onclick="openDetailsModal('Berkshire Hathaway (BRK.B)', 'Holding: 65 Shares<br>Current Value: $29,500.00 USD<br>Custody: Charles Schwab')"><i class="fa-solid fa-eye"></i></button></td>
                </tr>

                <tr data-cat="Equities">
                  <td><strong>Invesco QQQ Trust (QQQ)</strong><div style="font-size:0.75rem; color:var(--wm-body-muted);">Nasdaq 100 Index Tracking</div></td>
                  <td>Equities</td>
                  <td>80 Shares</td>
                  <td>$380.00</td>
                  <td><strong style="color:var(--wm-primary); font-size:0.95rem;">$38,000.00</strong></td>
                  <td><span class="wm-kpi-trend wm-trend-up">+$7,600 (+25.0%)</span></td>
                  <td><strong>+22.4%</strong></td>
                  <td><button class="wm-action-btn" title="View Position Details" onclick="openDetailsModal('Invesco QQQ Trust', 'Holding: 80 Shares<br>Current Value: $38,000.00 USD<br>Custody: Charles Schwab')"><i class="fa-solid fa-eye"></i></button></td>
                </tr>

                <tr data-cat="Real Assets">
                  <td><strong>Prologis Logistics REIT (PLD)</strong><div style="font-size:0.75rem; color:var(--wm-body-muted);">Global Industrial & Cold Storage</div></td>
                  <td>Real Assets</td>
                  <td>350 Shares</td>
                  <td>$115.00</td>
                  <td><strong style="color:var(--wm-primary); font-size:0.95rem;">$48,000.00</strong></td>
                  <td><span class="wm-kpi-trend wm-trend-up">+$7,750 (+19.3%)</span></td>
                  <td><strong>+12.8%</strong></td>
                  <td><button class="wm-action-btn" title="View Position Details" onclick="openDetailsModal('Prologis Logistics REIT', 'Holding: 350 Shares<br>Current Value: $48,000.00 USD<br>Yield: 3.4%<br>Custody: Charles Schwab')"><i class="fa-solid fa-eye"></i></button></td>
                </tr>

                <tr data-cat="Cash">
                  <td><strong>Charles Schwab Cash Sweep Reserve</strong><div style="font-size:0.75rem; color:var(--wm-body-muted);">FDIC Insured High-Yield Cash Buffer</div></td>
                  <td>Cash Reserves</td>
                  <td>94,500 USD</td>
                  <td>$1.00</td>
                  <td><strong style="color:var(--wm-primary); font-size:0.95rem;">$94,500.00</strong></td>
                  <td><span class="wm-status-pill wm-pill-completed">Stable Cash</span></td>
                  <td><strong>5.1% APY</strong></td>
                  <td><button class="wm-action-btn" title="View Position Details" onclick="openDetailsModal('Cash Sweep Account', 'Available Cash: $94,500.00 USD<br>Yield: 5.10% APY compounded daily<br>FDIC Insured to $2,500,000 across partner banks')"><i class="fa-solid fa-eye"></i></button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- ====================================================================
           TAB 3: MESSAGES
           ==================================================================== -->
      <section id="tab-user-messages" class="wm-tab-view">
        <div class="wm-dash-title-bar">
          <div>
            <h1 class="wm-dash-page-title">Advisory Messages & Private Communications</h1>
            <p class="wm-dash-page-subtitle">Direct 256-bit encrypted line to your dedicated Chief Investment Officer & Estate Legal Counsel.</p>
          </div>
        </div>

        <!-- 2-Column Messaging Interface -->
        <div class="wm-messages-layout">
          <!-- Left: Conversation Roster -->
          <div class="wm-convos-pane">
            <div class="wm-convos-head">
              <i class="fa-solid fa-comments" style="color:var(--wm-primary); margin-right:8px;"></i> Active Advisory Threads
            </div>

            <!-- Thread 1 (Active) -->
            <div class="wm-convo-item active" style="border-left:3px solid var(--wm-primary);">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                <strong style="color:var(--wm-dark); font-size:0.9rem;">Marcus Vance, CFA</strong>
                <span style="font-size:0.72rem; color:var(--wm-primary); font-weight:700;">10:14 AM</span>
              </div>
              <div style="font-size:0.78rem; color:var(--wm-body); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                Re: Q4 Portfolio Rebalancing & Tax Harvesting
              </div>
              <div style="font-size:0.7rem; color:var(--wm-body-muted); margin-top:2px;">Chief Investment Officer</div>
            </div>

            <!-- Thread 2 -->
            <div class="wm-convo-item" onclick="triggerToast('Loading Sarah Jenkins advisory channel...')">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                <strong style="color:var(--wm-dark); font-size:0.9rem;">Sarah Jenkins, JD</strong>
                <span style="font-size:0.72rem; color:var(--wm-body-muted);">Yesterday</span>
              </div>
              <div style="font-size:0.78rem; color:var(--wm-body-muted); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                Your Living Trust and Will schedules have been verified.
              </div>
              <div style="font-size:0.7rem; color:var(--wm-body-muted); margin-top:2px;">Senior Estate Counsel</div>
            </div>

            <!-- Thread 3 -->
            <div class="wm-convo-item" onclick="triggerToast('Loading Institutional Concierge channel...')">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                <strong style="color:var(--wm-dark); font-size:0.9rem;">Stackly Custody Concierge</strong>
                <span style="font-size:0.72rem; color:var(--wm-body-muted);">Oct 30</span>
              </div>
              <div style="font-size:0.78rem; color:var(--wm-body-muted); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                Charles Schwab custody statement is ready for review.
              </div>
              <div style="font-size:0.7rem; color:var(--wm-body-muted); margin-top:2px;">Institutional Support</div>
            </div>

            <!-- Thread 4 -->
            <div class="wm-convo-item" onclick="triggerToast('Loading Global Tax Desk channel...')">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                <strong style="color:var(--wm-dark); font-size:0.9rem;">Global Tax Desk</strong>
                <span style="font-size:0.72rem; color:var(--wm-body-muted);">Oct 22</span>
              </div>
              <div style="font-size:0.78rem; color:var(--wm-body-muted); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                IRS Form 1116 Foreign Tax Credit preview.
              </div>
              <div style="font-size:0.7rem; color:var(--wm-body-muted); margin-top:2px;">Tax Advisory</div>
            </div>
          </div>

          <!-- Right: Active Chat Window -->
          <div class="wm-chat-pane">
            <!-- Chat Header -->
            <div class="wm-chat-header">
              <div style="display:flex; align-items:center; gap:12px;">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Marcus Vance" style="width:44px; height:44px; border-radius:50%; object-fit:cover; border:2px solid var(--wm-primary);">
                <div>
                  <div style="font-weight:700; color:var(--wm-dark); font-size:1rem;">Marcus Vance, CFA</div>
                  <div style="font-size:0.75rem; color:#27ae60; font-weight:600;"><i class="fa-solid fa-circle" style="font-size:0.5rem; vertical-align:middle;"></i> Active Now • 256-bit Encrypted Session</div>
                </div>
              </div>
              <button class="wm-btn wm-btn-outline" style="padding:6px 14px; font-size:0.8rem;" onclick="triggerToast('Direct phone bridge connected to Marcus Vance: +1 (800) 555-0199')">
                <i class="fa-solid fa-phone"></i> Direct Call
              </button>
            </div>

            <!-- Chat Message Thread -->
            <div class="wm-chat-body" id="chatMessagesContainer">
              <!-- Advisor message -->
              <div class="wm-chat-bubble wm-chat-advisor">
                <div style="font-size:0.75rem; color:var(--wm-body-muted); margin-bottom:4px; font-weight:700;">Marcus Vance • 10:02 AM</div>
                Hello Anandha, congratulations on the portfolio performance this month. Your net asset value reached <strong>$1,482,900.00</strong>, up +12.6% year-to-date.
              </div>

              <!-- Advisor message -->
              <div class="wm-chat-bubble wm-chat-advisor">
                <div style="font-size:0.75rem; color:var(--wm-body-muted); margin-bottom:4px; font-weight:700;">Marcus Vance • 10:04 AM</div>
                Looking at your liquidity reserves, you currently have $94.5K in the cash sweep. We have identified an attractive entry point into the <strong>Sovereign Treasury Yield Plus</strong> fund yielding 7.4% fixed. Would you like me to prepare an allocation schedule?
              </div>

              <!-- User reply -->
              <div class="wm-chat-bubble wm-chat-user">
                <div style="font-size:0.75rem; color:rgba(255,255,255,0.8); margin-bottom:4px; font-weight:700;">You • 10:10 AM</div>
                Thank you Marcus. That sounds prudent. What would the minimum lockup period be for the Sovereign Treasury Plus fund?
              </div>

              <!-- Advisor message -->
              <div class="wm-chat-bubble wm-chat-advisor">
                <div style="font-size:0.75rem; color:var(--wm-body-muted); margin-bottom:4px; font-weight:700;">Marcus Vance • 10:14 AM</div>
                It offers standard T+1 daily liquidity with no lockup penalties, so your capital stays flexible while compounding at 7.4% p.a. Let me know if you would like me to draft the authorization voucher!
              </div>
            </div>

            <!-- Chat Input Area (No Form, Uses JS Event) -->
            <div class="wm-chat-input-area">
              <input type="text" id="chatMessageInput" class="wm-form-input" style="margin:0; border-radius:var(--wm-radius-full); padding:12px 20px;" placeholder="Type your advisory question or instruction...">
              <button class="wm-btn wm-btn-primary" id="sendMessageBtn" style="border-radius:var(--wm-radius-full); width:48px; height:48px; padding:0; display:flex; align-items:center; justify-content:center; flex-shrink:0;" aria-label="Send Message">
                <i class="fa-solid fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- ====================================================================
           TAB 4: FINANCIAL PRODUCTS
           ==================================================================== -->
      <section id="tab-user-products" class="wm-tab-view">
        <div class="wm-dash-title-bar">
          <div>
            <h1 class="wm-dash-page-title">Curated Wealth Products & Opportunities</h1>
            <p class="wm-dash-page-subtitle">Exclusive institutional investment vehicles, private debt, and sustainable yields vetted by our Fiduciary Committee.</p>
          </div>
        </div>

        <!-- Category Filter Pills Bar -->
        <div class="wm-filter-bar">
          <button class="wm-filter-btn active" data-cat="all" onclick="filterProducts('all')">All Products (12)</button>
          <button class="wm-filter-btn" data-cat="equity" onclick="filterProducts('equity')">Equity Funds</button>
          <button class="wm-filter-btn" data-cat="debt" onclick="filterProducts('debt')">Fixed Income & Debt</button>
          <button class="wm-filter-btn" data-cat="real-assets" onclick="filterProducts('real-assets')">Real Assets & REITs</button>
          <button class="wm-filter-btn" data-cat="private-equity" onclick="filterProducts('private-equity')">Private Equity & VC</button>
          <button class="wm-filter-btn" data-cat="retirement" onclick="filterProducts('retirement')">Retirement & Annuity</button>
        </div>

        <!-- 12 Financial Product Cards Grid -->
        <div class="wm-user-product-grid" id="productsGrid">
          
          <!-- Product 1 -->
          <div class="wm-user-product-card" data-category="equity">
            <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80" alt="Stackly Horizon Global Alpha Fund" class="wm-user-product-img">
            <div class="wm-user-product-body">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                <span class="wm-status-pill wm-pill-active">Equity Flagship</span>
                <span style="font-weight:700; color:var(--wm-primary); font-size:1.1rem;">18.2% APY</span>
              </div>
              <h3 style="font-size:1.1rem; font-weight:700; color:var(--wm-dark); margin-bottom:8px;">Stackly Horizon Global Alpha Fund</h3>
              <p style="font-size:0.85rem; color:var(--wm-body); line-height:1.5; margin-bottom:14px;">
                Concentrated portfolio of global titans driving artificial intelligence, semiconductors, and cloud computing architectures.
              </p>
              <div style="font-size:0.8rem; color:var(--wm-body-muted); display:flex; flex-direction:column; gap:4px;">
                <div><i class="fa-solid fa-coins" style="width:16px;"></i> Min Investment: $25,000</div>
                <div><i class="fa-solid fa-clock" style="width:16px;"></i> Liquidity: Daily T+1</div>
                <div><i class="fa-solid fa-shield" style="width:16px;"></i> Risk: Moderate-Aggressive</div>
              </div>
            </div>
            <div class="wm-user-product-footer">
              <button class="wm-btn wm-btn-outline" style="flex:1; padding:8px;" onclick="openProductModal('Stackly Horizon Global Alpha Fund', '18.2% APY', 'Equity Flagship', '$25,000', 'Daily T+1', 'Moderate-Aggressive', 'Managed by Chief Investment Officer Marcus Vance, CFA. Reinvests capital into high-growth enterprise tech titans with strong free cash flows and low debt.')">
                Factsheet
              </button>
              <button class="wm-btn wm-btn-primary" style="flex:1; padding:8px;" onclick="openInvestModal('Stackly Horizon Global Alpha Fund', '$25,000')">
                Invest Now
              </button>
            </div>
          </div>

          <!-- Product 2 -->
          <div class="wm-user-product-card" data-category="debt">
            <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=80" alt="Apex Sovereign Yield Bond Plus" class="wm-user-product-img">
            <div class="wm-user-product-body">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                <span class="wm-status-pill wm-pill-completed">Fixed Income</span>
                <span style="font-weight:700; color:var(--wm-primary); font-size:1.1rem;">7.8% APY</span>
              </div>
              <h3 style="font-size:1.1rem; font-weight:700; color:var(--wm-dark); margin-bottom:8px;">Apex Sovereign Yield Bond Plus</h3>
              <p style="font-size:0.85rem; color:var(--wm-body); line-height:1.5; margin-bottom:14px;">
                G7 sovereign treasury debt hedged with inflation-protected TIPS notes to generate stable quarterly yields with full principal defense.
              </p>
              <div style="font-size:0.8rem; color:var(--wm-body-muted); display:flex; flex-direction:column; gap:4px;">
                <div><i class="fa-solid fa-coins" style="width:16px;"></i> Min Investment: $10,000</div>
                <div><i class="fa-solid fa-clock" style="width:16px;"></i> Liquidity: Daily T+1</div>
                <div><i class="fa-solid fa-shield" style="width:16px;"></i> Risk: Low Risk</div>
              </div>
            </div>
            <div class="wm-user-product-footer">
              <button class="wm-btn wm-btn-outline" style="flex:1; padding:8px;" onclick="openProductModal('Apex Sovereign Yield Bond Plus', '7.8% APY', 'Fixed Income', '$10,000', 'Daily T+1', 'Low Risk', 'Sovereign-backed paper with semi-annual coupons. 100% custody segregation via Charles Schwab.')">
                Factsheet
              </button>
              <button class="wm-btn wm-btn-primary" style="flex:1; padding:8px;" onclick="openInvestModal('Apex Sovereign Yield Bond Plus', '$10,000')">
                Invest Now
              </button>
            </div>
          </div>

          <!-- Product 3 -->
          <div class="wm-user-product-card" data-category="real-assets">
            <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80" alt="Metropolitan Real Estate Trust" class="wm-user-product-img">
            <div class="wm-user-product-body">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                <span class="wm-status-pill wm-pill-active">Real Assets</span>
                <span style="font-weight:700; color:var(--wm-primary); font-size:1.1rem;">11.4% APY</span>
              </div>
              <h3 style="font-size:1.1rem; font-weight:700; color:var(--wm-dark); margin-bottom:8px;">Metropolitan Real Estate Trust</h3>
              <p style="font-size:0.85rem; color:var(--wm-body); line-height:1.5; margin-bottom:14px;">
                Prime institutional industrial logistics, cold-storage distribution hubs, and biomedical life sciences real estate in premier tech corridors.
              </p>
              <div style="font-size:0.8rem; color:var(--wm-body-muted); display:flex; flex-direction:column; gap:4px;">
                <div><i class="fa-solid fa-coins" style="width:16px;"></i> Min Investment: $50,000</div>
                <div><i class="fa-solid fa-clock" style="width:16px;"></i> Liquidity: Monthly Window</div>
                <div><i class="fa-solid fa-shield" style="width:16px;"></i> Risk: Moderate</div>
              </div>
            </div>
            <div class="wm-user-product-footer">
              <button class="wm-btn wm-btn-outline" style="flex:1; padding:8px;" onclick="openProductModal('Metropolitan Real Estate Trust', '11.4% APY', 'Real Assets', '$50,000', 'Monthly Window', 'Moderate', 'Direct institutional ownership of 48 commercial properties with 99.1% occupancy and long-term inflation-linked leases.')">
                Factsheet
              </button>
              <button class="wm-btn wm-btn-primary" style="flex:1; padding:8px;" onclick="openInvestModal('Metropolitan Real Estate Trust', '$50,000')">
                Invest Now
              </button>
            </div>
          </div>

          <!-- Product 4 -->
          <div class="wm-user-product-card" data-category="private-equity">
            <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80" alt="NextGen AI & Quantum Venture Syndicate" class="wm-user-product-img">
            <div class="wm-user-product-body">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                <span class="wm-status-pill wm-pill-pending">Private Equity</span>
                <span style="font-weight:700; color:var(--wm-primary); font-size:1.1rem;">24.5% APY</span>
              </div>
              <h3 style="font-size:1.1rem; font-weight:700; color:var(--wm-dark); margin-bottom:8px;">NextGen AI & Quantum Venture</h3>
              <p style="font-size:0.85rem; color:var(--wm-body); line-height:1.5; margin-bottom:14px;">
                Direct co-investment syndicate in pre-IPO enterprise foundational models, generative intelligence platforms, and silicon fabs.
              </p>
              <div style="font-size:0.8rem; color:var(--wm-body-muted); display:flex; flex-direction:column; gap:4px;">
                <div><i class="fa-solid fa-coins" style="width:16px;"></i> Min Investment: $100,000</div>
                <div><i class="fa-solid fa-clock" style="width:16px;"></i> Liquidity: 3-Year Lockup</div>
                <div><i class="fa-solid fa-shield" style="width:16px;"></i> Risk: Aggressive</div>
              </div>
            </div>
            <div class="wm-user-product-footer">
              <button class="wm-btn wm-btn-outline" style="flex:1; padding:8px;" onclick="openProductModal('NextGen AI & Quantum Venture', '24.5% APY', 'Private Equity', '$100,000', '3-Year Lockup', 'Aggressive', 'Co-invest alongside tier-1 Silicon Valley venture capital funds. High upside potential with targeted multiple on invested capital (MOIC) of 3.2x.')">
                Factsheet
              </button>
              <button class="wm-btn wm-btn-primary" style="flex:1; padding:8px;" onclick="openInvestModal('NextGen AI & Quantum Venture', '$100,000')">
                Invest Now
              </button>
            </div>
          </div>

          <!-- Product 5 -->
          <div class="wm-user-product-card" data-category="real-assets">
            <img src="https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?auto=format&fit=crop&w=600&q=80" alt="Sustainable ESG Clean Energy Trust" class="wm-user-product-img">
            <div class="wm-user-product-body">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                <span class="wm-status-pill wm-pill-active">Green Yield</span>
                <span style="font-weight:700; color:var(--wm-primary); font-size:1.1rem;">13.6% APY</span>
              </div>
              <h3 style="font-size:1.1rem; font-weight:700; color:var(--wm-dark); margin-bottom:8px;">Sustainable ESG Clean Energy Trust</h3>
              <p style="font-size:0.85rem; color:var(--wm-body); line-height:1.5; margin-bottom:14px;">
                Solar power infrastructure, wind farms, and battery grid storage backed by 20-year power purchase agreements with regulated utilities.
              </p>
              <div style="font-size:0.8rem; color:var(--wm-body-muted); display:flex; flex-direction:column; gap:4px;">
                <div><i class="fa-solid fa-coins" style="width:16px;"></i> Min Investment: $20,000</div>
                <div><i class="fa-solid fa-clock" style="width:16px;"></i> Liquidity: Quarterly</div>
                <div><i class="fa-solid fa-shield" style="width:16px;"></i> Risk: Moderate</div>
              </div>
            </div>
            <div class="wm-user-product-footer">
              <button class="wm-btn wm-btn-outline" style="flex:1; padding:8px;" onclick="openProductModal('Sustainable ESG Clean Energy Trust', '13.6% APY', 'Green Yield', '$20,000', 'Quarterly', 'Moderate', 'Certified Article 9 Green Infrastructure fund. Generates strong cash dividend distribution with tax credits.')">
                Factsheet
              </button>
              <button class="wm-btn wm-btn-primary" style="flex:1; padding:8px;" onclick="openInvestModal('Sustainable ESG Clean Energy Trust', '$20,000')">
                Invest Now
              </button>
            </div>
          </div>

          <!-- Product 6 -->
          <div class="wm-user-product-card" data-category="debt">
            <img src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80" alt="High-Yield Corporate Senior Debt" class="wm-user-product-img">
            <div class="wm-user-product-body">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                <span class="wm-status-pill wm-pill-completed">Senior Debt</span>
                <span style="font-weight:700; color:var(--wm-primary); font-size:1.1rem;">8.9% APY</span>
              </div>
              <h3 style="font-size:1.1rem; font-weight:700; color:var(--wm-dark); margin-bottom:8px;">High-Yield Corporate Senior Debt</h3>
              <p style="font-size:0.85rem; color:var(--wm-body); line-height:1.5; margin-bottom:14px;">
                First-lien senior secured loans to recession-resilient mid-market enterprises with strict covenants and 1.8x asset coverage.
              </p>
              <div style="font-size:0.8rem; color:var(--wm-body-muted); display:flex; flex-direction:column; gap:4px;">
                <div><i class="fa-solid fa-coins" style="width:16px;"></i> Min Investment: $25,000</div>
                <div><i class="fa-solid fa-clock" style="width:16px;"></i> Liquidity: Monthly</div>
                <div><i class="fa-solid fa-shield" style="width:16px;"></i> Risk: Moderate</div>
              </div>
            </div>
            <div class="wm-user-product-footer">
              <button class="wm-btn wm-btn-outline" style="flex:1; padding:8px;" onclick="openProductModal('High-Yield Senior Debt', '8.9% APY', 'Senior Debt', '$25,000', 'Monthly', 'Moderate', 'Consistently pays monthly cash coupons. Zero defaults across the historical 5-year track record.')">
                Factsheet
              </button>
              <button class="wm-btn wm-btn-primary" style="flex:1; padding:8px;" onclick="openInvestModal('High-Yield Senior Debt', '$25,000')">
                Invest Now
              </button>
            </div>
          </div>

          <!-- Product 7 -->
          <div class="wm-user-product-card" data-category="real-assets">
            <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80" alt="Nordic Cold Logistics REIT" class="wm-user-product-img">
            <div class="wm-user-product-body">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                <span class="wm-status-pill wm-pill-active">Infrastructure</span>
                <span style="font-weight:700; color:var(--wm-primary); font-size:1.1rem;">10.2% APY</span>
              </div>
              <h3 style="font-size:1.1rem; font-weight:700; color:var(--wm-dark); margin-bottom:8px;">Nordic Cold Logistics REIT</h3>
              <p style="font-size:0.85rem; color:var(--wm-body); line-height:1.5; margin-bottom:14px;">
                Automated port logistics hubs, pharmaceutical storage, and cold-chain facilities across Sweden, Norway, and Germany.
              </p>
              <div style="font-size:0.8rem; color:var(--wm-body-muted); display:flex; flex-direction:column; gap:4px;">
                <div><i class="fa-solid fa-coins" style="width:16px;"></i> Min Investment: $30,000</div>
                <div><i class="fa-solid fa-clock" style="width:16px;"></i> Liquidity: Quarterly</div>
                <div><i class="fa-solid fa-shield" style="width:16px;"></i> Risk: Moderate</div>
              </div>
            </div>
            <div class="wm-user-product-footer">
              <button class="wm-btn wm-btn-outline" style="flex:1; padding:8px;" onclick="openProductModal('Nordic Cold Logistics REIT', '10.2% APY', 'Infrastructure', '$30,000', 'Quarterly', 'Moderate', 'Long term triple-net lease agreements with multi-national shipping and pharma leaders.')">
                Factsheet
              </button>
              <button class="wm-btn wm-btn-primary" style="flex:1; padding:8px;" onclick="openInvestModal('Nordic Cold Logistics REIT', '$30,000')">
                Invest Now
              </button>
            </div>
          </div>

          <!-- Product 8 -->
          <div class="wm-user-product-card" data-category="debt">
            <img src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80" alt="Swiss Franc Hedged Liquidity Shield" class="wm-user-product-img">
            <div class="wm-user-product-body">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                <span class="wm-status-pill wm-pill-completed">Capital Preservation</span>
                <span style="font-weight:700; color:var(--wm-primary); font-size:1.1rem;">4.8% APY</span>
              </div>
              <h3 style="font-size:1.1rem; font-weight:700; color:var(--wm-dark); margin-bottom:8px;">Swiss Franc Hedged Liquidity</h3>
              <p style="font-size:0.85rem; color:var(--wm-body); line-height:1.5; margin-bottom:14px;">
                Ultra-safe liquidity allocation combining Swiss Confederation bonds and allocated physical bullion in Zurich vault custody.
              </p>
              <div style="font-size:0.8rem; color:var(--wm-body-muted); display:flex; flex-direction:column; gap:4px;">
                <div><i class="fa-solid fa-coins" style="width:16px;"></i> Min Investment: $15,000</div>
                <div><i class="fa-solid fa-clock" style="width:16px;"></i> Liquidity: Daily T+1</div>
                <div><i class="fa-solid fa-shield" style="width:16px;"></i> Risk: Very Low Risk</div>
              </div>
            </div>
            <div class="wm-user-product-footer">
              <button class="wm-btn wm-btn-outline" style="flex:1; padding:8px;" onclick="openProductModal('Swiss Franc Hedged Liquidity', '4.8% APY', 'Capital Preservation', '$15,000', 'Daily T+1', 'Very Low', 'Primary purpose: Maximum defense against currency devaluation and global financial shocks.')">
                Factsheet
              </button>
              <button class="wm-btn wm-btn-primary" style="flex:1; padding:8px;" onclick="openInvestModal('Swiss Franc Hedged Liquidity', '$15,000')">
                Invest Now
              </button>
            </div>
          </div>

          <!-- Product 9 -->
          <div class="wm-user-product-card" data-category="private-equity">
            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80" alt="Silicon Valley Disruptors Seed Fund" class="wm-user-product-img">
            <div class="wm-user-product-body">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                <span class="wm-status-pill wm-pill-pending">Venture</span>
                <span style="font-weight:700; color:var(--wm-primary); font-size:1.1rem;">28.0% APY</span>
              </div>
              <h3 style="font-size:1.1rem; font-weight:700; color:var(--wm-dark); margin-bottom:8px;">Silicon Valley Disruptors Fund</h3>
              <p style="font-size:0.85rem; color:var(--wm-body); line-height:1.5; margin-bottom:14px;">
                Early-stage venture backing breakthrough engineering founders in humanoid robotics, synthetic biology, and energy storage.
              </p>
              <div style="font-size:0.8rem; color:var(--wm-body-muted); display:flex; flex-direction:column; gap:4px;">
                <div><i class="fa-solid fa-coins" style="width:16px;"></i> Min Investment: $75,000</div>
                <div><i class="fa-solid fa-clock" style="width:16px;"></i> Liquidity: 4-Year Lockup</div>
                <div><i class="fa-solid fa-shield" style="width:16px;"></i> Risk: High Risk</div>
              </div>
            </div>
            <div class="wm-user-product-footer">
              <button class="wm-btn wm-btn-outline" style="flex:1; padding:8px;" onclick="openProductModal('Silicon Valley Disruptors Fund', '28.0% APY', 'Venture', '$75,000', '4-Year Lockup', 'High Risk', 'Exclusive private access to founders graduated from Stanford, MIT, and leading AI research labs.')">
                Factsheet
              </button>
              <button class="wm-btn wm-btn-primary" style="flex:1; padding:8px;" onclick="openInvestModal('Silicon Valley Disruptors Fund', '$75,000')">
                Invest Now
              </button>
            </div>
          </div>

          <!-- Product 10 -->
          <div class="wm-user-product-card" data-category="equity">
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80" alt="Global Emerging Markets Growth Fund" class="wm-user-product-img">
            <div class="wm-user-product-body">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                <span class="wm-status-pill wm-pill-active">Emerging Titans</span>
                <span style="font-weight:700; color:var(--wm-primary); font-size:1.1rem;">19.4% APY</span>
              </div>
              <h3 style="font-size:1.1rem; font-weight:700; color:var(--wm-dark); margin-bottom:8px;">Global Emerging Markets Growth</h3>
              <p style="font-size:0.85rem; color:var(--wm-body); line-height:1.5; margin-bottom:14px;">
                Demographic dividend portfolio capturing expanding middle-class consumption across India, Southeast Asia, and Latin America.
              </p>
              <div style="font-size:0.8rem; color:var(--wm-body-muted); display:flex; flex-direction:column; gap:4px;">
                <div><i class="fa-solid fa-coins" style="width:16px;"></i> Min Investment: $20,000</div>
                <div><i class="fa-solid fa-clock" style="width:16px;"></i> Liquidity: Daily T+2</div>
                <div><i class="fa-solid fa-shield" style="width:16px;"></i> Risk: Moderate-Aggressive</div>
              </div>
            </div>
            <div class="wm-user-product-footer">
              <button class="wm-btn wm-btn-outline" style="flex:1; padding:8px;" onclick="openProductModal('Global Emerging Markets Growth', '19.4% APY', 'Emerging Titans', '$20,000', 'Daily T+2', 'Moderate-Aggressive', 'Heavy overweight in Indian digital infrastructure, consumer financial services, and renewable manufacturing.')">
                Factsheet
              </button>
              <button class="wm-btn wm-btn-primary" style="flex:1; padding:8px;" onclick="openInvestModal('Global Emerging Markets Growth', '$20,000')">
                Invest Now
              </button>
            </div>
          </div>

          <!-- Product 11 -->
          <div class="wm-user-product-card" data-category="retirement">
            <img src="https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80" alt="Apex Pension Yield Annuity 2050" class="wm-user-product-img">
            <div class="wm-user-product-body">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                <span class="wm-status-pill wm-pill-completed">Retirement Solution</span>
                <span style="font-weight:700; color:var(--wm-primary); font-size:1.1rem;">9.2% APY</span>
              </div>
              <h3 style="font-size:1.1rem; font-weight:700; color:var(--wm-dark); margin-bottom:8px;">Apex Pension Yield Annuity 2050</h3>
              <p style="font-size:0.85rem; color:var(--wm-body); line-height:1.5; margin-bottom:14px;">
                Guaranteed lifetime indexed cash distribution vehicle designed for high-net-worth retirement and intergenerational legacy transfer.
              </p>
              <div style="font-size:0.8rem; color:var(--wm-body-muted); display:flex; flex-direction:column; gap:4px;">
                <div><i class="fa-solid fa-coins" style="width:16px;"></i> Min Investment: $50,000</div>
                <div><i class="fa-solid fa-clock" style="width:16px;"></i> Liquidity: Annual Window</div>
                <div><i class="fa-solid fa-shield" style="width:16px;"></i> Risk: Low-Moderate</div>
              </div>
            </div>
            <div class="wm-user-product-footer">
              <button class="wm-btn wm-btn-outline" style="flex:1; padding:8px;" onclick="openProductModal('Apex Pension Yield Annuity 2050', '9.2% APY', 'Retirement', '$50,000', 'Annual Window', 'Low-Moderate', 'Features inflation-linked indexation and tax-deferred compounding benefits.')">
                Factsheet
              </button>
              <button class="wm-btn wm-btn-primary" style="flex:1; padding:8px;" onclick="openInvestModal('Apex Pension Yield Annuity 2050', '$50,000')">
                Invest Now
              </button>
            </div>
          </div>

          <!-- Product 12 -->
          <div class="wm-user-product-card" data-category="equity">
            <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80" alt="Quantitative Market Neutral Arbitrage" class="wm-user-product-img">
            <div class="wm-user-product-body">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                <span class="wm-status-pill wm-pill-active">Arbitrage Alpha</span>
                <span style="font-weight:700; color:var(--wm-primary); font-size:1.1rem;">14.8% APY</span>
              </div>
              <h3 style="font-size:1.1rem; font-weight:700; color:var(--wm-dark); margin-bottom:8px;">Market Neutral Quant Arbitrage</h3>
              <p style="font-size:0.85rem; color:var(--wm-body); line-height:1.5; margin-bottom:14px;">
                Mathematical pair-trading and statistical index arbitrage maintaining zero beta exposure to broad market gyrations.
              </p>
              <div style="font-size:0.8rem; color:var(--wm-body-muted); display:flex; flex-direction:column; gap:4px;">
                <div><i class="fa-solid fa-coins" style="width:16px;"></i> Min Investment: $50,000</div>
                <div><i class="fa-solid fa-clock" style="width:16px;"></i> Liquidity: Weekly Window</div>
                <div><i class="fa-solid fa-shield" style="width:16px;"></i> Risk: Moderate</div>
              </div>
            </div>
            <div class="wm-user-product-footer">
              <button class="wm-btn wm-btn-outline" style="flex:1; padding:8px;" onclick="openProductModal('Market Neutral Quant Arbitrage', '14.8% APY', 'Arbitrage Alpha', '$50,000', 'Weekly Window', 'Moderate', 'Delivers positive returns regardless of whether equity markets rise or fall. Downside risk limited to 0.8%.')">
                Factsheet
              </button>
              <button class="wm-btn wm-btn-primary" style="flex:1; padding:8px;" onclick="openInvestModal('Market Neutral Quant Arbitrage', '$50,000')">
                Invest Now
              </button>
            </div>
          </div>

        </div>
      </section>

      <!-- ====================================================================
           TAB 5: PROFILE
           ==================================================================== -->
      <section id="tab-user-profile" class="wm-tab-view">
        <div class="wm-dash-title-bar">
          <div>
            <h1 class="wm-dash-page-title">Client Account & Fiduciary Verification</h1>
            <p class="wm-dash-page-subtitle">Personal identity details, institutional custody links, risk tolerance mandates, and document vault.</p>
          </div>
          <button class="wm-btn wm-btn-secondary" style="padding:10px 18px; font-size:0.85rem;" onclick="openDetailsModal('Fiduciary Profile Update Request', 'Client: Anandha Krishnan<br>Account: #STK-8849201<br>To modify legal beneficiaries, custodial accounts, or banking wire instructions, a verified Fiduciary Change Form must be signed via DocuSign.<br><br>Status: Dispatched to your registered email.')">
            <i class="fa-solid fa-user-pen"></i> Request Profile Update
          </button>
        </div>

        <div style="display:grid; grid-template-columns: 1fr 2fr; gap:24px; margin-bottom:30px;">
          <!-- Profile Identity Card -->
          <div class="wm-chart-card" style="text-align:center; padding:32px 24px;">
            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" alt="Anandha Krishnan" style="width:100px; height:100px; border-radius:50%; object-fit:cover; border:3px solid var(--wm-primary); margin:0 auto 16px auto;">
            <h2 style="font-size:1.35rem; font-weight:700; color:var(--wm-dark); margin-bottom:4px;">Anandha Krishnan</h2>
            <div style="font-size:0.825rem; color:var(--wm-body-muted); margin-bottom:12px;">Client ID: #STK-8849201</div>
            <span class="wm-status-pill wm-pill-completed" style="margin-bottom:20px;"><i class="fa-solid fa-shield-check"></i> KYC Tier 3 Verified</span>

            <div style="text-align:left; border-top:1px solid var(--wm-border-light); padding-top:20px; display:flex; flex-direction:column; gap:12px; font-size:0.85rem;">
              <div>
                <span style="color:var(--wm-body-muted); display:block; font-size:0.75rem;">Registered Email</span>
                <strong style="color:var(--wm-dark);">anandha.k@stackly.com</strong>
              </div>
              <div>
                <span style="color:var(--wm-body-muted); display:block; font-size:0.75rem;">Contact Telephone</span>
                <strong style="color:var(--wm-dark);">+91 98765 43210</strong>
              </div>
              <div>
                <span style="color:var(--wm-body-muted); display:block; font-size:0.75rem;">Official Primary Address</span>
                <strong style="color:var(--wm-dark);">MMR Complex, Chinna Thirupathi, near Chinna Muniyappan Kovil, Salem, Tamil Nadu 636008</strong>
              </div>
              <div>
                <span style="color:var(--wm-body-muted); display:block; font-size:0.75rem;">Custody Account Number</span>
                <strong style="color:var(--wm-primary);">Charles Schwab #SCH-7729-19</strong>
              </div>
              <div>
                <span style="color:var(--wm-body-muted); display:block; font-size:0.75rem;">Accreditation Standard</span>
                <strong style="color:var(--wm-dark);">SEC Rule 501 / SEBI Qualified HNW Client</strong>
              </div>
            </div>
          </div>

          <!-- Account Mandates & Security Vault -->
          <div style="display:flex; flex-direction:column; gap:24px;">
            <!-- Risk Mandate Card -->
            <div class="wm-chart-card">
              <div style="font-weight:700; color:var(--wm-dark); font-size:1.05rem; margin-bottom:14px; display:flex; justify-content:space-between; align-items:center;">
                <span>Fiduciary Risk Tolerance & Mandate</span>
                <span class="wm-status-pill wm-pill-active">Score: 82 / 100</span>
              </div>
              <p style="font-size:0.875rem; color:var(--wm-body); line-height:1.6; margin-bottom:16px;">
                Your current mandate is classified as <strong>Moderate Capital Growth with Capital Preservation</strong>. Target asset mix is balanced at 40% Equities, 25% Fixed Income, 15% Real Estate, 12% International, and 8% Cash.
              </p>
              
              <div style="display:flex; justify-content:space-between; font-size:0.8rem; color:var(--wm-body-muted); margin-bottom:6px;">
                <span>Conservative (0)</span>
                <span style="font-weight:700; color:var(--wm-primary);">Moderate Growth (82)</span>
                <span>Max Aggressive (100)</span>
              </div>
              <div class="wm-progress-bar-bg" style="height:12px; margin-bottom:16px;">
                <div class="wm-progress-fill" style="width:82%;"></div>
              </div>

              <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:12px; font-size:0.8rem;">
                <div style="background:var(--wm-surface); padding:10px; border-radius:6px;">
                  <span style="color:var(--wm-body-muted); display:block;">Max Tolerated Drawdown</span>
                  <strong style="color:var(--wm-dark); font-size:0.9rem;">-8.0% Max</strong>
                </div>
                <div style="background:var(--wm-surface); padding:10px; border-radius:6px;">
                  <span style="color:var(--wm-body-muted); display:block;">Target Return Objective</span>
                  <strong style="color:var(--wm-primary); font-size:0.9rem;">12.0% – 15.0%</strong>
                </div>
                <div style="background:var(--wm-surface); padding:10px; border-radius:6px;">
                  <span style="color:var(--wm-body-muted); display:block;">Liquidity Horizon</span>
                  <strong style="color:var(--wm-dark); font-size:0.9rem;">Long-Term (7+ Yrs)</strong>
                </div>
              </div>
            </div>

            <!-- Document Vault Card -->
            <div class="wm-chart-card">
              <div style="font-weight:700; color:var(--wm-dark); font-size:1.05rem; margin-bottom:14px;">
                <i class="fa-solid fa-folder-closed" style="color:var(--wm-primary); margin-right:8px;"></i> Fiduciary Document Vault
              </div>
              <div style="display:flex; flex-direction:column; gap:12px;">
                <div style="display:flex; justify-content:space-between; align-items:center; padding:12px 16px; background:var(--wm-surface); border-radius:var(--wm-radius-sm);">
                  <div style="display:flex; align-items:center; gap:12px;">
                    <i class="fa-solid fa-file-pdf" style="color:#c0392b; font-size:1.3rem;"></i>
                    <div>
                      <strong style="color:var(--wm-dark); font-size:0.875rem;">Annual Tax Summary Statement 2026.pdf</strong>
                      <div style="font-size:0.75rem; color:var(--wm-body-muted);">Verified IRS Form 1099-DIV / Consolidated 1099</div>
                    </div>
                  </div>
                  <button class="wm-btn wm-btn-outline" style="padding:6px 14px; font-size:0.8rem;" onclick="triggerToast('Downloading Annual Tax Summary 2026.pdf...')">
                    <i class="fa-solid fa-download"></i> Download
                  </button>
                </div>

                <div style="display:flex; justify-content:space-between; align-items:center; padding:12px 16px; background:var(--wm-surface); border-radius:var(--wm-radius-sm);">
                  <div style="display:flex; align-items:center; gap:12px;">
                    <i class="fa-solid fa-file-shield" style="color:var(--wm-primary); font-size:1.3rem;"></i>
                    <div>
                      <strong style="color:var(--wm-dark); font-size:0.875rem;">Charles Schwab Institutional Custody Verification.pdf</strong>
                      <div style="font-size:0.75rem; color:var(--wm-body-muted);">SIPC Insured Custody Certification</div>
                    </div>
                  </div>
                  <button class="wm-btn wm-btn-outline" style="padding:6px 14px; font-size:0.8rem;" onclick="triggerToast('Downloading Schwab Custody Certificate.pdf...')">
                    <i class="fa-solid fa-download"></i> Download
                  </button>
                </div>

                <div style="display:flex; justify-content:space-between; align-items:center; padding:12px 16px; background:var(--wm-surface); border-radius:var(--wm-radius-sm);">
                  <div style="display:flex; align-items:center; gap:12px;">
                    <i class="fa-solid fa-file-contract" style="color:#27ae60; font-size:1.3rem;"></i>
                    <div>
                      <strong style="color:var(--wm-dark); font-size:0.875rem;">Investment Policy Statement (IPS) 2026.pdf</strong>
                      <div style="font-size:0.75rem; color:var(--wm-body-muted);">Binding Fiduciary Agreement with Stackly Wealth Management</div>
                    </div>
                  </div>
                  <button class="wm-btn wm-btn-outline" style="padding:6px 14px; font-size:0.8rem;" onclick="triggerToast('Downloading Investment Policy Statement.pdf...')">
                    <i class="fa-solid fa-download"></i> Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  </div>

  <!-- ==========================================================================
       Interactive Modals
       ========================================================================== -->
  <!-- Details / Factsheet Modal -->
  <div class="wm-modal-overlay" id="userModal">
    <div class="wm-modal-card">
      <button class="wm-modal-close" onclick="closeUserModal()" aria-label="Close modal">
        <i class="fa-solid fa-xmark"></i>
      </button>
      <div style="display:flex; align-items:center; gap:12px; margin-bottom:16px;">
        <div class="wm-logo-icon" style="width:40px; height:40px; font-size:1rem;">
          <i class="fa-solid fa-file-invoice"></i>
        </div>
        <div>
          <h3 id="userModalTitle" style="font-size:1.25rem; font-weight:700; color:var(--wm-dark); margin:0;">Product Factsheet</h3>
          <span style="font-size:0.75rem; color:var(--wm-body-muted);">Fiduciary Prospectus & Custody Specifications</span>
        </div>
      </div>
      <div id="userModalBody" style="background:var(--wm-surface); padding:20px; border-radius:var(--wm-radius-md); font-size:0.9rem; line-height:1.7; color:var(--wm-dark); margin-bottom:20px;">
        <!-- Injected product details -->
      </div>
      <div style="display:flex; justify-content:flex-end; gap:10px;">
        <button class="wm-btn wm-btn-secondary" style="padding:8px 18px; font-size:0.85rem;" onclick="triggerToast('Complete institutional prospectus downloaded.'); closeUserModal();">
          <i class="fa-solid fa-file-arrow-down"></i> Prospectus PDF
        </button>
        <button class="wm-btn wm-btn-primary" style="padding:8px 18px; font-size:0.85rem;" onclick="closeUserModal()">
          Close
        </button>
      </div>
    </div>
  </div>

  <!-- Invest Now Modal -->
  <div class="wm-modal-overlay" id="investModal">
    <div class="wm-modal-card">
      <button class="wm-modal-close" onclick="closeInvestModal()" aria-label="Close modal">
        <i class="fa-solid fa-xmark"></i>
      </button>
      <div style="display:flex; align-items:center; gap:12px; margin-bottom:16px;">
        <div class="wm-logo-icon" style="width:40px; height:40px; font-size:1rem;">
          <i class="fa-solid fa-wallet"></i>
        </div>
        <div>
          <h3 id="investModalTitle" style="font-size:1.25rem; font-weight:700; color:var(--wm-dark); margin:0;">Allocate Capital</h3>
          <span style="font-size:0.75rem; color:var(--wm-body-muted);">Charles Schwab Custody Account #SCH-7729-19</span>
        </div>
      </div>
      <div style="margin-bottom:20px;">
        <div style="background:var(--wm-surface); padding:16px; border-radius:var(--wm-radius-md); margin-bottom:16px; font-size:0.875rem;">
          <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
            <span style="color:var(--wm-body-muted);">Available Cash Sweep:</span>
            <strong style="color:var(--wm-dark);">$94,500.00 USD</strong>
          </div>
          <div style="display:flex; justify-content:space-between;">
            <span style="color:var(--wm-body-muted);">Minimum Required:</span>
            <strong id="investMinLabel" style="color:var(--wm-primary);">$25,000.00 USD</strong>
          </div>
        </div>
        <div style="font-size:0.875rem; color:var(--wm-body); line-height:1.5;">
          Clicking "Confirm Allocation" will generate an order instruction for your dedicated advisor Marcus Vance, CFA to execute via Charles Schwab Institutional.
        </div>
      </div>
      <div style="display:flex; justify-content:flex-end; gap:10px;">
        <button class="wm-btn wm-btn-outline" style="padding:8px 18px; font-size:0.85rem;" onclick="closeInvestModal()">
          Cancel
        </button>
        <button class="wm-btn wm-btn-primary" style="padding:8px 18px; font-size:0.85rem;" onclick="confirmInvestment()">
          <i class="fa-solid fa-check"></i> Confirm Allocation
        </button>
      </div>
    </div>
  </div>

  <!-- Reusable Toast Notification -->
  <div class="wm-toast" id="userToast">
    <i class="fa-solid fa-circle-check" style="color:var(--wm-secondary); font-size:1.2rem;"></i>
    <span id="userToastText">Action executed successfully.</span>
  </div>

  <!-- ==========================================================================
       Dashboard JavaScript (Tab Toggling, Chart.js, Search/Filter, Chat Interaction)
       ========================================================================== -->
  <script>
    // --- 1. Tab Toggling System (5 Strict Tabs) ---
    const userSidebarBtns = document.querySelectorAll('.wm-sidebar-btn');
    const userTabViews = document.querySelectorAll('.wm-tab-view');

    function switchTab(targetTabId) {
      userSidebarBtns.forEach(btn => {
        if (btn.getAttribute('data-tab') === targetTabId) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });

      userTabViews.forEach(view => {
        if (view.id === targetTabId) {
          view.classList.add('active');
        } else {
          view.classList.remove('active');
        }
      });

      // Close mobile sidebar on switch
      const sidebar = document.getElementById('userDashSidebar');
      if (sidebar && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
      }

      // Re-trigger layout resize for Chart.js
      window.dispatchEvent(new Event('resize'));
    }

    userSidebarBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        switchTab(targetTab);
      });
    });

    // --- 2. Mobile Sidebar Toggle ---
    const userSidebarToggle = document.getElementById('userSidebarToggle');
    const userDashSidebar = document.getElementById('userDashSidebar');
    if (userSidebarToggle && userDashSidebar) {
      userSidebarToggle.addEventListener('click', () => {
        userDashSidebar.classList.toggle('open');
      });
    }

    // --- 3. Toast Notification Helper ---
    function triggerToast(message) {
      const toast = document.getElementById('userToast');
      const text = document.getElementById('userToastText');
      if (toast && text) {
        text.innerText = message;
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
        }, 4000);
      }
    }

    // --- 4. Modals Helpers ---
    function openDetailsModal(title, htmlContent) {
      const modal = document.getElementById('userModal');
      const titleEl = document.getElementById('userModalTitle');
      const bodyEl = document.getElementById('userModalBody');
      if (modal && titleEl && bodyEl) {
        titleEl.innerText = title;
        bodyEl.innerHTML = htmlContent;
        modal.classList.add('active');
      }
    }

    function closeUserModal() {
      const modal = document.getElementById('userModal');
      if (modal) modal.classList.remove('active');
    }

    function openProductModal(name, apy, cat, min, liq, risk, desc) {
      const content = '<strong>Asset:</strong> ' + name + '<br>' +
        '<strong>Target APY:</strong> ' + apy + '<br>' +
        '<strong>Category:</strong> ' + cat + '<br>' +
        '<strong>Minimum:</strong> ' + min + '<br>' +
        '<strong>Liquidity:</strong> ' + liq + '<br>' +
        '<strong>Risk Classification:</strong> ' + risk + '<br><br>' +
        '<strong>Strategy Overview:</strong> ' + desc + '<br><br>' +
        '<span style="color:#27ae60; font-weight:700;"><i class="fa-solid fa-shield-check"></i> Fiduciary Approved for Anandha Krishnan Portfolio</span>';
      openDetailsModal(name + ' Factsheet', content);
    }

    let activeInvestProduct = '';
    function openInvestModal(productName, minAmt) {
      activeInvestProduct = productName;
      const modal = document.getElementById('investModal');
      const titleEl = document.getElementById('investModalTitle');
      const minLabel = document.getElementById('investMinLabel');
      if (modal && titleEl && minLabel) {
        titleEl.innerText = 'Allocate to ' + productName;
        minLabel.innerText = minAmt + ' USD';
        modal.classList.add('active');
      }
    }

    function closeInvestModal() {
      const modal = document.getElementById('investModal');
      if (modal) modal.classList.remove('active');
    }

    function confirmInvestment() {
      closeInvestModal();
      triggerToast('Allocation order for ' + activeInvestProduct + ' submitted to Marcus Vance for Charles Schwab execution.');
    }

    // --- 5. Notifications Bell Handler ---
    const userNotifBtn = document.getElementById('userNotifBtn');
    if (userNotifBtn) {
      userNotifBtn.addEventListener('click', () => {
        triggerToast('All 14 portfolio positions reconciled. Q3 dividend distribution credited.');
      });
    }

    // --- 6. Holdings Table Filter ---
    function filterUserHoldings() {
      const search = document.getElementById('userHoldingsSearch').value.toLowerCase();
      const cat = document.getElementById('userHoldingsCategoryFilter').value;
      const rows = document.querySelectorAll('#userHoldingsTable tbody tr');

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

    // --- 7. Financial Products Category Filter ---
    function filterProducts(cat) {
      const filterBtns = document.querySelectorAll('.wm-filter-btn');
      filterBtns.forEach(btn => {
        if (btn.getAttribute('data-cat') === cat) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });

      const cards = document.querySelectorAll('#productsGrid .wm-user-product-card');
      cards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (cat === 'all' || cardCat === cat) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    }

    // --- 8. Interactive Chat Functionality ---
    const chatInput = document.getElementById('chatMessageInput');
    const sendBtn = document.getElementById('sendMessageBtn');
    const chatContainer = document.getElementById('chatMessagesContainer');

    function sendChatMessage() {
      if (!chatInput) return;
      const msgText = chatInput.value.trim();
      if (!msgText) return;

      // Append user bubble
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const userBubble = document.createElement('div');
      userBubble.className = 'wm-chat-bubble wm-chat-user';
      userBubble.innerHTML = '<div style="font-size:0.75rem; color:rgba(255,255,255,0.8); margin-bottom:4px; font-weight:700;">You • ' + timeStr + '</div>' + escapeHtml(msgText);

      chatContainer.appendChild(userBubble);
      chatInput.value = '';
      chatContainer.scrollTop = chatContainer.scrollHeight;

      // Simulate friendly prompt response from Marcus Vance after 1.2 seconds
      setTimeout(() => {
        const advisorBubble = document.createElement('div');
        advisorBubble.className = 'wm-chat-bubble wm-chat-advisor';
        advisorBubble.innerHTML = '<div style="font-size:0.75rem; color:var(--wm-body-muted); margin-bottom:4px; font-weight:700;">Marcus Vance • ' + timeStr + '</div>' +
          'Understood, Anandha. I will review this against your fiduciary IPS guidelines and prepare the documentation for Schwab execution.';
        chatContainer.appendChild(advisorBubble);
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }, 1200);
    }

    function escapeHtml(str) {
      return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    if (sendBtn) {
      sendBtn.addEventListener('click', sendChatMessage);
    }
    if (chatInput) {
      chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          sendChatMessage();
        }
      });
    }

    // --- 9. Chart.js Initialization ---
    document.addEventListener('DOMContentLoaded', () => {
      Chart.defaults.font.family = "'Outfit', sans-serif";
      Chart.defaults.color = '#6c757d';

      // --- Portfolio Growth (24 Months) ---
      const ctxGrowth = document.getElementById('userChartGrowth');
      if (ctxGrowth) {
        new Chart(ctxGrowth, {
          type: 'line',
          data: {
            labels: [
              'Jan 25', 'Mar 25', 'May 25', 'Jul 25', 'Sep 25', 'Nov 25',
              'Jan 26', 'Mar 26', 'May 26', 'Jul 26', 'Sep 26', 'Nov 26'
            ],
            datasets: [{
              label: 'Portfolio Value ($)',
              data: [1150000, 1182000, 1215000, 1260000, 1295000, 1340000, 1365000, 1390000, 1420000, 1445000, 1468000, 1482900],
              borderColor: '#195353',
              backgroundColor: 'rgba(25, 83, 83, 0.12)',
              borderWidth: 3,
              fill: true,
              tension: 0.35,
              pointBackgroundColor: '#E5FF5E',
              pointBorderColor: '#195353',
              pointRadius: 4
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              y: {
                ticks: { callback: v => '$' + (v / 1000).toFixed(0) + 'K' },
                grid: { color: 'rgba(0,0,0,0.05)' }
              },
              x: { grid: { display: false } }
            }
          }
        });
      }

      // --- Asset Allocation Doughnut ---
      const ctxAlloc = document.getElementById('userChartAlloc');
      if (ctxAlloc) {
        new Chart(ctxAlloc, {
          type: 'doughnut',
          data: {
            labels: [
              'Equities Alpha (40%)',
              'Sovereign Fixed Income (25%)',
              'Real Estate & REITs (15%)',
              'Global Emerging (12%)',
              'Cash Sweep (8%)'
            ],
            datasets: [{
              data: [40, 25, 15, 12, 8],
              backgroundColor: ['#195353', '#236f6f', '#E5FF5E', '#021623', '#27ae60'],
              borderWidth: 2,
              borderColor: '#ffffff'
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: 'bottom', labels: { boxWidth: 10 } }
            }
          }
        });
      }
    });
  </script>
</body>
</html>
`;

fs.writeFileSync('user-dashboard.html', userHtml, 'utf8');
console.log('user-dashboard.html successfully generated! Length:', userHtml.length);
