const fs = require('fs');
const lines = fs.readFileSync('user-dashboard.html', 'utf8').split('\n');
console.log('--- Lines 560 to 570 ---');
console.log(lines.slice(560, 570).join('\n'));
console.log('--- Lines 680 to 692 ---');
console.log(lines.slice(680, 692).join('\n'));
