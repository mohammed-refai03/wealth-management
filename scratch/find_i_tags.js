const fs = require('fs');

const files = ['index.html', 'about.html', 'services.html', 'blog.html', 'contact.html'];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  // Check if any <i has onclick, href, data-, or class with btn/link/click
  const iMatches = content.match(/<i\b[^>]*>/gi) || [];
  const interactiveI = iMatches.filter(t => /onclick|href|cursor|btn|link/i.test(t));
  console.log(`${f}: total <i> = ${iMatches.length}, interactive <i> = ${interactiveI.length}`);
  if (interactiveI.length > 0) {
    interactiveI.slice(0, 5).forEach(t => console.log('   ', t));
  }
});
