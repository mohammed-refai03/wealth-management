const fs = require('fs');

['about.html', 'services.html', 'blog.html', 'contact.html'].forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  console.log(`\n=================== ${f} ===================`);
  const match = content.match(/<main>[\s\S]*?<\/section>/);
  if (match) {
    console.log(match[0]);
  }
});
