const fs = require('fs');
const html = fs.readFileSync('admin-dashboard.html', 'utf8');
console.log('admin-dashboard length:', html.length);
console.log('has Chart.js:', html.includes('chart.js'));
console.log('tab-overview:', html.includes('id="tab-overview"'));
console.log('tab-clients:', html.includes('id="tab-clients"'));
console.log('tab-investments:', html.includes('id="tab-investments"'));
console.log('tab-transactions:', html.includes('id="tab-transactions"'));
console.log('tab-analytics:', html.includes('id="tab-analytics"'));
