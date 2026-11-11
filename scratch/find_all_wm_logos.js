const fs = require('fs');

const files = ['index.html', 'about.html', 'services.html', 'blog.html', 'contact.html'];

files.forEach(f => {
  const lines = fs.readFileSync(f, 'utf8').split('\n');
  console.log(`=== ${f} ===`);
  lines.forEach((line, idx) => {
    if (line.includes('class="wm-logo"')) {
      console.log(`Line ${idx + 1}: ${line.trim()}`);
      for (let j = 1; j <= 5; j++) {
        if (lines[idx + j]) console.log(`  +${j}: ${lines[idx + j].trim()}`);
      }
    }
  });
});
