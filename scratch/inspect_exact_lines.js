const fs = require('fs');

['index.html', 'services.html'].forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  console.log(`=== ${f} ===`);
  const lines = content.split('\n');
  lines.forEach((l, i) => {
    if (l.includes('class="wm-logo"')) {
      console.log(`--- Match at line ${i+1} ---`);
      for (let k = 0; k < 6; k++) {
        console.log(JSON.stringify(lines[i+k]));
      }
    }
  });
});
