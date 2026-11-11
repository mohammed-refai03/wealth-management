const fs = require('fs');
const path = require('path');

const aboutPath = path.join(__dirname, '..', 'about.html');
const content = fs.readFileSync(aboutPath, 'utf8');

const checks = [
  { name: 'Fiduciary Charter Section', id: 'fiduciary-charter' },
  { name: 'Global Footprint Section', id: 'global-footprint' },
  { name: 'Academic Committee Section', id: 'academic-committee' },
  { name: 'Skin In The Game Section', id: 'skin-in-the-game' }
];

console.log('--- Verifying about.html ---');
checks.forEach(c => {
  const hasId = content.includes(`id="${c.id}"`);
  console.log(`${c.name}: ${hasId ? 'FOUND (PASS)' : 'NOT FOUND (FAIL)'}`);
});

// Check tag balance for <section> and </section>
const openSections = (content.match(/<section/g) || []).length;
const closeSections = (content.match(/<\/section>/g) || []).length;
console.log(`Open <section>: ${openSections}, Close </section>: ${closeSections}`);

if (openSections === closeSections) {
  console.log('Section tags balanced: PASS');
} else {
  console.error('Section tags MISMATCH: FAIL');
}

// Check CSS rules
const cssContent = fs.readFileSync(path.join(__dirname, '..', 'css', 'styles.css'), 'utf8');
const cssClasses = [
  'wm-fiduciary-charter-section',
  'wm-charter-oath-card',
  'wm-covenant-card',
  'wm-footprint-section',
  'wm-hub-card',
  'wm-custody-clearing-bar',
  'wm-committee-section',
  'wm-committee-card',
  'wm-skin-alignment-section',
  'wm-broker-card',
  'wm-stackly-covenant-card',
  'wm-skin-metric-card'
];

console.log('--- Verifying css/styles.css ---');
cssClasses.forEach(cls => {
  const hasCls = cssContent.includes(`.${cls}`);
  console.log(`Class .${cls}: ${hasCls ? 'FOUND (PASS)' : 'NOT FOUND (FAIL)'}`);
});
