const fs = require('fs');

const files = ['index.html', 'about.html', 'services.html', 'blog.html', 'contact.html'];

const headerRegex = /<a href="index\.html" class="wm-logo">\s*<div class="wm-logo-icon">[\s\S]*?<\/div>\s*<div class="wm-logo-text">STACK<span>LY<\/span><\/div>\s*<\/a>/g;

const footerRegex = /<a href="index\.html" class="wm-logo" style="margin-bottom: 1\.25rem;">\s*<div class="wm-logo-icon">[\s\S]*?<\/div>\s*<div class="wm-logo-text"[^>]*>STACK<span[^>]*>LY<\/span><\/div>\s*<\/a>/g;

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const hMatches = (content.match(headerRegex) || []).length;
  const fMatches = (content.match(footerRegex) || []).length;
  console.log(`${f}: header/drawer regex matches = ${hMatches}, footer regex matches = ${fMatches}`);
});
