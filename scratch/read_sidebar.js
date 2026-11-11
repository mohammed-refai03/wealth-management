const fs = require('fs');
const html = fs.readFileSync('user-dashboard.html', 'utf8');
const start = html.indexOf('<aside class="wm-dash-sidebar"');
const end = html.indexOf('</aside>');
console.log(html.substring(start, end + 8));
