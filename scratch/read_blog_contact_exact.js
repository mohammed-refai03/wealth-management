const fs = require('fs');

['blog.html', 'contact.html'].forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  console.log(`=== ${f} ===`);
  lines.forEach((l, idx) => {
    if (l.includes('<section class="wm-page-banner">')) {
      for (let j = 0; j < 25; j++) {
        console.log(idx + 1 + j, JSON.stringify(lines[idx + j]));
      }
    }
  });
});
