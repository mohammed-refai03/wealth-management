const fs = require('fs');
const code = fs.readFileSync('scratch/insert_about_sections.js', 'utf8');
console.log(code.slice(2000, 5000));
