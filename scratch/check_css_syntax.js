const fs = require('fs');

const css = fs.readFileSync('css/styles.css', 'utf8');
const openBraces = (css.match(/{/g) || []).length;
const closeBraces = (css.match(/}/g) || []).length;
console.log(`css/styles.css: openBraces=${openBraces}, closeBraces=${closeBraces}`);

// Check if any weird strings in styles.css
console.log('styles.css length:', css.length);
