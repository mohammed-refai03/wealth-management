const fs = require('fs');

['index.html', 'about.html', 'services.html', 'blog.html', 'contact.html'].forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const mainMatches = content.match(/<main\b/gi) || [];
  const footerMatches = content.match(/<footer\b/gi) || [];
  console.log(`${f}: length=${content.length}, <main>=${mainMatches.length}, <footer>=${footerMatches.length}`);
});
