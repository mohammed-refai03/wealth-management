const fs = require('fs');
const html = fs.readFileSync('user-dashboard.html', 'utf8');

const mainStartTag = '<main class="wm-dash-main">';
const modalMarker = '<!-- ==========================================================================\n       Interactive Modals';

const mainStartIndex = html.indexOf(mainStartTag);
const modalIndex = html.indexOf(modalMarker);

console.log('user-dashboard mainStartIndex:', mainStartIndex);
console.log('user-dashboard modalIndex:', modalIndex);
