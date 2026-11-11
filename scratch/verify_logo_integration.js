const fs = require('fs');

const files = ['index.html', 'about.html', 'services.html', 'blog.html', 'contact.html'];

let allPassed = true;

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const logoImgCount = (content.match(/src="assets\/images\/logo\.webp"/g) || []).length;
  const wmLogoCount = (content.match(/class="wm-logo"/g) || []).length;

  console.log(`\n=== Verification for ${f} ===`);
  console.log(`assets/images/logo.webp count: ${logoImgCount} (expected 3)`);
  console.log(`class="wm-logo" count: ${wmLogoCount} (expected 3)`);

  if (logoImgCount !== 3 || wmLogoCount !== 3) {
    console.error(`FAIL: ${f} logo count mismatch`);
    allPassed = false;
  }

  // Check nav items
  const hasNav = content.includes('wm-nav-list') &&
                 content.includes('Home') &&
                 content.includes('About') &&
                 content.includes('Services') &&
                 content.includes('Blog') &&
                 content.includes('Contact');
  console.log(`Nav items present: ${hasNav}`);
  if (!hasNav) {
    console.error(`FAIL: ${f} navigation items missing`);
    allPassed = false;
  }

  // Check footer 404 links
  const has404 = content.includes('href="404.html"');
  console.log(`Footer 404 links intact: ${has404}`);
  if (!has404) {
    console.error(`FAIL: ${f} footer 404 links missing`);
    allPassed = false;
  }

  // Check basic tag balance
  const openDivs = (content.match(/<div\b/g) || []).length;
  const closeDivs = (content.match(/<\/div>/g) || []).length;
  console.log(`Div balance: open=${openDivs}, close=${closeDivs}`);
  if (openDivs !== closeDivs) {
    console.error(`FAIL: ${f} div tags unbalanced!`);
    allPassed = false;
  }
});

console.log(`\nOverall Verification: ${allPassed ? 'ALL PASSED!' : 'SOME FAILED!'}`);
process.exit(allPassed ? 0 : 1);
