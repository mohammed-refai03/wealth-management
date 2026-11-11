const fs = require('fs');
const path = require('path');

// 1. Append Section 36 to css/styles.css
const cssPath = path.join(__dirname, '..', 'css', 'styles.css');
let css = fs.readFileSync(cssPath, 'utf8');

const preloaderStyles = `/* ==========================================================================
   Section 36: Stackly Institutional Preloader (Strict 2s Dismissal)
   ========================================================================== */
.wm-preloader {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100vh;
  z-index: 999999;
  background-color: var(--wm-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  transition: opacity 0.45s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.45s ease;
  overflow: hidden;
  font-family: var(--wm-font-body);
}

.wm-preloader.fade-out {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

.wm-preloader-bg-glow {
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(229, 255, 94, 0.12) 0%, rgba(25, 83, 83, 0.25) 45%, transparent 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  filter: blur(40px);
}

.wm-preloader-content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
}

.wm-preloader-graphic {
  position: relative;
  width: 96px;
  height: 96px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.wm-preloader-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.wm-preloader-track {
  fill: none;
  stroke: rgba(255, 255, 255, 0.08);
  stroke-width: 4;
}

.wm-preloader-fill {
  fill: none;
  stroke: var(--wm-secondary);
  stroke-width: 4;
  stroke-linecap: round;
  stroke-dasharray: 276.46;
  stroke-dashoffset: 276.46;
  animation: wmStrokeFill 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes wmStrokeFill {
  0% {
    stroke-dashoffset: 276.46;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

.wm-preloader-emblem {
  width: 54px;
  height: 54px;
  border-radius: 14px;
  background: linear-gradient(135deg, var(--wm-primary) 0%, #0d2c2c 100%);
  border: 1.5px solid rgba(229, 255, 94, 0.4);
  color: var(--wm-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.45rem;
  box-shadow: 0 0 20px rgba(229, 255, 94, 0.25);
  animation: wmEmblemPulse 1.5s ease-in-out infinite;
}

@keyframes wmEmblemPulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 20px rgba(229, 255, 94, 0.2);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 28px rgba(229, 255, 94, 0.4);
  }
}

.wm-preloader-brand {
  font-family: var(--wm-font-heading);
  font-size: 1.6rem;
  font-weight: 800;
  letter-spacing: 2px;
  color: var(--wm-white);
  margin-bottom: 4px;
}

.wm-preloader-brand span {
  color: var(--wm-secondary);
}

.wm-preloader-sub {
  font-size: 0.76rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 22px;
}

.wm-preloader-bar-wrap {
  width: 220px;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 100px;
  overflow: hidden;
  margin-bottom: 14px;
  position: relative;
}

.wm-preloader-bar-fill {
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, var(--wm-primary) 0%, var(--wm-secondary) 100%);
  border-radius: 100px;
  box-shadow: 0 0 10px var(--wm-secondary);
  animation: wmBarFill 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes wmBarFill {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}

.wm-preloader-footer {
  width: 220px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.74rem;
  color: rgba(255, 255, 255, 0.65);
}

.wm-preloader-status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.wm-loader-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--wm-secondary);
  box-shadow: 0 0 6px var(--wm-secondary);
  animation: wmDotBlink 1s infinite alternate;
}

@keyframes wmDotBlink {
  0% { opacity: 0.4; }
  100% { opacity: 1; }
}

.wm-preloader-percent {
  font-weight: 700;
  color: var(--wm-secondary);
  font-family: var(--wm-font-heading);
}
`;

if (!css.includes('Section 36: Stackly Institutional Preloader')) {
  css = css.trimEnd() + '\n\n' + preloaderStyles + '\n';
  fs.writeFileSync(cssPath, css, 'utf8');
  console.log('Appended Section 36 preloader styles to css/styles.css');
} else {
  console.log('Section 36 styles already present in css/styles.css');
}

// 2. Preloader HTML & Script Template
const preloaderHTML = `
  <!-- ==========================================================================
       Stackly Fiduciary Preloader (Strict 2s Dismissal)
       ========================================================================== -->
  <div id="wm-preloader" class="wm-preloader" aria-hidden="true">
    <div class="wm-preloader-bg-glow"></div>
    <div class="wm-preloader-content">
      <div class="wm-preloader-graphic">
        <svg class="wm-preloader-svg" viewBox="0 0 100 100">
          <circle class="wm-preloader-track" cx="50" cy="50" r="44"></circle>
          <circle class="wm-preloader-fill" cx="50" cy="50" r="44"></circle>
        </svg>
        <div class="wm-preloader-emblem">
          <i class="fa-solid fa-chart-line"></i>
        </div>
      </div>
      <div class="wm-preloader-brand">
        STACK<span>LY</span>
      </div>
      <div class="wm-preloader-sub">
        Institutional Wealth Architecture
      </div>
      <div class="wm-preloader-bar-wrap">
        <div class="wm-preloader-bar-fill"></div>
      </div>
      <div class="wm-preloader-footer">
        <span class="wm-preloader-status"><span class="wm-loader-dot"></span> Securing Client Vault</span>
        <span class="wm-preloader-percent" id="wmPreloaderPercent">0%</span>
      </div>
    </div>
  </div>
`;

const preloaderScript = `
  <!-- Preloader Controller (Dismisses Within 2 Seconds) -->
  <script>
    (function() {
      const preloader = document.getElementById('wm-preloader');
      if (!preloader) return;
      const percentEl = document.getElementById('wmPreloaderPercent');
      const startTime = performance.now();
      const duration = 1500; // 1.5s active progress count

      function update(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const percent = Math.floor(progress * 100);
        if (percentEl) percentEl.textContent = percent + '%';
        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
              preloader.style.display = 'none';
            }, 450);
          }, 80);
        }
      }
      requestAnimationFrame(update);
    })();
  </script>
`;

// Helper to inject preloader into HTML content
function injectPreloader(html) {
  if (html.includes('id="wm-preloader"')) return html;
  
  // Insert right after <body> or <body ...>
  html = html.replace(/(<body[^>]*>)/i, '$1\n' + preloaderHTML);
  // Insert script right before </body>
  html = html.replace(/(<\/body>)/i, preloaderScript + '\n$1');
  return html;
}

// 3. Process index.html
const indexPath = path.join(__dirname, '..', 'index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf8');

// Update desktop nav in index.html: only Home, About, Services, Blog, Contact
const indexNavOld = /<nav class="wm-nav">[\s\S]*?<\/nav>/;
const indexNavNew = `<nav class="wm-nav">
          <ul class="wm-nav-list">
            <li class="wm-nav-item"><a href="index.html" class="wm-nav-link active">Home</a></li>
            <li class="wm-nav-item"><a href="about.html" class="wm-nav-link">About</a></li>
            <li class="wm-nav-item"><a href="services.html" class="wm-nav-link">Services</a></li>
            <li class="wm-nav-item"><a href="blog.html" class="wm-nav-link">Blog</a></li>
            <li class="wm-nav-item"><a href="contact.html" class="wm-nav-link">Contact</a></li>
          </ul>
        </nav>`;

indexHtml = indexHtml.replace(indexNavOld, indexNavNew);

// Update header actions in index.html: only keep Login button and Mobile Toggle
const indexActionsOld = /<div class="wm-header-actions">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/header>/;
const indexActionsNew = `<div class="wm-header-actions">
          <a href="login.html" class="wm-nav-login-btn">
            <i class="fa-solid fa-user-lock"></i>
            <span>Login</span>
          </a>

          <!-- Mobile Toggle Button -->
          <button class="wm-mobile-toggle" aria-label="Toggle navigation menu">
            <i class="fa-solid fa-bars"></i>
          </button>
        </div>
      </div>
    </div>
  </header>`;

indexHtml = indexHtml.replace(indexActionsOld, indexActionsNew);

// Update mobile drawer in index.html: only Home, About, Services, Blog, Contact, Login
const indexDrawerOld = /<div class="wm-drawer-links">[\s\S]*?<\/div>\s*<\/div>\s*<div style="padding-top: 20px; border-top: 1px solid var\(--wm-border-light\);">[\s\S]*?<\/div>\s*<\/div>/;
const indexDrawerNew = `<div class="wm-drawer-links">
        <a href="index.html" class="wm-drawer-link">Home</a>
        <a href="about.html" class="wm-drawer-link">About</a>
        <a href="services.html" class="wm-drawer-link">Services</a>
        <a href="blog.html" class="wm-drawer-link">Blog</a>
        <a href="contact.html" class="wm-drawer-link">Contact</a>
        <a href="login.html" class="wm-drawer-link" style="color: var(--wm-primary);">
          <i class="fa-solid fa-user-lock"></i> Login
        </a>
      </div>
    </div>
  </div>`;

indexHtml = indexHtml.replace(indexDrawerOld, indexDrawerNew);
indexHtml = injectPreloader(indexHtml);
fs.writeFileSync(indexPath, indexHtml, 'utf8');
console.log('Updated index.html (navbar + preloader)');

// 4. Process about.html
const aboutPath = path.join(__dirname, '..', 'about.html');
let aboutHtml = fs.readFileSync(aboutPath, 'utf8');

const aboutNavOld = /<nav class="wm-nav">[\s\S]*?<\/nav>/;
const aboutNavNew = `<nav class="wm-nav">
          <ul class="wm-nav-list">
            <li class="wm-nav-item"><a href="index.html" class="wm-nav-link">Home</a></li>
            <li class="wm-nav-item"><a href="about.html" class="wm-nav-link active">About</a></li>
            <li class="wm-nav-item"><a href="services.html" class="wm-nav-link">Services</a></li>
            <li class="wm-nav-item"><a href="blog.html" class="wm-nav-link">Blog</a></li>
            <li class="wm-nav-item"><a href="contact.html" class="wm-nav-link">Contact</a></li>
          </ul>
        </nav>`;

aboutHtml = aboutHtml.replace(aboutNavOld, aboutNavNew);

const aboutActionsOld = /<div class="wm-header-actions">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/header>/;
const aboutActionsNew = `<div class="wm-header-actions">
          <a href="login.html" class="wm-nav-login-btn">
            <i class="fa-solid fa-user-lock"></i>
            <span>Login</span>
          </a>

          <!-- Mobile Toggle Button -->
          <button class="wm-mobile-toggle" aria-label="Toggle navigation menu">
            <i class="fa-solid fa-bars"></i>
          </button>
        </div>
      </div>
    </div>
  </header>`;

aboutHtml = aboutHtml.replace(aboutActionsOld, aboutActionsNew);

const aboutDrawerOld = /<div class="wm-drawer-links">[\s\S]*?<\/div>\s*<\/div>\s*<div style="padding-top: 20px; border-top: 1px solid var\(--wm-border-light\);">[\s\S]*?<\/div>\s*<\/div>/;
const aboutDrawerNew = `<div class="wm-drawer-links">
        <a href="index.html" class="wm-drawer-link">Home</a>
        <a href="about.html" class="wm-drawer-link">About</a>
        <a href="services.html" class="wm-drawer-link">Services</a>
        <a href="blog.html" class="wm-drawer-link">Blog</a>
        <a href="contact.html" class="wm-drawer-link">Contact</a>
        <a href="login.html" class="wm-drawer-link" style="color: var(--wm-primary);">
          <i class="fa-solid fa-user-lock"></i> Login
        </a>
      </div>
    </div>
  </div>`;

aboutHtml = aboutHtml.replace(aboutDrawerOld, aboutDrawerNew);
aboutHtml = injectPreloader(aboutHtml);
fs.writeFileSync(aboutPath, aboutHtml, 'utf8');
console.log('Updated about.html (navbar + preloader)');

// 5. Process services.html
const servicesPath = path.join(__dirname, '..', 'services.html');
let servicesHtml = fs.readFileSync(servicesPath, 'utf8');

const servicesNavOld = /<nav class="wm-nav"[^>]*>[\s\S]*?<\/nav>/;
const servicesNavNew = `<nav class="wm-nav" aria-label="Main Navigation">
          <ul class="wm-nav-list">
            <li class="wm-nav-item"><a href="index.html" class="wm-nav-link">Home</a></li>
            <li class="wm-nav-item"><a href="about.html" class="wm-nav-link">About</a></li>
            <li class="wm-nav-item"><a href="services.html" class="wm-nav-link active">Services</a></li>
            <li class="wm-nav-item"><a href="blog.html" class="wm-nav-link">Blog</a></li>
            <li class="wm-nav-item"><a href="contact.html" class="wm-nav-link">Contact</a></li>
          </ul>
        </nav>`;

servicesHtml = servicesHtml.replace(servicesNavOld, servicesNavNew);

const servicesActionsOld = /<div class="wm-header-actions">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/header>/;
const servicesActionsNew = `<div class="wm-header-actions">
          <a href="login.html" class="wm-nav-login-btn">
            <i class="fa-solid fa-user-lock"></i>
            <span>Login</span>
          </a>

          <!-- Mobile Toggle Button -->
          <button class="wm-mobile-toggle" aria-label="Toggle navigation menu">
            <i class="fa-solid fa-bars"></i>
          </button>
        </div>
      </div>
    </div>
  </header>`;

servicesHtml = servicesHtml.replace(servicesActionsOld, servicesActionsNew);

const servicesDrawerOld = /<div class="wm-drawer-links">[\s\S]*?<\/div>\s*<\/div>\s*<div style="padding-top: 20px; border-top: 1px solid var\(--wm-border-light\);">[\s\S]*?<\/div>\s*<\/div>/;
const servicesDrawerNew = `<div class="wm-drawer-links">
        <a href="index.html" class="wm-drawer-link">Home</a>
        <a href="about.html" class="wm-drawer-link">About</a>
        <a href="services.html" class="wm-drawer-link">Services</a>
        <a href="blog.html" class="wm-drawer-link">Blog</a>
        <a href="contact.html" class="wm-drawer-link">Contact</a>
        <a href="login.html" class="wm-drawer-link" style="color: var(--wm-primary);">
          <i class="fa-solid fa-user-lock"></i> Login
        </a>
      </div>
    </div>
  </div>`;

servicesHtml = servicesHtml.replace(servicesDrawerOld, servicesDrawerNew);
servicesHtml = injectPreloader(servicesHtml);
fs.writeFileSync(servicesPath, servicesHtml, 'utf8');
console.log('Updated services.html (navbar + preloader)');

// 6. Process blog.html
const blogPath = path.join(__dirname, '..', 'blog.html');
let blogHtml = fs.readFileSync(blogPath, 'utf8');

const blogNavOld = /<nav class="wm-nav"[^>]*>[\s\S]*?<\/nav>/;
const blogNavNew = `<nav class="wm-nav" aria-label="Main Navigation">
          <ul class="wm-nav-list">
            <li class="wm-nav-item"><a href="index.html" class="wm-nav-link">Home</a></li>
            <li class="wm-nav-item"><a href="about.html" class="wm-nav-link">About</a></li>
            <li class="wm-nav-item"><a href="services.html" class="wm-nav-link">Services</a></li>
            <li class="wm-nav-item"><a href="blog.html" class="wm-nav-link active">Blog</a></li>
            <li class="wm-nav-item"><a href="contact.html" class="wm-nav-link">Contact</a></li>
          </ul>
        </nav>`;

blogHtml = blogHtml.replace(blogNavOld, blogNavNew);

const blogActionsOld = /<div class="wm-header-actions">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/header>/;
const blogActionsNew = `<div class="wm-header-actions">
          <a href="login.html" class="wm-nav-login-btn">
            <i class="fa-solid fa-user-lock"></i>
            <span>Login</span>
          </a>

          <!-- Mobile Toggle Button -->
          <button class="wm-mobile-toggle" aria-label="Toggle navigation menu">
            <i class="fa-solid fa-bars"></i>
          </button>
        </div>
      </div>
    </div>
  </header>`;

blogHtml = blogHtml.replace(blogActionsOld, blogActionsNew);

const blogDrawerOld = /<div class="wm-drawer-links">[\s\S]*?<\/div>\s*<\/div>\s*<div style="padding-top: 20px; border-top: 1px solid var\(--wm-border-light\);">[\s\S]*?<\/div>\s*<\/div>/;
const blogDrawerNew = `<div class="wm-drawer-links">
        <a href="index.html" class="wm-drawer-link">Home</a>
        <a href="about.html" class="wm-drawer-link">About</a>
        <a href="services.html" class="wm-drawer-link">Services</a>
        <a href="blog.html" class="wm-drawer-link">Blog</a>
        <a href="contact.html" class="wm-drawer-link">Contact</a>
        <a href="login.html" class="wm-drawer-link" style="color: var(--wm-primary);">
          <i class="fa-solid fa-user-lock"></i> Login
        </a>
      </div>
    </div>
  </div>`;

blogHtml = blogHtml.replace(blogDrawerOld, blogDrawerNew);
blogHtml = injectPreloader(blogHtml);
fs.writeFileSync(blogPath, blogHtml, 'utf8');
console.log('Updated blog.html (navbar + preloader)');

// 7. Process contact.html
const contactPath = path.join(__dirname, '..', 'contact.html');
let contactHtml = fs.readFileSync(contactPath, 'utf8');

const contactNavOld = /<nav class="wm-nav"[^>]*>[\s\S]*?<\/nav>/;
const contactNavNew = `<nav class="wm-nav" aria-label="Main Navigation">
          <ul class="wm-nav-list">
            <li class="wm-nav-item"><a href="index.html" class="wm-nav-link">Home</a></li>
            <li class="wm-nav-item"><a href="about.html" class="wm-nav-link">About</a></li>
            <li class="wm-nav-item"><a href="services.html" class="wm-nav-link">Services</a></li>
            <li class="wm-nav-item"><a href="blog.html" class="wm-nav-link">Blog</a></li>
            <li class="wm-nav-item"><a href="contact.html" class="wm-nav-link active">Contact</a></li>
          </ul>
        </nav>`;

contactHtml = contactHtml.replace(contactNavOld, contactNavNew);

const contactActionsOld = /<div class="wm-header-actions">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/header>/;
const contactActionsNew = `<div class="wm-header-actions">
          <a href="login.html" class="wm-nav-login-btn">
            <i class="fa-solid fa-user-lock"></i>
            <span>Login</span>
          </a>

          <!-- Mobile Toggle Button -->
          <button class="wm-mobile-toggle" aria-label="Toggle navigation menu">
            <i class="fa-solid fa-bars"></i>
          </button>
        </div>
      </div>
    </div>
  </header>`;

contactHtml = contactHtml.replace(contactActionsOld, contactActionsNew);

const contactDrawerOld = /<div class="wm-drawer-links">[\s\S]*?<\/div>\s*<\/div>\s*<div style="padding-top: 20px; border-top: 1px solid var\(--wm-border-light\);">[\s\S]*?<\/div>\s*<\/div>/;
const contactDrawerNew = `<div class="wm-drawer-links">
        <a href="index.html" class="wm-drawer-link">Home</a>
        <a href="about.html" class="wm-drawer-link">About</a>
        <a href="services.html" class="wm-drawer-link">Services</a>
        <a href="blog.html" class="wm-drawer-link">Blog</a>
        <a href="contact.html" class="wm-drawer-link">Contact</a>
        <a href="login.html" class="wm-drawer-link" style="color: var(--wm-primary);">
          <i class="fa-solid fa-user-lock"></i> Login
        </a>
      </div>
    </div>
  </div>`;

contactHtml = contactHtml.replace(contactDrawerOld, contactDrawerNew);
contactHtml = injectPreloader(contactHtml);
fs.writeFileSync(contactPath, contactHtml, 'utf8');
console.log('Updated contact.html (navbar + preloader)');

// 8. Process login.html
const loginPath = path.join(__dirname, '..', 'login.html');
let loginHtml = fs.readFileSync(loginPath, 'utf8');
loginHtml = injectPreloader(loginHtml);
fs.writeFileSync(loginPath, loginHtml, 'utf8');
console.log('Updated login.html (preloader)');

console.log('All 6 pages updated successfully!');
