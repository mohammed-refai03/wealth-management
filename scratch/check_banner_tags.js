const fs = require('fs');

['blog.html', 'contact.html'].forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  console.log(`${f} has wm-page-banner: ${content.includes('wm-page-banner')}`);
  const match = content.match(/<section class="wm-page-banner[^"]*"[^>]*>/);
  console.log(`${f} section tag:`, match ? match[0] : 'NONE');
});
