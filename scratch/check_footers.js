const fs = require('fs');
const files = ['index.html', 'about.html', 'services.html', 'blog.html', 'contact.html'];

files.forEach(f => {
  const html = fs.readFileSync(f, 'utf8');
  const footerStart = html.indexOf('<footer class="wm-footer">');
  const footerEnd = html.indexOf('</footer>', footerStart);
  if (footerStart === -1) {
    console.log(f, 'NO FOOTER FOUND');
  } else {
    const footer = html.substring(footerStart, footerEnd + 9);
    console.log(`--- ${f} ---`);
    console.log('Footer length:', footer.length);
    console.log('Has linkedin.com:', footer.includes('linkedin.com'));
    console.log('Has privacy.html:', footer.includes('privacy.html'));
    console.log('Has mailto:info@stackly.com:', footer.includes('mailto:info@stackly.com'));
    console.log('Has tel:9876543210:', footer.includes('tel:9876543210'));
    console.log('Has maps link:', footer.includes('google.com/maps'));
  }
});
