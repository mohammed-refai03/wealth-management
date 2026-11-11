const fs = require('fs');
const html = fs.readFileSync('user-dashboard.html', 'utf8');

// Check sidebar buttons
const sidebarMatches = [...html.matchAll(/<button class="wm-sidebar-btn[^"]*"[^>]*data-tab="([^"]+)"/g)];
console.log('Sidebar tabs found in user-dashboard.html:', sidebarMatches.map(m => m[1]));

// Check sidebar tab labels
const sidebarLabels = [...html.matchAll(/<button class="wm-sidebar-btn[^"]*"[^>]*data-tab="([^"]+)">[\s\S]*?<span>([^<]+)<\/span>/g)];
console.log('Sidebar tab labels:', sidebarLabels.map(m => `${m[1]} -> ${m[2]}`));

// Check tab sections
const tabSections = [...html.matchAll(/<section id="([^"]+)" class="wm-tab-view/g)];
console.log('Tab sections found:', tabSections.map(m => m[1]));

// Check icons
const faIcons = [...html.matchAll(/class="[^"]*(fa-solid|fa-brands|fa-regular)[^"]*"/g)];
console.log('Font Awesome icons found:', faIcons.length);

// Check if any emoji or inline SVG icons are present
const svgIcons = [...html.matchAll(/<svg/g)];
console.log('SVG tags (should only be favicon data uri):', svgIcons.length);

// Check forms inside dashboard
const forms = [...html.matchAll(/<form/gi)];
console.log('Form tags inside user dashboard (Must be 0):', forms.length);

// Check Overview button
console.log('Overview button calls switchTab("tab-user-advisory"):', html.includes("switchTab('tab-user-advisory')"));
