const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const regex = /<img[^>]+src=["']([^"']+)["']/g;
let match;
const urls = [];
while ((match = regex.exec(html)) !== null) {
  urls.push(match[1]);
}
console.log('Images in index.html:', urls.slice(0, 15));

const loginHtml = fs.readFileSync('login.html', 'utf8');
const loginUrls = [];
while ((match = regex.exec(loginHtml)) !== null) {
  loginUrls.push(match[1]);
}
console.log('Images in login.html:', loginUrls);
