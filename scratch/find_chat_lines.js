const fs = require('fs');
const lines = fs.readFileSync('user-dashboard.html', 'utf8').split('\n');
lines.forEach((l, idx) => {
  if (l.includes('wm-chat') || l.includes('chatMessage') || l.includes('sendMessageBtn')) {
    console.log(`Line ${idx}: ${l}`);
  }
});
