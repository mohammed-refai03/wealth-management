const fs = require('fs');
const html = fs.readFileSync('user-dashboard.html', 'utf8');

const scriptMatches = [...html.matchAll(/<script(?![^>]*src)[^>]*>([\s\S]*?)<\/script>/gi)];
console.log('Inline script tags found:', scriptMatches.length);

scriptMatches.forEach((m, idx) => {
  try {
    new Function(m[1]);
    console.log(`Script block #${idx + 1} syntax valid!`);
  } catch (err) {
    console.error(`Script block #${idx + 1} syntax error:`, err);
    process.exit(1);
  }
});
