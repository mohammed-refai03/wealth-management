const fs = require('fs');

['admin-dashboard.html', 'user-dashboard.html'].forEach(file => {
  const html = fs.readFileSync(file, 'utf8');
  const scripts = [...html.matchAll(/<script(?![^>]*src)[^>]*>([\s\S]*?)<\/script>/gi)];
  scripts.forEach((s, idx) => {
    try {
      new Function(s[1]);
      console.log(`${file} inline script #${idx + 1} is valid!`);
    } catch (e) {
      console.error(`${file} inline script #${idx + 1} ERROR:`, e);
      process.exit(1);
    }
  });
});
