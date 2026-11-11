const fs = require('fs');
const lines = fs.readFileSync('user-dashboard.html', 'utf8').split('\n');
const start = lines.findIndex(l => l.includes('id="tab-user-advisory"'));
const end = lines.findIndex(l => l.includes('id="tab-user-products"'));
console.log('tab-user-advisory starts at line:', start);
console.log('tab-user-products starts at line:', end);
console.log(lines.slice(start - 2, end).join('\n'));
