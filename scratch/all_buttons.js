const fs = require('fs');

const files = ['index.html', 'about.html', 'services.html', 'blog.html', 'contact.html'];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const btns = content.match(/<button\b[^>]*>[\s\S]*?<\/button>/gi) || [];
  console.log(`\n================ ${f} (${btns.length} buttons) ================`);
  btns.forEach((b, i) => {
    const openTag = b.match(/<button\b[^>]*>/i)[0];
    const text = b.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    console.log(`  ${i+1}: ${openTag} -> text: "${text.slice(0, 40)}"`);
  });
});
