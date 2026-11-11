const fs = require('fs');
const content = fs.readFileSync('404.html', 'utf8');
const aMatches = [...content.matchAll(/<a\b[^>]*>([\s\S]*?)<\/a>/gi)];
const btnMatches = [...content.matchAll(/<button\b[^>]*>([\s\S]*?)<\/button>/gi)];
console.log(`404.html: ${aMatches.length} <a>, ${btnMatches.length} <button>`);
aMatches.forEach((m, i) => console.log(`  <a> ${i+1}: ${m[0].slice(0, 100)}`));
btnMatches.forEach((m, i) => console.log(`  <button> ${i+1}: ${m[0].slice(0, 100)}`));
