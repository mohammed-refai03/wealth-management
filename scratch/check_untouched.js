const fs = require('fs');

['login.html', 'signup.html', 'user-dashboard.html', 'admin-dashboard.html'].forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  console.log(`${f}: Length = ${content.length}`);
});
