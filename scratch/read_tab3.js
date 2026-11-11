const fs = require('fs');
const html = fs.readFileSync('user-dashboard.html', 'utf8');
const start = html.indexOf('id="tab-user-messages"');
const end = html.indexOf('id="tab-user-products"');
console.log(html.substring(start, end));
