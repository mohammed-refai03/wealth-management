const fs = require('fs');

['blog.html', 'contact.html'].forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  console.log(`Checking ${f}...`);
  const hasSec = content.includes('<section class="wm-page-banner">');
  console.log(`  hasSec: ${hasSec}`);
  const pMatch = content.match(/<p style="max-width: 760px; color: rgba\(255, 255, 255, 0\.85\); font-size: 1\.125rem; line-height: 1\.7; margin-bottom: 28px;">[\s\S]*?<\/p>/);
  console.log(`  pMatch: ${!!pMatch}`);
});
