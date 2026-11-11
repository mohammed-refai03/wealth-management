const fs = require('fs');

const files = ['admin-dashboard.html', 'user-dashboard.html'];

files.forEach(file => {
  console.log(`\n================ Checking ${file} ================`);
  const html = fs.readFileSync(file, 'utf8');

  // Check structure classes
  console.log('wm-app-shell:', html.includes('class="wm-app-shell"'));
  console.log('wm-app-sidebar:', html.includes('class="wm-app-sidebar"'));
  console.log('wm-sidebar-logo-box:', html.includes('class="wm-sidebar-logo-box"'));
  console.log('wm-sidebar-bottom:', html.includes('class="wm-sidebar-bottom"'));
  console.log('wm-sidebar-user-card:', html.includes('class="wm-sidebar-user-card"'));
  console.log('wm-sidebar-logout-link:', html.includes('class="wm-sidebar-logout-link"'));
  console.log('wm-app-topbar:', html.includes('class="wm-app-topbar"'));
  console.log('wm-topbar-profile:', html.includes('class="wm-topbar-profile"'));
  console.log('wm-app-content-body:', html.includes('class="wm-app-content-body"'));

  // Check sidebar tabs
  const sidebarTabs = [...html.matchAll(/<button class="wm-sidebar-nav-item[^"]*"[^>]*data-tab="([^"]+)"/g)].map(m => m[1]);
  console.log('Sidebar tabs count:', sidebarTabs.length, sidebarTabs);

  // Check tab sections
  const tabSections = [...html.matchAll(/<section id="([^"]+)" class="wm-tab-view/g)].map(m => m[1]);
  console.log('Tab sections count:', tabSections.length, tabSections);

  // Check forms count
  const forms = [...html.matchAll(/<form/gi)];
  console.log('Forms count (Must be 0):', forms.length);

  // Check SVG count
  const svgs = [...html.matchAll(/<svg/g)];
  console.log('SVG count (only favicon data uri):', svgs.length);

  // Check Chart.js
  console.log('Chart.js included:', html.includes('cdn.jsdelivr.net/npm/chart.js'));

  // Check KPI cards modern count
  const modernKpiCards = [...html.matchAll(/class="wm-kpi-card-modern"/g)];
  console.log('Modern KPI cards count:', modernKpiCards.length);
});
