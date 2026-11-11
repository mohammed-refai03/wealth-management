const fs = require('fs');

const files = ['index.html', 'about.html', 'services.html', 'blog.html', 'contact.html'];

const headerSearch = `<a href="index.html" class="wm-logo">
          <div class="wm-logo-icon">
            <i class="fa-solid fa-chart-line"></i>
          </div>
          <div class="wm-logo-text">STACK<span>LY</span></div>
        </a>`;

const headerReplace = `<a href="index.html" class="wm-logo">
          <img src="assets/images/logo.webp" alt="Stackly Wealth Management" class="wm-logo-img">
        </a>`;

const footerSearch = `<a href="index.html" class="wm-logo" style="margin-bottom: 1.25rem;">
            <div class="wm-logo-icon">
              <i class="fa-solid fa-chart-line"></i>
            </div>
            <div class="wm-logo-text" style="color: var(--wm-white);">STACK<span style="color: var(--wm-secondary);">LY</span></div>
          </a>`;

const footerReplace = `<a href="index.html" class="wm-logo" style="margin-bottom: 1.25rem;">
            <img src="assets/images/logo.webp" alt="Stackly Wealth Management" class="wm-logo-img">
          </a>`;

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const hMatches = (content.split(headerSearch).length - 1);
  const fMatches = (content.split(footerSearch).length - 1);
  console.log(`${f}: header/drawer matches = ${hMatches}, footer matches = ${fMatches}`);
});
