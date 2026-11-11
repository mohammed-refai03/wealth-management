const fs = require('fs');

['about.html', 'services.html'].forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  console.log(`\n================== ${f} ==================`);
  const sections = content.match(/<section\b[^>]*>/gi) || [];
  console.log(`Total <section> tags: ${sections.length}`);
  sections.forEach((s, idx) => {
    // print section tag
    console.log(`  ${idx+1}: ${s}`);
  });
});
