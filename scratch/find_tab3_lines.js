const fs = require('fs');
const lines = fs.readFileSync('user-dashboard.html', 'utf8').split('\n');
let tab3Start = -1;
let tab4Start = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('id="tab-user-messages"')) tab3Start = i;
  if (lines[i].includes('id="tab-user-products"')) tab4Start = i;
}

console.log('tab3 starts at line:', tab3Start);
console.log('tab4 starts at line:', tab4Start);
console.log('Lines count:', tab4Start - tab3Start);
