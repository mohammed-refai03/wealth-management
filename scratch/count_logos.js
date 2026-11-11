const fs = require('fs');

const files = ['index.html', 'about.html', 'services.html', 'blog.html', 'contact.html', 'login.html', 'signup.html', '404.html'];

files.forEach(f => {
  if (!fs.existsSync(f)) return;
  const content = fs.readFileSync(f, 'utf8');
  const count = (content.match(/class="wm-logo"/g) || []).length;
  console.log(`${f}: ${count} wm-logo occurrences`);
});
