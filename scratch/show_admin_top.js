const fs = require('fs');
const html = fs.readFileSync('admin-dashboard.html', 'utf8');
console.log(html.substring(1385, 4881));
