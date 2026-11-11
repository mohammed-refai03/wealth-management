const fs = require('fs');
const path = require('path');

const pages = ['index.html', 'about.html', 'services.html', 'blog.html', 'contact.html', 'login.html'];
const navPages = ['index.html', 'about.html', 'services.html', 'blog.html', 'contact.html'];

console.log('=== 1. VERIFYING PRELOADER ACROSS ALL 6 PAGES ===');
pages.forEach(p => {
  const content = fs.readFileSync(path.join(__dirname, '..', p), 'utf8');
  const hasPreloader = content.includes('id="wm-preloader"') && content.includes('wm-preloader-fill');
  const hasScript = content.includes('wmPreloaderPercent') && content.includes('fade-out');
  console.log(`${p}: Preloader HTML: ${hasPreloader ? 'PASS' : 'FAIL'}, Script: ${hasScript ? 'PASS' : 'FAIL'}`);
});

console.log('\n=== 2. VERIFYING NAVBAR ITEMS ACROSS 5 MAIN PAGES ===');
navPages.forEach(p => {
  const content = fs.readFileSync(path.join(__dirname, '..', p), 'utf8');
  
  // Check that only allowed links are in desktop nav
  const navMatch = content.match(/<nav class="wm-nav"[^>]*>([\s\S]*?)<\/nav>/);
  if (!navMatch) {
    console.error(`${p}: NO NAV FOUND!`);
    return;
  }
  const navHtml = navMatch[1];
  
  const hasHome = navHtml.includes('Home');
  const hasAbout = navHtml.includes('About');
  const hasServices = navHtml.includes('Services');
  const hasBlog = navHtml.includes('Blog');
  const hasContact = navHtml.includes('Contact');
  
  // Forbidden items:
  const hasStrategy = navHtml.includes('Strategy');
  const hasCalculator = navHtml.includes('Calculator');
  const hasPortfolio = navHtml.includes('Case Studies');
  const hasPricing = navHtml.includes('Pricing');

  console.log(`${p} Nav Links:`);
  console.log(`  Allowed (Home, About, Services, Blog, Contact): ${hasHome && hasAbout && hasServices && hasBlog && hasContact ? 'PASS' : 'FAIL'}`);
  console.log(`  Removed (Strategy, Calculator, Case Studies, Pricing): ${!hasStrategy && !hasCalculator && !hasPortfolio && !hasPricing ? 'PASS' : 'FAIL'}`);

  // Check header actions: only Login button + Mobile toggle
  const actionsMatch = content.match(/<div class="wm-header-actions">([\s\S]*?)<\/header>/);
  if (actionsMatch) {
    const actionsHtml = actionsMatch[1];
    const hasLogin = actionsHtml.includes('Login');
    const hasBook = actionsHtml.includes('Book Consultant') || actionsHtml.includes('Get Started') || actionsHtml.includes('Schedule Audit');
    console.log(`  Header Actions (Login present, Extra CTA removed): ${hasLogin && !hasBook ? 'PASS' : 'FAIL'}`);
  }
});

console.log('\n=== 3. VERIFYING CSS STYLES ===');
const css = fs.readFileSync(path.join(__dirname, '..', 'css', 'styles.css'), 'utf8');
const hasSection36 = css.includes('Section 36: Stackly Institutional Preloader');
const hasPreloaderClass = css.includes('.wm-preloader');
const hasFillKeyframe = css.includes('@keyframes wmStrokeFill');
console.log('Preloader CSS Section 36 in styles.css:', (hasSection36 && hasPreloaderClass && hasFillKeyframe) ? 'PASS' : 'FAIL');
