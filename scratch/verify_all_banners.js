const fs = require('fs');

['about.html', 'services.html', 'blog.html', 'contact.html'].forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  console.log(`\n=================== ${f} ===================`);
  const match = content.match(/<section class="wm-page-banner"[\s\S]*?<\/section>/);
  if (match) {
    // print first 25 lines of banner
    console.log(match[0].split('\n').slice(0, 25).join('\n'));
  }
});
