const fs = require('fs');
const content = fs.readFileSync('scratch/services_original.html', 'utf8');

const sections = content.match(/<section\b[^>]*>/gi) || [];
console.log(`scratch/services_original.html total sections: ${sections.length}`);
sections.forEach((s, idx) => {
  console.log(`  ${idx+1}: ${s}`);
});
