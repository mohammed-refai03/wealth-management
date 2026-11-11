const fs = require('fs');

const files = ['index.html', 'about.html', 'services.html', 'blog.html', 'contact.html'];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const matches = [...content.matchAll(/<i\b([^>]*)>/gi)];
  console.log(`\n=== ${f} (${matches.length} <i> tags) ===`);
  matches.forEach((m, idx) => {
    const attrs = m[1];
    if (/onclick|cursor|data-|role|tabindex|id/i.test(attrs)) {
      console.log(`  #${idx+1}: ${m[0]}`);
    }
  });
});
