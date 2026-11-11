const fs = require('fs');

let html = fs.readFileSync('admin-dashboard.html', 'utf8');

// 1. Locate main content and scripts
// The content starts at: <main class="wm-dash-main">
// and ends before: <!-- Interactive Details Modal
const mainStartTag = '<main class="wm-dash-main">';
const modalMarker = '<!-- ==========================================================================\n       Interactive Details Modal';

const mainStartIndex = html.indexOf(mainStartTag);
const modalIndex = html.indexOf(modalMarker);

if (mainStartIndex === -1 || modalIndex === -1) {
  console.error('Could not locate main or modal markers in admin-dashboard.html');
  process.exit(1);
}

const mainContent = html.substring(mainStartIndex + mainStartTag.length, modalIndex);
const modalsAndScripts = html.substring(modalIndex);

// 2. Build the new shell layout for admin-dashboard.html
const newAdminHtml = `<!DOCTYPE html>
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
       Dashboard SaaS Shell Architecture (Matches Reference Screenshot)
       - Full-Height Left Sidebar: Logo at top, 5 Nav Items in middle, User Card + Logout at bottom
       - Top Header Bar: Page title on left, User Identity Profile on right
       - Clean Surface Main Area: Responsive 16px rounded cards with right-side icon boxes
       ========================================================================== -->
  <div class="wm-app-shell">

    <!-- Left Full-Height Sidebar -->
    <aside class="wm-app-sidebar" id="dashSidebar">
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
        <button class="wm-sidebar-nav-item active" data-tab="tab-overview" data-title="Overview">
          <i class="fa-solid fa-chart-pie"></i>
          <span>Overview</span>
        </button>
        <button class="wm-sidebar-nav-item" data-tab="tab-clients" data-title="Clients">
          <i class="fa-solid fa-users"></i>
          <span>Clients</span>
        </button>
        <button class="wm-sidebar-nav-item" data-tab="tab-investments" data-title="Investments">
          <i class="fa-solid fa-chart-line"></i>
          <span>Investments</span>
        </button>
        <button class="wm-sidebar-nav-item" data-tab="tab-transactions" data-title="Transactions">
          <i class="fa-solid fa-receipt"></i>
          <span>Transactions</span>
        </button>
        <button class="wm-sidebar-nav-item" data-tab="tab-analytics" data-title="Analytics">
          <i class="fa-solid fa-chart-simple"></i>
          <span>Analytics</span>
        </button>
      </nav>

      <!-- 3. Bottom User Profile & Logout Link (Matches Screenshot) -->
      <div class="wm-sidebar-bottom">
        <div class="wm-sidebar-user-card">
          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80" alt="Marcus Vance" class="wm-sidebar-user-avatar">
          <div class="wm-sidebar-user-info">
            <div class="wm-sidebar-user-name">Marcus Vance, CFA</div>
            <div class="wm-sidebar-user-email">marcus.v@stackly.com</div>
          </div>
        </div>
        <a href="login.html" class="wm-sidebar-logout-link" title="Sign out of advisory console">
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
          <button id="sidebarToggle" class="wm-sidebar-toggle-btn" aria-label="Toggle Sidebar Navigation">
            <i class="fa-solid fa-bars"></i>
          </button>
          <span class="wm-topbar-title" id="headerTabTitle">Overview</span>
        </div>

        <div class="wm-topbar-right">
          <span class="wm-dash-badge" style="display:none; @media(min-width:1100px){display:inline-block;}">
            <i class="fa-solid fa-circle-check" style="color:#27ae60; margin-right:4px;"></i> Schwab & Fidelity Custody
          </span>

          <!-- Notification Button -->
          <button class="wm-notif-btn" id="notifBtn" title="View System Notifications" aria-label="Notifications">
            <i class="fa-regular fa-bell"></i>
            <span class="wm-notif-dot"></span>
          </button>

          <!-- Topbar User Profile (Matches Screenshot: User name, email, circle avatar) -->
          <div class="wm-topbar-profile">
            <div>
              <div class="wm-topbar-name">Marcus Vance, CFA</div>
              <div class="wm-topbar-role">marcus.v@stackly.com</div>
            </div>
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80" alt="Marcus Vance" class="wm-topbar-avatar">
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

// In the script section of admin-dashboard.html, update switchTab to handle .wm-sidebar-nav-item and update #headerTabTitle
let updatedHtml = newAdminHtml;

// Replace sidebarBtns query selector and switchTab logic in script
updatedHtml = updatedHtml.replace(
  "const sidebarBtns = document.querySelectorAll('.wm-sidebar-btn');",
  "const sidebarBtns = document.querySelectorAll('.wm-sidebar-nav-item');"
);

// Enhance switchTab to update headerTabTitle
const oldSwitchTabFn = `    function switchTab(targetTabId) {
      sidebarBtns.forEach(btn => {
        if (btn.getAttribute('data-tab') === targetTabId) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });`;

const newSwitchTabFn = `    function switchTab(targetTabId) {
      const headerTitleEl = document.getElementById('headerTabTitle');
      sidebarBtns.forEach(btn => {
        if (btn.getAttribute('data-tab') === targetTabId) {
          btn.classList.add('active');
          if (headerTitleEl) {
            headerTitleEl.innerText = btn.getAttribute('data-title') || btn.querySelector('span').innerText;
          }
        } else {
          btn.classList.remove('active');
        }
      });`;

updatedHtml = updatedHtml.replace(oldSwitchTabFn, newSwitchTabFn);

// Also convert KPI cards in mainContent to have the screenshot structure:
// In the screenshot: Left has label and value; Right has the icon box!
// Let's replace each <div class="wm-kpi-card"> inner structure:
// From:
// <div class="wm-kpi-card">
//   <div class="wm-kpi-top">
//     <div class="wm-kpi-icon"><i class="(.*?)"></i></div>
//     <span class="wm-kpi-trend (.*?)">(.*?)</span>
//   </div>
//   <div class="wm-kpi-val">(.*?)</div>
//   <div class="wm-kpi-lbl">(.*?)</div>
// </div>
// To:
// <div class="wm-kpi-card-modern">
//   <div class="wm-kpi-modern-left">
//     <div class="wm-kpi-lbl">$5</div>
//     <div class="wm-kpi-val">$4</div>
//     <span class="wm-kpi-trend $2">$3</span>
//   </div>
//   <div class="wm-kpi-modern-icon">
//     <i class="$1"></i>
//   </div>
// </div>

const kpiCardRegex = /<div class="wm-kpi-card">\s*<div class="wm-kpi-top">\s*<div class="wm-kpi-icon"><i class="([^"]+)"><\/i><\/div>\s*<span class="wm-kpi-trend([^"]*)">(.*?)<\/span>\s*<\/div>\s*<div class="wm-kpi-val">(.*?)<\/div>\s*<div class="wm-kpi-lbl">(.*?)<\/div>\s*<\/div>/g;

updatedHtml = updatedHtml.replace(kpiCardRegex, (match, icon, trendClass, trendText, val, lbl) => {
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

fs.writeFileSync('admin-dashboard.html', updatedHtml, 'utf8');
console.log('admin-dashboard.html transformed to screenshot structure successfully! New length:', updatedHtml.length);
