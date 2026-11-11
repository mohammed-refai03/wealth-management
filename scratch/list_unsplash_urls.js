const fs = require('fs');

const files = ['index.html', 'about.html', 'services.html', 'blog.html', 'contact.html'];
const urls = new Set();

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const matches = content.match(/https:\/\/images\.unsplash\.com\/[^\s"'\)]+/g) || [];
  matches.forEach(m => urls.add(m));
});

console.log(`Found ${urls.size} Unsplash URLs:`);
Array.from(urls).forEach(u => console.log('  ', u));
