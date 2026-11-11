const fs = require('fs');
const code = fs.readFileSync('scratch/insert_about_sections.js', 'utf8');
console.log('insert_about_sections.js length:', code.length);
// print where sections are inserted into aboutHtml
const lines = code.split('\n');
lines.forEach((l, idx) => {
  if (l.includes('aboutHtml =') || l.includes('fs.writeFileSync')) {
    console.log(`${idx+1}: ${l.trim()}`);
  }
});
