const fs = require('fs');

['about.html', 'services.html', 'blog.html', 'contact.html'].forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const main = content.match(/<main>([\s\S]*?)<\/main>/)[1];

  const regex = /<a\b[^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  let i = 1;
  console.log(`\n================ ${f} ================`);
  while ((m = regex.exec(main)) !== null) {
    const tag = m[0];
    const openTag = tag.match(/<a\b[^>]*>/i)[0];
    const text = m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    console.log(`${i++}: ${openTag} -> text: "${text}"`);
  }
});
