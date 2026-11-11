const fs = require('fs');

['index.html', 'about.html', 'services.html', 'blog.html', 'contact.html'].forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const navMatch = content.match(/<nav\b[^>]*>([\s\S]*?)<\/nav>/i);
  if (navMatch) {
    const text = navMatch[1];
    const hasHome = text.includes('href="index.html"');
    const hasAbout = text.includes('href="about.html"');
    const hasServices = text.includes('href="services.html"');
    const hasBlog = text.includes('href="blog.html"');
    const hasContact = text.includes('href="contact.html"');
    const hasLogin = content.includes('href="login.html"');
    console.log(`${f}: Nav complete -> Home:${hasHome}, About:${hasAbout}, Services:${hasServices}, Blog:${hasBlog}, Contact:${hasContact}, Login:${hasLogin}`);
  } else {
    console.log(`${f}: NO NAV TAG FOUND`);
  }
});
