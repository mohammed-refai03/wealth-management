const fs = require('fs');

let html = fs.readFileSync('user-dashboard.html', 'utf8');

const mainStartTag = '<main class="wm-dash-main">';
const modalMarker = '<!-- ==========================================================================\n       Interactive Modals';

const mainStartIndex = html.indexOf(mainStartTag);
const modalIndex = html.indexOf(modalMarker);

if (mainStartIndex === -1 || modalIndex === -1) {
  console.error('Could not locate main or modal markers in user-dashboard.html');
  process.exit(1);
}

const mainContent = html.substring(mainStartIndex + mainStartTag.length, modalIndex);
const modalsAndScripts = html.substring(modalIndex);

const newUserHtml = `<!DOCTYPE html>
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
       Dashboard SaaS Shell Architecture (Matches Reference Screenshot)
       - Full-Height Left Sidebar: Logo at top, 5 Nav Items in middle, User Card + Logout at bottom
       - Top Header Bar: Page title on left, User Identity Profile on right
       - Clean Surface Main Area: Responsive 16px rounded cards with right-side icon boxes
       ========================================================================== -->
  <div class="wm-app-shell">

    <!-- Left Full-Height Sidebar -->
    <aside class="wm-app-sidebar" id="userDashSidebar">
      <!-- 1. Brand Logo at Top of Sidebar -->
      <div class="wm-sidebar-logo-box">
        <a href="index.html" class="wm-logo" style="text-decoration:none;">
          <div class="wm-logo-icon">
            <i class="fa-solid fa-chart-line"></i>
          </div>
          <div class="wm-logo-text">STACK<span>LY</span></div>
        </a>
      </div>

      <!-- 2. Exactly 5 Navigation Menu Items -->
      <nav class="wm-sidebar-nav">
        <!-- STRICT CONSTRAINT: EXACTLY 5 MENU OPTIONS -->
        <button class="wm-sidebar-nav-item active" data-tab="tab-user-overview" data-title="Overview">
          <i class="fa-solid fa-gauge-high"></i>
          <span>Overview</span>
        </button>
        <button class="wm-sidebar-nav-item" data-tab="tab-user-investments" data-title="My Investments">
          <i class="fa-solid fa-wallet"></i>
          <span>My Investments</span>
        </button>
        <button class="wm-sidebar-nav-item" data-tab="tab-user-advisory" data-title="Advisory Desk">
          <i class="fa-solid fa-user-tie"></i>
          <span>Advisory Desk</span>
        </button>
        <button class="wm-sidebar-nav-item" data-tab="tab-user-products" data-title="Financial Products">
          <i class="fa-solid fa-cubes"></i>
          <span>Financial Products</span>
        </button>
        <button class="wm-sidebar-nav-item" data-tab="tab-user-profile" data-title="Profile">
          <i class="fa-solid fa-user-shield"></i>
          <span>Profile</span>
        </button>
      </nav>

      <!-- 3. Bottom User Profile & Logout Link (Matches Screenshot) -->
      <div class="wm-sidebar-bottom">
        <div class="wm-sidebar-user-card">
          <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80" alt="Anandha Krishnan" class="wm-sidebar-user-avatar">
          <div class="wm-sidebar-user-info">
            <div class="wm-sidebar-user-name">Anandha Krishnan</div>
            <div class="wm-sidebar-user-email">anandha.k@stackly.com</div>
          </div>
        </div>
        <a href="login.html" class="wm-sidebar-logout-link" title="Sign out of portal">
          <i class="fa-solid fa-arrow-right-from-bracket"></i>
          <span>Logout</span>
        </a>
      </div>
    </aside>

    <!-- Right Content Area (Header + Main Content) -->
    <div class="wm-app-main-pane">
      
      <!-- Top Header Bar (Matches Screenshot) -->
      <header class="wm-app-topbar">
        <div class="wm-topbar-left">
          <button id="userSidebarToggle" class="wm-sidebar-toggle-btn" aria-label="Toggle Sidebar Navigation">
            <i class="fa-solid fa-bars"></i>
          </button>
          <span class="wm-topbar-title" id="userHeaderTabTitle">Overview</span>
        </div>

        <div class="wm-topbar-right">
          <div style="background:var(--wm-surface); border:1px solid var(--wm-border-light); padding:4px 12px; border-radius:var(--wm-radius-full); font-size:0.75rem; color:var(--wm-dark); display:none; @media(min-width:1100px){display:flex; align-items:center; gap:8px;}">
            <span style="color:var(--wm-body-muted);">Net Worth:</span>
            <strong style="color:var(--wm-primary); font-size:0.85rem;">$1,482,900.00</strong>
            <span class="wm-kpi-trend wm-trend-up" style="font-size:0.7rem; padding:1px 6px;">+12.6% YTD</span>
          </div>

          <!-- Notification Button -->
          <button class="wm-notif-btn" id="userNotifBtn" title="View Notifications" aria-label="Notifications">
            <i class="fa-regular fa-bell"></i>
            <span class="wm-notif-dot"></span>
          </button>

          <!-- Topbar User Profile (Matches Screenshot: User name, email, circle avatar) -->
          <div class="wm-topbar-profile">
            <div>
              <div class="wm-topbar-name">Anandha Krishnan</div>
              <div class="wm-topbar-role">anandha.k@stackly.com</div>
            </div>
            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80" alt="Anandha Krishnan" class="wm-topbar-avatar">
          </div>
        </div>
      </header>

      <!-- Main Content Scrolling Area -->
      <main class="wm-app-content-body">
` + mainContent + `
      </main>
    </div>
  </div>

` + modalsAndScripts;

let updatedUserHtml = newUserHtml;

// In the script section of user-dashboard.html, update userSidebarBtns query selector and switchTab logic
updatedUserHtml = updatedUserHtml.replace(
  "const userSidebarBtns = document.querySelectorAll('.wm-sidebar-btn');",
  "const userSidebarBtns = document.querySelectorAll('.wm-sidebar-nav-item');"
);

const oldUserSwitchTabFn = `    function switchTab(targetTabId) {
      userSidebarBtns.forEach(btn => {
        if (btn.getAttribute('data-tab') === targetTabId) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });`;

const newUserSwitchTabFn = `    function switchTab(targetTabId) {
      const headerTitleEl = document.getElementById('userHeaderTabTitle');
      userSidebarBtns.forEach(btn => {
        if (btn.getAttribute('data-tab') === targetTabId) {
          btn.classList.add('active');
          if (headerTitleEl) {
            headerTitleEl.innerText = btn.getAttribute('data-title') || btn.querySelector('span').innerText;
          }
        } else {
          btn.classList.remove('active');
        }
      });`;

updatedUserHtml = updatedUserHtml.replace(oldUserSwitchTabFn, newUserSwitchTabFn);

// Also convert KPI cards in user-dashboard to modern screenshot structure
const kpiCardRegex = /<div class="wm-kpi-card">\s*<div class="wm-kpi-top">\s*<div class="wm-kpi-icon"><i class="([^"]+)"><\/i><\/div>\s*<span class="wm-kpi-trend([^"]*)">(.*?)<\/span>\s*<\/div>\s*<div class="wm-kpi-val">(.*?)<\/div>\s*<div class="wm-kpi-lbl">(.*?)<\/div>\s*<\/div>/g;

updatedUserHtml = updatedUserHtml.replace(kpiCardRegex, (match, icon, trendClass, trendText, val, lbl) => {
  return `<div class="wm-kpi-card-modern">
            <div class="wm-kpi-modern-left">
              <div class="wm-kpi-lbl">${lbl}</div>
              <div class="wm-kpi-val">${val}</div>
              <span class="wm-kpi-trend${trendClass}">${trendText}</span>
            </div>
            <div class="wm-kpi-modern-icon">
              <i class="${icon}"></i>
            </div>
          </div>`;
});

fs.writeFileSync('user-dashboard.html', updatedUserHtml, 'utf8');
console.log('user-dashboard.html transformed to screenshot structure successfully! New length:', updatedUserHtml.length);
