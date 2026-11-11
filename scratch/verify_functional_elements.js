const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');
const aboutHtml = fs.readFileSync('about.html', 'utf8');
const servicesHtml = fs.readFileSync('services.html', 'utf8');
const blogHtml = fs.readFileSync('blog.html', 'utf8');
const contactHtml = fs.readFileSync('contact.html', 'utf8');

console.log('--- Checking Functional Elements ---');
console.log('Testimonial arrow prev in index:', indexHtml.includes('id="testiPrevBtn"'));
console.log('Testimonial arrow next in index:', indexHtml.includes('id="testiNextBtn"'));
console.log('FAQ questions in index:', (indexHtml.match(/class="wm-faq-question"/g) || []).length);
console.log('FAQ questions in contact:', (contactHtml.match(/class="wm-faq-question"/g) || []).length);
console.log('Hero slider prev in index:', indexHtml.includes('wm-slider-prev'));
console.log('Hero slider next in index:', indexHtml.includes('wm-slider-next'));
console.log('Hero slider dots in index:', (indexHtml.match(/class="wm-slider-dot/g) || []).length);
console.log('Tab buttons in index:', (indexHtml.match(/class="wm-tab-btn/g) || []).length);
console.log('Service filter buttons in services:', (servicesHtml.match(/class="wm-service-filter-btn/g) || []).length);
console.log('Blog filter buttons in blog:', (blogHtml.match(/class="wm-service-filter-btn wm-blog-filter-btn/g) || []).length);

console.log('--- Checking 404 Links Count ---');
['index.html', 'about.html', 'services.html', 'blog.html', 'contact.html'].forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const count404 = (content.match(/href="404\.html"/g) || []).length;
  console.log(`${f}: total href="404.html" = ${count404}`);
});

console.log('--- Checking Navbar Navigation ---');
['index.html', 'about.html', 'services.html', 'blog.html', 'contact.html'].forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const navMatch = content.match(/<nav class="wm-nav">[\s\S]*?<\/nav>/)[0];
  const homeLink = navMatch.includes('href="index.html"');
  const aboutLink = navMatch.includes('href="about.html"');
  const servLink = navMatch.includes('href="services.html"');
  const blogLink = navMatch.includes('href="blog.html"');
  const contactLink = navMatch.includes('href="contact.html"');
  const loginLink = navMatch.includes('href="login.html"');
  console.log(`${f} navbar intact:`, homeLink && aboutLink && servLink && blogLink && contactLink && loginLink);
});
