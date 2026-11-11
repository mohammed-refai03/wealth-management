const fs = require('fs');
const buf = fs.readFileSync('assets/images/logo.webp');
console.log('VP8X flags:', buf[20].toString(2).padStart(8, '0'), 'Alpha flag:', !!(buf[20] & 0x10));
