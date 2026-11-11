const fs = require('fs');
const lines = fs.readFileSync('user-dashboard.html', 'utf8').split('\n');
lines.forEach((l, idx) => {
  if (l.includes('switchTab') && l.includes('tab-user-messages')) {
    console.log(`Line ${idx}: ${l}`);
  }
});
