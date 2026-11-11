const fs = require('fs');
const html = fs.readFileSync('admin-dashboard.html', 'utf8');

const sidebarMatches = [...html.matchAll(/<button class="wm-sidebar-nav-item[^"]*"[^>]*data-tab="([^"]+)"/g)];
console.log('Sidebar tabs in admin-dashboard.html:', sidebarMatches.map(m => m[1]));

const tabSections = [...html.matchAll(/<section id="([^"]+)" class="wm-tab-view/g)];
console.log('Tab sections found:', tabSections.map(m => m[1]));

const forms = [...html.matchAll(/<form/gi)];
console.log('Forms count (must be 0):', forms.length);

const faIcons = [...html.matchAll(/class="[^"]*(fa-solid|fa-brands|fa-regular)[^"]*"/g)];
console.log('FA icons found:', faIcons.length);

console.log('Has wm-app-shell:', html.includes('class="wm-app-shell"'));
console.log('Has wm-app-sidebar:', html.includes('class="wm-app-sidebar"'));
console.log('Has wm-app-topbar:', html.includes('class="wm-app-topbar"'));
console.log('Has wm-sidebar-logo-box:', html.includes('class="wm-sidebar-logo-box"'));
console.log('Has wm-sidebar-user-card:', html.includes('class="wm-sidebar-user-card"'));
console.log('Has wm-topbar-profile:', html.includes('class="wm-topbar-profile"'));
