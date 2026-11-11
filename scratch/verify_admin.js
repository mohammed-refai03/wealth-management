const fs = require('fs');
const html = fs.readFileSync('admin-dashboard.html', 'utf8');

// Check sidebar buttons
const sidebarMatches = [...html.matchAll(/<button class="wm-sidebar-btn[^"]*"[^>]*data-tab="([^"]+)"/g)];
console.log('Sidebar tabs found in admin-dashboard.html:', sidebarMatches.map(m => m[1]));

// Check icons
const faIcons = [...html.matchAll(/class="[^"]*(fa-solid|fa-brands|fa-regular)[^"]*"/g)];
console.log('Font Awesome icons found:', faIcons.length);

// Check if any emoji or inline SVG icons are present
const svgIcons = [...html.matchAll(/<svg/g)];
console.log('SVG tags (should only be favicon data uri):', svgIcons.length);

// Check tabs
const tabSections = [...html.matchAll(/<section id="([^"]+)" class="wm-tab-view/g)];
console.log('Tab sections found:', tabSections.map(m => m[1]));
