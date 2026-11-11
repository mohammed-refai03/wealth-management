const fs = require('fs');
const lines = fs.readFileSync('user-dashboard.html', 'utf8').split('\n');
console.log(lines.slice(1710, 1775).join('\n'));
