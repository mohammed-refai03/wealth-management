const fs = require('fs');

const files = ['index.html', 'about.html', 'services.html', 'blog.html', 'contact.html'];

const headerRegex = /<a href="index\.html" class="wm-logo">\s*<div class="wm-logo-icon">[\s\S]*?<\/div>\s*<div class="wm-logo-text">STACK<span>LY<\/span><\/div>\s*<\/a>/g;

const footerRegex = /<a href="index\.html" class="wm-logo" style="margin-bottom: 1\.25rem;">\s*<div class="wm-logo-icon">[\s\S]*?<\/div>\s*<div class="wm-logo-text"[^>]*>STACK<span[^>]*>LY<\/span><\/div>\s*<\/a>/g;

const headerReplacement = `<a href="index.html" class="wm-logo">
          <img src="assets/images/logo.webp" alt="Stackly Wealth Management" class="wm-logo-img">
        </a>`;

const footerReplacement = `<a href="index.html" class="wm-logo" style="margin-bottom: 1.25rem;">
            <img src="assets/images/logo.webp" alt="Stackly Wealth Management" class="wm-logo-img">
          </a>`;

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  const hMatches = (content.match(headerRegex) || []).length;
  const fMatches = (content.match(footerRegex) || []).length;
  console.log(`${f}: Replacing ${hMatches} header/drawer logos and ${fMatches} footer logos`);

  content = content.replace(headerRegex, headerReplacement);
  content = content.replace(footerRegex, footerReplacement);

  fs.writeFileSync(f, content, 'utf8');
  console.log(`${f}: Updated successfully.`);
});
