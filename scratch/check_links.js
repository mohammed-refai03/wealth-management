const fs = require('fs');

const files = [
  'index.html', 'about.html', 'services.html', 'blog.html', 'contact.html',
  'cookies.html', 'disclaimer.html', 'privacy.html', 'terms.html',
  'login.html', 'signup.html', 'admin-dashboard.html', 'user-dashboard.html'
];

files.forEach(f => {
  if (fs.existsSync(f)) {
    const content = fs.readFileSync(f, 'utf8');
    const hasLoginLink = content.includes('login.html');
    console.log(`${f} -> includes login.html: ${hasLoginLink}`);
  } else {
    console.log(`${f} -> NOT FOUND`);
  }
});
