const fs = require('fs');
const code = fs.readFileSync('scratch/insert_remaining_sections.js', 'utf8');
console.log('insert_remaining_sections.js length:', code.length);
const lines = code.split('\n');
lines.forEach((l, idx) => {
  if (l.includes('<section') || l.includes('fs.writeFileSync')) {
    console.log(`${idx+1}: ${l.trim().slice(0, 80)}`);
  }
});
