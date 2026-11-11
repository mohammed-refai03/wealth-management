const fs = require('fs');

['index.html', 'blog.html', 'contact.html'].forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const sections = content.match(/<section\b[^>]*>/gi) || [];
  console.log(`\n================== ${f} (${sections.length} sections) ==================`);
  sections.forEach((s, idx) => {
    console.log(`  ${idx+1}: ${s.slice(0, 80)}`);
  });
});
