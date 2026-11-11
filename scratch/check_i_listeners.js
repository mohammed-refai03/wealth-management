const fs = require('fs');

// Check js files for any selector selecting 'i' or 'fa-'
const jsFiles = ['js/main.js', 'js/app.js'];
jsFiles.forEach(f => {
  if (!fs.existsSync(f)) return;
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  lines.forEach((l, idx) => {
    if (l.includes('querySelector') && (l.includes('.fa') || l.includes('i.'))) {
      console.log(`${f}:${idx+1} ${l.trim()}`);
    }
  });
});

// Check css files for cursor: pointer on i or fa-
const cssContent = fs.readFileSync('css/styles.css', 'utf8');
const cssLines = cssContent.split('\n');
cssLines.forEach((l, idx) => {
  if (l.includes('cursor: pointer') && (l.includes('.fa') || l.includes('i.'))) {
    console.log(`styles.css:${idx+1} ${l.trim()}`);
  }
});
