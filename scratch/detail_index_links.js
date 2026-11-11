const fs = require('fs');

const content = fs.readFileSync('index.html', 'utf8');
const main = content.match(/<main>([\s\S]*?)<\/main>/)[1];

const regex = /<a\b[^>]*>([\s\S]*?)<\/a>/gi;
let m;
let i = 1;
while ((m = regex.exec(main)) !== null) {
  const tag = m[0];
  const openTag = tag.match(/<a\b[^>]*>/i)[0];
  const text = m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  console.log(`${i++}: ${openTag}`);
  console.log(`    text: "${text}"`);
}
