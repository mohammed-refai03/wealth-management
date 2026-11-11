const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', '404.html');
const cssPath = path.join(__dirname, '..', 'css', 'styles.css');

if (!fs.existsSync(filePath)) {
  console.error('FAIL: 404.html does not exist');
  process.exit(1);
}

const html = fs.readFileSync(filePath, 'utf8');
const css = fs.readFileSync(cssPath, 'utf8');

console.log('--- Verifying 404.html Requirements ---');

// Check 1: Two buttons
const hasReturnHome = html.includes('Return to Home') && html.includes('href="index.html"');
const hasGoBack = html.includes('Go Back') && html.includes('btnGoBack');
console.log('Button 1 (Return to Home):', hasReturnHome ? 'PASS' : 'FAIL');
console.log('Button 2 (Go Back):', hasGoBack ? 'PASS' : 'FAIL');

// Check 2: History back logic
const hasHistoryBack = html.includes('history.back()') && html.includes('window.location.href');
console.log('Go Back History logic with fallback:', hasHistoryBack ? 'PASS' : 'FAIL');

// Check 3: GSAP continuous animations
const hasGsap = html.includes('gsap.min.js') && html.includes('gsap.to') && html.includes('repeat: -1');
console.log('GSAP CDN & Continuous Animations:', hasGsap ? 'PASS' : 'FAIL');

// Check 4: Font Awesome Icons
const hasFa = html.includes('cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css');
console.log('Font Awesome 6 link:', hasFa ? 'PASS' : 'FAIL');

// Check 5: CSS styles
const hasCssClasses = [
  'wm-404-page',
  'wm-404-digits',
  'wm-404-orbit-box',
  'wm-404-btn-home',
  'wm-404-btn-back'
].every(cls => css.includes(cls));
console.log('CSS Styles in css/styles.css:', hasCssClasses ? 'PASS' : 'FAIL');

// Check 6: Screen fitting & responsiveness
const hasViewport = html.includes('name="viewport" content="width=device-width, initial-scale=1.0"');
const hasHeightFit = css.includes('min-height: 100vh') && css.includes('height: 100vh');
console.log('Screen fit & Responsive Viewport:', (hasViewport && hasHeightFit) ? 'PASS' : 'FAIL');
